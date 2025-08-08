import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { sql } from '@/lib/neon';
import { redirect } from 'next/navigation';

const secretKey = process.env.JWT_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d') // Session expires in 7 days
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (error) {
    console.error('Failed to verify session:', error);
    return null;
  }
}

export async function createSession(userId: string, email: string, name: string, userType: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
  const session = await encrypt({ userId, email, name, userType, expiresAt });

  cookies().set('session', session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });
}

export async function deleteSession() {
  cookies().delete('session');
}

export async function getUserSession() {
  const session = cookies().get('session')?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function getUserProfile() {
  const session = await getUserSession();
  if (!session || !session.userId) {
    return null;
  }

  try {
    const result = await sql`
      SELECT id, email, name, user_type, organization, created_at
      FROM users
      WHERE id = ${session.userId}
    `;
    if (result.length > 0) {
      const user = result[0];
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        user_type: user.user_type,
        organization: user.organization,
        createdAt: user.created_at,
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
}

export async function requireAuth() {
  const user = await getUserProfile();
  if (!user) {
    redirect('/login');
  }
  return user;
}

export type UserProfile = Awaited<ReturnType<typeof getUserProfile>>;
