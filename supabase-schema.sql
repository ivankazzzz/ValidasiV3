-- SUPABASE DATABASE SCHEMA
-- Copy and paste these commands in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create storage bucket for signatures
INSERT INTO storage.buckets (id, name, public)
VALUES ('signatures', 'signatures', true)
ON CONFLICT (id) DO NOTHING;

-- Create policy for signatures bucket (allow public read and authenticated write)
CREATE POLICY "Public Access for Signatures"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'signatures');

CREATE POLICY "Authenticated users can upload signatures"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'signatures');

-- Table: validasi_isi
CREATE TABLE IF NOT EXISTS validasi_isi (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  validator_nama TEXT NOT NULL,
  validator_institusi TEXT NOT NULL,
  validator_keahlian TEXT NOT NULL,
  validator_tanggal TEXT,
  
  -- Ratings stored as JSONB for flexibility
  ratings JSONB NOT NULL,
  
  -- Comments
  general_comments TEXT,
  suggestions TEXT,
  
  -- Decision
  decision TEXT NOT NULL CHECK (decision IN ('tidak-layak', 'layak-revisi-besar', 'layak-revisi-kecil', 'layak-tanpa-revisi')),
  
  -- Signature
  signature_url TEXT NOT NULL,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Table: validasi_konstruk
CREATE TABLE IF NOT EXISTS validasi_konstruk (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  validator_nama TEXT NOT NULL,
  validator_institusi TEXT NOT NULL,
  validator_keahlian TEXT NOT NULL,
  validator_tanggal TEXT,
  
  ratings JSONB NOT NULL,
  general_comments TEXT,
  suggestions TEXT,
  decision TEXT NOT NULL CHECK (decision IN ('tidak-layak', 'layak-revisi-besar', 'layak-revisi-kecil', 'layak-tanpa-revisi')),
  signature_url TEXT NOT NULL,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Table: validasi_praktikalitas_guru
CREATE TABLE IF NOT EXISTS validasi_praktikalitas_guru (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  validator_nama TEXT NOT NULL,
  validator_institusi TEXT NOT NULL,
  validator_keahlian TEXT NOT NULL,
  validator_tanggal TEXT,
  
  ratings JSONB NOT NULL,
  general_comments TEXT,
  suggestions TEXT,
  decision TEXT NOT NULL CHECK (decision IN ('tidak-layak', 'layak-revisi-besar', 'layak-revisi-kecil', 'layak-tanpa-revisi')),
  signature_url TEXT NOT NULL,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Table: validasi_praktikalitas_siswa
CREATE TABLE IF NOT EXISTS validasi_praktikalitas_siswa (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  validator_nama TEXT NOT NULL,
  validator_institusi TEXT NOT NULL,
  validator_keahlian TEXT NOT NULL,
  validator_tanggal TEXT,
  
  ratings JSONB NOT NULL,
  general_comments TEXT,
  suggestions TEXT,
  decision TEXT NOT NULL CHECK (decision IN ('tidak-layak', 'layak-revisi-besar', 'layak-revisi-kecil', 'layak-tanpa-revisi')),
  signature_url TEXT NOT NULL,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create indexes for better query performance
CREATE INDEX idx_validasi_isi_created_at ON validasi_isi(created_at DESC);
CREATE INDEX idx_validasi_konstruk_created_at ON validasi_konstruk(created_at DESC);
CREATE INDEX idx_validasi_praktikalitas_guru_created_at ON validasi_praktikalitas_guru(created_at DESC);
CREATE INDEX idx_validasi_praktikalitas_siswa_created_at ON validasi_praktikalitas_siswa(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE validasi_isi ENABLE ROW LEVEL SECURITY;
ALTER TABLE validasi_konstruk ENABLE ROW LEVEL SECURITY;
ALTER TABLE validasi_praktikalitas_guru ENABLE ROW LEVEL SECURITY;
ALTER TABLE validasi_praktikalitas_siswa ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read and insert
CREATE POLICY "Enable read access for all users" ON validasi_isi FOR SELECT TO public USING (true);
CREATE POLICY "Enable insert for all users" ON validasi_isi FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Enable read access for all users" ON validasi_konstruk FOR SELECT TO public USING (true);
CREATE POLICY "Enable insert for all users" ON validasi_konstruk FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Enable read access for all users" ON validasi_praktikalitas_guru FOR SELECT TO public USING (true);
CREATE POLICY "Enable insert for all users" ON validasi_praktikalitas_guru FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Enable read access for all users" ON validasi_praktikalitas_siswa FOR SELECT TO public USING (true);
CREATE POLICY "Enable insert for all users" ON validasi_praktikalitas_siswa FOR INSERT TO public WITH CHECK (true);
