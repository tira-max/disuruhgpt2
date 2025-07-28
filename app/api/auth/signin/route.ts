import { type NextRequest, NextResponse } from "next/server"
import { AuthService } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Sign in user
    const { user, session } = await AuthService.signIn(email, password)

    return NextResponse.json({
      message: "Signed in successfully",
      user,
      session,
    })
  } catch (error: any) {
    console.error("Signin error:", error)
    return NextResponse.json({ error: error.message || "Failed to sign in" }, { status: 401 })
  }
}
