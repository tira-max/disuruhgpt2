// Client-side auth helper
export class AuthClient {
  private static readonly USER_KEY = "current-user"

  // Save user to localStorage
  static saveUser(user: any): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(this.USER_KEY, JSON.stringify(user))
    }
  }

  // Get user from localStorage
  static getUser(): any | null {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem(this.USER_KEY)
      return userData ? JSON.parse(userData) : null
    }
    return null
  }

  // Remove user from localStorage
  static removeUser(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(this.USER_KEY)
    }
  }

  // Check if user is logged in
  static isLoggedIn(): boolean {
    return this.getUser() !== null
  }

  // Get current user from API
  static async getCurrentUser(): Promise<any | null> {
    try {
      const response = await fetch("/api/auth/me", {
        credentials: "include", // Include cookies
      })

      if (response.ok) {
        const data = await response.json()
        // Update local storage with latest user data
        this.saveUser(data.user)
        return data.user
      } else {
        // If API call fails, remove user from localStorage
        this.removeUser()
        return null
      }
    } catch (error) {
      console.error("Get current user error:", error)
      this.removeUser()
      return null
    }
  }

  // Login
  static async login(email: string, password: string): Promise<any> {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include", // Include cookies
    })

    const data = await response.json()

    if (response.ok) {
      this.saveUser(data.user)
      return data.user
    }

    throw new Error(data.error || "Login failed")
  }

  // Logout
  static async logout(): Promise<boolean> {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include", // Include cookies
      })

      // Always remove user from localStorage, even if API call fails
      this.removeUser()

      return response.ok
    } catch (error) {
      console.error("Logout error:", error)
      // Still remove user from localStorage
      this.removeUser()
      return false
    }
  }
}
