import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/components/auth-provider'
import Chatbot from '@/components/chatbot'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SchemeConnect - Government Schemes & Loans Platform',
  description: 'Discover government schemes and bank loans tailored for you. Access central and state government schemes, bank loans, and financial assistance programs.',
  keywords: 'government schemes, bank loans, financial assistance, grants, subsidies, India',
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
        <AuthProvider>
          {children}
          <Chatbot />
        </AuthProvider>
      </body>
    </html>
  )
}
