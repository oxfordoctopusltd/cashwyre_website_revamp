'use client';
import { useState } from 'react';
import { useCrypto4CashStore } from '@/stores/crypto4cash-store';

interface Step3ContactInfoProps {
  onBack: () => void;
  onSubmit: () => void;
}

export default function Step3ContactInfo({ onBack, onSubmit }: Step3ContactInfoProps) {
  const {
    email,
    firstName,
    lastName,
    phoneNumber,
    createCashwyreAccount,
    userName,
    password,
    selectedCurrency,
    setStep3Data,
  } = useCrypto4CashStore();

  const [emailError, setEmailError] = useState('');

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleEmailChange = (value: string) => {
    setStep3Data({ email: value });
    if (value && !validateEmail(value)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const canSubmit = email && !emailError && 
    (!createCashwyreAccount || (firstName && lastName && phoneNumber && userName && password));

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

      <div className="space-y-6">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-2">Email Address</label>
          <input
            type="email"
            className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={email}
            onChange={(e) => handleEmailChange(e.target.value)}
            placeholder="og@gmail.com"
          />
          {emailError && (
            <div className="text-red-400 text-sm mt-1">{emailError}</div>
          )}
        </div>

        {/* Create Account Toggle */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="createAccount"
            checked={createCashwyreAccount}
            onChange={(e) => setStep3Data({ createCashwyreAccount: e.target.checked })}
            className="w-4 h-4 text-orange-500 bg-gray-700 border-gray-600 rounded focus:ring-orange-500 focus:ring-2"
          />
          <label htmlFor="createAccount" className="ml-2 text-sm text-gray-300">
            I want to register on Cashwyre
          </label>
        </div>

        {/* Conditional Fields for Account Creation */}
        {createCashwyreAccount && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">First Name</label>
                <input
                  type="text"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={firstName}
                  onChange={(e) => setStep3Data({ firstName: e.target.value })}
                  placeholder="---"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Last Name</label>
                <input
                  type="text"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={lastName}
                  onChange={(e) => setStep3Data({ lastName: e.target.value })}
                  placeholder="---"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Phone Number</label>
              <div className="flex">
                <div className="bg-gray-700 border border-r-0 border-gray-600 rounded-l-lg py-3 px-4 text-gray-300">
                  {selectedCurrency?.phoneCode || '+234'}
                </div>
                <input
                  type="text"
                  className="flex-1 bg-gray-700 border border-l-0 border-gray-600 rounded-r-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={phoneNumber}
                  onChange={(e) => {
                    // Only allow numbers
                    const value = e.target.value.replace(/\D/g, '');
                    setStep3Data({ phoneNumber: value });
                  }}
                  placeholder="xxx xxxx xxx"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Username</label>
                <input
                  type="text"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={userName}
                  onChange={(e) => setStep3Data({ userName: e.target.value })}
                  placeholder="---"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={password}
                  onChange={(e) => setStep3Data({ password: e.target.value })}
                  placeholder="---"
                />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Submit Button */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={onSubmit}
          disabled={!canSubmit}
          className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 px-8 rounded-lg font-semibold transition-colors"
        >
          Submit
        </button>
      </div>
    </div>
  );
}