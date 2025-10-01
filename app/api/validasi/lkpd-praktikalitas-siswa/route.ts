import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      namaSiswa, kelas, sekolah,
      a1, a2, a3, a4,
      b1, b2, b3,
      c1, c2, c3,
      d1, d2, d3,
      komentar, saran,
    } = body;

    if (!namaSiswa || !kelas || !sekolah) {
      return NextResponse.json({ error: 'Nama, kelas, dan sekolah wajib diisi' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('validasi_lkpd_praktikalitas_siswa')
      .insert([{
        nama_siswa: namaSiswa, kelas, sekolah,
        a1, a2, a3, a4, b1, b2, b3,
        c1, c2, c3, d1, d2, d3,
        komentar, saran,
      }])
      .select();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: 'Gagal menyimpan data', details: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Penilaian berhasil disimpan', data: data[0] });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 });
  }
}
