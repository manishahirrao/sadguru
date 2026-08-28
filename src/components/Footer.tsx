import Link from "next/link";
import {
  SHOP_NAME,
  SHOP_ADDRESS,
  SHOP_PHONE,
  SHOP_WHATSAPP_NUMBER,
  SHOP_HOURS,
  SHOP_INSTAGRAM,
  SHOP_FACEBOOK,
} from "@/config/site-config";
import { buildGreetingLink } from "@/lib/whatsapp";

export default function Footer() {
  const waLink = buildGreetingLink();

  return (
    <footer className="bg-[#241712] text-[#F3E7D3]/70">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-3">
        {/* Brand */}
        <div>
          <p className="font-display text-lg font-bold text-[#F3E7D3]">{SHOP_NAME}</p>
          <p className="mt-2 text-sm leading-relaxed">{SHOP_ADDRESS}</p>
          <a
            href={`tel:${SHOP_PHONE.replace(/\s/g, "")}`}
            className="mt-1 block text-sm text-[#D9A441] hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D9A441]"
          >
            {SHOP_PHONE}
          </a>
        </div>

        {/* Hours */}
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#F3E7D3]/50">
            Hours
          </p>
          {SHOP_HOURS.map((h) => (
            <div key={h.day} className="flex justify-between text-sm">
              <span>{h.day}</span>
              <span className="text-[#D9A441]">
                {h.open} – {h.close}
              </span>
            </div>
          ))}
        </div>

        {/* Links */}
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#F3E7D3]/50">
            Connect
          </p>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-sm text-[#25D366] hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#25D366]"
          >
            WhatsApp Us
          </a>
          {SHOP_INSTAGRAM && (
            <a
              href={SHOP_INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 block text-sm hover:text-[#F3E7D3] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D9A441]"
            >
              Instagram
            </a>
          )}
          {SHOP_FACEBOOK && (
            <a
              href={SHOP_FACEBOOK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 block text-sm hover:text-[#F3E7D3] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D9A441]"
            >
              Facebook
            </a>
          )}
          <nav className="mt-4 flex gap-4 text-sm" aria-label="Footer navigation">
            {[
              { href: "/menu", label: "Menu" },
              { href: "/about", label: "About" },
              { href: "/contact", label: "Contact" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="hover:text-[#F3E7D3] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D9A441]"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#F3E7D3]/10 px-4 py-4 text-center text-xs text-[#F3E7D3]/40">
        © {new Date().getFullYear()} {SHOP_NAME}. All rights reserved.
        <span className="ml-4">
          This site does not store your personal data.
        </span>
      </div>
    </footer>
  );
}
