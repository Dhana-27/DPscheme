import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Chatbot from "@/components/chatbot"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Dpurpose Foundation - Find Perfect Grants & Loans",
  description:
    "Discover government grants by state and district, plus loans from public and private banks. AI-powered funding discovery platform by Dpurpose Foundation.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Chatbot />
      </body>
    </html>
  )
}
