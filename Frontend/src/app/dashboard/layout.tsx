import NavbarInapp from "../navbarInapp/page"
import StarsBg from "@/components/stars_bg"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      <StarsBg />
      <NavbarInapp />
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  )
} 