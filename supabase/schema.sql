-- =============================================
-- P8 NET Supabase Database Schema
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- 1. PACKAGES TABLE
-- Menyimpan data paket internet
-- =============================================
CREATE TABLE IF NOT EXISTS packages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    speed_mbps INTEGER NOT NULL,
    price INTEGER NOT NULL,
    features TEXT[] DEFAULT '{}',
    is_popular BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index untuk pencarian paket aktif
CREATE INDEX IF NOT EXISTS idx_packages_active ON packages(is_active);

-- =============================================
-- 2. LEADS TABLE
-- Menyimpan data calon pelanggan
-- =============================================
CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(255) NOT NULL,
    whatsapp VARCHAR(20) NOT NULL,
    address TEXT NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    package_id UUID REFERENCES packages(id) ON DELETE SET NULL,
    status VARCHAR(20) DEFAULT 'new_lead' CHECK (status IN ('new_lead', 'surveying', 'installed')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index untuk pencarian berdasarkan status
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
-- Index untuk pencarian berdasarkan tanggal
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
-- Index untuk pencarian berdasarkan package
CREATE INDEX IF NOT EXISTS idx_leads_package ON leads(package_id);

-- =============================================
-- 3. TRIGGER: Auto-update updated_at
-- =============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger untuk packages
DROP TRIGGER IF EXISTS update_packages_updated_at ON packages;
CREATE TRIGGER update_packages_updated_at
    BEFORE UPDATE ON packages
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger untuk leads
DROP TRIGGER IF EXISTS update_leads_updated_at ON leads;
CREATE TRIGGER update_leads_updated_at
    BEFORE UPDATE ON leads
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- 4. INSERT DEFAULT PACKAGES DATA
-- =============================================
INSERT INTO packages (name, speed_mbps, price, features, is_popular) VALUES
    ('Hemat', 10, 150000, ARRAY[
        'Kecepatan hingga 10 Mbps',
        'Unlimited Quota',
        'Support 24/7',
        'Cocok untuk 1-5 Device'
    ], FALSE),
    ('Keluarga', 15, 200000, ARRAY[
        'Kecepatan hingga 15 Mbps',
        'Unlimited Quota',
        'Support 24/7',
        'Cocok untuk 5-10 Device'
    ], TRUE),
    ('Pro', 20, 250000, ARRAY[
        'Kecepatan hingga 20 Mbps',
        'Unlimited Quota',
        'Support 24/7',
        'Cocok untuk 10+ Device',
        'Priority Support'
    ], FALSE)
ON CONFLICT DO NOTHING;

-- =============================================
-- 5. ROW LEVEL SECURITY (RLS)
-- =============================================

-- Enable RLS
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read untuk packages yang aktif
CREATE POLICY "Allow public read packages" ON packages
    FOR SELECT
    USING (is_active = TRUE);

-- Policy: Allow public insert untuk leads (pendaftaran)
CREATE POLICY "Allow public insert leads" ON leads
    FOR INSERT
    WITH CHECK (TRUE);

-- Policy: Allow authenticated users full access ke leads (admin)
CREATE POLICY "Allow authenticated read leads" ON leads
    FOR SELECT
    TO authenticated
    USING (TRUE);

CREATE POLICY "Allow authenticated update leads" ON leads
    FOR UPDATE
    TO authenticated
    USING (TRUE);

CREATE POLICY "Allow authenticated delete leads" ON leads
    FOR DELETE
    TO authenticated
    USING (TRUE);

-- Policy: Allow authenticated users full access ke packages (admin)
CREATE POLICY "Allow authenticated all packages" ON packages
    FOR ALL
    TO authenticated
    USING (TRUE);

-- =============================================
-- 6. VIEWS (Optional - untuk statistik)
-- =============================================

-- View untuk statistik leads per status
CREATE OR REPLACE VIEW leads_statistics AS
SELECT 
    status,
    COUNT(*) as count,
    DATE_TRUNC('month', created_at) as month
FROM leads
GROUP BY status, DATE_TRUNC('month', created_at)
ORDER BY month DESC, status;

-- View untuk total pendapatan bulanan (dari pelanggan installed)
CREATE OR REPLACE VIEW monthly_revenue AS
SELECT 
    DATE_TRUNC('month', l.created_at) as month,
    COUNT(*) as total_customers,
    SUM(p.price) as total_revenue
FROM leads l
JOIN packages p ON l.package_id = p.id
WHERE l.status = 'installed'
GROUP BY DATE_TRUNC('month', l.created_at)
ORDER BY month DESC;
