'use client';
import { useState, useEffect } from 'react';
import { useCrypto4CashStore } from '@/stores/crypto4cash-store';

interface Step4SummaryProps {
  onBack: () => void;
  onConfirmPayment: () => void;
}

export default function Step4Summary({ onBack, onConfirmPayment }: Step4SummaryProps) {
  const {
    transactionSummary,
    timeLeft,
    setTimeLeft,
    setLoading,
  } = useCrypto4CashStore();

  const [isCopyingRef, setIsCopyingRef] = useState(false);
  const [isCopyingAddress, setIsCopyingAddress] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, setTimeLeft]);

  const formatSeconds = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCopy = async (text: string, type: 'ref' | 'address') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'ref') {
        setIsCopyingRef(true);
        setTimeout(() => setIsCopyingRef(false), 2000);
      } else {
        setIsCopyingAddress(true);
        setTimeout(() => setIsCopyingAddress(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleShare = async (text: string) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Crypto Asset Address',
          text: `Here's the crypto address: ${text}`,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      // Fallback to copy
      handleCopy(text, 'address');
    }
  };

  if (!transactionSummary) {
    return (
      <div className="bg-gray-800 rounded-2xl p-8 text-center">
        <p>No transaction summary available.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-2xl p-8">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center text-gray-400 hover:text-white mb-6"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      <div className="text-center">
        <p className="text-white text-sm mb-4">Status: {transactionSummary.status}</p>

        {transactionSummary.imageBas64String && (
          <img
            src={transactionSummary.imageBas64String}
            alt="QR Code"
            className="w-48 h-48 mx-auto mb-4"
          />
        )}

        <div className="flex justify-center gap-4 mb-4">
          <button
            onClick={() => handleCopy(transactionSummary.cryptoAssetAddress, 'address')}
            className="flex items-center gap-2 px-4 py-2 border border-gray-400 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors"
          >
            {isCopyingAddress ? (
              'Copied'
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy
              </>
            )}
          </button>
          <button
            onClick={() => handleShare(transactionSummary.cryptoAssetAddress)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-400 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Share
          </button>
        </div>

        <p className="text-amber-500 text-sm mb-4">
          {transactionSummary.description}
        </p>

        <p className="text-white text-lg mb-6">
          Refresh in: <span className="text-orange-500">{formatSeconds(timeLeft)}</span>
        </p>
      </div>

      {/* Transaction Summary Details */}
      <div className="bg-gray-900 rounded-lg p-6 mb-6">
        <h3 className="text-white font-semibold mb-4">Transaction Summary</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-400">You Send</span>
            <span className="text-white">
              {transactionSummary.sendAmount} {transactionSummary.sendCurrency}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">You Receive</span>
            <span className="text-white">
              {transactionSummary.receiveAmount} {transactionSummary.receiveCurrency}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Exchange Rate</span>
            <span className="text-white">{transactionSummary.exchangeRate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Fee</span>
            <span className="text-white">
              {transactionSummary.fee} {transactionSummary.feeCurrency}
            </span>
          </div>
        </div>
      </div>

      {/* Transaction Reference */}
      <div className="flex justify-between items-center bg-gray-900 rounded-lg p-4 mb-6">
        <div>
          <p className="text-gray-400 text-sm">Tnx. Ref.</p>
          <p className="text-white font-mono">{transactionSummary.reference}</p>
        </div>
        <button
          onClick={() => handleCopy(transactionSummary.reference, 'ref')}
          className="flex items-center gap-2 px-3 py-1 border border-gray-400 rounded text-gray-300 hover:bg-gray-700 text-sm transition-colors"
        >
          {isCopyingRef ? (
            'Copied'
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>

      {/* Terms Agreement */}
      <div className="flex items-center mb-6">
        <input
          type="checkbox"
          id="agreeTerms"
          checked={agreeTerms}
          onChange={(e) => setAgreeTerms(e.target.checked)}
          className="w-4 h-4 text-orange-500 bg-gray-700 border-gray-600 rounded focus:ring-orange-500 focus:ring-2"
        />
        <label htmlFor="agreeTerms" className="ml-2 text-sm text-gray-300">
          I agree to Cashwyre{' '}
          <a href="/terms" className="text-orange-500 hover:underline">
            terms & conditions
          </a>{' '}
          necessary for this action
        </label>
      </div>

      {/* Confirm Payment Button */}
      <div className="flex justify-center">
        <button
          onClick={onConfirmPayment}
          disabled={!agreeTerms}
          className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 px-8 rounded-lg font-semibold transition-colors"
        >
          I Have Paid
        </button>
      </div>
    </div>
  );
}