# Bab 5: Prasyarat Lingkungan

## Pendahuluan

Sebelum menginstal dan menjalankan Sistem Validasi Instrumen Model KESAN, ada beberapa prasyarat lingkungan yang harus dipenuhi. Prasyarat ini mencakup sistem operasi, software, tools, dan layanan eksternal yang diperlukan untuk memastikan aplikasi berjalan dengan optimal. Bab ini akan menjelaskan secara detail semua persyaratan yang diperlukan.

## Sistem Operasi yang Didukung

Sistem ini dapat dijalankan pada berbagai sistem operasi:

| Sistem Operasi | Versi Minimum | Status | Catatan |
|----------------|---------------|--------|---------|
| Windows | 10 | ✅ Fully Supported | Direkomendasikan Windows 11 |
| macOS | 10.15 (Catalina) | ✅ Fully Supported | Direkomendasikan macOS 12+ |
| Linux | Ubuntu 18.04+ | ✅ Fully Supported | Debian-based distros lainnya juga didukung |

## Software Wajib

### 1. Node.js

**Versi Minimum**: 18.17.0 (direkomendasikan 20.x LTS)

**Cek Instalasi**:
```bash
node --version
# Output yang diharapkan: v18.17.0 atau lebih tinggi
```

**Alasan**:
- Next.js 15 memerlukan Node.js 18.17.0 atau lebih tinggi
- TypeScript compilation membutuhkan Node.js runtime
- Dependency management dengan npm

**Instalasi**:
- **Windows**: Download dari [nodejs.org](https://nodejs.org/)
- **macOS**: Menggunakan Homebrew: `brew install node`
- **Linux**: Menggunakan package manager:
  ```bash
  # Ubuntu/Debian
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
  sudo apt-get install -y nodejs
  
  # CentOS/RHEL
  curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
  sudo yum install -y nodejs
  ```

### 2. npm (Node Package Manager)

**Versi Minimum**: 9.0.0 (biasanya terinstal bersama Node.js)

**Cek Instalasi**:
```bash
npm --version
# Output yang diharapkan: 9.0.0 atau lebih tinggi
```

**Alternatif**: yarn atau pnpm (opsional)
```bash
# Instalasi yarn
npm install -g yarn

# Instalasi pnpm
npm install -g pnpm
```

### 3. Git

**Versi Minimum**: 2.20.0

**Cek Instalasi**:
```bash
git --version
# Output yang diharapkan: git version 2.20.0 atau lebih tinggi
```

**Alasan**:
- Version control untuk source code
- Kolaborasi tim
- Integration dengan Vercel untuk deployment

**Instalasi**:
- **Windows**: Download dari [git-scm.com](https://git-scm.com/)
- **macOS**: Menggunakan Homebrew: `brew install git`
- **Linux**: 
  ```bash
  # Ubuntu/Debian
  sudo apt-get install git
  
  # CentOS/RHEL
  sudo yum install git
  ```

## Software Development Tools

### 1. Code Editor/IDE

**Rekomendasi**:
- **Visual Studio Code** (direkomendasikan)
  - Ekstensi yang disarankan:
    - TypeScript and JavaScript Language Features
    - ESLint
    - Prettier
    - Tailwind CSS IntelliSense
    - GitLens

**Alternatif**:
- WebStorm
- Sublime Text
- Vim/Neovim

### 2. Web Browser

**Browser yang Didukung**:
- **Chrome** (versi 90+) - direkomendasikan untuk development
- **Firefox** (versi 88+)
- **Safari** (versi 14+)
- **Edge** (versi 90+)

**Alasan**:
- Developer tools untuk debugging
- Testing cross-browser compatibility
- Responsive design testing

## Layanan Eksternal Wajib

### 1. Akun Supabase

**Persyaratan**:
- Akun Supabase aktif (gratis atau berbayar)
- Project Supabase yang sudah dibuat

**Cara Setup**:
1. Daftar di [supabase.com](https://supabase.com)
2. Buat project baru
3. Catat URL dan API keys:
   - Project URL
   - Anon Key
   - Service Role Key

### 2. Akun Vercel (untuk deployment)

**Persyaratan**:
- Akun Vercel aktif
- Akun GitHub (untuk integration)

**Cara Setup**:
1. Daftar di [vercel.com](https://vercel.com)
2. Hubungkan dengan akun GitHub
3. Siapkan repository untuk deployment

## Hardware Requirements

### Minimum Requirements
- **CPU**: Dual-core 2.0 GHz
- **RAM**: 4 GB
- **Storage**: 10 GB free space
- **Network**: Koneksi internet stabil

### Recommended Requirements
- **CPU**: Quad-core 2.5 GHz
- **RAM**: 8 GB atau lebih
- **Storage**: 20 GB free space (SSD direkomendasikan)
- **Network**: Koneksi internet cepat dan stabil

## Environment Variables

File `.env.local` yang harus disiapkan:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

**Cara Mendapatkan**:
1. Buka dashboard Supabase
2. Navigasi ke Project Settings > API
3. Copy URL dan keys yang diperlukan

## Network Requirements

### Port yang Dibutuhkan
- **Port 3000**: Untuk development server
- **Port 443/80**: Untuk production (HTTPS/HTTP)

### Firewall Configuration
Pastikan tidak ada firewall yang memblokir:
- Akses ke npm registry (registry.npmjs.org)
- Akses ke Supabase (your-project-id.supabase.co)
- Akses ke Vercel (vercel.com)

### Proxy Configuration
Jika berada di belakang proxy corporate, konfigurasi npm:
```bash
npm config set proxy http://proxy.company.com:8080
npm config set https-proxy http://proxy.company.com:8080
```

## Database Requirements

### Supabase PostgreSQL
- Sudah disediakan oleh Supabase
- Tidak perlu instalasi manual
- Dapat diakses melalui Supabase dashboard

### Schema Requirements
Database harus memiliki:
- Tabel: `validasi_isi`, `validasi_konstruk`, `validasi_praktikalitas_guru`, `validasi_praktikalitas_siswa`
- Storage bucket: `signatures`
- Row Level Security policies

## Storage Requirements

### Local Storage
- **Node Modules**: ~500 MB
- **Build Output**: ~100 MB
- **Source Code**: ~50 MB
- **Total**: ~650 MB minimum

### Supabase Storage
- Untuk upload tanda tangan digital
- Quota tergantung pada plan Supabase
- Estimasi: ~1 MB per tanda tangan

## Validasi Prasyarat

Sebelum melanjutkan ke instalasi, jalankan script berikut untuk memvalidasi prasyarat:

```bash
#!/bin/bash
echo "=== Validasi Prasyarat Lingkungan ==="

# Cek Node.js
echo "1. Memeriksa Node.js..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo "✅ Node.js terinstal: $NODE_VERSION"
else
    echo "❌ Node.js tidak terinstal"
    exit 1
fi

# Cek npm
echo "2. Memeriksa npm..."
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo "✅ npm terinstal: $NPM_VERSION"
else
    echo "❌ npm tidak terinstal"
    exit 1
fi

# Cek Git
echo "3. Memeriksa Git..."
if command -v git &> /dev/null; then
    GIT_VERSION=$(git --version)
    echo "✅ Git terinstal: $GIT_VERSION"
else
    echo "❌ Git tidak terinstal"
    exit 1
fi

# Cek environment variables
echo "4. Memeriksa environment variables..."
if [ -f ".env.local" ]; then
    echo "✅ File .env.local ditemukan"
    
    if grep -q "NEXT_PUBLIC_SUPABASE_URL" .env.local; then
        echo "✅ NEXT_PUBLIC_SUPABASE_URL terkonfigurasi"
    else
        echo "❌ NEXT_PUBLIC_SUPABASE_URL tidak ditemukan"
    fi
    
    if grep -q "NEXT_PUBLIC_SUPABASE_ANON_KEY" .env.local; then
        echo "✅ NEXT_PUBLIC_SUPABASE_ANON_KEY terkonfigurasi"
    else
        echo "❌ NEXT_PUBLIC_SUPABASE_ANON_KEY tidak ditemukan"
    fi
    
    if grep -q "SUPABASE_SERVICE_ROLE_KEY" .env.local; then
        echo "✅ SUPABASE_SERVICE_ROLE_KEY terkonfigurasi"
    else
        echo "❌ SUPABASE_SERVICE_ROLE_KEY tidak ditemukan"
    fi
else
    echo "❌ File .env.local tidak ditemukan"
    echo "Buat file .env.local dengan konfigurasi Supabase"
fi

echo "=== Validasi Selesai ==="
```

## Troubleshooting Prasyarat

### Masalah Umum 1: Node.js Version Tidak Cocok
**Gejala**: Error saat instalasi dependencies
**Solusi**: Upgrade Node.js ke versi 18.17.0 atau lebih tinggi

### Masalah Umum 2: npm Registry Error
**Gejala**: Gagal menginstall dependencies
**Solusi**: 
```bash
npm config set registry https://registry.npmjs.org/
npm cache clean --force
```

### Masalah Umum 3: Git Permission Error
**Gejala**: Gagal clone repository
**Solusi**: Konfigurasi Git dengan nama dan email yang benar
```bash
git config --global user.name "Nama Anda"
git config --global user.email "email@example.com"
```

### Masalah Umum 4: Environment Variables Tidak Terbaca
**Gejala**: Error koneksi ke Supabase
**Solusi**: Pastikan file `.env.local` ada di root project dan restart development server

## Rangkuman

Memastikan semua prasyarat lingkungan terpenuhi adalah langkah krusial sebelum menginstal dan menjalankan Sistem Validasi Instrumen Model KESAN. Prasyarat ini mencakup software development tools, layanan eksternal, dan konfigurasi jaringan yang diperlukan agar aplikasi dapat berjalan dengan optimal. Setelah semua prasyarat terpenuhi, Anda siap untuk melanjutkan ke proses instalasi yang akan dijelaskan pada bab berikutnya.
