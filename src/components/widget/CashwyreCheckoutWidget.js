"use client";
import { useEffect } from "react";

export default function CashwyreCheckoutWidget({
  amount,
  currency,
  sessionID,
  merchantId = "7cf40eaa-dc2f-49b0-9c8c-c574a78ad0f4",
  email,
  onClose
}) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    // Load widget.js if not present
    if (!document.getElementById("cashwyre-widget-js")) {
      const script = document.createElement("script");
      script.src = "https://paybusiness.cashwyre.com/widget.js";
      script.id = "cashwyre-widget-js";
      script.async = true;
      document.body.appendChild(script);
    }
    // Handler for button click
    // Open widget immediately when mounted
    const userEmail = email || new URLSearchParams(window.location.search).get('user');
    if (window.YourPayWidget && typeof window.YourPayWidget.init === 'function') {
      window.YourPayWidget.init({
        type: "checkout",
        merchantId,
        user: userEmail,
        amount,
        currency,
        sessionID
      });
    }
    // Optionally, listen for widget close event if available
    // if (onClose) { ... }
  }, [amount, currency, sessionID, merchantId]);
  return null;
}
