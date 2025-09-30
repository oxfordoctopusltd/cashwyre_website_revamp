"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Code, CreditCard, Globe, Zap, Shield, TrendingUp, Users } from "lucide-react"
import Image from "next/image"

const businessServices = [
  {
    icon: ArrowRight,
    title: "Transfer API",
    description: "Seamless payouts and transfers across Africa in local currencies. We handle payments, you focus on growth.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Shield,
    title: "Bills Payment API",
    description: "With our APIs, you can easily pay for utilities across Africa, electricity, Cable TV, airtime, data, and more.",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: Globe,
    title: "Crypto Wallet API",
    description: "From online stores accepting crypto to HRM platforms paying remote teams, Cashwyre's API powers it all.",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: TrendingUp,
    title: "Crypto Onramp API",
    description: "Cashwyre's Crypto4Cash APIs let you instantly convert local currencies or fiat to Bitcoin, USDT, USDC, and more.",
    color: "from-orange-500 to-red-500"
  },
  {
    icon: Zap,
    title: "Crypto Offramp API",
    description: "Instantly turn Bitcoin, USDT, USDC, and more into spendable local currencies with our Offramp APIs.",
    color: "from-yellow-500 to-orange-500"
  },
  {
    icon: CreditCard,
    title: "Dollar Card API",
    description: "Issue instant virtual dollar cards for global payments. We handle the card infrastructure, you focus on your customers.",
    color: "from-indigo-500 to-purple-500"
  },
  {
    icon: Code,
    title: "Paylink API",
    description: "With your personalized payment link, accept global payments and enjoy instant local currency settlement across Africa.",
    color: "from-blue-500 to-cyan-500"
  }
]

const stats = [
  { number: "99.9%", label: "Uptime" },
  { number: "<1s", label: "Average Response" },
  { number: "50+", label: "Countries Supported" },
  { number: "24/7", label: "Support" }
]


const partners = [
  { name: "CashwyreForBusiness", src: "/img/logos/cashwyre-for-business-logo.png" },
  { name: "Chain Coop", src: "/img/logos/chain-coop-logo.png" },
  { name: "Sharp Pocket", src: "/img/logos/sharp-pocket-logo.png" },
  { name: "Vibeazy", src: "/img/logos/vibeazy-logo.png" },
  { name: "TravuCash", src: "/img/logos/travucash-logo-white.png" }
]

const merchantServices = [
  {
    title: "Bills Payment",
    description: "Easily pay your customers' bills across Africa from the Cashwyre business portal, electricity, TV, airtime, data, and more."
  },
  {
    title: "Transfers",
    description: "Easily transfer funds to beneficiaries' bank accounts or wallets in different countries, right from your Business Portal."
  },
  {
    title: "Paylink API",
    description: "With your personalized payment link, accept global payments and enjoy instant local currency settlement across Africa."
  },
  {
    title: "Virtual Cards",
    description: "Create virtual dollar cards for your team or customers directly from your business portal, shop online, pay subscriptions, and more."
  },
  {
    title: "Crypto Wallets",
    description: "Create new crypto wallets for your team or customers and send cryptocurrency to your beneficiaries directly from the Portal."
  }
]

const checkoutWidget = [
  {
    title: "Cashwyre Checkout/Widget",
    description: "Scale your business globally with Cashwyre checkout/widget. It is ideal for businesses of any size."
  },
  {
    title: "Cashwyre Checkout ",
    description: "If you run an online store, use Cashwyre Checkout to accept payments in crypto or local currencies for your products and services."
  },
  {
    title: "Cashwyre Widget",
    description: "Embed the Cashwyre Widget on your site to accept donations smoothly. Fully configurable, it appears in the corner for a clean, seamless experience."
  }
]

export default function Business() {
  const [activeTab, setActiveTab] = useState('fintechs')

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
          Cashwyre for <span className="gradient-text">Business</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
          Cashwyre for Business makes payments seamless, so you can focus on growth, whether big or small.
        </p>
        <motion.a
          href="https://business.cashwyre.com/signup"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-[#FF6B35] to-[#FFA726] px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-lg transition-all duration-300 inline-block"
        >
          Register as a Business
        </motion.a>
      </motion.section>

      {/* Services Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto mb-20"
      >
        <div className="text-center mb-12">
          <div className="flex justify-center mb-8">
            <motion.button
              onClick={() => setActiveTab('fintechs')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-8 py-4 rounded-l-2xl font-semibold text-lg transition-all duration-300 ${
                activeTab === 'fintechs'
                  ? 'bg-gradient-to-r from-[#FF6B35] to-[#FFA726] text-white shadow-lg'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              FOR FINTECHS
            </motion.button>
            <motion.button
              onClick={() => setActiveTab('businesses')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-8 py-4 rounded-r-2xl font-semibold text-lg transition-all duration-300 ${
                activeTab === 'businesses'
                  ? 'bg-gradient-to-r from-[#FF6B35] to-[#FFA726] text-white shadow-lg'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              FOR BUSINESSES
            </motion.button>
          </div>
        </div>
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {activeTab === 'fintechs'
            ? businessServices.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="glass-card p-6 space-y-4 hover:border-[#FF6B35]/50 transition-all duration-300"
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center`}>
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                  <p className="text-gray-400">{service.description}</p>
                </motion.div>
              ))
            : merchantServices.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-card p-6 space-y-4"
                >
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                  <p className="text-gray-400">{service.description}</p>
                </motion.div>
              ))}
        </motion.div>
      </motion.section>

      {/* Checkout/Widget */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto mb-20"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Cashwyre <span className="gradient-text">Checkout/Widget</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {checkoutWidget.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-6 space-y-4"
            >
              <h3 className="text-xl font-semibold">{service.title}</h3>
              <p className="text-gray-400">{service.description}</p>
            </motion.div>
          ))}
        </div>
        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-r from-[#FF6B35] to-[#FFA726] px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-lg transition-all duration-300"
          >
            Try Cashwyre Checkout/Widget
          </motion.button>
        </div>
      </motion.section>


      {/* API Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto mb-20 text-center"
      >
        <h2 className="text-4xl lg:text-5xl font-bold mb-4">
          Build with Cashwyre APIs
        </h2>
        <p className="text-xl text-gray-300 mb-8">
          With our secure APIs, you can seamlessly offer payment services to your staff and customers.
        </p>
        <motion.a
          href="https://business.cashwyre.com/doc/api"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-r from-[#FF6B35] to-[#FFA726] px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-lg transition-all duration-300 inline-block"
        >
          View API Documentation
        </motion.a>
      </motion.section>

      {/* Partners Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto mb-20 text-center"
      >
        <h2 className="text-4xl lg:text-5xl font-bold mb-4">
          Our Customers
        </h2>
        <p className="text-xl text-gray-300 mb-12">
          Businesses seamlessly integrate with our secure APIs to build products and offer real-time wallet and payment services to their staff and customers.
        </p>
        <div className="flex flex-wrap justify-center gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/10 p-4 rounded-lg"
            >
              <Image src={partner.src} alt={`${partner.name} logo`} width={150} height={75} className="object-contain" />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto mb-20"
      >
        <div className="glass-card p-8 lg:p-12 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <Users className="w-16 h-16 mx-auto text-[#FF6B35]" />
            <h2 className="text-4xl lg:text-5xl font-bold">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-gray-300">
              Join existing Fintechs already leveraging Cashwyre APIs to power their business. Get started in minutes.
            </p>
            <div className="flex justify-center">
              <motion.a
                href="https://business.cashwyre.com/signup"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-r from-[#FF6B35] to-[#FFA726] px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 inline-block"
              >
                Get Started
              </motion.a>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  )
}