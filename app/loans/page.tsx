"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, ExternalLink, ArrowLeft, Landmark, Clock } from "lucide-react"
import { loansData, categories, bankTypes } from "@/lib/data"

export default function LoansPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [bankTypeFilter, setBankTypeFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [filteredLoans, setFilteredLoans] = useState(loansData)

  useEffect(() => {
    let filtered = loansData

    if (searchQuery) {
      filtered = filtered.filter(
        (loan) =>
          loan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          loan.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          loan.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          loan.bankName.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (bankTypeFilter !== "all") {
      filtered = filtered.filter((loan) => loan.bankType.toLowerCase() === bankTypeFilter.toLowerCase())
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter((loan) => loan.category.toLowerCase() === categoryFilter.toLowerCase())
    }

    setFilteredLoans(filtered)
  }, [searchQuery, bankTypeFilter, categoryFilter])

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
          <h1 className="text-3xl font-bold text-dpurpose-dark mb-2">Bank Loans</h1>
          <p className="text-gray-600">Explore loans from public and private banks across different categories</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search loans by name, bank, or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-dpurpose-light focus:border-dpurpose-dark"
              />
            </div>
            <div className="flex gap-4">
              <Select value={bankTypeFilter} onValueChange={setBankTypeFilter}>
                <SelectTrigger className="w-40 border-dpurpose-light">
                  <SelectValue placeholder="Bank Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Banks</SelectItem>
                  {bankTypes.map((type) => (
                    <SelectItem key={type} value={type.toLowerCase()}>
                      {type} Banks
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
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-gray-600">Found {filteredLoans.length} loans matching your criteria</p>
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
          {filteredLoans.map((loan) => (
            <Card key={loan.id} className="hover:shadow-lg transition-shadow border-dpurpose-light">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary">Loan</Badge>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="text-xs">
                      {loan.category}
                    </Badge>
                    <Badge
                      className={
                        loan.bankType === "Public" ? "bg-dpurpose-light text-white" : "bg-dpurpose-dark text-white"
                      }
                    >
                      {loan.bankType}
                    </Badge>
                  </div>
                </div>
                <CardTitle className="text-xl text-dpurpose-dark">{loan.name}</CardTitle>
                <CardDescription className="text-sm text-gray-500 flex items-center gap-2">
                  <Landmark className="w-4 h-4" />
                  {loan.bankName}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="text-2xl font-bold text-dpurpose-dark mb-1">{loan.amount}</div>
                  <div className="text-lg font-semibold text-green-600 mb-2">Interest: {loan.interestRate}</div>
                  <p className="text-gray-600 text-sm mb-3">{loan.description}</p>
                  <div className="grid grid-cols-2 gap-4 text-xs text-gray-500 mb-3">
                    <div>
                      <strong>Eligibility:</strong> {loan.eligibility}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <strong>Processing:</strong> {loan.processingTime}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1 bg-dpurpose-gradient hover:opacity-90">View Details</Button>
                  <Button variant="outline" size="sm" asChild className="border-dpurpose-light bg-transparent">
                    <a href={loan.applicationUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredLoans.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No loans found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
            <Button
              onClick={() => {
                setSearchQuery("")
                setBankTypeFilter("all")
                setCategoryFilter("all")
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
