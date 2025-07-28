"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AuthClient, type User } from "/lib/auth-client"

interface AuthGuardProps {
  children: React.ReactNode
  requireAuth?: boolean
  redirectTo?: string
}

export function AuthGuard({ children, requireAuth = true, redirectTo = "/login" }: AuthGuardProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await AuthClient.getCurrentUser()
        setUser(currentUser)

        if (requireAuth && !currentUser) {
          router.push(redirectTo)
          return
        }

        if (!requireAuth && currentUser) {
          router.push("/dashboard")
          return
        }
      } catch (error) {
        console.error("Auth check error:", error)
        if (requireAuth) {
          router.push(redirectTo)
        }
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [requireAuth, redirectTo, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (requireAuth && !user) {
    return null
  }

  if (!requireAuth && user) {
    return null
  }

  return <>{children}</>
}
