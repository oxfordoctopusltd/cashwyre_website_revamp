"use client"
import { motion } from "framer-motion"
import { UserCheck, Wallet, Rocket, ShieldCheck } from "lucide-react"
import Link from "next/link"

const steps = [
  {
    icon: UserCheck,
    title: "Signup in Minutes",
    description: "Sign up on our Web App or Mobile App. Available for Android and IOS devices.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: ShieldCheck,
    title: "Identity verification",
    description: "Provide extra basic information to assist us with verifying your details.",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: Wallet,
    title: "Fund Your Wallet",
    description: "Fund your wallet through FIAT or stable coins (USDT or USDC).",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Rocket,
    title: "Start transacting",
    description: "Buy BTC, Sell BTC, Receive BTC, Send BTC as well as stable coins.",
    color: "from-orange-500 to-red-500"
  }
]

export default function Steps() {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            How to <span className="gradient-text">begin</span>
          </h2>
          <p className="text-xl text-gray-400">Get started in four easy steps!</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div className="glass-card p-6 space-y-4 text-center">
                <div className="relative">
                  <div className={`w-16 h-16 mx-auto bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 -right-8 w-16 h-0.5 bg-gradient-to-r from-[#FF6B35] to-[#FFA726]" />
                  )}
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-[#FF6B35]">0{index + 1}</div>
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  <p className="text-sm text-gray-400">{step.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link 
            href="/get-started"
            className="inline-block bg-gradient-to-r from-[#FF6B35] to-[#FFA726] px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            Create a free account
          </Link>
        </motion.div>
      </div>
    </section>
  )
}