"use client"
import { motion } from "framer-motion"
import { CreditCard, Download, Shield, Zap, Globe, Smartphone, Bitcoin, DollarSign, ArrowRight, Check } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import DownloadSection from "@/components/sections/Download"

const features = [
  {
    icon: Bitcoin,
    title: "Save (DCA) BTC",
    description: "Automatically save and accumulate BTC daily, weekly, or monthly with Cashwyre.",
    color: "from-orange-500 to-yellow-500"
  },
  {
    icon: DollarSign,
    title: "Save (DCA) USD",
    description: "Save in USD with Cashwyre and earn 5-10% interest automatically - daily, weekly, or monthly.",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: Globe,
    title: "Send/Receive Crypto",
    description: "Send & Receive BTC, USDT, USDC with Cashwyre and instantly convert to NGN, ZAR, GHS, KES.",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Zap,
    title: "Send Money Instantly",
    description: "Send money securely and cheaply instantly across Africa and get the best rates in the space.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: CreditCard,
    title: "Cashwyre Dollar Card",
    description: "Get your Cashwyre dollar cards in minutes and shop globally, no hassle, no stress.",
    color: "from-red-500 to-pink-500"
  },
  {
    icon: Globe,
    title: "Crypto4Cash",
    description: "Instantly convert your crypto to NGN, GHS, ZAR, KES, and other local currencies across Africa - no registration required.",
    color: "from-indigo-500 to-purple-500"
  },
  {
    icon: Smartphone,
    title: "Bills Payment",
    description: "Pay for utility bills, buy airtime, data, electricity, and much more with Cashwyre.",
    color: "from-teal-500 to-cyan-500"
  },
  {
    icon: Smartphone,
    title: "Cashwyre Paylink",
    description: "As a solopreneur or one-person business, you can receive fiat or crypto payments from your customers with one static URL.",
    color: "from-pink-500 to-rose-500"
  }
]

const benefits = [
  "Best exchange rates in the market",
  "Zero hidden fees",
  "24/7 customer support",
  "Bank-level security",
  "Instant transactions",
  "Multi-currency support"
]

const savingsOptions = [
  {
    title: "Bitcoin Savings",
    description: "Automatically save and accumulate BTC daily, weekly, or monthly with Cashwyre.",
    rate: "Market Rate",
    icon: Bitcoin,
    color: "from-orange-500 to-yellow-500"
  },
  {
    title: "USD Savings",
    description: "Save in USD with Cashwyre and earn 5-10% interest automatically - daily, weekly, or monthly.",
    rate: "5-10% APR",
    icon: DollarSign,
    color: "from-green-500 to-emerald-500"
  }
]

export default function RetailCustomers() {
  return (
    <div className="min-h-screen pt-32 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto text-center mb-20"
      >
        <h1 className="text-5xl lg:text-7xl font-bold mb-6">
          Retail <span className="gradient-text">Customers</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
          Everything you need in one app
        </p>
      </motion.section>

      {/* Features Grid */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto mb-20"
      >
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass-card p-6 space-y-4 hover:border-[#FF6B35]/50 transition-all duration-300"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Savings Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto mb-20"
      >
        <div className="glass-card p-8 lg:p-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Save & <span className="gradient-text">Grow</span>
            </h2>
            <p className="text-xl text-gray-400">
              Watch your money grow with our automated savings features
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {savingsOptions.map((option, index) => (
              <motion.div
                key={option.title}
                initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="glass-card p-6 space-y-4 text-center hover:border-[#FF6B35]/50 transition-all duration-300"
              >
                <div className={`w-16 h-16 mx-auto bg-gradient-to-r ${option.color} rounded-2xl flex items-center justify-center`}>
                  <option.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold">{option.title}</h3>
                <p className="text-gray-400">{option.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>


      {/* Self Custody Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto mb-20"
      >
        <div className="glass-card p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Shield className="w-16 h-16 text-[#FF6B35]" />
              <h2 className="text-4xl lg:text-5xl font-bold">
                Your Keys, <span className="gradient-text">Your Bitcoin</span>
              </h2>
              <p className="text-lg text-gray-300">
                Your keys, your Bitcoin. We believe in true financial freedom.
                Not your keys, not your Bitcoin. Take control of your digital assets
                with our tools and education.
              </p>
            </div>
            <motion.div
              animate={{
                scale: [1, 1.02, 1],
                rotate: [0, 2, -2, 0]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative w-full h-80 rounded-3xl overflow-hidden"
            >
              <Image src="/img/business/dashboard-new.png" alt="Dashboard" fill className="object-contain" />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Download Section */}
      <DownloadSection />

    </div>
  )
}