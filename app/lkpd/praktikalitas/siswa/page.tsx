'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Send, Loader2 } from 'lucide-react';
import Link from 'next/link';
import RatingScale from '@/components/RatingScale';

export default function PraktikalitasSiswaLKPDPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    namaSiswa: '',
    kelas: '',
    sekolah: '',
    // Aspek A: Kemudahan Memahami Materi
    a1: 0, a2: 0, a3: 0, a4: 0,
    // Aspek B: Kemudahan Penggunaan LKPD
    b1: 0, b2: 0, b3: 0,
    // Aspek C: Daya Tarik LKPD
    c1: 0, c2: 0, c3: 0,
    // Aspek D: Manfaat untuk Belajar
    d1: 0, d2: 0, d3: 0,
    komentar: '',
    saran: '',
  });

  const handleRatingChange = (field: string, value: number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const ratings = ['a1', 'a2', 'a3', 'a4', 'b1', 'b2', 'b3', 'c1', 'c2', 'c3', 'd1', 'd2', 'd3'];
    const allRated = ratings.every(key => formData[key as keyof typeof formData] > 0);
    
    if (!allRated) {
      alert('Mohon lengkapi semua penilaian');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/validasi/lkpd-praktikalitas-siswa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Validasi berhasil disimpan! Terima kasih atas partisipasi Anda.');
        router.push('/');
      } else {
        alert(`Error: ${result.error || 'Terjadi kesalahan'}`);
      }
    } catch (error) {
      console.error('Submit error:', error);
      alert('Gagal mengirim data. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 text-white py-6 shadow-lg sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <Link href="/" className="inline-flex items-center text-white hover:text-orange-100 transition-colors mb-3">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Kembali ke Beranda
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold">Praktikalitas LKPD - Siswa</h1>
          <p className="text-orange-100 mt-2">Penilaian Kemudahan Pemahaman LKPD oleh Siswa</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white rounded-xl shadow-lg p-4">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3">📄</span>
                LKPD Model KESAN - BAB 1
              </h2>
              <div className="bg-gray-100 rounded-lg overflow-hidden">
                <iframe
                  src="/LKPD_BAB_1.pdf"
                  className="w-full"
                  style={{ height: '50vh', minHeight: '400px' }}
                  title="LKPD Model KESAN"
                />
              </div>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Identitas */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Identitas Siswa</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nama Lengkap <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.namaSiswa}
                      onChange={(e) => setFormData(prev => ({ ...prev, namaSiswa: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Contoh: Ahmad Ridwan"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Kelas <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.kelas}
                      onChange={(e) => setFormData(prev => ({ ...prev, kelas: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Contoh: X IPA 1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sekolah <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.sekolah}
                      onChange={(e) => setFormData(prev => ({ ...prev, sekolah: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Contoh: SMAN 1 Padang"
                    />
                  </div>
                </div>
              </div>

              {/* Aspek A */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-3">
                  A. Kemudahan Memahami Materi
                </h2>
                <div className="space-y-4">
                  <RatingScale id="a1" label="1. Bahasa yang digunakan mudah saya pahami" value={formData.a1} onChange={(value) => handleRatingChange('a1', value)} />
                  <RatingScale id="a2" label="2. Materi yang disajikan mudah saya pahami" value={formData.a2} onChange={(value) => handleRatingChange('a2', value)} />
                  <RatingScale id="a3" label="3. Gambar dan ilustrasi membantu saya memahami materi" value={formData.a3} onChange={(value) => handleRatingChange('a3', value)} />
                  <RatingScale id="a4" label="4. Contoh-contoh yang diberikan mudah saya pahami" value={formData.a4} onChange={(value) => handleRatingChange('a4', value)} />
                </div>
              </div>

              {/* Aspek B */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-3">
                  B. Kemudahan Penggunaan LKPD
                </h2>
                <div className="space-y-4">
                  <RatingScale id="b1" label="1. Petunjuk dalam LKPD mudah saya ikuti" value={formData.b1} onChange={(value) => handleRatingChange('b1', value)} />
                  <RatingScale id="b2" label="2. Kegiatan dalam LKPD mudah saya lakukan" value={formData.b2} onChange={(value) => handleRatingChange('b2', value)} />
                  <RatingScale id="b3" label="3. Pertanyaan dalam LKPD mudah saya jawab" value={formData.b3} onChange={(value) => handleRatingChange('b3', value)} />
                </div>
              </div>

              {/* Aspek C */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-3">
                  C. Daya Tarik LKPD
                </h2>
                <div className="space-y-4">
                  <RatingScale id="c1" label="1. Tampilan LKPD menarik dan tidak membosankan" value={formData.c1} onChange={(value) => handleRatingChange('c1', value)} />
                  <RatingScale id="c2" label="2. Gambar dan warna membuat LKPD menarik" value={formData.c2} onChange={(value) => handleRatingChange('c2', value)} />
                  <RatingScale id="c3" label="3. Saya tertarik mengerjakan LKPD ini" value={formData.c3} onChange={(value) => handleRatingChange('c3', value)} />
                </div>
              </div>

              {/* Aspek D */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-3">
                  D. Manfaat untuk Belajar
                </h2>
                <div className="space-y-4">
                  <RatingScale id="d1" label="1. LKPD membantu saya belajar lebih baik" value={formData.d1} onChange={(value) => handleRatingChange('d1', value)} />
                  <RatingScale id="d2" label="2. LKPD membuat saya lebih aktif dalam belajar" value={formData.d2} onChange={(value) => handleRatingChange('d2', value)} />
                  <RatingScale id="d3" label="3. LKPD meningkatkan pemahaman saya tentang materi" value={formData.d3} onChange={(value) => handleRatingChange('d3', value)} />
                </div>
              </div>

              {/* Komentar & Saran */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Komentar & Saran</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Komentar (Opsional)</label>
                    <textarea
                      value={formData.komentar}
                      onChange={(e) => setFormData(prev => ({ ...prev, komentar: e.target.value }))}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Tuliskan pendapat kamu tentang LKPD ini..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Saran (Opsional)</label>
                    <textarea
                      value={formData.saran}
                      onChange={(e) => setFormData(prev => ({ ...prev, saran: e.target.value }))}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Tuliskan saran perbaikan..."
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Link href="/" className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-center font-semibold">
                  Batal
                </Link>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-orange-600 to-amber-600 text-white px-6 py-3 rounded-lg hover:from-orange-700 hover:to-amber-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Mengirim...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Kirim Penilaian
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
