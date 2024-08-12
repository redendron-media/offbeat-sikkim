import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "@/app/globals.css";
import Header from "@/components/header";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/app/theme";
import Script from "next/script";

const roboto = Roboto({
  weight: ["100", "300", "400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Booking| Offbeat Sikkim",
  description: "Complete your booking for your adventure across the offbeat locations in North East India with Offbeat Sikkim.",
};

export default function BookingLayout({
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
      </head>
      <body className={`${roboto.className} bg-[#F6FBF4] pt-20 md:pt-32`}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header />
          {children} 
        </ThemeProvider>
      </body>
    </html>
  );
}
