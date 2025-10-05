'use client';
import { useState, useEffect } from 'react';
import { useCrypto4CashStore } from '@/stores/crypto4cash-store';
import { crypto4CashApi } from '@/lib/crypto4cash-api';
import { CryptoFiatRate } from '@/lib/types';

interface Step1AssetSelectionProps {
  currencies: any[];
  cryptoAssets: any[];
  onProceed: () => void;
}

export default function Step1AssetSelection({ currencies, cryptoAssets, onProceed }: Step1AssetSelectionProps) {
  const {
    selectedCryptoAsset,
    selectedNetwork,
    selectedCurrency,
    receiveAmount,
    cryptoAmount,
    setStep1Data,
    setLoading,
    isLoading,
  } = useCrypto4CashStore();

  const [exchangeRate, setExchangeRate] = useState('');
  const [amountError, setAmountError] = useState('');
  const [debugInfo, setDebugInfo] = useState(''); // For debugging

  // Calculate rates when inputs change
  useEffect(() => {
    if (selectedCryptoAsset && selectedCurrency && receiveAmount && parseFloat(receiveAmount) > 0) {
      calculateRate();
    } else {
      // Reset crypto amount when conditions aren't met
      setStep1Data({ cryptoAmount: '' });
      setExchangeRate('');
      setAmountError('');
    }
  }, [selectedCryptoAsset, selectedCurrency, selectedNetwork, receiveAmount]);

  const calculateRate = async () => {
    if (!selectedCryptoAsset || !selectedCurrency || !receiveAmount || parseFloat(receiveAmount) <= 0) {
      return;
    }

    setLoading(true);
    setDebugInfo('Starting calculation...');
    
    try {
      const optionCode = resolveOptionCode(selectedCryptoAsset, selectedNetwork);
      if (!optionCode) {
        setDebugInfo('No option code resolved');
        return;
      }

      setDebugInfo(`Calling API with: ${optionCode}, ${selectedCurrency.code}, ${receiveAmount}`);
      
      const response = await crypto4CashApi.getCryptoFiatRate({
        sendCryptoAssetOptionCode: optionCode,
        receiveCurrency: selectedCurrency.code,
        receiveAmount: parseFloat(receiveAmount),
      });

      setDebugInfo(`API Response: ${JSON.stringify(response)}`);

      if (response.success) {
        const data: Partial<CryptoFiatRate> & { cryptoAmount?: number; sendRateInfo?: string; minimumSendAmount?: number; maximumSendAmount?: number } = response.data as any;
        
        // DEBUG: Log the actual response structure
        console.log('API Response Data:', data);
        setDebugInfo(`Data structure: ${Object.keys(data).join(', ')}`);
        
        let calculatedCrypto = 0;
        
        // Strictly use API-provided crypto amount fields (no client-side fallback)
        if (data.sendAmount !== undefined && data.sendAmount !== null) {
          calculatedCrypto = Number(data.sendAmount);
          setDebugInfo(`Using API sendAmount: ${calculatedCrypto}`);
        } else if (data.cryptoAmount !== undefined && data.cryptoAmount !== null) {
          calculatedCrypto = Number(data.cryptoAmount);
          setDebugInfo(`Using API cryptoAmount: ${calculatedCrypto}`);
        } else {
          setDebugInfo('API did not provide a crypto amount (sendAmount/cryptoAmount missing)');
        }

        // Set the crypto amount if we have a valid calculation
        if (calculatedCrypto > 0) {
          const formattedCrypto = calculatedCrypto.toFixed(8);
          setStep1Data({ cryptoAmount: formattedCrypto });
          setDebugInfo(`Set cryptoAmount to: ${formattedCrypto}`);
        } else {
          setStep1Data({ cryptoAmount: '' });
          setDebugInfo('No valid crypto amount calculated');
        }
        
        // Set exchange rate display strictly from API fields
        if (data.sendRateInfo) {
          setExchangeRate(data.sendRateInfo);
        } else if (data.receiveAmount !== undefined && data.receiveAmount !== null) {
          setExchangeRate(`1 ${selectedCryptoAsset.name} = ${selectedCurrency.symbol}${data.receiveAmount}`);
        } else {
          setExchangeRate('');
        }
        
        // Validate amount limits using API-provided min/max only
        if (calculatedCrypto > 0) {
          validateAmount(calculatedCrypto, data.minimumSendAmount, data.maximumSendAmount);
        }
      } else {
        setDebugInfo(`API Error: ${response.message}`);
        setStep1Data({ cryptoAmount: '' });
        setExchangeRate('');
      }
    } catch (error: any) {
      console.error('Error calculating rate:', error);
      setDebugInfo(`Error: ${error.message}`);
      setStep1Data({ cryptoAmount: '' });
      setExchangeRate('');
    } finally {
      setLoading(false);
    }
  };

  const validateAmount = (calculatedCrypto: number, min?: number, max?: number) => {
    const minAmt = typeof min === 'number' ? min : undefined;
    const maxAmt = typeof max === 'number' ? max : undefined;

    if (minAmt !== undefined && calculatedCrypto < minAmt) {
      setAmountError(`Minimum amount is ${minAmt} ${selectedCryptoAsset?.name ?? 'Crypto'}`);
    } else if (maxAmt !== undefined && calculatedCrypto > maxAmt) {
      setAmountError(`Maximum amount is ${maxAmt} ${selectedCryptoAsset?.name ?? 'Crypto'}`);
    } else {
      setAmountError('');
    }
  };

  const canProceed = selectedCryptoAsset && selectedNetwork && selectedCurrency && 
                    receiveAmount && cryptoAmount && !isLoading;

  return (
    <div className="bg-gray-800 rounded-2xl p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Crypto Asset Selection */}
        <div>
          <label className="block text-sm font-medium mb-2">Crypto Asset</label>
          <select
            className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={selectedCryptoAsset?.code || ''}
            onChange={(e) => {
              const asset = cryptoAssets.find(a => a.code === e.target.value);
              if (asset) {
                setStep1Data({ 
                  selectedCryptoAsset: asset,
                  selectedNetwork: asset.networks?.[0] || null,
                  cryptoAmount: '', // Reset crypto amount when asset changes
                });
              }
            }}
          >
            <option value="">Select asset</option>
            {cryptoAssets.map((asset) => (
              <option key={asset.code} value={asset.code}>
                {asset.name}
              </option>
            ))}
          </select>
        </div>

        {/* Network Selection */}
        <div>
          <label className="block text-sm font-medium mb-2">Chain</label>
          <select
            className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={selectedNetwork?.code || ''}
            onChange={(e) => {
              const network = selectedCryptoAsset?.networks?.find(n => n.code === e.target.value);
              if (network) {
                setStep1Data({ 
                  selectedNetwork: network,
                  cryptoAmount: '', // Reset crypto amount when network changes
                });
              }
            }}
            disabled={!selectedCryptoAsset}
          >
            <option value="">Select chain</option>
            {selectedCryptoAsset?.networks?.map((network) => (
              <option key={network.code} value={network.code}>
                {network.name}
              </option>
            ))}
          </select>
        </div>

        {/* Currency Selection */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2">Receive Currency</label>
          <select
            className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={selectedCurrency?.code || ''}
            onChange={(e) => {
              const currency = currencies.find(c => c.code === e.target.value);
              if (currency) {
                setStep1Data({ 
                  selectedCurrency: currency,
                  cryptoAmount: '', // Reset crypto amount when currency changes
                });
              }
            }}
          >
            <option value="">Select currency</option>
            {currencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.name} ({currency.code})
              </option>
            ))}
          </select>
        </div>

        {/* Amount Fields */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Receive Amount ({selectedCurrency?.code})
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={receiveAmount}
            onChange={(e) => {
              const value = e.target.value;
              // Allow empty string or valid numbers
              if (value === '' || /^\d*\.?\d*$/.test(value)) {
                setStep1Data({ 
                  receiveAmount: value,
                  cryptoAmount: '', // Reset crypto amount when receive amount changes
                });
              }
            }}
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Crypto Amount ({selectedCryptoAsset?.name || 'Crypto'})
          </label>
          <input
            type="text"
            className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={cryptoAmount || ''}
            readOnly
            placeholder={isLoading ? "Calculating..." : "Enter amount above"}
          />
        </div>
      </div>

      {/* Debug Info - Remove in production */}
      {process.env.NODE_ENV === 'development' && debugInfo && (
        <div className="mt-4 p-3 bg-gray-900 rounded text-xs text-gray-400">
          <strong>Debug:</strong> {debugInfo}
        </div>
      )}

      {/* Error and Info Messages */}
      {amountError && (
        <div className="mt-4 text-red-400 text-sm">
          {amountError}
        </div>
      )}

      {selectedCryptoAsset && (
        <div className="mt-4 text-amber-500 text-sm">
          Note: The min. and max. you can send is {selectedCryptoAsset.name} (
          {selectedCryptoAsset.minimumSendAmount} - {selectedCryptoAsset.maximumSendAmount}).
        </div>
      )}

      {exchangeRate && (
        <div className="mt-4 text-center">
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-green-900 text-green-100 text-sm font-semibold">
            {exchangeRate}
          </span>
        </div>
      )}

      {/* Loading Indicator */}
      {isLoading && (
        <div className="mt-4 text-center text-gray-400">
          <div className="inline-flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-500 mr-2"></div>
            Calculating...
          </div>
        </div>
      )}

      {/* Proceed Button */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={onProceed}
          disabled={!canProceed}
          className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 px-8 rounded-lg font-semibold transition-colors"
        >
          {isLoading ? 'Calculating...' : 'Proceed'}
        </button>
      </div>
    </div>
  );
}

// Helper function to resolve option code
function resolveOptionCode(asset: any, network: any): string | null {
  const candidates = [
    // Prefer asset-level option codes first (required by backend)
    asset?.sendCryptoAssetOptionCode,
    (asset as any)?.optionCode,
    asset?.code,
    // Fallback to network-level fields only if asset-level not present
    network?.sendCryptoAssetOptionCode,
    network?.SendCryptoAssetOptionCode,
    network?.optionCode,
    network?.code,
  ];
  
  const found = candidates.find((c) => typeof c === "string" && c.length > 0);
  console.log('Option code candidates:', candidates, 'Selected:', found);
  return found || null;
}