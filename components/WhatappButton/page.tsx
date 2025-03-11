"use client";

import { useEffect } from "react";

export default function WhatsAppWidget() {
  useEffect(() => {
    console.log("WhatsAppWidget Component Mounted");

    // Prevent multiple script injections
    if (document.getElementById("whatsapp-widget-script")) {
      console.warn("WhatsApp Widget script already exists");
      return;
    }

    // Create the script element
    const script = document.createElement("script");
    script.id = "whatsapp-widget-script";
    script.async = true;
    script.src = `https://app.interakt.ai/kiwi-sdk/kiwi-sdk-17-prod-min.js?v=${new Date().getTime()}`;
    
    script.onload = () => {
      console.log("WhatsApp Widget Script Loaded");

      if (window.kiwi) {
        console.log("WhatsApp Widget Found - Initializing");
        window.kiwi.init("", "ypu2h4XY9DZMOVKhpcqVdfdYxU6Z2neg", {});
      } else {
        console.error("WhatsApp Widget Script Loaded, but `window.kiwi` is undefined");
      }
    };

    script.onerror = () => {
      console.error("Failed to load WhatsApp Widget script");
    };

    document.body.appendChild(script);
  }, []);

  return null; // This component does not render UI
}
