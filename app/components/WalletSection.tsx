"use client"
import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { GreenMirrorCard, MirrorSvg } from "./HeroSection"

export default function WalletSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  /*
   * 3 cards enter the iPhone wallet one by one as you scroll.
   * Each new card lands at top (y=0), pushing others down.
   * Final positions: GM=0, loyalty=170, bank=340
   */
  const bankY = useTransform(
    scrollYProgress,
    [0, 0.22, 0.52, 0.82],
    [520, 0, 170, 340]
  )
  const bankOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1])

  const loyaltyY = useTransform(
    scrollYProgress,
    [0.28, 0.52, 0.82],
    [520, 0, 170]
  )
  const loyaltyOpacity = useTransform(scrollYProgress, [0.28, 0.38], [0, 1])

  const gmY = useTransform(scrollYProgress, [0.56, 0.82], [520, 0])
  const gmOpacity = useTransform(scrollYProgress, [0.56, 0.68], [0, 1])

  // Left-side text labels
  const t1Opacity = useTransform(scrollYProgress, [0, 0.08, 0.22, 0.32], [0, 1, 1, 0])
  const t2Opacity = useTransform(scrollYProgress, [0.28, 0.38, 0.52, 0.62], [0, 1, 1, 0])
  const t3Opacity = useTransform(scrollYProgress, [0.56, 0.68, 1], [0, 1, 1])

  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <section
      id="wallet"
      ref={containerRef}
      className="relative"
      style={{ height: "300vh" }}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-[#050508]">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 50% at 50% 55%, rgba(29,185,84,0.04) 0%, transparent 65%)",
            }}
          />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex items-center justify-between gap-8">
          {/* Left: text labels */}
          <div className="flex-1 hidden lg:block">
            <div className="relative h-52">
              {[
                {
                  opacity: t1Opacity,
                  step: "Étape 1",
                  title: "Vos clients reçoivent un lien par SMS",
                  desc: "En quelques secondes, ils ajoutent leur carte à leur portefeuille numérique.",
                },
                {
                  opacity: t2Opacity,
                  step: "Étape 2",
                  title: "La carte s'installe dans le Wallet",
                  desc: "Compatible iPhone & Android. Aucune application à télécharger.",
                },
                {
                  opacity: t3Opacity,
                  step: "Et voilà",
                  title: "GreenMirror dans leur poche, pour toujours",
                  desc: "Notifications, QR code intégré, mise à jour des points en temps réel.",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  style={{ opacity: item.opacity }}
                  className="absolute inset-0"
                >
                  <span
                    className="text-[#C9A844] text-[10px] tracking-[0.3em] uppercase"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {item.step}
                  </span>
                  <h3
                    className="text-3xl xl:text-4xl mt-3 leading-tight text-[#F8F6F0]"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-[#F8F6F0]/45 mt-4 text-sm leading-relaxed max-w-xs"
                    style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
                  >
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Center: iPhone mockup */}
          <div className="relative flex-shrink-0">
            {/* Glow */}
            <div
              className="absolute blur-3xl pointer-events-none"
              style={{
                inset: "-40px",
                background:
                  "radial-gradient(circle at 50% 65%, rgba(201,168,68,0.12) 0%, transparent 65%)",
              }}
            />

            {/* iPhone frame 270×560 */}
            <div className="relative" style={{ width: 270, height: 560 }}>
              {/* Outer frame */}
              <div
                className="absolute inset-0 rounded-[50px] bg-[#1C1C1E]"
                style={{
                  boxShadow: [
                    "0 0 0 1px #3d3d3d",
                    "0 0 0 2px #1a1a1a",
                    "0 48px 96px rgba(0,0,0,0.85)",
                    "0 0 60px rgba(201,168,68,0.07)",
                    "inset 0 1px 0 rgba(255,255,255,0.06)",
                  ].join(", "),
                }}
              />

              {/* Volume buttons left */}
              {[120, 165, 218].map((top, i) => (
                <div
                  key={i}
                  className="absolute left-[-3px] bg-[#2c2c2c] rounded-l-sm"
                  style={{ top, width: 3, height: i === 0 ? 30 : 46 }}
                />
              ))}
              {/* Power button right */}
              <div
                className="absolute right-[-3px] bg-[#2c2c2c] rounded-r-sm"
                style={{ top: 168, width: 3, height: 64 }}
              />

              {/* Screen */}
              <div className="absolute inset-[6px] rounded-[44px] bg-black overflow-hidden">
                {/* Dynamic island */}
                <div
                  className="absolute top-3 left-1/2 -translate-x-1/2 z-20 bg-black rounded-full"
                  style={{
                    width: 90,
                    height: 28,
                    boxShadow: "0 0 0 1px #222",
                  }}
                />

                {/* Screen content */}
                <div className="absolute inset-0 bg-black flex flex-col">
                  {/* Status bar */}
                  <div className="flex justify-between items-center px-8 pt-4 pb-1 flex-shrink-0">
                    <span className="text-white text-[11px] font-semibold">9:41</span>
                    <div className="flex items-center gap-1.5">
                      {/* Signal */}
                      <svg width="18" height="11" viewBox="0 0 18 11" fill="none">
                        <rect x="0" y="3" width="3" height="8" rx="1" fill="white" />
                        <rect x="5" y="2" width="3" height="9" rx="1" fill="white" />
                        <rect x="10" y="0" width="3" height="11" rx="1" fill="white" />
                        <rect x="15" y="0" width="3" height="11" rx="1" fill="white" opacity="0.3" />
                      </svg>
                      {/* Battery */}
                      <svg width="26" height="12" viewBox="0 0 26 12" fill="none">
                        <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="white" strokeOpacity="0.35" />
                        <rect x="22" y="4" width="3" height="4" rx="1" fill="white" fillOpacity="0.4" />
                        <rect x="2" y="2" width="16" height="8" rx="2" fill="white" />
                      </svg>
                    </div>
                  </div>

                  {/* Wallet header */}
                  <div className="flex justify-between items-center px-5 pt-1 pb-2 flex-shrink-0">
                    <span className="text-white text-[22px] font-bold tracking-tight">
                      Cartes
                    </span>
                    <div className="flex gap-1.5">
                      {["+", "⊙", "⋮"].map((icon, i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm"
                          style={{ background: "#1C1C1E" }}
                        >
                          {icon}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Cards clip zone */}
                  <div
                    className="relative mx-3 overflow-hidden flex-1"
                    style={{ height: 380 }}
                  >
                    {/* Bank card (z=1, enters first, ends at bottom) */}
                    <motion.div
                      className="absolute inset-x-0"
                      style={{ y: bankY, opacity: bankOpacity, zIndex: 1 }}
                    >
                      <BankCard />
                    </motion.div>

                    {/* Loyalty card (z=2) */}
                    <motion.div
                      className="absolute inset-x-0"
                      style={{ y: loyaltyY, opacity: loyaltyOpacity, zIndex: 2 }}
                    >
                      <LoyaltyCard />
                    </motion.div>

                    {/* GreenMirror card (z=3, enters last, ends on top) */}
                    <motion.div
                      className="absolute inset-x-0"
                      style={{ y: gmY, opacity: gmOpacity, zIndex: 3 }}
                    >
                      <div className="mx-0.5">
                        <GreenMirrorCard small />
                      </div>
                    </motion.div>
                  </div>

                  {/* Home indicator */}
                  <div
                    className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-white/40"
                    style={{ width: 120, height: 4 }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right: progress bar */}
          <div className="flex-1 hidden lg:flex flex-col items-start gap-4">
            <div
              className="h-0.5 w-44 rounded-full overflow-hidden"
              style={{ background: "rgba(248,246,240,0.08)" }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: progressWidth,
                  background: "linear-gradient(90deg, #C9A844, #F0D060)",
                }}
              />
            </div>
            <p
              className="text-[#F8F6F0]/30 text-[11px] tracking-widest uppercase"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Faites défiler
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function BankCard() {
  return (
    <div
      className="h-[148px] rounded-2xl overflow-hidden mx-0.5"
      style={{
        background: "linear-gradient(135deg, #1a1a3e 0%, #2d2d5e 60%, #1a1a3e 100%)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.6)",
      }}
    >
      <div className="p-4">
        <div
          className="text-white/50 text-[9px] uppercase tracking-widest"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Carte Bancaire
        </div>
        <div
          className="text-white/80 font-mono text-sm mt-5"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          •••• •••• •••• 4821
        </div>
        <div
          className="text-white/35 text-[9px] mt-1"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          EXP 09/28 · VISA
        </div>
      </div>
    </div>
  )
}

function LoyaltyCard() {
  return (
    <div
      className="h-[148px] rounded-2xl overflow-hidden mx-0.5"
      style={{
        background: "linear-gradient(135deg, #1a2e1c 0%, #1e3a22 60%, #1a2e1c 100%)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.6)",
      }}
    >
      <div className="p-4">
        <div
          className="text-white/50 text-[9px] uppercase tracking-widest"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Carte Fidélité
        </div>
        <div
          className="text-white/80 text-[13px] font-medium mt-2"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Boutique Mode Paris
        </div>
        <div className="flex gap-1.5 mt-3">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="w-[16px] h-[16px] rounded-full"
              style={{
                background:
                  i < 5 ? "rgba(34,197,94,0.65)" : "rgba(255,255,255,0.1)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
