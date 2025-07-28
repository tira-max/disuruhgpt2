import { type NextRequest, NextResponse } from "next/server"
import { db, type Application, type User } from "@/lib/simple-db"
import { SimpleAuth } from "@/lib/simple-auth"
import { SimpleEmail } from "@/lib/simple-email"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const user = await SimpleAuth.getUserFromToken(token)
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }

    const { status, notes } = await request.json()

    const application = db.update<Application>("applications", params.id, {
      status,
      updatedAt: new Date().toISOString(),
    })

    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 })
    }

    // Get applicant user for email
    const applicantUser = db.findById<User>("users", application.userId)

    if (applicantUser) {
      // Send notification email (simulated)
      await SimpleEmail.sendStatusNotification(
        applicantUser.email,
        applicantUser.name,
        application.type,
        status,
        application.formData.letterNumber || "N/A",
      )
    }

    return NextResponse.json({
      message: "Application status updated successfully",
      application,
    })
  } catch (error) {
    console.error("Update application status error:", error)
    return NextResponse.json({ error: "Failed to update application status" }, { status: 500 })
  }
}
