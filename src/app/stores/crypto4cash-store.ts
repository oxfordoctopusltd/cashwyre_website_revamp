// stores/crypto4cash-store.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CryptoAsset, Network, Currency, Bank, Crypto4CashSummary as TransactionSummary } from '@/lib/types'

interface Crypto4CashState {
  // Step 1 data
  selectedCryptoAsset: CryptoAsset | null;
  selectedNetwork: Network | null;
  selectedCurrency: Currency | null;
  receiveAmount: string;
  cryptoAmount: string;
  
  // Step 2 data
  selectedBank: Bank | null;
  accountNumber: string;
  accountName: string;
  
  // Step 3 data
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  createCashwyreAccount: boolean;
  userName: string;
  password: string;
  
  // Transaction data
  transactionSummary: TransactionSummary | null;
  currentStep: number;
  isLoading: boolean;
  timeLeft: number;
  
  // Actions
  setStep1Data: (data: Partial<Pick<Crypto4CashState, 
    'selectedCryptoAsset' | 'selectedNetwork' | 'selectedCurrency' | 'receiveAmount' | 'cryptoAmount'>>) => void;
  setStep2Data: (data: Partial<Pick<Crypto4CashState, 
    'selectedBank' | 'accountNumber' | 'accountName'>>) => void;
  setStep3Data: (data: Partial<Pick<Crypto4CashState,
    'email' | 'firstName' | 'lastName' | 'phoneNumber' | 'createCashwyreAccount' | 'userName' | 'password'>>) => void;
  setTransactionSummary: (summary: TransactionSummary | null) => void;
  setCurrentStep: (step: number) => void;
  setLoading: (loading: boolean) => void;
  setTimeLeft: (time: number) => void;
  resetForm: () => void;
}

export const useCrypto4CashStore = create<Crypto4CashState>()(
  persist(
    (set) => ({
      // Initial state
      selectedCryptoAsset: null,
      selectedNetwork: null,
      selectedCurrency: null,
      receiveAmount: '',
      cryptoAmount: '',
      selectedBank: null,
      accountNumber: '',
      accountName: '',
      email: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      createCashwyreAccount: false,
      userName: '',
      password: '',
      transactionSummary: null,
      currentStep: 1,
      isLoading: false,
      timeLeft: 0,

      // Actions
      setStep1Data: (data) => set((state) => ({ ...state, ...data })),
      setStep2Data: (data) => set((state) => ({ ...state, ...data })),
      setStep3Data: (data) => set((state) => ({ ...state, ...data })),
      setTransactionSummary: (summary) => set({ transactionSummary: summary }),
      setCurrentStep: (step) => set({ currentStep: step }),
      setLoading: (loading) => set({ isLoading: loading }),
      setTimeLeft: (time) => set({ timeLeft: time }),
      resetForm: () => set({
        selectedCryptoAsset: null,
        selectedNetwork: null,
        selectedCurrency: null,
        receiveAmount: '',
        cryptoAmount: '',
        selectedBank: null,
        accountNumber: '',
        accountName: '',
        email: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        createCashwyreAccount: false,
        userName: '',
        password: '',
        transactionSummary: null,
        currentStep: 1,
        timeLeft: 0,
      }),
    }),
    {
      name: 'crypto4cash-storage',
    }
  )
);