import nodemailer from "nodemailer"

export class EmailService {
  private static transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.mailtrap.io",
    port: Number.parseInt(process.env.EMAIL_PORT || "2525"),
    auth: {
      user: process.env.EMAIL_USER || "",
      pass: process.env.EMAIL_PASSWORD || "",
    },
  })

  // Send email
  static async sendEmail(to: string, subject: string, html: string): Promise<boolean> {
    try {
      // In development, log the email instead of sending it
      if (process.env.NODE_ENV !== "production") {
        console.log("\n📧 EMAIL WOULD BE SENT:")
        console.log("To:", to)
        console.log("Subject:", subject)
        console.log("Content:", html)
        console.log("─".repeat(50))
        return true
      }

      const info = await this.transporter.sendMail({
        from: process.env.EMAIL_FROM || '"Sistem Kendaraan" <noreply@sistem-kendaraan.com>',
        to,
        subject,
        html,
      })

      console.log("Email sent:", info.messageId)
      return true
    } catch (error) {
      console.error("Email send error:", error)
      return false
    }
  }

  // Send application status notification
  static async sendStatusNotification(
    to: string,
    name: string,
    applicationType: string,
    status: "approved" | "rejected",
    letterNumber: string,
    notes?: string,
  ): Promise<boolean> {
    const subject = `Status Permohonan ${this.getTypeLabel(applicationType)} - ${
      status === "approved" ? "Disetujui" : "Ditolak"
    }`

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Status Permohonan Anda</h2>
        
        <p>Yth. ${name},</p>
        
        <p>Permohonan Anda dengan detail berikut:</p>
        <ul>
          <li><strong>Jenis Permohonan:</strong> ${this.getTypeLabel(applicationType)}</li>
          <li><strong>Nomor Surat:</strong> ${letterNumber}</li>
          <li><strong>Status:</strong> <span style="color: ${
            status === "approved" ? "#22c55e" : "#ef4444"
          }; font-weight: bold;">${status === "approved" ? "DISETUJUI" : "DITOLAK"}</span></li>
        </ul>
        
        ${notes ? `<p><strong>Catatan:</strong> ${notes}</p>` : ""}
        
        ${
          status === "approved"
            ? '<p style="color: #22c55e;">Selamat! Permohonan Anda telah disetujui. Silakan lanjutkan proses selanjutnya sesuai petunjuk yang berlaku.</p>'
            : '<p style="color: #ef4444;">Mohon maaf, permohonan Anda tidak dapat disetujui. Silakan hubungi kami untuk informasi lebih lanjut.</p>'
        }
        
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
        
        <p style="font-size: 12px; color: #666;">
          Email ini dikirim secara otomatis dari Sistem Manajemen Kendaraan Dinas Perhubungan Kabupaten Kudus.
          <br>Mohon tidak membalas email ini.
        </p>
      </div>
    `

    return this.sendEmail(to, subject, html)
  }

  // Send welcome email
  static async sendWelcomeEmail(to: string, name: string): Promise<boolean> {
    const subject = "Selamat Datang di Sistem Manajemen Kendaraan"

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Selamat Datang!</h2>
        
        <p>Halo ${name},</p>
        
        <p>Selamat datang di Sistem Manajemen Kendaraan Dinas Perhubungan Kabupaten Kudus.</p>
        
        <p>Dengan sistem ini, Anda dapat:</p>
        <ul>
          <li>Mengajukan permohonan Kartu Pengawasan</li>
          <li>Mengurus Ganti TNKB/Perpanjangan STNK</li>
          <li>Mengajukan Mutasi kendaraan</li>
          <li>Mendaftarkan Kendaraan Baru</li>
          <li>Mengajukan Rubah Sifat kendaraan</li>
          <li>Melihat status permohonan</li>
          <li>Mengunduh laporan</li>
        </ul>
        
        <p>Jika Anda memiliki pertanyaan, jangan ragu untuk menghubungi kami.</p>
        
        <p>Terima kasih!</p>
        
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
        
        <p style="font-size: 12px; color: #666;">
          Dinas Perhubungan Kabupaten Kudus
        </p>
      </div>
    `

    return this.sendEmail(to, subject, html)
  }

  private static getTypeLabel(type: string): string {
    const labels: Record<string, string> = {
      kartu_pengawasan: "Kartu Pengawasan",
      ganti_tnkb: "Ganti TNKB",
      mutasi: "Mutasi",
      kendaraan_baru: "Kendaraan Baru",
      rubah_sifat: "Rubah Sifat",
    }
    return labels[type] || type
  }
}
