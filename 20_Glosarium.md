# Bab 20: Glosarium

## Pendahuluan

Glosarium ini menyediakan definisi untuk istilah-istilah teknis dan konsep yang digunakan dalam Sistem Validasi Instrumen Model KESAN. Ini dirancang untuk membantu pembaca dari berbagai latar belakang—dari pengembang hingga validator instrumen—memahami terminologi yang digunakan dalam dokumentasi dan implementasi sistem.

## Istilah Teknis

### A

- **API (Application Programming Interface)**: Sekumpulan protokol dan tools untuk membangun aplikasi software. Dalam konteks sistem ini, API merujuk ke endpoints yang memungkinkan komunikasi antara frontend dan backend.

- **API Route**: Dalam Next.js, API route adalah file yang mengekspor fungsi HTTP handler untuk membuat API endpoints.

- **App Router**: Sistem routing berbasis file yang diperkenalkan di Next.js 13.5+, menggunakan folder `app/` untuk mendefinisikan routes.

- **Authentication**: Proses verifikasi identitas pengguna. Sistem saat ini tidak mengimplementasikan authentication, tetapi direncanakan untuk penambahan di masa depan.

- **Authorization**: Proses menentukan apakah pengguna memiliki izin untuk mengakses sumber daya tertentu.

### B

- **Backup**: Proses membuat salinan data untuk mencegah kehilangan data. Sistem menggunakan backup otomatis dari Supabase dan backup kustom.

- **Backend**: Bagian dari aplikasi yang berjalan di server, mengelola logika bisnis, database, dan API.

- **Base64**: Metode encoding binary data ke format string teks, digunakan untuk tanda tangan digital.

- **Blob (Binary Large Object)**: Tipe data untuk menyimpan data biner seperti gambar tanda tangan.

- **Branch**: Dalam Git, branch adalah versi independen dari codebase yang memungkinkan pengembangan paralel.

- **Browser Developer Tools**: Set tools built-in dalam browser web untuk debugging dan menginspeksi halaman web.

- **Build**: Proses mengkonversi source code menjadi bentuk yang dapat dijalankan di browser atau server.

### C

- **CI/CD (Continuous Integration/Continuous Deployment)**: Praktik pengembangan di mana pengembang mengintegrasikan kode ke repository utama secara berkala dan deployment otomatis.

- **Client-Side Rendering (CSR)**: Proses rendering halaman web di browser menggunakan JavaScript.

- **CORS (Cross-Origin Resource Sharing)**: Mekanisme keamanan yang memungkinkan atau memblokir permintaan sumber daya dari domain yang berbeda.

- **Component**: Dalam React, component adalah bagian UI yang dapat digunakan kembali dan mengelola state-nya sendiri.

- **Content Security Policy (CSP)**: Lapisan keamanan yang membantu mendeteksi dan mencegah jenis serangan tertentu seperti Cross-Site Scripting (XSS).

- **Cookie**: Potongan kecil data yang disimpan di browser pengguna dan dikirim dengan setiap permintaan HTTP ke server.

### D

- **Database**: Sistem terorganisir untuk menyimpan, mengelola, dan mengambil data elektronik. Sistem menggunakan PostgreSQL melalui Supabase.

- **Debugging**: Proses mengidentifikasi dan memperbaiki bug atau masalah dalam kode.

- **Deployment**: Proses mengunggah aplikasi ke server sehingga dapat diakses oleh pengguna.

- **DOM (Document Object Model)**: Representasi struktur dari dokumen HTML yang memungkinkan program untuk mengakses dan memodifikasi konten, struktur, dan style dokumen.

- **Dependency**: Package atau library yang diperlukan aplikasi untuk berfungsi.

### E

- **E2E (End-to-End) Testing**: Metode pengujian yang memvalidasi flow aplikasi dari awal hingga akhir dari perspektif pengguna.

- **Environment Variables**: Variabel yang disimpan di lingkungan sistem operasi dan digunakan oleh aplikasi untuk konfigurasi.

- **Error Boundary**: Komponen React yang menangkap JavaScript error di child component tree, log error, dan menampilkan UI fallback.

- **ESLint**: Tool untuk mengidentifikasi dan melaporkan pola dalam JavaScript, dengan tujuan membuat kode lebih konsisten dan menghindari bug.

- **Event Handling**: Proses menangani event seperti klik, submit, atau perubahan input dalam aplikasi web.

### F

- **Fetch API**: Interface modern untuk membuat HTTP requests di browser.

- **Frontend**: Bagian dari aplikasi yang berjalan di browser dan berinteraksi langsung dengan pengguna.

- **Framework**: Kumpulan library dan tools yang menyediakan struktur untuk pengembangan aplikasi.

- **Function**: Blok kode yang dirancang untuk melakukan tugas tertentu dan dapat dipanggil berulang kali.

- **Full-Stack**: Pengembangan yang mencakupi frontend dan backend.

### G

- **Git**: Sistem kontrol versi terdistribusi untuk melacak perubahan dalam kode sumber.

- **GitHub**: Platform hosting berbasis web untuk Git yang menyediakan fitur kolaborasi.

- **Global State**: State yang dapat diakses oleh multiple components dalam aplikasi.

- **GUI (Graphical User Interface)**: Interface visual yang memungkinkan pengguna berinteraksi dengan perangkat elektronik melalui grafis dan icon.

### H

- **Hook**: Dalam React, hook adalah fungsi yang memungkinkan penggunaan state dan fitur React lain tanpa menulis class.

- **Hosting**: Layanan yang menyediakan infrastruktur untuk membuat situs web atau aplikasi web dapat diakses melalui internet.

- **HTTP (Hypertext Transfer Protocol)**: Protokol yang digunakan untuk mengirim data antara browser dan server.

- **HTTPS (HTTP Secure)**: Versi aman dari HTTP yang menggunakan enkripsi SSL/TLS.

- **Hydration**: Proses membuat HTML yang dirender di server menjadi interaktif di browser dengan menambahkan event listeners dan state.

### I

- **IDE (Integrated Development Environment)**: Aplikasi software yang menyediakan fasilitas komprehensif untuk pengembangan perangkat lunak.

- **Integration Testing**: Jenis pengujian yang menguji interaksi antar komponen atau modul.

- **Interface**: Dalam TypeScript, interface adalah struktur yang mendefinisikan kontrak untuk bentuk objek.

- **Iteration**: Proses mengulangi serangkaian instruksi atau langkah dalam program.

- **Issue**: Masalah atau bug yang dilaporkan dalam sistem.

### J

- **Jest**: Framework testing JavaScript yang digunakan untuk unit dan integration testing.

- **JSON (JavaScript Object Notation)**: Format pertukaran data yang ringan dan mudah dibaca oleh manusia.

- **JSX (JavaScript XML)**: Ekstensi sintaks JavaScript yang memungkinkan penulisan kode mirip HTML dalam file JavaScript.

- **JWT (JSON Web Token)**: Standar terbuka untuk membuat token akses yang aman.

### K

- **Key**: Dalam Supabase, key adalah kunci API yang digunakan untuk autentikasi dan otorisasi.

- **Key-Value Pair**: Struktur data yang terdiri dari kunci unik dan nilai terkait.

- **Keyword**: Kata yang memiliki makna khusus dalam bahasa pemrograman.

### L

- **Library**: Koleksi fungsi dan objek yang dapat digunakan kembali dalam pengembangan.

- **Linting**: Proses analisis statis kode untuk menemukan error dan masalah pemrograman.

- **Localhost**: Nama standar untuk alamat loopback network komputer lokal (127.0.0.1).

- **Logging**: Proses mencatat informasi tentang eksekusi program untuk debugging dan monitoring.

- **LKPD (Lembar Kerja Peserta Didik)**: Dokumen yang digunakan siswa untuk melakukan kegiatan pembelajaran.

### M

- **Middleware**: Fungsi yang berjalan di antara request dan response dalam aplikasi web.

- **Mocking**: Proses membuat objek tiruan untuk testing atau development.

- **Module**: Bagian dari program yang memiliki fungsionalitas terpisah dan dapat digunakan kembali.

- **Monitoring**: Proses memantau kesehatan dan performa aplikasi.

- **Mutation**: Dalam GraphQL, mutation adalah operasi yang menyebabkan perubahan data di server.

### N

- **Next.js**: Framework React untuk aplikasi web full-stack dengan rendering sisi server.

- **Node.js**: Runtime JavaScript yang dibangun di atas V8 JavaScript engine.

- **npm (Node Package Manager)**: Manajer paket default untuk Node.js.

- **NoSQL**: Database non-relasional yang tidak menggunakan skema tabel tetap.

- **Null**: Nilai yang menunjukkan ketiadaan objek atau nilai.

### O

- **Object**: Koleksi properti dan metode terkait dalam pemrograman berorientasi objek.

- **ORM (Object-Relational Mapping)**: Teknik untuk mengkonversi data antara sistem tipe tidak kompatibel dalam bahasa pemrograman berorientasi objek.

- **Optimization**: Proses meningkatkan performa aplikasi.

- **Origin**: Kombinasi scheme (protocol), domain, dan port dari URL.

- **Output**: Data yang dihasilkan oleh program setelah proses.

### P

- **Package**: Koleksi file terkait yang membentuk modul atau library.

- **Pagination**: Proses membagi konten digital menjadi halaman-halaman terpisah.

- **Parameter**: Variabel yang diteruskan ke fungsi saat dipanggil.

- **Parse**: Proses menganalisis string data untuk mengidentifikasi komponen struktur.

- **Payload**: Bagian dari data yang ditransmisikan yang merupakan data aktual.

- **Performance**: Seberapa baik sistem berfungsi dalam hal kecepatan respons dan penggunaan sumber daya.

- **Playwright**: Framework end-to-end testing untuk web aplikasi modern.

- **PostgreSQL**: Sistem database relasional open-source yang kuat.

- **Production**: Lingkungan di mana aplikasi di-deploy dan digunakan oleh pengguna akhir.

- **Promise**: Objek yang mewakili keberhasilan atau kegagalan operasi asinkron.

- **Props (Properties)**: Dalam React, props adalah objek yang berisi data yang diteruskan dari parent ke child component.

- **Pull Request (PR)**: Dalam Git, PR adalah mekanisme untuk mengusulkan perubahan dan meminta review sebelum merge ke branch utama.

### Q

- **Query**: Permintaan informasi dari database.

- **Queue**: Struktur data yang mengikuti prinsip First-In-First-Out (FIFO).

- **Quick Fix**: Solusi sementara untuk masalah yang memerlukan perbaikan lebih permanen.

### R

- **React**: Library JavaScript untuk membangun user interface.

- **Recovery**: Proses mengembalikan sistem ke kondisi normal setelah kegagalan.

- **Refactoring**: Proses memodifikasi kode tanpa mengubah fungsionalitas eksternal.

- **Regression Testing**: Jenis pengujian yang memastikan perubahan baru tidak merusak fungsionalitas yang ada.

- **Rendering**: Proses menghasilkan output dari program, biasanya dalam bentuk visual.

- **Request**: Pesan yang dikirim dari client ke server.

- **Response**: Pesan yang dikirim dari server ke client sebagai jawaban atas request.

- **Responsive Design**: Pendekatan desain web yang membuat situs web menyesuaikan dengan ukuran layar berbeda.

- **REST (Representational State Transfer)**: Gaya arsitektur software untuk mendesain aplikasi networked.

- **Rollback**: Proses mengembalikan sistem ke versi sebelumnya setelah deployment gagal.

- **Route**: Dalam Next.js, route adalah path URL yang sesuai dengan halaman tertentu.

- **Row Level Security (RLS)**: Fitur keamanan database yang membatasi akses ke baris data berdasarkan identitas pengguna.

- **Runtime**: Lingkungan di mana program dieksekusi.

### S

- **SDK (Software Development Kit)**: Koleksi tools untuk mengembangkan aplikasi untuk platform tertentu.

- **Security**: Praktik dan teknik untuk melindungi sistem dari ancaman.

- **Server**: Komputer atau program yang menyediakan layanan atau sumber daya untuk client.

- **Server-Side Rendering (SSR)**: Proses rendering halaman web di server sebelum mengirim ke browser.

- **Service Role Key**: Dalam Supabase, service role key adalah kunci API dengan akses penuh yang hanya boleh digunakan di server.

- **Session**: Periode waktu di mana pengguna berinteraksi dengan aplikasi web.

- **Signature Pad**: Komponen untuk menangkap tanda tangan digital.

- **Snapshot**: Status sistem pada titik waktu tertentu.

- **SQL (Structured Query Language)**: Bahasa standar untuk mengelola database relasional.

- **SSL/TLS (Secure Sockets Layer/Transport Layer Security)**: Protokol keamanan untuk mengamankan komunikasi internet.

- **State**: Dalam React, state adalah objek yang menyimpan data yang dapat berubah seiring waktu.

- **Static Site Generation (SSG)**: Proses menghasilkan halaman HTML statis pada build time.

- **Storage**: Sistem untuk menyimpan dan mengelola data digital.

- **Supabase**: Platform backend-as-a-service yang menyediakan database, autentikasi, dan storage.

- **SVG (Scalable Vector Graphics)**: Format gambar berbasis vektor yang dapat diskalakan tanpa kehilangan kualitas.

### T

- **Tailwind CSS**: Framework CSS utility-first untuk membuat desain kustom.

- **Testing**: Proses mengevaluasi fungsionalitas aplikasi untuk memastikan kebutuhan terpenuhi.

- **Type Safety**: Properti program di mana setiap operasi akan gagal pada waktu compile jika terjadi ketidakcocokan tipe.

- **TypeScript**: Superset JavaScript yang menambahkan tipe statis dan fitur berbasis kelas.

- **Type Assertion**: Cara untuk memberi tahu compiler tentang tipe variabel ketika compiler tidak dapat menyimpulkannya secara otomatis.

### U

- **UI (User Interface)**: Titik interaksi antara pengguna dan komputer.

- **Unit Testing**: Jenis pengujian yang menguji komponen atau fungsi individual secara terisolasi.

- **Update**: Proses memodifikasi data atau program.

- **URL (Uniform Resource Locator)**: Referensi ke sumber daya web.

- **UseEffect**: Hook React untuk melakukan side effect dalam functional components.

- **UseState**: Hook React untuk menambahkan state ke functional components.

- **User**: Individu yang berinteraksi dengan aplikasi.

- **UX (User Experience)**: Perasaan dan emosi pengguna saat menggunakan aplikasi.

### V

- **Validation**: Proses memeriksa kebenaran dan kualitas data.

- **Variable**: Tempat penyimpanan data yang diberi nama.

- **Vercel**: Platform cloud untuk deployment aplikasi Next.js.

- **Version Control**: Sistem untuk mengelola perubahan dalam kode sumber dari waktu ke waktu.

- **Viewport**: Area yang terlihat dari halaman web di perangkat pengguna.

### W

- **Webhook**: Metode untuk aplikasi untuk menyediakan data real-time ke aplikasi lain.

- **WebVitals**: Metrik untuk mengukur kualitas pengalaman pengguna di web.

- **Wireframe**: Visual guide struktural dari halaman web atau aplikasi.

- **Workflow**: Serangkaian langkah untuk menyelesaikan tugas.

### X

- **XSS (Cross-Site Scripting)**: Serangan keamanan yang menyisipkan skrip berbahaya ke halaman web.

### Y

- **Yarn**: Manajer paket alternatif untuk Node.js.

- **YUP**: Library JavaScript untuk validasi skema.

### Z

- **Zero-Day**: Kerentanan keamanan yang dieksploitasi oleh penyerang pada hari yang sama kerentanan ditemukan.

## Istilah Domain Spesifik

### I

- **Instrumen**: Alat atau metode yang digunakan untuk mengumpulkan data dalam penelitian.

- **Instrumen Model KESAN**: Instrumen yang dikembangkan berdasarkan model KESAN untuk validasi.

### K

- **KESAN (Konstruktivisme, Sains, Alam, Etnosains)**: Model pembelajaran yang menjadi dasar pengembangan instrumen.

- **Kompetensi Dasar (KD)**: Standar kompetensi yang harus dicapai siswa sesuai kurikulum.

- **Konstruk Validasi**: Proses memvalidasi apakah instrumen mengukur konsep yang dimaksud.

### L

- **Layak dengan Revisi Besar**: Keputusan validasi bahwa instrumen dapat digunakan setelah perbaikan signifikan.

- **Layak dengan Revisi Kecil**: Keputusan validasi bahwa instrumen dapat digunakan setelah perbaikan minor.

- **Layak Tanpa Revisi**: Keputusan validasi bahwa instrumen dapat digunakan tanpa perbaikan.

- **LKPD (Lembar Kerja Peserta Didik)**: Dokumen yang digunakan siswa untuk melakukan kegiatan pembelajaran.

### P

- **Praktikalitas**: Tingkat kemudahan penggunaan instrumen dalam konteks nyata.

- **Praktikalitas Guru**: Penilaian praktikalitas instrumen dari perspektif guru.

- **Praktikalitas Siswa**: Penilaian praktikalitas instrumen dari perspektif siswa.

### T

- **Tidak Layak**: Keputusan validasi bahwa instrumen tidak dapat digunakan sama sekali.

- **Tanda Tangan Digital**: Representasi digital dari tanda tangan tertulis yang digunakan untuk verifikasi.

### V

- **Validasi**: Proses mengevaluasi instrumen untuk memastikan keandalan dan keabsahannya.

- **Validasi Isi**: Proses memvalidasi apakah item instrumen mencerminkan konten yang diukur.

- **Validator**: Ahli yang melakukan validasi instrumen.

- **Validator Identity**: Informasi identitas validator termasuk nama, institusi, dan keahlian.

## Akronim

- **API**: Application Programming Interface
- **CI/CD**: Continuous Integration/Continuous Deployment
- **CORS**: Cross-Origin Resource Sharing
- **CSR**: Client-Side Rendering
- **CSS**: Cascading Style Sheets
- **DOM**: Document Object Model
- **E2E**: End-to-End
- **GUI**: Graphical User Interface
- **HTML**: Hypertext Markup Language
- **HTTP**: Hypertext Transfer Protocol
- **HTTPS**: HTTP Secure
- **IDE**: Integrated Development Environment
- **JSON**: JavaScript Object Notation
- **JSX**: JavaScript XML
- **JWT**: JSON Web Token
- **KD**: Kompetensi Dasar
- **KESAN**: Konstruktivisme, Sains, Alam, Etnosains
- **LKPD**: Lembar Kerja Peserta Didik
- **ORM**: Object-Relational Mapping
- **PII**: Personally Identifiable Information
- **PR**: Pull Request
- **REST**: Representational State Transfer
- **RLS**: Row Level Security
- **SDK**: Software Development Kit
- **SSR**: Server-Side Rendering
- **SSG**: Static Site Generation
- **SSL/TLS**: Secure Sockets Layer/Transport Layer Security
- **UI**: User Interface
- **UX**: User Experience
- **URL**: Uniform Resource Locator
- **XSS**: Cross-Site Scripting

## Rangkuman

Glosarium ini menyediakan referensi cepat untuk istilah-istilah teknis dan domain spesifik yang digunakan dalam Sistem Validasi Instrumen Model KESAN. Pemahaman yang baik tentang terminologi ini akan membantu pembaca dalam memahami dokumentasi, implementasi, dan pengembangan sistem lebih efektif.

Pada bab terakhir, kita akan menyediakan apendiks dengan informasi tambahan yang mungkin berguna bagi pengembang dan pengguna sistem.
