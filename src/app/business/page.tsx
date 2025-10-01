"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Code, CreditCard, Globe, Zap, Shield, TrendingUp, Users, Receipt, Send, Link2, Wallet, User } from "lucide-react"
import Image from "next/image"

const businessServices = [
  // {
  //   icon: ArrowRight,
  //   title: "Transfer API",
  //   description: "Seamless payouts and transfers across Africa in local currencies. We handle payments, you focus on growth.",
  //   color: "from-blue-500 to-cyan-500"
  // },
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
    icon: Globe,
    title: "Crypto Wallet API",
    description: "From online stores accepting crypto to HRM platforms paying remote teams, Cashwyre's API powers it all.",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: CreditCard,
    title: "Dollar Card API",
    description: "Issue instant virtual dollar cards for global payments. We handle the card infrastructure, you focus on your customers.",
    color: "from-indigo-500 to-purple-500"
  },
  {
    icon: Shield,
    title: "Bills Payment API",
    description: "With our APIs, you can easily pay for utilities across Africa, electricity, Cable TV, airtime, data, and more.",
    color: "from-green-500 to-emerald-500"
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
    icon: Receipt,
    title: "Bills Payment",
    description: "Easily pay your customers' bills across Africa from the Cashwyre business portal, electricity, TV, airtime, data, and more.",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: Send,
    title: "Transfers",
    description: "Easily transfer funds to beneficiaries' bank accounts or wallets in different countries, right from your Business Portal.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Link2,
    title: "Paylink API",
    description: "With your personalized payment link, accept global payments and enjoy instant local currency settlement across Africa.",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: CreditCard,
    title: "Virtual Cards",
    description: "Create virtual dollar cards for your team or customers directly from your business portal, shop online, pay subscriptions, and more.",
    color: "from-indigo-500 to-purple-500"
  },
  {
    icon: Wallet,
    title: "Crypto Wallets",
    description: "Create new crypto wallets for your team or customers and send cryptocurrency to your beneficiaries directly from the Portal.",
    color: "from-orange-500 to-red-500"
  }
]

const checkoutWidget = [
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
        {/* Horizontal line, 70% width, margin top */}
        <div className="w-[70%] h-0.5 bg-gradient-to-r from-[#FF6B35] to-[#FFA726] mx-auto my-12" />
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
              onClick={() => setActiveTab('businesses')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-8 py-4 rounded-l-2xl font-semibold text-lg transition-all duration-300 ${
                activeTab === 'businesses'
                  ? 'bg-gradient-to-r from-[#FF6B35] to-[#FFA726] text-white shadow-lg'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              FOR BUSINESSES
            </motion.button>
            <motion.button
              onClick={() => setActiveTab('fintechs')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-8 py-4 rounded-r-2xl font-semibold text-lg transition-all duration-300 ${
                activeTab === 'fintechs'
                  ? 'bg-gradient-to-r from-[#FF6B35] to-[#FFA726] text-white shadow-lg'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              FOR FINTECHS
            </motion.button>
          </div>
          {/* Slogans under each tab */}
          {activeTab === 'fintechs' ? (
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-6">
              Whether you’re a startup or an enterprise business, our easy-to-use API infrastructure gives your app everything it needs to build and scale globally.
            </p>
          ) : (
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-6">
              Whether you run a small business or work as a solopreneur, with the Cashwyre Business Portal, you can accept payments globally and serve customers with ease
            </p>
          )}
        </div>
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {activeTab === 'fintechs'
            ? businessServices.map((service, index) => {
                // Map titles to URLs
                const apiLinks = {
                  'Crypto Onramp API': 'https://www.business.cashwyre.com/doc/api#onramp',
                  'Crypto Offramp API': 'https://www.business.cashwyre.com/doc/api#offramp_api',
                  'Crypto Wallet API': 'https://www.business.cashwyre.com/doc/api#get_crypto_assets_info',
                  'Dollar Card API': 'https://www.business.cashwyre.com/doc/api#create_customer_card',
                  'Bills Payment API': 'https://www.business.cashwyre.com/doc/api#getcabletv_info',
                  'Paylink API': 'https://www.business.cashwyre.com/doc/api#cashwyre_inline',
                } as const;
                return (
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
                    <a
                      href={apiLinks[service.title as keyof typeof apiLinks]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 text-[#FF6B35] font-semibold hover:underline hover:text-[#FFA726] transition-colors"
                    >
                      Read more
                    </a>
                  </motion.div>
                );
              })
            : merchantServices.map((service, index) => (
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
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-3/4 h-0.5 bg-gradient-to-r from-[#FF6B35] to-[#FFA726] mx-auto mb-8"
          />
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Cashwyre <span className="gradient-text">Checkout/Widget</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Scale your business globally with Cashwyre checkout/widget. It is ideal for businesses of any size.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {checkoutWidget.map((service, index) => {
            // Add read more links for each card
            let readMoreUrl = '';
            if (service.title.includes('Checkout')) {
              readMoreUrl = 'https://www.business.cashwyre.com/doc/api#cashwyre_inline';
            } else if (service.title.includes('Widget')) {
              readMoreUrl = 'https://www.business.cashwyre.com/doc/api#cashwyre_widget';
            }
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-6 space-y-4"
              >
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <p className="text-gray-400">{service.description}</p>
                {readMoreUrl && (
                  <a
                    href={readMoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-[#FF6B35] font-semibold hover:underline hover:text-[#FFA726] transition-colors"
                  >
                    Read more
                  </a>
                )}
              </motion.div>
            );
          })}
        </div>
        <div className="text-center">
          <motion.a
            href="/demo/checkout"
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-r from-[#FF6B35] to-[#FFA726] px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-lg transition-all duration-300 inline-block"
          >
            Live Demo
          </motion.a>
        </div>
      </motion.section>


      {/* API Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto mb-20"
      >
        <div className="glass-card p-8 lg:p-12 text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-[#FF6B35] to-[#FFA726] rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Code className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Build with <span className="gradient-text">Cashwyre APIs</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
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
        </div>
      </motion.section>

      {/* Partners Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto mb-20 text-center"
      >
        <div className="mx-auto w-full" style={{ maxWidth: '70%' }}>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Our Customers
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Most recent Businesses integrated to Cashwyre For Business APIs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/10 p-4 rounded-lg flex items-center justify-center min-h-[110px] min-w-[220px]"
              >
                <Image src={partner.src} alt={`${partner.name} logo`} width={150} height={75} className="object-contain object-center h-[75px] w-[150px] mx-auto" />
              </motion.div>
            ))}
          </div>
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
                Get Started Now
              </motion.a>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  )
}