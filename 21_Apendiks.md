# Bab 21: Apendiks

## Pendahuluan

Apendiks ini menyediakan informasi tambahan yang mungkin berguna bagi pengembang dan pengguna Sistem Validasi Instrumen Model KESAN. Informasi ini mencakup referensi, sumber daya tambahan, dan detail teknis yang tidak termasuk dalam bab utama dokumentasi.

## A.1 Referensi dan Sumber Daya

### A.1.1 Dokumentasi Resmi

| Teknologi | Dokumentasi | URL |
|-----------|-------------|-----|
| Next.js | Official Documentation | https://nextjs.org/docs |
| React | Official Documentation | https://react.dev |
| TypeScript | Official Documentation | https://www.typescriptlang.org/docs |
| Supabase | Official Documentation | https://supabase.com/docs |
| Tailwind CSS | Official Documentation | https://tailwindcss.com/docs |
| Playwright | Official Documentation | https://playwright.dev |

### A.1.2 Tutorial dan Panduan

| Topik | Sumber | URL |
|-------|--------|-----|
| Next.js App Router | Next.js Learn Course | https://nextjs.org/learn |
| React Hooks | React Documentation | https://react.dev/reference/react |
| Supabase Auth | Supabase Documentation | https://supabase.com/docs/guides/auth |
| Tailwind CSS | Tailwind CSS Documentation | https://tailwindcss.com/docs/installation |
| TypeScript Handbook | TypeScript Documentation | https://www.typescriptlang.org/docs/handbook/intro.html |

### A.1.3 Komunitas dan Forum

| Platform | Deskripsi | URL |
|----------|-----------|-----|
| Next.js Discord | Komunitas Next.js | https://discord.com/nextjs |
| Reactiflux | Komunitas React | https://discord.gg/reactiflux |
| Supabase Discord | Komunitas Supabase | https://discord.gg/supabase |
| Stack Overflow | Q&A Programming | https://stackoverflow.com |

## A.2 Skema Database Lengkap

### A.2.1 Tabel validasi_isi

```sql
CREATE TABLE IF NOT EXISTS validasi_isi (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
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

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_validasi_isi_created_at ON validasi_isi(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_validasi_isi_validator_nama ON validasi_isi(validator_nama);
CREATE INDEX IF NOT EXISTS idx_validasi_isi_decision ON validasi_isi(decision);
```

### A.2.2 Tabel validasi_konstruk

```sql
CREATE TABLE IF NOT EXISTS validasi_konstruk (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
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

-- Indexes
CREATE INDEX IF NOT EXISTS idx_validasi_konstruk_created_at ON validasi_konstruk(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_validasi_konstruk_validator_nama ON validasi_konstruk(validator_nama);
CREATE INDEX IF NOT EXISTS idx_validasi_konstruk_decision ON validasi_konstruk(decision);
```

### A.2.3 Tabel validasi_praktikalitas_guru

```sql
CREATE TABLE IF NOT EXISTS validasi_praktikalitas_guru (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
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

-- Indexes
CREATE INDEX IF NOT EXISTS idx_validasi_praktikalitas_guru_created_at ON validasi_praktikalitas_guru(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_validasi_praktikalitas_guru_validator_nama ON validasi_praktikalitas_guru(validator_nama);
CREATE INDEX IF NOT EXISTS idx_validasi_praktikalitas_guru_decision ON validasi_praktikalitas_guru(decision);
```

### A.2.4 Tabel validasi_praktikalitas_siswa

```sql
CREATE TABLE IF NOT EXISTS validasi_praktikalitas_siswa (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
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

-- Indexes
CREATE INDEX IF NOT EXISTS idx_validasi_praktikalitas_siswa_created_at ON validasi_praktikalitas_siswa(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_validasi_praktikalitas_siswa_validator_nama ON validasi_praktikalitas_siswa(validator_nama);
CREATE INDEX IF NOT EXISTS idx_validasi_praktikalitas_siswa_decision ON validasi_praktikalitas_siswa(decision);
```

## A.3 Konfigurasi Lengkap

### A.3.1 next.config.ts

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image Configuration
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lkuksddrbsoutwboyhon.supabase.co',
      },
    ],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Experimental Features
  experimental: {
    serverComponentsExternalPackages: ['@supabase/supabase-js'],
  },
  
  // Environment Variables
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  
  // Headers
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
        ],
      },
    ];
  },
  
  // Redirects
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },
  
  // Rewrites
  async rewrites() {
    return [
      {
        source: '/api/external/:path*',
        destination: 'https://external-api.com/:path*',
      },
    ];
  },
};

export default nextConfig;
```

### A.3.2 tailwind.config.js

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
```

### A.3.3 tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"],
      "@/components/*": ["./components/*"],
      "@/lib/*": ["./lib/*"],
      "@/types/*": ["./types/*"],
      "@/app/*": ["./app/*"]
    },
    "baseUrl": "."
  },
  "include": [
    "next-env.d.ts", 
    "**/*.ts", 
    "**/*.tsx", 
    ".next/types/**/*.ts"
  ],
  "exclude": ["node_modules"]
}
```

## A.4 Script Utilitas

### A.4.1 Script Backup Database

```bash
#!/bin/bash
# backup-database.sh

# Konfigurasi
DB_NAME="your_database_name"
DB_USER="your_database_user"
DB_HOST="your_database_host"
DB_PORT="5432"
BACKUP_DIR="./backups"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/backup_$DATE.sql"

# Buat direktori backup jika belum ada
mkdir -p $BACKUP_DIR

# Buat backup
pg_dump -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME > $BACKUP_FILE

# Kompresi backup
gzip $BACKUP_FILE

echo "Database backup completed: $BACKUP_FILE.gz"
```

### A.4.2 Script Cleanup Backup Lama

```bash
#!/bin/bash
# cleanup-old-backups.sh

# Konfigurasi
BACKUP_DIR="./backups"
RETENTION_DAYS=30

# Hapus backup yang lebih lama dari RETENTION_DAYS
find $BACKUP_DIR -name "*.sql.gz" -type f -mtime +$RETENTION_DAYS -delete

echo "Old backups cleaned up"
```

### A.4.3 Script Reset Database

```bash
#!/bin/bash
# reset-database.sh

# Konfigurasi
DB_NAME="your_database_name"
DB_USER="your_database_user"
DB_HOST="your_database_host"
DB_PORT="5432"
SCHEMA_FILE="./supabase-schema.sql"

# Reset database
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"

# Apply schema
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME < $SCHEMA_FILE

echo "Database reset completed"
```

## A.5 Template Email

### A.5.1 Template Notifikasi Validasi

```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Notifikasi Validasi Instrumen</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background-color: #3b82f6;
            color: white;
            padding: 20px;
            text-align: center;
        }
        .content {
            padding: 20px;
            background-color: #f9fafb;
        }
        .footer {
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #666;
        }
        .btn {
            display: inline-block;
            background-color: #3b82f6;
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Notifikasi Validasi Instrumen</h1>
        </div>
        <div class="content">
            <p>Halo {{validator_name}},</p>
            <p>Terima kasih telah menyelesaikan validasi instrumen {{instrument_type}}. Data validasi Anda telah berhasil disimpan dalam sistem kami.</p>
            <p><strong>Detail Validasi:</strong></p>
            <ul>
                <li>Nama: {{validator_name}}</li>
                <li>Institusi: {{validator_institusi}}</li>
                <li>Keahlian: {{validator_keahlian}}</li>
                <li>Keputusan: {{decision}}</li>
                <li>Tanggal: {{validation_date}}</li>
            </ul>
            <p>Anda dapat melihat data validasi Anda dengan mengklik tombol di bawah ini:</p>
            <a href="{{validation_url}}" class="btn">Lihat Data Validasi</a>
        </div>
        <div class="footer">
            <p>© 2025 Sistem Validasi Instrumen Model KESAN. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
```

## A.6 Contoh Data

### A.6.1 Contoh Data Validasi Isi

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "validator_nama": "Dr. Budi Santoso, M.Pd.",
  "validator_institusi": "Universitas Negeri Padang",
  "validator_keahlian": "Evaluasi Pendidikan",
  "validator_tanggal": "2025-01-15",
  "ratings": {
    "a1": 5,
    "a2": 4,
    "b1": 4,
    "b2": 5,
    "c1": 4,
    "c2": 5,
    "c3": 4,
    "d1": 5,
    "d2": 4
  },
  "general_comments": "Instrumen sudah cukup baik dan komprehensif.",
  "suggestions": "Perlu sedikit penyesuaian pada bagian C.",
  "decision": "layak-revisi-kecil",
  "signature_url": "https://lkuksddrbsoutwboyhon.supabase.co/storage/v1/object/signatures/signature-1234567890.png",
  "created_at": "2025-01-15T10:30:00.000Z",
  "updated_at": "2025-01-15T10:30:00.000Z"
}
```

### A.6.2 Contoh Data Validasi Konstruk

```json
{
  "id": "223e4567-e89b-12d3-a456-426614174000",
  "validator_nama": "Prof. Siti Aminah, M.Pd., Ph.D.",
  "validator_institusi": "Universitas Indonesia",
  "validator_keahlian": "Pembelajaran IPA",
  "validator_tanggal": "2025-01-16",
  "ratings": {
    "a1": 5,
    "a2": 5,
    "b1": 4,
    "b2": 4,
    "c1": 5,
    "c2": 4,
    "c3": 5,
    "d1": 4,
    "d2": 5
  },
  "general_comments": "Konstruk instrumen sudah sangat baik.",
  "suggestions": "Tidak ada saran perbaikan.",
  "decision": "layak-tanpa-revisi",
  "signature_url": "https://lkuksddrbsoutwboyhon.supabase.co/storage/v1/object/signatures/signature-2234567890.png",
  "created_at": "2025-01-16T14:20:00.000Z",
  "updated_at": "2025-01-16T14:20:00.000Z"
}
```

## A.7 FAQ (Frequently Asked Questions)

### A.7.1 Pertanyaan Umum

**Q: Apa persyaratan minimum untuk menjalankan sistem ini?**
A: Sistem memerlukan Node.js 18.17.0 atau lebih tinggi, npm 9.0.0 atau lebih tinggi, dan akun Supabase.

**Q: Bisakah saya mengubah tipe penilaian dari 1-5 ke skala lain?**
A: Ya, tetapi perlu modifikasi pada komponen RatingScale, validasi di server-side, dan database schema.

**Q: Apakah sistem ini mendukung autentikasi pengguna?**
A: Saat ini sistem tidak mengimplementasikan autentikasi, tetapi dirancang untuk penambahan fitur autentikasi di masa depan.

**Q: Bagaimana cara mengekspor data validasi?**
A: Data dapat diekspor melalui admin dashboard atau API endpoint yang tersedia.

**Q: Apakah data validator aman?**
A: Ya, sistem menggunakan HTTPS untuk semua komunikasi, enkripsi data di rest, dan Row Level Security untuk database.

### A.7.2 Pertanyaan Teknis

**Q: Mengapa saya mendapatkan error "NEXT_PUBLIC_SUPABASE_URL is not defined"?**
A: Pastikan file `.env.local` ada di root directory dan berisi variabel environment yang diperlukan.

**Q: Bagaimana cara mengatasi error "Module not found: 'package-name'"?**
A: Jalankan `npm install` untuk menginstall dependencies yang hilang.

**Q: Mengapa tanda tangan digital tidak tersimpan?**
A: Periksa ukuran file tanda tangan (maksimal 5MB) dan pastikan Supabase Storage bucket sudah dikonfigurasi dengan benar.

**Q: Bagaimana cara mengatasi error "fetch failed"?**
A: Verifikasi URL Supabase dan API keys, dan pastikan project Supabase aktif.

## A.8 Changelog

### A.8.1 Versi 1.0.0 (2025-01-15)

**Fitur Baru**:
- Sistem validasi instrumen model KESAN
- Form validasi untuk isi, konstruk, dan praktikalitas
- Tanda tangan digital
- Dashboard admin
- Export data

**Perbaikan**:
- Optimasi performa untuk loading PDF
- Perbaikan responsivitas di mobile devices

**Diketahui**:
- Tidak ada autentikasi pengguna
- Hanya mendukung satu bahasa (Bahasa Indonesia)

### A.8.2 Versi 1.1.0 (Rencana)

**Fitur yang Direncanakan**:
- Autentikasi pengguna dengan Google OAuth
- Multi-bahasa (Bahasa Indonesia dan Inggris)
- Notifikasi email untuk validator
- Analitik dan reporting
- Validasi LKPD

## A.9 Lisensi dan Hak Cipta

### A.9.1 Lisensi

Sistem ini dilisensikan di bawah MIT License. Detail lisensi dapat ditemukan di file [LICENSE](LICENSE) di repository.

### A.9.2 Hak Cipta

- Sistem Validasi Instrumen Model KESAN © 2025
- Instrumen validasi © 2025 Tim Pengembang KESAN
- Dokumentasi © 2025 Tim Dokumentasi

## A.10 Kontak dan Dukungan

### A.10.1 Tim Pengembang

- **Lead Developer**: [Nama Lead Developer]
- **Frontend Developer**: [Nama Frontend Developer]
- **Backend Developer**: [Nama Backend Developer]
- **UI/UX Designer**: [Nama UI/UX Designer]
- **Project Manager**: [Nama Project Manager]

### A.10.2 Informasi Kontak

- **Email**: validasi-app@example.com
- **Website**: https://validasi-v3.vercel.app
- **Repository**: https://github.com/username/validasi-app
- **Documentation**: https://validasi-docs.vercel.app

### A.10.3 Dukungan Teknis

Untuk dukungan teknis:

1. **Documentation**: Baca dokumentasi lengkap di https://validasi-docs.vercel.app
2. **Issues**: Laporkan masalah di GitHub Issues
3. **Email**: Kirim email ke validasi-app@example.com
4. **Discord**: Bergabung dengan komunitas di Discord

## Rangkuman

Apendiks ini menyediakan informasi tambahan yang komprehensif untuk mendukung pengembangan dan penggunaan Sistem Validasi Instrumen Model KESAN. Dengan referensi, skema database lengkap, konfigurasi, dan sumber daya tambahan, pengembang memiliki semua yang dibutuhkan untuk memahami, menginstal, dan memodifikasi sistem sesuai kebutuhan.

---

**Dokumentasi ini adalah bagian dari Sistem Validasi Instrumen Model KESAN versi 1.0.0**

**Terakhir diperbarui: 15 Januari 2025**
