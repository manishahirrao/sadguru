import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import MapEmbed from "@/components/MapEmbed";
import {
  SHOP_NAME,
  SHOP_ADDRESS,
  SHOP_PHONE,
  SHOP_WHATSAPP_NUMBER,
  SHOP_INSTAGRAM,
  SHOP_FACEBOOK,
  SHOP_HOURS,
} from "@/config/site-config";
import { buildGreetingLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${SHOP_NAME}. Call, WhatsApp, or find us at ${SHOP_ADDRESS}.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const waLink = buildGreetingLink();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <ScrollReveal>
        <h1 className="font-display text-4xl font-bold text-[#241712]">Contact Us</h1>
        <div className="mt-2 h-0.5 w-16 bg-[#D9A441]" aria-hidden="true" />
      </ScrollReveal>

      <ScrollReveal>
        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          {/* Contact details */}
          <div className="space-y-6">
            <div>
              <h2 className="font-semibold text-[#241712]">Address</h2>
              <address className="mt-1 not-italic text-sm text-[#241712]/70">
                {SHOP_ADDRESS}
              </address>
            </div>

            <div>
              <h2 className="font-semibold text-[#241712]">Phone</h2>
              <a
                href={`tel:${SHOP_PHONE.replace(/\s/g, "")}`}
                className="mt-1 block text-sm font-medium text-[#C15B2C] hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C15B2C]"
              >
                {SHOP_PHONE}
              </a>
            </div>

            <div>
              <h2 className="font-semibold text-[#241712]">WhatsApp Order</h2>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-2 text-sm font-medium text-[#25D366] hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#25D366]"
              >
                <span>Chat on WhatsApp →</span>
              </a>
            </div>

            <div>
              <h2 className="font-semibold text-[#241712]">Hours</h2>
              <ul className="mt-2 space-y-1">
                {SHOP_HOURS.map((h) => (
                  <li key={h.day} className="flex justify-between text-sm">
                    <span className="text-[#241712]/70">{h.day}</span>
                    <span className="font-medium text-[#C15B2C]">
                      {h.open} – {h.close}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social links */}
            {(SHOP_INSTAGRAM || SHOP_FACEBOOK) && (
              <div>
                <h2 className="font-semibold text-[#241712]">Follow Us</h2>
                <div className="mt-2 flex gap-4">
                  {SHOP_INSTAGRAM && (
                    <a
                      href={SHOP_INSTAGRAM}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[#241712]/70 hover:text-[#C15B2C] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C15B2C]"
                    >
                      Instagram
                    </a>
                  )}
                  {SHOP_FACEBOOK && (
                    <a
                      href={SHOP_FACEBOOK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[#241712]/70 hover:text-[#C15B2C] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C15B2C]"
                    >
                      Facebook
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Map */}
          <MapEmbed className="h-64 sm:h-auto" />
        </div>
      </ScrollReveal>
    </div>
  );
}
