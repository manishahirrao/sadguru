"use client";

/**
 * ProductCard — renders a menu item.
 *
 * Modes driven entirely by MenuItem flags:
 *  - orderable: false  → display-only (tobacco compliance: no button, no promo styling)
 *  - available: false  → sold-out (order button disabled, label shown)
 *  - variants.length > 1 → inline variant picker; button inactive until selection made
 */

import Image from "next/image";
import { useState } from "react";
import type { MenuItem } from "@/lib/types";
import { useCart } from "@/lib/cart-context";
import { buildQuickOrderMessage, buildWhatsAppLink } from "@/lib/whatsapp";

interface ProductCardProps {
  item: MenuItem;
}

export default function ProductCard({ item }: ProductCardProps) {
  const { addItem } = useCart();
  const hasVariants = item.variants && item.variants.length > 1;
  const [selectedVariant, setSelectedVariant] = useState<string | undefined>(
    hasVariants ? item.variants![0].label : undefined
  );

  const variantDelta =
    hasVariants && selectedVariant
      ? (item.variants!.find((v) => v.label === selectedVariant)?.priceDelta ?? 0)
      : 0;
  const effectivePrice = item.price + variantDelta;

  function handleAddToCart() {
    if (!item.orderable || !item.available) return;
    if (hasVariants && !selectedVariant) return;
    addItem(item, 1, selectedVariant, effectivePrice);
  }

  function handleQuickOrder() {
    if (!item.orderable || !item.available) return;
    if (hasVariants && !selectedVariant) return;
    const msg = buildQuickOrderMessage(item.name, effectivePrice, selectedVariant);
    window.open(buildWhatsAppLink(msg), "_blank", "noopener,noreferrer");
  }

  // ── Display-only card (tobacco) ───────────────────────────────────────────
  if (!item.orderable) {
    return (
      <article className="rounded-xl border border-[#241712]/10 bg-[#F7EFDD] p-4">
        <div className="relative mb-3 aspect-[4/3] w-full overflow-hidden rounded-lg bg-[#e8dcc8]">
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-medium text-[#241712]">{item.name}</h3>
          <span className="text-xs text-[#241712]/50 italic">Price varies</span>
        </div>
        <p className="mt-1 text-sm text-[#241712]/60">{item.description}</p>
        <p className="mt-2 text-xs text-[#241712]/40">Available in-store only</p>
      </article>
    );
  }

  const canOrder = item.orderable && item.available && (!hasVariants || !!selectedVariant);

  return (
    <article className="group rounded-xl border border-[#241712]/10 bg-[#F7EFDD] p-4 transition-transform hover:-translate-y-0.5 hover:shadow-md focus-within:shadow-md">
      {/* Image */}
      <div className="relative mb-3 aspect-[4/3] w-full overflow-hidden rounded-lg bg-[#e8dcc8]">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform group-hover:scale-[1.02]"
        />
        {/* Veg / Non-veg badge */}
        <span
          className={`absolute left-2 top-2 flex h-5 w-5 items-center justify-center rounded-sm border-2 ${item.veg ? "border-green-600 bg-white" : "border-red-600 bg-white"}`}
          title={item.veg ? "Vegetarian" : "Non-vegetarian"}
          aria-label={item.veg ? "Vegetarian" : "Non-vegetarian"}
        >
          <span
            className={`h-2.5 w-2.5 rounded-full ${item.veg ? "bg-green-600" : "bg-red-600"}`}
          />
        </span>
        {/* Sold-out overlay */}
        {!item.available && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <span className="rounded bg-black/70 px-3 py-1 text-sm font-semibold text-white">
              Sold out today
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-medium text-[#241712]">{item.name}</h3>
        <span className="font-mono text-sm font-semibold text-[#D9A441]">
          {item.price === 0 ? <span className="text-xs font-normal italic text-[#241712]/50">Price varies</span> : `₹${effectivePrice}`}
        </span>
      </div>
      <p className="mt-1 line-clamp-2 text-sm text-[#241712]/60">{item.description}</p>

      {/* Delivery ineligible note */}
      {!item.deliveryEligible && (
        <p className="mt-1 text-xs text-[#C15B2C]">In-store purchase only</p>
      )}

      {/* Variant picker */}
      {hasVariants && (
        <div
          className="mt-3 flex flex-wrap gap-2"
          role="group"
          aria-label={`Variant options for ${item.name}`}
        >
          {item.variants!.map((v) => {
            const isSelected = selectedVariant === v.label;
            const price = item.price + v.priceDelta;
            return (
              <button
                key={v.label}
                type="button"
                onClick={() => setSelectedVariant(v.label)}
                aria-pressed={isSelected}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C15B2C] ${
                  isSelected
                    ? "border-[#C15B2C] bg-[#C15B2C] text-white"
                    : "border-[#241712]/20 bg-white text-[#241712] hover:border-[#C15B2C]"
                }`}
              >
                {v.label}
                {v.priceDelta !== 0 && (
                  <span className="ml-1 opacity-75">₹{price}</span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Action buttons */}
      <div className="mt-4 flex gap-2">
        {/* WhatsApp-only items (price === 0): skip cart, go straight to WhatsApp */}
        {item.price === 0 ? (
          <button
            type="button"
            onClick={handleQuickOrder}
            disabled={!item.available}
            aria-disabled={!item.available}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#25D366] py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]"
            aria-label={`Order ${item.name} on WhatsApp`}
          >
            <WAIcon />
            Order on WhatsApp
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={!canOrder}
              aria-disabled={!canOrder}
              className="flex-1 rounded-lg bg-[#C15B2C] px-3 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C15B2C]"
            >
              {!item.available ? "Sold out" : hasVariants && !selectedVariant ? "Pick a variant" : "Add to order"}
            </button>
            <button
              type="button"
              onClick={handleQuickOrder}
              disabled={!canOrder}
              aria-disabled={!canOrder}
              title="Order this item directly on WhatsApp"
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#25D366] text-[#25D366] transition-colors hover:bg-[#25D366] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]"
              aria-label={`Order ${item.name} on WhatsApp`}
            >
              <WAIcon />
            </button>
          </>
        )}
      </div>
    </article>
  );
}

function WAIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M16 0C7.163 0 0 7.163 0 16c0 2.824.738 5.47 2.027 7.773L.059 31.54l8.006-2.1A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.286 13.286 0 0 1-6.787-1.855l-.487-.29-5.023 1.316 1.337-4.897-.317-.503A13.27 13.27 0 0 1 2.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.293-9.827c-.4-.2-2.364-1.167-2.73-1.3-.366-.133-.633-.2-.9.2s-1.033 1.3-1.267 1.567c-.233.266-.466.3-.866.1-.4-.2-1.688-.622-3.217-1.984-1.189-1.06-1.99-2.37-2.223-2.77-.233-.4-.025-.616.175-.816.18-.18.4-.466.6-.7.2-.233.266-.4.4-.666.133-.267.067-.5-.033-.7-.1-.2-.9-2.167-1.233-2.967-.325-.78-.655-.674-.9-.686l-.767-.013c-.267 0-.7.1-1.067.5s-1.4 1.367-1.4 3.333 1.433 3.867 1.633 4.133c.2.267 2.82 4.308 6.832 6.04.955.412 1.7.658 2.281.843.958.305 1.831.262 2.52.159.769-.115 2.364-.967 2.697-1.9.333-.934.333-1.734.233-1.9-.1-.167-.366-.267-.766-.467z" />
    </svg>
  );
}
