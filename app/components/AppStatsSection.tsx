"use client"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

// Section « L'application commerçant » (proposition B, mosaïque de tuiles).
// Chiffres et clients FICTIFS, signalés sous la section.

const LIME = "#c8ef4a"
const GREY = "#a1a1a6"

// Tampons par jour : mois en cours (18 jours) et mois précédent (31 jours)
const PREV = [9, 6, 11, 8, 12, 14, 5, 8, 7, 10, 9, 13, 15, 6, 9, 8, 11, 10, 14, 16, 7, 8, 9, 12, 10, 15, 17, 6, 9, 10, 13]
const CUR = [10, 8, 12, 9, 14, 16, 7, 9, 11, 12, 10, 15, 18, 8, 11, 9, 13, 12]

function cumul(a: number[]) {
  let s = 0
  return a.map((v) => (s += v))
}
const P = cumul(PREV)
const C = cumul(CUR)
const X = (k: number) => 20 + (k / 30) * 560
const Y = (v: number) => 200 - (v / 340) * 180
const path = (a: number[]) =>
  a.map((v, k) => `${k ? "L" : "M"}${X(k).toFixed(1)} ${Y(v).toFixed(1)}`).join(" ")
const LAST = C.length - 1
const CUR_PATH = path(C)
const PREV_PATH = path(P)
const AREA_PATH = `${CUR_PATH} L${X(LAST).toFixed(1)} 200 L20 200 Z`

const TOP = [
  { ini: "JM", name: "Julie M.", meta: "14 tampons · 5 passages", first: true },
  { ini: "KB", name: "Karim B.", meta: "11 tampons · 4 passages", first: false },
  { ini: "SL", name: "Sophie L.", meta: "9 tampons · 3 passages", first: false },
]

const KPIS = [
  { v: "12", l: "Tampons aujourd’hui" },
  { v: "204", l: "Tampons ce mois" },
  { v: "11", l: "Récompenses offertes" },
  { v: "86", l: "Clients actifs (30 j)" },
]

const WEEKS = [38, 44, 41, 52, 47, 55, 61, 58]

const FEATURES = [
  {
    t: "Fichier clients",
    d: "Chaque client inscrit via votre QR code, sa fiche, ses passages. Export en un clic pour Excel.",
    tag: "",
  },
  {
    t: "Notifications",
    d: "Votre message, le jour et l’heure de votre choix, à tous ou à une sélection.",
    tag: "Option ou pack Large",
  },
  {
    t: "Votre règle de fidélité",
    d: "Nombre de tampons et récompense, réglés par vous.",
    tag: "",
  },
  {
    t: "Simple et sûre",
    d: "Connexion par code e-mail, sans mot de passe. Données hébergées en Europe, visibles par vous seul.",
    tag: "",
  },
]

const eyebrow = {
  fontFamily: "var(--font-dm-mono)",
  fontSize: 11,
  letterSpacing: "1.5px",
} as const

const tile = "min-w-0 rounded-[26px] p-6 sm:p-8 flex flex-col"

export default function AppStatsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-120px" })

  const appear = (i: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.7, delay: 0.3 + i * 0.08 },
  })

  return (
    <section
      id="application"
      ref={ref}
      className="relative bg-black overflow-hidden py-24 sm:py-32"
      style={{ color: "#f5f5f7", fontFamily: "var(--font-inter)" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* En-tête */}
        <div className="flex flex-col items-center text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="uppercase"
            style={{ ...eyebrow, fontSize: 10, color: LIME }}
          >
            L&apos;application commerçant
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1 }}
            style={{
              fontFamily: "var(--font-playfair)",
              fontWeight: 600,
              fontSize: "clamp(38px, 5.2vw, 68px)",
              lineHeight: 0.95,
              letterSpacing: "max(-6px, -0.06em)",
              margin: "20px 0",
            }}
          >
            Vos clients,{" "}
            <em style={{ color: "#aaaaaa", fontStyle: "italic" }}>en chiffres.</em>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="max-w-2xl text-base sm:text-xl"
            style={{ color: GREY, lineHeight: 1.7 }}
          >
            Chaque passage en caisse alimente votre tableau de bord. Vous savez
            qui revient, quand, et si votre mois fait mieux que le précédent.
          </motion.p>
        </div>

        <div className="mt-14 sm:mt-20 flex flex-col gap-4">
          {/* Ligne 1 : courbe du mois + meilleurs clients */}
          <div className="flex flex-wrap gap-4">
            <motion.article
              {...appear(0)}
              className={`${tile} gap-4`}
              style={{ flex: "2 1 560px", background: "#121b10", border: "1px solid #2b3a14" }}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="uppercase m-0 mb-2" style={{ ...eyebrow, color: LIME }}>
                    Ce mois-ci contre le mois dernier
                  </p>
                  <p className="m-0 text-[15px]" style={{ color: GREY }}>
                    Tampons cumulés jour après jour, comparés au mois précédent à la même date.
                  </p>
                </div>
                <div className="text-right">
                  <b className="block text-[44px] font-semibold leading-none tracking-tight">204</b>
                  <span className="text-[13px]" style={{ color: LIME }}>
                    +19 % sur octobre
                  </span>
                </div>
              </div>
              <svg
                viewBox="0 0 600 220"
                className="w-full h-auto block"
                role="img"
                aria-label="Courbe des tampons cumulés : novembre en avance sur octobre"
              >
                <line x1="20" y1="200" x2="580" y2="200" stroke="#2b3a14" />
                <line x1="20" y1="140" x2="580" y2="140" stroke="#1d2a12" />
                <line x1="20" y1="80" x2="580" y2="80" stroke="#1d2a12" />
                <path d={PREV_PATH} fill="none" stroke={GREY} strokeWidth="2" strokeDasharray="6 6" opacity="0.6" />
                <path d={AREA_PATH} fill={LIME} opacity="0.12" />
                <motion.path
                  d={CUR_PATH}
                  fill="none"
                  stroke={LIME}
                  strokeWidth="3"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={inView ? { pathLength: 1 } : {}}
                  transition={{ duration: 1.6, delay: 0.6, ease: "easeOut" }}
                />
                <circle cx={X(LAST)} cy={Y(C[LAST])} r="6" fill={LIME} stroke="#121b10" strokeWidth="3" />
              </svg>
              <div className="flex flex-wrap gap-5 text-[13px]" style={{ color: GREY }}>
                <span className="inline-flex items-center gap-2">
                  <i className="inline-block w-[18px]" style={{ borderTop: `3px solid ${LIME}` }} />
                  Novembre
                </span>
                <span className="inline-flex items-center gap-2">
                  <i className="inline-block w-[18px]" style={{ borderTop: `2px dashed ${GREY}` }} />
                  Octobre (317 au total)
                </span>
              </div>
            </motion.article>

            <motion.article
              {...appear(1)}
              className={`${tile} gap-5`}
              style={{ flex: "1 1 320px", background: "#0d0d0e", border: "1px solid #1f1f1f" }}
            >
              <p className="uppercase m-0" style={{ ...eyebrow, color: GREY }}>
                Meilleurs clients du mois
              </p>
              {TOP.map((c, i) => (
                <div key={c.name} className="flex items-center gap-4">
                  <span
                    className="flex-none grid place-items-center rounded-full w-[46px] h-[46px] text-[13px]"
                    style={{
                      fontFamily: "var(--font-dm-mono)",
                      background: c.first ? "#1a1409" : "#121b10",
                      border: `1px solid ${c.first ? "#5a4318" : "#2b3a14"}`,
                      color: c.first ? "#ffb454" : LIME,
                    }}
                  >
                    {c.ini}
                  </span>
                  <div className="min-w-0 flex-1">
                    <b className="block text-[17px] font-semibold">{c.name}</b>
                    <span className="text-[13.5px]" style={{ color: GREY }}>
                      {c.meta}
                    </span>
                  </div>
                  <span className="text-[12px]" style={{ fontFamily: "var(--font-dm-mono)", color: "#6e6e73" }}>
                    {i + 1}
                  </span>
                </div>
              ))}
              <p className="mt-auto mb-0 text-[14.5px] leading-normal" style={{ color: GREY }}>
                Repérez vos habitués et remerciez ceux qui reviennent le plus.
              </p>
            </motion.article>
          </div>

          {/* Ligne 2 : en direct, multiplicateur, semaines */}
          <div className="flex flex-wrap gap-4">
            <motion.article
              {...appear(2)}
              className={`${tile} gap-5`}
              style={{ flex: "1 1 300px", background: "#0d0d0e", border: "1px solid #1f1f1f" }}
            >
              <p className="uppercase m-0" style={{ ...eyebrow, color: GREY }}>
                En direct
              </p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-5">
                {KPIS.map((k) => (
                  <div key={k.l}>
                    <b className="block text-[34px] font-semibold leading-tight tracking-tight">{k.v}</b>
                    <span className="text-[13px]" style={{ color: GREY }}>
                      {k.l}
                    </span>
                  </div>
                ))}
              </div>
            </motion.article>

            <motion.article
              {...appear(3)}
              className={`${tile} gap-3`}
              style={{ flex: "1 1 300px", background: LIME, color: "#0b1206" }}
            >
              <p className="uppercase m-0" style={{ ...eyebrow, color: "#2f3d0e" }}>
                Scanner en caisse
              </p>
              <div className="flex items-center gap-3.5" aria-hidden="true">
                <span className="grid place-items-center w-[52px] h-[52px] rounded-full text-[26px]" style={{ border: "2px solid #0b1206" }}>
                  −
                </span>
                <b className="text-[64px] font-bold leading-none tracking-tighter">× 6</b>
                <span className="grid place-items-center w-[52px] h-[52px] rounded-full text-[26px]" style={{ border: "2px solid #0b1206" }}>
                  +
                </span>
              </div>
              <p
                className="m-0"
                style={{ fontFamily: "var(--font-playfair)", fontWeight: 600, fontSize: 26, lineHeight: 1.15, letterSpacing: "-0.02em" }}
              >
                6 pizzas, <em>un seul scan.</em>
              </p>
              <p className="m-0 text-[15px] leading-normal" style={{ color: "#2f3d0e" }}>
                Le téléphone devient lecteur de cartes. Le compteur revient à 1 après chaque client.
              </p>
            </motion.article>

            <motion.article
              {...appear(4)}
              className={`${tile} gap-4`}
              style={{ flex: "1 1 300px", background: "#0d0d0e", border: "1px solid #1f1f1f" }}
            >
              <p className="uppercase m-0" style={{ ...eyebrow, color: GREY }}>
                Tampons par semaine
              </p>
              <div
                className="flex items-end gap-2.5 h-[150px]"
                role="img"
                aria-label="Tampons par semaine sur 8 semaines, en hausse"
              >
                {WEEKS.map((v, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 rounded-t-md rounded-b-sm origin-bottom"
                    style={{ height: `${Math.round((v / 61) * 100)}%`, background: i === WEEKS.length - 1 ? LIME : "#2b3a14" }}
                    initial={{ scaleY: 0 }}
                    animate={inView ? { scaleY: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 + i * 0.06 }}
                  />
                ))}
              </div>
              <p className="m-0 text-[14.5px] leading-normal" style={{ color: GREY }}>
                Huit semaines d&apos;un coup d&apos;œil, et l&apos;historique de chaque passage, filtrable.
              </p>
            </motion.article>
          </div>

          {/* Ligne 3 : les autres fonctions */}
          <div className="flex flex-wrap gap-4">
            {FEATURES.map((f, i) => (
              <motion.article
                key={f.t}
                {...appear(5 + i)}
                className="min-w-0 rounded-[22px] p-6 flex flex-col gap-2.5"
                style={{ flex: "1 1 260px", background: "#0d0d0e", border: "1px solid #1f1f1f" }}
              >
                <h3 className="m-0 text-[17px] font-semibold tracking-tight">{f.t}</h3>
                <p className="m-0 text-[15px] leading-relaxed" style={{ color: GREY }}>
                  {f.d}
                </p>
                {f.tag && (
                  <span
                    className="self-start mt-1 rounded-full px-2.5 py-0.5 text-[10px]"
                    style={{ fontFamily: "var(--font-dm-mono)", letterSpacing: "1px", color: LIME, border: "1px solid #3b4a17" }}
                  >
                    {f.tag}
                  </span>
                )}
              </motion.article>
            ))}
          </div>
        </div>

        <p className="mt-8 mb-0 text-center text-[13px]" style={{ color: "#6e6e73" }}>
          Chiffres et clients fictifs, pour l&apos;exemple.
        </p>
      </div>
    </section>
  )
}
