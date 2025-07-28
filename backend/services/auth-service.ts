import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { db, type User } from "../database/simple-db"

export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthResponse {
  success: boolean
  user?: Omit<User, "password">
  token?: string
  message?: string
}

export class AuthService {
  private jwtSecret: string
  private jwtExpiresIn: string

  constructor() {
    this.jwtSecret = process.env.JWT_SECRET || "fallback-secret-key"
    this.jwtExpiresIn = process.env.JWT_EXPIRES_IN || "24h"
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const { email, password } = credentials

      // Find user by email
      const user = db.getUserByEmail(email)
      if (!user) {
        return {
          success: false,
          message: "Invalid email or password",
        }
      }

      // Check password (support both plain text and hashed)
      let isValidPassword = false

      if (user.password.startsWith("$2a$") || user.password.startsWith("$2b$")) {
        // Password is already hashed
        isValidPassword = await bcrypt.compare(password, user.password)
      } else {
        // Password is plain text, compare directly and then hash it
        isValidPassword = user.password === password
        if (isValidPassword) {
          // Hash the password for future use
          const hashedPassword = await bcrypt.hash(password, 10)
          // Update user with hashed password (in a real app, you'd update the database)
          user.password = hashedPassword
        }
      }

      if (!isValidPassword) {
        return {
          success: false,
          message: "Invalid email or password",
        }
      }

      // Generate JWT token
      const token = jwt.sign(
        {
          userId: user.id,
          email: user.email,
          role: user.role,
        },
        this.jwtSecret,
        { expiresIn: this.jwtExpiresIn },
      )

      // Return user without password
      const { password: _, ...userWithoutPassword } = user

      return {
        success: true,
        user: userWithoutPassword,
        token,
      }
    } catch (error) {
      console.error("Login error:", error)
      return {
        success: false,
        message: "Internal server error",
      }
    }
  }

  async verifyToken(token: string): Promise<{ success: boolean; user?: Omit<User, "password">; message?: string }> {
    try {
      const decoded = jwt.verify(token, this.jwtSecret) as any
      const user = db.getUserById(decoded.userId)

      if (!user) {
        return {
          success: false,
          message: "User not found",
        }
      }

      const { password: _, ...userWithoutPassword } = user

      return {
        success: true,
        user: userWithoutPassword,
      }
    } catch (error) {
      return {
        success: false,
        message: "Invalid token",
      }
    }
  }

  async register(userData: {
    email: string
    password: string
    name: string
    role?: "admin" | "user"
  }): Promise<AuthResponse> {
    try {
      // Check if user already exists
      const existingUser = db.getUserByEmail(userData.email)
      if (existingUser) {
        return {
          success: false,
          message: "User already exists",
        }
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(userData.password, 10)

      // Create user
      const newUser = db.createUser({
        email: userData.email,
        password: hashedPassword,
        name: userData.name,
        role: userData.role || "user",
      })

      // Generate token
      const token = jwt.sign(
        {
          userId: newUser.id,
          email: newUser.email,
          role: newUser.role,
        },
        this.jwtSecret,
        { expiresIn: this.jwtExpiresIn },
      )

      const { password: _, ...userWithoutPassword } = newUser

      return {
        success: true,
        user: userWithoutPassword,
        token,
      }
    } catch (error) {
      console.error("Registration error:", error)
      return {
        success: false,
        message: "Internal server error",
      }
    }
  }
}

export const authService = new AuthService()
