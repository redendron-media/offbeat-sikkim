"use client";

import { useEffect } from "react";

export default function WhatsAppWidget() {
  useEffect(() => {

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

      if (window.kiwi) {
        window.kiwi.init("", "ypu2h4XY9DZMOVKhpcqVdfdYxU6Z2neg", {});

        setTimeout(() => {
          const whatsappIframe = document.querySelector("iframe[src*='interakt.ai']") as HTMLIFrameElement | null;
          if (whatsappIframe) {
            whatsappIframe.style.zIndex = "10";  // Lower z-index
          }
        }, 2000); 
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
