"use client";
import { useState } from "react";
import DownloadSection from "@/components/sections/Download";
import CashwyreCheckoutWidget from "@/components/widget/CashwyreCheckoutWidget";

export default function CheckoutDemo() {
  const [email, setEmail] = useState("");
  const [payAmount, setPayAmount] = useState<number|null>(null);
  return (
    <>
      {/* Widget is only mounted when payAmount is set */}
      {payAmount && (
        <CashwyreCheckoutWidget
          amount={payAmount}
          currency="NGN"
          sessionID={undefined}
          merchantId="7cf40eaa-dc2f-49b0-9c8c-c574a78ad0f4"
          email={email}
          onClose={() => setPayAmount(null)}
        />
      )}
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0F0F0F] via-[#1A1A1A] to-[#2D1E0F] pt-32 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 text-center">Cashwyre Checkout Demo</h1>
        <p className="text-lg text-gray-300 max-w-xl text-center mb-8">
          The quickest way to experience Cashwyre Checkout in action is to make a live payment.
        </p>
        <div className="bg-[#181818] rounded-2xl p-8 w-full max-w-md mb-16 flex flex-col items-center">
          <input
            type="email"
            placeholder="Enter email to get your receipt"
            className="w-full mb-4 px-4 py-3 rounded-lg bg-black text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <div className="flex w-full gap-4">
            <button
              className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-lg transition"
              onClick={() => setPayAmount(100)}
            >
              Pay NGN 100
            </button>
            <button
              className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-lg transition"
              onClick={() => setPayAmount(1000)}
            >
              Pay NGN 1000
            </button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 w-full max-w-4xl">
          <div className="flex items-center justify-center">
            <img src="/img/business/bills-payment.png" alt="Bills Payment Demo" className="h-96 w-auto object-contain rounded-3xl shadow-lg" />
          </div>
          <div className="flex flex-col items-center md:items-start">
            <span className="text-orange-400 font-semibold mb-2">Get Started</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 text-center md:text-left">Start Accepting Payments In Just 30 Minutes.</h2>
            <a
              href="https://business.cashwyre.com/signup"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-8 py-3 rounded-lg transition inline-block"
            >
              Create a free account
            </a>
          </div>
        </div>
      </div>
      <DownloadSection />
    </>
  );
}
