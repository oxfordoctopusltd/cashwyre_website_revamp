"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Download, QrCode } from "lucide-react"
import Image from "next/image"

const heroTags = [
  "Send and receive money across borders today!",
  "Convert your Crypto to Cash with Crypto4Cash",
  "Shop Globally With Cashwyre Dollar Card",
  "Build with Cashwyre APIs",
]

export default function Hero() {
  const [currentTag, setCurrentTag] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTag((prev) => (prev + 1) % heroTags.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const nextTag = () => setCurrentTag((prev) => (prev + 1) % heroTags.length)
  const prevTag = () => setCurrentTag((prev) => (prev - 1 + heroTags.length) % heroTags.length)

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
              <motion.h1
                key={currentTag}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
                className="text-4xl lg:text-6xl font-bold leading-tight"
              >
                <span className="bg-gradient-to-r from-[#FFFFFF] via-[#E0E0E0] to-[#FF6B35] bg-clip-text text-transparent">
                  {heroTags[currentTag]}
                </span>
              </motion.h1>
            </AnimatePresence>
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={prevTag}
                className="p-3 glass-card rounded-xl hover:bg-white/20 transition-all duration-300 group"
              >
                <ChevronLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>

              <div className="flex space-x-3">
                {heroTags.map((_, index) => (
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
            </div>

            <div className="text-sm text-[#E0E0E0] font-medium">
              {currentTag + 1} / {heroTags.length}
            </div>
          </div>

          {/* Download Section - QR Code + Buttons Grouped */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="pt-6"
          >
            <div className="glass-card rounded-2xl p-6 border border-white/10 shadow-xl">
              <div className="flex flex-col lg:flex-row items-center gap-6">
                {/* QR Code Section */}
                <div className="text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-2 mb-3">
                    <QrCode className="w-5 h-5 text-[#FFA726]" />
                    <h3 className="font-semibold text-white text-lg">Scan to Download</h3>
                  </div>
                  
                  <div className="w-32 h-32 mx-auto lg:mx-0 bg-gradient-to-br from-[#FF6B35] to-[#FFA726] rounded-xl flex items-center justify-center p-2 shadow-lg">
                    <div className="w-full h-full bg-white rounded-lg flex items-center justify-center">
                      <Image
                        src="/img/others/download-qrcode.png"
                        alt="Download QR Code"
                        width={96}
                        height={96}
                        className="w-full h-full object-contain rounded-md"
                      />
                    </div>
                  </div>
                  <p className="text-sm text-[#E0E0E0] mt-2">Available on iOS & Android</p>
                </div>

                {/* Vertical Divider - Only on larger screens */}
                <div className="hidden lg:block w-px h-20 bg-white/20" />

                {/* Download Buttons */}
                <div className="space-y-4 flex-1 min-w-[200px]">
                  <a
                    href="https://apps.apple.com/tr/app/cashwyre/id6450153762?l=tr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-between gap-4 glass-card border border-white/20 px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-300 group hover:scale-105"
                  >
                    <div className="flex items-center gap-3">
                      <Image
                        src="/img/logos/appStore.png"
                        alt="App Store"
                        width={36}
                        height={36}
                        className="w-9 h-9 object-contain"
                      />
                      <div className="text-left">
                        <div className="text-xs text-[#E0E0E0]">Download on</div>
                        <div className="font-semibold text-white">App Store</div>
                      </div>
                    </div>
                    <Download className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                  </a>

                  <a
                    href="https://play.google.com/store/apps/details?id=com.vickzil.cashwyre"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-between gap-4 glass-card border border-white/20 px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-300 group hover:scale-105"
                  >
                    <div className="flex items-center gap-3">
                      <Image
                        src="/img/logos/playstore.png"
                        alt="Google Play"
                        width={32}
                        height={32}
                        className="w-8 h-8 object-contain"
                      />
                      <div className="text-left">
                        <div className="text-xs text-[#E0E0E0]">Get it on</div>
                        <div className="font-semibold text-white">Google Play</div>
                      </div>
                    </div>
                    <Download className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                  </a>
                </div>
              </div>

              {/* Testimonial */}
              <div className="glass-card p-4 rounded-xl border border-white/10 mt-4 text-center">
                <p className="text-sm text-[#E0E0E0] italic">
                  "The easiest way to send money across borders. Fast, secure, and reliable!"
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}