"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Download, QrCode } from "lucide-react"
import PayWithCryptoBox from "@/components/crypto/PayWithCryptoBox"

const heroSlides = [
  {
  tag: <span>Pay Instantly With<br className="hidden sm:inline" /> <span className="text-[#FF6B35]">Crypto</span></span>,
    slogan: "Cashwyre makes it effortless to use crypto for your everyday payments."
  },
  {
    tag: <span>Get Your Dollar Card <br className="hidden sm:inline" /> <span className="text-[#FF6B35]">In Seconds</span></span>,
    slogan: [
      "Spend online anywhere in the world.",
      "Safe. Simple. Instant. Free."
    ]
  },
  {
    tag: <span>Build With Cashwyre <br className="hidden md:inline" />APIs</span>,
  slogan: <span>Build & Launch your apps in days with Cashwyre APIs.<br /><a href="https://business.cashwyre.com/doc/api" className="text-[#FF6B35] hover:underline" target="_blank" rel="noopener noreferrer">Visit API Docs</a></span>
  },
  {
    tag: "Reach More Customers Globally",
    slogan: <span>One Paylink, global reach. Take payments from anywhere, get settled instantly. <a href="/business" className="text-[#FF6B35] hover:underline">Get Started</a></span>
  },
  {
    tag: <span>Get Paid Instantly In <br className="hidden sm:inline" /> <span className="text-[#FF6B35]">Crypto</span></span>,
    slogan: [
      "Work globally, earn in crypto, and withdraw instantly in your local currency. Zero fees."
    ]
  }
]

export default function Hero() {
  const [currentTag, setCurrentTag] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTag((prev) => (prev + 1) % heroSlides.length)
    }, 7000)
    return () => clearInterval(interval)
  }, [])

  const nextTag = () => setCurrentTag((prev) => (prev + 1) % heroSlides.length)
  const prevTag = () => setCurrentTag((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)

  return (
  <section className="relative min-h-[70vh] flex items-center justify-start overflow-hidden pt-0">
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
        {/* All Content aligned to the left edge, with extra top padding for text only */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 max-w-3xl ml-0 lg:ml-0 pt-40"
        >
          {/* Main Heading */}
          <div className="pt-4 text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTag}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
                  <span className="bg-gradient-to-r from-[#FFFFFF] via-[#E0E0E0] to-[#FF6B35] bg-clip-text text-transparent">
                    {heroSlides[currentTag].tag}
                  </span>
                </h1>
                <p className="text-base md:text-lg lg:text-xl text-gray-300 max-w-2xl">
                  {Array.isArray(heroSlides[currentTag].slogan)
                    ? heroSlides[currentTag].slogan.map((line, idx) => (
                        <span key={idx} className={
                          // Only break lines for Dollar Card, not for Get Paid In Crypto
                          heroSlides[currentTag].tag === 'Get Your Dollar Card' && idx > 0 ? '' : 'block'
                        }>{line}</span>
                      ))
                    : typeof heroSlides[currentTag].slogan === 'string'
                      ? heroSlides[currentTag].slogan.replace(/([.!?])\s+(?=[A-Z])/g, '$1\n')
                          .split('\n').map((line, idx) => (
                            <span key={idx} className="block">{line}</span>
                          ))
                      : heroSlides[currentTag].slogan}
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
                <span className="bg-primary text-white px-3 py-1 rounded-lg font-medium text-base shadow">
                  {currentTag + 1} / {heroSlides.length}
                </span>
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
            <PayWithCryptoBox />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}