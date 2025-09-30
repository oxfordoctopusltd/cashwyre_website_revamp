"use client";
import { useEffect } from "react";

export default function CashwyreWidget({ amount, currency, sessionID } = {}) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    // Dynamically load the widget.js script if not already present
    if (!document.getElementById("cashwyre-widget-js")) {
      const script = document.createElement("script");
      script.src = "https://paybusiness.cashwyre.com/widget.js";
      script.id = "cashwyre-widget-js";
      script.async = true;
      document.body.appendChild(script);
      script.onload = () => {
        initWidget();
      };
    } else {
      initWidget();
    }
    function initWidget() {
      const userEmail = new URLSearchParams(window.location.search).get('user');
      if (window.YourPayWidget && typeof window.YourPayWidget.init === 'function') {
        window.YourPayWidget.init({
          type: "widget",
          merchantId: "7cf40eaa-dc2f-49b0-9c8c-c574a78ad0f4",
          position: "bottom-left",
          user: userEmail,
          amount,
          currency,
          sessionID
        });
      }
    }
  }, [amount, currency, sessionID]);
  return null;
}
