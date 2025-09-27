"use client"
import { motion } from "framer-motion"
import { Shield, Zap, Globe, Sparkles } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Safe",
    description: "Your money is always protected.",
    color: "from-green-500 to-emerald-600"
  },
  {
    icon: Zap,
    title: "Fast",
    description: "Send and receive money quickly.",
    color: "from-yellow-500 to-orange-500"
  },
  {
    icon: Globe,
    title: "Everywhere",
    description: "Crypto is universal, so is Cashwyre.",
    color: "from-blue-500 to-cyan-600"
  },
  {
    icon: Sparkles,
    title: "Easy",
    description: "Anyone can use it easily, no stress.",
    color: "from-purple-500 to-pink-500"
  }
]

export default function Features() {
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
            Why choose <span className="gradient-text">Cashwyre?</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="glass-card p-6 text-center space-y-4 hover:border-[#FF6B35]/50 transition-all duration-300"
            >
              <div className={`w-16 h-16 mx-auto bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}