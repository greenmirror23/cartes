"use client"
import { useRef, useState } from "react"
import Image from "next/image"
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion"

const STEPS = [
  { step: "Étape 1", text: "Vos clients reçoivent un lien par SMS." },
  { step: "Étape 2", text: "La carte s'installe dans le Wallet, sans app." },
  { step: "Étape 3", text: "Elle rejoint les cartes de leur quotidien." },
  { step: "Et voilà", text: "GreenMirror dans leur poche, pour toujours." },
]

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  /*
   * Apple Wallet tight stack: each card flies in from below and settles into
   * an overlapping stack. Only a ~44px header peek of the cards behind shows;
   * the GreenMirror card lands at the bottom, fully visible, in front.
   * Peek offset = 44px → bank top (y=0), barber (y=44), GreenMirror (y=88, full).
   */
  const PEEK = 44
  const ENTER = 470 // start fully below the clip zone (cards never fade, only slide)

  const bankY    = useTransform(scrollYProgress, [0,    0.12], [ENTER, 0])
  const cafeY    = useTransform(scrollYProgress, [0.18, 0.34], [ENTER, PEEK])
  const loyaltyY = useTransform(scrollYProgress, [0.40, 0.56], [ENTER, PEEK * 2])
  const gmY      = useTransform(scrollYProgress, [0.62, 0.78], [ENTER, PEEK * 3])

  const [activeStep, setActiveStep] = useState(0)
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = v < 0.20 ? 0 : v < 0.42 ? 1 : v < 0.64 ? 2 : 3
    setActiveStep((prev) => (prev === next ? prev : next))
  })

  return (
    <section
      id="wallet"
      ref={containerRef}
      className="relative"
      style={{ height: "300vh" }}
    >
      <div className="sticky top-0 h-[100dvh] flex items-start lg:items-center overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-[#050508]">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 35% 50%, rgba(29,185,84,0.06) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 50% 50% at 75% 45%, rgba(201,168,68,0.05) 0%, transparent 65%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(201,168,68,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,68,1) 1px, transparent 1px)",
              backgroundSize: "90px 90px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-20 lg:pt-24 pb-10">
          <div className="grid lg:grid-cols-2 gap-3 lg:gap-16 items-center">
            {/* Left: copy */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-6"
              >
                <span
                  className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-[#C9A844] text-xs tracking-[0.22em] uppercase"
                  style={{
                    border: "1px solid rgba(201,168,68,0.3)",
                    background: "rgba(201,168,68,0.05)",
                    fontFamily: "var(--font-inter)",
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-[#22c55e] inline-block"
                    style={{ animation: "glow-pulse 2s ease-in-out infinite" }}
                  />
                  Cartes de fidélité numériques
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.3 }}
                className="text-[2rem] sm:text-4xl lg:text-[3.3rem] leading-[1.08] mb-4 sm:mb-6"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Vos clients portent{" "}
                <span className="gold-shimmer italic">votre marque</span>
                <br />
                dans leur poche
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.45 }}
                className="hidden sm:block text-[#F8F6F0]/55 text-base lg:text-lg leading-relaxed mb-8 max-w-md"
                style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
              >
                Des cartes de fidélité numériques premium, personnalisées à votre
                image et intégrées directement dans l&apos;Apple Wallet et Google
                Wallet de vos clients.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.58 }}
                className="flex flex-col sm:flex-row gap-4 mb-6 lg:mb-10"
              >
                <a
                  href="#products"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-sm tracking-wide font-semibold transition-all duration-300 group"
                  style={{
                    background: "linear-gradient(135deg, #c9a844, #d4af37)",
                    color: "#050508",
                    boxShadow: "0 8px 32px rgba(201,168,68,0.28)",
                    fontFamily: "var(--font-inter)",
                  }}
                >
                  Découvrir les packs
                  <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">
                    →
                  </span>
                </a>
              </motion.div>
            </div>

            {/* Right: iPhone with scroll-driven cards + caption */}
            <div className="flex flex-col items-center lg:items-center gap-7">
              {/* Single step caption — only one visible at a time */}
              <div className="relative h-8 lg:h-16 w-full max-w-sm text-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="absolute inset-0 flex flex-col justify-center items-center"
                  >
                    <span
                      className="text-[#C9A844] text-[10px] tracking-[0.3em] uppercase mb-1.5"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {STEPS[activeStep].step}
                    </span>
                    <p
                      className="text-[#F8F6F0]/60 text-sm"
                      style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
                    >
                      {STEPS[activeStep].text}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="relative flex-shrink-0 phone-scale-mobile">
                {/* Glow */}
                <div
                  className="absolute blur-3xl pointer-events-none"
                  style={{
                    inset: "-40px",
                    background:
                      "radial-gradient(circle at 50% 55%, rgba(201,168,68,0.14) 0%, rgba(34,197,94,0.06) 45%, transparent 70%)",
                  }}
                />

                {/* iPhone frame */}
                <div className="relative" style={{ width: 256, height: 530 }}>
                  <div
                    className="absolute inset-0 rounded-[48px] bg-[#1C1C1E]"
                    style={{
                      boxShadow: [
                        "0 0 0 1px #3d3d3d",
                        "0 0 0 2px #1a1a1a",
                        "0 48px 96px rgba(0,0,0,0.85)",
                        "0 0 60px rgba(201,168,68,0.08)",
                        "inset 0 1px 0 rgba(255,255,255,0.06)",
                      ].join(", "),
                    }}
                  />

                  {/* Side buttons */}
                  {[114, 156, 206].map((top, i) => (
                    <div
                      key={i}
                      className="absolute left-[-3px] bg-[#2c2c2c] rounded-l-sm"
                      style={{ top, width: 3, height: i === 0 ? 28 : 44 }}
                    />
                  ))}
                  <div
                    className="absolute right-[-3px] bg-[#2c2c2c] rounded-r-sm"
                    style={{ top: 160, width: 3, height: 60 }}
                  />

                  {/* Screen */}
                  <div className="absolute inset-[6px] rounded-[42px] bg-black overflow-hidden">
                    {/* Dynamic island */}
                    <div
                      className="absolute top-3 left-1/2 -translate-x-1/2 z-20 bg-black rounded-full"
                      style={{ width: 86, height: 26, boxShadow: "0 0 0 1px #222" }}
                    />

                    <div className="absolute inset-0 bg-black flex flex-col">
                      {/* Status bar */}
                      <div className="flex justify-between items-center px-7 pt-4 pb-1 flex-shrink-0">
                        <span className="text-white text-[11px] font-semibold">
                          9:41
                        </span>
                        <div className="flex items-center gap-1.5">
                          <svg width="17" height="11" viewBox="0 0 18 11" fill="none">
                            <rect x="0" y="3" width="3" height="8" rx="1" fill="white" />
                            <rect x="5" y="2" width="3" height="9" rx="1" fill="white" />
                            <rect x="10" y="0" width="3" height="11" rx="1" fill="white" />
                            <rect x="15" y="0" width="3" height="11" rx="1" fill="white" opacity="0.3" />
                          </svg>
                          <svg width="25" height="12" viewBox="0 0 26 12" fill="none">
                            <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="white" strokeOpacity="0.35" />
                            <rect x="22" y="4" width="3" height="4" rx="1" fill="white" fillOpacity="0.4" />
                            <rect x="2" y="2" width="16" height="8" rx="2" fill="white" />
                          </svg>
                        </div>
                      </div>

                      {/* Wallet header */}
                      <div className="flex justify-between items-center px-5 pt-1 pb-2 flex-shrink-0">
                        <span className="text-white text-[21px] font-bold tracking-tight">
                          Cartes
                        </span>
                        <div className="flex gap-1.5">
                          {["+", "⊙", "⋮"].map((icon, i) => (
                            <div
                              key={i}
                              className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs"
                              style={{ background: "#1C1C1E" }}
                            >
                              {icon}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Cards clip zone */}
                      <div className="relative mx-3 overflow-hidden flex-1">
                        <motion.div className="absolute inset-x-0" style={{ y: bankY, zIndex: 1 }}>
                          <BankCard />
                        </motion.div>
                        <motion.div className="absolute inset-x-0" style={{ y: cafeY, zIndex: 2 }}>
                          <CafeCard />
                        </motion.div>
                        <motion.div className="absolute inset-x-0" style={{ y: loyaltyY, zIndex: 3 }}>
                          <LoyaltyCard />
                        </motion.div>
                        <motion.div className="absolute inset-x-0" style={{ y: gmY, zIndex: 4 }}>
                          <div className="mx-0.5">
                            <GreenMirrorCard small />
                          </div>
                        </motion.div>
                      </div>

                      {/* Home indicator */}
                      <div
                        className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-white/40"
                        style={{ width: 115, height: 4 }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
        >
          <span
            className="text-[#F8F6F0]/25 text-[10px] tracking-[0.3em] uppercase"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Faites défiler
          </span>
          <motion.div
            className="w-px h-9 rounded-full"
            style={{
              background:
                "linear-gradient(to bottom, rgba(201,168,68,0.6), transparent)",
            }}
            animate={{ scaleY: [1, 0.4, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2.2 }}
          />
        </motion.div>
      </div>
    </section>
  )
}

function EmvChip() {
  return (
    <div
      className="w-7 h-5 rounded-[4px] relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #e8d49a 0%, #c9a84a 50%, #b8923a 100%)",
      }}
    >
      <div className="absolute inset-0" style={{ boxShadow: "inset 0 0 0 0.5px rgba(0,0,0,0.25)" }} />
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-black/20 -translate-x-1/2" />
      <div className="absolute top-1/2 left-0 right-0 h-px bg-black/20 -translate-y-1/2" />
    </div>
  )
}

function BankCard() {
  return (
    <div
      className="h-[138px] rounded-2xl overflow-hidden mx-0.5 relative"
      style={{
        background: "linear-gradient(135deg, #1e1b4b 0%, #3730a3 50%, #4c1d95 100%)",
        boxShadow: "0 6px 28px rgba(0,0,0,0.6)",
      }}
    >
      <div className="absolute inset-0 opacity-35" style={{
        background: "linear-gradient(115deg, transparent 25%, rgba(167,139,250,0.4) 42%, rgba(255,255,255,0.12) 52%, transparent 65%)",
      }} />
      <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full blur-2xl opacity-25" style={{
        background: "radial-gradient(circle, #a78bfa 0%, transparent 70%)",
      }} />

      <div className="relative p-4 h-full flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-white/40 text-[6px] tracking-[0.22em] uppercase mb-2" style={{ fontFamily: "var(--font-inter)" }}>
              Banque Nationale · Premium
            </div>
            <EmvChip />
          </div>
          <ContactlessIcon />
        </div>
        <div className="flex justify-between items-end">
          <div>
            <div className="text-white/85 text-[12.5px] font-medium tracking-[0.13em]" style={{ fontFamily: "var(--font-inter)" }}>
              •••• •••• •••• 4821
            </div>
            <div className="text-white/40 text-[7px] mt-1 tracking-[0.1em] uppercase" style={{ fontFamily: "var(--font-inter)" }}>
              Thomas Martin · 08/28
            </div>
          </div>
          <svg width="34" height="21" viewBox="0 0 34 21" fill="none">
            <circle cx="12" cy="10.5" r="10.5" fill="#EB001B" opacity="0.92"/>
            <circle cx="22" cy="10.5" r="10.5" fill="#F79E1B" opacity="0.92"/>
            <path d="M17 2.8a10.5 10.5 0 0 1 0 15.4A10.5 10.5 0 0 1 17 2.8z" fill="#FF5F00"/>
          </svg>
        </div>
      </div>
    </div>
  )
}

function CafeCard() {
  return (
    <div
      className="h-[138px] rounded-2xl overflow-hidden mx-0.5 relative"
      style={{
        background: "linear-gradient(135deg, #064e3b 0%, #047857 55%, #10b981 100%)",
        boxShadow: "0 6px 28px rgba(0,0,0,0.55)",
      }}
    >
      <div className="absolute inset-0 opacity-20" style={{
        background: "linear-gradient(155deg, rgba(255,255,255,0.4) 0%, transparent 45%)",
      }} />
      <div className="absolute -bottom-2 -right-2 w-24 h-24 rounded-full blur-2xl opacity-20" style={{
        background: "radial-gradient(circle, #6ee7b7 0%, transparent 70%)",
      }} />

      <div className="relative p-4 h-full flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-white/55 text-[7px] tracking-[0.2em] uppercase" style={{ fontFamily: "var(--font-inter)" }}>Carte fidélité</div>
            <div className="text-white text-[18px] font-bold tracking-tight mt-0.5" style={{ fontFamily: "var(--font-playfair)" }}>Le Rostand</div>
          </div>
          <div className="bg-white/20 rounded-full px-2.5 py-1">
            <span className="text-white text-[7.5px] font-semibold tracking-widest" style={{ fontFamily: "var(--font-inter)" }}>GOLD</span>
          </div>
        </div>
        <div>
          <div className="flex gap-[4px] mb-2">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="flex-1 h-[18px] rounded-[4px] flex items-center justify-center"
                style={{ background: i < 6 ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.15)" }}
              >
                {i < 6 && (
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C8.5 2 6 5 6 8c0 4 6 13 6 13s6-9 6-13c0-3-2.5-6-6-6z" fill="#064e3b"/>
                    <circle cx="12" cy="8" r="2.5" fill="#10b981"/>
                  </svg>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between items-end">
            <span className="text-white text-[11.5px] font-semibold" style={{ fontFamily: "var(--font-inter)" }}>6 / 8 cafés</span>
            <span className="text-white/60 text-[8px]" style={{ fontFamily: "var(--font-inter)" }}>Café offert au prochain</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function ScissorsIcon({ size = 9, color = "#0a0a0a" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="6" cy="6" r="3" stroke={color} strokeWidth="2" />
      <circle cx="6" cy="18" r="3" stroke={color} strokeWidth="2" />
      <line x1="20" y1="4" x2="8.5" y2="15.5" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="20" y1="20" x2="8.5" y2="8.5" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

// Glossy piano-black surface shared by the premium cards
const GLOSSY_BLACK_BG =
  "linear-gradient(135deg, #26262b 0%, #101013 30%, #060607 52%, #0c0c0f 70%, #1c1c21 100%)"

const GLOSSY_BLACK_SHADOW = [
  "inset 0 1px 0 rgba(255,255,255,0.22)",
  "inset 0 -2px 6px rgba(0,0,0,0.85)",
  "inset 0 0 0 1px rgba(201,168,68,0.28)",
  "0 18px 40px rgba(0,0,0,0.7)",
].join(", ")

// Reflection / gloss layers for a wet-look black card
function GlossOverlay() {
  return (
    <>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 130% 75% at 22% -15%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.05) 30%, transparent 56%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(122deg, transparent 36%, rgba(255,255,255,0.04) 46%, rgba(255,255,255,0.13) 50%, rgba(255,255,255,0.03) 55%, transparent 66%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 120% 80% at 88% 130%, rgba(0,0,0,0.4) 0%, transparent 45%)",
        }}
      />
    </>
  )
}

// Embossed gold text style (raised foil look)
const goldEmboss: React.CSSProperties = {
  backgroundImage: "linear-gradient(180deg, #fdeebb 0%, #f3d77e 42%, #e3bd58 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  WebkitTextFillColor: "transparent",
  filter: "drop-shadow(0 1px 0.5px rgba(0,0,0,0.85))",
}

function LoyaltyCard() {
  return (
    <div
      className="h-[138px] rounded-2xl overflow-hidden mx-0.5 relative"
      style={{
        background: "linear-gradient(135deg, #991b1b 0%, #dc2626 50%, #ea580c 100%)",
        boxShadow: "0 6px 28px rgba(0,0,0,0.55)",
      }}
    >
      <div className="absolute inset-0 opacity-22" style={{
        background: "linear-gradient(155deg, rgba(255,255,255,0.4) 0%, transparent 40%)",
      }} />
      <div className="absolute right-3 bottom-1 text-white/[0.07] font-bold leading-none select-none" style={{ fontSize: 72, fontFamily: "var(--font-playfair)" }}>
        212
      </div>

      <div className="relative p-4 h-full flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-white/55 text-[7px] tracking-[0.2em] uppercase" style={{ fontFamily: "var(--font-inter)" }}>Carte fidélité</div>
            <div className="text-white text-[17px] font-bold tracking-tight mt-0.5" style={{ fontFamily: "var(--font-playfair)" }}>Le 212 Barber</div>
          </div>
          <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center">
            <ScissorsIcon size={14} color="rgba(255,255,255,0.9)" />
          </div>
        </div>
        <div>
          <div className="flex gap-[4.5px] mb-2">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="flex-1 h-[5px] rounded-full"
                style={{ background: i < 4 ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.18)" }}
              />
            ))}
          </div>
          <div className="flex justify-between items-end">
            <span className="text-white text-[11.5px] font-semibold" style={{ fontFamily: "var(--font-inter)" }}>4 / 10 coupes</span>
            <span className="text-white/60 text-[8px]" style={{ fontFamily: "var(--font-inter)" }}>Coupe offerte à la 10ᵉ</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function MiniQR({
  size = 34,
  dark = "#0a0a12",
  light = "#C9A844",
}: {
  size?: number
  dark?: string
  light?: string
}) {
  // deterministic faux-QR pattern
  const cells = 7
  const pattern = [
    [1, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 1, 1],
    [1, 1, 1, 0, 1, 0, 1],
    [0, 0, 0, 1, 0, 1, 0],
    [1, 0, 1, 0, 1, 1, 1],
    [1, 1, 0, 1, 0, 0, 1],
    [1, 0, 1, 0, 1, 1, 1],
  ]
  return (
    <div
      className="rounded-[3px] p-[2px] grid"
      style={{
        width: size,
        height: size,
        background: light,
        gridTemplateColumns: `repeat(${cells}, 1fr)`,
        gap: "1px",
      }}
    >
      {pattern.flat().map((c, i) => (
        <div
          key={i}
          style={{ background: c ? dark : "transparent", borderRadius: "0.5px" }}
        />
      ))}
    </div>
  )
}

export function GreenMirrorCard({ small = false }: { small?: boolean }) {
  const s = small
  return (
    <div
      className={`relative ${s ? "h-[138px]" : "w-80 h-48"} rounded-2xl overflow-hidden`}
      style={{ background: GLOSSY_BLACK_BG, boxShadow: GLOSSY_BLACK_SHADOW }}
    >
      <GlossOverlay />
      {/* radial green glow behind emblem */}
      <div
        className="absolute -left-3 top-1/2 -translate-y-1/2 w-28 h-28 blur-2xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(34,197,94,0.28) 0%, transparent 70%)",
        }}
      />

      <div className={`relative ${s ? "p-4" : "p-6"} h-full flex flex-col justify-between`}>
        {/* header */}
        <div className="flex items-center gap-2.5">
          <Image
            src="/greenmirror-emblem.png"
            alt="GreenMirror"
            width={s ? 31 : 42}
            height={s ? 40 : 54}
            className={s ? "h-10 w-auto" : "h-14 w-auto"}
            style={{
              filter:
                "drop-shadow(0 2px 3px rgba(0,0,0,0.7)) drop-shadow(0 0 7px rgba(34,197,94,0.3))",
            }}
          />
          <div>
            <div
              className={`${s ? "text-[14px]" : "text-lg"} font-semibold tracking-wide leading-none`}
              style={{ ...goldEmboss, fontFamily: "var(--font-playfair)" }}
            >
              GreenMirror
            </div>
            <div
              className="text-[6.5px] tracking-[0.16em] uppercase mt-1"
              style={{ ...goldEmboss, fontFamily: "var(--font-inter)" }}
            >
              L&apos;IA au service de votre entreprise
            </div>
          </div>
          <div className="ml-auto self-start">
            <ContactlessIcon />
          </div>
        </div>

        {/* stamps — embossed mirror tokens */}
        <div className="flex gap-[5px]">
          {[...Array(10)].map((_, i) => {
            const filled = i < 7
            return (
              <div
                key={i}
                className="w-[16px] h-[16px] rounded-full flex items-center justify-center"
                style={
                  filled
                    ? {
                        background:
                          "radial-gradient(circle at 35% 30%, #3ddc7a 0%, #1a8f47 70%)",
                        boxShadow:
                          "0 1px 2px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.35)",
                      }
                    : {
                        background: "rgba(0,0,0,0.35)",
                        boxShadow:
                          "inset 0 1px 2px rgba(0,0,0,0.8), inset 0 0 0 1px rgba(201,168,68,0.3)",
                      }
                }
              >
                {filled && (
                  <span className="text-[#04230f] text-[8px] leading-none font-bold">✓</span>
                )}
              </div>
            )
          })}
        </div>

        {/* footer */}
        <div className="flex justify-between items-end">
          <div>
            <div
              className="text-[#F8F6F0]/40 text-[7px] uppercase tracking-[0.2em]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Membre
            </div>
            <div
              className={`text-[#F8F6F0] ${s ? "text-[12px]" : "text-sm"} font-medium mt-0.5`}
              style={{
                fontFamily: "var(--font-inter)",
                textShadow: "0 1px 1px rgba(0,0,0,0.8)",
              }}
            >
              Sophie M.
            </div>
            <div
              className="text-[8px] tracking-wide mt-0.5"
              style={{ ...goldEmboss, fontFamily: "var(--font-inter)" }}
            >
              −10% à la 10ᵉ visite
            </div>
          </div>
          <MiniQR size={s ? 36 : 46} dark="#0a0a0a" light="#e7c766" />
        </div>
      </div>
    </div>
  )
}

function ContactlessIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      {[5, 9, 13].map((r, i) => (
        <path
          key={i}
          d={`M${8 + i * 2} ${12 - r * 0.7} A ${r} ${r} 0 0 1 ${8 + i * 2} ${12 + r * 0.7}`}
          stroke="#C9A844"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity={0.85 - i * 0.18}
          fill="none"
        />
      ))}
    </svg>
  )
}

export function MirrorSvg({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="18.5" stroke="#C9A844" strokeWidth="1" />
      <circle cx="20" cy="20" r="15" stroke="#C9A844" strokeWidth="0.5" strokeDasharray="1.8 2.8" opacity="0.6" />
      <circle cx="20" cy="20" r="12" fill="#04100a" />
      <path
        d="M20 19.5 C22 15 23.5 11.5 20.5 10.5 C17 9.5 14 12 13.5 15 C13 18 15.5 20.5 19 21 C22.5 21.5 25 18.5 24 14.5 C23 10 18.5 8.5 14.5 10.5"
        stroke="#22c55e"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
        opacity="0.9"
      />
      <circle cx="20" cy="20" r="1.8" fill="#22c55e" opacity="0.85" />
      <path d="M20 1.5 L21.2 4.5 L20 3.5 L18.8 4.5 Z" fill="#C9A844" />
      <path d="M20 38.5 L21.2 35.5 L20 36.5 L18.8 35.5 Z" fill="#C9A844" />
    </svg>
  )
}
