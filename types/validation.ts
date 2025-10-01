export interface ValidatorIdentity {
  nama: string;
  institusi: string;
  keahlian: string;
  tanggal_validasi?: string;
}

export interface RatingScale {
  [key: string]: number; // 1-5 rating
}

export interface ValidationComments {
  general_comments?: string;
  suggestions?: string;
}

export interface ValidationDecision {
  decision: 'tidak-layak' | 'layak-revisi-besar' | 'layak-revisi-kecil' | 'layak-tanpa-revisi';
}

export interface ValidasiIsi {
  id?: string;
  validator: ValidatorIdentity;
  ratings: RatingScale;
  comments: ValidationComments;
  decision: ValidationDecision;
  signature_url: string;
  created_at?: string;
}

export interface ValidasiKonstruk {
  id?: string;
  validator: ValidatorIdentity;
  ratings: RatingScale;
  comments: ValidationComments;
  decision: ValidationDecision;
  signature_url: string;
  created_at?: string;
}

export interface ValidasiPraktikalitasGuru {
  id?: string;
  validator: ValidatorIdentity;
  ratings: RatingScale;
  comments: ValidationComments;
  decision: ValidationDecision;
  signature_url: string;
  created_at?: string;
}

export interface ValidasiPraktikalitasSiswa {
  id?: string;
  validator: ValidatorIdentity;
  ratings: RatingScale;
  comments: ValidationComments;
  decision: ValidationDecision;
  signature_url: string;
  created_at?: string;
}
