"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown, Users, Building } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface NavItem {
  name: string
  href?: string
  submenu?: string[]
}

const navItems: NavItem[] = [
  { name: "Services", submenu: ["Retail users", "Businesses & Fintechs"] },
  { name: "Business", href: "/business" },
  { name: "About Us", href: "/about" },
  { name: "Support", href: "/support" },
]

const submenuIcons: Record<string, any> = {
  "Retail users": Users,
  "Businesses & Fintechs": Building,
}

export default function FloatingNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
  const [submenuTimeout, setSubmenuTimeout] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 ${
        scrolled ? "glass-card shadow-2xl border-b border-white/20" : "bg-white/10 backdrop-blur-md border-b border-white/20"
      } transition-all duration-300`}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <Image
            src="/img/logos/cashwyre-logo1.png"
            alt="Cashwyre"
            width={140}
            height={140}
            style={{ width: "140px", height: "auto" }}
            className="rounded-xl shadow-lg group-hover:scale-105 transition-transform"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          {navItems.map((item) => (
            <div key={item.name} className="relative"
                 onMouseEnter={() => {
                   if (submenuTimeout) {
                     clearTimeout(submenuTimeout)
                     setSubmenuTimeout(null)
                   }
                   setActiveSubmenu(item.name)
                 }}
                 onMouseLeave={() => {
                   const timeout = setTimeout(() => setActiveSubmenu(null), 150)
                   setSubmenuTimeout(timeout)
                 }}>
              {item.href ? (
                <Link 
                  href={item.href}
                  className="text-gray-300 hover:text-white transition-all duration-300 font-medium px-3 py-2 rounded-lg hover:bg-white/10"
                >
                  {item.name}
                </Link>
              ) : (
                <button className="flex items-center space-x-1 text-gray-300 hover:text-white transition-all duration-300 font-medium px-3 py-2 rounded-lg hover:bg-white/10">
                  <span>{item.name}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${
                    activeSubmenu === item.name ? "rotate-180" : ""
                  }`} />
                </button>
              )}
              
              {item.submenu && activeSubmenu === item.name && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-0 mt-2 glass-card p-4 min-w-[290px] rounded-xl shadow-2xl border border-white/10"
                >
                  {item.submenu.map((subItem) => {
                    const IconComponent = submenuIcons[subItem]
                    let subPath = '';
                    if (subItem === 'Retail users') subPath = 'retail-users';
                    else if (subItem === 'Merchants & Businesses') subPath = 'businesses-fintechs';
                    else subPath = subItem.toLowerCase().replace(/\s*&\s*/g, '-').replace(/\s+/g, '-');
                    return (
                      <Link
                        key={subItem}
                        href={`/services/${subPath}`}
                        className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-[#FF6B35] rounded-lg transition-all duration-200 mb-1 last:mb-0 group"
                      >
                        {IconComponent && <IconComponent className="w-4 h-4 text-[#FF6B35] group-hover:text-white transition-colors" />}
                        <span className="group-hover:text-white transition-colors">{subItem}</span>
                      </Link>
                    )
                  })}
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <Link
          href="/get-started"
          className="hidden lg:block bg-gradient-to-r from-[#FF6B35] to-[#FFA726] px-8 py-3 rounded-xl text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:from-[#FF7B45] hover:to-[#FFB836]"
        >
          Get Started
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden glass-card p-3 rounded-xl hover:bg-white/10 transition-all"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
              >
                <Menu className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden glass-card mx-4 mb-4 rounded-xl overflow-hidden border border-white/10"
          >
            <div className="p-4 space-y-2">
              {navItems.map((item) => (
                <div key={item.name} className="border-b border-white/10 last:border-0">
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="block py-3 text-gray-300 hover:text-white transition-all"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <div className="py-3">
                      <div className="text-gray-300 font-medium mb-2">{item.name}</div>
                      <div className="space-y-1 pl-4">
                        {item.submenu?.map((subItem) => {
                          const IconComponent = submenuIcons[subItem]
                          let subPath = '';
                          if (subItem === 'Retail users') subPath = 'retail-users';
                          else if (subItem === 'Merchants & Businesses') subPath = 'businesses-fintechs';
                          else subPath = subItem.toLowerCase().replace(/\s*&\s*/g, '-').replace(/\s+/g, '-');
                          return (
                            <Link
                              key={subItem}
                              href={`/services/${subPath}`}
                              className="flex items-center space-x-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-[#FF6B35] transition-all group"
                              onClick={() => setIsOpen(false)}
                            >
                              {IconComponent && <IconComponent className="w-4 h-4 text-[#FF6B35] group-hover:text-white transition-colors" />}
                              <span className="group-hover:text-white transition-colors">{subItem}</span>
                            </Link>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <Link
                href="/get-started"
                className="block w-full text-center bg-gradient-to-r from-[#FF6B35] to-[#FFA726] px-6 py-3 rounded-lg text-white font-semibold mt-4"
                onClick={() => setIsOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}