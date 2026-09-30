"use client"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const NOTIFICATIONS = [
  {
    sender: "Le 212 Barber",
    logo: "/passes/notif-lion.webp",
    logoFill: false,
    title: "Votre coupe offerte est à portée de main.",
    text: "Il ne vous reste que 2 visites.",
  },
  {
    sender: "Pizzas des 4 Saisons",
    logo: "/passes/logo-4saisons.webp",
    logoFill: true,
    title: "Vous n'êtes pas loin, passez nous faire un coucou 🍕🍕",
    text: "",
  },
]

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

        {/* Notifications */}
        <div className="mt-14 sm:mt-20 flex flex-col gap-6 sm:gap-8 lg:items-end">
          {NOTIFICATIONS.map((n, i) => (
            // Entrée façon notification iOS : la bannière tombe du haut, rebondit et
            // se pose bien droite ; la suivante arrive plus tard. Ensuite, elle flotte à peine.
            <motion.div
              key={n.sender}
              initial={{ opacity: 0, y: -48, scale: 0.9, rotate: 0 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1, rotate: 0 } : {}}
              transition={{
                delay: 0.6 + i * 1.1,
                opacity: { duration: 0.35 },
                default: { type: "spring", stiffness: 190, damping: 14, mass: 0.9 },
              }}
              className="w-full max-w-3xl"
            >
              <motion.div
                animate={inView ? { y: [0, -5, 0] } : {}}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2 + i * 1.1,
                }}
                className="flex items-start gap-4 p-5 sm:p-6"
                style={{
                  background: "#f5f5f7",
                  borderRadius: 30,
                  boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
                }}
              >
                <div
                  className="flex-shrink-0 flex items-center justify-center rounded-full overflow-hidden"
                  style={{ width: 44, height: 44, background: "#111111" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={n.logo}
                    alt={n.sender}
                    className={n.logoFill ? "w-full h-full object-cover" : "h-[30px] w-[30px] object-contain"}
                  />
                </div>

                <div className="flex-1 min-w-0" style={{ fontFamily: "var(--font-inter)" }}>
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-[11px] uppercase tracking-wide text-[#777777]">
                      {n.sender}
                    </span>
                    <span className="text-[12px] text-[#777777]">maintenant</span>
                  </div>
                  <div className="text-[15px] sm:text-base font-bold text-[#111111] mt-1 leading-snug">
                    {n.title}
                  </div>
                  {n.text && (
                    <div className="text-[15px] sm:text-base text-[#a1a1a6] leading-snug">
                      {n.text}
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
