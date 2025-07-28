import { type NextRequest, NextResponse } from "next/server"
import { db, type Application } from "@/lib/simple-db"
import { SimpleAuth } from "@/lib/simple-auth"
import { SimplePDF } from "@/lib/simple-pdf"

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const user = await SimpleAuth.getUserFromToken(token)
    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const format = searchParams.get("format") || "json"
    const type = searchParams.get("type") || "applications"

    let data: any[] = []
    let title = ""

    switch (type) {
      case "applications":
        data = db.findAll<Application>("applications")
        title = "Laporan Permohonan"
        break
      case "companies":
        data = db.findAll("companies")
        title = "Laporan Perusahaan"
        break
      case "vehicles":
        data = db.findAll("vehicles")
        title = "Laporan Kendaraan"
        break
      default:
        return NextResponse.json({ error: "Invalid report type" }, { status: 400 })
    }

    if (format === "html") {
      const htmlContent = SimplePDF.generateHTMLReport(data, title)
      return new NextResponse(htmlContent, {
        headers: {
          "Content-Type": "text/html",
        },
      })
    }

    return NextResponse.json({
      title,
      data,
      generatedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Generate report error:", error)
    return NextResponse.json({ error: "Failed to generate report" }, { status: 500 })
  }
}
