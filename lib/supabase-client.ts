import { createClient } from "@supabase/supabase-js"

// Supabase client setup
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://your-supabase-url.supabase.co"
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "your-anon-key"

// Create a single supabase client for the entire app
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper function for server-side operations
export const getServerSupabase = () => {
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

// Database types
export interface User {
  id: string
  email: string
  name: string
  role: "admin" | "user"
  created_at: string
}

export interface Application {
  id: string
  user_id: string
  type: string
  form_data: any
  status: "pending" | "approved" | "rejected"
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
  created_at: string
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
  color: string
  fuel_type: string
  passenger_capacity: number
  cargo_capacity: number
  status: "active" | "maintenance" | "inactive"
  created_at: string
}

// Database service
export class SupabaseService {
  // Users
  static async getUserByEmail(email: string) {
    const { data, error } = await supabase.from("users").select("*").eq("email", email).single()

    if (error) throw error
    return data
  }

  static async getUserById(id: string) {
    const { data, error } = await supabase.from("users").select("*").eq("id", id).single()

    if (error) throw error
    return data
  }

  // Applications
  static async getApplications(filters: { status?: string; type?: string; user_id?: string } = {}) {
    let query = supabase.from("applications").select(`
      *,
      users (id, name, email),
      companies (id, name, address)
    `)

    if (filters.status) {
      query = query.eq("status", filters.status)
    }

    if (filters.type) {
      query = query.eq("type", filters.type)
    }

    if (filters.user_id) {
      query = query.eq("user_id", filters.user_id)
    }

    const { data, error } = await query.order("created_at", { ascending: false })

    if (error) throw error
    return data
  }

  static async createApplication(applicationData: Partial<Application>) {
    const { data, error } = await supabase.from("applications").insert(applicationData).select().single()

    if (error) throw error
    return data
  }

  static async updateApplicationStatus(id: string, status: "pending" | "approved" | "rejected", notes?: string) {
    const { data, error } = await supabase
      .from("applications")
      .update({
        status,
        notes,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error
    return data
  }

  // Companies
  static async getCompanies() {
    const { data, error } = await supabase.from("companies").select("*").order("name")

    if (error) throw error
    return data
  }

  // Vehicles
  static async getVehicles(companyId?: string) {
    let query = supabase.from("vehicles").select(`
      *,
      companies (id, name)
    `)

    if (companyId) {
      query = query.eq("company_id", companyId)
    }

    const { data, error } = await query.order("license_plate")

    if (error) throw error
    return data
  }

  // File storage
  static async uploadFile(file: File, path: string) {
    const { data, error } = await supabase.storage.from("documents").upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    })

    if (error) throw error

    // Get public URL
    const { data: urlData } = supabase.storage.from("documents").getPublicUrl(path)

    return {
      path: data.path,
      url: urlData.publicUrl,
    }
  }
}
