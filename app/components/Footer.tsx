export default function Footer() {
  return (
    <footer
      className="relative py-16 px-6"
      style={{ background: "#121b10" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div
              className="text-[#f5f5f7] text-base font-semibold mb-1"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              GreenMirror
            </div>
            <div
              className="text-[#c8ef4a] text-[9px] tracking-[0.15em] uppercase mb-4"
              style={{ fontFamily: "var(--font-dm-mono)" }}
            >
              L&apos;IA au service de votre entreprise
            </div>
            <p
              className="text-[#a1a1a6] text-xs leading-relaxed max-w-xs"
              style={{ fontFamily: "var(--font-inter)", fontWeight: 400 }}
            >
              Digitaliser la fidélité de vos clients n&apos;a jamais été aussi
              simple et premium.
            </p>
          </div>

          {/* Links */}
          <div>
            <div
              className="text-[#a1a1a6] text-[9px] tracking-[0.15em] uppercase mb-5"
              style={{ fontFamily: "var(--font-dm-mono)" }}
            >
              Navigation
            </div>
            <ul className="space-y-3">
              {[
                { label: "Comment ça marche", href: "#wallet" },
                { label: "Nos packs", href: "#products" },
                { label: "Contact", href: "#contact" },
                { label: "Site principal", href: "https://greenmirror.fr" },
              ].map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-[#a1a1a6] hover:text-[#c8ef4a] text-sm transition-colors duration-200"
                    style={{ fontFamily: "var(--font-inter)", fontWeight: 400 }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div id="contact-info">
            <div
              className="text-[#a1a1a6] text-[9px] tracking-[0.15em] uppercase mb-5"
              style={{ fontFamily: "var(--font-dm-mono)" }}
            >
              Contact
            </div>
            <a
              href="mailto:contact@greenmirror.fr"
              className="text-[#c8ef4a] text-sm hover:text-[#dcf58a] transition-colors duration-200"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              contact@greenmirror.fr
            </a>
            <p
              className="text-[#a1a1a6] text-xs mt-4 leading-relaxed"
              style={{ fontFamily: "var(--font-inter)", fontWeight: 400 }}
            >
              Réponse garantie sous 24h.
              <br />
              Devis personnalisé sur demande.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8"
          style={{ borderTop: "1px solid rgba(245,245,247,0.06)" }}
        >
          <p
            className="text-[#777777] text-xs"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            © 2025 GreenMirror. Tous droits réservés.
          </p>
          <p
            className="text-[#777777] text-xs"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Mentions légales · Politique de confidentialité
          </p>
        </div>
      </div>
    </footer>
  )
}
