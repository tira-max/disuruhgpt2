import { db, type User } from "./simple-db"

export class SimpleAuth {
  // Simple login - backward compatible dengan plain text password
  static async login(email: string, password: string): Promise<User | null> {
    try {
      const users = db.findAll<User>("users")
      const user = users.find((u) => u.email === email && u.password === password)
      return user || null
    } catch (error) {
      console.error("Login error:", error)
      return null
    }
  }

  // Get user by ID
  static getUserById(id: string): User | null {
    try {
      return db.findById<User>("users", id)
    } catch (error) {
      console.error("Get user by ID error:", error)
      return null
    }
  }

  // Register user baru
  static async register(
    email: string,
    password: string,
    name: string,
    role: "admin" | "user" = "user",
  ): Promise<User | null> {
    try {
      // Check if user already exists
      const users = db.findAll<User>("users")
      if (users.some((u) => u.email === email)) {
        throw new Error("Email already registered")
      }

      // Create user
      const newUser: User = {
        id: crypto.randomUUID(),
        email,
        name,
        role,
        password, // Keep plain text for now
        createdAt: new Date().toISOString(),
      }

      return db.create("users", newUser)
    } catch (error) {
      console.error("Register error:", error)
      return null
    }
  }
}
