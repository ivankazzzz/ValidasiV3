import Link from 'next/link';
import { FileText, Users, ClipboardCheck, Shield } from 'lucide-react';

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

