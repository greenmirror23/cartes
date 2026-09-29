"use client"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const PACKS = [
  {
    name: "Small",
    tagline: "Idéal pour démarrer",
    quantity: "200",
    unit: "cartes numériques",
    price: "50",
    badge: null,
    features: [
      "200 cartes numériques personnalisées",
      "Compatible Apple Wallet & Google Wallet",
      "QR code intégré et scannable",
      "Design aux couleurs de votre marque",
      "Tableau de bord de gestion",
      "Support par email",
      "Livraison sous 48h",
    ],
    cta: "Commander le Pack Small",
    href: "https://buy.stripe.com/7sY00i9wrdM65KGcai7g400",
    highlight: false,
  },
  {
    name: "Medium",
    tagline: "Le plus populaire",
    quantity: "500",
    unit: "cartes numériques",
    price: "95",
    badge: null,
    features: [
      "500 cartes numériques personnalisées",
      "Compatible Apple Wallet & Google Wallet",
      "QR code intégré et scannable",
      "Design aux couleurs de votre marque",
      "Tableau de bord avancé + analytics",
      "Notifications push automatiques",
      "Support prioritaire (réponse < 4h)",
      "Livraison sous 48h",
      "Renouvellement facilité",
    ],
    cta: "Commander le Pack Medium",
    href: "https://buy.stripe.com/28EfZg4c7cI27SOeiq7g402",
    highlight: true,
  },
  {
    name: "Large",
    tagline: "Pour les grands volumes",
    quantity: "1000",
    unit: "cartes numériques",
    price: "160",
    badge: null,
    features: [
      "1000 cartes numériques personnalisées",
      "Compatible Apple Wallet & Google Wallet",
      "QR code intégré et scannable",
      "Design premium sur mesure",
      "Tableau de bord avancé + analytics",
      "Notifications push illimitées",
      "Support dédié (réponse < 2h)",
      "Livraison sous 48h",
      "Renouvellement prioritaire",
    ],
    cta: "Commander le Pack Large",
    href: "https://buy.stripe.com/14A00i8sn0Zkc942zI7g403",
    highlight: false,
  },
]

export default function ProductsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      id="products"
      ref={ref}
      className="relative py-32 overflow-hidden"
      style={{ background: "#f5f5f7", color: "#111111" }}
    >
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span
            className="inline-block text-[#5e7720] text-[10px] tracking-[0.15em] uppercase mb-5"
            style={{ fontFamily: "var(--font-dm-mono)" }}
          >
            Tarifs
          </span>
          <h2
            className="text-4xl lg:text-5xl text-[#111111] mb-5"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Choisissez votre pack
          </h2>
          <p
            className="text-[#111111]/65 text-base max-w-md mx-auto leading-relaxed"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Des cartes de fidélité numériques premium, personnalisées à votre
            image. Facturation mensuelle.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {PACKS.map((pack, i) => (
            <motion.div
              key={pack.name}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15 + i * 0.15 }}
            >
              <PackCard pack={pack} />
            </motion.div>
          ))}
        </div>

        {/* Trust line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-center text-[#777777] text-xs mt-14 tracking-wide"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Paiement sécurisé · Satisfait ou remboursé 14 jours · Support inclus
        </motion.p>
      </div>

      {/* Contact anchor */}
      <div id="contact" className="absolute bottom-0" />
    </section>
  )
}

function PackCard({ pack }: { pack: (typeof PACKS)[0] }) {
  // Le pack mis en avant est la carte sombre (#121212) de la section claire.
  const dark = pack.highlight
  const ink = dark ? "#f5f5f7" : "#111111"
  const soft = dark ? "rgba(245,245,247,0.55)" : "rgba(17,17,17,0.55)"
  const body = dark ? "rgba(245,245,247,0.72)" : "rgba(17,17,17,0.72)"
  const rule = dark ? "rgba(255,255,255,0.13)" : "#dddddd"

  return (
    <div
      className="relative rounded-3xl p-8 flex flex-col h-full transition-transform duration-300 hover:-translate-y-1"
      style={{
        background: dark ? "#121212" : "#f5f5f7",
        border: dark ? "1px solid #121212" : "1px solid #dddddd",
        color: ink,
        boxShadow: dark ? "0 24px 60px rgba(0,0,0,0.25)" : "none",
      }}
    >
      {/* Top line for highlight */}
      {dark && (
        <div
          className="absolute top-0 inset-x-8 h-px rounded-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, #c8ef4a, transparent)",
          }}
        />
      )}

      {/* Badge */}
      {pack.badge && (
        <div className="mb-5">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] tracking-[0.15em] uppercase text-[#111111]"
            style={{
              background: "#c8ef4a",
              fontFamily: "var(--font-dm-mono)",
            }}
          >
            ★ {pack.badge}
          </span>
        </div>
      )}
      {!pack.badge && <div className="mb-5 h-7" />}

      {/* Pack name */}
      <h3
        className="text-xl mb-1"
        style={{ fontFamily: "var(--font-playfair)", color: ink }}
      >
        {pack.name}
      </h3>
      <p
        className="text-sm mb-8"
        style={{ fontFamily: "var(--font-inter)", color: soft }}
      >
        {pack.tagline}
      </p>

      {/* Quantity */}
      <div className="mb-8">
        <div className="flex items-end gap-2">
          <span
            className="text-6xl font-semibold leading-none"
            style={{
              fontFamily: "var(--font-playfair)",
              color: dark ? "#c8ef4a" : "#111111",
            }}
          >
            {pack.quantity}
          </span>
          <span
            className="text-sm pb-2"
            style={{ fontFamily: "var(--font-inter)", color: soft }}
          >
            {pack.unit}
          </span>
        </div>
        <div
          className="mt-4 flex items-baseline gap-1"
          style={{ borderTop: `1px solid ${rule}`, paddingTop: 16 }}
        >
          <span
            className="text-3xl font-semibold"
            style={{ fontFamily: "var(--font-playfair)", color: ink }}
          >
            {pack.price}€
          </span>
          <span
            className="text-xs ml-1"
            style={{
              fontFamily: "var(--font-inter)",
              color: dark ? "#a1a1a6" : "#777777",
            }}
          >
            par mois
          </span>
        </div>
      </div>

      {/* Features */}
      <ul className="space-y-3 mb-10 flex-1">
        {pack.features.map((f) => (
          <li key={f} className="flex items-start gap-3">
            <span
              className="mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 text-[9px]"
              style={{
                background: dark
                  ? "rgba(200,239,74,0.15)"
                  : "rgba(94,119,32,0.12)",
                color: dark ? "#c8ef4a" : "#5e7720",
                border: dark
                  ? "1px solid rgba(200,239,74,0.3)"
                  : "1px solid rgba(94,119,32,0.3)",
              }}
            >
              ✓
            </span>
            <span
              className="text-sm leading-snug"
              style={{ fontFamily: "var(--font-inter)", color: body }}
            >
              {f}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href={pack.href}
        className="block w-full text-center py-4 rounded-2xl text-sm font-bold tracking-wide transition-all duration-300"
        style={
          dark
            ? {
                background: "#c8ef4a",
                color: "#111111",
                boxShadow: "0 8px 32px rgba(200,239,74,0.25)",
                fontFamily: "var(--font-inter)",
              }
            : {
                border: "1px solid #111111",
                color: "#111111",
                background: "transparent",
                fontFamily: "var(--font-inter)",
              }
        }
        onMouseEnter={(e) => {
          if (!dark) {
            e.currentTarget.style.background = "rgba(17,17,17,0.06)"
          } else {
            e.currentTarget.style.boxShadow = "0 12px 40px rgba(200,239,74,0.4)"
          }
        }}
        onMouseLeave={(e) => {
          if (!dark) {
            e.currentTarget.style.background = "transparent"
          } else {
            e.currentTarget.style.boxShadow = "0 8px 32px rgba(200,239,74,0.25)"
          }
        }}
      >
        {pack.cta} →
      </a>
    </div>
  )
}
