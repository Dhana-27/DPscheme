-- Insert sample schemes data

INSERT INTO schemes (name, type, category, provider, provider_type, amount_min, amount_max, amount_description, description, eligibility, application_url) VALUES

-- Central Government Grants
('PM Kisan Samman Nidhi', 'grant', 'Agriculture', 'Ministry of Agriculture', 'central_govt', 6000, 6000, '₹6,000 per year', 'Direct income support scheme for farmers', 'Small and marginal farmers with cultivable land', 'https://pmkisan.gov.in/'),

('Startup India Seed Fund', 'grant', 'Startup', 'Department for Promotion of Industry and Internal Trade', 'central_govt', 500000, 5000000, 'Up to ₹50 Lakhs', 'Seed funding support to startups for proof of concept, prototype development, product trials, market entry and commercialization', 'DPIIT recognized startups incorporated not more than 2 years ago', 'https://seedfund.startupindia.gov.in/'),

('Digital India Land Records Modernization', 'grant', 'Technology', 'Ministry of Electronics and IT', 'central_govt', 1000000, 10000000, '₹10 Lakhs - ₹1 Crore', 'Grant for digitization of land records', 'State governments and UTs', 'https://digitalindia.gov.in/'),

-- Central Government Loans
('PM Mudra Yojana', 'loan', 'Business', 'Ministry of Finance', 'central_govt', 50000, 1000000, 'Up to ₹10 Lakhs', 'Micro-finance scheme providing loans to small business owners and entrepreneurs', 'Small business owners, entrepreneurs, and self-employed individuals', 'https://www.mudra.org.in/'),

('Stand Up India Scheme', 'loan', 'Business', 'Ministry of Finance', 'central_govt', 1000000, 10000000, '₹10 Lakhs - ₹1 Crore', 'Bank loans between ₹10 lakh and ₹1 crore to at least one Scheduled Caste or Scheduled Tribe borrower and at least one woman borrower per bank branch', 'SC/ST and women entrepreneurs aged 18 years and above', 'https://www.standupmitra.in/'),

-- Public Bank Loans
('SBI SME Loan', 'loan', 'Business', 'State Bank of India', 'public_bank', 100000, 50000000, 'Up to ₹5 Crores', 'Working capital and term loans for Small and Medium Enterprises', 'SMEs with minimum 2 years of business experience', 'https://sbi.co.in/web/sme'),

('PNB Business Loan', 'loan', 'Business', 'Punjab National Bank', 'public_bank', 100000, 20000000, 'Up to ₹2 Crores', 'Unsecured business loans for working capital and business expansion', 'Business owners with minimum 3 years of experience', 'https://www.pnbindia.in/'),

('Bank of Baroda Kisan Credit Card', 'loan', 'Agriculture', 'Bank of Baroda', 'public_bank', 25000, 300000, 'Based on crop requirement', 'Credit facility for agricultural and allied activities', 'Farmers engaged in agriculture and allied activities', 'https://www.bankofbaroda.in/'),

-- Private Bank Loans
('HDFC Business Loan', 'loan', 'Business', 'HDFC Bank', 'private_bank', 100000, 4000000, '₹1 Lakh - ₹40 Lakhs', 'Unsecured business loans for SMEs with quick processing', 'Business owners with minimum 2 years of business experience', 'https://www.hdfcbank.com/personal/borrow/business-loan'),

('ICICI Bank Business Loan', 'loan', 'Business', 'ICICI Bank', 'private_bank', 100000, 5000000, '₹1 Lakh - ₹50 Lakhs', 'Collateral-free business loans with flexible repayment options', 'Proprietorship, Partnership, Private Limited companies', 'https://www.icicibank.com/business-banking/loans'),

('Axis Bank Education Loan', 'loan', 'Education', 'Axis Bank', 'private_bank', 100000, 2000000, 'Up to ₹20 Lakhs', 'Education loans for higher studies in India and abroad', 'Students admitted to recognized institutions', 'https://www.axisbank.com/retail/loans/education-loan'),

-- Regional Rural Bank Loans
('Gramin Bank Agriculture Loan', 'loan', 'Agriculture', 'Regional Rural Banks', 'rural_bank', 25000, 500000, 'Up to ₹5 Lakhs', 'Agricultural loans for crop production, farm mechanization, and allied activities', 'Small and marginal farmers in rural areas', 'https://www.nabard.org/'),

('RRB Self Help Group Loan', 'loan', 'Microfinance', 'Regional Rural Banks', 'rural_bank', 10000, 200000, 'Up to ₹2 Lakhs', 'Loans to Self Help Groups for income generating activities', 'Members of registered Self Help Groups', 'https://www.nabard.org/'),

-- State Government Schemes
('Maharashtra Startup Policy Grant', 'grant', 'Startup', 'Government of Maharashtra', 'state_govt', 500000, 2000000, 'Up to ₹20 Lakhs', 'Financial assistance to startups in Maharashtra', 'Startups registered in Maharashtra', 'https://startup.maharashtra.gov.in/'),

('Karnataka Agriculture Subsidy', 'grant', 'Agriculture', 'Government of Karnataka', 'state_govt', 10000, 100000, 'Up to ₹1 Lakh', 'Subsidy for agricultural equipment and inputs', 'Farmers in Karnataka with valid land documents', 'https://raitamitra.karnataka.gov.in/'),

-- Additional Business Loans
('Kotak Business Loan', 'loan', 'Business', 'Kotak Mahindra Bank', 'private_bank', 100000, 3000000, '₹1 Lakh - ₹30 Lakhs', 'Quick business loans with minimal documentation', 'Business owners with ITR and bank statements', 'https://www.kotak.com/en/business-banking/loans-and-working-capital/business-loan.html'),

('YES Bank SME Loan', 'loan', 'Business', 'YES Bank', 'private_bank', 100000, 2500000, '₹1 Lakh - ₹25 Lakhs', 'Customized loan solutions for SMEs', 'SMEs with minimum 2 years of operations', 'https://www.yesbank.in/business-banking/loans/sme-loans'),

-- Education Loans
('SBI Education Loan', 'loan', 'Education', 'State Bank of India', 'public_bank', 100000, 1500000, 'Up to ₹15 Lakhs', 'Education loans for higher studies with competitive interest rates', 'Students with admission to recognized institutions', 'https://sbi.co.in/web/personal-banking/loans/education-loans'),

('Canara Bank Education Loan', 'loan', 'Education', 'Canara Bank', 'public_bank', 100000, 2000000, 'Up to ₹20 Lakhs', 'Comprehensive education loan scheme for Indian and foreign studies', 'Students with confirmed admission', 'https://canarabank.com/'),

-- Women Entrepreneur Schemes
('Women Entrepreneur Loan Scheme', 'loan', 'Business', 'Various Banks', 'public_bank', 100000, 2000000, 'Up to ₹20 Lakhs', 'Special loan scheme for women entrepreneurs with concessional rates', 'Women entrepreneurs aged 21-65 years', 'https://www.india.gov.in/'),

-- Technology and Innovation
('Technology Development Fund', 'grant', 'Technology', 'Department of Science and Technology', 'central_govt', 1000000, 50000000, '₹10 Lakhs - ₹5 Crores', 'Funding for technology development and innovation projects', 'Research institutions, startups, and companies', 'https://dst.gov.in/');
