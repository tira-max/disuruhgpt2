"use client"

import type React from "react"

import { Dialog } from "@radix-ui/react-dialog"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FileText, Upload, Car } from "lucide-react"

export default function KartuPengawasanPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    // Data Perusahaan
    companyName: "",
    companyAddress: "",
    village: "",
    rt: "",
    rw: "",
    district: "",

    // Data Kendaraan
    licensePlate: "",
    testNumber: "",
    passengerCapacity: "",
    cargoCapacity: "",
    brand: "",
    yearMade: "",
    hullNumber: "",

    // Data Trayek
    routeDescription: "",
    validFrom: "",
    validUntil: "",

    // Nomor Kartu
    cardNumber: "",

    notes: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      // Simulasi submit
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSuccess("Kartu Pengawasan berhasil dibuat!")

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
          <h1 className="text-3xl font-bold text-gray-900">Kartu Pengawasan</h1>
          <p className="text-gray-600">
            Form pembuatan Kartu Pengawasan untuk mengangkut penumpang dengan mobil bus umum
          </p>
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

          {/* Nomor Kartu */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Nomor Kartu Pengawasan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Nomor Kartu Pengawasan *</Label>
                <Input
                  id="cardNumber"
                  name="cardNumber"
                  placeholder="551.11.8.1/0236/19.02/2024"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                />
              </div>
            </CardContent>
          </Card>

          {/* Data Perusahaan */}
          <Card>
            <CardHeader>
              <CardTitle>Data Perusahaan</CardTitle>
              <CardDescription>Informasi lengkap perusahaan pengangkutan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Nama Perusahaan *</Label>
                <Input
                  id="companyName"
                  name="companyName"
                  placeholder="PT. Kudus Indah Jaya"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="village">Desa *</Label>
                  <Input
                    id="village"
                    name="village"
                    placeholder="Getaspejaten"
                    value={formData.village}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rt">RT *</Label>
                  <Input
                    id="rt"
                    name="rt"
                    placeholder="01"
                    value={formData.rt}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rw">RW *</Label>
                  <Input
                    id="rw"
                    name="rw"
                    placeholder="01"
                    value={formData.rw}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="district">Kecamatan *</Label>
                <Input
                  id="district"
                  name="district"
                  placeholder="Jati Kudus"
                  value={formData.district}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyAddress">Alamat Lengkap *</Label>
                <Textarea
                  id="companyAddress"
                  name="companyAddress"
                  placeholder="Alamat lengkap perusahaan"
                  value={formData.companyAddress}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          {/* Data Kendaraan */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="h-5 w-5" />
                Data Kendaraan
              </CardTitle>
              <CardDescription>Informasi detail kendaraan bus umum</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="licensePlate">Tanda Nomor Kendaraan *</Label>
                  <Input
                    id="licensePlate"
                    name="licensePlate"
                    placeholder="K-1396-OB"
                    value={formData.licensePlate}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="testNumber">Nomor Uji Kendaraan *</Label>
                  <Input
                    id="testNumber"
                    name="testNumber"
                    placeholder="KS. 11737"
                    value={formData.testNumber}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="passengerCapacity">Daya Angkut Penumpang (orang) *</Label>
                  <Input
                    id="passengerCapacity"
                    name="passengerCapacity"
                    type="number"
                    placeholder="13"
                    value={formData.passengerCapacity}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cargoCapacity">Daya Angkut Barang (Kg) *</Label>
                  <Input
                    id="cargoCapacity"
                    name="cargoCapacity"
                    type="number"
                    placeholder="120"
                    value={formData.cargoCapacity}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="brand">Merk Pabrik *</Label>
                  <Input
                    id="brand"
                    name="brand"
                    placeholder="Suzuki"
                    value={formData.brand}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="yearMade">Tahun Pembuatan *</Label>
                  <Input
                    id="yearMade"
                    name="yearMade"
                    type="number"
                    placeholder="2006"
                    value={formData.yearMade}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="hullNumber">Nomor Lambung</Label>
                <Input
                  id="hullNumber"
                  name="hullNumber"
                  placeholder="57"
                  value={formData.hullNumber}
                  onChange={handleInputChange}
                  disabled={loading}
                />
              </div>
            </CardContent>
          </Card>

          {/* Data Trayek */}
          <Card>
            <CardHeader>
              <CardTitle>Data Trayek</CardTitle>
              <CardDescription>Informasi rute dan masa berlaku</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="routeDescription">Deskripsi Trayek *</Label>
                <Textarea
                  id="routeDescription"
                  name="routeDescription"
                  placeholder="Term.Jati – RA Kusumadya – Lukmonohadi – M.Basuno – Niti Semito – H.M Subchan ZE – JL.Kudus Jepara – Term Jetak // Term.Jetak – JL.Kudus Jepara – Sunan Kudus – P Puger – Veteran - Sunan Muria – Gatot Subroto – A.Yani – Term Getas Pejaten – R.A Kusumadya – Tanjung Karang - Sukarno Hatta – Term Jati"
                  value={formData.routeDescription}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="validFrom">Berlaku Mulai Tanggal *</Label>
                  <Input
                    id="validFrom"
                    name="validFrom"
                    type="date"
                    value={formData.validFrom}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="validUntil">Berlaku Sampai Tanggal *</Label>
                  <Input
                    id="validUntil"
                    name="validUntil"
                    type="date"
                    value={formData.validUntil}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                  />
                </div>
              </div>
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
              <CardTitle>Dokumen Pendukung</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="file">Upload Dokumen</Label>
                <div className="flex items-center gap-4">
                  <Input id="file" type="file" accept=".pdf,.jpg,.jpeg,.png" disabled={loading} className="flex-1" />
                  <Upload className="h-5 w-5 text-gray-400" />
                </div>
                <p className="text-sm text-gray-500">Format: PDF, JPG, PNG. Maksimal 5MB</p>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? "Menyimpan..." : "Buat Kartu Pengawasan"}
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
