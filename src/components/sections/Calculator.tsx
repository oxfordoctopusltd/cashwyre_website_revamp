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
    <section className="py-12 bg-[#181818]
    ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-10"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-2">
            Crypto<span className="gradient-text">↗Fiat</span> Calculator
          </h2>
          <p className="text-gray-400 text-lg mb-2">
            Get instant estimates for your conversions
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl bg-[#232323] shadow-2xl flex flex-col md:flex-row items-stretch"
        >
          {/* Left: Description */}
          <div className="flex-1 p-8 flex flex-col justify-center min-w-[320px]">
            <h3 className="text-3xl font-semibold mb-4 text-white">Crypto↗Fiat Calculator</h3>
            <p className="text-gray-300 text-lg mb-2">
              Select send currency, receive currency, and supply the amount to send.<br />
              Cashwyre instantly computes an estimate of what will be received if the transaction is treated immediately.
              <span className="block mt-2 text-[#FFA726] font-semibold underline underline-offset-4 cursor-pointer hover:text-[#FF6B35] transition">Send money freely today!</span>
            </p>
          </div>
          {/* Right: Form */}
          <div className="flex-1 p-8 flex flex-col justify-center min-w-[320px]">
            <form
              className="space-y-6"
              onSubmit={e => { e.preventDefault(); handleConvert(); }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select
                  value={sendCurrency}
                  onChange={(e) => setSendCurrency(e.target.value)}
                  className="w-full bg-[#232323] border border-white/20 rounded-lg px-4 py-3 text-white focus:border-[#FF6B35] focus:outline-none transition-colors appearance-none"
                >
                  <option value="" disabled>Select send currency</option>
                  {currencies.map((currency) => (
                    <option key={currency.code} value={currency.code}>
                      {currency.flag} {currency.code} - {currency.name}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-[#FF6B35] focus:outline-none transition-colors"
                  placeholder="Send Amount"
                  min="0"
                  required
                />
                <select
                  value={receiveCurrency}
                  onChange={(e) => setReceiveCurrency(e.target.value)}
                  className="w-full bg-[#232323] border border-white/20 rounded-lg px-4 py-3 text-white focus:border-[#FF6B35] focus:outline-none transition-colors appearance-none"
                >
                  <option value="" disabled>Select receive currency</option>
                  {currencies.map((currency) => (
                    <option key={currency.code} value={currency.code}>
                      {currency.flag} {currency.code} - {currency.name}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  value={convertedAmount}
                  readOnly
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400"
                  placeholder="Receive Amount (optional)"
                />
              </div>
              <div className="flex justify-end mt-2">
                <button
                  type="submit"
                  className="bg-[#232323] border border-[#FFA726] text-[#FFA726] hover:bg-[#FF6B35] hover:text-white px-10 py-3 rounded-xl font-semibold shadow transition-all duration-300 text-lg min-w-[140px]"
                >
                  Calculate
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}