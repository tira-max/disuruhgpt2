import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export class EmailService {
  // Send application status notification
  static async sendApplicationStatusNotification(
    to: string,
    applicantName: string,
    applicationType: string,
    status: "approved" | "rejected",
    letterNumber: string,
    notes?: string,
  ) {
    try {
      const subject = `Status Permohonan ${this.getTypeLabel(applicationType)} - ${status === "approved" ? "Disetujui" : "Ditolak"}`

      const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Status Permohonan Anda</h2>
          
          <p>Yth. ${applicantName},</p>
          
          <p>Permohonan Anda dengan detail berikut:</p>
          <ul>
            <li><strong>Jenis Permohonan:</strong> ${this.getTypeLabel(applicationType)}</li>
            <li><strong>Nomor Surat:</strong> ${letterNumber}</li>
            <li><strong>Status:</strong> <span style="color: ${status === "approved" ? "#22c55e" : "#ef4444"}; font-weight: bold;">${status === "approved" ? "DISETUJUI" : "DITOLAK"}</span></li>
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

      const { data, error } = await resend.emails.send({
        from: "Dinas Perhubungan Kudus <noreply@dishub-kudus.go.id>",
        to: [to],
        subject,
        html,
      })

      if (error) throw error
      return data
    } catch (error) {
      console.error("Email send error:", error)
      throw error
    }
  }

  // Send license expiry reminder
  static async sendLicenseExpiryReminder(
    to: string,
    companyName: string,
    licenseType: string,
    expiryDate: string,
    daysUntilExpiry: number,
  ) {
    try {
      const subject = `Peringatan: ${licenseType} akan berakhir dalam ${daysUntilExpiry} hari`

      const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #f59e0b;">⚠️ Peringatan Masa Berlaku Izin</h2>
          
          <p>Yth. ${companyName},</p>
          
          <p>Kami ingin mengingatkan bahwa izin Anda akan segera berakhir:</p>
          
          <div style="background-color: #fef3c7; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <p><strong>Jenis Izin:</strong> ${licenseType}</p>
            <p><strong>Tanggal Berakhir:</strong> ${new Date(expiryDate).toLocaleDateString("id-ID")}</p>
            <p><strong>Sisa Waktu:</strong> ${daysUntilExpiry} hari</p>
          </div>
          
          <p>Mohon segera melakukan perpanjangan izin untuk menghindari gangguan operasional kendaraan Anda.</p>
          
          <p>Untuk informasi lebih lanjut, silakan hubungi Dinas Perhubungan Kabupaten Kudus.</p>
          
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
          
          <p style="font-size: 12px; color: #666;">
            Email ini dikirim secara otomatis dari Sistem Manajemen Kendaraan Dinas Perhubungan Kabupaten Kudus.
          </p>
        </div>
      `

      const { data, error } = await resend.emails.send({
        from: "Dinas Perhubungan Kudus <noreply@dishub-kudus.go.id>",
        to: [to],
        subject,
        html,
      })

      if (error) throw error
      return data
    } catch (error) {
      console.error("Email send error:", error)
      throw error
    }
  }

  // Send welcome email
  static async sendWelcomeEmail(to: string, name: string) {
    try {
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

      const { data, error } = await resend.emails.send({
        from: "Dinas Perhubungan Kudus <noreply@dishub-kudus.go.id>",
        to: [to],
        subject,
        html,
      })

      if (error) throw error
      return data
    } catch (error) {
      console.error("Email send error:", error)
      throw error
    }
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
