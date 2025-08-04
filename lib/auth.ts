import { cookies } from "next/headers"

export interface User {
  id: string
  email: string
  name: string
  phone?: string
  createdAt: Date
}

// In-memory user storage (replace with database in production)
const users: Map<string, User & { password: string }> = new Map()

export async function createUser(email: string, password: string, name: string, phone?: string): Promise<User> {
  if (users.has(email)) {
    throw new Error("User already exists")
  }

  const user: User & { password: string } = {
    id: Math.random().toString(36).substr(2, 9),
    email,
    password, // In production, hash this password
    name,
    phone,
    createdAt: new Date(),
  }

  users.set(email, user)

  // Return user without password
  const { password: _, ...userWithoutPassword } = user
  return userWithoutPassword
}

export async function validateUser(email: string, password: string): Promise<User | null> {
  const user = users.get(email)
  if (!user || user.password !== password) {
    return null
  }

  // Return user without password
  const { password: _, ...userWithoutPassword } = user
  return userWithoutPassword
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = cookies()
  const userCookie = cookieStore.get("user")

  if (!userCookie) {
    return null
  }

  try {
    return JSON.parse(userCookie.value)
  } catch {
    return null
  }
}

export async function setUserSession(user: User) {
  const cookieStore = cookies()
  cookieStore.set("user", JSON.stringify(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })
}

export async function clearUserSession() {
  const cookieStore = cookies()
  cookieStore.delete("user")
}
