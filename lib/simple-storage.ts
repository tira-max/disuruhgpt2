import fs from "fs"
import path from "path"
import { v4 as uuidv4 } from "uuid"

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads")

// Ensure upload directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true })
}

export class SimpleStorage {
  // Save file to local storage
  static async saveFile(file: File, folder = "documents"): Promise<{ filename: string; path: string; url: string }> {
    try {
      const folderPath = path.join(UPLOAD_DIR, folder)

      // Create folder if it doesn't exist
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true })
      }

      // Generate unique filename
      const fileExt = file.name.split(".").pop()
      const filename = `${uuidv4()}.${fileExt}`
      const filePath = path.join(folderPath, filename)

      // Convert File to Buffer
      const arrayBuffer = await file.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)

      // Save file
      fs.writeFileSync(filePath, buffer)

      return {
        filename,
        path: filePath,
        url: `/uploads/${folder}/${filename}`,
      }
    } catch (error) {
      console.error("File save error:", error)
      throw new Error("Failed to save file")
    }
  }

  // Save multiple files
  static async saveMultipleFiles(
    files: File[],
    folder = "documents",
  ): Promise<Array<{ filename: string; path: string; url: string }>> {
    const results = []

    for (const file of files) {
      const result = await this.saveFile(file, folder)
      results.push(result)
    }

    return results
  }

  // Delete file
  static deleteFile(filePath: string): boolean {
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
        return true
      }
      return false
    } catch (error) {
      console.error("File delete error:", error)
      return false
    }
  }

  // Get file info
  static getFileInfo(filePath: string) {
    try {
      if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath)
        return {
          size: stats.size,
          created: stats.birthtime,
          modified: stats.mtime,
        }
      }
      return null
    } catch (error) {
      console.error("Get file info error:", error)
      return null
    }
  }
}
