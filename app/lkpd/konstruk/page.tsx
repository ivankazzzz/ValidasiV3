'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Send, Loader2, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import RatingScale from '@/components/RatingScale';
import SignaturePad from '@/components/SignaturePad';

export default function ValidasiKonstrukLKPDPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [signatureData, setSignatureData] = useState<string>('');

  const [formData, setFormData] = useState({
    namaValidator: '',
    instansi: '',
    // Aspek A: Kelengkapan Komponen LKPD
    a1: 0, a2: 0, a3: 0, a4: 0, a5: 0,
    // Aspek B: Sistematika Penyusunan LKPD
    b1: 0, b2: 0, b3: 0, b4: 0,
    // Aspek C: Kesesuaian dengan Model KESAN
    c1: 0, c2: 0, c3: 0, c4: 0,
    // Aspek D: Kejelasan Petunjuk dan Instruksi
    d1: 0, d2: 0, d3: 0,
    komentar: '',
    saran: '',
  });

  const handleRatingChange = (field: string, value: number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!signatureData) {
      alert('Mohon berikan tanda tangan Anda');
      return;
    }

    const ratings = ['a1', 'a2', 'a3', 'a4', 'a5', 'b1', 'b2', 'b3', 'b4', 'c1', 'c2', 'c3', 'c4', 'd1', 'd2', 'd3'] as const;
    const allRated = ratings.every(key => {
      const value = formData[key];
      return typeof value === 'number' && value > 0;
    });
    
    if (!allRated) {
      alert('Mohon lengkapi semua penilaian');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/validasi/lkpd-konstruk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, signatureData }),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => router.push('/'), 2000);
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

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl p-12 text-center max-w-md">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Berhasil!</h2>
          <p className="text-gray-600 text-lg">
            Data validasi LKPD telah tersimpan. Terima kasih atas kontribusi Anda.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <div className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 text-white py-6 shadow-lg sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <Link href="/" className="inline-flex items-center text-white hover:text-pink-100 transition-colors mb-3">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Kembali ke Beranda
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold">Validasi Konstruk LKPD</h1>
          <p className="text-pink-100 mt-2">Kelengkapan dan Sistematika LKPD Model KESAN</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white rounded-xl shadow-lg p-4">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="bg-pink-500 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3">📄</span>
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
                <h2 className="text-xl font-bold text-gray-800 mb-4">Identitas Validator</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nama Lengkap <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.namaValidator}
                      onChange={(e) => setFormData(prev => ({ ...prev, namaValidator: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Instansi <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.instansi}
                      onChange={(e) => setFormData(prev => ({ ...prev, instansi: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Aspek A */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-3">
                  A. Kelengkapan Komponen LKPD
                </h2>
                <div className="space-y-4">
                  <RatingScale id="a1" label="1. Kelengkapan identitas LKPD (judul, kelas, mata pelajaran)" value={formData.a1} onChange={(value) => handleRatingChange('a1', value)} />
                  <RatingScale id="a2" label="2. Kelengkapan KI, KD, dan indikator" value={formData.a2} onChange={(value) => handleRatingChange('a2', value)} />
                  <RatingScale id="a3" label="3. Kelengkapan tujuan pembelajaran" value={formData.a3} onChange={(value) => handleRatingChange('a3', value)} />
                  <RatingScale id="a4" label="4. Kelengkapan petunjuk penggunaan LKPD" value={formData.a4} onChange={(value) => handleRatingChange('a4', value)} />
                  <RatingScale id="a5" label="5. Kelengkapan alat dan bahan (jika ada kegiatan praktikum)" value={formData.a5} onChange={(value) => handleRatingChange('a5', value)} />
                </div>
              </div>

              {/* Aspek B */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-3">
                  B. Sistematika Penyusunan LKPD
                </h2>
                <div className="space-y-4">
                  <RatingScale id="b1" label="1. Urutan penyajian materi logis dan sistematis" value={formData.b1} onChange={(value) => handleRatingChange('b1', value)} />
                  <RatingScale id="b2" label="2. Alur kegiatan pembelajaran runtut dan jelas" value={formData.b2} onChange={(value) => handleRatingChange('b2', value)} />
                  <RatingScale id="b3" label="3. Keterkaitan antar komponen LKPD" value={formData.b3} onChange={(value) => handleRatingChange('b3', value)} />
                  <RatingScale id="b4" label="4. Konsistensi penggunaan istilah dan simbol" value={formData.b4} onChange={(value) => handleRatingChange('b4', value)} />
                </div>
              </div>

              {/* Aspek C */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-3">
                  C. Kesesuaian dengan Model KESAN
                </h2>
                <div className="space-y-4">
                  <RatingScale id="c1" label="1. Integrasi konten etnosains dalam materi" value={formData.c1} onChange={(value) => handleRatingChange('c1', value)} />
                  <RatingScale id="c2" label="2. Konektivitas antara etnosains dan sains modern" value={formData.c2} onChange={(value) => handleRatingChange('c2', value)} />
                  <RatingScale id="c3" label="3. Sintaks pembelajaran sesuai Model KESAN" value={formData.c3} onChange={(value) => handleRatingChange('c3', value)} />
                  <RatingScale id="c4" label="4. Kesesuaian aktivitas dengan prinsip Model KESAN" value={formData.c4} onChange={(value) => handleRatingChange('c4', value)} />
                </div>
              </div>

              {/* Aspek D */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-3">
                  D. Kejelasan Petunjuk dan Instruksi
                </h2>
                <div className="space-y-4">
                  <RatingScale id="d1" label="1. Kejelasan petunjuk kerja/kegiatan" value={formData.d1} onChange={(value) => handleRatingChange('d1', value)} />
                  <RatingScale id="d2" label="2. Kejelasan pertanyaan/soal dalam LKPD" value={formData.d2} onChange={(value) => handleRatingChange('d2', value)} />
                  <RatingScale id="d3" label="3. Kejelasan ruang jawaban siswa" value={formData.d3} onChange={(value) => handleRatingChange('d3', value)} />
                </div>
              </div>

              {/* Komentar & Saran */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Komentar & Saran</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Komentar</label>
                    <textarea
                      value={formData.komentar}
                      onChange={(e) => setFormData(prev => ({ ...prev, komentar: e.target.value }))}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Saran Perbaikan</label>
                    <textarea
                      value={formData.saran}
                      onChange={(e) => setFormData(prev => ({ ...prev, saran: e.target.value }))}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <SignaturePad value={signatureData} onChange={setSignatureData} />
              </div>

              <div className="flex gap-4">
                <Link href="/" className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-center font-semibold">
                  Batal
                </Link>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-pink-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Mengirim...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Kirim Validasi
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
