'use client';

import { useState } from 'react';
import { ArrowLeft, Save, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import SignaturePad from '@/components/SignaturePad';
import RatingScale from '@/components/RatingScale';

export default function ValidasiIsiPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    // Identitas
    nama: '',
    institusi: '',
    keahlian: '',
    
    // Ratings - Bagian A: VALIDITAS KONSTRUK INSTRUMEN
    a1: 0,
    a2: 0,
    
    // Bagian B: RELEVANSI DAN KEPENTINGAN ITEM
    b1: 0,
    b2: 0,
    
    // Bagian C: KEJELASAN DAN BAHASA
    c1: 0,
    c2: 0,
    c3: 0,
    
    // Bagian D: SISTEMATIKA DAN FORMAT
    d1: 0,
    d2: 0,
    
    // Comments
    comments: '',
    suggestions: '',
    
    // Decision
    decision: '' as 'tidak-layak' | 'layak-revisi-besar' | 'layak-revisi-kecil' | 'layak-tanpa-revisi' | '',
    
    // Signature
    signature: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.nama || !formData.institusi || !formData.keahlian) {
      alert('Mohon lengkapi identitas validator!');
      return;
    }
    
    const ratings = [formData.a1, formData.a2, formData.b1, formData.b2, formData.c1, formData.c2, formData.c3, formData.d1, formData.d2];
    if (ratings.some(r => r === 0)) {
      alert('Mohon lengkapi semua penilaian!');
      return;
    }
    
    if (!formData.decision) {
      alert('Mohon pilih keputusan validasi!');
      return;
    }
    
    if (!formData.signature) {
      alert('Mohon berikan tanda tangan!');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/validasi/isi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server error:', errorData);
        throw new Error(errorData.details || errorData.error || 'Gagal menyimpan data');
      }

      setSuccess(true);
      setTimeout(() => router.push('/'), 2000);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert(`Terjadi kesalahan: ${errorMessage}`);
      console.error('Full error:', error);
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
          <p className="text-gray-600 text-lg">
            Data validasi telah tersimpan. Terima kasih atas kontribusi Anda.
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-6 shadow-lg sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <Link 
            href="/" 
            className="inline-flex items-center text-blue-100 hover:text-white mb-2 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Kembali
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold">
            Lembar Validasi Instrumen Isi
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: PDF Viewer */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-500 sticky top-24 h-fit">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">📄 Instrumen Validasi Isi</h2>
            <div className="w-full" style={{ height: '75vh' }}>
              <iframe
                src="/Instrumen_Model_Valid_Isi.pdf"
                className="w-full h-full rounded-lg border-2 border-gray-200"
                title="Instrumen Validasi Isi"
              />
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              💡 Scroll PDF untuk melihat seluruh instrumen
            </p>
          </div>

          {/* Right: Form Validasi */}
          <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-indigo-500">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">✍️ Form Penilaian</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* A. Identitas Validator */}
              <div className="bg-indigo-50 p-6 rounded-lg space-y-4">
                <h3 className="text-xl font-bold text-indigo-900 mb-4">A. Identitas Validator</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.nama}
                    onChange={(e) => setFormData({...formData, nama: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Institusi <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.institusi}
                    onChange={(e) => setFormData({...formData, institusi: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Keahlian <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.keahlian}
                    onChange={(e) => setFormData({...formData, keahlian: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Contoh: Ahli Instrumen / Evaluasi Pendidikan"
                    required
                  />
                </div>
              </div>

              {/* D. Tabel Instrumen Validasi */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-800 mb-4">D. Penilaian Instrumen</h3>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-bold text-blue-900 mb-3">A. VALIDITAS KONSTRUK INSTRUMEN</h4>
                  <div className="space-y-3">
                    <RatingScale
                      id="a1"
                      label="A.1 - Kecukupan Dimensi: Apakah dimensi yang dinilai sudah komprehensif dan tepat?"
                      value={formData.a1}
                      onChange={(v) => setFormData({...formData, a1: v})}
                    />
                    <RatingScale
                      id="a2"
                      label="A.2 - Ketepatan Indikator: Apakah indikator benar-benar merepresentasikan dimensi?"
                      value={formData.a2}
                      onChange={(v) => setFormData({...formData, a2: v})}
                    />
                  </div>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-bold text-purple-900 mb-3">B. RELEVANSI DAN KEPENTINGAN ITEM</h4>
                  <div className="space-y-3">
                    <RatingScale
                      id="b1"
                      label="B.1 - Relevansi Item: Apakah setiap item relevan dan diperlukan?"
                      value={formData.b1}
                      onChange={(v) => setFormData({...formData, b1: v})}
                    />
                    <RatingScale
                      id="b2"
                      label="B.2 - Kelengkapan Item: Apakah ada aspek penting yang terlewat?"
                      value={formData.b2}
                      onChange={(v) => setFormData({...formData, b2: v})}
                    />
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-bold text-green-900 mb-3">C. KEJELASAN (CLARITY) DAN BAHASA</h4>
                  <div className="space-y-3">
                    <RatingScale
                      id="c1"
                      label="C.1 - Bahasa Indikator: Apakah bahasa lugas dan tidak ambigu?"
                      value={formData.c1}
                      onChange={(v) => setFormData({...formData, c1: v})}
                    />
                    <RatingScale
                      id="c2"
                      label="C.2 - Kejelasan Petunjuk: Apakah petunjuk sudah jelas?"
                      value={formData.c2}
                      onChange={(v) => setFormData({...formData, c2: v})}
                    />
                    <RatingScale
                      id="c3"
                      label="C.3 - Kesesuaian Skala: Apakah skala 1-5 tepat digunakan?"
                      value={formData.c3}
                      onChange={(v) => setFormData({...formData, c3: v})}
                    />
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-bold text-yellow-900 mb-3">D. SISTEMATIKA DAN FORMAT INSTRUMEN</h4>
                  <div className="space-y-3">
                    <RatingScale
                      id="d1"
                      label="D.1 - Struktur: Apakah struktur instrumen sistematis dan logis?"
                      value={formData.d1}
                      onChange={(v) => setFormData({...formData, d1: v})}
                    />
                    <RatingScale
                      id="d2"
                      label="D.2 - Tata Letak: Apakah layout tabel nyaman dibaca?"
                      value={formData.d2}
                      onChange={(v) => setFormData({...formData, d2: v})}
                    />
                  </div>
                </div>
              </div>

              {/* E. Komentar / Saran */}
              <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                <h3 className="text-xl font-bold text-gray-800 mb-4">E. Komentar / Saran</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Komentar Umum
                  </label>
                  <textarea
                    value={formData.comments}
                    onChange={(e) => setFormData({...formData, comments: e.target.value})}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Tuliskan komentar atau masukan Anda..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Saran Perbaikan
                  </label>
                  <textarea
                    value={formData.suggestions}
                    onChange={(e) => setFormData({...formData, suggestions: e.target.value})}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Tuliskan saran perbaikan..."
                  />
                </div>
              </div>

              {/* F. Keputusan Validasi */}
              <div className="bg-indigo-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-indigo-900 mb-4">
                  F. Keputusan Validasi <span className="text-red-500">*</span>
                </h3>
                <div className="space-y-2">
                  {[
                    { value: 'tidak-layak', label: 'Tidak Layak Digunakan' },
                    { value: 'layak-revisi-besar', label: 'Layak Digunakan dengan Revisi Besar' },
                    { value: 'layak-revisi-kecil', label: 'Layak Digunakan dengan Revisi Kecil' },
                    { value: 'layak-tanpa-revisi', label: 'Layak Digunakan tanpa Revisi' },
                  ].map((option) => (
                    <label key={option.value} className="flex items-center space-x-3 p-3 border-2 border-gray-300 rounded-lg hover:border-indigo-400 cursor-pointer transition-colors">
                      <input
                        type="radio"
                        name="decision"
                        value={option.value}
                        checked={formData.decision === option.value}
                        onChange={(e) => setFormData({...formData, decision: e.target.value as 'tidak-layak' | 'layak-revisi-besar' | 'layak-revisi-kecil' | 'layak-tanpa-revisi'})}
                        className="w-5 h-5 text-indigo-600"
                        required
                      />
                      <span className="text-gray-700 font-medium">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Tanda Tangan */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <SignaturePad
                  value={formData.signature}
                  onChange={(sig) => setFormData({...formData, signature: sig})}
                  label="Tanda Tangan Validator"
                />
              </div>

              {/* Submit Button */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
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
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
