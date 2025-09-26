"use client"
import { useState, useEffect } from "react"
import FloatingNav from "./FloatingNav"

export default function ClientFloatingNav() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Return a static nav placeholder during SSR
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="flex items-center justify-between max-w-7xl mx-auto px-6 py-4">
          <div className="w-[140px] h-[40px] bg-white/10 rounded-xl animate-pulse"></div>
          <div className="hidden lg:flex space-x-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-20 h-6 bg-white/10 rounded animate-pulse"></div>
            ))}
          </div>
          <div className="hidden lg:block w-32 h-12 bg-gradient-to-r from-[#FF6B35] to-[#FFA726] rounded-xl animate-pulse"></div>
        </div>
      </nav>
    )
  }

  return <FloatingNav />
}