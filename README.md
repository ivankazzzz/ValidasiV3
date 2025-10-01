# Sistem Validasi Instrumen Model KESAN

Website untuk validasi instrumen penelitian Model KESAN (Konektivitas Etnosains-Sains). Sistem ini memungkinkan validator untuk melakukan penilaian terhadap:

1. **Validasi Isi** - Menilai kesesuaian konten dengan kurikulum, akurasi konseptual, dan integrasi etnosains-sains
2. **Validasi Konstruk** - Menilai kerangka teoretis dan struktur internal model pembelajaran
3. **Validasi Praktikalitas** - Menilai kemudahan penggunaan dari perspektif guru dan siswa

## Fitur

- ✅ Formulir validasi interaktif dan responsive
- ✅ Split-view untuk menampilkan instrumen dan form penilaian
- ✅ Tanda tangan digital dengan signature pad
- ✅ Integrasi Supabase untuk penyimpanan data
- ✅ Upload gambar tanda tangan ke Supabase Storage
- ✅ Desain modern dengan Tailwind CSS
- ✅ Full-color responsive design
- ✅ Deploy-ready untuk Vercel

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage
- **Icons**: Lucide React
- **Signature**: React Signature Canvas

## Setup

1. Clone repository ini
2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy `.env.example` ke `.env.local` dan isi dengan credentials Supabase Anda:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

4. Setup database di Supabase:
   - Buka Supabase SQL Editor
   - Copy paste isi file `supabase-schema.sql`
   - Execute query untuk membuat tabel dan storage bucket

5. Run development server:
   ```bash
   npm run dev
   ```

6. Buka [http://localhost:3000](http://localhost:3000)

## Deploy ke Vercel

1. Push code ke GitHub
2. Import project di Vercel
3. Tambahkan environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Deploy!

## Struktur Database

### Tables
- `validasi_isi` - Data validasi instrumen isi
- `validasi_konstruk` - Data validasi instrumen konstruk
- `validasi_praktikalitas_guru` - Data praktikalitas guru
- `validasi_praktikalitas_siswa` - Data praktikalitas siswa

### Storage
- `signatures` - Bucket untuk menyimpan gambar tanda tangan

## Peneliti

**Irfan Ananda Ismail, S.Pd, M.Pd, Gr.**

---

© 2025 Sistem Validasi Instrumen Model KESAN

