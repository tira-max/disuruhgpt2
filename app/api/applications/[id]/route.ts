import { type NextRequest, NextResponse } from "next/server"
import { DatabaseService } from "@/lib/supabase"
import { AuthService } from "@/lib/auth"
import { EmailService } from "@/lib/email"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Get current user
    const user = await AuthService.getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const application = await DatabaseService.getApplicationById(params.id)

    // Check if user can access this application
    if (user.role !== "admin" && application.user_id !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    return NextResponse.json({ application })
  } catch (error: any) {
    console.error("Get application error:", error)
    return NextResponse.json({ error: error.message || "Failed to fetch application" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Get current user
    const user = await AuthService.getCurrentUser()
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { status, notes } = await request.json()

    // Update application status
    const application = await DatabaseService.updateApplicationStatus(params.id, status, user.id, notes)

    // Get full application data for email
    const fullApplication = await DatabaseService.getApplicationById(params.id)

    // Send notification email
    try {
      const userEmail = fullApplication.users?.email
      if (userEmail) {
        await EmailService.sendApplicationStatusNotification(
          userEmail,
          fullApplication.applicant_name,
          fullApplication.type,
          status,
          fullApplication.letter_number,
          notes,
        )
      }
    } catch (emailError) {
      console.error("Failed to send notification email:", emailError)
      // Don't fail the update if email fails
    }

    return NextResponse.json({
      message: "Application status updated successfully",
      application,
    })
  } catch (error: any) {
    console.error("Update application error:", error)
    return NextResponse.json({ error: error.message || "Failed to update application" }, { status: 500 })
  }
}
