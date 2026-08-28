import Link from "next/link";
import {
  SHOP_NAME,
  SHOP_ADDRESS,
  SHOP_PHONE,
  SHOP_WHATSAPP_NUMBER,
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
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#F3E7D3]/50">
            Hours
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex items-start justify-between gap-4">
              <span className="text-[#F3E7D3]/70">🏪 In-store</span>
              <span className="text-right font-medium text-[#D9A441]">Open 24 hours</span>
            </div>
            <div className="flex items-start justify-between gap-4">
              <span className="text-[#F3E7D3]/70">🛵 Online Delivery</span>
              <span className="text-right font-medium text-[#D9A441]">10:00 PM – 4:00 AM</span>
            </div>
          </div>
          <p className="mt-3 rounded-md bg-[#D9A441]/10 px-3 py-2 text-xs text-[#D9A441]">
            Outside delivery hours? Visit us in-store — we&apos;re always open!
          </p>
        </div>

        {/* Connect */}
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#F3E7D3]/50">
            Connect
          </p>

          <div className="flex items-center gap-4">
            {/* WhatsApp */}
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366]/15 text-[#25D366] transition-colors hover:bg-[#25D366] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]"
            >
              <WhatsAppIcon />
            </a>

            {/* Instagram */}
            {SHOP_INSTAGRAM && (
              <a
                href={SHOP_INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow on Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E1306C]/15 text-[#E1306C] transition-colors hover:bg-[#E1306C] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E1306C]"
              >
                <InstagramIcon />
              </a>
            )}

            {/* Facebook */}
            {SHOP_FACEBOOK && (
              <a
                href={SHOP_FACEBOOK}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow on Facebook"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1877F2]/15 text-[#1877F2] transition-colors hover:bg-[#1877F2] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1877F2]"
              >
                <FacebookIcon />
              </a>
            )}
          </div>

          <nav className="mt-5 flex gap-4 text-sm" aria-label="Footer navigation">
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
        <span className="ml-4">This site does not store your personal data.</span>
      </div>
    </footer>
  );
}

function WhatsAppIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="22" height="22" fill="currentColor" aria-hidden="true">
      <path d="M16 0C7.163 0 0 7.163 0 16c0 2.824.738 5.47 2.027 7.773L.059 31.54l8.006-2.1A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.286 13.286 0 0 1-6.787-1.855l-.487-.29-5.023 1.316 1.337-4.897-.317-.503A13.27 13.27 0 0 1 2.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.293-9.827c-.4-.2-2.364-1.167-2.73-1.3-.366-.133-.633-.2-.9.2s-1.033 1.3-1.267 1.567c-.233.266-.466.3-.866.1-.4-.2-1.688-.622-3.217-1.984-1.189-1.06-1.99-2.37-2.223-2.77-.233-.4-.025-.616.175-.816.18-.18.4-.466.6-.7.2-.233.266-.4.4-.666.133-.267.067-.5-.033-.7-.1-.2-.9-2.167-1.233-2.967-.325-.78-.655-.674-.9-.686l-.767-.013c-.267 0-.7.1-1.067.5s-1.4 1.367-1.4 3.333 1.433 3.867 1.633 4.133c.2.267 2.82 4.308 6.832 6.04.955.412 1.7.658 2.281.843.958.305 1.831.262 2.52.159.769-.115 2.364-.967 2.697-1.9.333-.934.333-1.734.233-1.9-.1-.167-.366-.267-.766-.467z"/>
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
    </svg>
  );
}
