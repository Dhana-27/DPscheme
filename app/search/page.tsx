"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, ExternalLink, ArrowLeft } from "lucide-react"

// Mock data - replace with actual API calls
const mockSchemes = [
  {
    id: 1,
    name: "PM Mudra Yojana",
    type: "Loan",
    provider: "Central Government",
    amount: "Up to ₹10 Lakhs",
    category: "Business",
    description: "Micro-finance scheme for small businesses and entrepreneurs",
    eligibility: "Indian citizens, existing business or new venture",
    applicationUrl: "https://www.mudra.org.in/",
  },
  {
    id: 2,
    name: "Startup India Seed Fund",
    type: "Grant",
    provider: "Central Government",
    amount: "Up to ₹50 Lakhs",
    category: "Startup",
    description: "Financial support for startups in proof of concept stage",
    eligibility: "DPIIT recognized startups, incorporated within 2 years",
    applicationUrl: "https://www.startupindia.gov.in/",
  },
  {
    id: 3,
    name: "SBI Women Entrepreneur Loan",
    type: "Loan",
    provider: "State Bank of India",
    amount: "Up to ₹2 Crores",
    category: "Women",
    description: "Special loan scheme for women entrepreneurs",
    eligibility: "Women entrepreneurs, minimum 51% stake",
    applicationUrl: "https://sbi.co.in/",
  },
  {
    id: 4,
    name: "HDFC Business Loan",
    type: "Loan",
    provider: "HDFC Bank",
    amount: "Up to ₹75 Lakhs",
    category: "Business",
    description: "Quick business loans for working capital and expansion",
    eligibility: "Business vintage of 2+ years, good credit score",
    applicationUrl: "https://www.hdfcbank.com/",
  },
  {
    id: 5,
    name: "Maharashtra Startup Policy Grant",
    type: "Grant",
    provider: "Maharashtra Government",
    amount: "Up to ₹25 Lakhs",
    category: "Startup",
    description: "State government grant for innovative startups",
    eligibility: "Startups registered in Maharashtra",
    applicationUrl: "https://startup.maharashtra.gov.in/",
  },
]

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams?.get("q") || "")
  const [typeFilter, setTypeFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [providerFilter, setProviderFilter] = useState("all")
  const [filteredSchemes, setFilteredSchemes] = useState(mockSchemes)

  useEffect(() => {
    let filtered = mockSchemes

    if (searchQuery) {
      filtered = filtered.filter(
        (scheme) =>
          scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          scheme.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          scheme.category.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter((scheme) => scheme.type.toLowerCase() === typeFilter)
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter((scheme) => scheme.category.toLowerCase() === categoryFilter)
    }

    if (providerFilter !== "all") {
      filtered = filtered.filter((scheme) => scheme.provider.toLowerCase().includes(providerFilter.toLowerCase()))
    }

    setFilteredSchemes(filtered)
  }, [searchQuery, typeFilter, categoryFilter, providerFilter])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">SC</span>
                </div>
                <span className="text-xl font-bold text-green-800">SchemeConnect</span>
              </Link>
            </div>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search schemes, grants, loans..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-green-200 focus:border-green-500"
              />
            </div>
            <div className="flex gap-4">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="loan">Loans</SelectItem>
                  <SelectItem value="grant">Grants</SelectItem>
                </SelectContent>
              </Select>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="startup">Startup</SelectItem>
                  <SelectItem value="women">Women</SelectItem>
                  <SelectItem value="agriculture">Agriculture</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                </SelectContent>
              </Select>

              <Select value={providerFilter} onValueChange={setProviderFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Providers</SelectItem>
                  <SelectItem value="central">Central Government</SelectItem>
                  <SelectItem value="state">State Government</SelectItem>
                  <SelectItem value="bank">Banks</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-gray-600">Found {filteredSchemes.length} schemes matching your criteria</p>
            <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
              <Filter className="w-4 h-4" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredSchemes.map((scheme) => (
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
                <CardTitle className="text-xl">{scheme.name}</CardTitle>
                <CardDescription className="text-sm text-gray-500">{scheme.provider}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="text-2xl font-bold text-green-600 mb-2">{scheme.amount}</div>
                  <p className="text-gray-600 text-sm mb-3">{scheme.description}</p>
                  <div className="text-xs text-gray-500">
                    <strong>Eligibility:</strong> {scheme.eligibility}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1 bg-green-600 hover:bg-green-700">View Details</Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href={scheme.applicationUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSchemes.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No schemes found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
            <Button
              onClick={() => {
                setSearchQuery("")
                setTypeFilter("all")
                setCategoryFilter("all")
                setProviderFilter("all")
              }}
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
