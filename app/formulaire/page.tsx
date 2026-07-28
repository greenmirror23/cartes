"use client"

import { useRef, useState } from "react"
import Image from "next/image"

const TYPES_COMMERCE = ["Salon", "Restaurant", "Magasin", "Autre"]
const TYPES_CARTE = ["Carte à points", "Carte à réduction", "Autre"]

const LOGO_MAX_MO = 4
const COULEUR_PAR_DEFAUT = "#0B0B12"

const styleChamp: React.CSSProperties = {
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(248,246,240,0.12)",
  color: "#F8F6F0",
  fontFamily: "var(--font-inter)",
}

function normaliserSite(valeur: string) {
  const v = valeur.trim()
  if (!v) return ""
  return /^https?:\/\//i.test(v) ? v : `https://${v}`
}

export default function FormulairePage() {
  const [nomCommerce, setNomCommerce] = useState("")
  const [typeCommerce, setTypeCommerce] = useState("")
  const [typeCarte, setTypeCarte] = useState("")
  const [logo, setLogo] = useState<File | null>(null)
  const [sansLogo, setSansLogo] = useState(false)
  const [siteWeb, setSiteWeb] = useState("")
  const [email, setEmail] = useState("")
  const [couleurFond, setCouleurFond] = useState<string | null>(null)

  const [etat, setEtat] = useState<"repos" | "envoi" | "succes" | "erreur">(
    "repos"
  )
  const [erreur, setErreur] = useState("")
  const champFichier = useRef<HTMLInputElement>(null)

  function choisirLogo(fichier: File | null) {
    setErreur("")
    if (!fichier) {
      setLogo(null)
      return
    }
    if (!fichier.type.startsWith("image/")) {
      setErreur("Le logo doit être une image (PNG, JPG ou SVG).")
      if (champFichier.current) champFichier.current.value = ""
      return
    }
    if (fichier.size > LOGO_MAX_MO * 1024 * 1024) {
      setErreur(`Le logo ne doit pas dépasser ${LOGO_MAX_MO} Mo.`)
      if (champFichier.current) champFichier.current.value = ""
      return
    }
    setLogo(fichier)
  }

  function basculerSansLogo(coche: boolean) {
    setSansLogo(coche)
    if (coche) {
      setLogo(null)
      if (champFichier.current) champFichier.current.value = ""
    }
  }

  async function envoyer(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErreur("")
    setEtat("envoi")

    const donnees = new FormData()
    donnees.append("nom_commerce", nomCommerce.trim())
    donnees.append("type_commerce", typeCommerce)
    donnees.append("type_carte", typeCarte)
    donnees.append("site_web", normaliserSite(siteWeb))
    donnees.append("email", email.trim())
    donnees.append("couleur_fond", couleurFond ?? "")
    donnees.append("sans_logo", sansLogo ? "oui" : "non")
    if (logo && !sansLogo) donnees.append("logo", logo, logo.name)

    try {
      const reponse = await fetch("/api/creer-carte", {
        method: "POST",
        body: donnees,
      })
      const resultat = await reponse.json().catch(() => null)

      if (!reponse.ok || !resultat?.ok) {
        setErreur(
          resultat?.message ??
            "L'envoi a échoué. Vérifiez votre connexion et réessayez."
        )
        setEtat("erreur")
        return
      }
      setEtat("succes")
    } catch {
      setErreur("L'envoi a échoué. Vérifiez votre connexion et réessayez.")
      setEtat("erreur")
    }
  }

  return (
    <main className="relative min-h-screen">
      {/* Fond */}
      <div className="fixed inset-0 -z-10 bg-[#050508]">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(201,168,68,0.06) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 20% 80%, rgba(29,185,84,0.05) 0%, transparent 65%)",
          }}
        />
      </div>

      <div className="max-w-2xl mx-auto px-6 py-16 sm:py-20">
        {/* En-tête */}
        <a href="/" className="inline-flex items-center gap-3 mb-12">
          <Image
            src="/greenmirror-emblem.png"
            alt="GreenMirror"
            width={40}
            height={51}
            priority
            className="h-10 w-auto drop-shadow-[0_2px_8px_rgba(201,168,68,0.25)]"
          />
          <span
            className="text-white text-[16px] font-semibold tracking-wide"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            GreenMirror
          </span>
        </a>

        {etat === "succes" ? (
          <Succes />
        ) : (
          <>
            <span
              className="inline-block text-[#C9A844] text-[10px] tracking-[0.35em] uppercase mb-5"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Étape finale
            </span>
            <h1
              className="text-3xl sm:text-4xl text-[#F8F6F0] mb-4 leading-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Personnalisez <span className="gold-shimmer italic">votre carte</span>
            </h1>
            <p
              className="text-[#F8F6F0]/45 text-sm leading-relaxed mb-12 max-w-lg"
              style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
            >
              Merci pour votre commande. Quelques informations suffisent pour
              créer votre carte de fidélité aux couleurs de votre établissement.
            </p>

            <form
              onSubmit={envoyer}
              className="rounded-3xl p-7 sm:p-9 space-y-7"
              style={{
                background:
                  "linear-gradient(160deg, #0a0a12 0%, #0e0e16 100%)",
                border: "1px solid rgba(248,246,240,0.08)",
                boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
              }}
            >
              <Champ label="Nom du commerce" obligatoire>
                <input
                  type="text"
                  required
                  value={nomCommerce}
                  onChange={(e) => setNomCommerce(e.target.value)}
                  placeholder="Le Rostand"
                  className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-colors duration-200"
                  style={styleChamp}
                  onFocus={(e) =>
                    (e.currentTarget.style.borderColor = "rgba(201,168,68,0.6)")
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.borderColor =
                      "rgba(248,246,240,0.12)")
                  }
                />
              </Champ>

              <Champ label="Type de commerce">
                <Liste
                  valeur={typeCommerce}
                  onChange={setTypeCommerce}
                  options={TYPES_COMMERCE}
                />
              </Champ>

              <Champ label="Type de carte souhaitée">
                <Liste
                  valeur={typeCarte}
                  onChange={setTypeCarte}
                  options={TYPES_CARTE}
                />
              </Champ>

              <Champ
                label="Logo"
                aide={`Formats acceptés : PNG, JPG ou SVG. ${LOGO_MAX_MO} Mo maximum.`}
              >
                <input
                  ref={champFichier}
                  id="logo"
                  type="file"
                  accept="image/*"
                  disabled={sansLogo}
                  onChange={(e) => choisirLogo(e.target.files?.[0] ?? null)}
                  className="sr-only"
                />
                <label
                  htmlFor="logo"
                  className={`flex items-center gap-3 w-full rounded-xl px-4 py-3 text-sm transition-colors duration-200 ${
                    sansLogo ? "cursor-not-allowed opacity-40" : "cursor-pointer"
                  }`}
                  style={styleChamp}
                >
                  <span
                    className="text-[#C9A844] text-base leading-none"
                    aria-hidden="true"
                  >
                    ↑
                  </span>
                  <span
                    className={logo ? "text-[#F8F6F0]" : "text-[#F8F6F0]/35"}
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {logo ? logo.name : "Choisir un fichier"}
                  </span>
                  {logo && (
                    <span
                      role="button"
                      tabIndex={0}
                      onClick={(e) => {
                        e.preventDefault()
                        choisirLogo(null)
                        if (champFichier.current)
                          champFichier.current.value = ""
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault()
                          choisirLogo(null)
                          if (champFichier.current)
                            champFichier.current.value = ""
                        }
                      }}
                      className="ml-auto text-[#F8F6F0]/40 hover:text-[#C9A844] text-xs"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      Retirer
                    </span>
                  )}
                </label>

                <label className="flex items-center gap-3 mt-4 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={sansLogo}
                    onChange={(e) => basculerSansLogo(e.target.checked)}
                    className="sr-only"
                  />
                  <span
                    className="w-[18px] h-[18px] rounded-[5px] flex items-center justify-center flex-shrink-0 transition-all duration-200"
                    style={{
                      background: sansLogo
                        ? "linear-gradient(135deg, #c9a844, #d4af37)"
                        : "rgba(255,255,255,0.03)",
                      border: sansLogo
                        ? "1px solid #c9a844"
                        : "1px solid rgba(248,246,240,0.2)",
                    }}
                  >
                    {sansLogo && (
                      <span className="text-[#050508] text-[11px] leading-none font-bold">
                        ✓
                      </span>
                    )}
                  </span>
                  <span
                    className="text-[#F8F6F0]/55 text-sm group-hover:text-[#F8F6F0]/80 transition-colors"
                    style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
                  >
                    Je n&apos;ai pas de logo
                  </span>
                </label>
              </Champ>

              <Champ
                label="Site web"
                aide="Nous y récupérons votre logo et votre identité visuelle."
              >
                <input
                  type="text"
                  inputMode="url"
                  value={siteWeb}
                  onChange={(e) => setSiteWeb(e.target.value)}
                  placeholder="moncommerce.fr"
                  className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-colors duration-200"
                  style={styleChamp}
                  onFocus={(e) =>
                    (e.currentTarget.style.borderColor = "rgba(201,168,68,0.6)")
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.borderColor =
                      "rgba(248,246,240,0.12)")
                  }
                />
              </Champ>

              <Champ label="Email de contact" obligatoire>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="contact@moncommerce.fr"
                  className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-colors duration-200"
                  style={styleChamp}
                  onFocus={(e) =>
                    (e.currentTarget.style.borderColor = "rgba(201,168,68,0.6)")
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.borderColor =
                      "rgba(248,246,240,0.12)")
                  }
                />
              </Champ>

              <Champ label="Couleur de fond">
                <div className="flex items-center gap-4">
                  <input
                    type="color"
                    aria-label="Couleur de fond de la carte"
                    value={couleurFond ?? COULEUR_PAR_DEFAUT}
                    onChange={(e) => setCouleurFond(e.target.value)}
                    className="w-14 h-11 rounded-xl cursor-pointer bg-transparent p-1"
                    style={{ border: "1px solid rgba(248,246,240,0.12)" }}
                  />
                  <span
                    className="text-sm"
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontWeight: 300,
                      color: couleurFond
                        ? "#F8F6F0"
                        : "rgba(248,246,240,0.35)",
                    }}
                  >
                    {couleurFond ?? "Aucune couleur choisie"}
                  </span>
                  {couleurFond && (
                    <button
                      type="button"
                      onClick={() => setCouleurFond(null)}
                      className="text-[#F8F6F0]/40 hover:text-[#C9A844] text-xs transition-colors"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      Effacer
                    </button>
                  )}
                </div>
              </Champ>

              {erreur && (
                <p
                  className="text-sm rounded-xl px-4 py-3"
                  style={{
                    background: "rgba(220,38,38,0.08)",
                    border: "1px solid rgba(220,38,38,0.3)",
                    color: "#fca5a5",
                    fontFamily: "var(--font-inter)",
                    fontWeight: 300,
                  }}
                >
                  {erreur}
                </p>
              )}

              <button
                type="submit"
                disabled={etat === "envoi"}
                className="w-full py-4 rounded-2xl text-sm font-semibold tracking-wide transition-all duration-300 disabled:opacity-60 disabled:cursor-wait"
                style={{
                  background: "linear-gradient(135deg, #c9a844, #d4af37)",
                  color: "#050508",
                  boxShadow: "0 8px 32px rgba(201,168,68,0.28)",
                  fontFamily: "var(--font-inter)",
                }}
              >
                {etat === "envoi" ? "Envoi en cours…" : "Valider →"}
              </button>

              <p
                className="text-center text-[#F8F6F0]/25 text-xs"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Les champs marqués d&apos;une étoile sont obligatoires.
              </p>
            </form>
          </>
        )}
      </div>
    </main>
  )
}

function Succes() {
  return (
    <div
      className="rounded-3xl p-10 sm:p-12 text-center"
      style={{
        background: "linear-gradient(160deg, #0a0a12 0%, #0e0e16 100%)",
        border: "1px solid rgba(34,197,94,0.3)",
        boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
      }}
    >
      <div
        className="w-16 h-16 rounded-full mx-auto mb-7 flex items-center justify-center"
        style={{
          background:
            "radial-gradient(circle at 35% 30%, #3ddc7a 0%, #1a8f47 70%)",
          boxShadow: "0 6px 24px rgba(34,197,94,0.35)",
        }}
      >
        <span className="text-[#04230f] text-2xl leading-none font-bold">✓</span>
      </div>

      <h1
        className="text-2xl sm:text-3xl text-[#F8F6F0] mb-4"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        C&apos;est enregistré
      </h1>
      <p
        className="text-[#F8F6F0]/55 text-sm leading-relaxed max-w-sm mx-auto"
        style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
      >
        Votre carte est en cours de création, vous la recevrez dans quelques
        secondes.
      </p>

      <a
        href="/"
        className="inline-block mt-9 px-7 py-3 rounded-full text-sm tracking-wide text-[#C9A844] transition-all duration-300"
        style={{
          border: "1px solid rgba(201,168,68,0.45)",
          fontFamily: "var(--font-inter)",
        }}
      >
        Retour à l&apos;accueil
      </a>
    </div>
  )
}

function Champ({
  label,
  obligatoire = false,
  aide,
  children,
}: {
  label: string
  obligatoire?: boolean
  aide?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label
        className="block text-[#F8F6F0]/50 text-[10px] tracking-[0.22em] uppercase mb-3"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        {label}
        {obligatoire && <span className="text-[#C9A844] ml-1">*</span>}
      </label>
      {children}
      {aide && (
        <p
          className="text-[#F8F6F0]/25 text-xs mt-2"
          style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
        >
          {aide}
        </p>
      )}
    </div>
  )
}

function Liste({
  valeur,
  onChange,
  options,
}: {
  valeur: string
  onChange: (v: string) => void
  options: string[]
}) {
  return (
    <div className="relative">
      <select
        value={valeur}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl px-4 py-3 text-sm outline-none appearance-none cursor-pointer transition-colors duration-200"
        style={{
          ...styleChamp,
          color: valeur ? "#F8F6F0" : "rgba(248,246,240,0.35)",
        }}
        onFocus={(e) =>
          (e.currentTarget.style.borderColor = "rgba(201,168,68,0.6)")
        }
        onBlur={(e) =>
          (e.currentTarget.style.borderColor = "rgba(248,246,240,0.12)")
        }
      >
        <option value="" style={{ background: "#0e0e16" }}>
          Sélectionnez…
        </option>
        {options.map((o) => (
          <option key={o} value={o} style={{ background: "#0e0e16" }}>
            {o}
          </option>
        ))}
      </select>
      <span
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#C9A844] text-xs"
        aria-hidden="true"
      >
        ▾
      </span>
    </div>
  )
}
