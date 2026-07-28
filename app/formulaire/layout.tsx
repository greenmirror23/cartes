import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Personnalisez votre carte | GreenMirror",
  description:
    "Renseignez les informations de votre commerce pour recevoir votre carte de fidélité numérique personnalisée.",
  // Page destinée aux clients arrivant après paiement : inutile de l'indexer.
  robots: { index: false, follow: false },
}

export default function FormulaireLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
