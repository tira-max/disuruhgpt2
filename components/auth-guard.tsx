"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AuthClient } from "@/lib/auth-client"

interface AuthGuardProps {
  children: React.ReactNode
  adminOnly?: boolean
}

export function AuthGuard({ children, adminOnly = false }: AuthGuardProps) {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // First check localStorage
        const localUser = AuthClient.getUser()

        if (!localUser) {
          router.replace("/login")
          return
        }

        // Then verify with server
        const currentUser = await AuthClient.getCurrentUser()

        if (!currentUser) {
          router.replace("/login")
          return
        }

        // Check if admin only and user is not admin
        if (adminOnly && currentUser.role !== "admin") {
          router.replace("/dashboard")
          return
        }

        setUser(currentUser)
      } catch (error) {
        console.error("Auth check error:", error)
        router.replace("/login")
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router, adminOnly])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return <>{children}</>
}
