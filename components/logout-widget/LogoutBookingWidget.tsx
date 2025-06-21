"use client";
import ReactDOM from "react-dom";
import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    logout: {
      widget: {
        setConfig: (config: any) => void;
        init: () => void;
        destroy?: () => void;
      };
    };
  }
}

interface LogoutBookingWidgetProps {
  packageSlug: string;
}

// Map of our package slugs to Logout World event slugs
const slugMapping: Record<string, string> = {
  "upcoming-bhutan-tour": "escape-to-bhutan-7n8d",
  "upcoming-sikkim-darjeeling": "experience-sikkim-darjeeling",
  "upcoming-goechala-trek": "goechala-trek",
  "upcoming-north-sikkim-tour-nathula-pass":
    "escape-to-north-sikkim-nathula-pass",
};

export default function LogoutBookingWidget({
  packageSlug,
}: LogoutBookingWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);
  const widgetInitialized = useRef(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Cleanup previous widget instance
    if (widgetInitialized.current && window.logout?.widget?.destroy) {
      window.logout.widget.destroy();
      widgetInitialized.current = false;
    }

    // Only load the script if it hasn't been loaded yet
    if (!scriptLoaded.current) {
      const script = document.createElement("script");
      script.src = "https://logout.world/static/widget/logout-booking.js";
      script.type = "text/javascript";
      script.async = true;
      script.onload = () => {
        scriptLoaded.current = true;
        initWidget();
      };
      script.onerror = () => {
        console.error("Failed to load Logout widget script");
      };
      document.body.appendChild(script);
    } else if (window.logout?.widget && !widgetInitialized.current) {
      // If script is already loaded, just initialize the widget
      initWidget();
    }

    function initWidget() {
      if (!window.logout?.widget || widgetInitialized.current) return;

      try {
        // Get the matching eventSlug or use the default value
        const eventSlug = slugMapping[packageSlug] || "escape-to-bhutan-7n8d";

        window.logout.widget.setConfig({
          eventSlug: eventSlug,
          placement: "#book-container",
          customClass: "btn-custom",
          btnId: "logout-bnb",
          downloadBtnId: "logout-download-button",
          enquiryBtnId: "logout-enquiry-button",
          showEverything: true,
          onlyButton: false,
          showItineraryButton: true,
          showEnquiryButton: true,
          bookNowButtonColor: "#2db97c",
          itineraryButtonColor: "#2db97c",
          booknowButtonName: "Book Now",
          itineraryButtonName: "Itinerary",
          enquiryButtonName: "Enquire",
          // Add z-index control to prevent navbar conflicts
          zIndex: 10,
        });

        window.logout.widget.init();
        widgetInitialized.current = true;
      } catch (error) {
        console.error("Error initializing Logout widget:", error);
      }
    }

    // Cleanup
    return () => {
      if (widgetInitialized.current && window.logout?.widget?.destroy) {
        window.logout.widget.destroy();
        widgetInitialized.current = false;
      }
    };
  }, [packageSlug, mounted]);

  if (!mounted) return null;

  const portalRoot =
    typeof window !== "undefined"
      ? document.getElementById("logout-widget-portal")
      : null;

  if (!portalRoot) return null;

  return ReactDOM.createPortal(
    <div
      ref={containerRef}
      id="book-container"
      style={{
        zIndex: 10,
        position: "relative",
      }}
    />,
    portalRoot
  );
}
