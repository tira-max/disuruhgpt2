import fs from "fs"
import path from "path"

export interface User {
  id: string
  email: string
  name: string
  role: "admin" | "user"
  password: string
  createdAt: string
}

export interface Application {
  id: string
  userId: string
  type: "kendaraan-baru" | "mutasi" | "ganti-tnkb" | "rubah-sifat"
  status: "pending" | "approved" | "rejected"
  data: Record<string, any>
  createdAt: string
  updatedAt: string
}

class SimpleDatabase {
  private dataDir: string
  private data: Record<string, any[]> = {}

  constructor() {
    this.dataDir = path.join(process.cwd(), "data")
    this.ensureDataDir()
    this.initializeData()
  }

  private ensureDataDir() {
    if (!fs.existsSync(this.dataDir)) {
      fs.mkdirSync(this.dataDir, { recursive: true })
    }
  }

  private getFilePath(table: string): string {
    return path.join(this.dataDir, `${table}.json`)
  }

  private initializeData() {
    // Initialize users table
    this.loadTable("users")
    if (!this.data.users || this.data.users.length === 0) {
      this.data.users = [
        {
          id: "1",
          email: "admin@example.com",
          name: "Admin User",
          role: "admin",
          password: "password",
          createdAt: new Date().toISOString(),
        },
        {
          id: "2",
          email: "user@example.com",
          name: "Regular User",
          role: "user",
          password: "password",
          createdAt: new Date().toISOString(),
        },
      ]
      this.saveTable("users")
    }

    // Initialize applications table
    this.loadTable("applications")
    if (!this.data.applications) {
      this.data.applications = []
      this.saveTable("applications")
    }
  }

  private loadTable(table: string) {
    const filePath = this.getFilePath(table)
    try {
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, "utf-8")
        this.data[table] = JSON.parse(fileContent)
      } else {
        this.data[table] = []
      }
    } catch (error) {
      console.error(`Error loading table ${table}:`, error)
      this.data[table] = []
    }
  }

  private saveTable(table: string) {
    const filePath = this.getFilePath(table)
    try {
      fs.writeFileSync(filePath, JSON.stringify(this.data[table], null, 2))
    } catch (error) {
      console.error(`Error saving table ${table}:`, error)
    }
  }

  findAll<T>(table: string): T[] {
    if (!this.data[table]) {
      this.loadTable(table)
    }
    return this.data[table] as T[]
  }

  findById<T>(table: string, id: string): T | null {
    const items = this.findAll<T & { id: string }>(table)
    return items.find((item) => item.id === id) || null
  }

  create<T extends { id: string }>(table: string, item: T): T {
    if (!this.data[table]) {
      this.loadTable(table)
    }
    this.data[table].push(item)
    this.saveTable(table)
    return item
  }

  update<T extends { id: string }>(table: string, id: string, updates: Partial<T>): T | null {
    const items = this.findAll<T>(table)
    const index = items.findIndex((item) => item.id === id)

    if (index === -1) return null

    this.data[table][index] = { ...items[index], ...updates }
    this.saveTable(table)
    return this.data[table][index]
  }

  delete(table: string, id: string): boolean {
    const items = this.findAll<{ id: string }>(table)
    const index = items.findIndex((item) => item.id === id)

    if (index === -1) return false

    this.data[table].splice(index, 1)
    this.saveTable(table)
    return true
  }
}

export const db = new SimpleDatabase()
