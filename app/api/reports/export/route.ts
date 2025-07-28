import { type NextRequest, NextResponse } from "next/server"
import { DatabaseService } from "@/lib/supabase"
import { PDFGenerator } from "@/lib/pdf-generator"
import { AuthService } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    // Get current user
    const user = await AuthService.getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { type, format, filters } = await request.json()

    // Get data based on type
    let data: any[] = []
    let filename = ""

    switch (type) {
      case "applications":
        data = await DatabaseService.getApplications(filters)
        filename = `laporan-permohonan-${new Date().toISOString().split("T")[0]}`
        break
      case "vehicles":
        data = await DatabaseService.getVehicles(filters?.companyId)
        filename = `laporan-kendaraan-${new Date().toISOString().split("T")[0]}`
        break
      default:
        return NextResponse.json({ error: "Invalid report type" }, { status: 400 })
    }

    if (format === "pdf") {
      // Generate PDF
      const pdf = PDFGenerator.generateApplicationReport(data)
      const pdfBuffer = Buffer.from(pdf.output("arraybuffer"))

      return new NextResponse(pdfBuffer, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="${filename}.pdf"`,
        },
      })
    } else if (format === "excel") {
      // For Excel export, return JSON data that frontend can process
      return NextResponse.json({
        data,
        filename: `${filename}.xlsx`,
      })
    }

    return NextResponse.json({ error: "Invalid format" }, { status: 400 })
  } catch (error: any) {
    console.error("Export error:", error)
    return NextResponse.json({ error: error.message || "Failed to export report" }, { status: 500 })
  }
}
