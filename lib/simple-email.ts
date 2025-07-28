// Simple email simulation (console logging)
export class SimpleEmail {
  // Send email (simulated with console.log)
  static async sendEmail(to: string, subject: string, content: string): Promise<boolean> {
    console.log("\n📧 EMAIL SENT:")
    console.log("To:", to)
    console.log("Subject:", subject)
    console.log("Content:", content)
    console.log("Sent at:", new Date().toLocaleString("id-ID"))
    console.log("─".repeat(50))

    // Simulate async operation
    await new Promise((resolve) => setTimeout(resolve, 100))

    return true
  }

  // Send application status notification
  static async sendStatusNotification(
    email: string,
    name: string,
    type: string,
    status: "approved" | "rejected",
    letterNumber: string,
  ): Promise<boolean> {
    const subject = `Status Permohonan ${type} - ${status === "approved" ? "Disetujui" : "Ditolak"}`
    const content = `
      Yth. ${name},
      
      Permohonan Anda:
      - Jenis: ${type}
      - Nomor: ${letterNumber}
      - Status: ${status === "approved" ? "DISETUJUI" : "DITOLAK"}
      
      ${
        status === "approved"
          ? "Selamat! Permohonan Anda telah disetujui."
          : "Mohon maaf, permohonan Anda tidak dapat disetujui."
      }
      
      Terima kasih,
      Dinas Perhubungan Kudus
    `

    return this.sendEmail(email, subject, content)
  }

  // Send welcome email
  static async sendWelcomeEmail(email: string, name: string): Promise<boolean> {
    const subject = "Selamat Datang di Sistem Manajemen Kendaraan"
    const content = `
      Halo ${name},
      
      Selamat datang di Sistem Manajemen Kendaraan Dinas Perhubungan Kudus.
      
      Anda dapat menggunakan sistem ini untuk:
      - Mengajukan permohonan
      - Melihat status permohonan
      - Mengelola data kendaraan
      
      Terima kasih!
    `

    return this.sendEmail(email, subject, content)
  }
}
