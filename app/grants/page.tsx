"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, ExternalLink, ArrowLeft, MapPin, Building } from "lucide-react"
import { grantsData, states, categories } from "@/lib/data"

export default function GrantsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [stateFilter, setStateFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [providerFilter, setProviderFilter] = useState("all")
  const [filteredGrants, setFilteredGrants] = useState(grantsData)

  useEffect(() => {
    let filtered = grantsData

    if (searchQuery) {
      filtered = filtered.filter(
        (grant) =>
          grant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          grant.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          grant.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          grant.state.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (stateFilter !== "all") {
      filtered = filtered.filter((grant) => grant.state.toLowerCase() === stateFilter.toLowerCase())
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter((grant) => grant.category.toLowerCase() === categoryFilter.toLowerCase())
    }

    if (providerFilter !== "all") {
      if (providerFilter === "central") {
        filtered = filtered.filter((grant) => grant.provider.toLowerCase().includes("central"))
      } else if (providerFilter === "state") {
        filtered = filtered.filter((grant) => grant.provider.toLowerCase().includes("state"))
      }
    }

    setFilteredGrants(filtered)
  }, [searchQuery, stateFilter, categoryFilter, providerFilter])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-dpurpose-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
                <div className="w-8 h-8 bg-dpurpose-gradient rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">DF</span>
                </div>
                <span className="text-xl font-bold text-dpurpose-dark">Dpurpose Foundation</span>
              </Link>
            </div>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-dpurpose-dark mb-2">Government Grants</h1>
          <p className="text-gray-600">
            Search grants by state, district, and category from central and state governments
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search grants by name, category, or state..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-dpurpose-light focus:border-dpurpose-dark"
              />
            </div>
            <div className="flex gap-4">
              <Select value={stateFilter} onValueChange={setStateFilter}>
                <SelectTrigger className="w-48 border-dpurpose-light">
                  <SelectValue placeholder="Select State" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All States</SelectItem>
                  {states.map((state) => (
                    <SelectItem key={state} value={state.toLowerCase()}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-40 border-dpurpose-light">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category.toLowerCase()}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={providerFilter} onValueChange={setProviderFilter}>
                <SelectTrigger className="w-48 border-dpurpose-light">
                  <SelectValue placeholder="Provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Providers</SelectItem>
                  <SelectItem value="central">Central Government</SelectItem>
                  <SelectItem value="state">State Government</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-gray-600">Found {filteredGrants.length} grants matching your criteria</p>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 bg-transparent border-dpurpose-light"
            >
              <Filter className="w-4 h-4" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredGrants.map((grant) => (
            <Card key={grant.id} className="hover:shadow-lg transition-shadow border-dpurpose-light">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge className="bg-dpurpose-light text-white">Grant</Badge>
                  <Badge variant="outline" className="text-xs">
                    {grant.category}
                  </Badge>
                </div>
                <CardTitle className="text-xl text-dpurpose-dark">{grant.name}</CardTitle>
                <CardDescription className="text-sm text-gray-500 flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  {grant.provider}
                  <MapPin className="w-4 h-4 ml-2" />
                  {grant.state}
                  {grant.district && ` - ${grant.district}`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="text-2xl font-bold text-dpurpose-dark mb-2">{grant.amount}</div>
                  <p className="text-gray-600 text-sm mb-3">{grant.description}</p>
                  <div className="text-xs text-gray-500">
                    <strong>Eligibility:</strong> {grant.eligibility}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1 bg-dpurpose-gradient hover:opacity-90">View Details</Button>
                  <Button variant="outline" size="sm" asChild className="border-dpurpose-light bg-transparent">
                    <a href={grant.applicationUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredGrants.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No grants found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
            <Button
              onClick={() => {
                setSearchQuery("")
                setStateFilter("all")
                setCategoryFilter("all")
                setProviderFilter("all")
              }}
              className="bg-dpurpose-gradient hover:opacity-90"
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
