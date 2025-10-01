# Instruksi Setup GitHub dan Deploy ke Vercel

## 1. Membuat Repository GitHub Baru

### Opsi A: Menggunakan GitHub Website
1. Buka https://github.com/new
2. Repository name: `ValidasiV3`
3. Pilih **Public**
4. **JANGAN** centang "Initialize this repository with a README"
5. Klik **Create repository**

### Opsi B: Menggunakan GitHub CLI (jika sudah terinstall)
```bash
gh repo create ValidasiV3 --public --source=. --remote=origin --push
```

## 2. Push Code ke GitHub (jika pakai Opsi A)

Setelah repository dibuat, jalankan command berikut di terminal:

```bash
cd c:\Users\Admin\Documents\ValidasiV3\validasi-app
git remote add origin https://github.com/YOUR_USERNAME/ValidasiV3.git
git branch -M main
git push -u origin main
```

**Ganti `YOUR_USERNAME` dengan username GitHub Anda!**

## 3. Setup Supabase Database

1. Login ke https://supabase.com
2. Buka project Anda (atau buat baru jika belum ada)
3. Pergi ke **SQL Editor**
4. Buat query baru
5. Copy seluruh isi file `supabase-schema.sql`
6. Paste dan klik **Run**
7. Tunggu sampai selesai - akan membuat:
   - 4 tabel (validasi_isi, validasi_konstruk, validasi_praktikalitas_guru, validasi_praktikalitas_siswa)
   - Storage bucket untuk signatures
   - Row Level Security policies

## 4. Deploy ke Vercel

### Langkah 1: Import Project
1. Buka https://vercel.com
2. Login dengan GitHub account
3. Klik **Add New** → **Project**
4. Pilih repository **ValidasiV3**
5. Klik **Import**

### Langkah 2: Configure Project
1. **Framework Preset**: Next.js (sudah otomatis terdeteksi)
2. **Root Directory**: `./` (default)
3. **Build Command**: `npm run build` (default)
4. **Output Directory**: `.next` (default)

### Langkah 3: Environment Variables
Tambahkan 3 environment variables berikut:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://lkuksddrbsoutwboyhon.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxrdWtzZGRyYnNvdXR3Ym95aG9uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyMDU5NDMsImV4cCI6MjA3NDc4MTk0M30.l7L8VpPepXuge1ZMrbYrS_H4_4a_GPASb8wcgshg5lQ` |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxrdWtzZGRyYnNvdXR3Ym95aG9uIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTIwNTk0MywiZXhwIjoyMDc0NzgxOTQzfQ.7A3KrtNmaKL5JvtCvGWlEGYGO6X2Bb-ylKlEw73BuRg` |

### Langkah 4: Deploy
1. Klik **Deploy**
2. Tunggu proses build selesai (sekitar 2-5 menit)
3. Website Anda siap! 🎉

## 5. Verifikasi Deployment

1. Buka URL yang diberikan Vercel (contoh: `validasi-v3.vercel.app`)
2. Test semua halaman:
   - ✅ Dashboard utama
   - ✅ Validasi Isi
   - ✅ Validasi Konstruk
   - ✅ Validasi Praktikalitas (Guru & Siswa)
3. Test submit form (opsional untuk verifikasi)

## 6. Update Code di Masa Depan

Setelah melakukan perubahan code:

```bash
git add .
git commit -m "Deskripsi perubahan"
git push
```

Vercel akan otomatis rebuild dan deploy! 🚀

## Troubleshooting

### Error: "Failed to upload signature"
- Pastikan storage bucket `signatures` sudah dibuat di Supabase
- Cek policy storage bucket sudah benar

### Error: "Failed to save data"
- Pastikan semua tabel sudah dibuat dengan query SQL
- Cek RLS (Row Level Security) policies sudah aktif

### Build Error di Vercel
- Cek semua environment variables sudah benar
- Lihat log error di Vercel dashboard untuk detail

---

Jika ada masalah, silakan cek dokumentasi:
- Next.js: https://nextjs.org/docs
- Supabase: https://supabase.com/docs
- Vercel: https://vercel.com/docs
