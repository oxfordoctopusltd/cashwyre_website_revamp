"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

const footerSections = [
  {
    title: "Services",
    links: [
      { name: "Retail Customers", href: "/services/retail-customers" },
      { name: "Merchants & Businesses", href: "/services/merchants-businesses" },
      { name: "Business", href: "/business" },
    ]
  },
  {
    title: "Company",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Support", href: "/support" },
      { name: "Get Started", href: "/get-started" },
    ]
  },
]

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-white/10 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {/* Logo and About Section */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center group">
              <Image
                src="/img/logos/cashwyre-logo1.png"
                alt="Cashwyre"
                width={140}
                height={140}
                className="rounded-xl shadow-lg group-hover:scale-105 transition-transform"
              />
            </Link>
            <p className="text-gray-400 leading-relaxed">
              Making borderless transactions easy. Send and receive money freely across borders with Cashwyre's secure platform.
            </p>
          </div>

          {/* Services Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white text-lg">Services</h3>
            <ul className="space-y-3">
              {footerSections[0].links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white text-lg">Company</h3>
            <ul className="space-y-3">
              {footerSections[1].links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-4 text-center space-y-3">
          <p className="text-gray-400 text-xs leading-relaxed max-w-4xl mx-auto">
            Cashwyre is not a licensed money transfer operator, bureau de change, or remittance service provider. All cross-border and currency exchange transactions are facilitated by licensed third-party partners in accordance with applicable laws and regulations. Cashwyre serves solely as a technology platform enabling access to these services.
          </p>
          <p className="text-gray-300 text-sm font-semibold">
            © {new Date().getFullYear()} Cashwyre. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}