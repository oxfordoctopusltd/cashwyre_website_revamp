import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"
import FloatingNav from "@/components/navigation/FloatingNav"

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
      <body className={`${inter.className} dark`}>
        <Providers>
          <FloatingNav />
          <main className="min-h-screen">{children}</main>
        </Providers>
      </body>
    </html>
  )
}