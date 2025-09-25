"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRightLeft } from "lucide-react"

const currencies = [
  { code: "BTC", name: "Bitcoin", flag: "₿" },
  { code: "USDT", name: "Tether", flag: "₮" },
  { code: "USDC", name: "USD Coin", flag: "$" },
  { code: "NGN", name: "Nigerian Naira", flag: "₦" },
  { code: "GHS", name: "Ghanaian Cedi", flag: "₵" },
  { code: "ZAR", name: "South African Rand", flag: "R" },
  { code: "KES", name: "Kenyan Shilling", flag: "KSh" },
]

export default function Calculator() {
  const [sendCurrency, setSendCurrency] = useState("BTC")
  const [receiveCurrency, setReceiveCurrency] = useState("NGN")
  const [amount, setAmount] = useState("1")
  const [convertedAmount, setConvertedAmount] = useState("0")

  const handleConvert = () => {
    // Mock conversion logic
    const rates: { [key: string]: number } = {
      "BTC": 50000000,
      "USDT": 1500,
      "USDC": 1500,
      "NGN": 1,
      "GHS": 12,
      "ZAR": 80,
      "KES": 120,
    }
    
    const sendRate = rates[sendCurrency] || 1
    const receiveRate = rates[receiveCurrency] || 1
    const result = (parseFloat(amount) * sendRate) / receiveRate
    setConvertedAmount(result.toFixed(2))
  }

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Crypto<span className="gradient-text">↗Fiat</span> Calculator
          </h2>
          <p className="text-gray-400 text-lg">
            Get instant estimates for your conversions
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="glass-card p-8 space-y-6"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-300">You Send</label>
              <div className="space-y-3">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-[#FF6B35] focus:outline-none transition-colors"
                  placeholder="Enter amount"
                />
                <select
                  value={sendCurrency}
                  onChange={(e) => setSendCurrency(e.target.value)}
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:border-[#FF6B35] focus:outline-none transition-colors"
                >
                  {currencies.map((currency) => (
                    <option key={currency.code} value={currency.code}>
                      {currency.flag} {currency.code} - {currency.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-300">You Receive</label>
              <div className="space-y-3">
                <input
                  type="text"
                  value={convertedAmount}
                  readOnly
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400"
                  placeholder="0.00"
                />
                <select
                  value={receiveCurrency}
                  onChange={(e) => setReceiveCurrency(e.target.value)}
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:border-[#FF6B35] focus:outline-none transition-colors"
                >
                  {currencies.map((currency) => (
                    <option key={currency.code} value={currency.code}>
                      {currency.flag} {currency.code} - {currency.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleConvert}
              className="bg-gradient-to-r from-[#FF6B35] to-[#FFA726] px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center space-x-2"
            >
              <ArrowRightLeft className="w-5 h-5" />
              <span>Convert</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}