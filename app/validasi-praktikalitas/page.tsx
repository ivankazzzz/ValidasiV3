import Link from 'next/link';
import { ArrowLeft, GraduationCap, Users } from 'lucide-react';

export default function ValidasiPraktikalitasPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white py-8 shadow-lg">
        <div className="container mx-auto px-4">
          <Link 
            href="/" 
            className="inline-flex items-center text-green-100 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Kembali ke Dashboard
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-3">
            Validasi Praktikalitas
          </h1>
          <p className="text-center text-green-100 text-lg">
            Pilih Jenis Validasi Praktikalitas
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Praktikalitas Guru */}
            <Link href="/validasi-praktikalitas/guru" className="group">
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-blue-500 overflow-hidden h-full">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-8 text-white">
                  <GraduationCap className="w-20 h-20 mb-4 opacity-90" />
                  <h3 className="text-3xl font-bold mb-2">Untuk Guru</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4 text-lg">
                    Validasi praktikalitas Model KESAN dari perspektif guru. 
                    Menilai kemudahan penggunaan dan kebermanfaatan dalam proses pembelajaran.
                  </p>
                  <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform text-lg">
                    Mulai Validasi →
                  </div>
                </div>
              </div>
            </Link>

            {/* Praktikalitas Siswa */}
            <Link href="/validasi-praktikalitas/siswa" className="group">
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-purple-500 overflow-hidden h-full">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-8 text-white">
                  <Users className="w-20 h-20 mb-4 opacity-90" />
                  <h3 className="text-3xl font-bold mb-2">Untuk Siswa</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4 text-lg">
                    Validasi praktikalitas Model KESAN dari perspektif siswa. 
                    Menilai kemudahan memahami dan pengalaman belajar siswa.
                  </p>
                  <div className="flex items-center text-purple-600 font-semibold group-hover:translate-x-2 transition-transform text-lg">
                    Mulai Validasi →
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
