import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
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
  { src: "/images/misal-pav.jpg", alt: "Misal Pav — spicy lentil curry with pav" },
  { src: "/images/chai.jpg", alt: "Special Gulacha Chaha — jaggery tea" },
  { src: "/images/poha.jpg", alt: "Poha — flattened rice breakfast" },
  { src: "/images/maggi.jpg", alt: "Maggi noodles made to order" },
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
      <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden bg-[#241712] px-4 py-24 text-center text-[#F3E7D3]">
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
          {/* Dark gradient — readable text over any photo */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#241712]/70 via-[#241712]/40 to-[#241712]/80" aria-hidden="true" />
        </div>

        <div className="relative z-10 flex flex-col items-center">

          {/* Establishment badge */}
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-[#D9A441]/40 bg-[#D9A441]/10 px-4 py-1 text-xs font-medium tracking-widest text-[#D9A441] uppercase">
            ✦ Since 2025 · Pune
          </span>

          {/* Staggered shop name */}
          <h1
            className="font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl"
            aria-label={SHOP_NAME}
          >
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

          {/* Tagline */}
          <p className="max-w-lg text-lg leading-relaxed text-[#F3E7D3]/85">
            {SHOP_TAGLINE}
            <br />
            <span className="text-base text-[#F3E7D3]/60">
              Fresh poha, misal pav, cutting chai &amp; more — made to order, every day.
            </span>
          </p>

          {/* CTA buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 rounded-full bg-[#C15B2C] px-8 py-3.5 text-base font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#C15B2C]/50"
            >
              See Our Menu →
            </Link>
            <a
              href={`https://wa.me/919022217637?text=${encodeURIComponent("Hi Shree Sadguru Chai & Nasta Center! I'd like to place an order.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[#25D366] bg-transparent px-6 py-3.5 text-base font-semibold text-[#25D366] transition-colors hover:bg-[#25D366] hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M16 0C7.163 0 0 7.163 0 16c0 2.824.738 5.47 2.027 7.773L.059 31.54l8.006-2.1A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.286 13.286 0 0 1-6.787-1.855l-.487-.29-5.023 1.316 1.337-4.897-.317-.503A13.27 13.27 0 0 1 2.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.293-9.827c-.4-.2-2.364-1.167-2.73-1.3-.366-.133-.633-.2-.9.2s-1.033 1.3-1.267 1.567c-.233.266-.466.3-.866.1-.4-.2-1.688-.622-3.217-1.984-1.189-1.06-1.99-2.37-2.223-2.77-.233-.4-.025-.616.175-.816.18-.18.4-.466.6-.7.2-.233.266-.4.4-.666.133-.267.067-.5-.033-.7-.1-.2-.9-2.167-1.233-2.967-.325-.78-.655-.674-.9-.686l-.767-.013c-.267 0-.7.1-1.067.5s-1.4 1.367-1.4 3.333 1.433 3.867 1.633 4.133c.2.267 2.82 4.308 6.832 6.04.955.412 1.7.658 2.281.843.958.305 1.831.262 2.52.159.769-.115 2.364-.967 2.697-1.9.333-.934.333-1.734.233-1.9-.1-.167-.366-.267-.766-.467z"/></svg>
              Order on WhatsApp
            </a>
          </div>

          {/* Trust badges */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-[#F3E7D3]/60">
            <span className="flex items-center gap-1.5">
              <span className="text-[#D9A441]">★★★★★</span>
              Loved by the neighbourhood
            </span>
            <span className="hidden sm:block text-[#F3E7D3]/20">|</span>
            <span className="flex items-center gap-1.5">
              <ClockIcon />
              In-store: Open 24hrs · Delivery: 10 PM – 4 AM
            </span>
            <span className="hidden sm:block text-[#F3E7D3]/20">|</span>
            <span className="flex items-center gap-1.5">
              <LocationIcon />
              Pune, Maharashtra
            </span>
          </div>

          {/* Highlight chips */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {["🍛 Misal Pav", "🍜 Maggi", "🍚 Poha", "☕ Special Gulacha Chaha", "🥘 Bhurji Pav"].map((item) => (
              <span
                key={item}
                className="rounded-full bg-[#F3E7D3]/10 px-3 py-1 text-xs text-[#F3E7D3]/70 backdrop-blur-sm"
              >
                {item}
              </span>
            ))}
          </div>

        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-[#F3E7D3]/30" aria-hidden="true">
          <ChevronDownIcon />
        </div>
      </section>

      {/* ── Our Story ───────────────────────────────────────────────────── */}
      <ScrollReveal>
        <section className="mx-auto max-w-3xl px-4 py-16 text-center">
          <h2 className="font-display text-3xl font-bold text-[#241712]">Our Story</h2>
          <div className="mx-auto mt-3 h-0.5 w-16 bg-[#D9A441]" aria-hidden="true" />
          <p className="mt-6 leading-relaxed text-[#241712]/70">
            Shree Sadguru Chai & Nasta Center has been serving the neighbourhood with honest,
            home-style food since 2005. No frills, no fuss — just the kind of chai and nasta
            that keeps people coming back every morning. From the first cutting chai of the day
            to the last misal pav in the evening, everything is made fresh with the same care
            every time.
          </p>
          <p className="mt-4 leading-relaxed text-[#241712]/70">
            We believe good food should be simple and accessible. That&apos;s why ordering
            from us is as easy as sending a WhatsApp message — because that&apos;s how
            business should work in our neighbourhood.
          </p>
        </section>
      </ScrollReveal>

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

function ClockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
