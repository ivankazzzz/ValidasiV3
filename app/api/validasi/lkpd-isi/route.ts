import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      namaValidator,
      instansi,
      a1, a2, a3, a4,
      b1, b2, b3, b4,
      c1, c2, c3,
      d1, d2, d3,
      komentar,
      saran,
      signatureData,
    } = body;

    // Validasi required fields
    if (!namaValidator || !instansi) {
      return NextResponse.json(
        { error: 'Nama validator dan instansi wajib diisi' },
        { status: 400 }
      );
    }

    // Upload signature ke Supabase Storage
    let signatureUrl = null;
    if (signatureData) {
      const base64Data = signatureData.replace(/^data:image\/\w+;base64,/, '');
      const buffer = Buffer.from(base64Data, 'base64');
      const fileName = `lkpd-isi-${Date.now()}.png`;

      const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
        .from('signatures')
        .upload(fileName, buffer, {
          contentType: 'image/png',
          cacheControl: '3600',
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        return NextResponse.json(
          { error: 'Gagal upload tanda tangan' },
          { status: 500 }
        );
      }

      const { data: { publicUrl } } = supabaseAdmin.storage
        .from('signatures')
        .getPublicUrl(fileName);

      signatureUrl = publicUrl;
    }

    // Insert ke database
    const { data, error } = await supabaseAdmin
      .from('validasi_lkpd_isi')
      .insert([
        {
          nama_validator: namaValidator,
          instansi,
          a1, a2, a3, a4,
          b1, b2, b3, b4,
          c1, c2, c3,
          d1, d2, d3,
          komentar,
          saran,
          signature_url: signatureUrl,
        },
      ])
      .select();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Gagal menyimpan data ke database', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Validasi berhasil disimpan',
      data: data[0],
    });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    );
  }
}
