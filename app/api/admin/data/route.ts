import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  try {
    // Validate environment variables
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error('Missing Supabase environment variables');
      return NextResponse.json({ 
        error: 'Server configuration error: Missing Supabase credentials' 
      }, { status: 500 });
    }

    // Fetch all validation data from 8 tables (4 Model + 4 LKPD)
    const [isiData, konstrukData, guruData, siswaData, lkpdIsiData, lkpdKonstrukData, lkpdGuruData, lkpdSiswaData] = await Promise.all([
      supabaseAdmin.from('validasi_isi').select('*').order('created_at', { ascending: false }),
      supabaseAdmin.from('validasi_konstruk').select('*').order('created_at', { ascending: false }),
      supabaseAdmin.from('validasi_praktikalitas_guru').select('*').order('created_at', { ascending: false }),
      supabaseAdmin.from('validasi_praktikalitas_siswa').select('*').order('created_at', { ascending: false }),
      supabaseAdmin.from('validasi_lkpd_isi').select('*').order('created_at', { ascending: false }),
      supabaseAdmin.from('validasi_lkpd_konstruk').select('*').order('created_at', { ascending: false }),
      supabaseAdmin.from('validasi_lkpd_praktikalitas_guru').select('*').order('created_at', { ascending: false }),
      supabaseAdmin.from('validasi_lkpd_praktikalitas_siswa').select('*').order('created_at', { ascending: false }),
    ]);

    // Check for errors
    const errorChecks = [
      { data: isiData, name: 'isi' },
      { data: konstrukData, name: 'konstruk' },
      { data: guruData, name: 'guru' },
      { data: siswaData, name: 'siswa' },
      { data: lkpdIsiData, name: 'lkpd_isi' },
      { data: lkpdKonstrukData, name: 'lkpd_konstruk' },
      { data: lkpdGuruData, name: 'lkpd_guru' },
      { data: lkpdSiswaData, name: 'lkpd_siswa' },
    ];

    for (const { data, name } of errorChecks) {
      if (data.error) {
        console.error(`Error fetching ${name} data:`, data.error);
        return NextResponse.json({ error: `Failed to fetch ${name} data`, details: data.error.message }, { status: 500 });
      }
    }

    // Return combined data
    return NextResponse.json({
      success: true,
      data: {
        validasi_isi: isiData.data || [],
        validasi_konstruk: konstrukData.data || [],
        validasi_praktikalitas_guru: guruData.data || [],
        validasi_praktikalitas_siswa: siswaData.data || [],
        validasi_lkpd_isi: lkpdIsiData.data || [],
        validasi_lkpd_konstruk: lkpdKonstrukData.data || [],
        validasi_lkpd_praktikalitas_guru: lkpdGuruData.data || [],
        validasi_lkpd_praktikalitas_siswa: lkpdSiswaData.data || [],
      },
      summary: {
        model: {
          total_isi: isiData.data?.length || 0,
          total_konstruk: konstrukData.data?.length || 0,
          total_guru: guruData.data?.length || 0,
          total_siswa: siswaData.data?.length || 0,
          total: (isiData.data?.length || 0) + (konstrukData.data?.length || 0) + 
                 (guruData.data?.length || 0) + (siswaData.data?.length || 0),
        },
        lkpd: {
          total_isi: lkpdIsiData.data?.length || 0,
          total_konstruk: lkpdKonstrukData.data?.length || 0,
          total_guru: lkpdGuruData.data?.length || 0,
          total_siswa: lkpdSiswaData.data?.length || 0,
          total: (lkpdIsiData.data?.length || 0) + (lkpdKonstrukData.data?.length || 0) + 
                 (lkpdGuruData.data?.length || 0) + (lkpdSiswaData.data?.length || 0),
        },
        grand_total: (isiData.data?.length || 0) + (konstrukData.data?.length || 0) + 
                     (guruData.data?.length || 0) + (siswaData.data?.length || 0) +
                     (lkpdIsiData.data?.length || 0) + (lkpdKonstrukData.data?.length || 0) + 
                     (lkpdGuruData.data?.length || 0) + (lkpdSiswaData.data?.length || 0),
      }
    });
  } catch (error) {
    console.error('Error in admin API:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ 
      error: 'Internal server error', 
      details: errorMessage 
    }, { status: 500 });
  }
}
