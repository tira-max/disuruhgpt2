interface ApiResponse<T = any> {
  data?: T
  error?: string
  message?: string
}

export class ApiClient {
  private static readonly BASE_URL = "/api"

  // Generic API call method
  private static async call<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    try {
      const response = await fetch(`${this.BASE_URL}${endpoint}`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || `HTTP ${response.status}`)
      }

      return data
    } catch (error) {
      console.error(`API call error (${endpoint}):`, error)
      throw error
    }
  }

  // Applications API
  static async getApplications(filters?: Record<string, string>) {
    const params = new URLSearchParams(filters)
    return this.call(`/applications?${params}`)
  }

  static async createApplication(data: any) {
    return this.call("/applications", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  static async updateApplicationStatus(id: string, status: string, notes?: string) {
    return this.call(`/applications/${id}/status`, {
      method: "PUT",
      body: JSON.stringify({ status, notes }),
    })
  }

  // Companies API
  static async getCompanies() {
    return this.call("/companies")
  }

  static async createCompany(data: any) {
    return this.call("/companies", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  // Vehicles API
  static async getVehicles(companyId?: string) {
    const params = companyId ? `?companyId=${companyId}` : ""
    return this.call(`/vehicles${params}`)
  }

  static async createVehicle(data: any) {
    return this.call("/vehicles", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  // Statistics API
  static async getStats() {
    return this.call("/stats")
  }

  // Reports API
  static async generateReport(type: string, format = "json") {
    return this.call(`/reports?type=${type}&format=${format}`)
  }
}
