import type { Metadata } from "next"
import { Inter, Playfair_Display, DM_Mono } from "next/font/google"
import "./globals.css"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
})

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400"],
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
    <html lang="fr" className={`${inter.variable} ${playfair.variable} ${dmMono.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-black text-[#f5f5f7] font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
