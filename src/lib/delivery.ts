/**
 * lib/delivery.ts — single source of truth for delivery constants and logic.
 * Flat ₹20 charge on every delivery order. No free delivery threshold.
 */

/** Fixed delivery charge applied to every order. */
export const DELIVERY_CHARGE = 20; // ₹

/** Minimum order subtotal required to place a delivery order. */
export const MINIMUM_ORDER_DELIVERY = 50; // ₹

/**
 * Set high so free delivery is never triggered.
 * Kept for compatibility — not used in UI messaging.
 */
export const DELIVERY_THRESHOLD = 99999; // effectively disabled

/**
 * Always returns ₹20 — flat rate on every order.
 */
export function calculateDelivery(_subtotal: number): number {
  return DELIVERY_CHARGE;
}

/**
 * Returns true if subtotal is below the minimum required for delivery.
 */
export function isBelowMinimumOrder(subtotal: number): boolean {
  return subtotal < MINIMUM_ORDER_DELIVERY;
}

/**
 * Always 0 — free delivery nudge is disabled.
 */
export function amountToFreeDelivery(_subtotal: number): number {
  return 0;
}
