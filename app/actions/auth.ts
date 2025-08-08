'use server';

import { sql } from '@/lib/neon';
import { createSession, deleteSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { compare, hash } from 'bcryptjs';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Invalid email address.'),
  password: z.string().min(6, 'Password must be at least 6 characters.'),
});

const signupSchema = z.object({
  name: z.string().min(1, 'Full name is required.'),
  email: z.string().email('Invalid email address.'),
  password: z.string().min(6, 'Password must be at least 6 characters.'),
  confirmPassword: z.string().min(6, 'Confirm password must be at least 6 characters.'),
  phone: z.string().optional(),
  userType: z.string().optional(),
  organization: z.string().optional(),
});

export async function login(formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries());
  const validatedFields = loginSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors.email?.[0] ||
             validatedFields.error.flatten().fieldErrors.password?.[0] ||
             'Invalid input.',
    };
  }

  const { email, password } = validatedFields.data;

  try {
    const result = await sql`
      SELECT id, name, email, password_hash, user_type
      FROM users
      WHERE email = ${email}
    `;

    if (result.length === 0) {
      return { error: 'Invalid credentials.' };
    }

    const user = result[0];
    const passwordMatch = await compare(password, user.password_hash);

    if (!passwordMatch) {
      return { error: 'Invalid credentials.' };
    }

    await createSession(user.id, user.email, user.name, user.user_type);
    redirect('/dashboard');
  } catch (error) {
    console.error('Login error:', error);
    return { error: 'An unexpected error occurred. Please try again.' };
  }
}

export async function signup(formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries());
  const validatedFields = signupSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    const errors = validatedFields.error.flatten().fieldErrors;
    return {
      error: errors.name?.[0] ||
             errors.email?.[0] ||
             errors.password?.[0] ||
             errors.confirmPassword?.[0] ||
             'Invalid input.',
    };
  }

  const { name, email, password, confirmPassword, phone, userType, organization } = validatedFields.data;

  if (password !== confirmPassword) {
    return { error: 'Passwords do not match.' };
  }

  try {
    const existingUser = await sql`
      SELECT id FROM users WHERE email = ${email}
    `;

    if (existingUser.length > 0) {
      return { error: 'Email already registered.' };
    }

    const passwordHash = await hash(password, 10); // Hash password with salt rounds

    const newUser = await sql`
      INSERT INTO users (name, email, password_hash, user_type, organization)
      VALUES (${name}, ${email}, ${passwordHash}, ${userType || null}, ${organization || null})
      RETURNING id, name, email, user_type
    `;

    const user = newUser[0];
    await createSession(user.id, user.email, user.name, user.user_type);
    redirect('/dashboard');
  } catch (error) {
    console.error('Signup error:', error);
    return { error: 'An unexpected error occurred. Please try again.' };
  }
}

export async function logout() {
  await deleteSession();
  redirect('/login');
}
