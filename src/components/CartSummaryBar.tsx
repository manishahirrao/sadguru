"use client";

/**
 * CartSummaryBar
 *
 * Mobile + Desktop:
 *  - Sticky bottom bar shows item count + total + "Order" button
 *  - Tapping the bar or button opens a LEFT-SIDE slide-in drawer overlay
 *  - Backdrop click or ✕ button closes the drawer
 *  - No permanent sidebar — main content always has full width
 *
 * Hydration safety: `mounted` flag ensures server & first client render
 * both output the empty-cart state, avoiding localStorage mismatch.
 */

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import {
  calculateDelivery,
  isBelowMinimumOrder,
  amountToFreeDelivery,
  MINIMUM_ORDER_DELIVERY,
} from "@/lib/delivery";
import { DELIVERY_AREA_DISCLAIMER } from "@/config/site-config";
import { buildCartOrderLink } from "@/lib/whatsapp";

export default function CartSummaryBar() {
  const { items, subtotal, updateQty } = useCart();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Close drawer on Escape key
  useEffect(() => {
    if (!drawerOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [drawerOpen]);

  // Before mount: server and first client render agree — show empty state
  if (!mounted || items.length === 0) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-[#241712]/10 bg-[#F7EFDD] px-4 py-3 shadow-[0_-4px_16px_rgba(0,0,0,0.08)]">
        <p className="text-center text-sm text-[#241712]/60">
          Your cart is empty —{" "}
          <Link
            href="/menu"
            className="font-semibold text-[#C15B2C] underline-offset-2 hover:underline"
          >
            browse the menu
          </Link>
        </p>
      </div>
    );
  }

  const deliveryCharge = calculateDelivery(subtotal);
  const total = subtotal + deliveryCharge;
  const belowMin = isBelowMinimumOrder(subtotal);
  const toFreeDelivery = amountToFreeDelivery(subtotal);
  const itemCount = items.reduce((s, i) => s + i.qty, 0);

  function handleSendOrder() {
    if (belowMin) return;
    const link = buildCartOrderLink(items, subtotal);
    window.open(link, "_blank", "noopener,noreferrer");
  }

  return (
    <>
      {/* ── Sticky bottom bar (always visible when cart has items) ──────── */}
      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-[#241712]/10 bg-[#F7EFDD] px-4 pb-safe pt-3 shadow-[0_-4px_16px_rgba(0,0,0,0.1)]">
        {toFreeDelivery > 0 && subtotal >= MINIMUM_ORDER_DELIVERY && (
          <p className="mb-2 text-center text-xs text-[#C15B2C]">
            Add ₹{toFreeDelivery} more for free delivery!
          </p>
        )}
        {belowMin && (
          <p className="mb-2 text-center text-xs text-red-600">
            Minimum order for delivery is ₹{MINIMUM_ORDER_DELIVERY}
          </p>
        )}
        <div className="flex items-center gap-3">
          {/* View cart button — opens left drawer */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="flex flex-1 items-center justify-between rounded-lg bg-[#241712] px-3 py-2 text-[#F3E7D3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A441]"
            aria-label={`${itemCount} items in cart — view cart`}
            aria-expanded={drawerOpen}
            aria-controls="cart-drawer"
          >
            <span className="flex items-center gap-2 text-sm">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#C15B2C] text-xs font-bold">
                {itemCount}
              </span>
              <span>View cart</span>
            </span>
            <span className="font-mono text-sm font-semibold">₹{total}</span>
          </button>

          {/* Send order button */}
          <button
            type="button"
            onClick={handleSendOrder}
            disabled={belowMin}
            aria-disabled={belowMin}
            className="flex items-center gap-2 rounded-lg bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]"
          >
            <WAIcon />
            <span className="hidden sm:inline">Send Order</span>
            <span className="sm:hidden">Order</span>
          </button>
        </div>
      </div>

      {/* ── Left-side drawer overlay ─────────────────────────────────────── */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-50 flex"
          role="dialog"
          aria-modal="true"
          aria-label="Cart"
          id="cart-drawer"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 transition-opacity"
            onClick={() => setDrawerOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer panel — slides in from the left */}
          <div className="relative flex h-full w-full max-w-sm flex-col bg-[#F7EFDD] shadow-2xl animate-slideInLeft">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#241712]/10 px-5 py-4">
              <h2 className="font-display text-lg font-semibold text-[#241712]">
                Your Order
              </h2>
              <button
                onClick={() => setDrawerOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-[#241712]/50 transition-colors hover:bg-[#241712]/10 hover:text-[#241712] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C15B2C]"
                aria-label="Close cart"
              >
                <XIcon />
              </button>
            </div>

            {/* Line items */}
            <ul className="flex-1 overflow-y-auto px-5 py-3">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-3 border-b border-[#241712]/5 py-3 last:border-0"
                >
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium text-[#241712]">
                      {item.name}
                    </p>
                    {item.selectedVariant && (
                      <p className="text-xs text-[#241712]/50">
                        {item.selectedVariant}
                      </p>
                    )}
                  </div>
                  {/* Qty controls */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-[#241712]/20 text-[#241712] transition-colors hover:bg-[#241712] hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C15B2C]"
                      aria-label={`Remove one ${item.name}`}
                    >
                      –
                    </button>
                    <span className="min-w-[1.25rem] text-center text-sm font-medium">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-[#241712]/20 text-[#241712] transition-colors hover:bg-[#241712] hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C15B2C]"
                      aria-label={`Add one more ${item.name}`}
                    >
                      +
                    </button>
                  </div>
                  <span className="min-w-[3rem] text-right font-mono text-sm font-semibold text-[#D9A441]">
                    ₹{item.lineTotal}
                  </span>
                </li>
              ))}
            </ul>

            {/* Totals + CTA */}
            <div className="border-t border-[#241712]/10 bg-[#F7EFDD] px-5 py-5">
              {toFreeDelivery > 0 && subtotal >= MINIMUM_ORDER_DELIVERY && (
                <p className="mb-2 rounded-md bg-[#C15B2C]/10 px-3 py-1.5 text-xs font-medium text-[#C15B2C]">
                  Add ₹{toFreeDelivery} more for free delivery 🎉
                </p>
              )}
              {belowMin && (
                <p className="mb-2 rounded-md bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600">
                  Minimum order for delivery is ₹{MINIMUM_ORDER_DELIVERY}
                </p>
              )}

              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-[#241712]/70">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-[#241712]/70">
                  <span>Delivery</span>
                  <span>
                    {deliveryCharge === 0 ? (
                      <span className="font-medium text-green-600">FREE</span>
                    ) : (
                      `₹${deliveryCharge}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between border-t border-[#241712]/10 pt-1.5 text-base font-semibold text-[#241712]">
                  <span>Total</span>
                  <span className="font-mono text-[#D9A441]">₹{total}</span>
                </div>
              </div>

              <p className="mt-3 text-xs text-[#241712]/50">{DELIVERY_AREA_DISCLAIMER}</p>

              <button
                type="button"
                onClick={handleSendOrder}
                disabled={belowMin}
                aria-disabled={belowMin}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]"
              >
                <WAIcon />
                Send Order on WhatsApp
              </button>
            </div>
          </div>
          {/* Clicking right side of backdrop also closes */}
        </div>
      )}

      <style>{`
        @keyframes slideInLeft {
          from { transform: translateX(-100%); }
          to   { transform: translateX(0); }
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.25s ease-out;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-slideInLeft { animation: none; }
        }
        .pb-safe {
          padding-bottom: max(12px, env(safe-area-inset-bottom));
        }
      `}</style>
    </>
  );
}

function WAIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width="16"
      height="16"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M16 0C7.163 0 0 7.163 0 16c0 2.824.738 5.47 2.027 7.773L.059 31.54l8.006-2.1A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.286 13.286 0 0 1-6.787-1.855l-.487-.29-5.023 1.316 1.337-4.897-.317-.503A13.27 13.27 0 0 1 2.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.293-9.827c-.4-.2-2.364-1.167-2.73-1.3-.366-.133-.633-.2-.9.2s-1.033 1.3-1.267 1.567c-.233.266-.466.3-.866.1-.4-.2-1.688-.622-3.217-1.984-1.189-1.06-1.99-2.37-2.223-2.77-.233-.4-.025-.616.175-.816.18-.18.4-.466.6-.7.2-.233.266-.4.4-.666.133-.267.067-.5-.033-.7-.1-.2-.9-2.167-1.233-2.967-.325-.78-.655-.674-.9-.686l-.767-.013c-.267 0-.7.1-1.067.5s-1.4 1.367-1.4 3.333 1.433 3.867 1.633 4.133c.2.267 2.82 4.308 6.832 6.04.955.412 1.7.658 2.281.843.958.305 1.831.262 2.52.159.769-.115 2.364-.967 2.697-1.9.333-.934.333-1.734.233-1.9-.1-.167-.366-.267-.766-.467z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
