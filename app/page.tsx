import Link from 'next/link';
import { FileText, Users, ClipboardCheck, Shield, BookOpen } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-8 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold text-center mb-3">
                Sistem Validasi Instrumen
              </h1>
              <p className="text-center text-blue-100 text-lg md:text-xl">
                Model KESAN (Konektivitas Etnosains-Sains)
              </p>
            </div>
            <Link 
              href="/admin" 
              className="hidden md:flex items-center space-x-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors backdrop-blur-sm border border-white/30"
            >
              <Shield className="w-5 h-5" />
              <span className="font-semibold">Admin</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Introduction */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 border-t-4 border-indigo-500">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Selamat Datang
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Sistem ini dirancang untuk membantu proses validasi instrumen penelitian Model KESAN. 
              Silakan pilih jenis validasi yang ingin Anda lakukan di bawah ini.
            </p>
          </div>

          {/* Section 1: Validasi Model KESAN */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="bg-indigo-500 text-white px-4 py-2 rounded-lg mr-3">1</span>
              Validasi Model KESAN
            </h2>
            
            {/* Validation Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Validasi Isi */}
              <Link href="/validasi-isi" className="group">
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-blue-500 overflow-hidden">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-white">
                    <FileText className="w-16 h-16 mb-4 opacity-90" />
                    <h3 className="text-2xl font-bold mb-2">Validasi Isi</h3>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">
                      Validasi untuk menilai kesesuaian konten dengan kurikulum, akurasi konseptual, 
                      dan integrasi etnosains-sains.
                    </p>
                    <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform">
                      Mulai Validasi →
                    </div>
                  </div>
                </div>
              </Link>

              {/* Validasi Konstruk */}
              <Link href="/validasi-konstruk" className="group">
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-purple-500 overflow-hidden">
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 text-white">
                    <ClipboardCheck className="w-16 h-16 mb-4 opacity-90" />
                    <h3 className="text-2xl font-bold mb-2">Validasi Konstruk</h3>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">
                      Validasi untuk menilai kerangka teoretis dan struktur internal Model KESAN 
                      sebagai model pembelajaran.
                    </p>
                    <div className="flex items-center text-purple-600 font-semibold group-hover:translate-x-2 transition-transform">
                      Mulai Validasi →
                    </div>
                  </div>
                </div>
              </Link>

              {/* Validasi Praktikalitas */}
              <Link href="/validasi-praktikalitas" className="group md:col-span-2 lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-green-500 overflow-hidden">
                  <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 text-white">
                    <Users className="w-16 h-16 mb-4 opacity-90" />
                    <h3 className="text-2xl font-bold mb-2">Validasi Praktikalitas</h3>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">
                      Validasi untuk menilai kemudahan penggunaan dan kebermanfaatan Model KESAN 
                      dari perspektif guru dan siswa.
                    </p>
                    <div className="flex items-center text-green-600 font-semibold group-hover:translate-x-2 transition-transform">
                      Mulai Validasi →
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Section 2: Validasi LKPD */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="bg-amber-500 text-white px-4 py-2 rounded-lg mr-3">2</span>
              Validasi LKPD Model KESAN
            </h2>
            
            {/* LKPD Validation Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* LKPD - Validasi Isi */}
              <Link href="/lkpd/isi" className="group">
                <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-cyan-500 overflow-hidden h-full">
                  <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 p-5 text-white">
                    <BookOpen className="w-12 h-12 mb-3 opacity-90" />
                    <h3 className="text-xl font-bold">Validasi Isi</h3>
                  </div>
                  <div className="p-5">
                    <p className="text-gray-600 text-sm mb-3">
                      Validasi kesesuaian materi LKPD dengan KD dan keakuratan konten.
                    </p>
                    <div className="flex items-center text-cyan-600 font-semibold text-sm group-hover:translate-x-2 transition-transform">
                      Mulai →
                    </div>
                  </div>
                </div>
              </Link>

              {/* LKPD - Validasi Konstruk */}
              <Link href="/lkpd/konstruk" className="group">
                <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-pink-500 overflow-hidden h-full">
                  <div className="bg-gradient-to-br from-pink-500 to-pink-600 p-5 text-white">
                    <ClipboardCheck className="w-12 h-12 mb-3 opacity-90" />
                    <h3 className="text-xl font-bold">Validasi Konstruk</h3>
                  </div>
                  <div className="p-5">
                    <p className="text-gray-600 text-sm mb-3">
                      Validasi kelengkapan dan sistematika penyusunan LKPD.
                    </p>
                    <div className="flex items-center text-pink-600 font-semibold text-sm group-hover:translate-x-2 transition-transform">
                      Mulai →
                    </div>
                  </div>
                </div>
              </Link>

              {/* LKPD - Praktikalitas Guru */}
              <Link href="/lkpd/praktikalitas/guru" className="group">
                <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-emerald-500 overflow-hidden h-full">
                  <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-5 text-white">
                    <Users className="w-12 h-12 mb-3 opacity-90" />
                    <h3 className="text-xl font-bold">Praktikalitas Guru</h3>
                  </div>
                  <div className="p-5">
                    <p className="text-gray-600 text-sm mb-3">
                      Penilaian kemudahan penggunaan LKPD oleh guru.
                    </p>
                    <div className="flex items-center text-emerald-600 font-semibold text-sm group-hover:translate-x-2 transition-transform">
                      Mulai →
                    </div>
                  </div>
                </div>
              </Link>

              {/* LKPD - Praktikalitas Siswa */}
              <Link href="/lkpd/praktikalitas/siswa" className="group">
                <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-orange-500 overflow-hidden h-full">
                  <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-5 text-white">
                    <Users className="w-12 h-12 mb-3 opacity-90" />
                    <h3 className="text-xl font-bold">Praktikalitas Siswa</h3>
                  </div>
                  <div className="p-5">
                    <p className="text-gray-600 text-sm mb-3">
                      Penilaian kemudahan pemahaman LKPD oleh siswa.
                    </p>
                    <div className="flex items-center text-orange-600 font-semibold text-sm group-hover:translate-x-2 transition-transform">
                      Mulai →
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl p-6 inline-block">
              <p className="text-gray-700 font-medium">
                📝 Semua data yang Anda masukkan akan tersimpan dengan aman di database
              </p>
            </div>
            
            {/* Mobile Admin Link */}
            <div className="mt-6 md:hidden">
              <Link 
                href="/admin"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg"
              >
                <Shield className="w-5 h-5" />
                <span className="font-semibold">Halaman Admin</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-300">
            © 2025 Sistem Validasi Instrumen Model KESAN
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Peneliti: Irfan Ananda Ismail, S.Pd, M.Pd, Gr.
          </p>
        </div>
      </footer>
    </main>
  );
}

