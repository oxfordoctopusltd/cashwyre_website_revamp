"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Download, QrCode } from "lucide-react"
import Image from "next/image"

const heroSlides = [
  {
    tag: "Spend with Crypto",
    slogan: "Cashwyre makes it effortless to use crypto for your everyday payments."
  },
  {
    tag: "Get Your Dollar Card",
    slogan: "Spend online anywhere in the world. Safe. Simple. Instant. Free."
  },
  {
    tag: "Build With Cashwyre APIs",
    slogan: <span>Build & Launch your apps in days with Cashwyre APIs. <a href="https://business.cashwyre.com/doc/api" className="text-[#FF6B35] hover:underline" target="_blank" rel="noopener noreferrer">Visit API Docs</a></span>
  },
  {
    tag: "Reach More Customers Globally",
    slogan: <span>One Paylink, global reach. Take payments from anywhere, get settled instantly. <a href="/business" className="text-[#FF6B35] hover:underline">Get Started</a></span>
  },
  {
    tag: "Get Paid In Crypto",
    slogan: "Work globally, earn in crypto, and withdraw instantly in your local currency. Zero fees."
  }
]

export default function Hero() {
  const [currentTag, setCurrentTag] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTag((prev) => (prev + 1) % heroSlides.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const nextTag = () => setCurrentTag((prev) => (prev + 1) % heroSlides.length)
  const prevTag = () => setCurrentTag((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-16">
      {/* Background Gradient with World Map */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#0F0F0F] via-[#1A1A1A] to-[#2D1E0F] opacity-90"
        style={{
          backgroundImage: 'url(/img/banner/cashwyre-world.png)',
          backgroundSize: 'contain',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Animated Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FF6B35]/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FFA726]/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* All Content on Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 max-w-3xl mx-auto lg:ml-16 pt-8"
        >
          {/* Main Heading */}
          <div className="pt-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTag}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-2xl lg:text-4xl font-bold leading-tight mb-2">
                  <span className="bg-gradient-to-r from-[#FFFFFF] via-[#E0E0E0] to-[#FF6B35] bg-clip-text text-transparent">
                    {heroSlides[currentTag].tag}
                  </span>
                </h1>
                <p className="text-base lg:text-xl text-gray-300 max-w-2xl">
                  {heroSlides[currentTag].slogan}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center">
            <div className="flex items-center space-x-4">
              <button
                onClick={prevTag}
                className="p-3 glass-card rounded-xl hover:bg-white/20 transition-all duration-300 group"
              >
                <ChevronLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>

              <div className="flex space-x-3">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTag(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentTag ? "bg-[#FF6B35] scale-125" : "bg-gray-600 hover:bg-gray-500"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextTag}
                className="p-3 glass-card rounded-xl hover:bg-white/20 transition-all duration-300 group"
              >
                <ChevronRight className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>

              <div className="ml-2 text-sm text-[#E0E0E0] font-medium">
                {currentTag + 1} / {heroSlides.length}
              </div>
            </div>
          </div>

          {/* Spend Crypto Instantly Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="pt-6"
          >
            <div className="glass-card rounded-2xl p-8 border border-white/10 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="flex-1 min-w-[300px]">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                  Spend your <span className="text-[#FF6B35]">Crypto</span> instantly<br className="hidden md:block" /> without selling
                </h2>
                <p className="text-gray-300 text-lg max-w-xl">
                  With Cashwyre's Crypto4Cash, your crypto instantly becomes cash (NGN, GHS, ZAR...) you can spend anytime, anywhere across Africa.
                </p>
              </div>
              <form className="flex-1 min-w-[320px] max-w-md w-full flex flex-col gap-2" onSubmit={e => e.preventDefault()}>
                <label htmlFor="currency" className="text-gray-200 mb-1">Enter amount to pay</label>
                <div className="flex w-full">
                  <select
                    id="currency"
                    className="rounded-l-lg border border-gray-300 bg-white text-black px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                    style={{ minWidth: 90 }}
                    defaultValue="NGN"
                  >
                    <option value="NGN">NGN</option>
                    <option value="GHS">GHS</option>
                    <option value="ZAR">ZAR</option>
                  </select>
                  <input
                    type="number"
                    min="1000"
                    max="400000"
                    step="100"
                    placeholder="1000"
                    className="flex-1 border-t border-b border-gray-300 bg-white text-black px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                    style={{ borderLeft: 'none' }}
                  />
                  <button
                    type="submit"
                    className="rounded-r-lg bg-[#FF6B35] text-white px-6 py-3 font-semibold hover:bg-[#FFA726] transition-colors border border-[#FF6B35] border-l-0"
                  >
                    Send
                  </button>
                </div>
                <div className="text-gray-400 text-sm mt-1">
                  ₦1,000.00 - ₦400,000.00
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}