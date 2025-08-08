'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, Filter, Building, Landmark, ExternalLink, Leaf, ArrowLeft, Loader2, RefreshCw, Clock, Percent } from 'lucide-react'
import { getLoans, type Loan } from '@/lib/database'

const LOAN_CATEGORIES = [
  'Business', 'Personal', 'Home', 'Education', 'Vehicle', 'Agriculture',
  'SME', 'Startup', 'Working Capital', 'Equipment', 'Gold', 'Credit Card'
]

const BANK_TYPES = [
  { value: 'public_sector', label: 'Public Sector Banks' },
  { value: 'private_sector', label: 'Private Sector Banks' },
  { value: 'rrb', label: 'Regional Rural Banks' },
  { value: 'cooperative', label: 'Cooperative Banks' }
]

export default function LoansPage() {
  const [loans, setLoans] = useState<Loan[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBankType, setSelectedBankType] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [activeTab, setActiveTab] = useState('all')

  useEffect(() => {
    fetchLoans()
  }, [searchQuery, selectedBankType, selectedCategory, activeTab])

  const fetchLoans = async () => {
    setLoading(true)
    try {
      const filters = {
        search: searchQuery || undefined,
        bank_type: selectedBankType || undefined,
        category: selectedCategory || undefined,
      }
      
      const data = await getLoans(filters)
      setLoans(data)
    } catch (error) {
      console.error('Error fetching loans:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredLoansByTab = loans.filter(loan => {
    if (activeTab === 'all') return true
    if (activeTab === 'public') return loan.bank_type === 'public_sector'
    if (activeTab === 'private') return loan.bank_type === 'private_sector'
    return true
  })

  const publicLoansCount = loans.filter(l => l.bank_type === 'public_sector').length
  const privateLoansCount = loans.filter(l => l.bank_type === 'private_sector').length

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center text-sm text-gray-600 hover:text-dpurpose-dark">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-dpurpose-dark rounded-lg flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-dpurpose-dark">DPurpose Foundation</span>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/grants" className="text-gray-700 hover:text-dpurpose-dark transition-colors">
                Grants
              </Link>
              <Link href="/dashboard" className="text-gray-700 hover:text-dpurpose-dark transition-colors">
                Dashboard
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Bank Loans</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Compare loan options from public and private banks. 
            Find the best rates and terms for your financial needs.
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8 border-dpurpose-dark/20">
          <CardHeader>
            <CardTitle className="text-dpurpose-dark flex items-center">
              <Search className="w-5 h-5 mr-2" />
              Search & Filter Loans
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search Bar */}
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search loans by name, bank, or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 focus:border-dpurpose-dark focus:ring-dpurpose-dark"
                />
              </div>
              <Button 
                onClick={fetchLoans}
                className="bg-dpurpose-dark hover:bg-dpurpose-dark/90 text-white"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Select value={selectedBankType} onValueChange={setSelectedBankType}>
                  <SelectTrigger className="focus:border-dpurpose-dark focus:ring-dpurpose-dark">
                    <SelectValue placeholder="Select Bank Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Banks</SelectItem>
                    {BANK_TYPES.map(type => (
                      <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="focus:border-dpurpose-dark focus:ring-dpurpose-dark">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Categories</SelectItem>
                    {LOAN_CATEGORIES.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-3 bg-white border border-dpurpose-dark/20">
            <TabsTrigger value="all" className="data-[state=active]:bg-dpurpose-dark data-[state=active]:text-white">
              All Loans ({loans.length})
            </TabsTrigger>
            <TabsTrigger value="public" className="data-[state=active]:bg-dpurpose-dark data-[state=active]:text-white">
              Public Banks ({publicLoansCount})
            </TabsTrigger>
            <TabsTrigger value="private" className="data-[state=active]:bg-dpurpose-dark data-[state=active]:text-white">
              Private Banks ({privateLoansCount})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            {loading ? (
              <div className="text-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-dpurpose-dark mx-auto mb-4" />
                <p className="text-gray-600">Loading loans...</p>
              </div>
            ) : filteredLoansByTab.length === 0 ? (
              <Card className="text-center py-12 border-dpurpose-dark/20 shadow-lg">
                <CardContent>
                  <Filter className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No loans found</h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your search criteria or filters
                  </p>
                  <Button 
                    onClick={() => {
                      setSearchQuery('')
                      setSelectedBankType('')
                      setSelectedCategory('')
                      setActiveTab('all')
                    }}
                    variant="outline"
                    className="border-dpurpose-dark text-dpurpose-dark hover:bg-dpurpose-dark hover:text-white"
                  >
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredLoansByTab.map((loan) => (
                  <Card key={loan.id} className="hover:shadow-lg transition-shadow border-dpurpose-dark/20">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge 
                          variant={loan.bank_type === 'public_sector' ? 'default' : 'secondary'}
                          className={loan.bank_type === 'public_sector' ? 'bg-dpurpose-dark text-white' : 'bg-gray-200 text-gray-800'}
                        >
                          {loan.bank_type === 'public_sector' ? (
                            <>
                              <Landmark className="w-3 h-3 mr-1" />
                              Public Bank
                            </>
                          ) : (
                            <>
                              <Building className="w-3 h-3 mr-1" />
                              Private Bank
                            </>
                          )}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {loan.category}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg line-clamp-2">{loan.name}</CardTitle>
                      <CardDescription className="text-sm text-gray-500">
                        {loan.bank_name}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <div className="text-lg font-bold text-dpurpose-dark">{loan.amount}</div>
                            <div className="text-xs text-gray-500">Loan Amount</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-dpurpose-dark flex items-center">
                              <Percent className="w-3 h-3 mr-1" />
                              {loan.interest_rate}
                            </div>
                            <div className="text-xs text-gray-500">Interest Rate</div>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 text-sm line-clamp-2">{loan.description}</p>
                        
                        <div className="space-y-2 text-xs text-gray-600">
                          <div className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            <span className="font-medium">Processing:</span>
                            <span className="ml-1">{loan.processing_time}</span>
                          </div>
                          <div>
                            <span className="font-medium">Eligibility:</span>
                            <p className="line-clamp-2">{loan.eligibility}</p>
                          </div>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Button 
                            size="sm" 
                            className="flex-1 bg-dpurpose-dark hover:bg-dpurpose-dark/90 text-white"
                            asChild
                          >
                            <a href={loan.website_url || '#'} target="_blank" rel="noopener noreferrer">
                              Apply Now
                            </a>
                          </Button>
                          {loan.website_url && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="border-dpurpose-dark text-dpurpose-dark hover:bg-dpurpose-dark hover:text-white"
                              asChild
                            >
                              <a href={loan.website_url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Results Summary */}
        {!loading && filteredLoansByTab.length > 0 && (
          <div className="text-center mt-8 text-gray-600">
            <p>Showing {filteredLoansByTab.length} loan{filteredLoansByTab.length !== 1 ? 's' : ''}</p>
          </div>
        )}
      </div>
    </div>
  )
}
