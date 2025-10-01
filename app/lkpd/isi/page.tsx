'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Send, Loader2 } from 'lucide-react';
import Link from 'next/link';
import RatingScale from '@/components/RatingScale';
import SignaturePad from '@/components/SignaturePad';

export default function ValidasiIsiLKPDPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signatureData, setSignatureData] = useState<string>('');

  const [formData, setFormData] = useState({
    namaValidator: '',
    instansi: '',
    // Aspek A: Kesesuaian Materi dengan KD
    a1: 0,
    a2: 0,
    a3: 0,
    a4: 0,
    // Aspek B: Keakuratan Materi
    b1: 0,
    b2: 0,
    b3: 0,
    b4: 0,
    // Aspek C: Kemutakhiran Materi
    c1: 0,
    c2: 0,
    c3: 0,
    // Aspek D: Mendorong Keingintahuan
    d1: 0,
    d2: 0,
    d3: 0,
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

    // Validasi semua rating sudah diisi
    const ratings = ['a1', 'a2', 'a3', 'a4', 'b1', 'b2', 'b3', 'b4', 'c1', 'c2', 'c3', 'd1', 'd2', 'd3'];
    const allRated = ratings.every(key => formData[key as keyof typeof formData] > 0);
    
    if (!allRated) {
      alert('Mohon lengkapi semua penilaian');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/validasi/lkpd-isi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          signatureData,
        }),
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
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 text-white py-6 shadow-lg sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <Link 
            href="/" 
            className="inline-flex items-center text-white hover:text-cyan-100 transition-colors mb-3"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Kembali ke Beranda
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold">Validasi Isi LKPD</h1>
          <p className="text-cyan-100 mt-2">Lembar Kerja Peserta Didik Model KESAN</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* PDF Viewer */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white rounded-xl shadow-lg p-4">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="bg-cyan-500 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3">📄</span>
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
              <p className="text-sm text-gray-500 mt-3 text-center">
                Scroll untuk melihat seluruh isi LKPD
              </p>
            </div>
          </div>

          {/* Form */}
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      placeholder="Contoh: Dr. Ahmad Budiman, M.Pd"
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      placeholder="Contoh: Universitas Negeri Padang"
                    />
                  </div>
                </div>
              </div>

              {/* Aspek A */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-3">
                  A. Kesesuaian Materi dengan KD
                </h2>
                <div className="space-y-4">
                  <RatingScale
                    id="a1"
                    label="1. Kesesuaian materi dengan KI dan KD"
                    value={formData.a1}
                    onChange={(value) => handleRatingChange('a1', value)}
                  />
                  <RatingScale
                    id="a2"
                    label="2. Kesesuaian materi dengan indikator pembelajaran"
                    value={formData.a2}
                    onChange={(value) => handleRatingChange('a2', value)}
                  />
                  <RatingScale
                    id="a3"
                    label="3. Kesesuaian materi dengan tujuan pembelajaran"
                    value={formData.a3}
                    onChange={(value) => handleRatingChange('a3', value)}
                  />
                  <RatingScale
                    id="a4"
                    label="4. Kelengkapan cakupan materi sesuai KD"
                    value={formData.a4}
                    onChange={(value) => handleRatingChange('a4', value)}
                  />
                </div>
              </div>

              {/* Aspek B */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-3">
                  B. Keakuratan Materi
                </h2>
                <div className="space-y-4">
                  <RatingScale
                    id="b1"
                    label="1. Keakuratan konsep dan definisi"
                    value={formData.b1}
                    onChange={(value) => handleRatingChange('b1', value)}
                  />
                  <RatingScale
                    id="b2"
                    label="2. Keakuratan fakta dan data"
                    value={formData.b2}
                    onChange={(value) => handleRatingChange('b2', value)}
                  />
                  <RatingScale
                    id="b3"
                    label="3. Keakuratan contoh dan kasus"
                    value={formData.b3}
                    onChange={(value) => handleRatingChange('b3', value)}
                  />
                  <RatingScale
                    id="b4"
                    label="4. Keakuratan gambar, diagram, dan ilustrasi"
                    value={formData.b4}
                    onChange={(value) => handleRatingChange('b4', value)}
                  />
                </div>
              </div>

              {/* Aspek C */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-3">
                  C. Kemutakhiran Materi
                </h2>
                <div className="space-y-4">
                  <RatingScale
                    id="c1"
                    label="1. Kesesuaian materi dengan perkembangan ilmu"
                    value={formData.c1}
                    onChange={(value) => handleRatingChange('c1', value)}
                  />
                  <RatingScale
                    id="c2"
                    label="2. Penggunaan contoh dan kasus terkini"
                    value={formData.c2}
                    onChange={(value) => handleRatingChange('c2', value)}
                  />
                  <RatingScale
                    id="c3"
                    label="3. Integrasi dengan isu-isu kontemporer"
                    value={formData.c3}
                    onChange={(value) => handleRatingChange('c3', value)}
                  />
                </div>
              </div>

              {/* Aspek D */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-3">
                  D. Mendorong Keingintahuan
                </h2>
                <div className="space-y-4">
                  <RatingScale
                    id="d1"
                    label="1. Mendorong siswa untuk mencari informasi lebih lanjut"
                    value={formData.d1}
                    onChange={(value) => handleRatingChange('d1', value)}
                  />
                  <RatingScale
                    id="d2"
                    label="2. Menyajikan tantangan intelektual yang sesuai"
                    value={formData.d2}
                    onChange={(value) => handleRatingChange('d2', value)}
                  />
                  <RatingScale
                    id="d3"
                    label="3. Memotivasi siswa untuk bertanya dan berdiskusi"
                    value={formData.d3}
                    onChange={(value) => handleRatingChange('d3', value)}
                  />
                </div>
              </div>

              {/* Komentar & Saran */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Komentar & Saran</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Komentar
                    </label>
                    <textarea
                      value={formData.komentar}
                      onChange={(e) => setFormData(prev => ({ ...prev, komentar: e.target.value }))}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      placeholder="Tuliskan komentar Anda tentang LKPD ini..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Saran Perbaikan
                    </label>
                    <textarea
                      value={formData.saran}
                      onChange={(e) => setFormData(prev => ({ ...prev, saran: e.target.value }))}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      placeholder="Tuliskan saran perbaikan untuk LKPD ini..."
                    />
                  </div>
                </div>
              </div>

              {/* Signature */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <SignaturePad value={signatureData} onChange={setSignatureData} />
              </div>

              {/* Submit Button */}
              <div className="flex gap-4">
                <Link
                  href="/"
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-center font-semibold"
                >
                  Batal
                </Link>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-cyan-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold flex items-center justify-center"
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
