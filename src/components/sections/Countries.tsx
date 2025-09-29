"use client"
import { motion } from "framer-motion"
import Link from "next/link"

const countries = [
  { name: "Nigeria", flag: "🇳🇬", code: "NG"},
  { name: "Ghana", flag: "🇬🇭", code: "GH" },
  { name: "Rwanda", flag: "🇷🇼", code: "RW"},
  { name: "Kenya", flag: "🇰🇪", code: "KE"},
  { name: "Netherlands", flag: "🇳🇱", code: "NL"},
  { name: "Uganda", flag: "🇺🇬", code: "UG"},
  { name: "Senegal", flag: "🇸🇳", code: "SN"},
  { name: "Mali", flag: "🇲🇱", code: "ML"},
  { name: "South Africa", flag: "🇿🇦", code: "ZA"},
  { name: "Benin", flag: "🇧🇯", code: "BJ"},
  { name: "Burkina Faso", flag: "🇧🇫", code: "BF" },
  { name: "Cameroon", flag: "🇨🇲", code: "CM"}
]

export default function Countries() {
  return (
    <section className="py-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Available in <span className="gradient-text">{countries.length} countries</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Instantly spend your crypto as local currency across supported Cashwyre corridors.
          </p>
        </motion.div>

        {/* Single Moving Line */}
        <div className="relative h-32 mb-12 overflow-hidden">
          <motion.div
            className="flex items-center space-x-8 absolute top-0 left-0"
            animate={{
              x: ["0%", "-50%"]
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {/* Original set */}
            {countries.map((country, index) => (
              <motion.div
                key={country.code}
                className="flex items-center space-x-4 bg-white/5 backdrop-blur-lg rounded-2xl p-4 pr-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group min-w-max"
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <div className="text-5xl transform group-hover:scale-110 transition-transform duration-300">
                  {country.flag}
                </div>
                <div className="text-left">
                  <span className="text-white font-semibold text-lg block">
                    {country.name}
                  </span>
                </div>
              </motion.div>
            ))}
            
            {/* Duplicate set for seamless loop */}
            {countries.map((country, index) => (
              <motion.div
                key={`duplicate-${country.code}`}
                className="flex items-center space-x-4 bg-white/5 backdrop-blur-lg rounded-2xl p-4 pr-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group min-w-max"
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <div className="text-5xl transform group-hover:scale-110 transition-transform duration-300">
                  {country.flag}
                </div>
                <div className="text-left">
                  <span className="text-white font-semibold text-lg block">
                    {country.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center"
        >
          <Link 
            href="/get-started"
            className="inline-block bg-gradient-to-r from-[#FF6B35] to-[#FFA726] text-white px-8 py-4 rounded-xl font-semibold hover:shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 hover:scale-105 text-lg"
          >
            Download To Get Started
          </Link>
        </motion.div>
      </div>
    </section>
  )
}