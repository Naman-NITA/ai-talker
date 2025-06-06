"use client"

import { UserButton } from "@clerk/nextjs"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const Header = () => {
  const path = usePathname()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavigation = (route) => {
    router.push(route)
    setMobileMenuOpen(false)
  }

  const navItems = [
    { label: "Dashboard", route: "/dashboard" },
    { label: "Questions", route: "/dashboard/questions" },
    { label: "Upgrade", route: "/dashboard/upgrade" },
    { label: "How it Works?", route: "/dashboard/how" },
  ]

  const navItem = (label, route) => (
    <li
      key={route}
      onClick={() => handleNavigation(route)}
      className={`cursor-pointer px-3 py-2 rounded-md transition-all duration-200 ${
        path === route
          ? "bg-blue-100 text-blue-700 font-semibold"
          : "hover:bg-gray-100 text-gray-700 hover:text-blue-600"
      }`}
    >
      {label}
    </li>
  )

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-white ${
        scrolled ? "shadow-md border-b border-gray-200" : "shadow-sm"
      } transition-all duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer" onClick={() => handleNavigation("/dashboard")}>
            <Image src="/logo.svg" width={140} height={40} alt="logo" className="h-8 w-auto sm:h-10" priority />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex">
            <ul className="flex space-x-1 items-center">{navItems.map((item) => navItem(item.label, item.route))}</ul>
          </nav>

          {/* User Button and Mobile Menu Toggle */}
          <div className="flex items-center gap-2">
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "h-8 w-8 sm:h-9 sm:w-9",
                },
              }}
            />

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <ul className="flex flex-col space-y-1 px-4 py-3">
            {navItems.map((item) => (
              <li
                key={item.route}
                onClick={() => handleNavigation(item.route)}
                className={`cursor-pointer px-3 py-3 rounded-md transition-all ${
                  path === item.route ? "bg-blue-100 text-blue-700 font-semibold" : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}

export default Header
