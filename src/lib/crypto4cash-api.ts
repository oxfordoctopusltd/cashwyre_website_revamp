// lib/crypto4cash-api.ts
import { Currency, CryptoAsset, Crypto4CashInfo, Crypto4CashSummary, CryptoFiatRate, TransactionInfo } from './types';

// Use local Next.js API routes on the client to avoid CORS; allow env base URL on server if needed
const API_BASE_URL = typeof window === 'undefined'
  ? (process.env.NEXT_PUBLIC_API_BASE_URL || '')
  : '/api/crypto';
// Ensure AppId is always provided; fall back to a known public AppId used elsewhere in the app if env is missing
const APP_ID = process.env.NEXT_PUBLIC_APP_ID || '67dc443a-d148-800a-ba3c-077f41b637a0';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

class Crypto4CashApi {
  private async post<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        AppId: APP_ID,
        RequestId: `web_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      }),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return response.json();
  }

  // Get available currencies
  async getCrypto4CashCurrencies(): Promise<ApiResponse<Currency[]>> {
    return this.post('/getCrypto4CashCurrenciesProxy', {});
  }

  // Get crypto assets info
  async getCrypto4CashInfo(): Promise<ApiResponse<Crypto4CashInfo>> {
    return this.post('/getCrypto4CashInfo', {});
  }

  // NEW: Get currency info (may include bank list)
  async getCurrencyInfo(params: { Country?: string; country?: string; currencyCode?: string; CountryCode?: string }): Promise<ApiResponse<any>> {
    // Pass through provided params; server will add AppId/RequestId
    return this.post('/getCurrencyInfo', params);
  }

  // Get crypto to fiat rate
  async getCryptoFiatRate(params: {
    sendCryptoAssetOptionCode: string;
    receiveCurrency: string;
    receiveAmount?: number;
  }): Promise<ApiResponse<CryptoFiatRate>> {
    return this.post('/getCryptoFiatRate', params);
  }

  // Bank account lookup - match backend's expected field names
  async nameEnquiry(params: {
    accountNumber: string;
    bankCode: string;
    country: string;
  }): Promise<ApiResponse<string>> {
    // Map to backend's required casing: AccountNumber, BankCode, Country
    const payload = {
      AccountNumber: params.accountNumber,
      BankCode: params.bankCode,
      Country: params.country,
    };
    return this.post('/nameEnquiry', payload);
  }

  // Create crypto4cash transaction
  async crypto4CashSummary(params: any): Promise<ApiResponse<Crypto4CashSummary>> {
    return this.post('/crypto4CashSummary', params);
  }

  // Confirm payment
  async confirmPayment(params: { code: string }) {
    return this.post('/confirmPayment', params);
  }

  // Get transaction summary
  async getCrypto4CashTransactionSummary(params: { code: string }) {
    return this.post('/getCrypto4CashTransactionSummary', params);
  }

  // Get transaction info for status page
  async getCrypto4CashTransactionInfo(params: { code: string }): Promise<ApiResponse<TransactionInfo>> {
    return this.post('/getCrypto4CashTransactionInfo', params);
  }
}

export const crypto4CashApi = new Crypto4CashApi();