import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  weight: ['200', '300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: "ChosenCRM - AI-Powered Mortgage CRM",
  description: "The AI-Powered CRM That Thinks Like a Top Producer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // ✅ We apply the Prestige Metallic theme using data-theme on <html>
  return (
    <html lang="en" data-theme="prestige-metallic">
      <body className={`${inter.className} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}

