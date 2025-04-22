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

const roboto = Roboto({
  weight: ["100", "300", "400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Offbeat Sikkim",
  description: "Explore Northeast India and Bhutan with Offbeat Sikkim - your gateway to hidden gems in Sikkim, Meghalaya, Arunachal, and beyond. Book North East India and Bhutan tours, treks, and cultural experiences."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
          <Header />
          {children}
          <WhatsAppWidget />
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
      </body>
    </html>
  );
}
