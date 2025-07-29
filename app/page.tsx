"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Users, TrendingUp, Shield, ArrowRight } from "lucide-react"

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")

  const featuredSchemes = [
    {
      id: 1,
      name: "PM Mudra Yojana",
      type: "Loan",
      provider: "Central Government",
      amount: "Up to ₹10 Lakhs",
      category: "Business",
      description: "Micro-finance scheme for small businesses and entrepreneurs",
    },
    {
      id: 2,
      name: "Startup India Seed Fund",
      type: "Grant",
      provider: "Central Government",
      amount: "Up to ₹50 Lakhs",
      category: "Startup",
      description: "Financial support for startups in proof of concept stage",
    },
    {
      id: 3,
      name: "SBI Women Entrepreneur Loan",
      type: "Loan",
      provider: "State Bank of India",
      amount: "Up to ₹2 Crores",
      category: "Women",
      description: "Special loan scheme for women entrepreneurs",
    },
  ]

  const stats = [
    { icon: Users, label: "Active Users", value: "10,000+" },
    { icon: TrendingUp, label: "Schemes Available", value: "500+" },
    { icon: Shield, label: "Success Rate", value: "85%" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SC</span>
              </div>
              <span className="text-xl font-bold text-green-800">SchemeConnect</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/search" className="text-gray-700 hover:text-green-600 transition-colors">
                Search Schemes
              </Link>
              <Link href="/pricing" className="text-gray-700 hover:text-green-600 transition-colors">
                Pricing
              </Link>
              <Link href="/login" className="text-gray-700 hover:text-green-600 transition-colors">
                Login
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 bg-transparent">
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-green-600 hover:bg-green-700">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Find the Perfect
            <span className="text-green-600 block">Grants & Loans</span>
            for Your Dreams
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover government grants, bank loans, and funding opportunities with our AI-powered assistant. Powered by
            dpurpose Foundation to help you achieve your goals.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search for business loans, startup grants, education funding..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 py-3 text-lg border-green-200 focus:border-green-500"
                />
              </div>
              <Link href={`/search?q=${encodeURIComponent(searchQuery)}`}>
                <Button size="lg" className="bg-green-600 hover:bg-green-700 px-8">
                  Search
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
                  <stat.icon className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Schemes */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Schemes</h2>
            <p className="text-xl text-gray-600">Popular funding opportunities trending this month</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredSchemes.map((scheme) => (
              <Card key={scheme.id} className="hover:shadow-lg transition-shadow border-green-100">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge
                      variant={scheme.type === "Grant" ? "default" : "secondary"}
                      className={scheme.type === "Grant" ? "bg-green-100 text-green-800" : ""}
                    >
                      {scheme.type}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {scheme.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{scheme.name}</CardTitle>
                  <CardDescription className="text-sm text-gray-500">{scheme.provider}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="text-2xl font-bold text-green-600 mb-2">{scheme.amount}</div>
                    <p className="text-gray-600 text-sm">{scheme.description}</p>
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Learn More <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-green-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose SchemeConnect?</h2>
            <p className="text-xl text-gray-600">Powered by dpurpose Foundation's expertise</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "AI-Powered Search",
                description: "Smart chatbot helps you find the perfect schemes",
                icon: "🤖",
              },
              {
                title: "Comprehensive Database",
                description: "500+ schemes from government and banks",
                icon: "📊",
              },
              {
                title: "Real-time Updates",
                description: "Always up-to-date information and deadlines",
                icon: "⚡",
              },
              {
                title: "Expert Support",
                description: "Backed by dpurpose Foundation's expertise",
                icon: "🎯",
              },
            ].map((feature, index) => (
              <Card key={index} className="text-center border-green-100">
                <CardContent className="pt-6">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-green-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Find Your Perfect Funding?</h2>
          <p className="text-xl text-green-100 mb-8">
            Join thousands of entrepreneurs who found their funding through SchemeConnect
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-8">
                Start Free Trial
              </Button>
            </Link>
            <Link href="/search">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-green-700 px-8 bg-transparent"
              >
                Browse Schemes
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">SC</span>
                </div>
                <span className="text-xl font-bold">SchemeConnect</span>
              </div>
              <p className="text-gray-400 text-sm">
                Powered by dpurpose Foundation to help you discover the perfect grants and loans.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/search" className="hover:text-white">
                    Search Schemes
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-white">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="hover:text-white">
                    Login
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">dpurpose Foundation</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a
                    href="https://dpurposefoundation.com/"
                    target="_blank"
                    className="hover:text-white"
                    rel="noreferrer"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Mission
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Impact
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 SchemeConnect by dpurpose Foundation. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
