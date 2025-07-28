import { type NextRequest, NextResponse } from "next/server"
import { ApplicationService } from "../../../backend/services/application-service"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const filters: Record<string, string> = {}

    searchParams.forEach((value, key) => {
      filters[key] = value
    })

    const applications = await ApplicationService.getAllApplications(filters)

    return NextResponse.json({
      success: true,
      data: applications,
    })
  } catch (error) {
    console.error("Get applications API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, type, formData } = body

    if (!userId || !type || !formData) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const application = await ApplicationService.createApplication({
      userId,
      type,
      status: "pending",
      formData,
    })

    if (!application) {
      return NextResponse.json({ error: "Failed to create application" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      data: application,
    })
  } catch (error) {
    console.error("Create application API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
