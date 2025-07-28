import { SimpleAuth } from "./simple-auth"

// Re-export untuk backward compatibility
export const login = SimpleAuth.login
export const logout = async () => {
  // For client-side logout, we'll handle this via API call
  try {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
    })
    return response.ok
  } catch (error) {
    console.error("Logout error:", error)
    return false
  }
}

export const getCurrentUser = async () => {
  try {
    const response = await fetch("/api/auth/me")
    if (response.ok) {
      const data = await response.json()
      return data.user
    }
    return null
  } catch (error) {
    console.error("Get current user error:", error)
    return null
  }
}

export const isLoggedIn = async () => {
  const user = await getCurrentUser()
  return user !== null
}

// Export SimpleAuth for direct use
export { SimpleAuth }
