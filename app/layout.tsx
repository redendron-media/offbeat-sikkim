import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import Script from "next/script";
import WhatsAppButton from "@/components/WhatappButton/page";
import Loader from "@/components/loader/page";
import Image from "next/image";
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
    "Plan your adventure across the offbeat locations in North East India with Offbeat Sikkim. Explore Sikkim, Meghalaya, Arunachal Pradesh, Nagaland, and similar offbeat destinations. Book treks, cultural tours, group tours and travel packages starting at just INR 13,999/-",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-6FEZLY447N"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-6FEZLY447N');
          `}
        </Script>
        <Script
        id="facebook-pixel"
        strategy="afterInteractive"
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
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Loader />
          <Header />
  
          {children}
          <WhatsAppButton/>
          <Footer />
        </ThemeProvider>   

    
      <noscript>
        <Image
          alt="Facebook"
          height="1"
          width="1"
          style={{ display: "none" }}
          src={"https://www.facebook.com/tr?id=870665934694594&ev=PageView&noscript=1"}
        />
      </noscript>
      </body>
    </html>
  );
}
