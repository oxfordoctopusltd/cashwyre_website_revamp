"use client"
import { useState, useEffect } from "react"

type CurrencyInfo = {
  isCrypto?: boolean;
  countryCode: string;
  countryName: string;
  currencyCode: string;
  currencyName: string;
  canSend?: boolean;
  canReceive?: boolean;
};

type ConversionResult = {
  ReceiveAmount: number;
  ReceiveCurrency: string;
  ReceiveCurrencySymbol: string;
  SendAmount: number;
  SendCurrency: string;
  SendCurrencySymbol: string;
  BaseAmount: number;
  TotalDebitAmount: number;
  BaseFee: number;
  SendCurrencyFee: number;
  SendRate: number;
  ReceiveRate: number;
  Description: string;
  SendRateInfo: string;
  CrossRate: number;
};
import { motion } from "framer-motion"


const API_BASE = process.env.NEXT_PUBLIC_CASHWYRE_API_BASE;
const APP_ID = process.env.NEXT_PUBLIC_CASHWYRE_APP_ID || "67dc443a-d148-800a-ba3c-077f41b637a0";

function getRequestId() {
  return `001web${Math.floor(Math.random() * 1000000)}`;
}
export default function Calculator() {
  const [sendCurrencies, setSendCurrencies] = useState<CurrencyInfo[]>([]);
  const [receiveCurrencies, setReceiveCurrencies] = useState<CurrencyInfo[]>([]);
  const [sendCurrency, setSendCurrency] = useState("");
  const [receiveCurrency, setReceiveCurrency] = useState("");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch currencies on mount
  useEffect(() => {
    async function fetchCurrencies() {
      setError("");
      try {
        const res = await fetch("/api/currencies", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ AppId: APP_ID, RequestId: getRequestId() })
        });
        if (!res.ok) throw new Error("Failed to fetch currencies");
  const data = await res.json();
  console.log('Currency API response:', data);
  setSendCurrencies(data.sendCountryCurrencies || []);
  setReceiveCurrencies(data.receiveCountryCurrencies || []);
  // Set defaults
  if (data.sendCountryCurrencies?.length) setSendCurrency(data.sendCountryCurrencies[0].currencyCode);
  if (data.receiveCountryCurrencies?.length) setReceiveCurrency(data.receiveCountryCurrencies[0].currencyCode);
      } catch (e) {
        setError("Could not load currencies. Please try again later.");
      }
    }
    fetchCurrencies();
  }, []);

  // Handle conversion
  const handleConvert = async () => {
    setError("");
    setResult(null);
    setLoading(true);
    try {
      const requestBody = {
        SendAmount: parseFloat(amount),
        SendCurrency: sendCurrency,
        ReceiveAmount: null,
        ReceiveCurrency: receiveCurrency,
        UserCode: null,
        BusinessCode: null,
        AppId: APP_ID,
        RequestId: getRequestId()
      };
      console.log('Calculator request body:', requestBody);
      const res = await fetch("/api/calculator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody)
      });
      if (!res.ok) throw new Error("Failed to convert");
  const data = await res.json();
  console.log('Calculator API response:', data);
  // Support both lowercase and uppercase keys
  const isSuccess = data.Success ?? data.success;
  const message = data.Message ?? data.message;
  const resultData = data.Data ?? data.data;
  if (!isSuccess) throw new Error(message || "Conversion failed");
  setResult(resultData);
    } catch (e) {
      let msg = "Conversion failed";
      if (typeof e === "object" && e && "message" in e) {
        msg = (e as any).message || msg;
      }
      console.error('Calculator conversion error:', e);
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12 bg-[#181818]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-10 text-center"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-2 text-center">
            Crypto<span className="gradient-text">↗Fiat</span> Calculator
          </h2>
          <p className="text-gray-400 text-lg mb-2 text-center">
            Get instant estimates for your conversions
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl bg-[#232323] shadow-2xl flex flex-col md:flex-row items-stretch"
        >
          {/* Left: Description (fixed at top) */}
          <div className="flex-1 p-8 flex flex-col min-w-[320px] justify-start">
            <div className="mb-2">
              <p className="text-gray-300 text-lg">
                Choose the send and receive currencies, enter the amount, and Cashwyre will instantly show you how much the recipient gets.
                <span className="block mt-2 text-[#FFA726] font-semibold underline underline-offset-4 cursor-pointer hover:text-[#FF6B35] transition">Start transacting today!</span>
              </p>
            </div>
            {error && <p className="text-red-400 mt-2">{error}</p>}
          </div>
          {/* Right: Form and Result */}
          <div className="flex-1 p-8 flex flex-col min-w-[320px] justify-center">
            <form
              className="space-y-6"
              onSubmit={e => { e.preventDefault(); handleConvert(); }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select
                  value={sendCurrency}
                  onChange={(e) => setSendCurrency(e.target.value)}
                  className="w-full bg-[#232323] border border-white/20 rounded-lg px-4 py-3 text-white focus:border-[#FF6B35] focus:outline-none transition-colors appearance-none"
                  required
                >
                  <option value="" disabled>Select send currency</option>
                  {sendCurrencies.map((currency) => {
                    const code = (currency.currencyCode || '').toUpperCase();
                    const name = (currency.countryName || '').trim();
                    return (
                      <option key={code} value={currency.currencyCode}>
                        {name}
                      </option>
                    );
                  })}
                </select>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-[#FF6B35] focus:outline-none transition-colors"
                  placeholder="Send Amount"
                  min="0"
                  step="any"
                  required
                />
                <select
                  value={receiveCurrency}
                  onChange={(e) => setReceiveCurrency(e.target.value)}
                  className="w-full bg-[#232323] border border-white/20 rounded-lg px-4 py-3 text-white focus:border-[#FF6B35] focus:outline-none transition-colors appearance-none"
                  required
                >
                  <option value="" disabled>Select receive currency</option>
                  {receiveCurrencies.map((currency) => {
                    const code = (currency.currencyCode || '').toUpperCase();
                    const name = (currency.currencyName || '').trim();
                    return (
                      <option key={code} value={currency.currencyCode}>
                        {name}
                      </option>
                    );
                  })}
                </select>
                <input
                  type="text"
                  value={result && (result.ReceiveAmount !== undefined ? result.ReceiveAmount : (result as any).receiveAmount) !== undefined ? (result.ReceiveAmount !== undefined ? result.ReceiveAmount : (result as any).receiveAmount) : ""}
                  readOnly
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400"
                  placeholder="Receive Amount (auto)"
                />
              </div>
              <div className="flex justify-end mt-2">
                <button
                  type="submit"
                  className="bg-[#232323] border border-[#FFA726] text-[#FFA726] hover:bg-[#FF6B35] hover:text-white px-10 py-3 rounded-xl font-semibold shadow transition-all duration-300 text-lg min-w-[140px]"
                  disabled={loading}
                >
                  {loading ? "Calculating..." : "Calculate"}
                </button>
              </div>
            </form>
            {/* Result display */}
            {result && (
              <div className="mt-6 bg-[#181818] rounded-xl p-6 text-left shadow">
                <div className="mb-2 font-semibold text-gray-300">
                  Send Amount: <span className="text-white">{(result.SendCurrencySymbol !== undefined ? result.SendCurrencySymbol : (result as any).sendCurrencySymbol) || ''} {(result.SendAmount !== undefined ? result.SendAmount : (result as any).sendAmount) || ''}</span>
                </div>
                <div className="mb-2 font-semibold text-gray-300">
                  Receive Amount: <span className="text-white">{(result.ReceiveCurrency !== undefined ? result.ReceiveCurrency : (result as any).receiveCurrency) || ''} {(result.ReceiveAmount !== undefined ? result.ReceiveAmount : (result as any).receiveAmount) || ''}</span>
                </div>
                <div className="mb-2 text-gray-300">
                  Rate: <span className="text-white">{(result.SendRateInfo !== undefined ? result.SendRateInfo : (result as any).sendRateInfo) || ''}</span>
                </div>
                <div className="text-[#FFA726] text-sm mt-2">
                  {(result.Description !== undefined ? result.Description : (result as any).description) || ''}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}