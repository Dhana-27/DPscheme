"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, ExternalLink, MapPin, Calendar } from "lucide-react"
import Link from "next/link"

// Mock data representing the grants and loans from the database
const mockSchemes = [
  {
    id: 1,
    name: "PM Mudra Yojana",
    type: "Loan",
    category: "Business",
    provider: "Public Banks",
    amount: "Up to ₹10 Lakhs",
    description: "Micro-finance scheme for small businesses and entrepreneurs",
    eligibility: "Small business owners, entrepreneurs",
    applicationUrl: "https://www.mudra.org.in/",
    location: "Pan India",
    lastUpdated: "2024-01-15",
  },
  {
    id: 2,
    name: "Stand Up India Scheme",
    type: "Loan",
    category: "Business",
    provider: "Central Government",
    amount: "₹10 Lakhs - ₹1 Crore",
    description: "Bank loans for SC/ST and women entrepreneurs",
    eligibility: "SC/ST and women entrepreneurs",
    applicationUrl: "https://www.standupmitra.in/",
    location: "Pan India",
    lastUpdated: "2024-01-10",
  },
  {
    id: 3,
    name: "PM Kisan Samman Nidhi",
    type: "Grant",
    category: "Agriculture",
    provider: "Central Government",
    amount: "₹6,000 per year",
    description: "Direct income support to farmers",
    eligibility: "Small and marginal farmers",
    applicationUrl: "https://pmkisan.gov.in/",
    location: "Pan India",
    lastUpdated: "2024-01-20",
  },
  {
    id: 4,
    name: "SBI SME Loan",
    type: "Loan",
    category: "Business",
    provider: "Public Banks",
    amount: "Up to ₹5 Crores",
    description: "Working capital and term loans for SMEs",
    eligibility: "Small and Medium Enterprises",
    applicationUrl: "https://sbi.co.in/web/sme",
    location: "Pan India",
    lastUpdated: "2024-01-18",
  },
  {
    id: 5,
    name: "Startup India Seed Fund",
    type: "Grant",
    category: "Startup",
    provider: "Central Government",
    amount: "Up to ₹50 Lakhs",
    description: "Seed funding for startups",
    eligibility: "DPIIT recognized startups",
    applicationUrl: "https://seedfund.startupindia.gov.in/",
    location: "Pan India",
    lastUpdated: "2024-01-12",
  },
  {
    id: 6,
    name: "HDFC Business Loan",
    type: "Loan",
    category: "Business",
    provider: "Private Banks",
    amount: "₹1 Lakh - ₹40 Lakhs",
    description: "Unsecured business loans for SMEs",
    eligibility: "Business owners with 2+ years experience",
    applicationUrl: "https://www.hdfcbank.com/personal/borrow/business-loan",
    location: "Pan India",
    lastUpdated: "2024-01-16",
  },
]

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedProvider, setSelectedProvider] = useState("all")
  const [filteredSchemes, setFilteredSchemes] = useState(mockSchemes)

  const handleSearch = () => {
    let filtered = mockSchemes

    if (searchTerm) {
      filtered = filtered.filter(
        (scheme) =>
          scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          scheme.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          scheme.eligibility.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedType !== "all") {
      filtered = filtered.filter((scheme) => scheme.type.toLowerCase() === selectedType)
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((scheme) => scheme.category.toLowerCase() === selectedCategory)
    }

    if (selectedProvider !== "all") {
      filtered = filtered.filter((scheme) => scheme.provider.toLowerCase().includes(selectedProvider.toLowerCase()))
    }

    setFilteredSchemes(filtered)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Header */}
      <header className="border-b border-green-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">DP</span>
            </div>
            <span className="font-bold text-xl text-green-800">SchemeConnect</span>
          </Link>
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

      <div className="container mx-auto px-4 py-8">
        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-sm border border-green-200 p-6 mb-8">
          <h1 className="text-3xl font-bold text-green-900 mb-6">Search Grants & Loans</h1>

          <div className="grid md:grid-cols-5 gap-4 mb-4">
            <div className="md:col-span-2">
              <Input
                placeholder="Search schemes, keywords, or eligibility..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-green-300 focus:border-green-500"
              />
            </div>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="border-green-300">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="grant">Grants</SelectItem>
                <SelectItem value="loan">Loans</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="border-green-300">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="agriculture">Agriculture</SelectItem>
                <SelectItem value="startup">Startup</SelectItem>
                <SelectItem value="education">Education</SelectItem>
              </SelectContent>
            </Select>

            <Button onClick={handleSearch} className="bg-green-600 hover:bg-green-700">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>

          <div className="flex gap-4">
            <Select value={selectedProvider} onValueChange={setSelectedProvider}>
              <SelectTrigger className="w-48 border-green-300">
                <SelectValue placeholder="Provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Providers</SelectItem>
                <SelectItem value="central">Central Government</SelectItem>
                <SelectItem value="state">State Government</SelectItem>
                <SelectItem value="public">Public Banks</SelectItem>
                <SelectItem value="private">Private Banks</SelectItem>
                <SelectItem value="rural">Regional Rural Banks</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-green-900 mb-4">Found {filteredSchemes.length} schemes</h2>
        </div>

        <div className="grid gap-6">
          {filteredSchemes.map((scheme) => (
            <Card key={scheme.id} className="border-green-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-green-900 text-xl mb-2">{scheme.name}</CardTitle>
                    <div className="flex gap-2 mb-3">
                      <Badge
                        variant={scheme.type === "Grant" ? "default" : "secondary"}
                        className={scheme.type === "Grant" ? "bg-green-600" : "bg-blue-600"}
                      >
                        {scheme.type}
                      </Badge>
                      <Badge variant="outline" className="border-green-300 text-green-700">
                        {scheme.category}
                      </Badge>
                      <Badge variant="outline" className="border-gray-300 text-gray-700">
                        {scheme.provider}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">{scheme.amount}</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-700 mb-4 text-base">{scheme.description}</CardDescription>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2 text-green-600" />
                    <span>
                      <strong>Location:</strong> {scheme.location}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2 text-green-600" />
                    <span>
                      <strong>Updated:</strong> {scheme.lastUpdated}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <strong className="text-green-800">Eligibility:</strong>
                  <p className="text-gray-700 mt-1">{scheme.eligibility}</p>
                </div>

                <div className="flex justify-between items-center">
                  <Button asChild className="bg-green-600 hover:bg-green-700">
                    <a href={scheme.applicationUrl} target="_blank" rel="noopener noreferrer">
                      Apply Now
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    className="border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
                  >
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSchemes.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">No schemes found matching your criteria.</div>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedType("all")
                setSelectedCategory("all")
                setSelectedProvider("all")
                setFilteredSchemes(mockSchemes)
              }}
              variant="outline"
              className="border-green-600 text-green-600"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
