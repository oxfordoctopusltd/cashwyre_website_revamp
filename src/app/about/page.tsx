"use client"
import { motion } from "framer-motion"
import { Shield, Eye, Clock, Globe, Zap, Ban, Coins, CheckCircle, Target, Heart, Users, Star } from "lucide-react"
import DownloadSection from "@/components/sections/Download"
import Image from "next/image"

const values = [
  {
    icon: Shield,
    title: "Integrity",
    description: "Cashwyre has a firm and unwavering commitment to ensuring transactions are done securely.",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: Eye,
    title: "Transparency",
    description: "We are straight forward and we keep our users informed on necessary information or update.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Heart,
    title: "Customer Satisfaction",
    description: "We put in our best foot forward to ensure our customers' needs are well catered for.",
    color: "from-pink-500 to-purple-500"
  },
  {
    icon: Zap,
    title: "Simplicity",
    description: "Cashwyre takes off stress and makes it simple and easy to make international payments.",
    color: "from-orange-500 to-red-500"
  }
]

const features = [
  {
    icon: Shield,
    title: "Safe and secure",
    description: "Built to protect your money"
  },
  {
    icon: Eye,
    title: "Transparent",
    description: "Straight forward regarding fees and exchange rates"
  },
  {
    icon: Clock,
    title: "Reliable",
    description: "Your money arrives at destination on time"
  },
  {
    icon: Globe,
    title: "Global payment",
    description: "Send money safely across borders worldwide"
  },
  {
    icon: CheckCircle,
    title: "Useful",
    description: "Pay all your invoices and never miss a bill again"
  },
  {
    icon: Coins,
    title: "Low costs",
    description: "Very affordable, thanks to the Bitcoin network"
  }
]

const bitcoinBenefits = [
  {
    icon: Ban,
    title: "No bank account needed",
    description: "Operate without traditional banking requirements"
  },
  {
    icon: Coins,
    title: "Low transaction fees",
    description: "Significantly lower costs compared to traditional methods"
  },
  {
    icon: Zap,
    title: "Fast payments",
    description: "Quick transactions in your preferred currency"
  },
  {
    icon: Shield,
    title: "Secure network",
    description: "Protected by robust blockchain technology"
  }
]

export default function About() {
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
          About <span className="gradient-text">Cashwyre</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-4xl mx-auto">
          Making Borderless Transactions Easy
        </p>
      </motion.section>

      {/* Vision Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto mb-20"
      >
        <div className="glass-card p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold">
                Our <span className="gradient-text">Vision</span>
              </h2>
              <p className="text-lg text-gray-300">
                Our vision is to simplify payments globally through Bitcoin and Crypto rails, 
                and the Infrastructure it provides. Since launching Cashwyre in 2022, we have 
                been empowering individuals and businesses beyond Africa by making cross-border 
                transfers faster and more affordable.
              </p>
              <p className="text-lg text-gray-300">
                Built by visionary engineers with over a decade of experience in Banking and FinTech, 
                Cashwyre, backed by Nigerian and Dutch investors, makes global payments simple 
                through a single API call. Powered by Bitcoin, we enable fast, low-cost remittances 
                locally and globally.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <motion.div
                animate={{
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative"
              >
                <Image
                  src="/img/business/crypto-wallets.png"
                  alt="Crypto Wallets"
                  width={400}
                  height={320}
                  className="w-full h-80 object-contain rounded-3xl"
                />
              </motion.div>
              <motion.div
                animate={{
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
                className="relative"
              >
                <Image
                  src="/img/business/bills-payment.png"
                  alt="Bills Payment"
                  width={400}
                  height={320}
                  className="w-full h-80 object-contain rounded-3xl"
                />
              </motion.div>
            </div>
          </div>
          
        </div>
      </motion.section>

      {/* Why Choose Cashwyre Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto mb-20"
      >
        <h2 className="text-4xl lg:text-5xl font-bold text-center mb-4">
          Why choose <span className="gradient-text">Cashwyre?</span>
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Experience the future of borderless payments with our cutting-edge platform
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="glass-card p-6 space-y-4"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-[#FF6B35] to-[#FFA726] rounded-xl flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Why Bitcoin Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto mb-20"
      >
        <div className="glass-card p-8 lg:p-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Why use <span className="gradient-text">Bitcoin</span> to transfer money?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Leveraging the power of blockchain technology for superior financial experiences
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bitcoinBenefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center space-y-4"
              >
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-[#FF6B35] to-[#FFA726] rounded-2xl flex items-center justify-center">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold">{benefit.title}</h3>
                <p className="text-gray-400 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Core Values Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto mb-20"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Core <span className="gradient-text">Values</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our values are our identity - the bedrock for all that we do and guides our interactions 
            with customers, investors, stakeholders and the general public.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="glass-card p-6 space-y-4 text-center"
            >
              <div className={`w-16 h-16 mx-auto bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center`}>
                <value.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold">{value.title}</h3>
              <p className="text-gray-400 text-sm">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Download Section */}
      <DownloadSection />
    </div>
  )
}