'use client';

import { useState } from 'react';
import { ArrowLeft, Save, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import SignaturePad from '@/components/SignaturePad';
import RatingScale from '@/components/RatingScale';

const siswaQuestions = [
  {
    section: 'A. VALIDITAS KONSTRUK INSTRUMEN',
    color: 'purple',
    items: [
      { id: 'a1', label: 'A.1 - Kesesuaian dengan Tujuan: Apakah instrumen sesuai untuk mengukur praktikalitas dari perspektif siswa?' },
      { id: 'a2', label: 'A.2 - Ketepatan Aspek: Apakah enam aspek (kemudahan memahami, daya tarik, manfaat, kolaborasi, kesesuaian karakteristik, pengalaman belajar) tepat?' },
      { id: 'a3', label: 'A.3 - Kelengkapan Indikator: Apakah indikator komprehensif untuk perspektif siswa?' },
    ]
  },
  {
    section: 'B. RELEVANSI DAN KEPENTINGAN ITEM',
    color: 'pink',
    items: [
      { id: 'b1', label: 'B.1 - Relevansi Item: Apakah setiap pernyataan relevan dengan pengalaman siswa?' },
      { id: 'b2', label: 'B.2 - Kesesuaian Konteks: Apakah item sesuai dengan tingkat perkembangan siswa SMP/SMA?' },
      { id: 'b3', label: 'B.3 - Ketepatan Jumlah: Apakah jumlah item (20 pernyataan) tepat untuk siswa?' },
    ]
  },
  {
    section: 'C. KEJELASAN DAN BAHASA',
    color: 'blue',
    items: [
      { id: 'c1', label: 'C.1 - Kejelasan Pernyataan: Apakah setiap pernyataan jelas dan mudah dipahami siswa?' },
      { id: 'c2', label: 'C.2 - Ketepatan Bahasa: Apakah bahasa sesuai dengan tingkat pemahaman siswa?' },
      { id: 'c3', label: 'C.3 - Kejelasan Petunjuk: Apakah petunjuk mudah dipahami siswa?' },
      { id: 'c4', label: 'C.4 - Kesesuaian Skala: Apakah skala 1-5 (STS-SS) mudah dipahami siswa?' },
    ]
  },
  {
    section: 'D. SISTEMATIKA DAN FORMAT',
    color: 'green',
    items: [
      { id: 'd1', label: 'D.1 - Urutan Aspek: Apakah urutan aspek logis dan mudah diikuti siswa?' },
      { id: 'd2', label: 'D.2 - Format Tabel: Apakah format mudah dibaca siswa?' },
      { id: 'd3', label: 'D.3 - Kelengkapan Komponen: Apakah komponen lengkap dan sesuai untuk siswa?' },
    ]
  },
  {
    section: 'E. KESESUAIAN DENGAN KARAKTERISTIK SISWA',
    color: 'yellow',
    items: [
      { id: 'e1', label: 'E.1 - Perkembangan Kognitif: Apakah instrumen sesuai dengan tingkat kognitif siswa SMP/SMA?' },
      { id: 'e2', label: 'E.2 - Daya Tarik Visual: Apakah tampilan menarik dan tidak membosankan?' },
    ]
  }
];

export default function ValidasiPraktikalitasSiswaPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    nama: '', institusi: '', keahlian: '',
    a1: 0, a2: 0, a3: 0, b1: 0, b2: 0, b3: 0,
    c1: 0, c2: 0, c3: 0, c4: 0, d1: 0, d2: 0, d3: 0, e1: 0, e2: 0,
    comments: '', suggestions: '', decision: '' as 'tidak-layak' | 'layak-revisi-besar' | 'layak-revisi-kecil' | 'layak-tanpa-revisi' | '', signature: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nama || !formData.institusi || !formData.keahlian) {
      alert('Mohon lengkapi identitas validator!');
      return;
    }
    
    const ratings = [formData.a1, formData.a2, formData.a3, formData.b1, formData.b2, formData.b3,
      formData.c1, formData.c2, formData.c3, formData.c4, formData.d1, formData.d2, formData.d3, formData.e1, formData.e2];
    if (ratings.some(r => r === 0)) {
      alert('Mohon lengkapi semua penilaian!');
      return;
    }
    
    if (!formData.decision || !formData.signature) {
      alert('Mohon lengkapi keputusan dan tanda tangan!');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/validasi/praktikalitas-siswa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Gagal menyimpan data');
      setSuccess(true);
      setTimeout(() => router.push('/'), 2000);
    } catch (error) {
      alert('Terjadi kesalahan. Silakan coba lagi.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl p-12 text-center max-w-md">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Berhasil!</h2>
          <p className="text-gray-600 text-lg">Data validasi telah tersimpan. Terima kasih!</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 pb-12">
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white py-6 shadow-lg sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <Link href="/validasi-praktikalitas" className="inline-flex items-center text-purple-100 hover:text-white mb-2 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Kembali
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold">Validasi Praktikalitas untuk Siswa</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-purple-500 sticky top-24 h-fit">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">📋 Tentang Validasi</h2>
            <div className="prose prose-sm max-w-none text-gray-700 space-y-4">
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-bold text-lg mb-2">Tujuan</h3>
                <p>Menilai kelayakan Instrumen Praktikalitas Model KESAN untuk Siswa yang mengukur kemudahan pemahaman dan pengalaman belajar.</p>
              </div>
              <div className="bg-pink-50 p-4 rounded-lg">
                <h3 className="font-bold text-lg mb-2">Aspek Praktikalitas Siswa</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Kemudahan memahami</li>
                  <li>Daya tarik pembelajaran</li>
                  <li>Manfaat belajar</li>
                  <li>Kolaborasi</li>
                  <li>Kesesuaian karakteristik</li>
                  <li>Pengalaman belajar</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-pink-500">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">✍️ Form Penilaian</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-purple-50 p-6 rounded-lg space-y-4">
                <h3 className="text-xl font-bold text-purple-900 mb-4">A. Identitas Validator</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nama <span className="text-red-500">*</span></label>
                  <input type="text" value={formData.nama} onChange={(e) => setFormData({...formData, nama: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Institusi <span className="text-red-500">*</span></label>
                  <input type="text" value={formData.institusi} onChange={(e) => setFormData({...formData, institusi: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Keahlian <span className="text-red-500">*</span></label>
                  <input type="text" value={formData.keahlian} onChange={(e) => setFormData({...formData, keahlian: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Contoh: Ahli Evaluasi Pendidikan" required />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-800 mb-4">D. Penilaian Instrumen</h3>
                {siswaQuestions.map((section) => (
                  <div key={section.section} className={`bg-${section.color}-50 p-4 rounded-lg`}>
                    <h4 className={`font-bold text-${section.color}-900 mb-3`}>{section.section}</h4>
                    <div className="space-y-3">
                      {section.items.map((item) => (
                        <RatingScale key={item.id} id={item.id} label={item.label}
                          value={formData[item.id as keyof typeof formData] as number}
                          onChange={(v) => setFormData({...formData, [item.id]: v})} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                <h3 className="text-xl font-bold text-gray-800 mb-4">E. Komentar / Saran</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Komentar Umum</label>
                  <textarea value={formData.comments} onChange={(e) => setFormData({...formData, comments: e.target.value})}
                    rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Saran Perbaikan</label>
                  <textarea value={formData.suggestions} onChange={(e) => setFormData({...formData, suggestions: e.target.value})}
                    rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                </div>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-purple-900 mb-4">F. Keputusan <span className="text-red-500">*</span></h3>
                <div className="space-y-2">
                  {[
                    { value: 'tidak-layak', label: 'Tidak Layak Digunakan' },
                    { value: 'layak-revisi-besar', label: 'Layak dengan Revisi Besar' },
                    { value: 'layak-revisi-kecil', label: 'Layak dengan Revisi Kecil' },
                    { value: 'layak-tanpa-revisi', label: 'Layak tanpa Revisi' },
                  ].map((option) => (
                    <label key={option.value} className="flex items-center space-x-3 p-3 border-2 border-gray-300 rounded-lg hover:border-purple-400 cursor-pointer transition-colors">
                      <input type="radio" name="decision" value={option.value} checked={formData.decision === option.value}
                        onChange={(e) => setFormData({...formData, decision: e.target.value as 'tidak-layak' | 'layak-revisi-besar' | 'layak-revisi-kecil' | 'layak-tanpa-revisi'})}
                        className="w-5 h-5 text-purple-600" required />
                      <span className="text-gray-700 font-medium">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <SignaturePad value={formData.signature} onChange={(sig) => setFormData({...formData, signature: sig})} />
              </div>

              <button type="submit" disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <Save className="w-6 h-6" />
                    Simpan Data Validasi
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
