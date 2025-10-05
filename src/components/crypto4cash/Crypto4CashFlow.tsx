'use client';
import { useState, useEffect } from 'react';
import { useCrypto4CashStore } from '@/stores/crypto4cash-store';
import { crypto4CashApi } from '@/lib/crypto4cash-api';
import Step1AssetSelection from './steps/Step1AssetSelection';
import Step2BankAccount from './steps/Step2BankAccount';
import Step3ContactInfo from './steps/Step3ContactInfo';
import Step4Summary from './steps/Step4Summary';

export default function Crypto4CashFlow() {
  const {
    currentStep,
    setCurrentStep,
    setLoading,
    resetForm,
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
    setTransactionSummary,
    setStep1Data,
  } = useCrypto4CashStore();

  const [currencies, setCurrencies] = useState<any[]>([]);
  const [cryptoAssets, setCryptoAssets] = useState<any[]>([]);

  // Load initial data
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setLoading(true);
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

        // Pull receiveCurrencies from getCrypto4CashInfo to hydrate banks when available
        const infoPayload: any = (cryptoInfoRes as any)?.data ?? (cryptoInfoRes as any)?.Data ?? cryptoInfoRes;
        const receiveCurrencies: any[] = toRawArray(
          (infoPayload?.receiveCurrencies) || (infoPayload?.ReceiveCurrencies) || (infoPayload?.receiveCountryCurrencies) || (infoPayload?.ReceiveCountryCurrencies) || []
        );
        // Build fast lookup maps for banks by countryCode and currencyCode
        const banksByCountryCode = new Map<string, any[]>();
        const banksByCurrencyCode = new Map<string, any[]>();
        const normalizeBanks = (banksContainer: any, countryCodeFallback: string) => {
          return toRawArray(banksContainer)
            .map((bank: any) => {
              if (typeof bank === 'object' && bank !== null && !Array.isArray(bank)) {
                // nested object map
                if (!('code' in bank) && !('bankCode' in bank) && !('Code' in bank) && !('bank_code' in bank)) {
                  return Object.values(bank);
                }
              }
              return bank;
            })
            .flat()
            .map((b: any) => ({
              code: b?.code !== undefined ? String(b.code) : (b?.bankCode !== undefined ? String(b.bankCode) : (b?.Code !== undefined ? String(b.Code) : (b?.bank_code !== undefined ? String(b.bank_code) : ''))),
              name: b?.name ?? b?.bankName ?? b?.Name ?? b?.bank_name ?? '',
              type: b?.type ?? 'savings',
              accountLookupRequired:
                typeof b?.accountLookupRequired === 'boolean'
                  ? b.accountLookupRequired
                  : (typeof b?.requiresAccountLookup === 'boolean' ? b.requiresAccountLookup : true),
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
          console.log('Raw currency bankish keys for', c.code || c.countryCode, bankishKeys,
            {
              countryBanks: c.countryBanks,
              banks: c.banks,
              bankList: c.bankList,
              CountryBanks: c.CountryBanks,
              BankList: c.BankList,
              availableBanks: c.availableBanks,
              supportedBanks: c.supportedBanks,
              Banks: c.Banks,
              bank: c.bank,
              bank_list: c.bank_list,
              Bank: c.Bank,
            }
          );
        });

        // Map currencies to ensure countryBanks are normalized to Bank[] and hydrated from receiveCurrencies when present
        const mappedCurrencies = currenciesRes.data.map((c: any) => {
          const base = {
            ...c,
            code: c.code || c.currencyCode || '',
            countryCode: (c.countryCode && String(c.countryCode).length === 2)
              ? c.countryCode
              : (c.countrySymbol || c.country || ''),
            symbol: c.symbol || '',
            minimumAmount: c.minimumReceiveAmount || c.minimumAmount || 1000,
            maximumAmount: c.maximumReceiveAmount || c.maximumAmount || 400000,
            phoneCode: c.phoneCode || '+234',
          };

          const fromSelf = (
            toRawArray(
              c.countryBanks || c.banks || c.bankList || c.CountryBanks || c.BankList || c.availableBanks || c.supportedBanks || c.Banks || c.bank || c.bank_list || c.Bank || []
            )
              .map((bank: any) => {
                // If bank is an object with bank codes as keys, convert to array
                if (typeof bank === 'object' && !Array.isArray(bank) && bank !== null) {
                  return Object.values(bank)
                    .map((b: any) => ({
                      code: b?.code !== undefined ? String(b.code) : (b?.bankCode !== undefined ? String(b.bankCode) : (b?.Code !== undefined ? String(b.Code) : (b?.bank_code !== undefined ? String(b.bank_code) : ''))),
                      name: b?.name ?? b?.bankName ?? b?.Name ?? b?.bank_name ?? '',
                      type: b?.type ?? 'savings',
                      accountLookupRequired:
                        typeof b?.accountLookupRequired === 'boolean'
                          ? b.accountLookupRequired
                          : (typeof b?.requiresAccountLookup === 'boolean' ? b.requiresAccountLookup : true),
                      country: base.countryCode,
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
                  country: base.countryCode,
                };
              })
              .flat()
              .filter((b: any) => b.code && b.name)
              .sort((a: any, b: any) => a.name.localeCompare(b.name))
          );

          // If not found within currency object, hydrate from getCrypto4CashInfo.receiveCurrencies
          const fromInfo = fromSelf.length > 0
            ? fromSelf
            : (
              banksByCountryCode.get(base.countryCode) || banksByCurrencyCode.get(base.code) || []
            );

          return {
            ...base,
            countryBanks: fromInfo,
          };
        });
        // Debug: log banks for each currency
        mappedCurrencies.forEach((curr) => {
          console.log(`Currency ${curr.name} (${curr.code}): banks count ${curr.countryBanks.length}`, curr.countryBanks);
        });
        setCurrencies(mappedCurrencies);

        // Rehydrate any persisted selectedCurrency from the mapped list so it includes normalized fields (e.g., countryBanks)
        if (selectedCurrency) {
          const refreshed = mappedCurrencies.find((mc: any) => mc.code === selectedCurrency.code || mc.countryCode === selectedCurrency.countryCode);
          if (refreshed) {
            setStep1Data({ selectedCurrency: refreshed });
          }
        } else if (mappedCurrencies.length > 0) {
          // Optional: set a default currency on first load
          setStep1Data({ selectedCurrency: mappedCurrencies[0] });
        }
      }
      if (cryptoInfoRes.success) setCryptoAssets(cryptoInfoRes.data.cryptoAssets || []);
    } catch (error) {
      console.error('Failed to load initial data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProceedToStep2 = () => {
    setCurrentStep(2);
  };

  const handleProceedToStep3 = () => {
    setCurrentStep(3);
  };

  const handleSubmitTransaction = async () => {
    if (!selectedCryptoAsset || !selectedNetwork || !selectedCurrency || !selectedBank) return;

    setLoading(true);
    try {
      const payload = {
        cryptoAssetOptionCode: selectedCryptoAsset.code,
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
        senderPhoneNumberCode: selectedCurrency.phoneCode,
        senderPhoneNumber: phoneNumber,
        createCashwyreAccount,
        createCashwyreAccountUserName: createCashwyreAccount ? userName : '',
        createCashwyreAccountPassword: createCashwyreAccount ? password : '',
      };

      const response = await crypto4CashApi.crypto4CashSummary(payload);
      
      if (response.success) {
        setTransactionSummary(response.data);
        setCurrentStep(4);
      }
    } catch (error) {
      console.error('Failed to create transaction:', error);
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
      }
    } catch (error) {
      console.error('Failed to confirm payment:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        // If selected currency has no banks, fetch detailed currency info and hydrate banks
  useEffect(() => {
    const hydrateBanksIfMissing = async () => {
      if (!selectedCurrency) return;
      const hasBanks = Array.isArray(selectedCurrency.countryBanks) && selectedCurrency.countryBanks.length > 0;
      if (hasBanks) return;

      try {
        setLoading(true);
        console.log('Hydrating banks for currency:', selectedCurrency);
        const response = await crypto4CashApi.getCurrencyInfo({
          // Provide both identifiers; CountryCode ensures correct bank list for the fiat's country
          CountryCode: selectedCurrency.countryCode,
          currencyCode: selectedCurrency.code,
        });
        const isSuccess = (response as any)?.success ?? (response as any)?.Success;
        const payload = (response as any)?.data ?? (response as any)?.Data;
        if (!isSuccess || !payload) {
          console.warn('getCurrencyInfo did not return banks. Raw:', response);
          return;
        }

        // Deeply collect any bankish containers from payload
        const collectBankItemsDeep = (node: any, path: string[] = []): any[] => {
          const items: any[] = [];
          const pushIfBankItem = (obj: any) => {
            if (obj && typeof obj === 'object') {
              const maybeCode = obj.code ?? obj.bankCode ?? obj.Code ?? obj.bank_code ?? obj.id;
              const maybeName = obj.name ?? obj.bankName ?? obj.Name ?? obj.bank_name ?? obj.title;
              if (maybeCode !== undefined && maybeName !== undefined) {
                items.push(obj);
              }
            }
          };

          if (Array.isArray(node)) {
            node.forEach((el, idx) => {
              if (Array.isArray(el) || (el && typeof el === 'object')) {
                items.push(...collectBankItemsDeep(el, path.concat(String(idx))));
              } else {
                // primitive values ignored
              }
            });
          } else if (node && typeof node === 'object') {
            Object.entries(node).forEach(([key, value]) => {
              const nextPath = path.concat(key);
              if (/bank/i.test(key)) {
                // Key looks bank-related; extract contents
                items.push(...collectBankItemsDeep(value, nextPath));
              } else {
                // Dive deeper
                if (Array.isArray(value) || (value && typeof value === 'object')) {
                  items.push(...collectBankItemsDeep(value, nextPath));
                } else {
                  // If value itself is an object representing a bank, push it
                  pushIfBankItem(value);
                }
              }

              // Also check if the object itself resembles a bank
              if (value && typeof value === 'object' && !Array.isArray(value)) {
                pushIfBankItem(value);
              }
            });
          } else {
            // primitives ignored
          }
          return items;
        };

        const rawItems = collectBankItemsDeep(payload);
        console.log('Deep bank items found:', rawItems.length);

        // Normalize
        const normalized = rawItems
          .map((b: any) => ({
            code:
              b?.code !== undefined
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
            country: selectedCurrency.countryCode || selectedCurrency.code || '',
          }))
          .filter((b: any) => b.code && b.name)
          .sort((a: any, b: any) => a.name.localeCompare(b.name));

        console.log('Hydrated banks count:', normalized.length, normalized);
        if (normalized.length > 0) {
          // Update selectedCurrency in store with hydrated banks
          setStep1Data({ selectedCurrency: { ...selectedCurrency, countryBanks: normalized } });
        }
      } catch (err) {
        console.error('Failed to hydrate banks via getCurrencyInfo:', err);
      } finally {
        setLoading(false);
      }
    };

    hydrateBanksIfMissing();
  }, [selectedCurrency]);

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
            onBack={() => setCurrentStep(1)}
            onProceed={handleProceedToStep3}
            banks={selectedCurrency?.countryBanks || []}
          />
        );
      case 3:
        return (
          <Step3ContactInfo
            onBack={() => setCurrentStep(2)}
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
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      currentStep >= step
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-700 text-gray-400'
                    }`}
                  >
                    {step}
                  </div>
                  {step < 4 && (
                    <div
                      className={`w-16 h-1 ${
                        currentStep > step ? 'bg-orange-500' : 'bg-gray-700'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          {renderStep()}
        </div>
      </div>
    </div>
  );
}