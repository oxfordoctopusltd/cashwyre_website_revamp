"use client"
import { useState, useEffect } from "react"
import FloatingNav from "./FloatingNav"

export default function ClientFloatingNav() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Render immediately to prevent layout shift, but ensure we suppress hydration warnings
  return <FloatingNav />
}