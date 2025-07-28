import { type NextRequest, NextResponse } from "next/server"
import { AuthService } from "@/lib/auth"
import { EmailService } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, role } = await request.json()

    // Validate input
    if (!email || !password || !name) {
      return NextResponse.json({ error: "Email, password, and name are required" }, { status: 400 })
    }

    // Create user
    const { user, session } = await AuthService.signUp(email, password, name, role)

    // Send welcome email
    try {
      await EmailService.sendWelcomeEmail(email, name)
    } catch (emailError) {
      console.error("Failed to send welcome email:", emailError)
      // Don't fail the signup if email fails
    }

    return NextResponse.json({
      message: "User created successfully",
      user,
      session,
    })
  } catch (error: any) {
    console.error("Signup error:", error)
    return NextResponse.json({ error: error.message || "Failed to create user" }, { status: 500 })
  }
}
