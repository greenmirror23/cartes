"use client"
import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"

const CONTACT = "greenmirror23@gmail.com"
const OPTION_PRICE = 29
type Mode = "once" | "monthly"

// Liens de paiement Stripe. Clé : "<pack>-<mode>-<option>" (option = notifications).
// Si un lien manque, le bouton ouvre un mail pré-rempli à CONTACT.
const STRIPE: Record<string, string> = {
  "Small-once-no": "https://buy.stripe.com/4gM4gygYT37s7SOdem7g405",
  "Small-once-opt": "https://buy.stripe.com/7sYaEWfUP8rM4GCeiq7g406",
  "Small-monthly-opt": "https://buy.stripe.com/3cI9ASfUPfUegpk3DM7g407",
  "Medium-once-no": "https://buy.stripe.com/aFa5kCfUP6jE1uq0rA7g408",
  "Medium-once-opt": "https://buy.stripe.com/eVq8wO4c7gYib507U27g409",
  "Medium-monthly-opt": "https://buy.stripe.com/cNiaEW5gb6jE2yu1vE7g40a",
  "Large-once-opt": "https://buy.stripe.com/00wcN49wr7nI8WScai7g40b",
  "Large-monthly-opt": "https://buy.stripe.com/14A00i8sn0Zkc942zI7g403",
}

const PACKS = [
  {
    name: "Small",
    tagline: "Idéal pour démarrer",
    quantity: "200",
    unit: "cartes numériques",
    price: "50",
    withOption: "79",
    badge: null,
    features: [
      "200 cartes numériques personnalisées",
      "Compatible Apple Wallet & Google Wallet",
      "QR code intégré et scannable",
      "Design aux couleurs de votre marque",
      "Notifications automatiques et géolocalisées",
      "Application commerçant : scan des cartes, suivi des passages, fichier clients",
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
    withOption: "124",
    badge: null,
    features: [
      "500 cartes numériques personnalisées",
      "Compatible Apple Wallet & Google Wallet",
      "QR code intégré et scannable",
      "Design aux couleurs de votre marque",
      "Notifications automatiques et géolocalisées",
      "Application commerçant : scan des cartes, suivi des passages, fichier clients",
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
    withOption: null,
    badge: null,
    features: [
      "1000 cartes numériques personnalisées",
      "Compatible Apple Wallet & Google Wallet",
      "QR code intégré et scannable",
      "Design premium sur mesure",
      "Notifications automatiques et géolocalisées",
      "Notifications personnalisées illimitées incluses",
      "Application commerçant : scan des cartes, suivi des passages, fichier clients",
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
  const [mode, setMode] = useState<Mode>("once")

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
            image. Payez en une fois pour l&apos;année, ou en 12 mensualités.
          </p>
        </motion.div>

        {/* Mode de paiement */}
        <div className="flex justify-center mb-10">
          <div
            role="group"
            aria-label="Mode de paiement"
            className="inline-flex rounded-2xl p-1"
            style={{ border: "1px solid #dddddd", background: "#ffffff" }}
          >
            {(
              [
                ["once", "Paiement en une fois"],
                ["monthly", "Paiement en plusieurs fois"],
              ] as [Mode, string][]
            ).map(([m, label]) => (
              <button
                key={m}
                type="button"
                aria-pressed={mode === m}
                onClick={() => setMode(m)}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
                style={{
                  fontFamily: "var(--font-inter)",
                  background: mode === m ? "#111111" : "transparent",
                  color: mode === m ? "#f5f5f7" : "#111111",
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {PACKS.map((pack, i) => (
            <motion.div
              key={pack.name}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15 + i * 0.15 }}
            >
              <PackCard pack={pack} mode={mode} />
            </motion.div>
          ))}
        </div>

        {/* Option notifications personnalisées */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-6xl mx-auto mt-6 rounded-3xl p-8 md:p-10 grid gap-8 md:grid-cols-[1fr_auto] md:items-center"
          style={{ border: "1px solid #dddddd", background: "#ffffff" }}
        >
          <div>
            <span
              className="inline-block text-[#5e7720] text-[10px] tracking-[0.15em] uppercase mb-4"
              style={{ fontFamily: "var(--font-dm-mono)" }}
            >
              Option
            </span>
            <h3
              className="text-2xl lg:text-3xl text-[#111111] mb-3"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Notifications personnalisées
            </h3>
            <p
              className="text-[#111111]/70 text-sm leading-relaxed max-w-xl mb-5"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Un événement, une offre du jour, un créneau libre : vous écrivez
              le message, vous choisissez le jour et l&apos;heure, il apparaît
              sur l&apos;écran verrouillé de vos clients. Tout se gère depuis
              votre application commerçant, sans nous appeler.
            </p>
            <ul
              className="grid gap-2 text-sm text-[#111111]/75"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <li>Aucun quota de campagnes (dans la limite des règles Apple et Google Wallet)</li>
              <li>
                À tous vos clients, ou seulement à ceux que vous sélectionnez
              </li>
              <li>
                Incluse dans le pack Large, ajoutable aux autres à tout moment
              </li>
            </ul>
          </div>
          <div className="md:text-right">
            <div className="flex items-baseline gap-1 md:justify-end">
              <span
                className="text-4xl font-semibold text-[#111111]"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                +29€
              </span>
              <span
                className="text-xs text-[#777777]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                par mois
              </span>
            </div>
            <p
              className="text-xs text-[#777777] mt-2"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              S&apos;ajoute au prix du pack
              <br />
              Cochez-la sous le pack de votre choix
            </p>
          </div>
        </motion.div>

        {/* Trust line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-center text-[#777777] text-xs mt-14 tracking-wide"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Paiement sécurisé · Satisfait ou remboursé 14 jours · Support inclus
          <br />
          TVA non applicable, art. 293 B du CGI
        </motion.p>
      </div>

      {/* Contact anchor */}
      <div id="contact" className="absolute bottom-0" />
    </section>
  )
}

function PackCard({ pack, mode }: { pack: (typeof PACKS)[0]; mode: Mode }) {
  const included = pack.withOption === null
  const [opt, setOpt] = useState(false)
  const withOpt = included || opt
  const monthly = Number(pack.price) + (opt && !included ? OPTION_PRICE : 0)
  const total = monthly * 12
  // Les liens Stripe existants sont des abonnements mensuels du pack seul.
  // Les autres combinaisons utilisent STRIPE ci-dessus, sinon un mail.
  const key = `${pack.name}-${mode}-${withOpt ? "opt" : "no"}`
  const stripeHref =
    mode === "monthly" && !withOpt ? pack.href : STRIPE[key] || ""
  const subject = encodeURIComponent(
    `Commande Pack ${pack.name} - ${
      mode === "once" ? `paiement en une fois (${total} €)` : `12 mensualités de ${monthly} €`
    }${withOpt ? " - avec notifications personnalisées" : ""}`
  )
  const href = stripeHref || `mailto:${CONTACT}?subject=${subject}`
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
            {mode === "once" ? total : monthly}€
          </span>
          <span
            className="text-xs ml-1"
            style={{
              fontFamily: "var(--font-inter)",
              color: dark ? "#a1a1a6" : "#777777",
            }}
          >
            {mode === "once" ? "en une fois, pour 12 mois" : "par mois, pendant 12 mois"}
          </span>
        </div>
        <p
          className="mt-2 text-xs leading-snug min-h-[2.6em]"
          style={{
            fontFamily: "var(--font-inter)",
            color: dark ? "#a1a1a6" : "#777777",
          }}
        >
          {mode === "once"
            ? `Soit ${monthly} € par mois sur 12 mois`
            : `Soit ${total} € sur 12 mois`}
          {withOpt ? ", notifications personnalisées comprises" : ""}
        </p>
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

      {/* Option notifications personnalisées */}
      <label
        className="flex items-start gap-3 mb-6 rounded-2xl p-4 text-sm leading-snug"
        style={{
          fontFamily: "var(--font-inter)",
          border: `1px solid ${rule}`,
          color: body,
          cursor: included ? "default" : "pointer",
        }}
      >
        <input
          type="checkbox"
          checked={withOpt}
          disabled={included}
          onChange={(e) => setOpt(e.target.checked)}
          className="mt-0.5 h-4 w-4 flex-shrink-0"
          style={{ accentColor: dark ? "#c8ef4a" : "#5e7720" }}
        />
        <span>
          <b style={{ color: ink }}>Notifications personnalisées illimitées</b>
          <br />
          {included
            ? "Incluses dans le pack Large, sans supplément"
            : `+${OPTION_PRICE} € par mois, ajoutés au prix du pack`}
        </span>
      </label>

      {/* CTA */}
      <a
        href={href}
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
