"use client";

import { useState } from "react";

const testimonials = [
  {
    id: 1,
    name: "Priya S.",
    text: "Best misal pav in the area. The farsan is always fresh and the chai is perfect. We order almost every weekend!",
    rating: 5,
  },
  {
    id: 2,
    name: "Rahul M.",
    text: "Ordered Poha via WhatsApp and it was delivered in 15 minutes, still hot. Highly recommend!",
    rating: 5,
  },
  {
    id: 3,
    name: "Sneha P.",
    text: "Love the masala chai here. Reminds me of home. The owner is also very helpful on WhatsApp.",
    rating: 5,
  },
];

export default function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  const t = testimonials[current];

  return (
    <div className="relative mx-auto max-w-lg text-center">
      <blockquote className="rounded-2xl bg-[#241712] px-8 py-8 text-[#F3E7D3]">
        <div className="mb-4 flex justify-center gap-1" aria-label={`${t.rating} out of 5 stars`}>
          {Array.from({ length: t.rating }).map((_, i) => (
            <span key={i} className="text-[#D9A441] text-lg" aria-hidden="true">★</span>
          ))}
        </div>
        <p className="mb-4 text-base leading-relaxed italic">&ldquo;{t.text}&rdquo;</p>
        <footer className="text-sm font-semibold text-[#D9A441]">— {t.name}</footer>
      </blockquote>

      <div className="mt-4 flex items-center justify-center gap-4">
        <button
          onClick={prev}
          aria-label="Previous testimonial"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#241712]/20 text-[#241712] hover:bg-[#241712] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C15B2C]"
        >
          ‹
        </button>
        <div className="flex gap-2" role="tablist" aria-label="Testimonial navigation">
          {testimonials.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === current}
              onClick={() => setCurrent(i)}
              className={`h-2 w-2 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C15B2C] ${i === current ? "bg-[#C15B2C]" : "bg-[#241712]/20"}`}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
        <button
          onClick={next}
          aria-label="Next testimonial"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#241712]/20 text-[#241712] hover:bg-[#241712] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C15B2C]"
        >
          ›
        </button>
      </div>
    </div>
  );
}
