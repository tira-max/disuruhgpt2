import { db, type Application } from "../database/simple-db"

export class ApplicationService {
  static async getAllApplications(filters?: Record<string, string>): Promise<Application[]> {
    try {
      let applications = db.findAll<Application>("applications")

      if (filters) {
        if (filters.status) {
          applications = applications.filter((app) => app.status === filters.status)
        }
        if (filters.type) {
          applications = applications.filter((app) => app.type === filters.type)
        }
        if (filters.userId) {
          applications = applications.filter((app) => app.userId === filters.userId)
        }
      }

      return applications.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    } catch (error) {
      console.error("Get applications error:", error)
      return []
    }
  }

  static async getApplicationById(id: string): Promise<Application | null> {
    try {
      return db.findById<Application>("applications", id)
    } catch (error) {
      console.error("Get application error:", error)
      return null
    }
  }

  static async createApplication(
    applicationData: Omit<Application, "id" | "createdAt" | "updatedAt">,
  ): Promise<Application | null> {
    try {
      const newApplication: Application = {
        id: Date.now().toString(),
        ...applicationData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      return db.create("applications", newApplication)
    } catch (error) {
      console.error("Create application error:", error)
      return null
    }
  }

  static async updateApplicationStatus(
    id: string,
    status: Application["status"],
    notes?: string,
  ): Promise<Application | null> {
    try {
      const updates: Partial<Application> = {
        status,
        updatedAt: new Date().toISOString(),
      }

      if (notes) {
        updates.formData = { ...updates.formData, notes }
      }

      return db.update("applications", id, updates)
    } catch (error) {
      console.error("Update application status error:", error)
      return null
    }
  }

  static async deleteApplication(id: string): Promise<boolean> {
    try {
      return db.delete("applications", id)
    } catch (error) {
      console.error("Delete application error:", error)
      return false
    }
  }

  static async getApplicationStats(): Promise<Record<string, number>> {
    try {
      const applications = db.findAll<Application>("applications")

      return {
        total: applications.length,
        pending: applications.filter((app) => app.status === "pending").length,
        approved: applications.filter((app) => app.status === "approved").length,
        rejected: applications.filter((app) => app.status === "rejected").length,
        kartu_pengawasan: applications.filter((app) => app.type === "kartu_pengawasan").length,
        kendaraan_baru: applications.filter((app) => app.type === "kendaraan_baru").length,
        mutasi: applications.filter((app) => app.type === "mutasi").length,
        ganti_tnkb: applications.filter((app) => app.type === "ganti_tnkb").length,
        rubah_sifat: applications.filter((app) => app.type === "rubah_sifat").length,
      }
    } catch (error) {
      console.error("Get application stats error:", error)
      return {}
    }
  }
}
