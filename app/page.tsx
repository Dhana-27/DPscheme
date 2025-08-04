"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Users, TrendingUp, Shield, ArrowRight, MapPin, Building, Landmark, CreditCard } from "lucide-react"

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")

  const featuredSchemes = [
    {
      id: 1,
      name: "PM Mudra Yojana",
      type: "Grant",
      provider: "Central Government",
      amount: "Up to ₹10 Lakhs",
      category: "Business",
      description: "Micro-finance scheme for small businesses and entrepreneurs",
      state: "All India",
    },
    {
      id: 2,
      name: "SBI Business Loan",
      type: "Loan",
      provider: "State Bank of India",
      amount: "Up to ₹50 Lakhs",
      category: "Business",
      description: "Comprehensive business loan for working capital and expansion",
      bankType: "Public Bank",
    },
    {
      id: 3,
      name: "Maharashtra Startup Grant",
      type: "Grant",
      provider: "State Government",
      amount: "Up to ₹25 Lakhs",
      category: "Startup",
      description: "State government grant for innovative startups",
      state: "Maharashtra",
    },
  ]

  const stats = [
    { icon: Users, label: "Active Users", value: "50,000+" },
    { icon: TrendingUp, label: "Total Schemes", value: "10,000+" },
    { icon: Shield, label: "Success Rate", value: "95%" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-dpurpose-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-dpurpose-gradient rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">DF</span>
              </div>
              <span className="text-xl font-bold text-dpurpose-dark">Dpurpose Foundation</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/grants" className="text-gray-700 hover:text-dpurpose-dark transition-colors">
                Grants
              </Link>
              <Link href="/loans" className="text-gray-700 hover:text-dpurpose-dark transition-colors">
                Loans
              </Link>
              <Link href="/pricing" className="text-gray-700 hover:text-dpurpose-dark transition-colors">
                Pricing
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button
                  variant="outline"
                  className="border-dpurpose-dark text-dpurpose-dark hover:bg-dpurpose-light hover:text-white bg-transparent"
                >
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-dpurpose-gradient hover:opacity-90">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Find Perfect
            <span className="text-dpurpose-dark block">Grants & Loans</span>
            for Your Business
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover government grants by state and district, plus loans from public and private banks. Powered by
            Dpurpose Foundation's comprehensive database.
          </p>

          {/* Main Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Link href="/grants">
              <Button size="lg" className="bg-dpurpose-gradient hover:opacity-90 px-8 py-4 text-lg">
                <MapPin className="w-5 h-5 mr-2" />
                Search Grants
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/loans">
              <Button
                size="lg"
                variant="outline"
                className="border-dpurpose-dark text-dpurpose-dark hover:bg-dpurpose-dark hover:text-white px-8 py-4 text-lg bg-transparent"
              >
                <CreditCard className="w-5 h-5 mr-2" />
                Search Loans
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search for business loans, startup grants, agriculture funding..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 py-3 text-lg border-dpurpose-light focus:border-dpurpose-dark"
                />
              </div>
              <Link href={`/search?q=${encodeURIComponent(searchQuery)}`}>
                <Button size="lg" className="bg-dpurpose-gradient hover:opacity-90 px-8">
                  Search
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-dpurpose-light rounded-lg mb-4">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter Categories Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Search by Categories</h2>
            <p className="text-xl text-gray-600">Find funding opportunities tailored to your specific needs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Grants Categories */}
            <Card className="border-dpurpose-light hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-dpurpose-gradient rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Building className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-dpurpose-dark text-2xl">Government Grants</CardTitle>
                <CardDescription>Search by state, district, and category</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <Badge variant="outline" className="justify-center py-2 border-dpurpose-light text-dpurpose-dark">
                    <MapPin className="w-4 h-4 mr-1" />
                    State-wise
                  </Badge>
                  <Badge variant="outline" className="justify-center py-2 border-dpurpose-light text-dpurpose-dark">
                    <MapPin className="w-4 h-4 mr-1" />
                    District-wise
                  </Badge>
                  <Badge variant="outline" className="justify-center py-2 border-dpurpose-light text-dpurpose-dark">
                    <Building className="w-4 h-4 mr-1" />
                    Central Gov
                  </Badge>
                  <Badge variant="outline" className="justify-center py-2 border-dpurpose-light text-dpurpose-dark">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    Category
                  </Badge>
                </div>
                <Link href="/grants">
                  <Button className="w-full bg-dpurpose-gradient hover:opacity-90 mt-4">
                    Explore Grants
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Loans Categories */}
            <Card className="border-dpurpose-light hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-dpurpose-gradient rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Landmark className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-dpurpose-dark text-2xl">Bank Loans</CardTitle>
                <CardDescription>Search by bank type and category</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <Badge variant="outline" className="justify-center py-2 border-dpurpose-light text-dpurpose-dark">
                    <Landmark className="w-4 h-4 mr-1" />
                    Public Banks
                  </Badge>
                  <Badge variant="outline" className="justify-center py-2 border-dpurpose-light text-dpurpose-dark">
                    <Building className="w-4 h-4 mr-1" />
                    Private Banks
                  </Badge>
                  <Badge variant="outline" className="justify-center py-2 border-dpurpose-light text-dpurpose-dark">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    Business
                  </Badge>
                  <Badge variant="outline" className="justify-center py-2 border-dpurpose-light text-dpurpose-dark">
                    <Users className="w-4 h-4 mr-1" />
                    Personal
                  </Badge>
                </div>
                <Link href="/loans">
                  <Button className="w-full bg-dpurpose-gradient hover:opacity-90 mt-4">
                    Explore Loans
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Schemes */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-green-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Opportunities</h2>
            <p className="text-xl text-gray-600">Popular funding schemes trending this month</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredSchemes.map((scheme) => (
              <Card key={scheme.id} className="hover:shadow-lg transition-shadow border-dpurpose-light">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge
                      variant={scheme.type === "Grant" ? "default" : "secondary"}
                      className={scheme.type === "Grant" ? "bg-dpurpose-light text-white" : ""}
                    >
                      {scheme.type}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {scheme.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{scheme.name}</CardTitle>
                  <CardDescription className="text-sm text-gray-500">
                    {scheme.provider}
                    {scheme.state && ` • ${scheme.state}`}
                    {scheme.bankType && ` • ${scheme.bankType}`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="text-2xl font-bold text-dpurpose-dark mb-2">{scheme.amount}</div>
                    <p className="text-gray-600 text-sm">{scheme.description}</p>
                  </div>
                  <Button className="w-full bg-dpurpose-gradient hover:opacity-90">
                    Learn More <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-dpurpose-gradient">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Find Your Perfect Funding?</h2>
          <p className="text-xl text-green-100 mb-8">
            Join thousands of entrepreneurs who found their funding through Dpurpose Foundation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-dpurpose-dark hover:bg-gray-100 px-8">
                Start Free Trial
              </Button>
            </Link>
            <Link href="/grants">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-dpurpose-dark px-8 bg-transparent"
              >
                Browse Grants
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
                <div className="w-8 h-8 bg-dpurpose-gradient rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">DF</span>
                </div>
                <span className="text-xl font-bold">Dpurpose Foundation</span>
              </div>
              <p className="text-gray-400 text-sm">
                Empowering communities to discover perfect grants and loans for their dreams.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Funding</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/grants" className="hover:text-white">
                    Government Grants
                  </Link>
                </li>
                <li>
                  <Link href="/loans" className="hover:text-white">
                    Bank Loans
                  </Link>
                </li>
                <li>
                  <Link href="/search" className="hover:text-white">
                    Search All
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
              <h3 className="font-semibold mb-4">About Us</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a
                    href="https://dpurposefoundation.com/"
                    target="_blank"
                    className="hover:text-white"
                    rel="noreferrer"
                  >
                    Our Mission
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Impact Stories
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Community
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 Dpurpose Foundation. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
