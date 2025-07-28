import { type NextRequest, NextResponse } from "next/server"
import { authService } from "@/backend/services/auth-service"

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ success: false, message: "No token provided" }, { status: 401 })
    }

    const result = await authService.verifyToken(token)

    if (result.success) {
      return NextResponse.json({
        success: true,
        user: result.user,
      })
    } else {
      return NextResponse.json({ success: false, message: result.message || "Invalid token" }, { status: 401 })
    }
  } catch (error) {
    console.error("Me API error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
