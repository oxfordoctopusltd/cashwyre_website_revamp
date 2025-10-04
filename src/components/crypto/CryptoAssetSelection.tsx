"use client";
import React, { useState, useEffect } from "react";

interface Network {
  code: string;
  name: string;
  description: string;
  // Optional fields from backend that may contain the required option code
  optionCode?: string;
  sendCryptoAssetOptionCode?: string;
  SendCryptoAssetOptionCode?: string;
}

interface CryptoAsset {
  code: string;
  name: string;
  minimumSendAmount: number;
  maximumSendAmount: number;
  numberOfDecimalPlaces: number;
  networks: Network[];
  assetType: string;
  status: string;
  imageURL: string;
}

interface Currency {
  code: string;
  name: string;
  symbol: string;
  minimumAmount: number;
  maximumAmount: number;
}

interface CryptoAssetSelectionProps {
  cryptoAssets: CryptoAsset[];
  currencies: Currency[];
  onProceed: (data: any) => void;
  onClose: () => void;
  // Preselected values coming from "Pay with Crypto"
  initialCurrencyCode?: string;
  initialReceiveAmount?: string | number;
}

// API function to calculate crypto amount (fallback)
async function calculateCryptoAmount(fiatAmount: number, fiatCurrency: string, cryptoAsset: string) {
  const res = await fetch("/api/crypto/calculateCryptoAmount", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fiatAmount, fiatCurrency, cryptoAsset }),
  });
  if (!res.ok) throw new Error("Failed to calculate crypto amount (fallback)");
  return res.json();
}

// API function to get fiat rate for crypto (primary)
async function getCryptoFiatRate(sendCryptoAssetOptionCode: string, receiveCurrency: string, receiveAmountParam: number) {
  const res = await fetch("/api/crypto/getCryptoFiatRate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      SendCryptoAssetOptionCode: sendCryptoAssetOptionCode,
      ReceiveCurrency: receiveCurrency,
      ReceiveAmount: receiveAmountParam,
      BusinessCode: null,
      AppId: "67dc443a-d148-800a-ba3c-077f41b637a0",
      RequestId: `B${Math.random().toString(36).substring(2, 10)}`
    })
  });
  if (!res.ok) throw new Error("Failed to call getCryptoFiatRate");
  return res.json();
}

export default function CryptoAssetSelection({
  cryptoAssets,
  currencies,
  onProceed,
  onClose,
  initialCurrencyCode,
  initialReceiveAmount,
}: CryptoAssetSelectionProps) {
  const [selectedCryptoAsset, setSelectedCryptoAsset] = useState<CryptoAsset | null>(null);
  const [selectedNetwork, setSelectedNetwork] = useState<Network | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency | null>(null);
  const [receiveAmount, setReceiveAmount] = useState<string>("");
  const [cryptoAmount, setCryptoAmount] = useState<string>("");
  const [exchangeRate, setExchangeRate] = useState<string>("");
  const [loading, setLoading] = useState(false);

  // Set defaults when component loads
  useEffect(() => {
    // Set default crypto asset and chain from backend list
    if (cryptoAssets.length > 0) {
      const defaultCrypto = cryptoAssets[0];
      setSelectedCryptoAsset(defaultCrypto);
      if (defaultCrypto.networks && defaultCrypto.networks.length > 0) {
        setSelectedNetwork(defaultCrypto.networks[0]);
      }
    }

    // If we have a preselected currency from PayWithCrypto, use it
    if (currencies.length > 0) {
      let currencyToSet: Currency | undefined;
      if (initialCurrencyCode) {
        currencyToSet = currencies.find((c) => c.code === initialCurrencyCode);
      }
      if (!currencyToSet) {
        currencyToSet = currencies[0];
      }
      if (currencyToSet) setSelectedCurrency(currencyToSet);
    }

    // Prepopulate receive amount if provided
    if (typeof initialReceiveAmount !== 'undefined' && initialReceiveAmount !== null) {
      setReceiveAmount(String(initialReceiveAmount));
    }
  }, [cryptoAssets, currencies, initialCurrencyCode, initialReceiveAmount]);

  // Calculate rates when inputs change
  useEffect(() => {
    if (selectedCryptoAsset && selectedCurrency && receiveAmount) {
      calculateRate();
    }
  }, [selectedCryptoAsset, selectedCurrency, selectedNetwork, receiveAmount]);

  const calculateRate = async () => {
    if (!selectedCryptoAsset || !selectedCurrency || !receiveAmount || parseFloat(receiveAmount) <= 0) {
      return;
    }
    
    setLoading(true);
    try {
      const amount = parseFloat(receiveAmount);
      // Resolve the network/asset option code expected by backend
      const primaryOptionCode = resolveOptionCode(selectedCryptoAsset, selectedNetwork);
      if (!primaryOptionCode) {
        console.warn("No valid SendCryptoAssetOptionCode could be resolved from asset/network.");
        setLoading(false);
        return;
      }
      let response = await getCryptoFiatRate(primaryOptionCode, selectedCurrency.code, amount);

      // Fallback retry: try a composed code like "ASSET-NETWORK" if backend returns no data
      if ((!response || !response.data) && selectedCryptoAsset && selectedNetwork) {
        const composed = `${selectedCryptoAsset.code}-${selectedNetwork.code}`;
        if (composed !== primaryOptionCode) {
          try {
            console.debug("Retrying getCryptoFiatRate with composed option code:", composed);
            response = await getCryptoFiatRate(composed, selectedCurrency.code, amount);
          } catch (e) {
            console.warn("Fallback attempt failed:", e);
          }
        }
      }
      
      let computedCrypto = '';
      let exchangeLabel = '';
      const decimals = selectedCryptoAsset.numberOfDecimalPlaces ?? 8;

      const applyResponse = (resp: any) => {
        if (!resp) return false;
        const d = resp.data || resp;
        if (!d) return false;
        // Try multiple casings/field names
        const sendAmount =
          typeof d.sendAmount === 'number' ? d.sendAmount :
          typeof d.SendAmount === 'number' ? d.SendAmount :
          typeof d.cryptoAmount === 'number' ? d.cryptoAmount :
          (typeof d.cryptoAmount === 'string' ? parseFloat(d.cryptoAmount) : NaN);

        const receiveAmountRate =
          typeof d.receiveAmount === 'number' ? d.receiveAmount :
          typeof d.ReceiveAmount === 'number' ? d.ReceiveAmount :
          (typeof d.exchangeRate === 'string' ? parseFloat(String(d.exchangeRate).replace(/[^0-9.]/g, '')) : (
            typeof d.exchangeRate === 'number' ? d.exchangeRate : NaN
          ));

        const sendRateInfo = d.sendRateInfo || d.SendRateInfo || '';

        if (typeof sendAmount === 'number' && !isNaN(sendAmount) && sendAmount > 0) {
          computedCrypto = sendAmount.toFixed(decimals);
        }

        if (!computedCrypto && !isNaN(receiveAmountRate) && receiveAmountRate > 0) {
          computedCrypto = (amount / receiveAmountRate).toFixed(decimals);
        }

        if (!computedCrypto && typeof sendRateInfo === 'string' && sendRateInfo.length > 0) {
          const match = sendRateInfo.match(/=\s*([^\s]+)/);
          const rateStr = match ? match[1] : '';
          const numeric = parseFloat(rateStr.replace(/[^0-9.]/g, ''));
          if (!isNaN(numeric) && numeric > 0) {
            computedCrypto = (amount / numeric).toFixed(decimals);
            exchangeLabel = rateStr;
          }
        }

        const currencySymbol = d.receiveCurrencySymbol || d.ReceiveCurrencySymbol || selectedCurrency.symbol || '';
        if (!exchangeLabel && !isNaN(receiveAmountRate) && receiveAmountRate > 0) {
          exchangeLabel = `${currencySymbol}${receiveAmountRate.toLocaleString()}`;
        }
        return !!computedCrypto;
      };

      let applied = applyResponse(response);

      // If still not computed, fallback to calculateCryptoAmount API
      if (!applied) {
        const cryptoAssetCode = selectedNetwork ? `${selectedCryptoAsset.code}-${selectedNetwork.code}` : selectedCryptoAsset.code;
        try {
          console.debug("Falling back to /api/crypto/calculateCryptoAmount with:", {
            fiatAmount: amount,
            fiatCurrency: selectedCurrency.code,
            cryptoAsset: cryptoAssetCode,
          });
          const fallbackResponse = await calculateCryptoAmount(amount, selectedCurrency.code, cryptoAssetCode);
          applied = applyResponse(fallbackResponse);
        } catch (e) {
          console.warn("Fallback /calculateCryptoAmount failed:", e);
        }
      }

      if (computedCrypto) setCryptoAmount(computedCrypto);
      if (exchangeLabel) setExchangeRate(exchangeLabel);

      if (!computedCrypto) {
        console.warn("Could not compute crypto amount from API responses.", { response });
      }
    } catch (error) {
      console.error("Error calculating rate:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleProceed = () => {
    if (!selectedCryptoAsset || !selectedCurrency || !receiveAmount || !cryptoAmount) {
      return;
    }
    
    onProceed({
      cryptoAsset: selectedCryptoAsset,
      network: selectedNetwork,
      currency: selectedCurrency,
      receiveAmount,
      cryptoAmount,
      exchangeRate
    });
  };

  const handleAssetSelect = (asset: CryptoAsset) => {
    setSelectedCryptoAsset(asset);
    if (asset.networks && asset.networks.length > 0) {
      setSelectedNetwork(asset.networks[0]);
    }
  };

  return (
    <div className="bg-[#1a1a1a] text-white p-8 rounded-2xl shadow-2xl w-full max-w-lg mx-auto">
      {/* Top actions: Back and Close */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onClose}
          className="text-sm px-3 py-1 rounded-md border border-gray-700 bg-[#2a2a2a] hover:bg-[#333]"
        >
          ← Back
        </button>
        <button
          onClick={onClose}
          className="text-sm px-3 py-1 rounded-md border border-gray-700 bg-[#2a2a2a] hover:bg-[#333]"
        >
          Close ×
        </button>
      </div>
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Crypto4Cash</h2>
        <p className="text-gray-400">Spend your Crypto instantly without selling</p>
      </div>

      {/* Form */}
      <div className="space-y-6">
        {/* Crypto Asset and Chain in two columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Crypto Asset Selection */}
          <div>
            <label className="block text-sm font-medium mb-2">Crypto Asset</label>
            <div className="relative">
              <select 
                className="w-full bg-[#2a2a2a] border border-gray-700 rounded-md py-3 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={selectedCryptoAsset?.code || ''}
                onChange={(e) => {
                  const selected = cryptoAssets.find(asset => asset.code === e.target.value);
                  if (selected) {
                    setSelectedCryptoAsset(selected);
                    if (selected.networks.length > 0) {
                      setSelectedNetwork(selected.networks[0]);
                    } else {
                      setSelectedNetwork(null);
                    }
                  }
                }}
              >
                {cryptoAssets.map((asset) => (
                  <option key={asset.code} value={asset.code}>
                    {asset.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Chain/Network Selection */}
          <div>
            <label className="block text-sm font-medium mb-2">Chain</label>
            <div className="relative">
              <select 
                className="w-full bg-[#2a2a2a] border border-gray-700 rounded-md py-3 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={selectedNetwork?.code || ''}
                onChange={(e) => {
                  if (selectedCryptoAsset) {
                    const selected = selectedCryptoAsset.networks.find(network => network.code === e.target.value);
                    if (selected) {
                      setSelectedNetwork(selected);
                    }
                  }
                }}
              >
                {(selectedCryptoAsset?.networks || []).map((network) => (
                  <option key={network.code} value={network.code}>
                    {network.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Currency Selection spans full width */}
        <div>
          <label className="block text-sm font-medium mb-2">Receive Currency</label>
          <div className="relative">
            <select 
              className="w-full bg-[#2a2a2a] border border-gray-700 rounded-md py-3 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={selectedCurrency?.code || ''}
              onChange={(e) => {
                const selected = currencies.find(currency => currency.code === e.target.value);
                if (selected) {
                  setSelectedCurrency(selected);
                }
              }}
            >
              {currencies.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.name} ({currency.code})
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Amount Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Receive Amount */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Receive Amount ({selectedCurrency?.code})
            </label>
            <input
              type="text"
              className="w-full bg-[#2a2a2a] border border-gray-700 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={receiveAmount}
              onChange={(e) => {
                const value = e.target.value;
                if (/^(\d*\.?\d*)$/.test(value) || value === '') {
                  setReceiveAmount(value);
                }
              }}
              placeholder={`Enter amount`}
            />
          </div>

          {/* Crypto Amount */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Crypto Amount ({selectedCryptoAsset?.name || 'BTC'})
            </label>
            <input
              type="text"
              className="w-full bg-[#2a2a2a] border border-gray-700 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={cryptoAmount}
              readOnly
              placeholder="Calculated amount"
            />
          </div>
        </div>

        {/* Note (min/max) */}
        {selectedCryptoAsset && (
          <div className="text-amber-500 text-sm">
            <span className="font-medium">Note:</span> The min. and max. you can send is {selectedCryptoAsset.name}
            ({selectedCryptoAsset.minimumSendAmount.toFixed(8)} - {selectedCryptoAsset.maximumSendAmount.toFixed(8)}).
          </div>
        )}

        {/* Exchange Rate green pill */}
        {exchangeRate && (
          <div className="flex justify-center">
            <span className="inline-flex items-center px-4 py-1 rounded-full bg-green-700 text-green-100 text-sm font-semibold">
              1 {selectedCryptoAsset?.name || 'BTC'} = {exchangeRate}
            </span>
          </div>
        )}

        {/* NB */}
        <div className="text-center text-gray-400 text-xs">
          NB: Delays in completing the transaction may affect the applicable rates.
        </div>

        {/* Transaction Summary */}
        <div
          style={{
            padding: '16px',
            borderRadius: '12px',
            background: '#2a2a2a',
            border: '1px solid #374151',
          }}
        >
          <h3 style={{ color: '#9ca3af', fontSize: '14px', fontWeight: '500', marginBottom: '16px' }}>
            Transaction Summary
          </h3>
          <div className="space-y-3">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#9ca3af' }}>You Pay ({selectedCurrency?.code})</span>
              <span style={{ color: 'white', fontWeight: '600', fontSize: '16px' }}>
                {selectedCurrency?.symbol}{parseFloat(receiveAmount || '0').toLocaleString()}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#9ca3af' }}>You Get ({selectedCryptoAsset?.name || 'BTC'})</span>
              <span style={{ color: 'white', fontWeight: '600', fontSize: '16px' }}>
                {cryptoAmount || '0.00000000'} {selectedCryptoAsset?.name || 'BTC'}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#9ca3af' }}>Exchange Rate</span>
              <span style={{ color: 'white', fontWeight: '600', fontSize: '16px' }}>
                {exchangeRate || 'Not calculated'}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <button
            onClick={onClose}
            style={{
              width: '30%',
              background: '#2a2a2a',
              color: 'white',
              padding: '16px',
              borderRadius: '12px',
              border: '1px solid #374151',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            Back
          </button>

          <button
            onClick={handleProceed}
            disabled={!selectedCryptoAsset || ((selectedCryptoAsset.networks && selectedCryptoAsset.networks.length > 0) && !selectedNetwork) || loading}
            style={{
              width: '70%',
              background: (!selectedCryptoAsset || ((selectedCryptoAsset.networks && selectedCryptoAsset.networks.length > 0) && !selectedNetwork) || loading)
                ? '#6b7280'
                : 'linear-gradient(135deg, #FF6B35 0%, #FFA726 100%)',
              color: 'white',
              padding: '16px',
              borderRadius: '12px',
              border: 'none',
              fontSize: '16px',
              fontWeight: '600',
              cursor: (!selectedCryptoAsset || ((selectedCryptoAsset.networks && selectedCryptoAsset.networks.length > 0) && !selectedNetwork) || loading)
                ? 'not-allowed'
                : 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 12px rgba(255, 107, 53, 0.3)',
            }}
          >
            {loading ? 'Calculating...' : 'Proceed'}
          </button>
        </div>
      </div>
    </div>
  );
}

// Helper to resolve the correct SendCryptoAssetOptionCode from asset/network
function resolveOptionCode(asset: CryptoAsset | null, network: Network | null): string | null {
  const candidates = [
    network?.sendCryptoAssetOptionCode,
    network?.SendCryptoAssetOptionCode,
    network?.optionCode,
    network?.code,
    asset?.sendCryptoAssetOptionCode as any,
    (asset as any)?.optionCode,
    asset?.code,
  ];
  const found = candidates.find((c) => typeof c === "string" && c.length > 0);
  return found || null;
}