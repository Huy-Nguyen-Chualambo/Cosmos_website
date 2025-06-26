"use client"
import React, { useEffect, useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet"
import { Menu, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useRouter } from 'next/navigation'
import { useUser } from '@/hooks/useUser'

const navItems = [
  {
    title: "Overview",
    href: "/dashboard",
  },
  {
    title: "Explore",
    href: "/dashboard/explore",
  },
  {
    title: "Bookmarks",
    href: "/dashboard/bookmarks",
  },
]

const userNavItems = [
  {
    title: "Profile",
    href: "/dashboard/profile",
  },
  {
    title: "Help",
    href: "/dashboard/help",
  },
]

const NavbarInapp = () => {
  const { user, loading } = useUser();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/auth/login');
  };

  return (
    <div className='px-2 sm:px-4 py-2 sm:py-3 z-50 bg-white/10 backdrop-blur-md sticky top-0 left-0 right-0 flex justify-between items-center text-white shadow-lg'>
      {/* Left side - Logo and Menu */}
      <div className='flex items-center gap-2 sm:gap-3'>
        {/* Menu Button - Visible on all screens */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="hover:bg-white/5 text-white">
              <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] sm:w-[350px] lg:w-[400px] p-4 sm:p-6 bg-black/50 backdrop-blur-lg text-white border-white/10">
            <SheetHeader>
              <SheetTitle className="text-white"></SheetTitle>
              <div className="flex items-center gap-2 px-2">
                <img src="/planet-svgrepo-com.svg" alt="Logo" className="w-7 h-7 sm:w-8 sm:h-8 filter brightness-0 invert" />
                <span className="text-white text-lg sm:text-xl font-bold">Cosmos</span>
              </div>
            </SheetHeader>
            
            {/* Main Navigation */}
            <nav className="flex flex-col gap-2 mt-6 sm:mt-8">
              <div className="px-4 py-2">
                <h2 className="text-xs uppercase text-white/50 font-semibold tracking-wide">
                  Main
                </h2>
              </div>
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-3 sm:px-4 py-2 text-sm rounded-lg hover:bg-white/5 transition-colors",
                    "text-white/70 hover:text-white"
                  )}
                >
                  {item.title}
                </Link>
              ))}
            </nav>

            {/* User Navigation */}
            <nav className="flex flex-col gap-2 mt-4 sm:mt-6">
              <div className="px-4 py-2">
                <h2 className="text-xs uppercase text-white/50 font-semibold tracking-wide">
                  Settings
                </h2>
              </div>
              {userNavItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-3 sm:px-4 py-2 text-sm rounded-lg hover:bg-white/5 transition-colors",
                    "text-white/70 hover:text-white"
                  )}
                >
                  {item.title}
                </Link>
              ))}
            </nav>

            {/* Mobile Only - User Profile in Sidebar */}
            <div className="block sm:hidden mt-6 pt-6 border-t border-white/10">
              <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/5">
                <div className="rounded-full w-8 h-8 bg-white/20 flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user?.name ? user.name.charAt(0).toUpperCase() : "G"}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium">{user?.name || "Guest User"}</p>
                  <p className="text-xs text-white/50">{user?.email || "guest@example.com"}</p>
                </div>
              </div>
              <Button 
                onClick={handleLogout}
                variant="ghost" 
                className="w-full mt-2 text-red-400 hover:text-red-300 hover:bg-red-500/20">
                Log out
              </Button>
            </div>
          </SheetContent>
        </Sheet>

        {/* Logo and Title */}
        <div className="flex items-center gap-2">
          <img src="/planet-svgrepo-com.svg" alt="Logo" className="w-6 h-6 sm:w-8 sm:h-8 filter brightness-0 invert" />
          <span className="text-white text-base sm:text-xl font-bold xs:block">Cosmos</span>
        </div>
      </div>

      {/* Right side - User Profile */}
      <div className="flex items-center gap-2">
        {/* User Menu - Hidden on mobile, shown on sm and up */}
        <div className="hidden sm:block">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-white/5 text-white">
                <User className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="sr-only">User menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[350px] lg:w-[400px] p-4 sm:p-6 bg-black/50 backdrop-blur-lg text-white border-white/10">
              <SheetHeader>
                <SheetTitle className="text-white">User Profile</SheetTitle>
                <div className="flex items-center gap-4 px-2">
                  <div className="rounded-full w-10 h-10 bg-white/20 flex items-center justify-center">
                    <span className="text-white text-lg font-medium">
                      {user?.name ? user.name.charAt(0).toUpperCase() : "G"}
                    </span>
                  </div>
                  <div>
                    {loading ? (
                      <>
                        <p className="text-sm font-medium">Loading...</p>
                        <p className="text-xs text-white/50">&nbsp;</p>
                      </>
                    ) : user ? (
                      <>
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-white/50">{user.email}</p>
                      </>
                    ) : (
                      <>
                        <p className="text-sm font-medium">Guest User</p>
                        <p className="text-xs text-white/50">guest@example.com</p>
                      </>
                    )}
                  </div>
                </div>
              </SheetHeader>

              <nav className="flex flex-col gap-2 mt-4">
                {userNavItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 text-sm rounded-lg hover:bg-white/5 transition-colors",
                      "text-white/70 hover:text-white"
                    )}
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>

              <Button 
                onClick={handleLogout}
                variant="ghost" 
                className="mt-4 text-red-400 hover:text-red-300 hover:bg-red-500/20">
                Log out
              </Button>
            </SheetContent>
          </Sheet>
        </div>

        {/* Mobile User Button - Shown on mobile only */}
        <Button variant="ghost" size="icon" className="block sm:hidden hover:bg-white/5 text-white">
          <User className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}

export default NavbarInapp