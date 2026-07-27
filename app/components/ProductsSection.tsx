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
    href: "#contact",
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
    href: "#contact",
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
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[#050508]">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(201,168,68,0.04) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(201,168,68,0.25), transparent)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span
            className="inline-block text-[#C9A844] text-[10px] tracking-[0.35em] uppercase mb-5"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Tarifs
          </span>
          <h2
            className="text-4xl lg:text-5xl text-[#F8F6F0] mb-5"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Choisissez votre pack
          </h2>
          <p
            className="text-[#F8F6F0]/45 text-base max-w-md mx-auto leading-relaxed"
            style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
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
          className="text-center text-[#F8F6F0]/28 text-xs mt-14 tracking-wide"
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
  const isHighlight = pack.highlight

  return (
    <div
      className="relative rounded-3xl p-8 flex flex-col h-full transition-transform duration-300 hover:-translate-y-1"
      style={{
        background: isHighlight
          ? "linear-gradient(160deg, #0e0e18 0%, #131322 50%, #0e0e18 100%)"
          : "linear-gradient(160deg, #0a0a12 0%, #0e0e16 100%)",
        border: isHighlight
          ? "1px solid rgba(201,168,68,0.55)"
          : "1px solid rgba(248,246,240,0.08)",
        boxShadow: isHighlight
          ? "0 0 0 1px rgba(201,168,68,0.1), 0 32px 80px rgba(0,0,0,0.6), 0 0 80px rgba(201,168,68,0.06)"
          : "0 16px 48px rgba(0,0,0,0.5)",
      }}
    >
      {/* Top shimmer line for highlight */}
      {isHighlight && (
        <div
          className="absolute top-0 inset-x-8 h-px rounded-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, #C9A844, #F0D060, #C9A844, transparent)",
          }}
        />
      )}

      {/* Badge */}
      {pack.badge && (
        <div className="mb-5">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] tracking-[0.2em] uppercase text-[#050508] font-semibold"
            style={{
              background: "linear-gradient(90deg, #c9a844, #f0d060)",
              fontFamily: "var(--font-inter)",
            }}
          >
            ★ {pack.badge}
          </span>
        </div>
      )}
      {!pack.badge && <div className="mb-5 h-7" />}

      {/* Pack name */}
      <h3
        className="text-xl text-[#F8F6F0] mb-1"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        {pack.name}
      </h3>
      <p
        className="text-[#F8F6F0]/40 text-sm mb-8"
        style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
      >
        {pack.tagline}
      </p>

      {/* Quantity */}
      <div className="mb-8">
        <div className="flex items-end gap-2">
          <span
            className="text-6xl font-bold leading-none"
            style={{
              fontFamily: "var(--font-playfair)",
              color: isHighlight ? "#C9A844" : "#F8F6F0",
            }}
          >
            {pack.quantity}
          </span>
          <span
            className="text-[#F8F6F0]/40 text-sm pb-2"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {pack.unit}
          </span>
        </div>
        <div
          className="mt-4 flex items-baseline gap-1"
          style={{ borderTop: "1px solid rgba(248,246,240,0.07)", paddingTop: 16 }}
        >
          <span
            className="text-3xl font-semibold text-[#F8F6F0]"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {pack.price}€
          </span>
          <span
            className="text-[#F8F6F0]/35 text-xs ml-1"
            style={{ fontFamily: "var(--font-inter)" }}
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
                background: isHighlight
                  ? "rgba(201,168,68,0.15)"
                  : "rgba(29,185,84,0.15)",
                color: isHighlight ? "#C9A844" : "#22c55e",
                border: isHighlight
                  ? "1px solid rgba(201,168,68,0.3)"
                  : "1px solid rgba(34,197,94,0.3)",
              }}
            >
              ✓
            </span>
            <span
              className="text-[#F8F6F0]/60 text-sm leading-snug"
              style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
            >
              {f}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href={pack.href}
        className="block w-full text-center py-4 rounded-2xl text-sm font-semibold tracking-wide transition-all duration-300"
        style={
          isHighlight
            ? {
                background: "linear-gradient(135deg, #c9a844, #d4af37)",
                color: "#050508",
                boxShadow: "0 8px 32px rgba(201,168,68,0.28)",
                fontFamily: "var(--font-inter)",
              }
            : {
                border: "1px solid rgba(201,168,68,0.4)",
                color: "#C9A844",
                background: "transparent",
                fontFamily: "var(--font-inter)",
              }
        }
        onMouseEnter={(e) => {
          if (!isHighlight) {
            e.currentTarget.style.background = "rgba(201,168,68,0.08)"
          } else {
            e.currentTarget.style.boxShadow = "0 12px 40px rgba(201,168,68,0.4)"
          }
        }}
        onMouseLeave={(e) => {
          if (!isHighlight) {
            e.currentTarget.style.background = "transparent"
          } else {
            e.currentTarget.style.boxShadow = "0 8px 32px rgba(201,168,68,0.28)"
          }
        }}
      >
        {pack.cta} →
      </a>
    </div>
  )
}
