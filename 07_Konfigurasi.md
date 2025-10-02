# Bab 7: Konfigurasi Sistem

## Pendahuluan

Setelah instalasi selesai, langkah selanjutnya adalah mengkonfigurasi sistem agar berjalan optimal sesuai kebutuhan lingkungan. Bab ini akan menjelaskan secara detail tentang setiap variabel konfigurasi, pengaruhnya terhadap sistem, dan praktik terbaik untuk pengaturan di berbagai lingkungan (development, staging, produksi).

## Jenis Konfigurasi

Sistem ini memiliki beberapa jenis konfigurasi:

1. **Environment Variables**: Konfigurasi lingkungan yang sensitif
2. **Next.js Configuration**: Konfigurasi framework Next.js
3. **TypeScript Configuration**: Konfigurasi TypeScript
4. **Tailwind CSS Configuration**: Konfigurasi styling
5. **Database Configuration**: Konfigurasi database dan schema
6. **Storage Configuration**: Konfigurasi file storage

## Environment Variables

### 7.1 File Konfigurasi Environment

Sistem menggunakan beberapa file environment:

| File | Tujuan | Scope | Git Status |
|------|--------|-------|------------|
| `.env.local` | Konfigurasi lokal (override semua) | Local | ❌ Di-ignore |
| `.env.development` | Konfigurasi development | Development | ✅ Di-track |
| `.env.production` | Konfigurasi produksi | Production | ✅ Di-track |
| `.env.example` | Template environment variables | Template | ✅ Di-track |

### 7.2 Variabel Environment Wajib

#### Supabase Configuration

```env
# URL Supabase Project
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co

# Supabase Anon Key (client-side)
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Supabase Service Role Key (server-side)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Penjelasan**:
- `NEXT_PUBLIC_SUPABASE_URL`: URL project Supabase Anda
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Key untuk akses publik (client-side)
- `SUPABASE_SERVICE_ROLE_KEY`: Key untuk akses penuh (server-only)

**Best Practices**:
- Jangan expose `SUPABASE_SERVICE_ROLE_KEY` di client-side
- Gunakan prefix `NEXT_PUBLIC_` hanya untuk variabel yang aman di client-side
- Rotasi keys secara berkala untuk keamanan

### 7.3 Variabel Environment Opsional

#### Application Configuration

```env
# Environment Mode
NODE_ENV=development

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# API Base URL
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Debug Mode
DEBUG=true
```

#### Feature Flags

```env
# Enable/Disable Features
NEXT_PUBLIC_ENABLE_ANALYTICS=false
NEXT_PUBLIC_ENABLE_ERROR_REPORTING=false
NEXT_PUBLIC_ENABLE_DEBUG_MODE=true
```

### 7.4 Konfigurasi Environment per Lingkungan

#### Development (.env.development)

```env
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api
DEBUG=true
NEXT_PUBLIC_ENABLE_DEBUG_MODE=true
NEXT_PUBLIC_ENABLE_ANALYTICS=false
```

#### Staging (.env.staging)

```env
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://staging.validasi-app.com
NEXT_PUBLIC_API_URL=https://staging.validasi-app.com/api
DEBUG=false
NEXT_PUBLIC_ENABLE_DEBUG_MODE=true
NEXT_PUBLIC_ENABLE_ANALYTICS=true
```

#### Production (.env.production)

```env
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://validasi-v3.vercel.app
NEXT_PUBLIC_API_URL=https://validasi-v3.vercel.app/api
DEBUG=false
NEXT_PUBLIC_ENABLE_DEBUG_MODE=false
NEXT_PUBLIC_ENABLE_ANALYTICS=true
```

## Next.js Configuration

### 7.5 File next.config.ts

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

### 7.6 Penjelasan Konfigurasi Next.js

#### Image Configuration
- `remotePatterns`: Mengizinkan gambar dari domain eksternal (Supabase)
- `formats`: Format gambar yang dioptimalkan (WebP, AVIF)

#### Experimental Features
- `serverComponentsExternalPackages`: Packages yang tidak di-bundle untuk server components

#### Headers
- CORS configuration untuk API routes
- Security headers

#### Redirects
- Redirect dari URL lama ke URL baru

#### Rewrites
- Proxy ke API eksternal jika diperlukan

## TypeScript Configuration

### 7.7 File tsconfig.json

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

### 7.8 Penjelasan Konfigurasi TypeScript

#### Compiler Options
- `target`: Target JavaScript (ES2017 untuk Node.js compatibility)
- `lib`: Libraries yang di-include
- `strict`: Mode strict untuk type safety
- `noEmit`: Tidak generate file output (Next.js handle ini)

#### Path Mapping
- `@/*`: Shortcut untuk root directory
- `@/components/*`: Shortcut untuk components directory
- `@/lib/*`: Shortcut untuk lib directory
- `@/types/*`: Shortcut untuk types directory

## Tailwind CSS Configuration

### 7.9 File tailwind.config.js

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

### 7.10 Penjelasan Konfigurasi Tailwind

#### Content Sources
- Daftar file yang akan di-scan untuk class names
- Include semua file TypeScript dan JavaScript

#### Theme Extension
- `colors`: Custom color palette
- `fontFamily`: Custom fonts
- `animation`: Custom animations
- `keyframes`: Keyframe definitions

#### Plugins
- `@tailwindcss/forms`: Styling untuk form elements
- `@tailwindcss/typography`: Styling untuk typography

## Database Configuration

### 7.11 Supabase Database Configuration

#### Connection Pooling

```sql
-- Set connection pool size
ALTER SYSTEM SET max_connections = 100;
ALTER SYSTEM SET shared_buffers = '256MB';
ALTER SYSTEM SET effective_cache_size = '1GB';
```

#### Row Level Security (RLS)

```sql
-- Enable RLS on all tables
ALTER TABLE validasi_isi ENABLE ROW LEVEL SECURITY;
ALTER TABLE validasi_konstruk ENABLE ROW LEVEL SECURITY;
ALTER TABLE validasi_praktikalitas_guru ENABLE ROW LEVEL SECURITY;
ALTER TABLE validasi_praktikalitas_siswa ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public read access" ON validasi_isi FOR SELECT USING (true);
CREATE POLICY "Public insert access" ON validasi_isi FOR INSERT WITH CHECK (true);
```

#### Indexes

```sql
-- Create indexes for better performance
CREATE INDEX idx_validasi_isi_created_at ON validasi_isi(created_at DESC);
CREATE INDEX idx_validasi_isi_validator_nama ON validasi_isi(validator_nama);
CREATE INDEX idx_validasi_konstruk_created_at ON validasi_konstruk(created_at DESC);
CREATE INDEX idx_validasi_konstruk_validator_nama ON validasi_konstruk(validator_nama);
```

### 7.12 Storage Configuration

#### Bucket Policies

```sql
-- Create storage bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('signatures', 'signatures', true);

-- Create policies
CREATE POLICY "Public read access" ON storage.objects FOR SELECT 
USING (bucket_id = 'signatures');

CREATE POLICY "Public upload access" ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'signatures');
```

## Konfigurasi untuk Deployment

### 7.13 Vercel Configuration

#### vercel.json

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "env": {
    "NEXT_PUBLIC_SUPABASE_URL": "@supabase-url",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY": "@supabase-anon-key",
    "SUPABASE_SERVICE_ROLE_KEY": "@supabase-service-role-key"
  },
  "functions": {
    "app/api/**/*.ts": {
      "maxDuration": 30
    }
  }
}
```

### 7.14 Environment Variables di Vercel

1. Buka Vercel Dashboard
2. Pilih project
3. Navigasi ke Settings → Environment Variables
4. Tambahkan variabel:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

## Praktik Terbaik Konfigurasi

### 7.15 Security Best Practices

1. **Jangan commit sensitive data**:
   ```bash
   # .gitignore
   .env.local
   .env.production
   .env.staging
   ```

2. **Gunakan prefix yang benar**:
   - `NEXT_PUBLIC_*` untuk variabel client-side
   - Tanpa prefix untuk variabel server-side

3. **Rotasi keys secara berkala**:
   - Ganti Supabase keys setiap 3-6 bulan
   - Monitor penggunaan keys

### 7.16 Performance Best Practices

1. **Optimasi Next.js**:
   ```typescript
   // next.config.ts
   const nextConfig: NextConfig = {
     compress: true,
     poweredByHeader: false,
     generateEtags: false,
   };
   ```

2. **Optimasi Database**:
   - Gunakan indexes yang tepat
   - Monitor query performance
   - Gunakan connection pooling

3. **Optimasi Assets**:
   - Compress images
   - Use CDN untuk static assets
   - Implement caching

### 7.17 Monitoring dan Logging

1. **Error Tracking**:
   ```typescript
   // app/api/error-handler.ts
   export function handleError(error: Error) {
     console.error('API Error:', error);
     // Send to error tracking service
   }
   ```

2. **Performance Monitoring**:
   ```typescript
   // lib/performance.ts
   export function logPerformance(metric: string, value: number) {
     console.log(`Performance: ${metric} = ${value}ms`);
     // Send to monitoring service
   }
   ```

## Troubleshooting Konfigurasi

### 7.18 Masalah Umum

#### Environment Variables Tidak Terbaca

**Gejala**: `undefined` atau `null` values

**Solusi**:
1. Pastikan file `.env.local` ada
2. Restart development server
3. Verifikasi nama variabel benar

#### TypeScript Compilation Error

**Gejala**: Type errors pada build time

**Solusi**:
1. Periksa `tsconfig.json`
2. Clear Next.js cache: `rm -rf .next`
3. Rebuild: `npm run build`

#### Database Connection Error

**Gejala**: Gagal terhubung ke Supabase

**Solusi**:
1. Verifikasi URL Supabase
2. Check API keys
3. Verifikasi RLS policies

## Rangkuman

Konfigurasi sistem yang tepat adalah kunci untuk menjalankan aplikasi dengan optimal dan aman. Bab ini telah membahas berbagai aspek konfigurasi dari environment variables hingga database settings. Dengan mengikuti praktik terbaik yang dijelaskan, sistem akan berjalan dengan performa tinggi dan tetap aman di berbagai lingkungan.

Pada bab berikutnya, kita akan membahas struktur proyek dan kode untuk pemahaman yang lebih mendalam tentang implementasi sistem.
