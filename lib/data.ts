export interface Grant {
  id: string
  name: string
  description: string
  amount: string
  eligibility: string
  category: string
  state: string
  district?: string
  provider: string
  applicationUrl: string
  deadline?: string
  status: "Active" | "Inactive"
}

export interface Loan {
  id: string
  name: string
  description: string
  amount: string
  interestRate: string
  eligibility: string
  category: string
  bankType: "Public" | "Private"
  bankName: string
  applicationUrl: string
  processingTime: string
  status: "Active" | "Inactive"
}

// Sample grants data based on your database structure
export const grantsData: Grant[] = [
  {
    id: "1",
    name: "PM Mudra Yojana",
    description: "Micro-finance scheme for small businesses and entrepreneurs",
    amount: "Up to ₹10 Lakhs",
    eligibility: "Indian citizens, existing business or new venture",
    category: "Business",
    state: "All India",
    provider: "Central Government",
    applicationUrl: "https://www.mudra.org.in/",
    status: "Active",
  },
  {
    id: "2",
    name: "Startup India Seed Fund",
    description: "Financial support for startups in proof of concept stage",
    amount: "Up to ₹50 Lakhs",
    eligibility: "DPIIT recognized startups, incorporated within 2 years",
    category: "Startup",
    state: "All India",
    provider: "Central Government",
    applicationUrl: "https://www.startupindia.gov.in/",
    status: "Active",
  },
  {
    id: "3",
    name: "Maharashtra Startup Policy Grant",
    description: "State government grant for innovative startups",
    amount: "Up to ₹25 Lakhs",
    eligibility: "Startups registered in Maharashtra",
    category: "Startup",
    state: "Maharashtra",
    district: "Mumbai",
    provider: "State Government",
    applicationUrl: "https://startup.maharashtra.gov.in/",
    status: "Active",
  },
  {
    id: "4",
    name: "Karnataka Women Entrepreneur Grant",
    description: "Special grant scheme for women entrepreneurs in Karnataka",
    amount: "Up to ₹15 Lakhs",
    eligibility: "Women entrepreneurs, minimum 51% stake",
    category: "Women",
    state: "Karnataka",
    district: "Bangalore",
    provider: "State Government",
    applicationUrl: "https://karnataka.gov.in/",
    status: "Active",
  },
  {
    id: "5",
    name: "Tamil Nadu Agriculture Grant",
    description: "Financial assistance for agricultural modernization",
    amount: "Up to ₹5 Lakhs",
    eligibility: "Farmers with valid land documents",
    category: "Agriculture",
    state: "Tamil Nadu",
    district: "Chennai",
    provider: "State Government",
    applicationUrl: "https://tn.gov.in/",
    status: "Active",
  },
]

// Sample loans data based on your database structure
export const loansData: Loan[] = [
  {
    id: "1",
    name: "SBI Business Loan",
    description: "Comprehensive business loan for working capital and expansion",
    amount: "Up to ₹50 Lakhs",
    interestRate: "8.5% - 12%",
    eligibility: "Business vintage of 2+ years, good credit score",
    category: "Business",
    bankType: "Public",
    bankName: "State Bank of India",
    applicationUrl: "https://sbi.co.in/",
    processingTime: "7-15 days",
    status: "Active",
  },
  {
    id: "2",
    name: "HDFC Women Entrepreneur Loan",
    description: "Special loan scheme for women entrepreneurs",
    amount: "Up to ₹2 Crores",
    interestRate: "9% - 14%",
    eligibility: "Women entrepreneurs, minimum 51% stake",
    category: "Women",
    bankType: "Private",
    bankName: "HDFC Bank",
    applicationUrl: "https://www.hdfcbank.com/",
    processingTime: "5-10 days",
    status: "Active",
  },
  {
    id: "3",
    name: "PNB Agriculture Loan",
    description: "Specialized loan for agricultural activities and equipment",
    amount: "Up to ₹25 Lakhs",
    interestRate: "7% - 10%",
    eligibility: "Farmers with valid land documents",
    category: "Agriculture",
    bankType: "Public",
    bankName: "Punjab National Bank",
    applicationUrl: "https://www.pnbindia.in/",
    processingTime: "10-20 days",
    status: "Active",
  },
  {
    id: "4",
    name: "ICICI Startup Loan",
    description: "Quick loan facility for startups and new businesses",
    amount: "Up to ₹1 Crore",
    interestRate: "10% - 16%",
    eligibility: "Startups with business plan and collateral",
    category: "Startup",
    bankType: "Private",
    bankName: "ICICI Bank",
    applicationUrl: "https://www.icicibank.com/",
    processingTime: "3-7 days",
    status: "Active",
  },
  {
    id: "5",
    name: "Canara Bank MSME Loan",
    description: "Micro, Small and Medium Enterprise development loan",
    amount: "Up to ₹75 Lakhs",
    interestRate: "8% - 13%",
    eligibility: "MSME registration, 3+ years business experience",
    category: "MSME",
    bankType: "Public",
    bankName: "Canara Bank",
    applicationUrl: "https://canarabank.com/",
    processingTime: "7-14 days",
    status: "Active",
  },
]

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
]

export const categories = [
  "Business",
  "Startup",
  "Women",
  "Agriculture",
  "MSME",
  "Education",
  "Healthcare",
  "Technology",
  "Manufacturing",
  "Export",
]

export const bankTypes = ["Public", "Private"]
