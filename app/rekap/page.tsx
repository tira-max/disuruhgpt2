"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Search, Filter, FileText, Eye } from "lucide-react"

const mockApplications = [
  {
    id: 1,
    type: "ganti_tnkb",
    applicantName: "John Doe",
    licensePlate: "B 1234 ABC",
    date: "2024-01-15",
    status: "approved",
  },
  {
    id: 2,
    type: "mutasi",
    applicantName: "Jane Smith",
    licensePlate: "D 5678 XYZ",
    date: "2024-01-20",
    status: "pending",
  },
  {
    id: 3,
    type: "kendaraan_baru",
    applicantName: "Bob Wilson",
    licensePlate: "B 9999 DEF",
    date: "2024-01-25",
    status: "rejected",
  },
  {
    id: 4,
    type: "rubah_sifat",
    applicantName: "Alice Johnson",
    licensePlate: "A 1122 FGH",
    date: "2024-02-01",
    status: "approved",
  },
  {
    id: 5,
    type: "kartu_pengawasan",
    applicantName: "Charlie Brown",
    licensePlate: "C 3344 JKL",
    date: "2024-02-05",
    status: "pending",
  },
]

export default function RekapPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Disetujui</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Ditolak</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "ganti_tnkb":
        return "Ganti TNKB"
      case "mutasi":
        return "Mutasi"
      case "kendaraan_baru":
        return "Kendaraan Baru"
      case "rubah_sifat":
        return "Rubah Sifat"
      case "kartu_pengawasan":
        return "Kartu Pengawasan"
      default:
        return type
    }
  }

  const exportToExcel = () => {
    alert("Export Excel akan diimplementasi")
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Rekapitulasi Data</h1>
            <p className="text-gray-600">Data permohonan dan status pengajuan</p>
          </div>
          <Button onClick={exportToExcel} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Excel
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Filter & Pencarian
            </CardTitle>
            <CardDescription>Filter data berdasarkan kriteria tertentu</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Cari nama, nomor polisi..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Disetujui</SelectItem>
                  <SelectItem value="rejected">Ditolak</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter Jenis" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Jenis</SelectItem>
                  <SelectItem value="ganti_tnkb">Ganti TNKB</SelectItem>
                  <SelectItem value="mutasi">Mutasi</SelectItem>
                  <SelectItem value="kendaraan_baru">Kendaraan Baru</SelectItem>
                  <SelectItem value="rubah_sifat">Rubah Sifat</SelectItem>
                  <SelectItem value="kartu_pengawasan">Kartu Pengawasan</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setStatusFilter("all")
                  setTypeFilter("all")
                }}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Reset Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Data Permohonan</CardTitle>
            <CardDescription>Total {mockApplications.length} permohonan ditemukan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>No</TableHead>
                    <TableHead>Jenis Permohonan</TableHead>
                    <TableHead>Nama Pemohon</TableHead>
                    <TableHead>Nomor Polisi</TableHead>
                    <TableHead>Tanggal</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockApplications.map((app, index) => (
                    <TableRow key={app.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{getTypeLabel(app.type)}</TableCell>
                      <TableCell>{app.applicantName}</TableCell>
                      <TableCell>{app.licensePlate}</TableCell>
                      <TableCell>{new Date(app.date).toLocaleDateString("id-ID")}</TableCell>
                      <TableCell>{getStatusBadge(app.status)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <FileText className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
