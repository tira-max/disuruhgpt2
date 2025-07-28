import fs from "fs"
import path from "path"

export interface User {
  id: string
  email: string
  password: string
  name: string
  role: "admin" | "user"
  createdAt: string
}

export interface Application {
  id: string
  userId: string
  type: "kendaraan-baru" | "mutasi" | "ganti-tnkb" | "rubah-sifat"
  status: "pending" | "approved" | "rejected"
  data: any
  createdAt: string
  updatedAt: string
}

export interface Company {
  id: string
  name: string
  address: string
  phone: string
  email: string
  createdAt: string
}

export interface Vehicle {
  id: string
  plateNumber: string
  brand: string
  model: string
  year: number
  color: string
  ownerId: string
  createdAt: string
}

class SimpleDB {
  private dataDir: string

  constructor() {
    this.dataDir = path.join(process.cwd(), "backend", "data")
    this.ensureDataDir()
    this.initializeData()
  }

  private ensureDataDir() {
    if (!fs.existsSync(this.dataDir)) {
      fs.mkdirSync(this.dataDir, { recursive: true })
    }
  }

  private initializeData() {
    const files = ["users.json", "applications.json", "companies.json", "vehicles.json"]

    files.forEach((file) => {
      const filePath = path.join(this.dataDir, file)
      if (!fs.existsSync(filePath)) {
        let initialData: any = []

        if (file === "users.json") {
          initialData = [
            {
              id: "1",
              email: "admin@example.com",
              password: "password",
              name: "Administrator",
              role: "admin",
              createdAt: new Date().toISOString(),
            },
            {
              id: "2",
              email: "user@example.com",
              password: "password",
              name: "Regular User",
              role: "user",
              createdAt: new Date().toISOString(),
            },
          ]
        }

        fs.writeFileSync(filePath, JSON.stringify(initialData, null, 2))
      }
    })
  }

  private readFile<T>(filename: string): T[] {
    try {
      const filePath = path.join(this.dataDir, filename)
      const data = fs.readFileSync(filePath, "utf8")
      return JSON.parse(data)
    } catch (error) {
      console.error(`Error reading ${filename}:`, error)
      return []
    }
  }

  private writeFile<T>(filename: string, data: T[]): void {
    try {
      const filePath = path.join(this.dataDir, filename)
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
    } catch (error) {
      console.error(`Error writing ${filename}:`, error)
    }
  }

  // Users
  getUsers(): User[] {
    return this.readFile<User>("users.json")
  }

  getUserById(id: string): User | null {
    const users = this.getUsers()
    return users.find((user) => user.id === id) || null
  }

  getUserByEmail(email: string): User | null {
    const users = this.getUsers()
    return users.find((user) => user.email === email) || null
  }

  createUser(user: Omit<User, "id" | "createdAt">): User {
    const users = this.getUsers()
    const newUser: User = {
      ...user,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }
    users.push(newUser)
    this.writeFile("users.json", users)
    return newUser
  }

  // Applications
  getApplications(): Application[] {
    return this.readFile<Application>("applications.json")
  }

  getApplicationById(id: string): Application | null {
    const applications = this.getApplications()
    return applications.find((app) => app.id === id) || null
  }

  createApplication(application: Omit<Application, "id" | "createdAt" | "updatedAt">): Application {
    const applications = this.getApplications()
    const newApplication: Application = {
      ...application,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    applications.push(newApplication)
    this.writeFile("applications.json", applications)
    return newApplication
  }

  updateApplication(id: string, updates: Partial<Application>): Application | null {
    const applications = this.getApplications()
    const index = applications.findIndex((app) => app.id === id)

    if (index === -1) return null

    applications[index] = {
      ...applications[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    }

    this.writeFile("applications.json", applications)
    return applications[index]
  }

  // Companies
  getCompanies(): Company[] {
    return this.readFile<Company>("companies.json")
  }

  createCompany(company: Omit<Company, "id" | "createdAt">): Company {
    const companies = this.getCompanies()
    const newCompany: Company = {
      ...company,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }
    companies.push(newCompany)
    this.writeFile("companies.json", companies)
    return newCompany
  }

  // Vehicles
  getVehicles(): Vehicle[] {
    return this.readFile<Vehicle>("vehicles.json")
  }

  createVehicle(vehicle: Omit<Vehicle, "id" | "createdAt">): Vehicle {
    const vehicles = this.getVehicles()
    const newVehicle: Vehicle = {
      ...vehicle,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }
    vehicles.push(newVehicle)
    this.writeFile("vehicles.json", vehicles)
    return newVehicle
  }
}

export const db = new SimpleDB()
