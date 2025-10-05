export interface Currency {
  code: string;
  countryCode: string;
  name: string;
  symbol: string;
  minimumAmount: number;
  maximumAmount: number;
  phoneCode?: string;
  countryBanks?: Bank[];
  minimumReceiveAmount?: number;
  maximumReceiveAmount?: number;
}

export interface Bank {
  code: string;
  name: string;
  type: string;
  accountLookupRequired: boolean;
  country: string;
}

export interface CryptoAsset {
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

export interface Network {
  code: string;
  name: string;
  description: string;
  optionCode?: string;
  sendCryptoAssetOptionCode?: string;
  SendCryptoAssetOptionCode?: string;
}

export interface Crypto4CashInfo {
  cryptoAssets?: CryptoAsset[];
}

export interface Crypto4CashSummary {
  reference: string;
  status: string;
  cryptoAssetAddress: string;
  imageBas64String: string;
  description: string;
  txnExpiryInMinutes: number;
  transactionStatusRefreshTimeRateInSeconds: number;
  sendAmount?: number;
  sendCurrency?: string;
  receiveAmount?: number;
  receiveCurrency?: string;
  exchangeRate?: number;
  fee?: number;
  feeCurrency?: string;
}

export interface TransactionStage {
  name: string;
  status: 'pending' | 'complete' | 'failed';
  description: string;
}

export interface TransactionInfo {
  code: string;
  status: string;
  stages: TransactionStage[];
  sendAmount: number;
  sendCurrency: string;
  receiveAmount: number;
  receiveCurrency: string;
  exchangeRate: string;
  fee: number;
  feeCurrency: string;
  cryptoAssetAddress: string;
  accountNumber: string;
  accountName: string;
  bankName: string;
  continueTransactionStatusRefresh: boolean;
  transactionStatusRefreshTimeRateInSeconds: number;
  displayMessage?: string;
  message?: string;
}

export interface CryptoFiatRate {
  sendAmount: number;
  receiveAmount: number;
}