"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Search, MapPin, Building, Filter, ExternalLink, Calendar, DollarSign } from "lucide-react"
import { grantsData, states, categories, type Grant } from "@/lib/data"

export default function GrantsPage() {
  const [filteredGrants, setFilteredGrants] = useState<Grant[]>(grantsData)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedState, setSelectedState] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedProvider, setSelectedProvider] = useState("all")
  const [isLoading, setIsLoading] = useState(false)

  const providers = ["Central Government", "State Government", "Local Authority"]

  useEffect(() => {
    filterGrants()
  }, [searchQuery, selectedState, selectedCategory, selectedProvider])

  const filterGrants = () => {
    setIsLoading(true)

    const filtered = grantsData.filter((grant) => {
      const matchesSearch =
        grant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        grant.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        grant.category.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesState = selectedState === "all" || grant.state === selectedState || grant.state === "All India"
      const matchesCategory = selectedCategory === "all" || grant.category === selectedCategory
      const matchesProvider = selectedProvider === "all" || grant.provider === selectedProvider

      return matchesSearch && matchesState && matchesCategory && matchesProvider
    })

    setTimeout(() => {
      setFilteredGrants(filtered)
      setIsLoading(false)
    }, 300)
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedState("all")
    setSelectedCategory("all")
    setSelectedProvider("all")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-dpurpose-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center text-dpurpose-dark hover:text-dpurpose-light">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-dpurpose-gradient rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">DF</span>
                </div>
                <span className="text-xl font-bold text-dpurpose-dark">Government Grants</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/loans">
                <Button
                  variant="outline"
                  className="border-dpurpose-light text-dpurpose-dark hover:bg-dpurpose-light hover:text-white bg-transparent"
                >
                  View Loans
                </Button>
              </Link>
              <Link href="/login">
                <Button className="bg-dpurpose-gradient hover:opacity-90">Login</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-dpurpose-dark mb-4">Government Grants Database</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover government grants by state, district, and category. Search through thousands of funding
            opportunities from central and state governments.
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8 border-dpurpose-light">
          <CardHeader>
            <CardTitle className="flex items-center text-dpurpose-dark">
              <Filter className="w-5 h-5 mr-2" />
              Search & Filter Grants
            </CardTitle>
            <CardDescription>
              Use filters to find grants specific to your location and business category
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search grants by name, description, or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-dpurpose-light focus:border-dpurpose-dark"
              />
            </div>

            {/* Filter Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">State/Region</label>
                <Select value={selectedState} onValueChange={setSelectedState}>
                  <SelectTrigger className="border-dpurpose-light focus:border-dpurpose-dark">
                    <SelectValue placeholder="Select State" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All States</SelectItem>
                    {states.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Category</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="border-dpurpose-light focus:border-dpurpose-dark">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Provider</label>
                <Select value={selectedProvider} onValueChange={setSelectedProvider}>
                  <SelectTrigger className="border-dpurpose-light focus:border-dpurpose-dark">
                    <SelectValue placeholder="Select Provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Providers</SelectItem>
                    {providers.map((provider) => (
                      <SelectItem key={provider} value={provider}>
                        {provider}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Actions</label>
                <Button
                  onClick={clearFilters}
                  variant="outline"
                  className="w-full border-dpurpose-light text-dpurpose-dark hover:bg-dpurpose-light hover:text-white bg-transparent"
                >
                  Clear Filters
                </Button>
              </div>
            </div>

            {/* Active Filters */}
            <div className="flex flex-wrap gap-2">
              {searchQuery && (
                <Badge variant="secondary" className="bg-dpurpose-light text-white">
                  Search: {searchQuery}
                </Badge>
              )}
              {selectedState !== "all" && (
                <Badge variant="secondary" className="bg-dpurpose-light text-white">
                  State: {selectedState}
                </Badge>
              )}
              {selectedCategory !== "all" && (
                <Badge variant="secondary" className="bg-dpurpose-light text-white">
                  Category: {selectedCategory}
                </Badge>
              )}
              {selectedProvider !== "all" && (
                <Badge variant="secondary" className="bg-dpurpose-light text-white">
                  Provider: {selectedProvider}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-gray-600">
            {isLoading
              ? "Searching..."
              : `Found ${filteredGrants.length} grant${filteredGrants.length !== 1 ? "s" : ""}`}
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Sort by:</span>
            <Select defaultValue="relevance">
              <SelectTrigger className="w-32 border-dpurpose-light">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="amount">Amount</SelectItem>
                <SelectItem value="deadline">Deadline</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Grants Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                    <div className="h-8 bg-gray-200 rounded w-full mt-4"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredGrants.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No grants found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search criteria or clearing filters</p>
              <Button onClick={clearFilters} className="bg-dpurpose-gradient hover:opacity-90">
                Clear All Filters
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGrants.map((grant) => (
              <Card key={grant.id} className="hover:shadow-lg transition-shadow border-dpurpose-light group">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge className="bg-dpurpose-light text-white">{grant.category}</Badge>
                    <Badge variant="outline" className="text-xs border-dpurpose-light">
                      {grant.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg group-hover:text-dpurpose-dark transition-colors">
                    {grant.name}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    <div className="flex items-center text-gray-500 mb-1">
                      <Building className="w-3 h-3 mr-1" />
                      {grant.provider}
                    </div>
                    <div className="flex items-center text-gray-500">
                      <MapPin className="w-3 h-3 mr-1" />
                      {grant.state}
                      {grant.district && `, ${grant.district}`}
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Grant Amount:</span>
                      <span className="font-semibold text-dpurpose-dark flex items-center">
                        <DollarSign className="w-4 h-4 mr-1" />
                        {grant.amount}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 line-clamp-2">{grant.description}</p>

                    <div className="text-xs text-gray-500">
                      <strong>Eligibility:</strong> {grant.eligibility}
                    </div>

                    {grant.deadline && (
                      <div className="flex items-center text-xs text-red-600">
                        <Calendar className="w-3 h-3 mr-1" />
                        Deadline: {grant.deadline}
                      </div>
                    )}

                    <div className="flex gap-2 pt-2">
                      <Button size="sm" className="flex-1 bg-dpurpose-gradient hover:opacity-90" asChild>
                        <a href={grant.applicationUrl} target="_blank" rel="noopener noreferrer">
                          Apply Now
                          <ExternalLink className="w-3 h-3 ml-1" />
                        </a>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-dpurpose-light text-dpurpose-dark hover:bg-dpurpose-light hover:text-white bg-transparent"
                      >
                        Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {filteredGrants.length > 0 && (
          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              className="border-dpurpose-light text-dpurpose-dark hover:bg-dpurpose-light hover:text-white bg-transparent"
            >
              Load More Grants
            </Button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-dpurpose-dark text-white py-8 px-4 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="text-dpurpose-dark font-bold text-sm">DF</span>
            </div>
            <span className="text-xl font-bold">Dpurpose Foundation</span>
          </div>
          <p className="text-green-200 mb-4">Empowering communities with accessible funding opportunities</p>
          <div className="flex justify-center space-x-6 text-sm">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/loans" className="hover:text-white transition-colors">
              Loans
            </Link>
            <Link href="/pricing" className="hover:text-white transition-colors">
              Pricing
            </Link>
            <a
              href="https://dpurposefoundation.com/"
              target="_blank"
              className="hover:text-white transition-colors"
              rel="noreferrer"
            >
              About Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
