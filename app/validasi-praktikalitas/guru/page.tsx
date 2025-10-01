'use client';

import { useState } from 'react';
import { ArrowLeft, Save, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import SignaturePad from '@/components/SignaturePad';
import RatingScale from '@/components/RatingScale';

const guruQuestions = [
  {
    section: 'A. VALIDITAS KONSTRUK INSTRUMEN',
    color: 'blue',
    items: [
      { id: 'a1', label: 'A.1 - Kesesuaian dengan Tujuan: Apakah instrumen sesuai untuk mengukur praktikalitas Model KESAN?' },
      { id: 'a2', label: 'A.2 - Ketepatan Aspek Praktikalitas: Apakah lima aspek (kemudahan, efisiensi waktu, manfaat, dukungan teknis, kesesuaian kurikulum) sudah tepat?' },
      { id: 'a3', label: 'A.3 - Kelengkapan Indikator: Apakah indikator dalam setiap aspek sudah komprehensif?' },
    ]
  },
  {
    section: 'B. RELEVANSI DAN KEPENTINGAN ITEM',
    color: 'purple',
    items: [
      { id: 'b1', label: 'B.1 - Relevansi Item: Apakah setiap item relevan untuk mengukur praktikalitas dari perspektif guru?' },
      { id: 'b2', label: 'B.2 - Kelengkapan Aspek: Apakah ada aspek praktikalitas yang terlewat?' },
    ]
  },
  {
    section: 'C. KEJELASAN DAN BAHASA',
    color: 'green',
    items: [
      { id: 'c1', label: 'C.1 - Kejelasan Pernyataan: Apakah setiap pernyataan jelas dan mudah dipahami?' },
      { id: 'c2', label: 'C.2 - Ketepatan Bahasa: Apakah bahasa yang digunakan sesuai untuk guru?' },
      { id: 'c3', label: 'C.3 - Kesesuaian Skala: Apakah skala Likert 1-5 tepat digunakan?' },
    ]
  },
  {
    section: 'D. SISTEMATIKA DAN FORMAT',
    color: 'yellow',
    items: [
      { id: 'd1', label: 'D.1 - Urutan Aspek: Apakah urutan aspek praktikalitas logis?' },
      { id: 'd2', label: 'D.2 - Format Tabel: Apakah format mudah digunakan?' },
    ]
  }
];

export default function ValidasiPraktikalitasGuruPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    nama: '',
    institusi: '',
    keahlian: '',
    a1: 0, a2: 0, a3: 0, b1: 0, b2: 0, c1: 0, c2: 0, c3: 0, d1: 0, d2: 0,
    comments: '',
    suggestions: '',
    decision: '' as any,
    signature: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nama || !formData.institusi || !formData.keahlian) {
      alert('Mohon lengkapi identitas validator!');
      return;
    }
    
    const ratings = [formData.a1, formData.a2, formData.a3, formData.b1, formData.b2, formData.c1, formData.c2, formData.c3, formData.d1, formData.d2];
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
      const response = await fetch('/api/validasi/praktikalitas-guru', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Gagal menyimpan data');

      setSuccess(true);
      setTimeout(() => router.push('/'), 2000);
    } catch (error) {
      alert('Terjadi kesalahan saat menyimpan data. Silakan coba lagi.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl p-12 text-center max-w-md">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Berhasil!</h2>
          <p className="text-gray-600 text-lg">Data validasi telah tersimpan. Terima kasih atas kontribusi Anda.</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 pb-12">
      <div className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 text-white py-6 shadow-lg sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <Link href="/validasi-praktikalitas" className="inline-flex items-center text-blue-100 hover:text-white mb-2 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Kembali
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold">
            Validasi Praktikalitas untuk Guru
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-500 sticky top-24 h-fit">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">📋 Tentang Validasi</h2>
            <div className="prose prose-sm max-w-none text-gray-700 space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-bold text-lg mb-2">Tujuan</h3>
                <p>Menilai kelayakan Instrumen Praktikalitas Model KESAN untuk Guru yang mengukur kemudahan penggunaan dan kebermanfaatan dalam pembelajaran IPA.</p>
              </div>
              <div className="bg-cyan-50 p-4 rounded-lg">
                <h3 className="font-bold text-lg mb-2">Aspek Praktikalitas Guru</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Kemudahan penggunaan</li>
                  <li>Efisiensi waktu</li>
                  <li>Manfaat pembelajaran</li>
                  <li>Dukungan teknis</li>
                  <li>Kesesuaian kurikulum</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-cyan-500">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">✍️ Form Penilaian</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-cyan-50 p-6 rounded-lg space-y-4">
                <h3 className="text-xl font-bold text-cyan-900 mb-4">A. Identitas Validator</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama <span className="text-red-500">*</span>
                  </label>
                  <input type="text" value={formData.nama} onChange={(e) => setFormData({...formData, nama: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Institusi <span className="text-red-500">*</span>
                  </label>
                  <input type="text" value={formData.institusi} onChange={(e) => setFormData({...formData, institusi: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Keahlian <span className="text-red-500">*</span>
                  </label>
                  <input type="text" value={formData.keahlian} onChange={(e) => setFormData({...formData, keahlian: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="Contoh: Ahli Evaluasi Pendidikan" required />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-800 mb-4">D. Penilaian Instrumen</h3>
                {guruQuestions.map((section) => (
                  <div key={section.section} className={`bg-${section.color}-50 p-4 rounded-lg`}>
                    <h4 className={`font-bold text-${section.color}-900 mb-3`}>{section.section}</h4>
                    <div className="space-y-3">
                      {section.items.map((item) => (
                        <RatingScale key={item.id} id={item.id} label={item.label}
                          value={(formData as any)[item.id]}
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
                    rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Saran Perbaikan</label>
                  <textarea value={formData.suggestions} onChange={(e) => setFormData({...formData, suggestions: e.target.value})}
                    rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent" />
                </div>
              </div>

              <div className="bg-cyan-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-cyan-900 mb-4">F. Keputusan Validasi <span className="text-red-500">*</span></h3>
                <div className="space-y-2">
                  {[
                    { value: 'tidak-layak', label: 'Tidak Layak Digunakan' },
                    { value: 'layak-revisi-besar', label: 'Layak Digunakan dengan Revisi Besar' },
                    { value: 'layak-revisi-kecil', label: 'Layak Digunakan dengan Revisi Kecil' },
                    { value: 'layak-tanpa-revisi', label: 'Layak Digunakan tanpa Revisi' },
                  ].map((option) => (
                    <label key={option.value} className="flex items-center space-x-3 p-3 border-2 border-gray-300 rounded-lg hover:border-cyan-400 cursor-pointer transition-colors">
                      <input type="radio" name="decision" value={option.value} checked={formData.decision === option.value}
                        onChange={(e) => setFormData({...formData, decision: e.target.value})}
                        className="w-5 h-5 text-cyan-600" required />
                      <span className="text-gray-700 font-medium">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <SignaturePad value={formData.signature} onChange={(sig) => setFormData({...formData, signature: sig})} />
              </div>

              <button type="submit" disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 flex items-center justify-center gap-2">
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
