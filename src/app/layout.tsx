import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"
import ClientFloatingNav from "@/components/navigation/ClientFloatingNav"
import Footer from "@/components/sections/Footer"
import CashwyreWidget from "@/components/widget/CashwyreWidget"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Cashwyre - Send & Receive Money Freely Across Borders",
  description: "Simplify Cross-Border & Crypto Payments with Cashwyre. Seamlessly send, receive, and save money using Bitcoin, Stablecoin, or local currencies with our secure, fast, and reliable platform.",
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" />
        <style dangerouslySetInnerHTML={{
          __html: `
            body { background-color: #0F0F0F !important; color: white !important; }
            .hero-loading { 
              min-height: 70vh; 
              background: linear-gradient(135deg, #0F0F0F 0%, #1A1A1A 50%, #2D1E0F 100%);
              display: flex;
              align-items: center;
              justify-content: center;
            }
          `
        }} />
      </head>
      <body className={`${inter.className} dark bg-[#0F0F0F] text-white min-h-screen`}>
        <Providers>
          <ClientFloatingNav />
          <main className="min-h-screen bg-[#0F0F0F]">{children}</main>
          <Footer />
          <CashwyreWidget />
        </Providers>
      </body>
    </html>
  )
}