import { jsPDF } from "jspdf"
import autoTable from "jspdf-autotable"

export class PDFGenerator {
  // Generate Kartu Pengawasan PDF
  static generateKartuPengawasan(data: any): jsPDF {
    const doc = new jsPDF()

    // Header
    doc.setFontSize(16)
    doc.setFont("helvetica", "bold")
    doc.text("KARTU PENGAWASAN", 105, 20, { align: "center" })
    doc.text("UNTUK MENGANGKUT PENUMPANG DENGAN MOBIL BUS UMUM", 105, 30, { align: "center" })

    // Card Number
    doc.setFontSize(12)
    doc.text(`Nomor: ${data.cardNumber}`, 20, 50)

    // Company Info
    doc.setFont("helvetica", "bold")
    doc.text("DATA PERUSAHAAN:", 20, 70)
    doc.setFont("helvetica", "normal")
    doc.text(`Nama Perusahaan: ${data.companyName}`, 20, 80)
    doc.text(`Alamat: ${data.companyAddress}`, 20, 90)
    doc.text(`Desa: ${data.village}, RT: ${data.rt}, RW: ${data.rw}`, 20, 100)
    doc.text(`Kecamatan: ${data.district}`, 20, 110)

    // Vehicle Info
    doc.setFont("helvetica", "bold")
    doc.text("DATA KENDARAAN:", 20, 130)
    doc.setFont("helvetica", "normal")
    doc.text(`Tanda Nomor Kendaraan: ${data.licensePlate}`, 20, 140)
    doc.text(`Nomor Uji: ${data.testNumber}`, 20, 150)
    doc.text(`Daya Angkut Penumpang: ${data.passengerCapacity} orang`, 20, 160)
    doc.text(`Daya Angkut Barang: ${data.cargoCapacity} Kg`, 20, 170)
    doc.text(`Merk: ${data.brand}, Tahun: ${data.yearMade}`, 20, 180)

    // Route Info
    doc.setFont("helvetica", "bold")
    doc.text("TRAYEK:", 20, 200)
    doc.setFont("helvetica", "normal")
    doc.text(data.routeDescription, 20, 210, { maxWidth: 170 })

    // Validity
    doc.text(`Berlaku: ${data.validFrom} s/d ${data.validUntil}`, 20, 240)

    // Footer
    doc.text("Kudus, " + new Date().toLocaleDateString("id-ID"), 130, 260)
    doc.text("Kepala Dinas Perhubungan", 130, 270)
    doc.text("Kabupaten Kudus", 130, 280)

    return doc
  }

  // Generate Ganti TNKB PDF
  static generateGantiTNKB(data: any): jsPDF {
    const doc = new jsPDF()

    // Header
    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.text("SURAT REKOMENDASI", 105, 20, { align: "center" })
    doc.text("GANTI TNKB/PERPANJANGAN STNK", 105, 30, { align: "center" })
    doc.text("ANGKUTAN BARANG UMUM", 105, 40, { align: "center" })

    // Letter details
    doc.setFontSize(12)
    doc.setFont("helvetica", "normal")
    doc.text(`Nomor: ${data.letterNumber}`, 20, 60)
    doc.text(`Tanggal: ${new Date(data.applicationDate).toLocaleDateString("id-ID")}`, 20, 70)

    // Content
    doc.text("Kepada Yth.", 20, 90)
    doc.text("Kepala Samsat Kudus", 20, 100)
    doc.text("di Tempat", 20, 110)

    doc.text("Dengan hormat,", 20, 130)
    doc.text("Berdasarkan permohonan dari:", 20, 150)
    doc.text(`Nama: ${data.applicantName}`, 30, 160)
    doc.text(`Perusahaan: ${data.companyName}`, 30, 170)
    doc.text(`Alamat: ${data.address}`, 30, 180)

    // Vehicle table
    if (data.vehicles && data.vehicles.length > 0) {
      const tableData = data.vehicles.map((vehicle: any, index: number) => [
        index + 1,
        vehicle.ownerName,
        vehicle.licensePlate,
        vehicle.testNumber,
        vehicle.chassisNumber,
        vehicle.engineNumber,
        `${vehicle.brand} ${vehicle.type}`,
      ])

      autoTable(doc, {
        startY: 200,
        head: [["No", "Pemilik", "No. Polisi", "No. Uji", "No. Rangka", "No. Mesin", "Merk/Type"]],
        body: tableData,
        theme: "grid",
        styles: { fontSize: 8 },
      })
    }

    // Closing
    const finalY = (doc as any).lastAutoTable?.finalY || 220
    doc.text("Demikian surat rekomendasi ini dibuat untuk dapat dipergunakan sebagaimana mestinya.", 20, finalY + 20, {
      maxWidth: 170,
    })

    // Signature
    doc.text("Kudus, " + new Date().toLocaleDateString("id-ID"), 130, finalY + 50)
    doc.text("Kepala Dinas Perhubungan", 130, finalY + 60)
    doc.text("Kabupaten Kudus", 130, finalY + 70)

    return doc
  }

  // Generate Application Report PDF
  static generateApplicationReport(applications: any[]): jsPDF {
    const doc = new jsPDF()

    // Header
    doc.setFontSize(16)
    doc.setFont("helvetica", "bold")
    doc.text("LAPORAN PERMOHONAN", 105, 20, { align: "center" })
    doc.text("SISTEM MANAJEMEN KENDARAAN", 105, 30, { align: "center" })

    // Date
    doc.setFontSize(12)
    doc.setFont("helvetica", "normal")
    doc.text(`Tanggal Cetak: ${new Date().toLocaleDateString("id-ID")}`, 20, 50)

    // Summary
    const totalApplications = applications.length
    const approved = applications.filter((app) => app.status === "approved").length
    const pending = applications.filter((app) => app.status === "pending").length
    const rejected = applications.filter((app) => app.status === "rejected").length

    doc.text("RINGKASAN:", 20, 70)
    doc.text(`Total Permohonan: ${totalApplications}`, 30, 80)
    doc.text(`Disetujui: ${approved}`, 30, 90)
    doc.text(`Pending: ${pending}`, 30, 100)
    doc.text(`Ditolak: ${rejected}`, 30, 110)

    // Applications table
    const tableData = applications.map((app, index) => [
      index + 1,
      new Date(app.application_date || app.created_at).toLocaleDateString("id-ID"),
      this.getTypeLabel(app.type),
      app.applicant_name,
      app.company?.name || app.companies?.name || "-",
      this.getStatusLabel(app.status),
    ])

    autoTable(doc, {
      startY: 130,
      head: [["No", "Tanggal", "Jenis", "Pemohon", "Perusahaan", "Status"]],
      body: tableData,
      theme: "grid",
      styles: { fontSize: 9 },
    })

    return doc
  }

  // Helper methods
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

  private static getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      pending: "Pending",
      approved: "Disetujui",
      rejected: "Ditolak",
    }
    return labels[status] || status
  }

  // Save PDF
  static savePDF(doc: jsPDF, filename: string): void {
    doc.save(filename)
  }

  // Get PDF as blob
  static getPDFBlob(doc: jsPDF): Blob {
    return doc.output("blob")
  }

  // Get PDF as base64
  static getPDFBase64(doc: jsPDF): string {
    return doc.output("datauristring")
  }
}
