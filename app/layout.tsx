import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import Script from "next/script";
import WhatsAppWidget from "@/components/WhatappButton/page";
import Loader from "@/components/loader/page";
import Image from "next/image";
import { GoogleAnalytics } from "@next/third-parties/google";
import { usePathname } from "next/navigation";
import { useIsMobile } from "@/lib/useIsMobile";

const roboto = Roboto({
  weight: ["100", "300", "400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Offbeat Sikkim",
  description:
    "Explore Northeast India and Bhutan with Offbeat Sikkim - your gateway to hidden gems in Sikkim, Meghalaya, Arunachal, and beyond. Book North East India and Bhutan tours, treks, and cultural experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Add mobile and pathname detection
  const pathname =
    typeof window !== "undefined" ? window.location.pathname : "";
  const isMobile =
    typeof window !== "undefined" ? window.innerWidth < 768 : false;
  // Hide header on mobile for /packages and /packages/[link]
  const hideHeaderOnMobile =
    isMobile && (pathname === "/packages" || pathname.startsWith("/packages/"));

  return (
    <html lang="en">
      <head>
        <GoogleAnalytics gaId="G-6FEZLY447N" />
        <Script
          id="facebook-pixel"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        >
          {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init','870665934694594');
          fbq('track', 'PageView');
        `}
        </Script>
      </head>

      <body className={`${roboto.className} bg-[#F6FBF4]`}>
        {/* <ReactLenis root> */}
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Loader />
          {/* Conditionally render Header */}
          {!hideHeaderOnMobile && <Header />}
          {children}
          {/* Floating WhatsApp Button */}
          <a
            href="https://wa.me/918391980947"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed z-50 bottom-14 right-6 md:bottom-8 md:right-8 flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#25D366] shadow-lg hover:bg-[#1ebe57] transition-colors"
            aria-label="Chat on WhatsApp"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="white">
              <path d="M16 3C9.373 3 4 8.373 4 15c0 2.637.86 5.08 2.36 7.09L4 29l7.18-2.31C13.13 27.56 14.54 28 16 28c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22c-1.29 0-2.56-.25-3.75-.74l-.27-.11-4.26 1.37 1.4-4.13-.18-.28C7.3 18.13 6.5 16.6 6.5 15c0-5.24 4.26-9.5 9.5-9.5s9.5 4.26 9.5 9.5-4.26 9.5-9.5 9.5zm5.13-7.38c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.43-2.25-1.37-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.32.42-.48.14-.16.18-.28.28-.46.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47-.16-.01-.34-.01-.52-.01-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.3s.98 2.67 1.12 2.85c.14.18 1.93 2.95 4.68 4.02.65.28 1.16.45 1.56.58.65.21 1.24.18 1.7.11.52-.08 1.65-.67 1.89-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.18-.53-.32z"/>
            </svg>
          </a>
          <Footer />
        </ThemeProvider>
        {/* </ReactLenis> */}
        <noscript>
          <Image
            alt="Facebook"
            height="1"
            width="1"
            style={{ display: "none" }}
            src={
              "https://www.facebook.com/tr?id=870665934694594&ev=PageView&noscript=1"
            }
          />
        </noscript>
        <div id="logout-widget-portal"></div>
      </body>
    </html>
  );
}
