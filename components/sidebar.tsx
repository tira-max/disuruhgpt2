"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Car,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  Home,
  ClipboardList,
  FileBarChart,
  CreditCard,
} from "lucide-react"
import { AuthClient } from "@/lib/auth-client"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  {
    name: "Rekomendasi",
    href: "/formulir",
    icon: FileText,
    children: [
      { name: "Kendaraan Baru", href: "/formulir/kendaraan-baru" },
      { name: "Mutasi", href: "/formulir/mutasi" },
      { name: "Ganti TNKB", href: "/formulir/ganti-tnkb" },
      { name: "Rubah Sifat", href: "/formulir/rubah-sifat" },
    ],
  },
  { name: "Kartu Pengawasan", href: "/app/kartu-pengawasan", icon: CreditCard },
  { name: "Rekap", href: "/rekap", icon: ClipboardList },
  { name: "Laporan", href: "/laporan", icon: FileBarChart },
]

interface SidebarProps {
  user: any
}

export const Sidebar: React.FC<{ user: { name: string; email: string } }> = ({ user }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const router = useRouter()

  const toggleExpanded = (name: string) => {
    setExpandedItems((prev) => (prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]))
  }

  const handleLogout = async () => {
    try {
      await AuthClient.logout()
      router.replace("/login")
    } catch (error) {
      console.error("Logout error:", error)
      router.replace("/login")
    }
  }

  return (
    <>
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col flex-grow bg-white border-r border-gray-200 pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <Car className="h-8 w-8 text-blue-600" />
              <h1 className="ml-2 text-xl font-semibold text-gray-900">SAMSAT</h1>
            </div>
            <SidebarContent
              navigation={navigation}
              expandedItems={expandedItems}
              toggleExpanded={toggleExpanded}
              user={user}
              handleLogout={handleLogout}
            />
          </div>
        </div>
      </div>
    </>
  )
}

function SidebarContent({
  navigation,
  expandedItems,
  toggleExpanded,
  user,
  handleLogout,
}: {
  navigation: any[]
  expandedItems: string[]
  toggleExpanded: (name: string) => void
  user: any
  handleLogout: () => void
}) {
  return (
    <div className="mt-5 flex-grow flex flex-col">
      <div className="flex-1 px-2 space-y-1">
        {navigation.map((item) => (
          <div key={item.name}>
            {item.children ? (
              <div>
                <button
                  onClick={() => toggleExpanded(item.name)}
                  className="w-full group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                  <svg
                    className={`ml-auto h-4 w-4 transform transition-transform ${
                      expandedItems.includes(item.name) ? "rotate-90" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                {expandedItems.includes(item.name) && (
                  <div className="ml-8 space-y-1">
                    {item.children.map((child: any) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                href={item.href}
                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            )}
          </div>
        ))}
      </div>
      <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start p-0 h-auto">
              <div className="flex items-center w-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{user?.name?.charAt(0)?.toUpperCase() || "U"}</AvatarFallback>
                </Avatar>
                <div className="ml-3 text-left">
                  <p className="text-sm font-medium text-gray-700">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
