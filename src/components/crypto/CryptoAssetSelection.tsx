// components/crypto4cash/Crypto4CashFlow.tsx
'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCrypto4CashStore } from '@/stores/crypto4cash-store';
import { crypto4CashApi } from '@/lib/crypto4cash-api';
import { Currency, CryptoAsset } from '@/lib/types';
import Step1AssetSelection from '@/components/crypto4cash/steps/Step1AssetSelection';
import Step2BankAccount from '@/components/crypto4cash/steps/Step2BankAccount';
import Step3ContactInfo from '@/components/crypto4cash/steps/Step3ContactInfo';
import Step4Summary from '@/components/crypto4cash/steps/Step4Summary';

export default function Crypto4CashFlow() {
  const searchParams = useSearchParams();
  const initialCurrency = searchParams.get('currency');
  const initialAmount = searchParams.get('amount');

  const {
    currentStep,
    selectedCryptoAsset,
    selectedNetwork,
    selectedCurrency,
    receiveAmount,
    cryptoAmount,
    email,
    firstName,
    lastName,
    phoneNumber,
    createCashwyreAccount,
    userName,
    password,
    selectedBank,
    accountNumber,
    accountName,
    transactionSummary,
    timeLeft,
    setStep1Data,
    setStep2Data,
    setStep3Data,
    setTransactionSummary,
    setCurrentStep,
    setLoading,
    setTimeLeft,
    resetForm,
  } = useCrypto4CashStore();

  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [cryptoAssets, setCryptoAssets] = useState<CryptoAsset[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [infoReceiveCurrencies, setInfoReceiveCurrencies] = useState<any[]>([]);

  // Load initial data
  useEffect(() => {
    loadInitialData();
  }, []);

  // Always start at Step 1 on mount to ensure the user follows the process
  useEffect(() => {
    setCurrentStep(1);
  }, []);

  // Set initial values from query params
  useEffect(() => {
    if (initialCurrency && currencies.length > 0) {
      const currency = currencies.find(c => c.code === initialCurrency || c.countryCode === initialCurrency);
      if (currency) {
        setStep1Data({ selectedCurrency: currency });
      }
    }
    
    if (initialAmount) {
      setStep1Data({ receiveAmount: initialAmount });
    }
    
    // If selectedCurrency exists but has no countryBanks, try to refresh from currencies list
    if (selectedCurrency && currencies.length > 0 && (!selectedCurrency.countryBanks || selectedCurrency.countryBanks.length === 0)) {
      const refreshed = currencies.find((c: any) => c.code === selectedCurrency.code || c.countryCode === selectedCurrency.countryCode);
      if (refreshed && (refreshed.countryBanks && refreshed.countryBanks.length > 0)) {
        setStep1Data({ selectedCurrency: refreshed });
      }
    }
  }, [currencies, initialCurrency, initialAmount, selectedCurrency]);

  const loadInitialData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [currenciesRes, cryptoInfoRes] = await Promise.all([
        crypto4CashApi.getCrypto4CashCurrencies(),
        crypto4CashApi.getCrypto4CashInfo(),
      ]);

      if (currenciesRes.success) {
        // Helper: convert a container (array or object map) to an array of bank entries
        const toRawArray = (container: any): any[] => {
          if (Array.isArray(container)) return container;
          if (container && typeof container === 'object') return Object.values(container);
          return [];
        };

        // Build bank lookup maps from getCrypto4CashInfo.receiveCurrencies for hydration
        const infoPayload: any = (cryptoInfoRes as any)?.data ?? (cryptoInfoRes as any)?.Data ?? cryptoInfoRes;
        const receiveCurrencies: any[] = toRawArray(infoPayload?.receiveCurrencies || infoPayload?.ReceiveCurrencies || []);
        setInfoReceiveCurrencies(receiveCurrencies);
        const banksByCountryCode = new Map<string, any[]>();
        const banksByCurrencyCode = new Map<string, any[]>();
        const normalizeBanks = (banksContainer: any, countryCodeFallback: string) => {
          return toRawArray(banksContainer)
            .map((bank: any) => {
              if (typeof bank === 'object' && bank !== null && !Array.isArray(bank)) {
                // nested object map -> flatten values
                return Object.values(bank);
              }
              return bank;
            })
            .flat()
            .map((b: any) => ({
              code: b?.code !== undefined
                ? String(b.code)
                : b?.bankCode !== undefined
                ? String(b.bankCode)
                : b?.Code !== undefined
                ? String(b.Code)
                : b?.bank_code !== undefined
                ? String(b.bank_code)
                : '',
              name: b?.name ?? b?.bankName ?? b?.Name ?? b?.bank_name ?? '',
              type: b?.type ?? 'savings',
              accountLookupRequired:
                typeof b?.accountLookupRequired === 'boolean'
                  ? b.accountLookupRequired
                  : typeof b?.requiresAccountLookup === 'boolean'
                  ? b.requiresAccountLookup
                  : true,
              country: countryCodeFallback,
            }))
            .filter((b: any) => b.code && b.name)
            .sort((a: any, b: any) => a.name.localeCompare(b.name));
        };
        receiveCurrencies.forEach((rc: any) => {
          const cc = rc?.countryCode || rc?.CountryCode || '';
          const cur = rc?.currencyCode || rc?.CurrencyCode || rc?.code || '';
          const rcBanksRaw = rc?.countryBanks || rc?.CountryBanks || rc?.banks || rc?.Banks || rc?.bankList || rc?.BankList || rc?.supportedBanks || rc?.availableBanks || rc?.bank || rc?.bank_list || rc?.Bank || [];
          const normalizedBanks = normalizeBanks(rcBanksRaw, cc);
          if (cc) banksByCountryCode.set(cc, normalizedBanks);
          if (cur) banksByCurrencyCode.set(cur, normalizedBanks);
        });

        // Debug: inspect raw bank-related keys from API response
        currenciesRes.data.forEach((c: any) => {
          const bankishKeys = Object.keys(c || {}).filter((k) => /bank/i.test(k));
          console.log('Raw currency bankish keys for', c.code || c.countryCode, bankishKeys);
        });

        const mappedCurrencies = currenciesRes.data.map((c: any) => {
          const code = c.code || c.currencyCode || '';
          const countryCode = (c.countryCode && String(c.countryCode).length === 2)
            ? c.countryCode
            : (c.countrySymbol || c.country || c.countryCode || c.code || '');

          // Normalize bank lists from various possible keys and object containers
          const selfBanks = (
            toRawArray(
              c.countryBanks || c.banks || c.bankList || c.CountryBanks || c.BankList || c.availableBanks || c.supportedBanks || c.Banks || c.bank || c.bank_list || c.Bank || []
            )
              .map((bank: any) => {
                if (typeof bank === 'object' && !Array.isArray(bank) && bank !== null && ('code' in bank === false) && ('bankCode' in bank === false)) {
                  return Object.values(bank)
                    .map((b: any) => ({
                      code: b?.code !== undefined ? String(b.code) : (b?.bankCode !== undefined ? String(b.bankCode) : (b?.Code !== undefined ? String(b.Code) : (b?.bank_code !== undefined ? String(b.bank_code) : ''))),
                      name: b?.name ?? b?.bankName ?? b?.Name ?? b?.bank_name ?? '',
                      type: b?.type ?? 'savings',
                      accountLookupRequired:
                        typeof b?.accountLookupRequired === 'boolean'
                          ? b.accountLookupRequired
                          : (typeof b?.requiresAccountLookup === 'boolean' ? b.requiresAccountLookup : true),
                      country: countryCode,
                    }))
                    .filter((b: any) => b.code && b.name);
                }
                // Normal case
                return {
                  code: bank?.code !== undefined ? String(bank.code) : (bank?.bankCode !== undefined ? String(bank.bankCode) : (bank?.Code !== undefined ? String(bank.Code) : (bank?.bank_code !== undefined ? String(bank.bank_code) : ''))),
                  name: bank?.name ?? bank?.bankName ?? bank?.Name ?? bank?.bank_name ?? '',
                  type: bank?.type ?? 'savings',
                  accountLookupRequired:
                    typeof bank?.accountLookupRequired === 'boolean'
                      ? bank.accountLookupRequired
                      : (typeof bank?.requiresAccountLookup === 'boolean' ? bank.requiresAccountLookup : true),
                  country: countryCode,
                };
              })
              .flat()
              .filter((b: any) => b.code && b.name)
              .sort((a: any, b: any) => a.name.localeCompare(b.name))
          );

          // Fallback to receiveCurrencies-derived banks if selfBanks are empty
          const fallbackBanks = selfBanks.length > 0
            ? selfBanks
            : (banksByCurrencyCode.get(code) || banksByCountryCode.get(countryCode) || []);

          return {
            ...c,
            code,
            countryCode,
            symbol: c.symbol || '',
            minimumAmount: c.minimumReceiveAmount || c.minimumAmount || 1000,
            maximumAmount: c.maximumReceiveAmount || c.maximumAmount || 400000,
            phoneCode: c.phoneCode || '+234',
            countryBanks: fallbackBanks,
          };
        });
        setCurrencies(mappedCurrencies);

        // Rehydrate any persisted selectedCurrency from the mapped list so it includes normalized fields (e.g., countryBanks)
        if (selectedCurrency) {
          const refreshed = mappedCurrencies.find((c: any) => c.code === selectedCurrency.code || c.countryCode === selectedCurrency.countryCode);
          if (refreshed) {
            setStep1Data({ selectedCurrency: refreshed });
          }
        } else if (!initialCurrency && mappedCurrencies.length > 0) {
          setStep1Data({ selectedCurrency: mappedCurrencies[0] });
        }
      }

      if (cryptoInfoRes.success) {
        setCryptoAssets(cryptoInfoRes.data.cryptoAssets || []);
        
        // Set default crypto asset
        if (cryptoInfoRes.data.cryptoAssets && cryptoInfoRes.data.cryptoAssets.length > 0) {
          const defaultAsset = cryptoInfoRes.data.cryptoAssets.find(
            (asset: any) => asset.code === "receive_bitcoin_ln_invoince"
          ) || cryptoInfoRes.data.cryptoAssets[0];
          
          setStep1Data({ 
            selectedCryptoAsset: defaultAsset,
            selectedNetwork: defaultAsset.networks?.[0] || null 
          });
        }
      }
    } catch (error) {
      console.error('Failed to load initial data:', error);
      setError("Failed to load required data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleProceedToStep2 = () => {
    setCurrentStep(2);
  };

  const handleProceedToStep3 = () => {
    setCurrentStep(3);
  };

  const handleBackToStep1 = () => {
    setCurrentStep(1);
  };

  const handleBackToStep2 = () => {
    setCurrentStep(2);
  };

  const handleSubmitTransaction = async () => {
    if (!selectedCryptoAsset || !selectedNetwork || !selectedCurrency || !selectedBank) {
      console.error('Missing required fields for transaction');
      return;
    }

    setLoading(true);
    try {
      // Resolve the network/asset option code expected by backend
      const optionCode = resolveOptionCode(selectedCryptoAsset, selectedNetwork);
      if (!optionCode) {
        console.error('No valid option code could be resolved');
        return;
      }

      const payload = {
        cryptoAssetOptionCode: optionCode,
        assetTypeNetwork: selectedNetwork.code,
        receiveCurrency: selectedCurrency.code,
        sendAmount: parseFloat(cryptoAmount),
        receiveAmount: parseFloat(receiveAmount),
        bankCode: selectedBank.code,
        accountNumber,
        accountName,
        country: selectedCurrency.countryCode,
        senderFirstName: firstName,
        senderLastName: lastName,
        senderEmail: email,
        senderPhoneNumberCode: selectedCurrency.phoneCode || '+234',
        senderPhoneNumber: phoneNumber,
        createCashwyreAccount,
        createCashwyreAccountUserName: createCashwyreAccount ? userName : '',
        createCashwyreAccountPassword: createCashwyreAccount ? password : '',
        sponsor: '', // Add if you have sponsor logic
      };

      console.log('Submitting transaction with payload:', payload);

      const response = await crypto4CashApi.crypto4CashSummary(payload);
      
      if (response.success) {
        setTransactionSummary(response.data);
        setCurrentStep(4);
        
        // Set countdown timer
        const minutes = response.data.txnExpiryInMinutes || 5;
        setTimeLeft(minutes * 60);
      } else {
        console.error('Transaction failed:', response.message);
        setError(response.message || 'Failed to create transaction');
      }
    } catch (error: any) {
      console.error('Failed to create transaction:', error);
      setError(error.message || 'An error occurred while creating the transaction');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmPayment = async () => {
    if (!transactionSummary) return;

    setLoading(true);
    try {
      const response = await crypto4CashApi.confirmPayment({
        code: transactionSummary.reference,
      });

      if (response.success) {
        // Navigate to status page
        window.location.href = `/crypto4cash-status?transactioncode=${transactionSummary.reference}`;
      } else {
        setError(response.message || 'Failed to confirm payment');
      }
    } catch (error: any) {
      console.error('Failed to confirm payment:', error);
      setError(error.message || 'An error occurred while confirming payment');
    } finally {
      setLoading(false);
    }
  };

  const handleResetFlow = () => {
    resetForm();
    setCurrentStep(1);
    setError(null);
  };

  const renderStep = () => {
    if (isLoading) {
      return (
        <div className="bg-gray-800 rounded-2xl p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-300">Loading...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="bg-gray-800 rounded-2xl p-8 text-center">
          <div className="text-red-400 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Error</h3>
          <p className="text-gray-300 mb-6">{error}</p>
          <button
            onClick={handleResetFlow}
            className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded-lg"
          >
            Try Again
          </button>
        </div>
      );
    }

    switch (currentStep) {
      case 1:
        return (
          <Step1AssetSelection
            currencies={currencies}
            cryptoAssets={cryptoAssets}
            onProceed={handleProceedToStep2}
          />
        );
      case 2:
        return (
          <Step2BankAccount
            onBack={handleBackToStep1}
            onProceed={handleProceedToStep3}
            banks={selectedCurrency?.countryBanks || []}
          />
        );
      case 3:
        return (
          <Step3ContactInfo
            onBack={handleBackToStep2}
            onSubmit={handleSubmitTransaction}
          />
        );
      case 4:
        return (
          <Step4Summary
            onBack={() => setCurrentStep(3)}
            onConfirmPayment={handleConfirmPayment}
          />
        );
      default:
        return null;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Select Assets & Amount";
      case 2:
        return "Bank Account Details";
      case 3:
        return "Contact Information";
      case 4:
        return "Payment Summary";
      default:
        return "Crypto4Cash";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">Crypto4Cash</h1>
            <p className="text-gray-400">
              {currentStep === 4 
                ? "Copy the address or scan the QR code to complete your transaction"
                : "Spend your Crypto instantly without selling"
              }
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                      currentStep >= step
                        ? 'bg-orange-500 border-orange-500 text-white'
                        : 'bg-transparent border-gray-600 text-gray-400'
                    } transition-all duration-300`}
                  >
                    {step}
                  </div>
                  {step < 4 && (
                    <div
                      className={`w-16 h-1 ${
                        currentStep > step ? 'bg-orange-500' : 'bg-gray-700'
                      } transition-all duration-300`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Title */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-orange-500">
              {getStepTitle()}
            </h2>
          </div>

          {/* Step Content */}
          {renderStep()}

          {/* Debug info (remove in production) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-8 p-4 bg-gray-800 rounded-lg text-xs">
              <h4 className="font-semibold mb-2">Debug Info:</h4>
              <p>Current Step: {currentStep}</p>
              <p>Selected Crypto: {selectedCryptoAsset?.name}</p>
              <p>Selected Network: {selectedNetwork?.name}</p>
              <p>Selected Currency: {selectedCurrency?.name}</p>
              <p>Receive Amount: {receiveAmount}</p>
              <p>Crypto Amount: {cryptoAmount}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Helper function to resolve the correct option code from asset/network
function resolveOptionCode(asset: any, network: any): string | null {
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

// Removed duplicate useEffect declared outside of component to fix TypeScript build error