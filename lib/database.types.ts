// Database Types
export interface User {
  id: string
  email: string
  name: string
  role: "admin" | "user"
  created_at: string
  updated_at: string
}

export interface Company {
  id: string
  name: string
  address: string
  village: string
  rt: string
  rw: string
  district: string
  phone?: string
  email?: string
  created_at: string
  updated_at: string
}

export interface Vehicle {
  id: string
  company_id: string
  owner_name: string
  license_plate: string
  test_number: string
  chassis_number: string
  engine_number: string
  year: number
  brand: string
  type: string
  color?: string
  fuel_type?: string
  passenger_capacity?: number
  cargo_capacity?: number
  status: "active" | "maintenance" | "inactive"
  notes?: string
  created_at: string
  updated_at: string
}

export interface Application {
  id: string
  user_id: string
  company_id: string
  type: "kartu_pengawasan" | "ganti_tnkb" | "mutasi" | "kendaraan_baru" | "rubah_sifat"
  letter_number: string
  application_date: string
  applicant_name: string
  status: "pending" | "approved" | "rejected"
  form_data: Record<string, any>
  documents: string[]
  notes?: string
  processed_by?: string
  processed_at?: string
  created_at: string
  updated_at: string
}

export interface Document {
  id: string
  application_id: string
  filename: string
  original_name: string
  file_path: string
  file_size: number
  mime_type: string
  uploaded_at: string
}

export interface KartuPengawasan {
  id: string
  application_id: string
  card_number: string
  route_description: string
  valid_from: string
  valid_until: string
  hull_number?: string
  created_at: string
}
