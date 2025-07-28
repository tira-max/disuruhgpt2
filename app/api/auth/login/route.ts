import { type NextRequest, NextResponse } from "next/server"
import { authService } from "@/backend/services/auth-service"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({ success: false, message: "Email and password are required" }, { status: 400 })
    }

    const result = await authService.login({ email, password })

    if (result.success && result.token) {
      const response = NextResponse.json({
        success: true,
        user: result.user,
        message: "Login successful",
      })

      // Set HTTP-only cookie
      response.cookies.set("auth-token", result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
      })

      return response
    } else {
      return NextResponse.json({ success: false, message: result.message || "Login failed" }, { status: 401 })
    }
  } catch (error) {
    console.error("Login API error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
