"use client"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export default function NotificationSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-120px" })

  return (
    <section
      id="notifications"
      ref={ref}
      className="relative bg-black overflow-hidden py-24 sm:py-32"
    >
      <div className="max-w-7xl mx-auto px-6">
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
          Au bon moment
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.1 }}
          style={{
            fontFamily: "var(--font-playfair)",
            fontWeight: 600,
            fontSize: "clamp(38px, 5.2vw, 68px)",
            lineHeight: 0.9,
            letterSpacing: "max(-6px, -0.094em)",
            margin: "20px 0",
          }}
        >
          Pas une carte.
          <br />
          Une{" "}
          <em style={{ color: "#aaaaaa", fontStyle: "italic" }}>présence.</em>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="text-[#a1a1a6] max-w-2xl text-base sm:text-xl"
          style={{
            fontFamily: "var(--font-inter)",
            fontWeight: 400,
            lineHeight: 1.7,
          }}
        >
          Quand la récompense approche, la carte réapparaît. Subtilement. Au
          moment où votre client a une raison de revenir.
        </motion.p>

        {/* Notification */}
        <div className="mt-14 sm:mt-20 flex lg:justify-end">
          <motion.div
            initial={{ opacity: 0, y: 60, rotate: 0 }}
            animate={inView ? { opacity: 1, y: 0, rotate: 3 } : {}}
            transition={{ duration: 1.1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-3xl flex items-start gap-4 p-5 sm:p-6"
            style={{
              background: "#f5f5f7",
              borderRadius: 30,
              boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
            }}
          >
            <div
              className="flex-shrink-0 flex items-center justify-center rounded-full"
              style={{ width: 44, height: 44, background: "#111111" }}
            >
              <span className="text-[#c8ef4a] text-lg leading-none">✦</span>
            </div>

            <div className="flex-1 min-w-0" style={{ fontFamily: "var(--font-inter)" }}>
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-[11px] uppercase tracking-wide text-[#777777]">
                  Le 212 Barber
                </span>
                <span className="text-[12px] text-[#777777]">maintenant</span>
              </div>
              <div className="text-[15px] sm:text-base font-bold text-[#111111] mt-1 leading-snug">
                Votre 5e coupe est à portée de main.
              </div>
              <div className="text-[15px] sm:text-base text-[#a1a1a6] leading-snug">
                Il ne vous reste que 2 visites.
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
