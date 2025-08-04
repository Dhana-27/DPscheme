-- Seed data for SchemeConnect platform

-- Insert sample schemes data
INSERT INTO schemes (name, type, provider, provider_type, category, amount_min, amount_max, amount_display, description, eligibility, application_url, interest_rate, tenure, processing_fee, documents_required, state) VALUES

-- Central Government Schemes
('PM Mudra Yojana', 'loan', 'Central Government', 'central_govt', 'Business', 50000, 1000000, 'Up to ₹10 Lakhs', 'Micro-finance scheme for small businesses and entrepreneurs', 'Indian citizens, existing business or new venture', 'https://www.mudra.org.in/', '8-12% per annum', 'Up to 5 years', '0.5-1% of loan amount', 'Aadhaar, PAN, Business plan, Bank statements', 'All India'),

('Startup India Seed Fund', 'grant', 'Central Government', 'central_govt', 'Startup', 2000000, 5000000, 'Up to ₹50 Lakhs', 'Financial support for startups in proof of concept stage', 'DPIIT recognized startups, incorporated within 2 years', 'https://www.startupindia.gov.in/', 'N/A', 'N/A', 'No processing fee', 'Incorporation certificate, Business plan, Financial projections', 'All India'),

('PM Kisan Credit Card', 'loan', 'Central Government', 'central_govt', 'Agriculture', 100000, 300000, 'Up to ₹3 Lakhs', 'Credit facility for farmers for agricultural needs', 'Farmers with land ownership or tenant farmers', 'https://pmkisan.gov.in/', '7% per annum', 'Up to 5 years', 'Nil', 'Land documents, Aadhaar, Bank passbook', 'All India'),

('Stand Up India Scheme', 'loan', 'Central Government', 'central_govt', 'Women', 1000000, 10000000, '₹10 Lakhs to ₹1 Crore', 'Bank loans for SC/ST and women entrepreneurs', 'SC/ST and women entrepreneurs, age 18+ years', 'https://www.standupmitra.in/', '8-10% per annum', 'Up to 7 years', '1% of loan amount', 'Aadhaar, PAN, Project report, Caste certificate (if applicable)', 'All India'),

-- State Government Schemes
('Maharashtra Startup Policy Grant', 'grant', 'Maharashtra Government', 'state_govt', 'Startup', 500000, 2500000, 'Up to ₹25 Lakhs', 'State government grant for innovative startups', 'Startups registered in Maharashtra', 'https://startup.maharashtra.gov.in/', 'N/A', 'N/A', 'No processing fee', 'Registration certificate, Business plan, Innovation details', 'Maharashtra'),

('Karnataka Innovation Fund', 'grant', 'Karnataka Government', 'state_govt', 'Technology', 1000000, 5000000, 'Up to ₹50 Lakhs', 'Funding for technology-based startups', 'Tech startups registered in Karnataka', 'https://www.karnataka.gov.in/', 'N/A', 'N/A', 'No processing fee', 'Tech prototype, Business model, Team details', 'Karnataka'),

('Tamil Nadu Women Entrepreneur Scheme', 'loan', 'Tamil Nadu Government', 'state_govt', 'Women', 500000, 2000000, 'Up to ₹20 Lakhs', 'Special loan scheme for women entrepreneurs in TN', 'Women entrepreneurs in Tamil Nadu', 'https://www.tn.gov.in/', '6-8% per annum', 'Up to 5 years', '0.5% of loan amount', 'Business plan, Residence proof, Income certificate', 'Tamil Nadu'),

-- Public Banks
('SBI Business Loan', 'loan', 'State Bank of India', 'public_bank', 'Business', 1000000, 5000000, 'Up to ₹50 Lakhs', 'Quick business loans for working capital and expansion', 'Business vintage of 2+ years, good credit score', 'https://sbi.co.in/', '9-12% per annum', 'Up to 7 years', '1% of loan amount', 'Financial statements, ITR, Bank statements, Business registration', 'All India'),

('SBI Women Entrepreneur Loan', 'loan', 'State Bank of India', 'public_bank', 'Women', 1000000, 20000000, 'Up to ₹2 Crores', 'Special loan scheme for women entrepreneurs', 'Women entrepreneurs, minimum 51% stake', 'https://sbi.co.in/', '8.5-11% per annum', 'Up to 10 years', '0.75% of loan amount', 'Business plan, Financial projections, Collateral documents', 'All India'),

('PNB Agriculture Loan', 'loan', 'Punjab National Bank', 'public_bank', 'Agriculture', 200000, 1000000, 'Up to ₹10 Lakhs', 'Comprehensive agriculture financing solutions', 'Farmers with valid land documents', 'https://www.pnbindia.in/', '7.5-9% per annum', 'Up to 5 years', '0.5% of loan amount', 'Land records, Crop details, Income proof', 'All India'),

('Bank of Baroda MSME Loan', 'loan', 'Bank of Baroda', 'public_bank', 'Business', 2500000, 10000000, 'Up to ₹1 Crore', 'Loans for micro, small and medium enterprises', 'MSME registration, business operational for 2+ years', 'https://www.bankofbaroda.in/', '9-13% per annum', 'Up to 7 years', '1% of loan amount', 'MSME certificate, Financial statements, Project report', 'All India'),

-- Private Banks
('HDFC Business Loan', 'loan', 'HDFC Bank', 'private_bank', 'Business', 1000000, 7500000, 'Up to ₹75 Lakhs', 'Quick business loans for working capital and expansion', 'Business vintage of 2+ years, good credit score', 'https://www.hdfcbank.com/', '10-15% per annum', 'Up to 5 years', '1-2% of loan amount', 'ITR, Bank statements, Business registration, Financial statements', 'All India'),

('ICICI Bank Startup Loan', 'loan', 'ICICI Bank', 'private_bank', 'Startup', 500000, 5000000, 'Up to ₹50 Lakhs', 'Funding solutions for early-stage startups', 'Startups with viable business model', 'https://www.icicibank.com/', '11-16% per annum', 'Up to 5 years', '1.5% of loan amount', 'Business plan, Founder profiles, Financial projections', 'All India'),

('Axis Bank Women Power Loan', 'loan', 'Axis Bank', 'private_bank', 'Women', 1000000, 15000000, 'Up to ₹1.5 Crores', 'Exclusive loan products for women entrepreneurs', 'Women-owned businesses, good credit history', 'https://www.axisbank.com/', '9.5-14% per annum', 'Up to 7 years', '1% of loan amount', 'Business registration, Financial statements, Collateral documents', 'All India'),

('Kotak Mahindra Agriculture Loan', 'loan', 'Kotak Mahindra Bank', 'private_bank', 'Agriculture', 300000, 2000000, 'Up to ₹20 Lakhs', 'Comprehensive agricultural financing', 'Farmers and agri-businesses', 'https://www.kotak.com/', '8-12% per annum', 'Up to 5 years', '0.75% of loan amount', 'Land documents, Crop insurance, Income proof', 'All India'),

-- Regional Rural Banks
('Prathama Bank Agriculture Loan', 'loan', 'Prathama UP Gramin Bank', 'rrb', 'Agriculture', 100000, 500000, 'Up to ₹5 Lakhs', 'Rural agriculture financing for small farmers', 'Small and marginal farmers in UP', 'https://www.prathama.in/', '6.5-8% per annum', 'Up to 3 years', 'Minimal processing fee', 'Land records, Aadhaar, Bank passbook', 'Uttar Pradesh'),

('Karnataka Gramin Bank MSME Loan', 'loan', 'Karnataka Vikas Grameena Bank', 'rrb', 'Business', 200000, 1000000, 'Up to ₹10 Lakhs', 'MSME financing for rural entrepreneurs', 'Rural entrepreneurs in Karnataka', 'https://www.kvgb.in/', '8-10% per annum', 'Up to 5 years', '0.5% of loan amount', 'MSME registration, Business plan, Income proof', 'Karnataka'),

('Rajasthan Gramin Bank Women Loan', 'loan', 'Rajasthan Marudhara Gramin Bank', 'rrb', 'Women', 150000, 750000, 'Up to ₹7.5 Lakhs', 'Special loans for rural women entrepreneurs', 'Rural women in Rajasthan', 'https://www.rmgb.in/', '7-9% per annum', 'Up to 5 years', 'Minimal processing fee', 'Business plan, SHG membership, Income certificate', 'Rajasthan'),

-- Education Loans
('SBI Education Loan', 'loan', 'State Bank of India', 'public_bank', 'Education', 100000, 2000000, 'Up to ₹20 Lakhs', 'Comprehensive education financing for higher studies', 'Students admitted to recognized institutions', 'https://sbi.co.in/', '8.5-11.5% per annum', 'Course duration + 1 year', '1% of loan amount', 'Admission letter, Fee structure, Academic records, Income proof', 'All India'),

('HDFC Education Loan', 'loan', 'HDFC Bank', 'private_bank', 'Education', 100000, 2000000, 'Up to ₹20 Lakhs', 'Education loans for domestic and international studies', 'Students with confirmed admission', 'https://www.hdfcbank.com/', '9-13% per annum', 'Course duration + 1 year', '1% of loan amount', 'Admission confirmation, Course details, Co-applicant documents', 'All India'),

-- Technology and Innovation Grants
('BIRAC Biotechnology Grant', 'grant', 'Central Government', 'central_govt', 'Technology', 1000000, 10000000, 'Up to ₹1 Crore', 'Funding for biotechnology innovations and startups', 'Biotech companies and research institutions', 'https://www.birac.nic.in/', 'N/A', 'N/A', 'No processing fee', 'Research proposal, Team credentials, Innovation details', 'All India');

-- Update the updated_at timestamp
UPDATE schemes SET updated_at = CURRENT_TIMESTAMP;
