"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, FileText, BarChart3, Car, Building, TrendingUp, Filter, Eye, Printer } from "lucide-react"

// Mock data untuk laporan
const mockReportData = {
  summary: {
    totalApplications: 156,
    approvedApplications: 98,
    pendingApplications: 35,
    rejectedApplications: 23,
    totalVehicles: 245,
    totalCompanies: 28,
  },
  monthlyData: [
    { month: "Jan", applications: 12, approved: 8, pending: 3, rejected: 1 },
    { month: "Feb", applications: 15, approved: 10, pending: 4, rejected: 1 },
    { month: "Mar", applications: 18, approved: 12, pending: 4, rejected: 2 },
    { month: "Apr", applications: 14, approved: 9, pending: 3, rejected: 2 },
    { month: "May", applications: 20, approved: 15, pending: 3, rejected: 2 },
    { month: "Jun", applications: 16, approved: 11, pending: 3, rejected: 2 },
  ],
  applicationsByType: [
    { type: "Ganti TNKB", count: 45, percentage: 28.8 },
    { type: "Mutasi", count: 38, percentage: 24.4 },
    { type: "Kendaraan Baru", count: 32, percentage: 20.5 },
    { type: "Rubah Sifat", count: 25, percentage: 16.0 },
    { type: "Kartu Pengawasan", count: 16, percentage: 10.3 },
  ],
  vehiclesByBrand: [
    { brand: "Toyota", count: 45 },
    { brand: "Suzuki", count: 38 },
    { brand: "Mitsubishi", count: 32 },
    { brand: "Isuzu", count: 28 },
    { brand: "Hino", count: 22 },
  ],
  expiringLicenses: [
    { company: "PT. Kudus Indah Jaya", license: "Izin Trayek", expiry: "2024-03-15", status: "warning" },
    { company: "CV. Trans Muria", license: "KIR", expiry: "2024-02-28", status: "danger" },
    { company: "PT. Angkutan Sejahtera", license: "STNK", expiry: "2024-04-10", status: "warning" },
  ],
}

export default function LaporanPage() {
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [reportType, setReportType] = useState("all")
  const [companyFilter, setCompanyFilter] = useState("all")

  const handleExportExcel = (reportName: string) => {
    alert(`Export Excel untuk ${reportName} akan diimplementasi`)
  }

  const handleExportPDF = (reportName: string) => {
    alert(`Export PDF untuk ${reportName} akan diimplementasi`)
  }

  const handlePrint = (reportName: string) => {
    alert(`Print ${reportName} akan diimplementasi`)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Laporan</h1>
          <p className="text-gray-600">Berbagai jenis laporan dan analisis data sistem</p>
        </div>

        {/* Filter Global */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filter Laporan
            </CardTitle>
            <CardDescription>Filter data berdasarkan periode dan kriteria tertentu</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dateFrom">Dari Tanggal</Label>
                <Input id="dateFrom" type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateTo">Sampai Tanggal</Label>
                <Input id="dateTo" type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Jenis Laporan</Label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih jenis laporan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Laporan</SelectItem>
                    <SelectItem value="applications">Permohonan</SelectItem>
                    <SelectItem value="vehicles">Kendaraan</SelectItem>
                    <SelectItem value="companies">Perusahaan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Perusahaan</Label>
                <Select value={companyFilter} onValueChange={setCompanyFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih perusahaan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Perusahaan</SelectItem>
                    <SelectItem value="pt-kudus">PT. Kudus Indah Jaya</SelectItem>
                    <SelectItem value="cv-trans">CV. Trans Muria</SelectItem>
                    <SelectItem value="pt-sejahtera">PT. Angkutan Sejahtera</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="ringkasan" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="ringkasan">Ringkasan</TabsTrigger>
            <TabsTrigger value="permohonan">Permohonan</TabsTrigger>
            <TabsTrigger value="kendaraan">Kendaraan</TabsTrigger>
            <TabsTrigger value="perusahaan">Perusahaan</TabsTrigger>
            <TabsTrigger value="perizinan">Perizinan</TabsTrigger>
            <TabsTrigger value="grafik">Grafik</TabsTrigger>
          </TabsList>

          {/* Tab Ringkasan */}
          <TabsContent value="ringkasan" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Permohonan</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockReportData.summary.totalApplications}</div>
                  <p className="text-xs text-muted-foreground">+12% dari bulan lalu</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Disetujui</CardTitle>
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{mockReportData.summary.approvedApplications}</div>
                  <p className="text-xs text-muted-foreground">62.8% dari total</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Kendaraan</CardTitle>
                  <Car className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockReportData.summary.totalVehicles}</div>
                  <p className="text-xs text-muted-foreground">Terdaftar aktif</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Perusahaan</CardTitle>
                  <Building className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockReportData.summary.totalCompanies}</div>
                  <p className="text-xs text-muted-foreground">Perusahaan aktif</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Permohonan per Bulan</CardTitle>
                  <CardDescription>Data permohonan 6 bulan terakhir</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockReportData.monthlyData.map((data) => (
                      <div key={data.month} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{data.month}</span>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-600">{data.applications} total</span>
                          <div className="flex gap-1">
                            <Badge className="bg-green-100 text-green-800">{data.approved}</Badge>
                            <Badge className="bg-yellow-100 text-yellow-800">{data.pending}</Badge>
                            <Badge className="bg-red-100 text-red-800">{data.rejected}</Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Permohonan per Jenis</CardTitle>
                  <CardDescription>Distribusi jenis permohonan</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockReportData.applicationsByType.map((data) => (
                      <div key={data.type} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{data.type}</span>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-600">{data.count}</span>
                          <span className="text-sm text-gray-500">({data.percentage}%)</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex gap-4">
              <Button onClick={() => handleExportExcel("Ringkasan")} className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export Excel
              </Button>
              <Button
                variant="outline"
                onClick={() => handleExportPDF("Ringkasan")}
                className="flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                Export PDF
              </Button>
              <Button variant="outline" onClick={() => handlePrint("Ringkasan")} className="flex items-center gap-2">
                <Printer className="h-4 w-4" />
                Print
              </Button>
            </div>
          </TabsContent>

          {/* Tab Permohonan */}
          <TabsContent value="permohonan" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Laporan Permohonan</CardTitle>
                <CardDescription>Detail semua permohonan berdasarkan periode dan status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>No</TableHead>
                        <TableHead>Tanggal</TableHead>
                        <TableHead>Jenis</TableHead>
                        <TableHead>Pemohon</TableHead>
                        <TableHead>Perusahaan</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell>15/01/2024</TableCell>
                        <TableCell>Ganti TNKB</TableCell>
                        <TableCell>John Doe</TableCell>
                        <TableCell>PT. Kudus Indah Jaya</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800">Disetujui</Badge>
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                      {/* Add more rows as needed */}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button onClick={() => handleExportExcel("Laporan Permohonan")} className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export Excel
              </Button>
              <Button
                variant="outline"
                onClick={() => handleExportPDF("Laporan Permohonan")}
                className="flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                Export PDF
              </Button>
            </div>
          </TabsContent>

          {/* Tab Kendaraan */}
          <TabsContent value="kendaraan" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Kendaraan per Merk</CardTitle>
                  <CardDescription>Distribusi kendaraan berdasarkan merk</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockReportData.vehiclesByBrand.map((data) => (
                      <div key={data.brand} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{data.brand}</span>
                        <span className="text-sm text-gray-600">{data.count} unit</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Status Kendaraan</CardTitle>
                  <CardDescription>Status operasional kendaraan</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Aktif</span>
                      <Badge className="bg-green-100 text-green-800">198 unit</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Maintenance</span>
                      <Badge className="bg-yellow-100 text-yellow-800">32 unit</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Non-Aktif</span>
                      <Badge className="bg-red-100 text-red-800">15 unit</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex gap-4">
              <Button onClick={() => handleExportExcel("Laporan Kendaraan")} className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export Excel
              </Button>
              <Button
                variant="outline"
                onClick={() => handleExportPDF("Laporan Kendaraan")}
                className="flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                Export PDF
              </Button>
            </div>
          </TabsContent>

          {/* Tab Perusahaan */}
          <TabsContent value="perusahaan" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Laporan Perusahaan</CardTitle>
                <CardDescription>Data perusahaan dan kepemilikan kendaraan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>No</TableHead>
                        <TableHead>Nama Perusahaan</TableHead>
                        <TableHead>Alamat</TableHead>
                        <TableHead>Jumlah Kendaraan</TableHead>
                        <TableHead>Status Izin</TableHead>
                        <TableHead>Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell>PT. Kudus Indah Jaya</TableCell>
                        <TableCell>Jati, Kudus</TableCell>
                        <TableCell>45 unit</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800">Aktif</Badge>
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                      {/* Add more rows */}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button onClick={() => handleExportExcel("Laporan Perusahaan")} className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export Excel
              </Button>
              <Button
                variant="outline"
                onClick={() => handleExportPDF("Laporan Perusahaan")}
                className="flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                Export PDF
              </Button>
            </div>
          </TabsContent>

          {/* Tab Perizinan */}
          <TabsContent value="perizinan" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Izin yang Akan Berakhir</CardTitle>
                <CardDescription>Daftar izin yang akan berakhir dalam 3 bulan ke depan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockReportData.expiringLicenses.map((license, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{license.company}</p>
                        <p className="text-sm text-gray-600">{license.license}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm">{license.expiry}</p>
                        <Badge
                          className={
                            license.status === "danger" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {license.status === "danger" ? "Segera Berakhir" : "Perlu Perhatian"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button onClick={() => handleExportExcel("Laporan Perizinan")} className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export Excel
              </Button>
              <Button
                variant="outline"
                onClick={() => handleExportPDF("Laporan Perizinan")}
                className="flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                Export PDF
              </Button>
            </div>
          </TabsContent>

          {/* Tab Grafik */}
          <TabsContent value="grafik" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Trend Permohonan</CardTitle>
                  <CardDescription>Grafik trend permohonan bulanan</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                      <p>Chart trend permohonan akan ditampilkan di sini</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Distribusi Status</CardTitle>
                  <CardDescription>Pie chart distribusi status permohonan</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                      <p>Pie chart distribusi status akan ditampilkan di sini</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex gap-4">
              <Button onClick={() => handleExportExcel("Laporan Grafik")} className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export Excel
              </Button>
              <Button
                variant="outline"
                onClick={() => handleExportPDF("Laporan Grafik")}
                className="flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                Export PDF
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
