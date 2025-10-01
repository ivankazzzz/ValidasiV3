# Script untuk Push ke GitHub
# Jalankan dengan: .\push-github.ps1

Write-Host "===========================================" -ForegroundColor Cyan
Write-Host "   PUSH VALIDASI V3 KE GITHUB" -ForegroundColor Cyan
Write-Host "===========================================" -ForegroundColor Cyan
Write-Host ""

# Cek apakah sudah ada remote
$remoteExists = git remote -v 2>$null
if ($remoteExists) {
    Write-Host "Remote sudah ada:" -ForegroundColor Yellow
    git remote -v
    Write-Host ""
    $continue = Read-Host "Lanjut push ke existing remote? (y/n)"
    if ($continue -ne 'y') {
        Write-Host "Push dibatalkan." -ForegroundColor Red
        exit
    }
} else {
    Write-Host "Belum ada remote origin." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Langkah 1: Buat repository di GitHub" -ForegroundColor Green
    Write-Host "  - Buka: https://github.com/new" -ForegroundColor White
    Write-Host "  - Repository name: ValidasiV3" -ForegroundColor White
    Write-Host "  - Pilih: Public" -ForegroundColor White
    Write-Host "  - JANGAN centang 'Add a README'" -ForegroundColor Red
    Write-Host "  - Klik: Create repository" -ForegroundColor White
    Write-Host ""
    
    $repoUrl = Read-Host "Paste URL repository (https://github.com/username/ValidasiV3.git)"
    
    if (-not $repoUrl) {
        Write-Host "ERROR: URL tidak boleh kosong!" -ForegroundColor Red
        exit
    }
    
    Write-Host ""
    Write-Host "Menambahkan remote origin..." -ForegroundColor Yellow
    git remote add origin $repoUrl
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "ERROR: Gagal menambahkan remote!" -ForegroundColor Red
        exit
    }
}

Write-Host "Mengubah branch ke main..." -ForegroundColor Yellow
git branch -M main

Write-Host "Pushing ke GitHub..." -ForegroundColor Yellow
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "===========================================" -ForegroundColor Green
    Write-Host "   SUCCESS!" -ForegroundColor Green
    Write-Host "===========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Repository berhasil di-push ke GitHub!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Langkah selanjutnya:" -ForegroundColor Yellow
    Write-Host "1. Setup database Supabase (lihat QUICKSTART.md)" -ForegroundColor White
    Write-Host "2. Deploy ke Vercel (lihat DEPLOYMENT.md)" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "ERROR: Gagal push ke GitHub!" -ForegroundColor Red
    Write-Host "Cek error di atas untuk detail." -ForegroundColor Red
}

Write-Host "Tekan Enter untuk keluar..."
$null = Read-Host
