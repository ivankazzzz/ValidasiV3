'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Download, RefreshCw, Users, FileText, GraduationCap, BookOpen, Printer } from 'lucide-react';
import Link from 'next/link';

interface ValidationData {
  id: string;
  validator_nama: string;
  validator_institusi: string;
  validator_keahlian?: string;
  validator_kelas?: string;
  ratings: Record<string, number>;
  decision: string;
  general_comments?: string;
  suggestions?: string;
  created_at: string;
  signature_url: string;
}

interface AdminData {
  validasi_isi: ValidationData[];
  validasi_konstruk: ValidationData[];
  validasi_praktikalitas_guru: ValidationData[];
  validasi_praktikalitas_siswa: ValidationData[];
  validasi_lkpd_isi: ValidationData[];
  validasi_lkpd_konstruk: ValidationData[];
  validasi_lkpd_praktikalitas_guru: ValidationData[];
  validasi_lkpd_praktikalitas_siswa: ValidationData[];
}

interface Summary {
  model: {
    total_isi: number;
    total_konstruk: number;
    total_guru: number;
    total_siswa: number;
    total: number;
  };
  lkpd: {
    total_isi: number;
    total_konstruk: number;
    total_guru: number;
    total_siswa: number;
    total: number;
  };
  grand_total: number;
}

export default function AdminPage() {
  const [data, setData] = useState<AdminData | null>(null);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'isi' | 'konstruk' | 'guru' | 'siswa' | 'lkpd-isi' | 'lkpd-konstruk' | 'lkpd-guru' | 'lkpd-siswa'>('isi');

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/admin/data');
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || errorData.error || 'Failed to fetch data');
      }
      const result = await response.json();
      setData(result.data);
      setSummary(result.summary);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const calculateAverage = (ratings: Record<string, number>): string => {
    if (!ratings || typeof ratings !== 'object') return 'N/A';
    const values = Object.values(ratings).filter((v): v is number => typeof v === 'number');
    if (values.length === 0) return 'N/A';
    const avg = values.reduce((sum, val) => sum + val, 0) / values.length;
    return avg.toFixed(2);
  };

  const getDecisionBadge = (decision: string) => {
    if (!decision) {
      return (
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          N/A
        </span>
      );
    }
    const styles: Record<string, string> = {
      'layak-tanpa-revisi': 'bg-green-100 text-green-800',
      'layak-revisi-kecil': 'bg-blue-100 text-blue-800',
      'layak-revisi-besar': 'bg-yellow-100 text-yellow-800',
      'tidak-layak': 'bg-red-100 text-red-800',
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[decision] || 'bg-gray-100 text-gray-800'}`}>
        {decision.replace(/-/g, ' ').toUpperCase()}
      </span>
    );
  };

  const exportToCSV = (type: string, items: ValidationData[]) => {
    if (items.length === 0) {
      alert('Tidak ada data untuk diekspor');
      return;
    }

    // Get all rating keys from first item to determine columns
    const firstItem = items[0];
    const ratingKeys = Object.keys(firstItem.ratings || {}).sort();
    
    const headers = ['No', 'Nama', 'Institusi', 'Keahlian/Kelas', ...ratingKeys.map(k => k.toUpperCase()), 'Rata-rata', 'Keputusan', 'Komentar', 'Saran', 'Tanggal'];
    const rows = items.map((item, idx) => [
      idx + 1,
      item.validator_nama,
      item.validator_institusi,
      item.validator_keahlian || item.validator_kelas || '-',
      ...ratingKeys.map(key => item.ratings[key] || '-'),
      calculateAverage(item.ratings),
      item.decision || 'N/A',
      item.general_comments || '-',
      item.suggestions || '-',
      new Date(item.created_at).toLocaleDateString('id-ID'),
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `validasi_${type}_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const printValidator = (item: ValidationData, type: string) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    // Define question mappings for each type
    const questionMappings: Record<string, Record<string, string>> = {
      isi: {
        a1: 'Kesesuaian dengan Capaian Pembelajaran (CP)',
        a2: 'Pengembangan Profil Pelajar Pancasila (P3)',
        a3: 'Kesesuaian dengan Kompetensi Esensial',
        b1: 'Kebenaran Konsep',
        b2: 'Ketepatan Terminologi',
        b3: 'Bebas dari Miskonsepsi',
        c1: 'Keakuratan Representasi Budaya',
        c2: 'Penyajian yang Menghargai',
        c3: 'Relevansi dengan Konteks Siswa',
        d1: 'Alami dan Tidak Dipaksakan',
        d2: 'Keseimbangan dan Keadilan Perspektif',
        d3: 'Mendorong Pemahaman Sintetis'
      },
      konstruk: {
        a1: 'Representasi Komponen Model',
        a2: 'Operasionalisasi Indikator',
        b1: 'Relevansi Setiap Item',
        b2: 'Kelengkapan Aspek',
        c1: 'Bahasa Indikator',
        c2: 'Kejelasan Petunjuk',
        c3: 'Kesesuaian Skala',
        d1: 'Struktur Instrumen',
        d2: 'Tata Letak'
      },
      guru: {
        a1: 'Kesesuaian dengan Tujuan',
        a2: 'Representasi Komponen Model',
        b1: 'Bahasa dan Kejelasan',
        b2: 'Kemudahan Pengisian',
        c1: 'Efisiensi Waktu',
        c2: 'Kepraktisan',
        d1: 'Sistematika dan Format',
        d2: 'Kelengkapan Instrumen'
      },
      siswa: {
        a1: 'Kesesuaian dengan Tujuan',
        a2: 'Pengalaman Belajar Siswa',
        b1: 'Bahasa Mudah Dipahami',
        b2: 'Kejelasan Petunjuk',
        c1: 'Kemudahan Pengisian',
        c2: 'Waktu Pengisian',
        d1: 'Format Menarik',
        d2: 'Kelengkapan Aspek'
      }
    };

    const questions = questionMappings[type] || {};
    const ratingKeys = Object.keys(item.ratings || {}).sort();
    
    const ratingsHTML = ratingKeys.map(key => {
      const questionText = questions[key.toLowerCase()] || key.toUpperCase();
      return `<tr>
        <td style="padding: 12px; border: 1px solid #ddd; font-weight: 500;">${key.toUpperCase()}</td>
        <td style="padding: 12px; border: 1px solid #ddd;">${questionText}</td>
        <td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: bold; font-size: 16px; color: #4f46e5;">${item.ratings[key]}</td>
      </tr>`;
    }).join('');

    const typeLabels: Record<string, string> = {
      isi: 'Validasi Isi',
      konstruk: 'Validasi Konstruk',
      guru: 'Praktikalitas Guru',
      siswa: 'Praktikalitas Siswa'
    };

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Laporan Validasi - ${item.validator_nama}</title>
        <meta charset="UTF-8">
        <style>
          @page { margin: 2cm; }
          body { 
            font-family: 'Times New Roman', Times, serif; 
            line-height: 1.6;
            color: #000;
            margin: 0;
            padding: 0;
          }
          .header {
            text-align: center;
            border-bottom: 3px double #000;
            padding-bottom: 15px;
            margin-bottom: 20px;
          }
          .header h1 {
            font-size: 18px;
            font-weight: bold;
            margin: 5px 0;
            text-transform: uppercase;
          }
          .header h2 {
            font-size: 16px;
            font-weight: bold;
            margin: 5px 0;
          }
          .header p {
            font-size: 12px;
            margin: 3px 0;
          }
          .title {
            text-align: center;
            margin: 30px 0 20px 0;
          }
          .title h3 {
            font-size: 16px;
            font-weight: bold;
            text-decoration: underline;
            margin: 0;
          }
          .section {
            margin: 20px 0;
          }
          .section-title {
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 10px;
            text-transform: uppercase;
          }
          .info-table {
            width: 100%;
            margin: 15px 0;
            border: none;
          }
          .info-table td {
            padding: 5px;
            border: none;
          }
          .info-table td:first-child {
            width: 200px;
            font-weight: bold;
          }
          table.rating-table { 
            width: 100%; 
            border-collapse: collapse; 
            margin: 20px 0;
            font-size: 12px;
          }
          table.rating-table th, 
          table.rating-table td { 
            border: 1px solid #000; 
            padding: 10px; 
          }
          table.rating-table th { 
            background-color: #f0f0f0; 
            font-weight: bold;
            text-align: center;
          }
          .avg-row {
            background-color: #f9f9f9;
            font-weight: bold;
            font-size: 14px;
          }
          .decision-box {
            display: inline-block;
            padding: 10px 20px;
            border: 2px solid #000;
            font-weight: bold;
            margin: 10px 0;
            text-transform: uppercase;
          }
          .comment-box {
            border: 1px solid #ccc;
            padding: 15px;
            background: #f9f9f9;
            margin: 10px 0;
            text-align: justify;
          }
          .signature-section {
            margin-top: 40px;
            page-break-inside: avoid;
          }
          .signature-container {
            margin-top: 20px;
            text-align: center;
          }
          .signature-container img {
            max-width: 200px;
            max-height: 100px;
            border: 1px solid #000;
            padding: 5px;
          }
          .footer {
            margin-top: 50px;
            border-top: 1px solid #000;
            padding-top: 15px;
            font-size: 11px;
            text-align: center;
          }
          @media print {
            body { margin: 0; }
            button { display: none; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Instrumen Validasi Model KESAN</h1>
          <h2>(Konektivitas Etnosains-Sains)</h2>
          <p>Peneliti: Irfan Ananda Ismail, S.Pd, M.Pd, Gr.</p>
          <p>Program Studi S3 Pendidikan IPA - Universitas Negeri Padang</p>
        </div>

        <div class="title">
          <h3>LAPORAN HASIL ${typeLabels[type]?.toUpperCase() || type.toUpperCase()}</h3>
        </div>

        <div class="section">
          <div class="section-title">I. Identitas Validator</div>
          <table class="info-table">
            <tr>
              <td>Nama Validator</td>
              <td>: ${item.validator_nama}</td>
            </tr>
            <tr>
              <td>Institusi</td>
              <td>: ${item.validator_institusi}</td>
            </tr>
            <tr>
              <td>${item.validator_keahlian ? 'Bidang Keahlian' : 'Kelas'}</td>
              <td>: ${item.validator_keahlian || item.validator_kelas || '-'}</td>
            </tr>
            <tr>
              <td>Tanggal Validasi</td>
              <td>: ${new Date(item.created_at).toLocaleDateString('id-ID', { 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
              })}</td>
            </tr>
          </table>
        </div>

        <div class="section">
          <div class="section-title">II. Hasil Penilaian</div>
          <table class="rating-table">
            <thead>
              <tr>
                <th style="width: 80px;">Butir</th>
                <th>Aspek yang Dinilai</th>
                <th style="width: 80px;">Skor</th>
              </tr>
            </thead>
            <tbody>
              ${ratingsHTML}
              <tr class="avg-row">
                <td colspan="2" style="text-align: center;">RATA-RATA</td>
                <td style="text-align: center; color: #000; font-size: 16px;">${calculateAverage(item.ratings)}</td>
              </tr>
            </tbody>
          </table>
          <p style="font-size: 11px; font-style: italic; margin-top: 5px;">
            *Skala Penilaian: 1 = Sangat Tidak Baik, 2 = Tidak Baik, 3 = Cukup, 4 = Baik, 5 = Sangat Baik
          </p>
        </div>

        ${item.decision ? `
        <div class="section">
          <div class="section-title">III. Keputusan Validasi</div>
          <div class="decision-box">${item.decision.replace(/-/g, ' ').toUpperCase()}</div>
        </div>
        ` : ''}

        ${item.general_comments ? `
        <div class="section">
          <div class="section-title">IV. Komentar Umum</div>
          <div class="comment-box">${item.general_comments}</div>
        </div>` : ''}
        
        ${item.suggestions ? `
        <div class="section">
          <div class="section-title">V. Saran Perbaikan</div>
          <div class="comment-box">${item.suggestions}</div>
        </div>` : ''}

        <div class="signature-section">
          <div class="section-title">Tanda Tangan Validator</div>
          <div class="signature-container">
            <img src="${item.signature_url}" alt="Tanda Tangan Validator" />
            <p style="margin-top: 10px; font-weight: bold;">${item.validator_nama}</p>
          </div>
        </div>

        <div class="footer">
          <p>Dokumen ini dibuat secara elektronik dan sah tanpa tanda tangan basah.</p>
          <p>Dicetak pada: ${new Date().toLocaleDateString('id-ID', { 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}</p>
        </div>

        <button class="no-print" onclick="window.print()" style="
          position: fixed;
          bottom: 20px;
          right: 20px;
          padding: 15px 30px;
          background: #4f46e5;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 16px;
          font-weight: bold;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        ">🖨️ CETAK DOKUMEN</button>
      </body>
      </html>
    `);
    printWindow.document.close();
  };

  const renderTable = (items: ValidationData[], type: string) => {
    if (items.length === 0) {
      return (
        <div className="text-center py-12 text-gray-500">
          <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>Belum ada data {type}</p>
        </div>
      );
    }

    return (
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">No</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nama Validator</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Institusi</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                {type === 'siswa' ? 'Kelas' : 'Keahlian'}
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Rata-rata</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Keputusan</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tanggal</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item, idx) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{idx + 1}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.validator_nama}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{item.validator_institusi}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                  {item.validator_keahlian || item.validator_kelas || '-'}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-indigo-600">
                  {calculateAverage(item.ratings)}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm">
                  {getDecisionBadge(item.decision)}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                  {new Date(item.created_at).toLocaleDateString('id-ID', { 
                    day: 'numeric', 
                    month: 'short', 
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={() => printValidator(item, type)}
                      className="flex items-center justify-center space-x-1 px-2 md:px-3 py-1.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-xs"
                      title="Cetak Detail"
                    >
                      <Printer className="w-3 h-3 md:w-3.5 md:h-3.5" />
                      <span>Cetak</span>
                    </button>
                    <a 
                      href={item.signature_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center px-2 md:px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-xs"
                      title="Lihat Tanda Tangan"
                    >
                      TTD
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Memuat data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">❌</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
          <p className="text-red-600 mb-6">{error}</p>
          <button
            onClick={fetchData}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'isi' as const, label: 'Model Isi', icon: BookOpen, count: summary?.model.total_isi || 0, category: 'Model KESAN' },
    { id: 'konstruk' as const, label: 'Model Konstruk', icon: FileText, count: summary?.model.total_konstruk || 0, category: 'Model KESAN' },
    { id: 'guru' as const, label: 'Model Praktikalitas Guru', icon: GraduationCap, count: summary?.model.total_guru || 0, category: 'Model KESAN' },
    { id: 'siswa' as const, label: 'Model Praktikalitas Siswa', icon: Users, count: summary?.model.total_siswa || 0, category: 'Model KESAN' },
    { id: 'lkpd-isi' as const, label: 'LKPD Isi', icon: BookOpen, count: summary?.lkpd.total_isi || 0, category: 'LKPD Model KESAN' },
    { id: 'lkpd-konstruk' as const, label: 'LKPD Konstruk', icon: FileText, count: summary?.lkpd.total_konstruk || 0, category: 'LKPD Model KESAN' },
    { id: 'lkpd-guru' as const, label: 'LKPD Praktikalitas Guru', icon: GraduationCap, count: summary?.lkpd.total_guru || 0, category: 'LKPD Model KESAN' },
    { id: 'lkpd-siswa' as const, label: 'LKPD Praktikalitas Siswa', icon: Users, count: summary?.lkpd.total_siswa || 0, category: 'LKPD Model KESAN' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-3 md:space-x-4">
              <Link href="/" className="text-gray-600 hover:text-gray-800 transition-colors">
                <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
              </Link>
              <div>
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800">Admin Dashboard</h1>
                <p className="text-gray-600 mt-1 text-sm md:text-base">Data Validasi Instrumen Model KESAN</p>
              </div>
            </div>
            <button
              onClick={fetchData}
              className="flex items-center space-x-2 px-3 md:px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm md:text-base"
            >
              <RefreshCw className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden sm:inline">Refresh</span>
              <span className="sm:hidden">🔄</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
          <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl shadow-lg p-4 md:p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-indigo-100 text-xs md:text-sm font-medium">Total Semua Data</p>
                <p className="text-3xl md:text-4xl font-bold mt-2">{summary?.grand_total || 0}</p>
              </div>
              <FileText className="w-10 h-10 md:w-12 md:h-12 text-indigo-200 opacity-80" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-4 md:p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-xs md:text-sm font-medium">Total Model KESAN</p>
                <p className="text-3xl md:text-4xl font-bold mt-2">{summary?.model.total || 0}</p>
              </div>
              <BookOpen className="w-10 h-10 md:w-12 md:h-12 text-blue-200 opacity-80" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl shadow-lg p-4 md:p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cyan-100 text-xs md:text-sm font-medium">Total LKPD Model KESAN</p>
                <p className="text-3xl md:text-4xl font-bold mt-2">{summary?.lkpd.total || 0}</p>
              </div>
              <FileText className="w-10 h-10 md:w-12 md:h-12 text-cyan-200 opacity-80" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Model KESAN Section */}
          <div className="border-b border-gray-300 bg-gray-50 px-4 py-2">
            <h3 className="text-sm font-bold text-gray-700 uppercase">Validasi Model KESAN</h3>
          </div>
          <div className="flex border-b border-gray-200 overflow-x-auto scrollbar-hide">
            {tabs.filter(t => t.category === 'Model KESAN').map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 md:px-6 py-3 md:py-4 font-medium transition-colors whitespace-nowrap text-sm md:text-base ${
                    activeTab === tab.id
                      ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                    activeTab === tab.id ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* LKPD Model KESAN Section */}
          <div className="border-b border-gray-300 bg-gray-50 px-4 py-2">
            <h3 className="text-sm font-bold text-gray-700 uppercase">Validasi LKPD Model KESAN</h3>
          </div>
          <div className="flex border-b-2 border-gray-300 overflow-x-auto scrollbar-hide">
            {tabs.filter(t => t.category === 'LKPD Model KESAN').map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 md:px-6 py-3 md:py-4 font-medium transition-colors whitespace-nowrap text-sm md:text-base ${
                    activeTab === tab.id
                      ? 'text-cyan-600 border-b-2 border-cyan-600 bg-cyan-50'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                    activeTab === tab.id ? 'bg-cyan-600 text-white' : 'bg-gray-200 text-gray-700'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Table Content */}
          <div className="p-4 md:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 md:gap-4 mb-4">
              <h2 className="text-lg md:text-xl font-bold text-gray-800">
                Data {tabs.find(t => t.id === activeTab)?.label}
              </h2>
              <button
                onClick={() => {
                  let currentData: ValidationData[] = [];
                  if (activeTab === 'isi') currentData = data?.validasi_isi || [];
                  else if (activeTab === 'konstruk') currentData = data?.validasi_konstruk || [];
                  else if (activeTab === 'guru') currentData = data?.validasi_praktikalitas_guru || [];
                  else if (activeTab === 'siswa') currentData = data?.validasi_praktikalitas_siswa || [];
                  else if (activeTab === 'lkpd-isi') currentData = data?.validasi_lkpd_isi || [];
                  else if (activeTab === 'lkpd-konstruk') currentData = data?.validasi_lkpd_konstruk || [];
                  else if (activeTab === 'lkpd-guru') currentData = data?.validasi_lkpd_praktikalitas_guru || [];
                  else if (activeTab === 'lkpd-siswa') currentData = data?.validasi_lkpd_praktikalitas_siswa || [];
                  exportToCSV(activeTab, currentData);
                }}
                className="flex items-center space-x-2 px-3 md:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm md:text-base w-full sm:w-auto justify-center"
              >
                <Download className="w-3 h-3 md:w-4 md:h-4" />
                <span>Export CSV</span>
              </button>
            </div>
            {data && (
              <>
                {activeTab === 'isi' && renderTable(data.validasi_isi, 'isi')}
                {activeTab === 'konstruk' && renderTable(data.validasi_konstruk, 'konstruk')}
                {activeTab === 'guru' && renderTable(data.validasi_praktikalitas_guru, 'guru')}
                {activeTab === 'siswa' && renderTable(data.validasi_praktikalitas_siswa, 'siswa')}
                {activeTab === 'lkpd-isi' && renderTable(data.validasi_lkpd_isi, 'lkpd-isi')}
                {activeTab === 'lkpd-konstruk' && renderTable(data.validasi_lkpd_konstruk, 'lkpd-konstruk')}
                {activeTab === 'lkpd-guru' && renderTable(data.validasi_lkpd_praktikalitas_guru, 'lkpd-guru')}
                {activeTab === 'lkpd-siswa' && renderTable(data.validasi_lkpd_praktikalitas_siswa, 'lkpd-siswa')}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
