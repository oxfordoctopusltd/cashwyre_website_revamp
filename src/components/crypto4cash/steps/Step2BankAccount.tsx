'use client';
import { useState, useEffect, useMemo } from 'react';
import { useCrypto4CashStore } from '@/stores/crypto4cash-store';
import { crypto4CashApi } from '@/lib/crypto4cash-api';
import type { Bank } from '@/lib/types';

interface Step2BankAccountProps {
  onBack: () => void;
  onProceed: () => void;
  banks: Bank[];
}

export default function Step2BankAccount({ onBack, onProceed, banks }: Step2BankAccountProps) {
  const {
    selectedCurrency: sc,
    selectedBank: sb,
    accountNumber: an,
    accountName: aname,
    setStep2Data: setS2,
    setLoading: setL,
    setStep1Data: setS1,
    isLoading,
  } = useCrypto4CashStore();

  const [err, setErr] = useState('');

  // Normalize any bankish object to our Bank type
  const normBank = (x: any, countryCode: string): Bank | null => {
    const code = String(x?.code ?? x?.bankCode ?? x?.Code ?? x?.bank_code ?? '');
    const name = String(x?.name ?? x?.bankName ?? x?.Name ?? x?.bank_name ?? '');
    if (!code || !name) return null;
    return {
      code,
      name,
      type: x?.type ?? 'savings',
      accountLookupRequired:
        typeof x?.accountLookupRequired === 'boolean'
          ? x.accountLookupRequired
          : (typeof x?.requiresAccountLookup === 'boolean' ? x.requiresAccountLookup : true),
      country: countryCode,
    };
  };

  // Auto-hydrate banks for the selected currency if missing
  useEffect(() => {
    const go = async () => {
      try {
        if (!sc) return;
        const hasPropBanks = Array.isArray(banks) && banks.length > 0;
        const hasCurrencyBanks = Array.isArray(sc?.countryBanks) && sc.countryBanks.length > 0;
        if (hasPropBanks || hasCurrencyBanks) return;

        setL(true);
        const resp = await crypto4CashApi.getCurrencyInfo({
          currencyCode: sc.code,
          CountryCode: sc.countryCode,
        });
        const payload: any = (resp as any)?.data ?? (resp as any)?.Data ?? resp;
        if (!payload) return;

        // Collect all bankish containers in payload
        const keys = Object.keys(payload || {}).filter((k) => /bank/i.test(k));
        const containers = keys.map((k) => (payload as any)[k]).filter(Boolean);
        const items: any[] = [];
        containers.forEach((c) => {
          if (Array.isArray(c)) items.push(...c);
          else if (c && typeof c === 'object') items.push(...Object.values(c));
        });
        const normalized: Bank[] = items
          .map((x) => normBank(x, sc.countryCode))
          .filter(Boolean) as Bank[];

        if (normalized.length > 0) {
          setS1({ selectedCurrency: { ...sc, countryBanks: normalized.sort((a, b) => a.name.localeCompare(b.name)) } });
        }
      } catch (e) {
        // silent fail; UI will show no banks available
      } finally {
        setL(false);
      }
    };
    go();
  }, [sc, banks, setL, setS1]);

  const derivedBanks: Bank[] = useMemo(() => {
    if (banks && banks.length > 0) return banks;
    if (sc && Array.isArray(sc.countryBanks) && sc.countryBanks.length > 0) return sc.countryBanks;
    return [];
  }, [banks, sc]);

  // Auto name enquiry for 10-digit numbers when required
  useEffect(() => {
    if (an.length === 10 && sb?.accountLookupRequired) handleLookup();
  }, [an, sb]);

  const handleLookup = () => {
    if (!sb || !sc) return;
    setL(true);
    crypto4CashApi
      .nameEnquiry({ accountNumber: an, bankCode: sb.code, country: sb.country || sc.countryCode || 'NG' })
      .then((res) => {
        if ((res as any)?.success) {
          setS2({ accountName: (res as any)?.data });
          setErr('');
        } else {
          setErr((res as any)?.message || 'Failed to lookup account name');
          setS2({ accountName: '' });
        }
      })
      .catch(() => {
        setErr('Failed to lookup account name');
        setS2({ accountName: '' });
      })
      .finally(() => setL(false));
  };

  const canProceed = !!(sb && an && aname);

  return (
    <div className="bg-gray-800 rounded-2xl p-8">
      <button onClick={onBack} className="flex items-center text-gray-400 hover:text-white mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Select Bank</label>
          <select
            className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={sb?.code || ''}
            onChange={(e) => {
              const bk = derivedBanks.find((b) => b.code === e.target.value) || null;
              setS2({ selectedBank: bk, accountNumber: '', accountName: '' });
              setErr('');
            }}
            disabled={isLoading || derivedBanks.length === 0}
          >
            <option value="">{isLoading ? 'Loading banks...' : 'Select Bank'}</option>
            {derivedBanks.map((b) => (
              <option key={b.code} value={b.code}>
                {b.name}
              </option>
            ))}
          </select>
          {derivedBanks.length === 0 && (
            sc ? (
              isLoading ? (
                <div className="text-sm text-gray-400 mt-2">
                  <div className="inline-flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-500 mr-2"></div>
                    Loading banks...
                  </div>
                </div>
              ) : (
                <div className="text-sm text-yellow-500 mt-2">No banks available for the selected currency</div>
              )
            ) : (
              <div className="text-sm text-gray-400 mt-2">Please select a currency in Step 1 first</div>
            )
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Account Number</label>
          <input
            type="text"
            className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={an}
            onChange={(e) => {
              const v = e.target.value.replace(/\D/g, '');
              setS2({ accountNumber: v });
              setErr('');
            }}
            placeholder="00011122233"
            maxLength={10}
          />
          {sb?.accountLookupRequired === false && (
            <div className="text-right text-sm text-gray-400 mt-1">Ensure Account Details is Valid</div>
          )}
          {err && <div className="text-sm text-red-500 mt-2">{err}</div>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Account Holder Name</label>
          <input
            type="text"
            className={`w-full bg-gray-700 border ${err ? 'border-red-500' : 'border-gray-600'} rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500`}
            value={aname}
            onChange={(e) => {
              if (!sb?.accountLookupRequired) {
                setS2({ accountName: e.target.value });
              }
            }}
            placeholder={sb?.accountLookupRequired ? 'Auto-filled after lookup' : 'Enter account name'}
            readOnly={!!sb?.accountLookupRequired}
          />
          {err && <div className="text-sm text-red-500 mt-2">{err}</div>}
        </div>
        <div className="text-right">
          <button
            onClick={onProceed}
            className={`bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-lg ${canProceed ? '' : 'opacity-50 cursor-not-allowed'}`}
            disabled={!canProceed}
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
}