/* eslint-disable @next/next/no-img-element */
/*
 * Réplique d'un pass Apple Wallet de type « carte de magasin » (storeCard),
 * calquée sur les vraies cartes générées par GreenMirror :
 *   en-tête (logo, nom, statut) → bandeau photo avec compteur → objectif → QR code.
 * Les dimensions sont celles d'un pass réel réduites à la largeur de l'iPhone
 * de démonstration (~218 px), d'où les tailles de police très fines.
 */

const PASS_FONT =
  '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", var(--font-inter), sans-serif'

export type WalletPassProps = {
  background: string
  /** Liseré clair autour des passes sombres, comme dans le Wallet */
  outlined?: boolean
  logo: { src: string; width: number; height: number; rounded?: boolean }
  name?: string
  /** Si absent, seule la valeur du statut est affichée (cas du pass Barber) */
  statusLabel?: string
  statusValue: string
  /** Champ d'en-tête supplémentaire, affiché avant le statut (ex. TAMPONS 2 sur 9) */
  headerField?: { label: string; value: string }
  strip: string
  counter?: { value: string; label: string }
  objective: { label?: string; value: string }
  qr: string
  /** Couleur des petites étiquettes (STATUT, OBJECTIF) */
  labelColor?: string
}

export default function WalletPass({
  background,
  outlined = false,
  logo,
  name,
  statusLabel,
  statusValue,
  headerField,
  strip,
  counter,
  objective,
  qr,
  labelColor = "rgba(255,255,255,0.92)",
}: WalletPassProps) {
  return (
    <div
      className="relative rounded-[11px] overflow-hidden text-white"
      style={{
        height: 304,
        background,
        fontFamily: PASS_FONT,
        boxShadow: [
          outlined ? "inset 0 0 0 1px rgba(255,255,255,0.32)" : "",
          "0 -6px 18px rgba(0,0,0,0.55)",
        ]
          .filter(Boolean)
          .join(", "),
      }}
    >
      {/* En-tête : c'est la seule partie visible quand la carte est empilée */}
      <div className="flex items-center gap-[6px] px-[8px]" style={{ height: 40 }}>
        <img
          src={logo.src}
          alt=""
          width={logo.width}
          height={logo.height}
          className={`flex-shrink-0 object-contain ${logo.rounded ? "rounded-[4px]" : ""}`}
          style={{ width: logo.width, height: logo.height }}
        />
        {name && (
          <span className="flex-1 min-w-0 truncate text-[9.5px] font-medium leading-none">
            {name}
          </span>
        )}
        {headerField && (
          <div className="flex-shrink-0 text-right leading-none mr-[4px]">
            <div
              className="text-[5.5px] font-semibold tracking-[0.04em] uppercase mb-[2px]"
              style={{ color: labelColor }}
            >
              {headerField.label}
            </div>
            <div className="text-[11px] whitespace-nowrap">{headerField.value}</div>
          </div>
        )}
        <div className={`${name ? "" : "ml-auto"} flex-shrink-0 text-right leading-none`}>
          {statusLabel && (
            <div
              className="text-[5.5px] font-semibold tracking-[0.04em] uppercase mb-[2px]"
              style={{ color: labelColor }}
            >
              {statusLabel}
            </div>
          )}
          <div className="text-[11px]">{statusValue}</div>
        </div>
      </div>

      {/* Bandeau photo (strip) + compteur superposé */}
      <div className="relative w-full" style={{ height: 85 }}>
        <img
          src={strip}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        {counter && (
          <div
            className="absolute left-[8px] top-[5px] leading-none"
            style={{ textShadow: "0 1px 3px rgba(0,0,0,0.35)" }}
          >
            <div className="text-[36px] font-light tracking-tight leading-[0.95]">
              {counter.value}
            </div>
            <div className="text-[8.5px] mt-[1px] opacity-95">{counter.label}</div>
          </div>
        )}
      </div>

      {/* Champ « objectif » */}
      <div className="px-[8px]" style={{ paddingTop: objective.label ? 8 : 16 }}>
        {objective.label && (
          <div
            className="text-[5.5px] font-semibold tracking-[0.04em] uppercase mb-[2px]"
            style={{ color: labelColor }}
          >
            {objective.label}
          </div>
        )}
        <div className={objective.label ? "text-[12px]" : "text-[12.5px]"}>
          {objective.value}
        </div>
      </div>

      {/* QR code */}
      <div className="absolute inset-x-0 flex justify-center" style={{ bottom: 12 }}>
        <div className="bg-white rounded-[5px] p-[6px]" style={{ width: 94, height: 94 }}>
          <img src={qr} alt="" className="w-full h-full" style={{ imageRendering: "pixelated" }} />
        </div>
      </div>
    </div>
  )
}

/* Les trois cartes réelles présentées dans l'animation */

export function BarberPass() {
  return (
    <WalletPass
      background="#000"
      outlined
      logo={{ src: "/passes/logo-lion.webp", width: 30, height: 34 }}
      statusValue="Active"
      strip="/passes/strip-barber.webp"
      objective={{ value: "10 coupes ✂️ = 10ème 🎁" }}
      qr="/passes/qr-greenmirror.svg"
    />
  )
}

export function PizzaPass() {
  return (
    <WalletPass
      background="#58391C"
      logo={{ src: "/passes/logo-4saisons.webp", width: 34, height: 33, rounded: true }}
      name="Pizzas 4 Saisons"
      statusLabel="Statut"
      statusValue="Active"
      headerField={{ label: "Tampons", value: "2 sur 9" }}
      strip="/passes/strip-pizza-tampons.webp"
      objective={{ label: "Objectif", value: "9 tampons = 10ème pizza offerte 🎁" }}
      qr="/passes/qr-greenmirror.svg"
      labelColor="rgba(255,255,255,0.85)"
    />
  )
}

export function GreenMirrorPass() {
  return (
    <WalletPass
      background="#000"
      outlined
      logo={{ src: "/greenmirror-emblem.png", width: 26, height: 33 }}
      name="Green Mirror"
      statusLabel="Statut"
      statusValue="Active"
      strip="/passes/strip-gm.webp"
      counter={{ value: "-10%", label: "REMISE" }}
      objective={{ label: "Avantage", value: "Sur toutes les prestations" }}
      qr="/passes/qr-greenmirror.svg"
    />
  )
}
