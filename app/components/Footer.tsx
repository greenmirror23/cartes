export default function Footer() {
  return (
    <footer
      className="relative py-16 px-6"
      style={{ borderTop: "1px solid rgba(248,246,240,0.06)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div
              className="text-[#F8F6F0] text-base font-semibold mb-1"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              GreenMirror
            </div>
            <div
              className="text-[#C9A844] text-[8px] tracking-[0.2em] uppercase mb-4"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              L&apos;IA au service de votre entreprise
            </div>
            <p
              className="text-[#F8F6F0]/30 text-xs leading-relaxed max-w-xs"
              style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
            >
              Digitaliser la fidélité de vos clients n&apos;a jamais été aussi
              simple et premium.
            </p>
          </div>

          {/* Links */}
          <div>
            <div
              className="text-[#F8F6F0]/50 text-[9px] tracking-[0.25em] uppercase mb-5"
              style={{ fontFamily: "var(--font-inter)" }}
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
                    className="text-[#F8F6F0]/40 hover:text-[#C9A844] text-sm transition-colors duration-200"
                    style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
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
              className="text-[#F8F6F0]/50 text-[9px] tracking-[0.25em] uppercase mb-5"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Contact
            </div>
            <a
              href="mailto:contact@greenmirror.fr"
              className="text-[#C9A844] text-sm hover:text-[#F0D060] transition-colors duration-200"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              contact@greenmirror.fr
            </a>
            <p
              className="text-[#F8F6F0]/30 text-xs mt-4 leading-relaxed"
              style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
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
          style={{ borderTop: "1px solid rgba(248,246,240,0.06)" }}
        >
          <p
            className="text-[#F8F6F0]/20 text-xs"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            © 2025 GreenMirror. Tous droits réservés.
          </p>
          <p
            className="text-[#F8F6F0]/15 text-xs"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Mentions légales · Politique de confidentialité
          </p>
        </div>
      </div>
    </footer>
  )
}
