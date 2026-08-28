import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import MapEmbed from "@/components/MapEmbed";
import {
  SHOP_NAME,
  SHOP_ADDRESS,
  SHOP_PHONE,
  SHOP_HOURS,
  SHOP_TAGLINE,
} from "@/config/site-config";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${SHOP_NAME} — ${SHOP_TAGLINE} Serving Pune with fresh chai and nasta.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      {/* Story */}
      <ScrollReveal>
        <section>
          <h1 className="font-display text-4xl font-bold text-[#241712]">{SHOP_NAME}</h1>
          <div className="mt-2 h-0.5 w-16 bg-[#D9A441]" aria-hidden="true" />
          <p className="mt-6 text-lg leading-relaxed text-[#241712]/70">
            We&apos;re a neighbourhood chai and nasta centre in the heart of Pune. Everything
            we make comes from the same recipe we&apos;ve always used — honest, fresh, and made
            with care. There&apos;s no shortcut to good poha or a proper misal, and we never take
            one.
          </p>
          <p className="mt-4 leading-relaxed text-[#241712]/70">
            Our customers are our neighbours, and we treat every order that way. You can walk
            in or WhatsApp us — we&apos;re here to make it easy.
          </p>
        </section>
      </ScrollReveal>

      {/* Hours + Contact */}
      <ScrollReveal>
        <section className="grid gap-8 sm:grid-cols-2">
          <div>
            <h2 className="font-display text-xl font-semibold text-[#241712]">Hours</h2>
            <ul className="mt-4 space-y-2">
              <li className="flex justify-between text-sm">
                <span className="text-[#241712]/70">🏪 In-store</span>
                <span className="font-medium text-[#C15B2C]">Open 24 hours</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-[#241712]/70">🛵 Online Delivery</span>
                <span className="font-medium text-[#C15B2C]">10:00 PM – 4:00 AM</span>
              </li>
            </ul>
            <p className="mt-3 rounded-md bg-[#C15B2C]/10 px-3 py-2 text-xs text-[#C15B2C]">
              Outside delivery hours? Visit us in-store — we&apos;re always open!
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold text-[#241712]">Contact</h2>
            <address className="mt-4 not-italic text-sm text-[#241712]/70">
              <p>{SHOP_ADDRESS}</p>
              <a
                href={`tel:${SHOP_PHONE.replace(/\s/g, "")}`}
                className="mt-2 block font-medium text-[#C15B2C] hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C15B2C]"
              >
                {SHOP_PHONE}
              </a>
            </address>
          </div>
        </section>
      </ScrollReveal>

      {/* Map */}
      <ScrollReveal className="mt-10">
        <h2 className="font-display text-xl font-semibold text-[#241712]">Find Us</h2>
        <MapEmbed className="mt-4" />
      </ScrollReveal>
    </div>
  );
}
