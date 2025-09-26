"use client"
import { motion } from "framer-motion"
import {
  Code, CreditCard, Globe, Zap, Shield, TrendingUp, Users, ArrowRight,
  Check, DollarSign, BarChart3, Lock, Clock, Webhook, Database, Link as LinkIcon
} from "lucide-react"
import Link from "next/link"
import DownloadSection from "@/components/sections/Download"

const apiServices = [
  {
    icon: Zap,
    title: "Transfer APIs",
    description: "Send money globally with our payout APIs, instantly.",
    features: ["Real-time transfers", "Multi-currency support", "Bulk payouts", "Webhook notifications"],
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Globe,
    title: "Crypto Offramp APIs",
    description: "With our offramp APIs, you can instantly convert your crypto to local currencies in seconds across Africa.",
    features: ["BTC, ETH, USDT, USDC", "50+ fiat currencies", "Competitive rates", "Instant settlement"],
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: TrendingUp,
    title: "Crypto Onramp APIs",
    description: "Instantly convert local currency to crypto and have it sent to any crypto address of your choice.",
    features: ["Local currency to crypto", "Multiple crypto support", "Instant conversion", "Secure transfers"],
    color: "from-yellow-500 to-orange-500"
  },
  {
    icon: CreditCard,
    title: "Card APIs",
    description: "Issue virtual dollar cards to your customers and develop card-based applications with our Card APIs.",
    features: ["Instant card creation", "Global acceptance", "Spending controls", "Real-time analytics"],
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Shield,
    title: "Bills Payment APIs",
    description: "Seamless APIs for international airtime, data, electricity bills and DSTV subscription services.",
    features: ["Airtime & data", "Electricity bills", "Cable TV", "Internet services"],
    color: "from-orange-500 to-red-500"
  }
]

const businessTools = [
  {
    icon: BarChart3,
    title: "Merchant Dashboard",
    description: "Cashwyre provides you with an intuitive dashboard to effectively track your payments and manage transactions in one place.",
    color: "from-indigo-500 to-purple-500"
  },
  {
    icon: LinkIcon,
    title: "Cashwyre Paylink",
    description: "With your personalized Cashwyre Paylink, you can accept both crypto and fiat payments from customers.",
    color: "from-yellow-500 to-orange-500"
  },
  {
    icon: Globe,
    title: "Cashwyre Checkout",
    description: "Accept payments or donations on your website in just minutes, no coding required.",
    color: "from-teal-500 to-cyan-500"
  },
  {
    icon: Code,
    title: "Cashwyre Widgets",
    description: "Embed the Cashwyre Widget on your website to receive donations for your campaigns, effortlessly.",
    color: "from-pink-500 to-rose-500"
  }
]

const benefits = [
  "Zero setup fees",
 "Developer-friendly documentation",
  "24/7 technical support",
  "Bank-level security",
  "Regulatory compliance",
  "Real-time notifications"
]

export default function MerchantsBusinesses() {
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
          Merchants & <span className="gradient-text">Businesses</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
          Accept payments through multiple options and track everything from one place
        </p>
      </motion.section>


      {/* API Services Grid */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto mb-20"
      >
        
        <div className="grid md:grid-cols-2 gap-6">
          {apiServices.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -3 }}
              className="glass-card p-6 space-y-4 hover:border-[#FF6B35]/50 transition-all duration-300 h-[280px] flex flex-col"
            >
              <div className="flex items-start space-x-4 flex-shrink-0">
                <div className={`w-12 h-12 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>
                </div>
              </div>
              
              <ul className="space-y-2 flex-1">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center space-x-3">
                    <div className="w-1.5 h-1.5 bg-[#FF6B35] rounded-full flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Download Section */}
      <DownloadSection />

    </div>
  )
}