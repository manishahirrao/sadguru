import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SteamWisp from "@/components/SteamWisp";
import ScrollReveal from "@/components/ScrollReveal";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import MapEmbed from "@/components/MapEmbed";
import { SHOP_NAME, SHOP_TAGLINE, SHOP_HOURS, SHOP_ADDRESS, SHOP_PHONE } from "@/config/site-config";

export const metadata: Metadata = {
  title: `${SHOP_NAME} | Best Chai & Nasta in Pune`,
  description: `${SHOP_TAGLINE} Fresh poha, misal pav, chai & more. Order on WhatsApp — no signup needed. ${SHOP_ADDRESS}`,
  alternates: { canonical: "/" },
};

// Gallery images — replace with real food photos in /public/images/
const galleryImages = [
  { src: "/images/misal-pav.webp", alt: "Misal Pav — spicy lentil curry with pav" },
  { src: "/images/cutting-chai.webp", alt: "Cutting chai — strong sweet tea" },
  { src: "/images/poha.webp", alt: "Poha — flattened rice breakfast" },
  { src: "/images/maggi.webp", alt: "Maggi noodles made to order" },
];

// LocalBusiness JSON-LD structured data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: SHOP_NAME,
  description: SHOP_TAGLINE,
  address: {
    "@type": "PostalAddress",
    streetAddress: SHOP_ADDRESS,
    addressLocality: "Pune",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
  telephone: SHOP_PHONE,
  priceRange: "₹10 – ₹80",
  servesCuisine: ["Indian", "Maharashtrian", "Street Food"],
  openingHours: SHOP_HOURS.map((h) => `${h.day} ${h.open}-${h.close}`),
  hasMenu: "/menu",
};

export default function HomePage() {
  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden bg-[#241712] px-4 py-20 text-center text-[#F3E7D3]">
        {/* Background food image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-bg.jpg"
            alt=""
            fill
            priority
            className="object-cover object-center opacity-50"
            aria-hidden="true"
          />
          {/* Dark gradient so text is always legible over the photo */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#241712]/60 via-[#241712]/40 to-[#241712]/70" aria-hidden="true" />
        </div>

        <div className="relative z-10 flex flex-col items-center">
          {/* Staggered shop name */}
          <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl" aria-label={SHOP_NAME}>
            {SHOP_NAME.split(" ").map((word, i) => (
              <span
                key={i}
                className="hero-word mr-2"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                {word}
              </span>
            ))}
          </h1>

          {/* Steam wisp — appears after name settles */}
          <div className="my-4">
            <SteamWisp mode="animate" color="#D9A441" />
          </div>

          <p className="mt-2 max-w-md text-lg text-[#F3E7D3]/80">{SHOP_TAGLINE}</p>

          <Link
            href="/menu"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#C15B2C] px-8 py-3.5 text-base font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#C15B2C]/50"
          >
            See Our Menu →
          </Link>

          {/* Quick hours badge */}
          <p className="mt-6 text-sm text-[#F3E7D3]/50">
            Open today: {SHOP_HOURS[0].open} – {SHOP_HOURS[0].close}
          </p>
        </div>
      </section>

      {/* ── Our Story ───────────────────────────────────────────────────── */}
      <ScrollReveal>
        <section className="mx-auto max-w-3xl px-4 py-16 text-center">
          <h2 className="font-display text-3xl font-bold text-[#241712]">Our Story</h2>
          <div className="mx-auto mt-3 h-0.5 w-16 bg-[#D9A441]" aria-hidden="true" />
          <p className="mt-6 leading-relaxed text-[#241712]/70">
            Sadguru Chai & Nasta Centre has been serving the neighbourhood with honest,
            home-style food since the beginning. No frills, no fuss — just the kind of
            chai and nasta that keeps people coming back every morning. From the first
            cutting chai of the day to the last misal pav in the evening, everything is
            made fresh with the same care every time.
          </p>
          <p className="mt-4 leading-relaxed text-[#241712]/70">
            We believe good food should be simple and accessible. That&apos;s why ordering
            from us is as easy as sending a WhatsApp message — because that&apos;s how
            business should work in our neighbourhood.
          </p>
        </section>
      </ScrollReveal>

      {/* Steam divider */}
      <div className="flex justify-center py-2" aria-hidden="true">
        <SteamWisp mode="static" color="#D9A441" />
      </div>

      {/* ── Menu highlights ─────────────────────────────────────────────── */}
      <ScrollReveal>
        <section className="bg-[#241712] px-4 py-16 text-[#F3E7D3]">
          <div className="mx-auto max-w-6xl text-center">
            <h2 className="font-display text-3xl font-bold">What We Make</h2>
            <div className="mx-auto mt-3 h-0.5 w-16 bg-[#D9A441]" aria-hidden="true" />
            <p className="mt-4 text-[#F3E7D3]/60">
              Everything fresh. Nothing fancy. Just honest food.
            </p>
            <Link
              href="/menu"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#D9A441] px-6 py-2.5 text-sm font-semibold text-[#D9A441] transition-colors hover:bg-[#D9A441] hover:text-[#241712] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A441]"
            >
              View Full Menu
            </Link>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Photo gallery ───────────────────────────────────────────────── */}
      <ScrollReveal>
        <section className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="font-display text-2xl font-bold text-[#241712]">From the Kitchen</h2>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {galleryImages.map((img, i) => (
              <div key={i} className="relative aspect-square overflow-hidden rounded-xl bg-[#e8dcc8]">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover transition-transform hover:scale-105"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* ── Testimonials ────────────────────────────────────────────────── */}
      <ScrollReveal>
        <section className="bg-[#F7EFDD] px-4 py-16">
          <div className="mx-auto max-w-6xl text-center">
            <h2 className="font-display text-3xl font-bold text-[#241712]">What People Say</h2>
            <div className="mx-auto mt-3 h-0.5 w-16 bg-[#D9A441]" aria-hidden="true" />
            <div className="mt-10">
              <TestimonialCarousel />
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Location ────────────────────────────────────────────────────── */}
      <ScrollReveal>
        <section className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="font-display text-2xl font-bold text-[#241712]">Find Us</h2>
          <p className="mt-2 text-[#241712]/70">{SHOP_ADDRESS}</p>
          <MapEmbed className="mt-4 w-full" />
        </section>
      </ScrollReveal>
    </>
  );
}
