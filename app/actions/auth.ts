"use server"

import { redirect } from "next/navigation"
import { createUser, validateUser, setUserSession, clearUserSession } from "@/lib/auth"

export async function signupAction(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const name = formData.get("name") as string
  const phone = formData.get("phone") as string

  if (!email || !password || !name) {
    return { error: "All fields are required" }
  }

  if (password.length < 6) {
    return { error: "Password must be at least 6 characters" }
  }

  try {
    const user = await createUser(email, password, name, phone)
    await setUserSession(user)
    redirect("/dashboard")
  } catch (error) {
    return { error: "Email already exists" }
  }
}

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return { error: "Email and password are required" }
  }

  const user = await validateUser(email, password)
  if (!user) {
    return { error: "Invalid email or password" }
  }

  await setUserSession(user)
  redirect("/dashboard")
}

export async function logoutAction() {
  await clearUserSession()
  redirect("/")
}
