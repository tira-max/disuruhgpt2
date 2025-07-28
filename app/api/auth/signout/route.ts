import { NextResponse } from "next/server"
import { AuthService } from "@/lib/auth"

export async function POST() {
  try {
    await AuthService.signOut()

    return NextResponse.json({
      message: "Signed out successfully",
    })
  } catch (error: any) {
    console.error("Signout error:", error)
    return NextResponse.json({ error: error.message || "Failed to sign out" }, { status: 500 })
  }
}
