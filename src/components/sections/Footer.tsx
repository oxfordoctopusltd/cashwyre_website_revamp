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
      { name: "Privacy policy", href: "/privacy" },
      { name: "AML policy", href: "/aml" },
      { name: "Terms & Condition", href: "/terms" },
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
              Cashwyre, simplifying payments
            </p>
            <div className="flex space-x-4 mt-4">
              <Link href="https://www.linkedin.com/company/cashwyrehq/posts/" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-white transition-colors">
                <i className="fab fa-linkedin text-lg"></i>
              </Link>
              <Link href="https://www.instagram.com/cashwyre_hq/" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-white transition-colors">
                <i className="fab fa-instagram text-lg"></i>
              </Link>
              <Link href="https://x.com/cashwyre_HQ" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-white transition-colors">
                <i className="fab fa-x-twitter text-lg"></i>
              </Link>
              <Link href="https://t.me/cashwyre" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-white transition-colors">
                <i className="fab fa-telegram text-lg"></i>
              </Link>
            </div>
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
            <div className="relative flex items-center justify-center mb-2">
              <div className="flex-1 h-px bg-white/20" />
              <h3 className="font-semibold text-white text-lg px-4 whitespace-nowrap z-10 bg-[#0A0A0A]">Company</h3>
              <div className="flex-1 h-px bg-white/20" />
            </div>
            <div className="flex flex-row gap-8 items-start justify-center relative">
              <ul className="space-y-3">
                {footerSections[1].links.slice(0, 3).map((link) => (
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
              {/* Vertical divider, starts below heading and is centered */}
              <div className="hidden md:flex justify-center">
                <div className="h-full w-px bg-white/20 mx-4" style={{ minHeight: '80px', marginTop: 0 }} />
              </div>
              <ul className="space-y-3">
                {footerSections[1].links.slice(3).map((link) => (
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
        </div>

        <div className="border-t border-white/10 mt-8 pt-4">
          <div className="flex justify-center mb-4">
            <div className="text-gray-400 text-xs leading-relaxed max-w-2xl text-center">
              <p className="mb-2">
                Cashwyre is a product of Wyrelight Technologies Limited, offering alternative payment solutions powered by blockchain technology. Our platform enables the use of cryptocurrencies for everyday transactions in a secure and sustainable manner.
              </p>
              <p>
                Cashwyre is not a bank. We do not hold customer deposits, custody assets, or provide any services that require regulatory authorization.
              </p>
            </div>
          </div>
          <p className="text-gray-300 text-sm font-semibold text-center">
            © 2023 - {new Date().getFullYear()} Cashwyre. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}