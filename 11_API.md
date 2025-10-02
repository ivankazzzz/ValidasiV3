# Bab 11: API dan Integrasi Eksternal

## Pendahuluan

API (Application Programming Interface) adalah jembatan komunikasi antara frontend dan backend dalam Sistem Validasi Instrumen Model KESAN. Sistem ini menggunakan Next.js API Routes untuk menyediakan endpoints RESTful yang menangani operasi CRUD dan logika bisnis. Bab ini akan mendokumentasikan semua API endpoints, parameter request/response, dan contoh penggunaannya.

## Arsitektur API

```mermaid
graph TD
    A[Frontend Application] --> B[Next.js API Routes]
    B --> C[Validation Layer]
    C --> D[Business Logic]
    D --> E[Supabase Client]
    E --> F[PostgreSQL Database]
    E --> G[Supabase Storage]
    
    subgraph "API Routes"
        H[/api/validasi/isi]
        I[/api/validasi/konstruk]
        J[/api/validasi/praktikalitas-guru]
        K[/api/validasi/praktikalitas-siswa]
        L[/api/admin/data]
        M[/api/debug]
    end
    
    B --> H
    B --> I
    B --> J
    B --> K
    B --> L
    B --> M
```

## 11.1 API Validasi Isi

### 11.1.1 Endpoint: POST /api/validasi/isi

Menyimpan data validasi instrumen isi baru.

#### Request

**URL**: `POST /api/validasi/isi`

**Headers**:
```
Content-Type: application/json
```

**Body**:
```json
{
  "nama": "Dr. Budi Santoso, M.Pd.",
  "institusi": "Universitas Negeri Padang",
  "keahlian": "Evaluasi Pendidikan",
  "a1": 5,
  "a2": 4,
  "b1": 4,
  "b2": 5,
  "c1": 4,
  "c2": 5,
  "c3": 4,
  "d1": 5,
  "d2": 4,
  "comments": "Instrumen sudah cukup baik dan komprehensif.",
  "suggestions": "Perlu sedikit penyesuaian pada bagian C.",
  "decision": "layak-revisi-kecil",
  "signature": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
}
```

#### Response

**Success Response (200 OK)**:
```json
{
  "success": true,
  "data": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "validator_nama": "Dr. Budi Santoso, M.Pd.",
      "validator_institusi": "Universitas Negeri Padang",
      "validator_keahlian": "Evaluasi Pendidikan",
      "validator_tanggal": null,
      "ratings": {
        "a1": 5,
        "a2": 4,
        "b1": 4,
        "b2": 5,
        "c1": 4,
        "c2": 5,
        "c3": 4,
        "d1": 5,
        "d2": 4
      },
      "general_comments": "Instrumen sudah cukup baik dan komprehensif.",
      "suggestions": "Perlu sedikit penyesuaian pada bagian C.",
      "decision": "layak-revisi-kecil",
      "signature_url": "https://lkuksddrbsoutwboyhon.supabase.co/storage/v1/object/signatures/signature-1234567890.png",
      "created_at": "2025-01-15T10:30:00.000Z",
      "updated_at": "2025-01-15T10:30:00.000Z"
    }
  ]
}
```

**Error Response (400 Bad Request)**:
```json
{
  "error": "Validation failed",
  "details": "Missing required field: nama"
}
```

**Error Response (500 Internal Server Error)**:
```json
{
  "error": "Failed to upload signature",
  "details": "Storage quota exceeded"
}
```

#### Implementation

```typescript
// app/api/validasi/isi/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    // Validate environment variables
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error('Missing Supabase environment variables');
      return NextResponse.json({ 
        error: 'Server configuration error: Missing Supabase credentials' 
      }, { status: 500 });
    }

    const data = await request.json();
    console.log('Received validation data for:', data.nama);
    
    // Validate required fields
    if (!data.nama || !data.institusi || !data.keahlian) {
      return NextResponse.json({ 
        error: 'Validation failed', 
        details: 'Missing required fields: nama, institusi, keahlian' 
      }, { status: 400 });
    }
    
    // Validate ratings
    const ratingFields = ['a1', 'a2', 'b1', 'b2', 'c1', 'c2', 'c3', 'd1', 'd2'];
    for (const field of ratingFields) {
      if (!data[field] || data[field] < 1 || data[field] > 5) {
        return NextResponse.json({ 
          error: 'Validation failed', 
          details: `Invalid rating for field: ${field}` 
        }, { status: 400 });
      }
    }
    
    // Validate decision
    const validDecisions = ['tidak-layak', 'layak-revisi-besar', 'layak-revisi-kecil', 'layak-tanpa-revisi'];
    if (!validDecisions.includes(data.decision)) {
      return NextResponse.json({ 
        error: 'Validation failed', 
        details: `Invalid decision: ${data.decision}` 
      }, { status: 400 });
    }
    
    // Upload signature to Supabase Storage
    const signatureBlob = await fetch(data.signature).then(r => r.blob());
    const fileName = `signature-${Date.now()}.png`;
    
    const { error: uploadError } = await supabase.storage
      .from('signatures')
      .upload(fileName, signatureBlob, {
        contentType: 'image/png',
        cacheControl: '3600',
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return NextResponse.json({ 
        error: 'Failed to upload signature', 
        details: uploadError.message 
      }, { status: 500 });
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('signatures')
      .getPublicUrl(fileName);

    // Save validation data
    const { data: validationData, error: dbError } = await supabase
      .from('validasi_isi')
      .insert([
        {
          validator_nama: data.nama,
          validator_institusi: data.institusi,
          validator_keahlian: data.keahlian,
          ratings: {
            a1: data.a1,
            a2: data.a2,
            b1: data.b1,
            b2: data.b2,
            c1: data.c1,
            c2: data.c2,
            c3: data.c3,
            d1: data.d1,
            d2: data.d2,
          },
          general_comments: data.comments,
          suggestions: data.suggestions,
          decision: data.decision,
          signature_url: publicUrl,
        }
      ])
      .select();

    if (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json({ 
        error: 'Failed to save data', 
        details: dbError.message 
      }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: validationData });
  } catch (error) {
    console.error('Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ 
      error: 'Internal server error', 
      details: errorMessage 
    }, { status: 500 });
  }
}
```

## 11.2 API Validasi Konstruk

### 11.2.1 Endpoint: POST /api/validasi/konstruk

Menyimpan data validasi instrumen konstruk baru.

#### Request

**URL**: `POST /api/validasi/konstruk`

**Headers**:
```
Content-Type: application/json
```

**Body**:
```json
{
  "nama": "Prof. Siti Aminah, M.Pd., Ph.D.",
  "institusi": "Universitas Indonesia",
  "keahlian": "Pembelajaran IPA",
  "a1": 5,
  "a2": 5,
  "b1": 4,
  "b2": 4,
  "c1": 5,
  "c2": 4,
  "c3": 5,
  "d1": 4,
  "d2": 5,
  "comments": "Konstruk instrumen sudah sangat baik.",
  "suggestions": "Tidak ada saran perbaikan.",
  "decision": "layak-tanpa-revisi",
  "signature": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
}
```

#### Response

Struktur response sama dengan API validasi isi, tetapi data disimpan di tabel `validasi_konstruk`.

## 11.3 API Validasi Praktikalitas

### 11.3.1 Endpoint: POST /api/validasi/praktikalitas-guru

Menyimpan data validasi praktikalitas dari perspektif guru.

#### Request

**URL**: `POST /api/validasi/praktikalitas-guru`

**Headers**:
```
Content-Type: application/json
```

**Body**:
```json
{
  "nama": "Drs. Ahmad Wijaya, M.Pd.",
  "institusi": "SMA Negeri 1 Padang",
  "keahlian": "Pendidikan Fisika",
  "a1": 4,
  "a2": 4,
  "a3": 5,
  "a4": 4,
  "a5": 5,
  "b1": 4,
  "b2": 4,
  "b3": 5,
  "b4": 4,
  "b5": 5,
  "comments": "Instrumen praktikalitas mudah digunakan.",
  "suggestions": "Perlu sedikit penyesuaian pada petunjuk.",
  "decision": "layak-revisi-kecil",
  "signature": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
}
```

### 11.3.2 Endpoint: POST /api/validasi/praktikalitas-siswa

Menyimpan data validasi praktikalitas dari perspektif siswa.

#### Request

**URL**: `POST /api/validasi/praktikalitas-siswa`

**Headers**:
```
Content-Type: application/json
```

**Body**:
```json
{
  "nama": "Rina Permata Sari, S.Pd.",
  "institusi": "SMP Negeri 2 Jakarta",
  "keahlian": "Pendidikan Biologi",
  "a1": 4,
  "a2": 5,
  "a3": 4,
  "a4": 5,
  "a5": 4,
  "b1": 5,
  "b2": 4,
  "b3": 5,
  "b4": 4,
  "b5": 5,
  "comments": "Instrumen menarik dan mudah dipahami siswa.",
  "suggestions": "Tidak ada saran perbaikan.",
  "decision": "layak-tanpa-revisi",
  "signature": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
}
```

## 11.4 API Validasi LKPD

### 11.4.1 Endpoint: POST /api/validasi/lkpd-isi

Menyimpan data validasi LKPD isi.

#### Request

**URL**: `POST /api/validasi/lkpd-isi`

**Headers**:
```
Content-Type: application/json
```

**Body**:
```json
{
  "nama": "Dr. Hendra Kusuma, M.Pd.",
  "institusi": "Universitas Negeri Jakarta",
  "keahlian": "Kurikulum IPA",
  "a1": 5,
  "a2": 4,
  "a3": 5,
  "a4": 4,
  "a5": 5,
  "b1": 4,
  "b2": 5,
  "b3": 4,
  "b4": 5,
  "b5": 4,
  "comments": "LKPD sudah sesuai dengan KD.",
  "suggestions": "Perlu tambahan contoh kasus.",
  "decision": "layak-revisi-kecil",
  "signature": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
}
```

### 11.4.2 Endpoint: POST /api/validasi/lkpd-konstruk

Menyimpan data validasi LKPD konstruk.

### 11.4.3 Endpoint: POST /api/validasi/lkpd-praktikalitas-guru

Menyimpan data validasi praktikalitas LKPD dari perspektif guru.

### 11.4.4 Endpoint: POST /api/validasi/lkpd-praktikalitas-siswa

Menyimpan data validasi praktikalitas LKPD dari perspektif siswa.

## 11.5 API Admin

### 11.5.1 Endpoint: GET /api/admin/data

Mengambil data validasi untuk admin.

#### Request

**URL**: `GET /api/admin/data?table=validasi_isi`

**Query Parameters**:
- `table` (required): Nama tabel yang akan diambil
  - `validasi_isi`
  - `validasi_konstruk`
  - `validasi_praktikalitas_guru`
  - `validasi_praktikalitas_siswa`
- `limit` (optional): Jumlah data yang diambil (default: 50)
- `offset` (optional): Offset untuk pagination (default: 0)

#### Response

**Success Response (200 OK)**:
```json
{
  "data": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "validator_nama": "Dr. Budi Santoso, M.Pd.",
      "validator_institusi": "Universitas Negeri Padang",
      "validator_keahlian": "Evaluasi Pendidikan",
      "validator_tanggal": null,
      "ratings": {
        "a1": 5,
        "a2": 4,
        "b1": 4,
        "b2": 5,
        "c1": 4,
        "c2": 5,
        "c3": 4,
        "d1": 5,
        "d2": 4
      },
      "general_comments": "Instrumen sudah cukup baik dan komprehensif.",
      "suggestions": "Perlu sedikit penyesuaian pada bagian C.",
      "decision": "layak-revisi-kecil",
      "signature_url": "https://lkuksddrbsoutwboyhon.supabase.co/storage/v1/object/signatures/signature-1234567890.png",
      "created_at": "2025-01-15T10:30:00.000Z",
      "updated_at": "2025-01-15T10:30:00.000Z"
    }
  ]
}
```

**Error Response (400 Bad Request)**:
```json
{
  "error": "Invalid table",
  "details": "Table 'invalid_table' does not exist"
}
```

#### Implementation

```typescript
// app/api/admin/data/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const table = searchParams.get('table');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    
    if (!table) {
      return NextResponse.json({ error: 'Missing table parameter' }, { status: 400 });
    }
    
    let query;
    
    switch (table) {
      case 'validasi_isi':
        query = supabaseAdmin
          .from('validasi_isi')
          .select('*')
          .order('created_at', { ascending: false })
          .range(offset, offset + limit - 1);
        break;
      case 'validasi_konstruk':
        query = supabaseAdmin
          .from('validasi_konstruk')
          .select('*')
          .order('created_at', { ascending: false })
          .range(offset, offset + limit - 1);
        break;
      case 'validasi_praktikalitas_guru':
        query = supabaseAdmin
          .from('validasi_praktikalitas_guru')
          .select('*')
          .order('created_at', { ascending: false })
          .range(offset, offset + limit - 1);
        break;
      case 'validasi_praktikalitas_siswa':
        query = supabaseAdmin
          .from('validasi_praktikalitas_siswa')
          .select('*')
          .order('created_at', { ascending: false })
          .range(offset, offset + limit - 1);
        break;
      default:
        return NextResponse.json({ error: 'Invalid table' }, { status: 400 });
    }
    
    const { data, error } = await query;
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ 
      error: 'Internal server error', 
      details: error.message 
    }, { status: 500 });
  }
}
```

## 11.6 API Debug

### 11.6.1 Endpoint: GET /api/debug

Endpoint untuk debugging dan testing koneksi database.

#### Request

**URL**: `GET /api/debug`

#### Response

**Success Response (200 OK)**:
```json
{
  "status": "success",
  "timestamp": "2025-01-15T10:30:00.000Z",
  "environment": "development",
  "database": {
    "connected": true,
    "tables": {
      "validasi_isi": 15,
      "validasi_konstruk": 12,
      "validasi_praktikalitas_guru": 8,
      "validasi_praktikalitas_siswa": 10
    }
  },
  "storage": {
    "connected": true,
    "bucket": "signatures",
    "files": 45
  }
}
```

#### Implementation

```typescript
// app/api/debug/route.ts
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  try {
    // Test database connection
    const { data: isiData, error: isiError } = await supabaseAdmin
      .from('validasi_isi')
      .select('id', { count: 'exact' });
    
    const { data: konstrukData, error: konstrukError } = await supabaseAdmin
      .from('validasi_konstruk')
      .select('id', { count: 'exact' });
    
    const { data: guruData, error: guruError } = await supabaseAdmin
      .from('validasi_praktikalitas_guru')
      .select('id', { count: 'exact' });
    
    const { data: siswaData, error: siswaError } = await supabaseAdmin
      .from('validasi_praktikalitas_siswa')
      .select('id', { count: 'exact' });
    
    // Test storage connection
    const { data: files, error: storageError } = await supabaseAdmin
      .storage
      .from('signatures')
      .list('', { limit: 100 });
    
    return NextResponse.json({
      status: 'success',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      database: {
        connected: !isiError && !konstrukError && !guruError && !siswaError,
        tables: {
          validasi_isi: isiData?.length || 0,
          validasi_konstruk: konstrukData?.length || 0,
          validasi_praktikalitas_guru: guruData?.length || 0,
          validasi_praktikalitas_siswa: siswaData?.length || 0
        }
      },
      storage: {
        connected: !storageError,
        bucket: 'signatures',
        files: files?.length || 0
      }
    });
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      error: error.message
    }, { status: 500 });
  }
}
```

## 11.7 Integrasi dengan Supabase

### 11.7.1 Supabase Client Configuration

```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side client with service role
export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
```

### 11.7.2 Error Handling

Semua API routes menggunakan error handling yang konsisten:

```typescript
try {
  // API logic
  return NextResponse.json({ success: true, data });
} catch (error) {
  console.error('API Error:', error);
  const errorMessage = error instanceof Error ? error.message : 'Unknown error';
  return NextResponse.json({ 
    error: 'Internal server error', 
    details: errorMessage 
  }, { status: 500 });
}
```

### 11.7.3 Input Validation

Validasi input di API routes:

```typescript
// Validate required fields
if (!data.nama || !data.institusi || !data.keahlian) {
  return NextResponse.json({ 
    error: 'Validation failed', 
    details: 'Missing required fields' 
  }, { status: 400 });
}

// Validate ratings
const ratingFields = ['a1', 'a2', 'b1', 'b2', 'c1', 'c2', 'c3', 'd1', 'd2'];
for (const field of ratingFields) {
  if (!data[field] || data[field] < 1 || data[field] > 5) {
    return NextResponse.json({ 
      error: 'Validation failed', 
      details: `Invalid rating for field: ${field}` 
    }, { status: 400 });
  }
}
```

## 11.8 Best Practices untuk API

### 11.8.1 Security

1. **Input Validation**: Selalu validasi input di server-side
2. **Error Handling**: Jangan expose sensitive information di error messages
3. **Rate Limiting**: Implement rate limiting untuk mencegah abuse
4. **CORS**: Konfigurasi CORS dengan benar

### 11.8.2 Performance

1. **Database Indexing**: Gunakan indexes untuk query yang sering digunakan
2. **Pagination**: Implement pagination untuk data yang besar
3. **Caching**: Cache response yang sering diakses
4. **Connection Pooling**: Gunakan connection pooling untuk database

### 11.8.3 Documentation

1. **OpenAPI/Swagger**: Dokumentasikan API dengan OpenAPI
2. **Error Codes**: Gunakan error codes yang konsisten
3. **Versioning**: Version API untuk backward compatibility
4. **Examples**: Sediakan contoh request/response

## 11.9 Testing API

### 11.9.1 Manual Testing dengan curl

```bash
# Test POST /api/validasi/isi
curl -X POST http://localhost:3000/api/validasi/isi \
  -H "Content-Type: application/json" \
  -d '{
    "nama": "Test User",
    "institusi": "Test Institution",
    "keahlian": "Test Expertise",
    "a1": 5,
    "a2": 4,
    "b1": 4,
    "b2": 5,
    "c1": 4,
    "c2": 5,
    "c3": 4,
    "d1": 5,
    "d2": 4,
    "comments": "Test comments",
    "suggestions": "Test suggestions",
    "decision": "layak-revisi-kecil",
    "signature": "data:image/png;base64,test"
  }'
```

### 11.9.2 Automated Testing

Implementasi automated testing untuk API:

```typescript
// tests/api/validasi-isi.test.ts
import { POST } from '@/app/api/validasi/isi/route';
import { NextRequest } from 'next/server';

describe('/api/validasi/isi', () => {
  it('should save validation data', async () => {
    const request = new NextRequest('http://localhost:3000/api/validasi/isi', {
      method: 'POST',
      body: JSON.stringify({
        nama: 'Test User',
        institusi: 'Test Institution',
        keahlian: 'Test Expertise',
        a1: 5,
        a2: 4,
        b1: 4,
        b2: 5,
        c1: 4,
        c2: 5,
        c3: 4,
        d1: 5,
        d2: 4,
        comments: 'Test comments',
        suggestions: 'Test suggestions',
        decision: 'layak-revisi-kecil',
        signature: 'data:image/png;base64,test'
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
  });
});
```

## Rangkuman

API dalam Sistem Validasi Instrumen Model KESAN dirancang dengan prinsip RESTful yang jelas, dengan validasi input yang ketat dan error handling yang konsisten. Setiap endpoint memiliki tanggung jawab spesifik untuk menyimpan atau mengambil data validasi. Integrasi dengan Supabase menyediakan backend yang scalable dan aman, sementara dokumentasi API yang lengkap memudahkan pengembang dalam mengintegrasikan atau memperluas fungsionalitas sistem.

Pada bab berikutnya, kita akan membahas tentang logika bisnis yang diimplementasikan dalam sistem.
