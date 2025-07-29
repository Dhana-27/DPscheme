"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, MessageCircle, Shield, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Header */}
      <header className="border-b border-green-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">DP</span>
            </div>
            <span className="font-bold text-xl text-green-800">SchemeConnect</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/search" className="text-green-700 hover:text-green-800 font-medium">
              Search Schemes
            </Link>
            <Link href="/pricing" className="text-green-700 hover:text-green-800 font-medium">
              Pricing
            </Link>
            <Link href="/about" className="text-green-700 hover:text-green-800 font-medium">
              About
            </Link>
          </nav>
          <div className="flex items-center space-x-3">
            <Link href="/login">
              <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 bg-transparent">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-green-600 hover:bg-green-700">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-4 bg-green-100 text-green-800 border-green-200">Powered by dpurpose Foundation</Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-green-900 mb-6">
            Find the Perfect
            <span className="text-green-600 block">Grant or Loan</span>
          </h1>
          <p className="text-xl text-green-700 mb-8 max-w-3xl mx-auto">
            Discover government grants, loans from public and private banks, and funding opportunities tailored to your
            needs. Our AI assistant helps you navigate through thousands of schemes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/search">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-lg px-8 py-3">
                <Search className="mr-2 h-5 w-5" />
                Start Searching
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-green-50 text-lg px-8 py-3 bg-transparent"
              onClick={() => {
                const chatbot = document.getElementById("chatbot-toggle")
                if (chatbot) chatbot.click()
              }}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Ask AI Assistant
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-green-900 mb-12">Why Choose SchemeConnect?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-green-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-green-900">Comprehensive Database</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-green-700">
                  Access thousands of grants and loans from central government, state governments, public & private
                  banks, and regional rural banks.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-green-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <MessageCircle className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-green-900">AI-Powered Assistant</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-green-700">
                  Our intelligent chatbot understands your requirements and recommends the most suitable schemes for
                  your specific needs.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-green-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-green-900">Trusted & Verified</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-green-700">
                  All schemes are verified and regularly updated. Direct links to official application portals ensure
                  authenticity.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-green-600">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">5000+</div>
              <div className="text-green-100">Active Schemes</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-green-100">Government Bodies</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">200+</div>
              <div className="text-green-100">Banks & NBFCs</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-green-100">Happy Users</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-16 px-4 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-green-900 mb-4">Choose Your Plan</h2>
          <p className="text-green-700 mb-12 max-w-2xl mx-auto">
            Get unlimited access to our comprehensive database and AI assistant
          </p>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-green-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-green-900">Monthly Plan</CardTitle>
                <div className="text-3xl font-bold text-green-600">
                  ₹149<span className="text-lg font-normal text-green-700">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-green-700">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                  Unlimited scheme searches
                </div>
                <div className="flex items-center text-green-700">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                  AI assistant access
                </div>
                <div className="flex items-center text-green-700">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                  Direct application links
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-600 border-2 hover:shadow-lg transition-shadow relative">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-600">Best Value</Badge>
              <CardHeader>
                <CardTitle className="text-green-900">Yearly Plan</CardTitle>
                <div className="text-3xl font-bold text-green-600">
                  ₹1,500<span className="text-lg font-normal text-green-700">/year</span>
                </div>
                <div className="text-sm text-green-600">Save ₹288 annually!</div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-green-700">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                  Everything in Monthly
                </div>
                <div className="flex items-center text-green-700">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                  Priority support
                </div>
                <div className="flex items-center text-green-700">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                  Early access to new features
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="mt-8">
            <Link href="/pricing">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                View All Plans
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-green-800">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Find Your Perfect Scheme?</h2>
          <p className="text-green-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have successfully found and applied for grants and loans through our platform.
          </p>
          <Link href="/signup">
            <Button size="lg" className="bg-white text-green-800 hover:bg-green-50 text-lg px-8 py-3">
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-900 text-green-100 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">DP</span>
                </div>
                <span className="font-bold text-xl">SchemeConnect</span>
              </div>
              <p className="text-green-300">
                Empowering individuals and businesses to find the right financial support.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-green-300">
                <li>
                  <Link href="/search" className="hover:text-white">
                    Search Schemes
                  </Link>
                </li>
                <li>
                  <Link href="/categories" className="hover:text-white">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-white">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-green-300">
                <li>
                  <Link href="/help" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-white">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">About</h3>
              <ul className="space-y-2 text-green-300">
                <li>
                  <Link href="https://dpurposefoundation.com/" className="hover:text-white">
                    dpurpose Foundation
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-green-800 mt-8 pt-8 text-center text-green-400">
            <p>&copy; 2025 SchemeConnect by Dpurpose Foundation. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
