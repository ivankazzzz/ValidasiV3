-- ========================================
-- SQL SCHEMA UNTUK VALIDASI LKPD MODEL KESAN
-- ========================================
-- Database untuk sistem validasi LKPD (Lembar Kerja Peserta Didik)
-- 4 Tabel: Isi, Konstruk, Praktikalitas Guru, Praktikalitas Siswa
-- ========================================

-- 1. TABEL VALIDASI ISI LKPD
CREATE TABLE IF NOT EXISTS validasi_lkpd_isi (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nama_validator VARCHAR(255) NOT NULL,
    instansi VARCHAR(255) NOT NULL,
    
    -- Aspek A: Kesesuaian Materi dengan KD
    a1 INTEGER CHECK (a1 >= 1 AND a1 <= 5),
    a2 INTEGER CHECK (a2 >= 1 AND a2 <= 5),
    a3 INTEGER CHECK (a3 >= 1 AND a3 <= 5),
    a4 INTEGER CHECK (a4 >= 1 AND a4 <= 5),
    
    -- Aspek B: Keakuratan Materi
    b1 INTEGER CHECK (b1 >= 1 AND b1 <= 5),
    b2 INTEGER CHECK (b2 >= 1 AND b2 <= 5),
    b3 INTEGER CHECK (b3 >= 1 AND b3 <= 5),
    b4 INTEGER CHECK (b4 >= 1 AND b4 <= 5),
    
    -- Aspek C: Kemutakhiran Materi
    c1 INTEGER CHECK (c1 >= 1 AND c1 <= 5),
    c2 INTEGER CHECK (c2 >= 1 AND c2 <= 5),
    c3 INTEGER CHECK (c3 >= 1 AND c3 <= 5),
    
    -- Aspek D: Mendorong Keingintahuan
    d1 INTEGER CHECK (d1 >= 1 AND d1 <= 5),
    d2 INTEGER CHECK (d2 >= 1 AND d2 <= 5),
    d3 INTEGER CHECK (d3 >= 1 AND d3 <= 5),
    
    komentar TEXT,
    saran TEXT,
    signature_url TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. TABEL VALIDASI KONSTRUK LKPD
CREATE TABLE IF NOT EXISTS validasi_lkpd_konstruk (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nama_validator VARCHAR(255) NOT NULL,
    instansi VARCHAR(255) NOT NULL,
    
    -- Aspek A: Kelengkapan Komponen LKPD
    a1 INTEGER CHECK (a1 >= 1 AND a1 <= 5),
    a2 INTEGER CHECK (a2 >= 1 AND a2 <= 5),
    a3 INTEGER CHECK (a3 >= 1 AND a3 <= 5),
    a4 INTEGER CHECK (a4 >= 1 AND a4 <= 5),
    a5 INTEGER CHECK (a5 >= 1 AND a5 <= 5),
    
    -- Aspek B: Sistematika Penyusunan LKPD
    b1 INTEGER CHECK (b1 >= 1 AND b1 <= 5),
    b2 INTEGER CHECK (b2 >= 1 AND b2 <= 5),
    b3 INTEGER CHECK (b3 >= 1 AND b3 <= 5),
    b4 INTEGER CHECK (b4 >= 1 AND b4 <= 5),
    
    -- Aspek C: Kesesuaian dengan Model KESAN
    c1 INTEGER CHECK (c1 >= 1 AND c1 <= 5),
    c2 INTEGER CHECK (c2 >= 1 AND c2 <= 5),
    c3 INTEGER CHECK (c3 >= 1 AND c3 <= 5),
    c4 INTEGER CHECK (c4 >= 1 AND c4 <= 5),
    
    -- Aspek D: Kejelasan Petunjuk dan Instruksi
    d1 INTEGER CHECK (d1 >= 1 AND d1 <= 5),
    d2 INTEGER CHECK (d2 >= 1 AND d2 <= 5),
    d3 INTEGER CHECK (d3 >= 1 AND d3 <= 5),
    
    komentar TEXT,
    saran TEXT,
    signature_url TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. TABEL VALIDASI PRAKTIKALITAS GURU LKPD
CREATE TABLE IF NOT EXISTS validasi_lkpd_praktikalitas_guru (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nama_guru VARCHAR(255) NOT NULL,
    sekolah VARCHAR(255) NOT NULL,
    
    -- Aspek A: Kemudahan Penggunaan
    a1 INTEGER CHECK (a1 >= 1 AND a1 <= 5),
    a2 INTEGER CHECK (a2 >= 1 AND a2 <= 5),
    a3 INTEGER CHECK (a3 >= 1 AND a3 <= 5),
    a4 INTEGER CHECK (a4 >= 1 AND a4 <= 5),
    
    -- Aspek B: Efisiensi Waktu Pembelajaran
    b1 INTEGER CHECK (b1 >= 1 AND b1 <= 5),
    b2 INTEGER CHECK (b2 >= 1 AND b2 <= 5),
    b3 INTEGER CHECK (b3 >= 1 AND b3 <= 5),
    
    -- Aspek C: Manfaat untuk Pembelajaran
    c1 INTEGER CHECK (c1 >= 1 AND c1 <= 5),
    c2 INTEGER CHECK (c2 >= 1 AND c2 <= 5),
    c3 INTEGER CHECK (c3 >= 1 AND c3 <= 5),
    c4 INTEGER CHECK (c4 >= 1 AND c4 <= 5),
    
    -- Aspek D: Kesesuaian dengan Kebutuhan Guru
    d1 INTEGER CHECK (d1 >= 1 AND d1 <= 5),
    d2 INTEGER CHECK (d2 >= 1 AND d2 <= 5),
    d3 INTEGER CHECK (d3 >= 1 AND d3 <= 5),
    
    komentar TEXT,
    saran TEXT,
    signature_url TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. TABEL VALIDASI PRAKTIKALITAS SISWA LKPD
CREATE TABLE IF NOT EXISTS validasi_lkpd_praktikalitas_siswa (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nama_siswa VARCHAR(255) NOT NULL,
    kelas VARCHAR(100) NOT NULL,
    sekolah VARCHAR(255) NOT NULL,
    
    -- Aspek A: Kemudahan Memahami Materi
    a1 INTEGER CHECK (a1 >= 1 AND a1 <= 5),
    a2 INTEGER CHECK (a2 >= 1 AND a2 <= 5),
    a3 INTEGER CHECK (a3 >= 1 AND a3 <= 5),
    a4 INTEGER CHECK (a4 >= 1 AND a4 <= 5),
    
    -- Aspek B: Kemudahan Penggunaan LKPD
    b1 INTEGER CHECK (b1 >= 1 AND b1 <= 5),
    b2 INTEGER CHECK (b2 >= 1 AND b2 <= 5),
    b3 INTEGER CHECK (b3 >= 1 AND b3 <= 5),
    
    -- Aspek C: Daya Tarik LKPD
    c1 INTEGER CHECK (c1 >= 1 AND c1 <= 5),
    c2 INTEGER CHECK (c2 >= 1 AND c2 <= 5),
    c3 INTEGER CHECK (c3 >= 1 AND c3 <= 5),
    
    -- Aspek D: Manfaat untuk Belajar
    d1 INTEGER CHECK (d1 >= 1 AND d1 <= 5),
    d2 INTEGER CHECK (d2 >= 1 AND d2 <= 5),
    d3 INTEGER CHECK (d3 >= 1 AND d3 <= 5),
    
    komentar TEXT,
    saran TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========================================
-- INDEXES untuk performa query
-- ========================================

-- Indexes untuk validasi_lkpd_isi
CREATE INDEX idx_lkpd_isi_created_at ON validasi_lkpd_isi(created_at DESC);
CREATE INDEX idx_lkpd_isi_nama ON validasi_lkpd_isi(nama_validator);

-- Indexes untuk validasi_lkpd_konstruk
CREATE INDEX idx_lkpd_konstruk_created_at ON validasi_lkpd_konstruk(created_at DESC);
CREATE INDEX idx_lkpd_konstruk_nama ON validasi_lkpd_konstruk(nama_validator);

-- Indexes untuk validasi_lkpd_praktikalitas_guru
CREATE INDEX idx_lkpd_guru_created_at ON validasi_lkpd_praktikalitas_guru(created_at DESC);
CREATE INDEX idx_lkpd_guru_nama ON validasi_lkpd_praktikalitas_guru(nama_guru);
CREATE INDEX idx_lkpd_guru_sekolah ON validasi_lkpd_praktikalitas_guru(sekolah);

-- Indexes untuk validasi_lkpd_praktikalitas_siswa
CREATE INDEX idx_lkpd_siswa_created_at ON validasi_lkpd_praktikalitas_siswa(created_at DESC);
CREATE INDEX idx_lkpd_siswa_nama ON validasi_lkpd_praktikalitas_siswa(nama_siswa);
CREATE INDEX idx_lkpd_siswa_sekolah ON validasi_lkpd_praktikalitas_siswa(sekolah);
CREATE INDEX idx_lkpd_siswa_kelas ON validasi_lkpd_praktikalitas_siswa(kelas);

-- ========================================
-- ROW LEVEL SECURITY (RLS) - Optional
-- ========================================
-- Uncomment jika ingin enable RLS untuk keamanan

-- ALTER TABLE validasi_lkpd_isi ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE validasi_lkpd_konstruk ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE validasi_lkpd_praktikalitas_guru ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE validasi_lkpd_praktikalitas_siswa ENABLE ROW LEVEL SECURITY;

-- Policy untuk allow insert dan select (publik bisa submit dan admin bisa lihat)
-- CREATE POLICY "Enable insert for all users" ON validasi_lkpd_isi FOR INSERT WITH CHECK (true);
-- CREATE POLICY "Enable select for all users" ON validasi_lkpd_isi FOR SELECT USING (true);

-- ========================================
-- SELESAI
-- ========================================
-- Jalankan script ini di Supabase SQL Editor
-- Dashboard Supabase -> SQL Editor -> New Query -> Paste & Run
