-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  user_type VARCHAR(50),
  organization VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create sessions table
CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  jwt_token TEXT NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create grants table
CREATE TABLE IF NOT EXISTS grants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(500) NOT NULL,
  provider VARCHAR(255) NOT NULL,
  amount VARCHAR(255),
  category VARCHAR(255),
  description TEXT,
  state VARCHAR(255),
  district VARCHAR(255),
  eligibility TEXT,
  application_process TEXT,
  documents_required TEXT,
  contact_info TEXT,
  website_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create loans table
CREATE TABLE IF NOT EXISTS loans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  bank_name VARCHAR(255),
  bank_type VARCHAR(50), -- e.g., 'public_sector', 'private_sector', 'rrb', 'cooperative'
  amount VARCHAR(100),
  interest_rate VARCHAR(100),
  category VARCHAR(100),
  description TEXT,
  eligibility TEXT,
  documents_required TEXT,
  processing_time VARCHAR(100),
  contact_info TEXT,
  website_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create the 'schemes' table
CREATE TABLE IF NOT EXISTS schemes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    provider VARCHAR(255),
    provider_type VARCHAR(50), -- e.g., 'central_govt', 'state_govt', 'local_authority'
    amount VARCHAR(100),
    category VARCHAR(100),
    state VARCHAR(100),
    district VARCHAR(100),
    eligibility TEXT,
    application_process TEXT,
    documents_required TEXT,
    contact_info TEXT,
    website_url TEXT,
    deadline DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_grants_state ON grants(state);
CREATE INDEX IF NOT EXISTS idx_grants_category ON grants(category);
CREATE INDEX IF NOT EXISTS idx_grants_provider ON grants(provider);
CREATE INDEX IF NOT EXISTS idx_grants_name ON grants USING gin(to_tsvector('english', name));
CREATE INDEX IF NOT EXISTS idx_grants_description ON grants USING gin(to_tsvector('english', description));

CREATE INDEX IF NOT EXISTS idx_schemes_state ON schemes(state);
CREATE INDEX IF NOT EXISTS idx_schemes_category ON schemes(category);
CREATE INDEX IF NOT EXISTS idx_schemes_provider_type ON schemes(provider_type);
CREATE INDEX IF NOT EXISTS idx_loans_bank_name ON loans(bank_name);
CREATE INDEX IF NOT EXISTS idx_loans_bank_type ON loans(bank_type);
CREATE INDEX IF NOT EXISTS idx_loans_category ON loans(category);
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON sessions(expires_at);

-- Add full-text search indexes (example for schemes, can be extended)
ALTER TABLE schemes ADD COLUMN IF NOT EXISTS tsv_search TSVECTOR;
UPDATE schemes SET tsv_search = to_tsvector('english', name || ' ' || description || ' ' || category || ' ' || state || ' ' || provider);
CREATE INDEX IF NOT EXISTS idx_schemes_tsv_search ON schemes USING GIN(tsv_search);

-- Function to update tsv_search on insert/update for schemes
CREATE OR REPLACE FUNCTION update_schemes_tsv_search() RETURNS TRIGGER AS $$
BEGIN
    NEW.tsv_search = to_tsvector('english', NEW.name || ' ' || NEW.description || ' ' || NEW.category || ' ' || NEW.state || ' ' || NEW.provider);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trg_update_schemes_tsv_search
BEFORE INSERT OR UPDATE ON schemes
FOR EACH ROW EXECUTE FUNCTION update_schemes_tsv_search();

-- Function to update updated_at timestamp for all tables
CREATE OR REPLACE FUNCTION update_updated_at_column() RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trg_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE OR REPLACE TRIGGER trg_schemes_updated_at
BEFORE UPDATE ON schemes
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE OR REPLACE TRIGGER trg_loans_updated_at
BEFORE UPDATE ON loans
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO grants (name, provider, amount, category, description, state, eligibility, application_process, documents_required, contact_info) VALUES
('PM Mudra Yojana', 'Central Government', 'Up to ₹10 Lakhs', 'Business', 'Micro-finance scheme for small businesses and entrepreneurs', 'All India', 'Small business owners, entrepreneurs', 'Apply through participating banks', 'Business plan, ID proof, address proof', 'mudra@gov.in'),
('Maharashtra Startup Grant', 'State Government', 'Up to ₹25 Lakhs', 'Startup', 'State government grant for innovative startups', 'Maharashtra', 'Registered startups in Maharashtra', 'Online application through state portal', 'Startup registration, business plan, financial projections', 'startup@maharashtra.gov.in'),
('Karnataka Innovation Fund', 'State Government', 'Up to ₹50 Lakhs', 'Innovation', 'Funding for innovative technology solutions', 'Karnataka', 'Tech startups and innovators', 'Apply through KITS portal', 'Technical proposal, team details, prototype', 'innovation@karnataka.gov.in')
ON CONFLICT DO NOTHING;

INSERT INTO loans (name, bank_name, bank_type, amount, interest_rate, category, description, eligibility, documents_required, processing_time, contact_info) VALUES
('SBI Business Loan', 'State Bank of India', 'public', 'Up to ₹50 Lakhs', '8.5% - 12%', 'Business', 'Comprehensive business loan for working capital and expansion', 'Existing business with 2+ years operation', 'Financial statements, business registration, collateral documents', '15-30 days', 'business@sbi.co.in'),
('HDFC SME Loan', 'HDFC Bank', 'private', 'Up to ₹75 Lakhs', '9% - 15%', 'SME', 'Small and Medium Enterprise financing solutions', 'SMEs with annual turnover above ₹40 lakhs', 'ITR, bank statements, business proof', '7-15 days', 'sme@hdfcbank.com'),
('ICICI Business Credit', 'ICICI Bank', 'private', 'Up to ₹1 Crore', '8.75% - 14%', 'Business', 'Flexible business credit for various needs', 'Profitable business for 3+ years', 'Audited financials, GST returns, KYC documents', '10-20 days', 'business@icicibank.com')
ON CONFLICT DO NOTHING;

INSERT INTO schemes (name, description, provider, provider_type, amount, category, state, district, eligibility, application_process, documents_required, contact_info, website_url, deadline) VALUES
('Scheme A', 'Description of Scheme A', 'Provider A', 'central_govt', 'Amount A', 'Category A', 'State A', 'District A', 'Eligibility A', 'Application Process A', 'Documents Required A', 'Contact Info A', 'Website URL A', '2023-12-31'),
('Scheme B', 'Description of Scheme B', 'Provider B', 'state_govt', 'Amount B', 'Category B', 'State B', 'District B', 'Eligibility B', 'Application Process B', 'Documents Required B', 'Contact Info B', 'Website URL B', '2024-01-31')
ON CONFLICT DO NOTHING;
