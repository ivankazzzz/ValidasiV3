'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Download, RefreshCw, Users, FileText, GraduationCap, BookOpen } from 'lucide-react';
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
}

interface Summary {
  total_isi: number;
  total_konstruk: number;
  total_guru: number;
  total_siswa: number;
  total_all: number;
}

export default function AdminPage() {
  const [data, setData] = useState<AdminData | null>(null);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'isi' | 'konstruk' | 'guru' | 'siswa'>('isi');

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

    const headers = ['No', 'Nama', 'Institusi', 'Keahlian/Kelas', 'Rata-rata', 'Keputusan', 'Tanggal'];
    const rows = items.map((item, idx) => [
      idx + 1,
      item.validator_nama,
      item.validator_institusi,
      item.validator_keahlian || item.validator_kelas || '-',
      calculateAverage(item.ratings),
      item.decision,
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
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tanda Tangan</th>
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
                  <a 
                    href={item.signature_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-800 underline"
                  >
                    Lihat
                  </a>
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
    { id: 'isi' as const, label: 'Validasi Isi', icon: BookOpen, count: summary?.total_isi || 0 },
    { id: 'konstruk' as const, label: 'Validasi Konstruk', icon: FileText, count: summary?.total_konstruk || 0 },
    { id: 'guru' as const, label: 'Praktikalitas Guru', icon: GraduationCap, count: summary?.total_guru || 0 },
    { id: 'siswa' as const, label: 'Praktikalitas Siswa', icon: Users, count: summary?.total_siswa || 0 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-gray-600 hover:text-gray-800 transition-colors">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
                <p className="text-gray-600 mt-1">Data Validasi Instrumen Model KESAN</p>
              </div>
            </div>
            <button
              onClick={fetchData}
              className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-indigo-100 text-sm font-medium">Total Semua</p>
                <p className="text-4xl font-bold mt-2">{summary?.total_all || 0}</p>
              </div>
              <FileText className="w-12 h-12 text-indigo-200 opacity-80" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Validasi Isi</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">{summary?.total_isi || 0}</p>
              </div>
              <BookOpen className="w-10 h-10 text-blue-400" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Validasi Konstruk</p>
                <p className="text-3xl font-bold text-purple-600 mt-2">{summary?.total_konstruk || 0}</p>
              </div>
              <FileText className="w-10 h-10 text-purple-400" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Praktikalitas Guru</p>
                <p className="text-3xl font-bold text-green-600 mt-2">{summary?.total_guru || 0}</p>
              </div>
              <GraduationCap className="w-10 h-10 text-green-400" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Praktikalitas Siswa</p>
                <p className="text-3xl font-bold text-orange-600 mt-2">{summary?.total_siswa || 0}</p>
              </div>
              <Users className="w-10 h-10 text-orange-400" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="flex border-b border-gray-200 overflow-x-auto">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors whitespace-nowrap ${
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

          {/* Table Content */}
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Data {tabs.find(t => t.id === activeTab)?.label}
              </h2>
              <button
                onClick={() => {
                  const currentData = data?.[`validasi_${activeTab === 'guru' ? 'praktikalitas_guru' : activeTab === 'siswa' ? 'praktikalitas_siswa' : activeTab}` as keyof AdminData] || [];
                  exportToCSV(activeTab, currentData);
                }}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Export CSV</span>
              </button>
            </div>
            {data && (
              <>
                {activeTab === 'isi' && renderTable(data.validasi_isi, 'isi')}
                {activeTab === 'konstruk' && renderTable(data.validasi_konstruk, 'konstruk')}
                {activeTab === 'guru' && renderTable(data.validasi_praktikalitas_guru, 'guru')}
                {activeTab === 'siswa' && renderTable(data.validasi_praktikalitas_siswa, 'siswa')}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
