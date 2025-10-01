@echo off
echo ========================================
echo   PUSH REPOSITORY KE GITHUB
echo ========================================
echo.
echo Langkah 1: Buat Repository di GitHub
echo.
echo 1. Buka browser: https://github.com/new
echo 2. Repository name: ValidasiV3
echo 3. Pilih: Public
echo 4. JANGAN centang "Add a README file"
echo 5. Klik: Create repository
echo.
echo Langkah 2: Copy URL Repository
echo    Format: https://github.com/USERNAME/ValidasiV3.git
echo.
set /p REPO_URL="Paste URL repository GitHub Anda di sini: "
echo.
echo Langkah 3: Push code...
echo.

git remote add origin %REPO_URL%
git branch -M main
git push -u origin main

echo.
echo ========================================
echo   SELESAI!
echo ========================================
echo.
echo Repository sudah berhasil di-push ke GitHub!
echo.
pause
