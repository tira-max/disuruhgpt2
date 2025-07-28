import { type NextRequest, NextResponse } from "next/server"
import { PDFGenerator } from "@/lib/pdf-generator"

export async function POST(request: NextRequest) {
  try {
    const { type, data } = await request.json()

    let pdf
    let filename

    switch (type) {
      case "kartu_pengawasan":
        pdf = PDFGenerator.generateKartuPengawasan(data)
        filename = `kartu-pengawasan-${data.cardNumber.replace(/[^a-zA-Z0-9]/g, "-")}.pdf`
        break
      case "ganti_tnkb":
        pdf = PDFGenerator.generateGantiTNKB(data)
        filename = `ganti-tnkb-${data.letterNumber.replace(/[^a-zA-Z0-9]/g, "-")}.pdf`
        break
      case "applications":
        pdf = PDFGenerator.generateApplicationReport(data)
        filename = `laporan-permohonan-${new Date().toISOString().split("T")[0]}.pdf`
        break
      default:
        return NextResponse.json({ error: "Invalid PDF type" }, { status: 400 })
    }

    // Convert PDF to base64
    const base64 = PDFGenerator.getPDFBase64(pdf)

    return NextResponse.json({
      base64,
      filename,
    })
  } catch (error: any) {
    console.error("PDF generation error:", error)
    return NextResponse.json({ error: error.message || "Failed to generate PDF" }, { status: 500 })
  }
}
