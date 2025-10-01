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

    // Fetch all validation data from 4 tables
    const [isiData, konstrukData, guruData, siswaData] = await Promise.all([
      supabaseAdmin.from('validasi_isi').select('*').order('created_at', { ascending: false }),
      supabaseAdmin.from('validasi_konstruk').select('*').order('created_at', { ascending: false }),
      supabaseAdmin.from('validasi_praktikalitas_guru').select('*').order('created_at', { ascending: false }),
      supabaseAdmin.from('validasi_praktikalitas_siswa').select('*').order('created_at', { ascending: false }),
    ]);

    // Check for errors
    if (isiData.error) {
      console.error('Error fetching isi data:', isiData.error);
      return NextResponse.json({ error: 'Failed to fetch isi data', details: isiData.error.message }, { status: 500 });
    }
    if (konstrukData.error) {
      console.error('Error fetching konstruk data:', konstrukData.error);
      return NextResponse.json({ error: 'Failed to fetch konstruk data', details: konstrukData.error.message }, { status: 500 });
    }
    if (guruData.error) {
      console.error('Error fetching guru data:', guruData.error);
      return NextResponse.json({ error: 'Failed to fetch guru data', details: guruData.error.message }, { status: 500 });
    }
    if (siswaData.error) {
      console.error('Error fetching siswa data:', siswaData.error);
      return NextResponse.json({ error: 'Failed to fetch siswa data', details: siswaData.error.message }, { status: 500 });
    }

    // Return combined data
    return NextResponse.json({
      success: true,
      data: {
        validasi_isi: isiData.data || [],
        validasi_konstruk: konstrukData.data || [],
        validasi_praktikalitas_guru: guruData.data || [],
        validasi_praktikalitas_siswa: siswaData.data || [],
      },
      summary: {
        total_isi: isiData.data?.length || 0,
        total_konstruk: konstrukData.data?.length || 0,
        total_guru: guruData.data?.length || 0,
        total_siswa: siswaData.data?.length || 0,
        total_all: (isiData.data?.length || 0) + (konstrukData.data?.length || 0) + 
                   (guruData.data?.length || 0) + (siswaData.data?.length || 0),
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
