"use client"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export default function CtaSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-120px" })

  return (
    <section
      id="cta"
      ref={ref}
      className="relative overflow-hidden py-28 sm:py-40 px-6"
      style={{ background: "#121b10" }}
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="uppercase"
          style={{
            fontFamily: "var(--font-dm-mono)",
            fontSize: 10,
            letterSpacing: "1.5px",
            color: "#c8ef4a",
          }}
        >
          Faites revenir ceux qui vous ont choisi
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.1 }}
          style={{
            fontFamily: "var(--font-playfair)",
            fontWeight: 600,
            fontSize: "clamp(44px, 7.4vw, 104px)",
            lineHeight: 0.9,
            letterSpacing: "max(-6px, -0.094em)",
            margin: "20px 0 44px",
            color: "#f5f5f7",
          }}
        >
          Votre meilleure
          <br className="hidden sm:block" /> publicité est déjà
          <br className="hidden sm:block" /> dans leur{" "}
          <em style={{ color: "#c8ef4a", fontStyle: "italic" }}>poche.</em>
        </motion.h2>

        <motion.a
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          href="mailto:contact@greenmirror.fr"
          className="inline-flex items-center gap-4 px-8 py-5 rounded-full text-[15px] font-bold transition-all duration-300 hover:-translate-y-0.5"
          style={{
            background: "#c8ef4a",
            color: "#111111",
            fontFamily: "var(--font-inter)",
            boxShadow: "0 8px 32px rgba(200,239,74,0.2)",
          }}
        >
          Parlons de votre projet
          <span aria-hidden="true">↗</span>
        </motion.a>
      </div>
    </section>
  )
}
