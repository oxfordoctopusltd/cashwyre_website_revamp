// components/crypto4cash/TransactionStatus.tsx
'use client';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { crypto4CashApi } from '@/lib/crypto4cash-api';
import { TransactionInfo } from '@/lib/types';

export default function TransactionStatus() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const transactionCode = searchParams.get('transactioncode');

  const [transaction, setTransaction] = useState<TransactionInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [pollCount, setPollCount] = useState(0);
  const maxPolls = 30; // Stop polling after 30 attempts (about 5 minutes at 10s intervals)

  useEffect(() => {
    if (transactionCode) {
      handleGetTransactionInfo(transactionCode);
    }
  }, [transactionCode]);

  const handleGetTransactionInfo = async (code: string) => {
    setLoading(true);
    let shouldContinuePolling = false;

    try {
      const response = await crypto4CashApi.getCrypto4CashTransactionInfo({ code });

      if (response.success) {
        setTransaction(response.data);
        setNotFound(false);

        // Check if transaction is completed
        if (['complete', 'payout_initiated', 'completed', 'asset_received'].includes(response.data.status)) {
          setIsCompleted(true);
        }

        // Continue polling if needed and haven't exceeded max polls
        if (response.data.continueTransactionStatusRefresh && pollCount < maxPolls) {
          shouldContinuePolling = true;
          const refreshRate = response.data.transactionStatusRefreshTimeRateInSeconds * 1000;
          setPollCount(prev => prev + 1);
          setTimeout(() => {
            handleGetTransactionInfo(code);
          }, refreshRate);
        } else if (pollCount >= maxPolls) {
          // Stop polling and show current status
          console.log('Stopped polling after maximum attempts');
        }
      } else {
        setNotFound(true);
      }
    } catch (error) {
      console.error('Error fetching transaction info:', error);
      setNotFound(true);
    } finally {
      if (!shouldContinuePolling) {
        setLoading(false);
      }
    }
  };

  const handleBackClick = () => {
    router.push('/crypto4cash');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4">Loading transaction status...</p>
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
            <h1 className="text-4xl font-bold mb-2">Crypto4Cash</h1>
            <p className="text-gray-400">Transaction Status</p>
          </div>

          <div className="bg-gray-800 rounded-2xl p-8">
            {notFound ? (
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Transaction Not Found</h2>
                <p className="text-gray-400 mb-6">
                  The transaction you are looking for does not exist or has expired.
                </p>
                <button
                  onClick={handleBackClick}
                  className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded-lg"
                >
                  Start New Transaction
                </button>
              </div>
            ) : transaction ? (
              <>
                <div className="text-center mb-8">
                  <p className="text-lg font-semibold">TRANSACTION STATUS</p>
                  <p className="text-amber-500 text-sm mt-2">REF: {transaction.code}</p>
                  <p className="text-white text-sm mt-2">Status: {transaction.status}</p>
                </div>

                {/* Transaction Stages */}
                <div className="mb-8">
                  {transaction.stages?.map((stage, index) => (
                    <div key={index} className="flex items-center mb-4">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          stage.status === 'complete'
                            ? 'bg-green-500'
                            : stage.status === 'failed'
                            ? 'bg-red-500'
                            : 'bg-gray-700'
                        }`}
                      >
                        {stage.status === 'complete' ? '✓' : index + 1}
                      </div>
                      <div className="ml-4">
                        <p className="text-white">{stage.name}</p>
                        <p className="text-gray-400 text-sm">{stage.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Transaction Details */}
                <div className="bg-gray-900 rounded-lg p-6 mb-6">
                  <h3 className="text-white font-semibold mb-4">Transaction Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">You Sent</span>
                      <span className="text-white">
                        {transaction.sendAmount} {transaction.sendCurrency}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">You Receive</span>
                      <span className="text-white">
                        {transaction.receiveAmount} {transaction.receiveCurrency}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Exchange Rate</span>
                      <span className="text-white">{transaction.exchangeRate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Fee</span>
                      <span className="text-white">
                        {transaction.fee} {transaction.feeCurrency}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Recipient Account</span>
                      <span className="text-white">
                        {transaction.accountNumber} - {transaction.accountName}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Bank</span>
                      <span className="text-white">{transaction.bankName}</span>
                    </div>
                  </div>
                </div>

                {/* Display Message */}
                {(transaction.displayMessage || transaction.message) && (
                  <div className="mt-6 p-4 bg-blue-900 rounded-lg">
                    <p className="text-blue-200">
                      {transaction.displayMessage || transaction.message}
                    </p>
                  </div>
                )}

                {/* Action Button */}
                {isCompleted && (
                  <div className="mt-8 flex justify-center">
                    <button
                      onClick={handleBackClick}
                      className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-8 rounded-lg font-semibold transition-colors"
                    >
                      Perform Another Transaction
                    </button>
                  </div>
                )}
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}