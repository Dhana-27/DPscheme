"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Search, Landmark, Building, Filter, ExternalLink, Clock, Percent } from "lucide-react"
import { loansData, categories, bankTypes, type Loan } from "@/lib/data"

export default function LoansPage() {
  const [filteredLoans, setFilteredLoans] = useState<Loan[]>(loansData)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedBankType, setSelectedBankType] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedBank, setSelectedBank] = useState("all")
  const [isLoading, setIsLoading] = useState(false)

  const banks = Array.from(new Set(loansData.map((loan) => loan.bankName))).sort()

  useEffect(() => {
    filterLoans()
  }, [searchQuery, selectedBankType, selectedCategory, selectedBank])

  const filterLoans = () => {
    setIsLoading(true)

    const filtered = loansData.filter((loan) => {
      const matchesSearch =
        loan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loan.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loan.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loan.bankName.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesBankType = selectedBankType === "all" || loan.bankType === selectedBankType
      const matchesCategory = selectedCategory === "all" || loan.category === selectedCategory
      const matchesBank = selectedBank === "all" || loan.bankName === selectedBank

      return matchesSearch && matchesBankType && matchesCategory && matchesBank
    })

    setTimeout(() => {
      setFilteredLoans(filtered)
      setIsLoading(false)
    }, 300)
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedBankType("all")
    setSelectedCategory("all")
    setSelectedBank("all")
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
                <span className="text-xl font-bold text-dpurpose-dark">Bank Loans</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/grants">
                <Button
                  variant="outline"
                  className="border-dpurpose-light text-dpurpose-dark hover:bg-dpurpose-light hover:text-white bg-transparent"
                >
                  View Grants
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
          <h1 className="text-4xl font-bold text-dpurpose-dark mb-4">Bank Loans Database</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore loans from public and private banks across India. Compare interest rates, processing times, and
            eligibility criteria.
          </p>
        </div>

        {/* Bank Type Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="border-dpurpose-light hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-dpurpose-gradient rounded-lg flex items-center justify-center mx-auto mb-4">
                <Landmark className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-dpurpose-dark">Public Banks</CardTitle>
              <CardDescription>Government-owned banks with competitive rates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-2xl font-bold text-dpurpose-dark mb-2">
                  {loansData.filter((loan) => loan.bankType === "Public").length}
                </div>
                <p className="text-gray-600 text-sm mb-4">Available loan schemes</p>
                <Button
                  onClick={() => setSelectedBankType("Public")}
                  className="w-full bg-dpurpose-gradient hover:opacity-90"
                >
                  View Public Bank Loans
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-dpurpose-light hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-dpurpose-gradient rounded-lg flex items-center justify-center mx-auto mb-4">
                <Building className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-dpurpose-dark">Private Banks</CardTitle>
              <CardDescription>Private banks with faster processing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-2xl font-bold text-dpurpose-dark mb-2">
                  {loansData.filter((loan) => loan.bankType === "Private").length}
                </div>
                <p className="text-gray-600 text-sm mb-4">Available loan schemes</p>
                <Button
                  onClick={() => setSelectedBankType("Private")}
                  className="w-full bg-dpurpose-gradient hover:opacity-90"
                >
                  View Private Bank Loans
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8 border-dpurpose-light">
          <CardHeader>
            <CardTitle className="flex items-center text-dpurpose-dark">
              <Filter className="w-5 h-5 mr-2" />
              Search & Filter Loans
            </CardTitle>
            <CardDescription>Find the perfect loan by bank type, category, and specific bank</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search loans by name, bank, or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-dpurpose-light focus:border-dpurpose-dark"
              />
            </div>

            {/* Filter Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Bank Type</label>
                <Select value={selectedBankType} onValueChange={setSelectedBankType}>
                  <SelectTrigger className="border-dpurpose-light focus:border-dpurpose-dark">
                    <SelectValue placeholder="Select Bank Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Bank Types</SelectItem>
                    {bankTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type} Banks
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
                <label className="text-sm font-medium text-gray-700">Specific Bank</label>
                <Select value={selectedBank} onValueChange={setSelectedBank}>
                  <SelectTrigger className="border-dpurpose-light focus:border-dpurpose-dark">
                    <SelectValue placeholder="Select Bank" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Banks</SelectItem>
                    {banks.map((bank) => (
                      <SelectItem key={bank} value={bank}>
                        {bank}
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
              {selectedBankType !== "all" && (
                <Badge variant="secondary" className="bg-dpurpose-light text-white">
                  Bank Type: {selectedBankType}
                </Badge>
              )}
              {selectedCategory !== "all" && (
                <Badge variant="secondary" className="bg-dpurpose-light text-white">
                  Category: {selectedCategory}
                </Badge>
              )}
              {selectedBank !== "all" && (
                <Badge variant="secondary" className="bg-dpurpose-light text-white">
                  Bank: {selectedBank}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-gray-600">
            {isLoading ? "Searching..." : `Found ${filteredLoans.length} loan${filteredLoans.length !== 1 ? "s" : ""}`}
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Sort by:</span>
            <Select defaultValue="relevance">
              <SelectTrigger className="w-32 border-dpurpose-light">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="interest">Interest Rate</SelectItem>
                <SelectItem value="amount">Loan Amount</SelectItem>
                <SelectItem value="processing">Processing Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Loans Grid */}
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
        ) : filteredLoans.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No loans found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search criteria or clearing filters</p>
              <Button onClick={clearFilters} className="bg-dpurpose-gradient hover:opacity-90">
                Clear All Filters
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLoans.map((loan) => (
              <Card key={loan.id} className="hover:shadow-lg transition-shadow border-dpurpose-light group">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge
                      className={loan.bankType === "Public" ? "bg-dpurpose-light text-white" : "bg-gray-600 text-white"}
                    >
                      {loan.bankType} Bank
                    </Badge>
                    <Badge variant="outline" className="text-xs border-dpurpose-light">
                      {loan.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg group-hover:text-dpurpose-dark transition-colors">
                    {loan.name}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    <div className="flex items-center text-gray-500">
                      <Landmark className="w-3 h-3 mr-1" />
                      {loan.bankName}
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-600">Loan Amount:</span>
                        <div className="font-semibold text-dpurpose-dark">{loan.amount}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Interest Rate:</span>
                        <div className="font-semibold text-dpurpose-dark flex items-center">
                          <Percent className="w-3 h-3 mr-1" />
                          {loan.interestRate}
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 line-clamp-2">{loan.description}</p>

                    <div className="text-xs text-gray-500">
                      <strong>Eligibility:</strong> {loan.eligibility}
                    </div>

                    <div className="flex items-center text-xs text-green-600">
                      <Clock className="w-3 h-3 mr-1" />
                      Processing: {loan.processingTime}
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button size="sm" className="flex-1 bg-dpurpose-gradient hover:opacity-90" asChild>
                        <a href={loan.applicationUrl} target="_blank" rel="noopener noreferrer">
                          Apply Now
                          <ExternalLink className="w-3 h-3 ml-1" />
                        </a>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-dpurpose-light text-dpurpose-dark hover:bg-dpurpose-light hover:text-white bg-transparent"
                      >
                        Compare
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {filteredLoans.length > 0 && (
          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              className="border-dpurpose-light text-dpurpose-dark hover:bg-dpurpose-light hover:text-white bg-transparent"
            >
              Load More Loans
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
          <p className="text-green-200 mb-4">Connecting businesses with the right funding solutions</p>
          <div className="flex justify-center space-x-6 text-sm">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/grants" className="hover:text-white transition-colors">
              Grants
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
