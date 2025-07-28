import { createClient } from "@supabase/supabase-js"
import type { User, Company, Vehicle, Application, Document } from "./types" // Assuming types are defined in a separate file

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Client-side Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side Supabase client (for admin operations)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

// Database helper functions
export class DatabaseService {
  // Users
  static async createUser(userData: Partial<User>) {
    const { data, error } = await supabaseAdmin.from("users").insert(userData).select().single()

    if (error) throw error
    return data
  }

  static async getUserById(id: string) {
    const { data, error } = await supabaseAdmin.from("users").select("*").eq("id", id).single()

    if (error) throw error
    return data
  }

  static async getUserByEmail(email: string) {
    const { data, error } = await supabaseAdmin.from("users").select("*").eq("email", email).single()

    if (error) throw error
    return data
  }

  // Companies
  static async createCompany(companyData: Partial<Company>) {
    const { data, error } = await supabaseAdmin.from("companies").insert(companyData).select().single()

    if (error) throw error
    return data
  }

  static async getCompanies() {
    const { data, error } = await supabaseAdmin.from("companies").select("*").order("name")

    if (error) throw error
    return data
  }

  static async getCompanyById(id: string) {
    const { data, error } = await supabaseAdmin.from("companies").select("*").eq("id", id).single()

    if (error) throw error
    return data
  }

  // Vehicles
  static async createVehicle(vehicleData: Partial<Vehicle>) {
    const { data, error } = await supabaseAdmin.from("vehicles").insert(vehicleData).select().single()

    if (error) throw error
    return data
  }

  static async getVehicles(companyId?: string) {
    let query = supabaseAdmin.from("vehicles").select(`
        *,
        companies (
          id,
          name
        )
      `)

    if (companyId) {
      query = query.eq("company_id", companyId)
    }

    const { data, error } = await query.order("license_plate")

    if (error) throw error
    return data
  }

  static async updateVehicle(id: string, updates: Partial<Vehicle>) {
    const { data, error } = await supabaseAdmin.from("vehicles").update(updates).eq("id", id).select().single()

    if (error) throw error
    return data
  }

  // Applications
  static async createApplication(applicationData: Partial<Application>) {
    const { data, error } = await supabaseAdmin.from("applications").insert(applicationData).select().single()

    if (error) throw error
    return data
  }

  static async getApplications(filters?: {
    status?: string
    type?: string
    userId?: string
    companyId?: string
  }) {
    let query = supabaseAdmin.from("applications").select(`
        *,
        users (
          id,
          name,
          email
        ),
        companies (
          id,
          name
        )
      `)

    if (filters?.status) {
      query = query.eq("status", filters.status)
    }
    if (filters?.type) {
      query = query.eq("type", filters.type)
    }
    if (filters?.userId) {
      query = query.eq("user_id", filters.userId)
    }
    if (filters?.companyId) {
      query = query.eq("company_id", filters.companyId)
    }

    const { data, error } = await query.order("created_at", { ascending: false })

    if (error) throw error
    return data
  }

  static async getApplicationById(id: string) {
    const { data, error } = await supabaseAdmin
      .from("applications")
      .select(`
        *,
        users (
          id,
          name,
          email
        ),
        companies (
          id,
          name,
          address
        ),
        documents (
          id,
          filename,
          original_name,
          file_path,
          file_size,
          mime_type
        )
      `)
      .eq("id", id)
      .single()

    if (error) throw error
    return data
  }

  static async updateApplicationStatus(
    id: string,
    status: "pending" | "approved" | "rejected",
    processedBy: string,
    notes?: string,
  ) {
    const { data, error } = await supabaseAdmin
      .from("applications")
      .update({
        status,
        processed_by: processedBy,
        processed_at: new Date().toISOString(),
        notes,
      })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error
    return data
  }

  // Documents
  static async createDocument(documentData: Partial<Document>) {
    const { data, error } = await supabaseAdmin.from("documents").insert(documentData).select().single()

    if (error) throw error
    return data
  }

  static async getDocumentsByApplicationId(applicationId: string) {
    const { data, error } = await supabaseAdmin.from("documents").select("*").eq("application_id", applicationId)

    if (error) throw error
    return data
  }

  // Reports & Analytics
  static async getApplicationStats() {
    const { data: totalApplications, error: totalError } = await supabaseAdmin
      .from("applications")
      .select("id", { count: "exact" })

    const { data: approvedApplications, error: approvedError } = await supabaseAdmin
      .from("applications")
      .select("id", { count: "exact" })
      .eq("status", "approved")

    const { data: pendingApplications, error: pendingError } = await supabaseAdmin
      .from("applications")
      .select("id", { count: "exact" })
      .eq("status", "pending")

    const { data: rejectedApplications, error: rejectedError } = await supabaseAdmin
      .from("applications")
      .select("id", { count: "exact" })
      .eq("status", "rejected")

    if (totalError || approvedError || pendingError || rejectedError) {
      throw new Error("Failed to fetch application stats")
    }

    return {
      total: totalApplications?.length || 0,
      approved: approvedApplications?.length || 0,
      pending: pendingApplications?.length || 0,
      rejected: rejectedApplications?.length || 0,
    }
  }

  static async getVehicleStats() {
    const { data: totalVehicles, error: totalError } = await supabaseAdmin
      .from("vehicles")
      .select("id", { count: "exact" })

    const { data: activeVehicles, error: activeError } = await supabaseAdmin
      .from("vehicles")
      .select("id", { count: "exact" })
      .eq("status", "active")

    if (totalError || activeError) {
      throw new Error("Failed to fetch vehicle stats")
    }

    return {
      total: totalVehicles?.length || 0,
      active: activeVehicles?.length || 0,
    }
  }

  static async getCompanyStats() {
    const { data: totalCompanies, error } = await supabaseAdmin.from("companies").select("id", { count: "exact" })

    if (error) throw new Error("Failed to fetch company stats")

    return {
      total: totalCompanies?.length || 0,
    }
  }
}
