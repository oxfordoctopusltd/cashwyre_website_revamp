"use client"
import { motion } from "framer-motion"
import DownloadSection from "@/components/sections/Download"

export default function GetStarted() {
  return (
    <div className="min-h-screen pt-32 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto text-center mb-20"
      >
        <h1 className="text-5xl lg:text-7xl font-bold mb-6">
          Get <span className="gradient-text">Started</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
          Download the Cashwyre app and start sending money across borders today
        </p>
      </motion.div>

      <DownloadSection />
    </div>
  )
}