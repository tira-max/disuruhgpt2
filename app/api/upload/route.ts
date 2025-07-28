import { type NextRequest, NextResponse } from "next/server"
import { FileUploadService } from "@/lib/file-upload"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const folder = (formData.get("folder") as string) || "documents"

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    try {
      FileUploadService.validateFile(file)
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    const result = await FileUploadService.uploadFile(file, folder)

    return NextResponse.json({
      message: "File uploaded successfully",
      file: result,
    })
  } catch (error: any) {
    console.error("File upload error:", error)
    return NextResponse.json({ error: error.message || "Failed to upload file" }, { status: 500 })
  }
}
