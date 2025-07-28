import { type NextRequest, NextResponse } from "next/server"
import { DatabaseService } from "@/lib/supabase"
import { AuthService } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    // Get current user
    const user = await AuthService.getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get stats
    const [applicationStats, vehicleStats, companyStats] = await Promise.all([
      DatabaseService.getApplicationStats(),
      DatabaseService.getVehicleStats(),
      DatabaseService.getCompanyStats(),
    ])

    return NextResponse.json({
      applications: applicationStats,
      vehicles: vehicleStats,
      companies: companyStats,
    })
  } catch (error: any) {
    console.error("Get stats error:", error)
    return NextResponse.json({ error: error.message || "Failed to fetch stats" }, { status: 500 })
  }
}
