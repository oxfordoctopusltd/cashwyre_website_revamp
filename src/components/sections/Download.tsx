"use client"
import { motion } from "framer-motion"
import { Download, QrCode } from "lucide-react"
import Image from "next/image"

export default function DownloadSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#0F0F0F] via-[#1A1A1A] to-[#2D1E0F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl lg:text-5xl font-bold mb-4"
          >
            <span className="bg-gradient-to-r from-[#FFFFFF] via-[#E0E0E0] to-[#FF6B35] bg-clip-text text-transparent">
              Send and receive money across borders today!
            </span>
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass-card rounded-2xl p-8 border border-white/10 shadow-xl">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* QR Code Section */}
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
                  <QrCode className="w-6 h-6 text-[#FFA726]" />
                  <h3 className="font-semibold text-white text-xl">Scan to Download</h3>
                </div>

                <div className="w-40 h-40 mx-auto lg:mx-0 bg-gradient-to-br from-[#FF6B35] to-[#FFA726] rounded-xl flex items-center justify-center p-3 shadow-lg">
                  <div className="w-full h-full bg-white rounded-lg flex items-center justify-center">
                    <Image
                      src="/img/others/download-qrcode.png"
                      alt="Download QR Code"
                      width={128}
                      height={128}
                      className="w-full h-full object-contain rounded-md"
                    />
                  </div>
                </div>
                <p className="text-sm text-[#E0E0E0] mt-3">Available on iOS & Android</p>
              </div>

              {/* Vertical Divider - Only on larger screens */}
              <div className="hidden lg:block w-px h-24 bg-white/20" />

              {/* Download Buttons */}
              <div className="space-y-6 flex-1 min-w-[220px]">
                <a
                  href="https://apps.apple.com/tr/app/cashwyre/id6450153762?l=tr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-between gap-4 glass-card border border-white/20 px-4 py-4 rounded-xl hover:bg-white/10 transition-all duration-300 group hover:scale-105"
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
                  className="w-full flex items-center justify-between gap-4 glass-card border border-white/20 px-4 py-4 rounded-xl hover:bg-white/10 transition-all duration-300 group hover:scale-105"
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
            <div className="glass-card p-4 rounded-xl border border-white/10 mt-6 text-center">
              <p className="text-sm text-[#E0E0E0] italic">
                "The easiest way to send money across borders. Fast, secure, and reliable!"
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}