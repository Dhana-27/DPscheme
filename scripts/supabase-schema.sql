-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create custom users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255),
    phone VARCHAR(20),
    user_type VARCHAR(50),
    organization VARCHAR(255),
    subscription_plan VARCHAR(20) DEFAULT 'free',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create schemes table
CREATE TABLE IF NOT EXISTS public.schemes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(500) NOT NULL,
    description TEXT,
    category VARCHAR(100) NOT NULL,
    provider VARCHAR(255) NOT NULL,
    provider_type VARCHAR(50) NOT NULL, -- 'central_govt', 'state_govt', 'local_authority'
    state VARCHAR(100) NOT NULL,
    district VARCHAR(100),
    amount_min DECIMAL(15,2),
    amount_max DECIMAL(15,2),
    amount_display VARCHAR(100),
    eligibility TEXT,
    application_url VARCHAR(500),
    deadline DATE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create loans table
CREATE TABLE IF NOT EXISTS public.loans (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(500) NOT NULL,
    description TEXT,
    category VARCHAR(100) NOT NULL,
    bank VARCHAR(255) NOT NULL,
    bank_type VARCHAR(50) NOT NULL, -- 'public_sector', 'private_sector', 'rrb', 'cooperative'
    state VARCHAR(100) NOT NULL,
    interest_rate VARCHAR(50),
    max_amount VARCHAR(100),
    processing_time VARCHAR(100),
    eligibility TEXT,
    application_url VARCHAR(500),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user searches table for analytics
CREATE TABLE IF NOT EXISTS public.user_searches (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id),
    search_query TEXT,
    filters JSONB,
    results_count INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user favorites table
CREATE TABLE IF NOT EXISTS public.user_favorites (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id),
    scheme_id UUID REFERENCES public.schemes(id),
    loan_id UUID REFERENCES public.loans(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT user_favorites_check CHECK (
        (scheme_id IS NOT NULL AND loan_id IS NULL) OR 
        (scheme_id IS NULL AND loan_id IS NOT NULL)
    )
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_schemes_state ON public.schemes(state);
CREATE INDEX IF NOT EXISTS idx_schemes_category ON public.schemes(category);
CREATE INDEX IF NOT EXISTS idx_schemes_provider_type ON public.schemes(provider_type);
CREATE INDEX IF NOT EXISTS idx_schemes_active ON public.schemes(is_active);
CREATE INDEX IF NOT EXISTS idx_loans_state ON public.loans(state);
CREATE INDEX IF NOT EXISTS idx_loans_category ON public.loans(category);
CREATE INDEX IF NOT EXISTS idx_loans_bank_type ON public.loans(bank_type);
CREATE INDEX IF NOT EXISTS idx_loans_active ON public.loans(is_active);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schemes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.loans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_searches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_favorites ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view own profile" ON public.users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for schemes table (public read)
CREATE POLICY "Anyone can view active schemes" ON public.schemes
    FOR SELECT USING (is_active = true);

-- RLS Policies for loans table (public read)
CREATE POLICY "Anyone can view active loans" ON public.loans
    FOR SELECT USING (is_active = true);

-- RLS Policies for user searches (own data only)
CREATE POLICY "Users can view own searches" ON public.user_searches
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own searches" ON public.user_searches
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for user favorites (own data only)
CREATE POLICY "Users can view own favorites" ON public.user_favorites
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own favorites" ON public.user_favorites
    FOR ALL USING (auth.uid() = user_id);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_schemes_updated_at BEFORE UPDATE ON public.schemes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_loans_updated_at BEFORE UPDATE ON public.loans
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, email, full_name)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', '')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user registration
CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
