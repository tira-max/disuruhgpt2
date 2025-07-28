"use client"

import type React from "react"
import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

export default function GantiTNKBPage() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    // Data Pemohon
    companyName: "",
    companyAddress: "",
    contactPerson: "",
    phoneNumber: "",

    // Data Kendaraan
    plateNumber: "",
    testNumber: "",
    chassisNumber: "",
    engineNumber: "",
    vehicleYear: "",
    brand: "",
    model: "",

    // Dokumen Pendukung
    nibNumber: "",
    certificateNumber: "",

    // Alasan Ganti TNKB
    replacementReason: "",
    notes: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      toast.success("Formulir ganti TNKB berhasil disimpan!")

      setFormData({
        companyName: "",
        companyAddress: "",
        contactPerson: "",
        phoneNumber: "",
        plateNumber: "",
        testNumber: "",
        chassisNumber: "",
        engineNumber: "",
        vehicleYear: "",
        brand: "",
        model: "",
        nibNumber: "",
        certificateNumber: "",
        replacementReason: "",
        notes: "",
      })
    } catch (error) {
      toast.error("Gagal menyimpan formulir")
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Formulir Ganti TNKB</h1>
          <p className="text-gray-600">Surat Rekomendasi Ganti TNKB/Perpanjangan STNK Angkutan Barang Umum</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Surat Rekomendasi Ganti TNKB/Perpanjangan STNK</CardTitle>
            <CardDescription>
              Berdasarkan format resmi Dinas Perhubungan Kabupaten Kudus - Nomor: 500.11.8.1/____/2024
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Data Pemohon/Perusahaan */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Data Pemohon/Perusahaan</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Nama Perusahaan *</Label>
                    <Input
                      id="companyName"
                      value={formData.companyName}
                      onChange={(e) => handleInputChange("companyName", e.target.value)}
                      placeholder="PT. Kuba Jaya Haji Imam"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactPerson">Nama Penanggung Jawab *</Label>
                    <Input
                      id="contactPerson"
                      value={formData.contactPerson}
                      onChange={(e) => handleInputChange("contactPerson", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">No. Telepon *</Label>
                    <Input
                      id="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2 mt-4">
                  <Label htmlFor="companyAddress">Alamat Perusahaan *</Label>
                  <Textarea
                    id="companyAddress"
                    value={formData.companyAddress}
                    onChange={(e) => handleInputChange("companyAddress", e.target.value)}
                    placeholder="Alamat lengkap perusahaan"
                    required
                  />
                </div>
              </div>

              {/* Data Kendaraan */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Data Kendaraan</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="plateNumber">Nomor Polisi *</Label>
                    <Input
                      id="plateNumber"
                      value={formData.plateNumber}
                      onChange={(e) => handleInputChange("plateNumber", e.target.value)}
                      placeholder="K-1050-CB"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="testNumber">Nomor Uji *</Label>
                    <Input
                      id="testNumber"
                      value={formData.testNumber}
                      onChange={(e) => handleInputChange("testNumber", e.target.value)}
                      placeholder="SM. 70084"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="chassisNumber">No. Rangka *</Label>
                    <Input
                      id="chassisNumber"
                      value={formData.chassisNumber}
                      onChange={(e) => handleInputChange("chassisNumber", e.target.value)}
                      placeholder="MHYESL4154J553510"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="engineNumber">No. Mesin *</Label>
                    <Input
                      id="engineNumber"
                      value={formData.engineNumber}
                      onChange={(e) => handleInputChange("engineNumber", e.target.value)}
                      placeholder="G15AIA553510"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vehicleYear">Tahun Kendaraan *</Label>
                    <Input
                      id="vehicleYear"
                      type="number"
                      value={formData.vehicleYear}
                      onChange={(e) => handleInputChange("vehicleYear", e.target.value)}
                      placeholder="2004"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="brand">Merk *</Label>
                    <Input
                      id="brand"
                      value={formData.brand}
                      onChange={(e) => handleInputChange("brand", e.target.value)}
                      placeholder="Suzuki"
                      required
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="model">Type *</Label>
                    <Input
                      id="model"
                      value={formData.model}
                      onChange={(e) => handleInputChange("model", e.target.value)}
                      placeholder="ST150 - FUTURA"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Dokumen Pendukung */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Dokumen Pendukung</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nibNumber">Nomor NIB *</Label>
                    <Input
                      id="nibNumber"
                      value={formData.nibNumber}
                      onChange={(e) => handleInputChange("nibNumber", e.target.value)}
                      placeholder="Nomor Induk Berusaha"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="certificateNumber">No. Sertifikat Standar Terverifikasi *</Label>
                    <Input
                      id="certificateNumber"
                      value={formData.certificateNumber}
                      onChange={(e) => handleInputChange("certificateNumber", e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Dokumen yang harus dilampirkan:</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• NIB (Nomor Induk Berusaha)</li>
                    <li>• Sertifikat Standar Terverifikasi</li>
                    <li>• STNK</li>
                    <li>• KIR (Kartu Identitas Kendaraan)</li>
                    <li>• Izin Penyelenggaraan Angkutan yang masih berlaku</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="replacementReason">Alasan Penggantian/Perpanjangan *</Label>
                <Textarea
                  id="replacementReason"
                  value={formData.replacementReason}
                  onChange={(e) => handleInputChange("replacementReason", e.target.value)}
                  placeholder="Jelaskan alasan penggantian TNKB atau perpanjangan STNK..."
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Catatan Tambahan</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  placeholder="Catatan atau keterangan tambahan..."
                />
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Catatan:</strong> Surat keterangan ini berlaku selama 3 (tiga) bulan sejak tanggal
                  dikeluarkan. Untuk keperluan pengurusan Regristasi dan Identifikasi angkutan barang umum ganti TNKB
                  dan perpanjangan STNK.
                </p>
              </div>

              <div className="flex gap-4 pt-6">
                <Button type="submit" disabled={loading}>
                  {loading ? "Menyimpan..." : "Ajukan Rekomendasi"}
                </Button>
                <Button type="button" variant="outline">
                  Reset
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
