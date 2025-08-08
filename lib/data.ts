export interface Grant {
  id: string
  name: string
  description: string
  category: string
  provider: string
  state: string
  district?: string
  amount: string
  eligibility: string
  applicationUrl: string
  deadline?: string
  status: string
}

export interface Loan {
  id: string
  name: string
  description: string
  category: string
  bank: string
  bankType: string
  state: string
  interestRate: string
  maxAmount: string
  processingTime: string
  eligibility: string
  applicationUrl: string
}

export const states = [
  "All India",
  "Andhra Pradesh",
  "Arunachal Pradesh", 
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh"
]

export const categories = [
  "Business",
  "Startup", 
  "Women",
  "Agriculture",
  "Housing",
  "Education",
  "Healthcare",
  "Technology",
  "Manufacturing",
  "Export"
]

export const loanCategories = [
  "Business",
  "MSME",
  "Women",
  "Agriculture", 
  "Housing",
  "Personal",
  "Education",
  "Vehicle",
  "Gold",
  "Property"
]

// API Functions to fetch real data
export async function fetchGrantsFromAPI(): Promise<Grant[]> {
  try {
    const response = await fetch("https://sheetdb.io/api/v1/fcsupah760n6k")
    const data = await response.json()
    
    // Transform the API data to match our Grant interface
    return data.map((item: any, index: number) => ({
      id: item.id || `grant-${index + 1}`,
      name: item.name || item.scheme_name || item.title || 'Unnamed Scheme',
      description: item.description || item.details || item.summary || 'No description available',
      category: item.category || item.sector || item.type || 'General',
      provider: item.provider || item.government_level || item.authority || 'Government',
      state: item.state || item.location || item.region || 'All India',
      district: item.district || item.city || undefined,
      amount: item.amount || item.funding || item.grant_amount || 'Amount not specified',
      eligibility: item.eligibility || item.criteria || item.requirements || 'Please check official website',
      applicationUrl: item.applicationUrl || item.website || item.link || '#',
      deadline: item.deadline || item.last_date || undefined,
      status: item.status || 'Active'
    }))
  } catch (error) {
    console.error('Error fetching grants data:', error)
    return getFallbackGrantsData()
  }
}

export async function fetchLoansFromAPI(): Promise<Loan[]> {
  try {
    // You can add a separate endpoint for loans or use the same one with filtering
    const response = await fetch("https://sheetdb.io/api/v1/fcsupah760n6k")
    const data = await response.json()
    
    // Filter for loan data or transform accordingly
    const loanData = data.filter((item: any) => 
      item.type === 'loan' || 
      item.category?.toLowerCase().includes('loan') ||
      item.provider?.toLowerCase().includes('bank')
    )
    
    return loanData.map((item: any, index: number) => ({
      id: item.id || `loan-${index + 1}`,
      name: item.name || item.loan_name || item.title || 'Bank Loan',
      description: item.description || item.details || 'Loan product description',
      category: item.category || item.loan_type || 'Business',
      bank: item.bank || item.provider || item.institution || 'Bank',
      bankType: item.bankType || item.bank_type || (item.bank?.includes('SBI') || item.bank?.includes('PNB') ? 'Public Sector' : 'Private Sector'),
      state: item.state || item.location || 'All India',
      interestRate: item.interestRate || item.interest || item.rate || 'Contact bank',
      maxAmount: item.maxAmount || item.amount || item.limit || 'As per eligibility',
      processingTime: item.processingTime || item.processing || '7-15 days',
      eligibility: item.eligibility || item.criteria || 'As per bank norms',
      applicationUrl: item.applicationUrl || item.website || item.link || '#'
    }))
  } catch (error) {
    console.error('Error fetching loans data:', error)
    return getFallbackLoansData()
  }
}

// Fallback data in case API fails
function getFallbackGrantsData(): Grant[] {
  return [
    {
      id: "1",
      name: "PM MUDRA Yojana",
      description: "Micro Units Development and Refinance Agency scheme for micro and small enterprises",
      category: "Business",
      provider: "Central Government",
      state: "All India",
      amount: "Up to ₹10 Lakh",
      eligibility: "Micro and small enterprises, individual entrepreneurs",
      applicationUrl: "https://www.mudra.org.in/",
      deadline: "31st March 2024",
      status: "Active"
    },
    {
      id: "2", 
      name: "Stand Up India Scheme",
      description: "Bank loans for SC/ST and women entrepreneurs",
      category: "Women",
      provider: "Central Government",
      state: "All India",
      amount: "₹10 Lakh to ₹1 Crore",
      eligibility: "SC/ST and women entrepreneurs aged 18+ years",
      applicationUrl: "https://www.standupmitra.in/",
      status: "Active"
    },
    {
      id: "3",
      name: "Maharashtra Startup Policy",
      description: "Financial assistance and incubation support for startups",
      category: "Startup",
      provider: "State Government", 
      state: "Maharashtra",
      district: "Mumbai",
      amount: "Up to ₹50 Lakh",
      eligibility: "Registered startups in Maharashtra",
      applicationUrl: "https://startup.maharashtra.gov.in/",
      status: "Active"
    },
    {
      id: "4",
      name: "Karnataka Startup Policy 2022-27",
      description: "Comprehensive startup ecosystem development program",
      category: "Startup",
      provider: "State Government",
      state: "Karnataka", 
      district: "Bangalore",
      amount: "Up to ₹1 Crore",
      eligibility: "Startups registered in Karnataka",
      applicationUrl: "https://startup.karnataka.gov.in/",
      status: "Active"
    },
    {
      id: "5",
      name: "PM Kisan Samman Nidhi",
      description: "Direct income support to farmer families",
      category: "Agriculture",
      provider: "Central Government",
      state: "All India",
      amount: "₹6,000 per year",
      eligibility: "Small and marginal farmer families",
      applicationUrl: "https://pmkisan.gov.in/",
      status: "Active"
    }
  ]
}

function getFallbackLoansData(): Loan[] {
  return [
    {
      id: "1",
      name: "SBI MSME Loan",
      description: "Comprehensive loan solutions for micro, small and medium enterprises",
      category: "MSME",
      bank: "State Bank of India",
      bankType: "Public Sector",
      state: "All India",
      interestRate: "8.50% - 12.50%",
      maxAmount: "Up to ₹25 Crore",
      processingTime: "7-15 days",
      eligibility: "MSMEs with valid business registration",
      applicationUrl: "https://sbi.co.in/web/sme"
    },
    {
      id: "2", 
      name: "HDFC Business Loan",
      description: "Unsecured business loans for working capital and expansion",
      category: "Business",
      bank: "HDFC Bank",
      bankType: "Private Sector",
      state: "All India", 
      interestRate: "11.00% - 21.00%",
      maxAmount: "Up to ₹40 Lakh",
      processingTime: "3-7 days",
      eligibility: "Business vintage of 3+ years, minimum turnover ₹40 Lakh",
      applicationUrl: "https://www.hdfcbank.com/personal/borrow/popular-loans/business-loan"
    },
    {
      id: "3",
      name: "ICICI Bank Women Entrepreneur Loan", 
      description: "Special loan scheme for women entrepreneurs",
      category: "Women",
      bank: "ICICI Bank",
      bankType: "Private Sector",
      state: "All India",
      interestRate: "9.75% - 16.00%",
      maxAmount: "Up to ₹1 Crore",
      processingTime: "5-10 days",
      eligibility: "Women entrepreneurs with business experience",
      applicationUrl: "https://www.icicibank.com/business-banking/loans"
    }
  ]
}

// Legacy exports for backward compatibility
export const grantsData = getFallbackGrantsData()
export const loansData = getFallbackLoansData()
