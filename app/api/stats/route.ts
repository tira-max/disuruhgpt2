import { NextResponse } from "next/server"
import { db } from "@/backend/database/simple-db"

export async function GET() {
  try {
    const applications = db.getApplications()

    const stats = {
      totalApplications: applications.length,
      pendingApplications: applications.filter((app) => app.status === "pending").length,
      approvedApplications: applications.filter((app) => app.status === "approved").length,
      rejectedApplications: applications.filter((app) => app.status === "rejected").length,
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error("Stats API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
