"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? "rgba(5,5,8,0.85)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(201,168,68,0.15)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Logo />

        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: "Comment ça marche", href: "#wallet" },
            { label: "Nos packs", href: "#products" },
            { label: "Contact", href: "#contact" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[#F8F6F0]/60 hover:text-[#C9A844] text-sm tracking-wide transition-colors duration-200"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#products"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm tracking-wide transition-all duration-300 text-[#C9A844]"
          style={{
            border: "1px solid rgba(201,168,68,0.45)",
            fontFamily: "var(--font-inter)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(201,168,68,0.08)"
            e.currentTarget.style.borderColor = "rgba(201,168,68,0.8)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent"
            e.currentTarget.style.borderColor = "rgba(201,168,68,0.45)"
          }}
        >
          Voir les packs →
        </a>
      </div>
    </motion.header>
  )
}

function Logo() {
  return (
    <a href="#wallet" className="flex items-center gap-3">
      <Image
        src="/greenmirror-emblem.png"
        alt="GreenMirror"
        width={46}
        height={59}
        priority
        className="h-11 w-auto drop-shadow-[0_2px_8px_rgba(201,168,68,0.25)]"
      />
      <div>
        <div
          className="text-white text-[17px] font-semibold leading-none tracking-wide"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          GreenMirror
        </div>
      </div>
    </a>
  )
}
