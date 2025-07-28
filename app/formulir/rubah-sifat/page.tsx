"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FileText, Upload, Car, Plus, Trash2 } from "lucide-react"

interface VehicleData {
  id: string
  ownerName: string
  licensePlate: string
  testNumber: string
  chassisNumber: string
  engineNumber: string
  year: string
  brand: string
  type: string
  notes: string
}

export default function RubahSifatPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    // Data Pemohon
    applicantName: "",
    companyName: "",
    address: "",

    // Data Surat
    letterNumber: "",
    applicationDate: "",

    // Jenis Perubahan
    changeType: "",
    changeReason: "",

    // Dokumen yang dilampirkan
    hasNIB: false,
    hasCertificate: false,
    hasSTNK: false,
    hasKIR: false,
    hasTransportLicense: false,

    notes: "",
  })

  const [vehicles, setVehicles] = useState<VehicleData[]>([
    {
      id: "1",
      ownerName: "",
      licensePlate: "",
      testNumber: "",
      chassisNumber: "",
      engineNumber: "",
      year: "",
      brand: "",
      type: "",
      notes: "",
    },
  ])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleVehicleChange = (id: string, field: string, value: string) => {
    setVehicles((prev) => prev.map((vehicle) => (vehicle.id === id ? { ...vehicle, [field]: value } : vehicle)))
  }

  const addVehicle = () => {
    const newVehicle: VehicleData = {
      id: Date.now().toString(),
      ownerName: "",
      licensePlate: "",
      testNumber: "",
      chassisNumber: "",
      engineNumber: "",
      year: "",
      brand: "",
      type: "",
      notes: "",
    }
    setVehicles((prev) => [...prev, newVehicle])
  }

  const removeVehicle = (id: string) => {
    if (vehicles.length > 1) {
      setVehicles((prev) => prev.filter((vehicle) => vehicle.id !== id))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      // Simulasi submit
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSuccess("Permohonan rubah sifat berhasil disubmit!")

      setTimeout(() => {
        router.push("/rekap")
      }, 2000)
    } catch (err) {
      setError("Terjadi kesalahan saat menyimpan data")
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Surat Rekomendasi Rubah Sifat</h1>
          <p className="text-gray-600">Permohonan perubahan sifat kendaraan angkutan penumpang/barang umum</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="border-green-200 bg-green-50">
              <AlertDescription className="text-green-800">{success}</AlertDescription>
            </Alert>
          )}

          {/* Data Surat */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Data Surat Rekomendasi
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="letterNumber">Nomor Surat *</Label>
                  <Input
                    id="letterNumber"
                    name="letterNumber"
                    placeholder="500.11.8.1/          /2024"
                    value={formData.letterNumber}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="applicationDate">Tanggal Permohonan *</Label>
                  <Input
                    id="applicationDate"
                    name="applicationDate"
                    type="date"
                    value={formData.applicationDate}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Pemohon */}
          <Card>
            <CardHeader>
              <CardTitle>Data Pemohon</CardTitle>
              <CardDescription>Informasi lengkap pemohon rubah sifat</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="applicantName">Nama Pemohon *</Label>
                <Input
                  id="applicantName"
                  name="applicantName"
                  placeholder="Nama lengkap pemohon"
                  value={formData.applicantName}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyName">Nama Perusahaan *</Label>
                <Input
                  id="companyName"
                  name="companyName"
                  placeholder="Nama perusahaan"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Alamat *</Label>
                <Textarea
                  id="address"
                  name="address"
                  placeholder="Alamat lengkap perusahaan"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          {/* Jenis Perubahan */}
          <Card>
            <CardHeader>
              <CardTitle>Jenis Perubahan Sifat</CardTitle>
              <CardDescription>Tentukan jenis perubahan yang dimohonkan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="changeType">Jenis Perubahan *</Label>
                <Input
                  id="changeType"
                  name="changeType"
                  placeholder="Contoh: Perubahan dari angkutan barang ke penumpang"
                  value={formData.changeType}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="changeReason">Alasan Perubahan *</Label>
                <Textarea
                  id="changeReason"
                  name="changeReason"
                  placeholder="Jelaskan alasan perubahan sifat kendaraan"
                  value={formData.changeReason}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Dokumen yang Dilampirkan */}
          <Card>
            <CardHeader>
              <CardTitle>Dokumen yang Dilampirkan</CardTitle>
              <CardDescription>Centang dokumen yang disertakan dalam permohonan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="hasNIB"
                    name="hasNIB"
                    checked={formData.hasNIB}
                    onChange={handleInputChange}
                    disabled={loading}
                    className="rounded"
                  />
                  <Label htmlFor="hasNIB">NIB (Nomor Induk Berusaha)</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="hasCertificate"
                    name="hasCertificate"
                    checked={formData.hasCertificate}
                    onChange={handleInputChange}
                    disabled={loading}
                    className="rounded"
                  />
                  <Label htmlFor="hasCertificate">Sertifikat Standar Terverifikasi</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="hasSTNK"
                    name="hasSTNK"
                    checked={formData.hasSTNK}
                    onChange={handleInputChange}
                    disabled={loading}
                    className="rounded"
                  />
                  <Label htmlFor="hasSTNK">STNK</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="hasKIR"
                    name="hasKIR"
                    checked={formData.hasKIR}
                    onChange={handleInputChange}
                    disabled={loading}
                    className="rounded"
                  />
                  <Label htmlFor="hasKIR">KIR (Kartu Identitas Kendaraan)</Label>
                </div>

                <div className="flex items-center space-x-2 md:col-span-2">
                  <input
                    type="checkbox"
                    id="hasTransportLicense"
                    name="hasTransportLicense"
                    checked={formData.hasTransportLicense}
                    onChange={handleInputChange}
                    disabled={loading}
                    className="rounded"
                  />
                  <Label htmlFor="hasTransportLicense">Izin Penyelenggaraan Angkutan yang masih berlaku</Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Kendaraan */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Car className="h-5 w-5" />
                  Data Kendaraan
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addVehicle}
                  disabled={loading}
                  className="flex items-center gap-2 bg-transparent"
                >
                  <Plus className="h-4 w-4" />
                  Tambah Kendaraan
                </Button>
              </CardTitle>
              <CardDescription>Data kendaraan yang akan dirubah sifatnya</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {vehicles.map((vehicle, index) => (
                <div key={vehicle.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Kendaraan {index + 1}</h4>
                    {vehicles.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeVehicle(vehicle.id)}
                        disabled={loading}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Nama Kepemilikan Kendaraan *</Label>
                      <Input
                        placeholder="Nama pemilik kendaraan"
                        value={vehicle.ownerName}
                        onChange={(e) => handleVehicleChange(vehicle.id, "ownerName", e.target.value)}
                        required
                        disabled={loading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>No. Polisi *</Label>
                      <Input
                        placeholder="K-1050-CB"
                        value={vehicle.licensePlate}
                        onChange={(e) => handleVehicleChange(vehicle.id, "licensePlate", e.target.value)}
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>No. Uji *</Label>
                      <Input
                        placeholder="SM. 70084"
                        value={vehicle.testNumber}
                        onChange={(e) => handleVehicleChange(vehicle.id, "testNumber", e.target.value)}
                        required
                        disabled={loading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>No. Rangka *</Label>
                      <Input
                        placeholder="MHYESL4154J553510"
                        value={vehicle.chassisNumber}
                        onChange={(e) => handleVehicleChange(vehicle.id, "chassisNumber", e.target.value)}
                        required
                        disabled={loading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>No. Mesin *</Label>
                      <Input
                        placeholder="G15AIA553510"
                        value={vehicle.engineNumber}
                        onChange={(e) => handleVehicleChange(vehicle.id, "engineNumber", e.target.value)}
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Tahun Kendaraan *</Label>
                      <Input
                        type="number"
                        placeholder="2004"
                        value={vehicle.year}
                        onChange={(e) => handleVehicleChange(vehicle.id, "year", e.target.value)}
                        required
                        disabled={loading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Merk *</Label>
                      <Input
                        placeholder="Suzuki"
                        value={vehicle.brand}
                        onChange={(e) => handleVehicleChange(vehicle.id, "brand", e.target.value)}
                        required
                        disabled={loading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Type *</Label>
                      <Input
                        placeholder="ST150 - FUTURA"
                        value={vehicle.type}
                        onChange={(e) => handleVehicleChange(vehicle.id, "type", e.target.value)}
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Keterangan</Label>
                    <Input
                      placeholder="Keterangan tambahan (opsional)"
                      value={vehicle.notes}
                      onChange={(e) => handleVehicleChange(vehicle.id, "notes", e.target.value)}
                      disabled={loading}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Catatan */}
          <Card>
            <CardHeader>
              <CardTitle>Catatan Tambahan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="notes">Catatan</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  placeholder="Catatan tambahan (opsional)"
                  value={formData.notes}
                  onChange={handleInputChange}
                  disabled={loading}
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          {/* Upload Dokumen */}
          <Card>
            <CardHeader>
              <CardTitle>Upload Dokumen Pendukung</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="file">Upload Dokumen</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="file"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    disabled={loading}
                    className="flex-1"
                    multiple
                  />
                  <Upload className="h-5 w-5 text-gray-400" />
                </div>
                <p className="text-sm text-gray-500">Format: PDF, JPG, PNG. Maksimal 5MB per file</p>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? "Menyimpan..." : "Submit Permohonan Rubah Sifat"}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()} disabled={loading}>
              Batal
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  )
}
