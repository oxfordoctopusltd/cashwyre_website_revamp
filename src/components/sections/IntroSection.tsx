"use client"
import { motion } from "framer-motion"

export default function IntroSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FF6B35] to-transparent" />
      
      {/* Subtle Background Elements */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#FF6B35]/5 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#FFA726]/5 rounded-full blur-3xl animate-pulse-slow" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Sleeker Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Simplify Cross-Border
            </span>
            <br />
            <span className="bg-gradient-to-r from-[#FF6B35] via-[#FF8E35] to-[#FFA726] bg-clip-text text-transparent">
              & Crypto Payments
            </span>
          </h1>

          {/* Enhanced Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl md:text-2xl text-gray-400 leading-relaxed mb-12 max-w-3xl mx-auto"
          >
            Send, receive, and save money using{" "}
            <span className="text-[#FF6B35] font-medium">Bitcoin</span>,{" "}
            <span className="text-[#FFA726] font-medium">Stablecoin</span>, or{" "}
            <span className="text-white font-medium">local currencies</span> in one platform
          </motion.p>

          {/* Minimal Divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="w-24 h-0.5 bg-gradient-to-r from-[#FF6B35] to-[#FFA726] mx-auto mb-12"
          />



          {/* Enhanced User Segments */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto"
          >
            {/* Everyday Users Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-lg rounded-3xl p-8 border border-white/10 hover:border-[#FF6B35]/40 transition-all duration-500 h-full">
                <div className="flex items-center gap-4 mb-8 justify-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#FF6B35] to-[#FF8E35] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    <span className="text-2xl">👤</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white flex items-center">Retail users</h3>
                </div>

                <ul className="space-y-5 mb-8 pl-2">
                  {[
                    "Instant Virtual Dollar cards in 3 minutes & shop globally.",
                    "Spend your crypto for everyday transactions without selling.",
                    "DCA made easy. Accumulate BTC/USD(T) daily, weekly, or monthly.",
                    "Buy Airtime/Data and pay for utility bills with ease."
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-4">
                      <div className="w-2 h-2 rounded-full bg-[#FF6B35] mt-2 flex-shrink-0" />
                      <span className="text-gray-300 leading-relaxed text-left">{item}</span>
                    </li>
                  ))}
                </ul>

                <a href="/services/retail-customers" className="block w-full">
                  <button className="w-full bg-gradient-to-r from-[#FF6B35] to-[#FF8E35] text-white px-6 py-4 rounded-xl font-semibold hover:shadow-xl hover:shadow-orange-500/20 transition-all duration-300 transform hover:scale-105">
                    Read More
                  </button>
                </a>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-lg rounded-3xl p-8 border border-white/10 hover:border-[#FFA726]/40 transition-all duration-500 h-full">
                <div className="flex items-center gap-4 mb-8 justify-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#FFA726] to-[#FF8E35] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    <span className="text-2xl">🏢</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white flex items-center">Merchants & Fintechs</h3>
                </div>

                <ul className="space-y-5 mb-8 pl-2">
                  {[
                    "Accept crypto or fiat payments in minutes, no coding required",
                    "Issue virtual cards and crypto wallets to your customers",
                    "Automate payouts with our APIs and developer tools",
                    "Monitor and track revenue and settlements on your business portal"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-4">
                      <div className="w-2 h-2 rounded-full bg-[#FFA726] mt-2 flex-shrink-0" />
                      <span className="text-gray-300 leading-relaxed text-left">{item}</span>
                    </li>
                  ))}
                </ul>

                <a href="/services/merchants-businesses" className="block w-full">
                  <button className="w-full bg-gradient-to-r from-[#FFA726] to-[#FF8E35] text-white px-6 py-4 rounded-xl font-semibold hover:shadow-xl hover:shadow-orange-500/20 transition-all duration-300 transform hover:scale-105">
                    Learn More
                  </button>
                </a>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}