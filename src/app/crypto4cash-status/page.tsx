// app/crypto4cash-status/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { crypto4CashApi } from '@/lib/crypto4cash-api';

interface TransactionStage {
  name: string;
  status: 'pending' | 'complete' | 'failed';
  description: string;
  timestamp?: string;
}

interface TransactionInfo {
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
  txnExpiryInMinutes?: number;
  transactionStages?: any[];
}

export default function Crypto4CashStatusPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const transactionCode = searchParams.get('transactioncode');
  const type = searchParams.get('type'); // 'offramp' or regular

  const [transaction, setTransaction] = useState<TransactionInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (transactionCode) {
      handleGetTransactionInfo(transactionCode);
    } else {
      setNotFound(true);
      setLoading(false);
    }
  }, [transactionCode]);

  // Countdown timer for transaction expiry
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleGetTransactionInfo = async (code: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await crypto4CashApi.getCrypto4CashTransactionInfo({ code });

      if (response.success && response.data) {
        // Tell TypeScript the shape of response.data
        const data = response.data as TransactionInfo;
        setTransaction(data);
        setNotFound(false);

        // Check if transaction is completed
        const completedStatuses = ['complete', 'payout_initiated', 'completed', 'asset_received'];
        if (completedStatuses.includes(data.status)) {
          setIsCompleted(true);
        }

        // Check if transaction is cancelled
        if (data.status === 'cancelled') {
          setError('Transaction has been cancelled');
          setIsCompleted(false);
        }

        // Set countdown timer if transaction is still active
        if (data.txnExpiryInMinutes && !completedStatuses.includes(data.status)) {
          setTimeLeft(data.txnExpiryInMinutes * 60);
        }

        // Continue polling if needed
        if (data.continueTransactionStatusRefresh && !completedStatuses.includes(data.status)) {
          const refreshRate = data.transactionStatusRefreshTimeRateInSeconds
            ? data.transactionStatusRefreshTimeRateInSeconds * 1000
            : 10000;
          setTimeout(() => {
            handleGetTransactionInfo(code);
          }, refreshRate);
        }
      } else {
        setNotFound(true);
        setError(response.message || 'Transaction not found');
      }
    } catch (error: any) {
      console.error('Error fetching transaction info:', error);
      setNotFound(true);
      setError(error.message || 'Failed to fetch transaction information');
    } finally {
      setLoading(false);
    }
  };

  const handleBackClick = () => {
    if (type === 'offramp') {
      router.push('/offramp');
    } else {
      router.push('/crypto4cash');
    }
  };

  const formatSeconds = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'complete':
      case 'completed':
      case 'payout_initiated':
      case 'asset_received':
        return 'text-green-400';
      case 'pending':
      case 'processing':
        return 'text-yellow-400';
      case 'failed':
      case 'cancelled':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'complete':
      case 'completed':
      case 'payout_initiated':
      case 'asset_received':
        return '✅';
      case 'pending':
      case 'processing':
        return '⏳';
      case 'failed':
      case 'cancelled':
        return '❌';
      default:
        return '🔍';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-xl">Loading transaction status...</p>
          <p className="text-gray-400 text-sm mt-2">Please wait while we fetch your transaction details</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">
              {type === 'offramp' ? 'Crypto Offramp' : 'Crypto4Cash'}
            </h1>
            <p className="text-gray-400">Transaction Status</p>
          </div>

          {/* Back Button */}
          {!loading && (
            <button
              onClick={handleBackClick}
              className="flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to {type === 'offramp' ? 'Offramp' : 'Crypto4Cash'}
            </button>
          )}

          <div className="bg-gray-800 rounded-2xl p-8">
            {notFound ? (
              <div className="text-center py-12">
                <div className="text-red-400 text-6xl mb-4">❌</div>
                <h2 className="text-2xl font-bold mb-4">Transaction Not Found</h2>
                <p className="text-gray-400 mb-6 max-w-md mx-auto">
                  The transaction you are looking for does not exist, has expired, or has been cancelled.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={handleBackClick}
                    className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-8 rounded-lg font-semibold transition-colors"
                  >
                    Start New Transaction
                  </button>
                  <button
                    onClick={() => window.location.reload()}
                    className="bg-gray-700 hover:bg-gray-600 text-white py-3 px-8 rounded-lg font-semibold transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            ) : transaction ? (
              <>
                {/* Transaction Header */}
                <div className="text-center mb-8">
                  <div className="flex justify-center items-center mb-4">
                    <span className="text-4xl mr-3">{getStatusIcon(transaction.status)}</span>
                    <h2 className="text-2xl font-bold">TRANSACTION STATUS</h2>
                  </div>
                  <p className="text-amber-500 text-sm font-mono mb-2">REF: {transaction.code}</p>
                  <p className={`text-lg font-semibold ${getStatusColor(transaction.status)}`}>
                    Status: {transaction.status.toUpperCase()}
                  </p>
                  
                  {/* Countdown Timer */}
                  {timeLeft > 0 && !isCompleted && (
                    <div className="mt-4">
                      <p className="text-white text-sm">
                        Expires in: <span className="text-orange-500 font-mono">{formatSeconds(timeLeft)}</span>
                      </p>
                    </div>
                  )}
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-900 border border-red-700 rounded-lg p-4 mb-6">
                    <p className="text-red-200">{error}</p>
                  </div>
                )}

                {/* Success Message */}
                {isCompleted && (
                  <div className="bg-green-900 border border-green-700 rounded-lg p-4 mb-6">
                    <div className="flex items-center">
                      <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-green-200 font-semibold">Transaction Completed Successfully!</p>
                    </div>
                  </div>
                )}

                {/* Transaction Stages */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-6 text-center">Transaction Progress</h3>
                  <div className="space-y-6">
                    {(transaction.stages || transaction.transactionStages || []).map((stage: any, index: number) => (
                      <div key={index} className="flex items-start">
                        <div
                          className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                            stage.status === 'complete' || stage.status === 'completed'
                              ? 'bg-green-500 text-white'
                              : stage.status === 'failed' || stage.status === 'cancelled'
                              ? 'bg-red-500 text-white'
                              : 'bg-gray-700 text-gray-300'
                          }`}
                        >
                          {stage.status === 'complete' || stage.status === 'completed' ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <span>{index + 1}</span>
                          )}
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-white font-medium">{stage.name}</p>
                              <p className="text-gray-400 text-sm mt-1">{stage.description}</p>
                            </div>
                            <span className={`text-sm font-medium ${getStatusColor(stage.status)}`}>
                              {stage.status?.toUpperCase()}
                            </span>
                          </div>
                          {stage.timestamp && (
                            <p className="text-gray-500 text-xs mt-1">
                              {new Date(stage.timestamp).toLocaleString()}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Transaction Details */}
                <div className="bg-gray-900 rounded-lg p-6 mb-6">
                  <h3 className="text-white font-semibold text-lg mb-4 border-b border-gray-700 pb-2">
                    Transaction Details
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-gray-800">
                      <span className="text-gray-400">You Sent</span>
                      <span className="text-white font-semibold">
                        {transaction.sendAmount} {transaction.sendCurrency}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-800">
                      <span className="text-gray-400">You Receive</span>
                      <span className="text-white font-semibold">
                        {transaction.receiveAmount} {transaction.receiveCurrency}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-800">
                      <span className="text-gray-400">Exchange Rate</span>
                      <span className="text-white font-semibold">{transaction.exchangeRate}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-800">
                      <span className="text-gray-400">Fee</span>
                      <span className="text-white font-semibold">
                        {transaction.fee} {transaction.feeCurrency}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-800">
                      <span className="text-gray-400">Recipient Account</span>
                      <span className="text-white font-semibold text-right">
                        {transaction.accountNumber}<br />
                        <span className="text-sm text-gray-300">{transaction.accountName}</span>
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-400">Bank</span>
                      <span className="text-white font-semibold">{transaction.bankName}</span>
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                {transaction.cryptoAssetAddress && (
                  <div className="bg-gray-900 rounded-lg p-6 mb-6">
                    <h3 className="text-white font-semibold text-lg mb-4 border-b border-gray-700 pb-2">
                      Crypto Address
                    </h3>
                    <div className="bg-gray-800 rounded p-3">
                      <p className="text-gray-300 font-mono text-sm break-all">
                        {transaction.cryptoAssetAddress}
                      </p>
                    </div>
                  </div>
                )}

                {/* Display Message */}
                {(transaction.displayMessage || transaction.message) && (
                  <div className="bg-blue-900 border border-blue-700 rounded-lg p-4 mb-6">
                    <div className="flex items-start">
                      <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-blue-200">
                        {transaction.displayMessage || transaction.message}
                      </p>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                  {isCompleted ? (
                    <>
                      <button
                        onClick={handleBackClick}
                        className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-8 rounded-lg font-semibold transition-colors"
                      >
                        Perform Another Transaction
                      </button>
                      <button
                        onClick={() => window.print()}
                        className="bg-gray-700 hover:bg-gray-600 text-white py-3 px-8 rounded-lg font-semibold transition-colors"
                      >
                        Print Receipt
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => transactionCode && handleGetTransactionInfo(transactionCode)}
                      className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-8 rounded-lg font-semibold transition-colors"
                    >
                      Refresh Status
                    </button>
                  )}
                </div>
              </>
            ) : null}
          </div>

          {/* Support Information */}
          <div className="text-center mt-8 text-gray-500 text-sm">
            <p>Need help? Contact our support team if you have any questions about your transaction.</p>
            <p className="mt-2">
              Transaction Reference: <span className="font-mono text-amber-500">{transactionCode}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}