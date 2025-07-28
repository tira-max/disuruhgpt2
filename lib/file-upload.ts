import { supabase } from "./supabase-client"
import { v4 as uuidv4 } from "uuid"

export class FileUploadService {
  private static readonly MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
  private static readonly ALLOWED_TYPES = ["application/pdf", "image/jpeg", "image/jpg", "image/png"]

  // Validate file
  static validateFile(file: File): void {
    if (file.size > this.MAX_FILE_SIZE) {
      throw new Error(`File size must be less than ${this.MAX_FILE_SIZE / 1024 / 1024}MB`)
    }

    if (!this.ALLOWED_TYPES.includes(file.type)) {
      throw new Error(`File type ${file.type} is not allowed`)
    }
  }

  // Upload file to Supabase Storage
  static async uploadFile(file: File, folder = "documents"): Promise<{ path: string; url: string }> {
    try {
      // Validate file
      this.validateFile(file)

      // Generate unique filename
      const fileExt = file.name.split(".").pop()
      const fileName = `${uuidv4()}.${fileExt}`
      const filePath = `${folder}/${fileName}`

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage.from("documents").upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      })

      if (error) throw error

      // Get public URL
      const { data: urlData } = supabase.storage.from("documents").getPublicUrl(filePath)

      return {
        path: filePath,
        url: urlData.publicUrl,
      }
    } catch (error) {
      console.error("File upload error:", error)
      throw error
    }
  }

  // Upload multiple files
  static async uploadMultipleFiles(files: File[], folder = "documents"): Promise<Array<{ path: string; url: string }>> {
    const results = []

    for (const file of files) {
      const result = await this.uploadFile(file, folder)
      results.push(result)
    }

    return results
  }

  // Delete file
  static async deleteFile(path: string): Promise<void> {
    try {
      const { error } = await supabase.storage.from("documents").remove([path])

      if (error) throw error
    } catch (error) {
      console.error("File delete error:", error)
      throw error
    }
  }
}
