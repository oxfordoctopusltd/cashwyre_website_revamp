"use client";
import React, { useState, useEffect } from "react";

interface CryptoAsset {
  code: string;
  name: string;
  minimumSendAmount: number;
  maximumSendAmount: number;
  numberOfDecimalPlaces: number;
  networks: any[];
}

interface CryptoAssetSelectionProps {
  cryptoAssets: CryptoAsset[];
  selectedCurrency: string;
  amount: string;
  currencySymbol: string;
  onBack: () => void;
}

// API function to calculate crypto amount
async function calculateCryptoAmount(fiatAmount: string, fiatCurrency: string, cryptoAsset: string) {
  const res = await fetch("/api/crypto/calculateCryptoAmount", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      fiatAmount: parseFloat(fiatAmount),
      fiatCurrency,
      cryptoAsset
    })
  });
  if (!res.ok) throw new Error("Failed to calculate crypto amount");
  return res.json();
}

export default function CryptoAssetSelection({
  cryptoAssets,
  selectedCurrency,
  amount,
  currencySymbol,
  onBack
}: CryptoAssetSelectionProps) {
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoAsset | null>(null);
  const [selectedNetwork, setSelectedNetwork] = useState<string | null>(null);
  const [cryptoAmount, setCryptoAmount] = useState<string>("");
  const [exchangeRate, setExchangeRate] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Calculate crypto amount when crypto asset is selected
    if (selectedCrypto && amount) {
      calculateCryptoAmountForAsset(selectedCrypto);
    }
  }, [selectedCrypto, amount]);

  const calculateCryptoAmountForAsset = async (asset: CryptoAsset) => {
    setLoading(true);
    try {
      const calculation = await calculateCryptoAmount(amount, selectedCurrency, asset.code);
      if (calculation && calculation.data) {
        setCryptoAmount(calculation.data.cryptoAmount);
        setExchangeRate(calculation.data.exchangeRate);
      }
    } catch (error) {
      console.error("Failed to calculate crypto amount:", error);
    } finally {
      setLoading(false);
    }
  };

  const getCryptoName = (assetName: string) => {
    // Extract the crypto name from the asset name (e.g., "🇹 USDT" -> "USDT")
    const parts = assetName.split(' ');
    return parts[parts.length - 1];
  };

  return (
    <div className="glass-card rounded-2xl p-8 border border-white/10 shadow-xl max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="text-gray-400 hover:text-white transition-colors"
        >
          ← Back
        </button>
        <h2 className="text-2xl font-bold text-white">Crypto Asset</h2>
        <div></div> {/* Spacer for flex alignment */}
      </div>

      <div className="space-y-6">
        {/* Crypto Asset Selection */}
        <div>
          <label className="text-gray-500 mb-2 block">Select Crypto Asset</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {cryptoAssets.map((asset) => (
              <button
                key={asset.code}
                onClick={() => setSelectedCrypto(asset)}
                className={`p-4 rounded-lg border-2 text-left transition-all ${
                  selectedCrypto?.code === asset.code
                    ? "border-[#FF6B35] bg-[#FF6B35]/10"
                    : "border-gray-600 hover:border-gray-400"
                }`}
              >
                <div className="font-semibold text-white">{asset.name}</div>
                <div className="text-sm text-gray-400 mt-1">
                  Min: {asset.minimumSendAmount} - Max: {asset.maximumSendAmount}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Network Selection */}
        {selectedCrypto && selectedCrypto.networks && selectedCrypto.networks.length > 0 && (
          <div>
            <label className="text-gray-500 mb-2 block">Select Network</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {selectedCrypto.networks.map((network: any, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedNetwork(network.name || network.code)}
                  className={`p-3 rounded-lg border-2 text-left transition-all ${
                    selectedNetwork === (network.name || network.code)
                      ? "border-[#FF6B35] bg-[#FF6B35]/10"
                      : "border-gray-600 hover:border-gray-400"
                  }`}
                >
                  <div className="font-semibold text-white">
                    {network.name || network.code}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Receive Currency */}
        <div className="bg-gray-800/50 rounded-lg p-4">
          <h3 className="text-gray-500 mb-3">Receive Currency</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Country</span>
              <span className="text-white font-semibold">{selectedCurrency}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Receive Amount ({selectedCurrency})</span>
              <span className="text-white font-semibold">
                {currencySymbol}{parseFloat(amount).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Crypto Amount */}
        {selectedCrypto && (
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h3 className="text-gray-500 mb-3">
              Crypto Amount ({getCryptoName(selectedCrypto.name)})
            </h3>
            <div className="text-2xl font-bold text-white text-center">
              {loading ? "Calculating..." : cryptoAmount}
            </div>
            {selectedCrypto && (
              <div className="text-sm text-gray-400 text-center mt-2">
                Note: The min. and max. you can send is {selectedCrypto.name} ({selectedCrypto.minimumSendAmount} - {selectedCrypto.maximumSendAmount})
              </div>
            )}
          </div>
        )}

        {/* Exchange Rate */}
        {exchangeRate && (
          <div className="text-center text-gray-400">
            <p>1 {selectedCrypto ? getCryptoName(selectedCrypto.name) : "BTC"} = {currencySymbol}{parseFloat(exchangeRate).toLocaleString()}</p>
            <p className="text-sm mt-1">
              NB: Delays in completing the transaction may affect the applicable rates.
            </p>
          </div>
        )}

        {/* Proceed Button */}
        <button
          disabled={!selectedCrypto || (selectedCrypto.networks && selectedCrypto.networks.length > 0 && !selectedNetwork) || loading}
          className="w-full bg-[#FF6B35] text-white py-4 rounded-lg font-semibold hover:bg-[#FFA726] transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          {loading ? "Calculating..." : "Proceed"}
        </button>
      </div>
    </div>
  );
}