import { db, type Company } from "../database/simple-db"

export class CompanyService {
  static async getAllCompanies(): Promise<Company[]> {
    try {
      return db.findAll<Company>("companies")
    } catch (error) {
      console.error("Get companies error:", error)
      return []
    }
  }

  static async getCompanyById(id: string): Promise<Company | null> {
    try {
      return db.findById<Company>("companies", id)
    } catch (error) {
      console.error("Get company error:", error)
      return null
    }
  }

  static async createCompany(companyData: Omit<Company, "id" | "createdAt">): Promise<Company | null> {
    try {
      const newCompany: Company = {
        id: Date.now().toString(),
        ...companyData,
        createdAt: new Date().toISOString(),
      }

      return db.create("companies", newCompany)
    } catch (error) {
      console.error("Create company error:", error)
      return null
    }
  }

  static async updateCompany(id: string, updates: Partial<Company>): Promise<Company | null> {
    try {
      return db.update("companies", id, updates)
    } catch (error) {
      console.error("Update company error:", error)
      return null
    }
  }

  static async deleteCompany(id: string): Promise<boolean> {
    try {
      return db.delete("companies", id)
    } catch (error) {
      console.error("Delete company error:", error)
      return false
    }
  }
}
