'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, Filter, MapPin, Building, ExternalLink, Leaf, ArrowLeft, Loader2, RefreshCw } from 'lucide-react'
import { getSchemes, type Scheme } from '@/lib/database'

const INDIAN_STATES = [
  'All India', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
]

const SCHEME_CATEGORIES = [
  'Agriculture', 'Business', 'Education', 'Healthcare', 'Housing', 'Innovation',
  'Manufacturing', 'Rural Development', 'Skill Development', 'Startup', 'Technology',
  'Tourism', 'Transportation', 'Women Empowerment', 'Youth Development'
]

const PROVIDER_TYPES = [
  { value: 'central_govt', label: 'Central Government' },
  { value: 'state_govt', label: 'State Government' },
  { value: 'local_authority', label: 'Local Authority' }
]

export default function GrantsPage() {
  const [schemes, setSchemes] = useState<Scheme[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedState, setSelectedState] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedProviderType, setSelectedProviderType] = useState('')
  const [activeTab, setActiveTab] = useState('all')

  useEffect(() => {
    fetchGrants()
  }, [searchQuery, selectedState, selectedCategory, selectedProviderType, activeTab])

  const fetchGrants = async () => {
    setLoading(true)
    try {
      const filters = {
        state: selectedState || undefined,
        category: selectedCategory || undefined,
        provider_type: selectedProviderType || undefined,
        search: searchQuery || undefined
      }
      
      const data = await getSchemes(filters)
      setSchemes(data)
    } catch (error) {
      console.error('Error fetching schemes:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredSchemesByTab = schemes.filter(scheme => {
    if (activeTab === 'all') return true
    if (activeTab === 'central') return scheme.provider_type === 'central_govt'
    if (activeTab === 'state') return scheme.provider_type === 'state_govt'
    return true
  })

  const centralSchemesCount = schemes.filter(s => s.provider_type === 'central_govt').length
  const stateSchemesCount = schemes.filter(s => s.provider_type === 'state_govt').length

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
              <Link href="/loans" className="text-gray-700 hover:text-dpurpose-dark transition-colors">
                Loans
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Government Grants</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover funding opportunities from central and state governments. 
            Search by location, category, and eligibility criteria.
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8 border-dpurpose-dark/20">
          <CardHeader>
            <CardTitle className="text-dpurpose-dark flex items-center">
              <Search className="w-5 h-5 mr-2" />
              Search & Filter Grants
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search Bar */}
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search grants by name, description, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 focus:border-dpurpose-dark focus:ring-dpurpose-dark"
                />
              </div>
              <Button 
                onClick={fetchGrants}
                className="bg-dpurpose-dark hover:bg-dpurpose-dark/90 text-white"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Select value={selectedState} onValueChange={setSelectedState}>
                  <SelectTrigger className="focus:border-dpurpose-dark focus:ring-dpurpose-dark">
                    <SelectValue placeholder="Select State" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All States</SelectItem>
                    {INDIAN_STATES.map(state => (
                      <SelectItem key={state} value={state}>{state}</SelectItem>
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
                    {SCHEME_CATEGORIES.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Select value={selectedProviderType} onValueChange={setSelectedProviderType}>
                  <SelectTrigger className="focus:border-dpurpose-dark focus:ring-dpurpose-dark">
                    <SelectValue placeholder="Select Provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Providers</SelectItem>
                    {PROVIDER_TYPES.map(type => (
                      <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
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
              All Grants ({schemes.length})
            </TabsTrigger>
            <TabsTrigger value="central" className="data-[state=active]:bg-dpurpose-dark data-[state=active]:text-white">
              Central Government ({centralSchemesCount})
            </TabsTrigger>
            <TabsTrigger value="state" className="data-[state=active]:bg-dpurpose-dark data-[state=active]:text-white">
              State Government ({stateSchemesCount})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            {loading ? (
              <div className="text-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-dpurpose-dark mx-auto mb-4" />
                <p className="text-gray-600">Loading grants...</p>
              </div>
            ) : filteredSchemesByTab.length === 0 ? (
              <Card className="text-center py-12 border-dpurpose-dark/20 shadow-lg">
                <CardContent>
                  <Filter className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No grants found</h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your search criteria or filters
                  </p>
                  <Button 
                    onClick={() => {
                      setSearchQuery('')
                      setSelectedState('')
                      setSelectedCategory('')
                      setSelectedProviderType('')
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
                {filteredSchemesByTab.map((scheme) => (
                  <Card key={scheme.id} className="hover:shadow-lg transition-shadow border-dpurpose-dark/20">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge 
                          variant={scheme.provider_type === 'central_govt' ? 'default' : 'secondary'}
                          className={scheme.provider_type === 'central_govt' ? 'bg-dpurpose-dark text-white' : 'bg-gray-200 text-gray-800'}
                        >
                          {scheme.provider}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {scheme.category}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg line-clamp-2">{scheme.name}</CardTitle>
                      <CardDescription className="text-sm text-gray-500 flex items-center">
                        {scheme.state && (
                          <>
                            <MapPin className="w-3 h-3 mr-1" />
                            {scheme.state}
                            {scheme.district && ` • ${scheme.district}`}
                          </>
                        )}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <div className="text-2xl font-bold text-dpurpose-dark mb-1">{scheme.amount}</div>
                          <p className="text-gray-600 text-sm line-clamp-2">{scheme.description}</p>
                        </div>
                        
                        <div className="space-y-2 text-xs text-gray-600">
                          <div>
                            <span className="font-medium">Eligibility:</span>
                            <p className="line-clamp-2">{scheme.eligibility}</p>
                          </div>
                          <div>
                            <span className="font-medium">Contact:</span>
                            <p className="line-clamp-1">{scheme.contact_info}</p>
                          </div>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Button 
                            size="sm" 
                            className="flex-1 bg-dpurpose-dark hover:bg-dpurpose-dark/90 text-white"
                            asChild
                          >
                            <a href={scheme.website_url || '#'} target="_blank" rel="noopener noreferrer">
                              Apply Now
                            </a>
                          </Button>
                          {scheme.website_url && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="border-dpurpose-dark text-dpurpose-dark hover:bg-dpurpose-dark hover:text-white"
                              asChild
                            >
                              <a href={scheme.website_url} target="_blank" rel="noopener noreferrer">
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
        {!loading && filteredSchemesByTab.length > 0 && (
          <div className="text-center mt-8 text-gray-600">
            <p>Showing {filteredSchemesByTab.length} grant{filteredSchemesByTab.length !== 1 ? 's' : ''}</p>
          </div>
        )}
      </div>
    </div>
  )
}
