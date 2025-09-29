"use client"
import { motion } from "framer-motion"
import { ArrowRight, Code, CreditCard, Globe, Zap, Shield, TrendingUp, Users } from "lucide-react"
import Image from "next/image"

const businessServices = [
  {
    icon: Code,
    title: "Payout API",
    description: "Integrate with our RESTful APIs for seamless payouts, remittances, and transfers across Africa in local currencies. Focus on growth while we expertly manage your payment infrastructure.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Shield,
    title: "Bills payment API",
    description: "Our APIs make it easy to pay for utilities across Africa, including electricity bills, cable TV subscriptions, airtime, data plans, and more.",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: Globe,
    title: "Crypto wallets API",
    description: "Whether you're building an online store to accept cryptocurrency payments, adding crypto wallets to your HRM solution for remote gig payments, or more—Cashwyre's API is the perfect solution for you.",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: CreditCard,
    title: "Crypto4Cash API",
    description: "We now receive payments in crypto as a business and have your bank account credited in local currencies in minutes—with our Offramp and Onramp APIs.",
    color: "from-orange-500 to-red-500"
  },
  {
    icon: Zap,
    title: "Crypto Onramp APIs",
    description: "Accept payments or donations on your website in just minutes, no coding required. Simply embed the Cashwyre Checkout script on your site or e-commerce checkout page and start getting paid instantly.",
    color: "from-yellow-500 to-orange-500"
  },
  {
    icon: TrendingUp,
    title: "Crypto Offramp APIs",
    description: "Embed the Cashwyre Widget on your website to effortlessly receive donations from customers, friends, and loved ones. The widget appears neatly at the bottom corner (left or right, fully configurable) for a seamless giving experience.",
    color: "from-indigo-500 to-purple-500"
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
    title: "Bills payment",
    description: "We make it easy to pay for all your customers' utilities/ bills across Africa directly from your Cashwyre business portal - Pay electricity bills, cable TV subscriptions, airtime, data plans, and more."
  },
  {
    title: "Payouts",
    description: "Initiate money transfers to the bank account or wallet of beneficiaries in multiple countries directly from your dashboard."
  },
  {
    title: "Paylink",
    description: "Create a new invoice and send to your customers for payment. Using your Paylink URL, customers can make payment directly into your account."
  },
  {
    title: "Cards service",
    description: "As a Merchant, you can create dollar cards for your staff or customers and make payment anywhere cards are accepted. With our cards, you can buy from online stores, pay online subscriptions e.g. LinkedIn, Facebook, etc."
  },
  {
    title: "Crypto",
    description: "Create new crypto wallet addresses for your customers and send cryptocurrency to your beneficiaries directly from your dashboard."
  },
  {
    title: "Crypto4Cash",
    description: "Setup Crypto4Cash account to receive payments in crypto directly to your accounts in Fiat."
  },
  {
    title: "Crypto4Cash",
    description: "Setup Crypto4Cash account to receive payments in crypto directly to your accounts in Fiat."
  }
]

const checkoutWidget = [
  {
    title: "Cashwyre Checkout",
    description: "Accept payments or donations on your website in just minutes, no coding required. Simply embed the Cashwyre Checkout script on your site or e-commerce checkout page and start getting paid instantly."
  },
  {
    title: "Cashwyre Widget",
    description: "Embed the Cashwyre Widget on your website to effortlessly receive donations from customers, friends, and loved ones. The widget appears neatly at the bottom corner (left or right, fully configurable) for a seamless giving experience."
  }
]

const businessAPIs = [
  {
    title: "Payout API",
    description: "Integrate with our RESTful APIs for seamless payouts, remittances, and transfers across Africa in local currencies. Focus on growth while we expertly manage your payment infrastructure."
  },
  {
    title: "Bills payment API",
    description: "Our APIs make it easy to pay for utilities across Africa, including electricity bills, cable TV subscriptions, airtime, data plans, and more."
  },
  {
    title: "Crypto wallets API",
    description: "Whether you're building an online store to accept cryptocurrency payments, adding crypto wallets to your HRM solution for remote gig payments, or more—Cashwyre's API is the perfect solution for you."
  },
  {
    title: "Crypto4Cash",
    description: "We now receive payments in crypto as a business and have your bank account credited in local currencies in minutes—with our Offramp and Onramp APIs."
  }
]

export default function Business() {
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
          Cashwyre for Business helps businesses, merchants, and developers accept and manage payments with ease. We provide simple tools so you can focus on growth.
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

      {/* Services Grid */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto mb-20"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Core <span className="gradient-text"> Fintech Services</span>
          </h2>
          <p className="text-xl text-gray-400">
            Everything you need to build an amazing fintech products
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {businessServices.map((service, index) => (
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
          ))}
        </div>
      </motion.section>

      {/* Merchant Services */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto mb-20"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Our <span className="gradient-text">Merchant Services</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {merchantServices.map((service, index) => (
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

      {/* Business APIs */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto mb-20"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Leverage our <span className="gradient-text">Business APIs</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {businessAPIs.map((service, index) => (
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