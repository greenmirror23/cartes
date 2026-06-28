import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
})

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
})

export const metadata: Metadata = {
  title: "Cartes de Fidélité Numériques | GreenMirror",
  description:
    "Offrez à vos clients une expérience de fidélité premium avec les cartes numériques GreenMirror — directement dans leur Apple Wallet.",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[#050508] text-[#F8F6F0] antialiased">
        {children}
      </body>
    </html>
  )
}
