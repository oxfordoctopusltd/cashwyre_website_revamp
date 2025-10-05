// components/crypto/PayWithCryptoBox.tsx
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

// API functions
async function fetchCurrenciesProxy() {
  const res = await fetch("/api/crypto/getCrypto4CashCurrenciesProxy", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      AppId: "67dc443a-d148-800a-ba3c-077f41b637a0",
      RequestId: "001web001web9"
    })
  });
  if (!res.ok) throw new Error("Failed to fetch currencies");
  return res.json();
}

async function fetchCryptoInfo() {
  const res = await fetch("/api/crypto/getCrypto4CashInfo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      AppId: "67dc443a-d148-800a-ba3c-077f41b637a0",
      RequestId: "001web001web9"
    })
  });
  if (!res.ok) throw new Error("Failed to fetch crypto info");
  return res.json();
}

interface Currency {
  code: string;
  countryCode: string;
  name: string;
  symbol: string;
  minimumAmount: number;
  maximumAmount: number;
}

interface CryptoAsset {
  code: string;
  name: string;
  minimumSendAmount: number;
  maximumSendAmount: number;
  numberOfDecimalPlaces: number;
  networks: any[];
  assetType: string;
  status: string;
  imageURL: string;
}

export default function PayWithCryptoBox() {
  const router = useRouter();
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState<string>("");
  const [amount, setAmount] = useState("");
  const [minAmount, setMinAmount] = useState<number>(0);
  const [maxAmount, setMaxAmount] = useState<number>(0);
  const [currencySymbol, setCurrencySymbol] = useState<string>("");
  const [showSend, setShowSend] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCryptoSelection, setShowCryptoSelection] = useState(false);
  const [cryptoAssets, setCryptoAssets] = useState<CryptoAsset[]>([]);

  useEffect(() => {
    async function fetchCurrencies() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchCurrenciesProxy();
        console.log('Currencies API Response:', res); // Debug log
        
        // Map backend fields to expected frontend fields
        if (res && Array.isArray(res.data)) {
          const mapped = res.data.map((c: any) => {
            // Try to get symbol from info (e.g., "₦-NG") or from description (e.g., "₦1,000.00 - ₦400,000.00")
            let symbol = '';
            if (typeof c.info === 'string' && c.info.length > 0) {
              symbol = c.info[0];
            } else if (typeof c.description === 'string' && c.description.length > 0) {
              symbol = c.description[0];
            }
            return {
              ...c,
              code: c.code || c.countryCode || '',
              countryCode: c.code || c.countryCode || '',
              symbol,
              minimumAmount: c.minimumReceiveAmount || c.minimumAmount || 1000,
              maximumAmount: c.maximumReceiveAmount || c.maximumAmount || 400000,
            };
          });
          setCurrencies(mapped);
          if (mapped.length > 0) {
            const defaultCurrency = mapped[0];
            setSelectedCurrency(defaultCurrency.countryCode || "");
            setMinAmount(defaultCurrency.minimumAmount ?? 0);
            setMaxAmount(defaultCurrency.maximumAmount ?? 0);
            setCurrencySymbol(defaultCurrency.symbol || "");
            console.log('Default currency set:', defaultCurrency); // Debug log
          }
        } else {
          setError("Invalid response format from server");
        }
      } catch (err: any) {
        console.error('Error fetching currencies:', err);
        setError("Failed to load currencies");
      } finally {
        setLoading(false);
      }
    }
    fetchCurrencies();
  }, []);

  useEffect(() => {
    // Update min/max/symbol when currency changes
    if (currencies.length > 0 && selectedCurrency) {
      const curr = currencies.find((c: any) => c.countryCode === selectedCurrency);
      if (curr) {
        setMinAmount(curr.minimumAmount);
        setMaxAmount(curr.maximumAmount);
        setCurrencySymbol(curr.symbol || "");
      }
    }
  }, [selectedCurrency, currencies]);

  useEffect(() => {
    // Only show send if amount is valid
    const amt = parseFloat(amount);
    setShowSend(!isNaN(amt) && amt >= minAmount && amt <= maxAmount);
  }, [amount, minAmount, maxAmount]);

  const handleSend = async () => {
    if (!showSend) return;
    
    // Navigate to crypto4cash page with pre-filled amount and currency
    const params = new URLSearchParams();
    if (selectedCurrency) params.append('currency', selectedCurrency);
    if (amount) params.append('amount', amount);
    
    router.push(`/crypto4cash?${params.toString()}`);
  };

  // Modal for CryptoAssetSelection with full screen blur and sleek design
  const CryptoAssetModal = () => {
    // Close on Escape key
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setShowCryptoSelection(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }, []);

    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 2147483647, // Maximum possible z-index
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#000000', // Completely opaque black
        }}
        onClick={() => setShowCryptoSelection(false)}
      >
        {/* Close button */}
        <button
          onClick={() => setShowCryptoSelection(false)}
          style={{
            position: 'absolute',
            top: 24,
            right: 24,
            zIndex: 2147483647,
            background: '#FF6B35',
            border: 'none',
            color: 'white',
            fontSize: '14px',
            fontWeight: 'bold',
            cursor: 'pointer',
            padding: '8px 16px',
            borderRadius: '8px',
          }}
        >
          Close X
        </button>
        {/* Modal content */}
        <div
          style={{
            position: 'relative',
            background: 'linear-gradient(135deg, #2a2a2e 0%, #1e1e22 100%)',
            borderRadius: '16px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            width: '100%',
            maxWidth: 540,
            minWidth: 320,
            margin: '0 16px',
            maxHeight: '90vh',
            overflowY: 'auto',
          }}
          onClick={e => e.stopPropagation()}
        >
          {/* We'll use the Crypto4Cash flow instead of the modal selection */}
          <div className="p-8 text-center text-white">
            <h3 className="text-xl font-bold mb-4">Redirecting to Crypto4Cash</h3>
            <p className="text-gray-400 mb-4">
              You will be redirected to the complete Crypto4Cash flow to finish your transaction.
            </p>
            <button
              onClick={() => setShowCryptoSelection(false)}
              className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (loading) return <div className="glass-card p-8 text-center">Loading currencies...</div>;
  if (error) return <div className="glass-card p-8 text-center text-red-500">{error}</div>;

  // Only render if we have currencies data
  if (currencies.length === 0) {
    return <div className="glass-card p-8 text-center text-yellow-500">No currencies available</div>;
  }

  // Find the selected currency object
  const selectedCurrencyObj = currencies.find((c: any) => c.countryCode === selectedCurrency);
  const hasAllFields = selectedCurrencyObj &&
    typeof selectedCurrencyObj.minimumAmount === 'number' && selectedCurrencyObj.minimumAmount > 0 &&
    typeof selectedCurrencyObj.maximumAmount === 'number' && selectedCurrencyObj.maximumAmount > 0;

  if (!hasAllFields) {
    return <div className="glass-card p-8 text-center text-yellow-500">Currency data not available from backend. Please try again later.</div>;
  }

  return (
    <>
      {showCryptoSelection && <CryptoAssetModal />}
      <div className="glass-card rounded-2xl p-8 border border-white/10 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
      <div className="flex-1 min-w-[300px]">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
          Pay with <span className="text-[#FF6B35]">Crypto</span>
        </h2>
        <p className="text-gray-300 text-lg max-w-xl">
          Spend your Crypto without selling
        </p>
      </div>
      <div className="flex-1 min-w-[220px] max-w-md w-full flex flex-col gap-2">
        <label htmlFor="currency" className="text-gray-500 mb-1">Enter amount to pay</label>
        <div className="flex flex-col sm:flex-row w-full gap-2">
          <select
            id="currency"
            className="w-full sm:w-auto rounded-lg sm:rounded-l-lg border border-gray-100 bg-white text-black px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
            style={{ minWidth: 90 }}
            value={selectedCurrency}
            onChange={e => setSelectedCurrency(e.target.value)}
          >
            {currencies.map((c: any) => (
              <option key={c.countryCode} value={c.countryCode}>{c.countryCode}</option>
            ))}
          </select>
          <input
            type="number"
            min={selectedCurrencyObj.minimumAmount}
            max={selectedCurrencyObj.maximumAmount}
            step="100"
            placeholder={selectedCurrencyObj.minimumAmount.toString()}
            className="w-full sm:w-auto flex-1 rounded-md border-t border-b sm:border-t sm:border-b border-gray-300 bg-white text-black px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#FF6B35] sm:border-l-0"
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
          {showSend && (
            <button
              type="button"
              onClick={handleSend}
              className="w-full sm:w-auto rounded-lg sm:rounded-r-lg bg-[#FF6B35] text-white px-6 py-3 font-semibold hover:bg-[#FFA726] transition-colors border border-[#FF6B35] sm:border-l-0"
            >
              Send
            </button>
          )}
        </div>
        <div className="text-gray-400 text-sm mt-1">
          {selectedCurrencyObj.symbol}{selectedCurrencyObj.minimumAmount.toLocaleString()} - {selectedCurrencyObj.symbol}{selectedCurrencyObj.maximumAmount.toLocaleString()}
        </div>
      </div>
      </div>
    </>
  );
}