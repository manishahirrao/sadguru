/**
 * lib/delivery.ts — single source of truth for all delivery constants and logic.
 *
 * To change delivery rules, edit ONLY this file.
 * site-config.ts re-exports these so a non-developer finds them in one place.
 */

/** Order subtotal at or above this gets free delivery (inclusive). */
export const DELIVERY_THRESHOLD = 100; // ₹

/** Delivery charge applied when subtotal is below DELIVERY_THRESHOLD. */
export const DELIVERY_CHARGE = 20; // ₹

/** Minimum order subtotal required to place a delivery order. */
export const MINIMUM_ORDER_DELIVERY = 50; // ₹

/**
 * Returns the delivery charge for a given subtotal.
 * @param subtotal - Cart subtotal in ₹ (delivery-eligible items only)
 */
export function calculateDelivery(subtotal: number): number {
  return subtotal >= DELIVERY_THRESHOLD ? 0 : DELIVERY_CHARGE;
}

/**
 * Returns true if the subtotal is below the minimum required for delivery.
 * When true, the "Send Order" button should be disabled with an explanatory message.
 */
export function isBelowMinimumOrder(subtotal: number): boolean {
  return subtotal < MINIMUM_ORDER_DELIVERY;
}

/**
 * Returns how many more ₹ are needed to reach free delivery.
 * Returns 0 if already at or above threshold.
 */
export function amountToFreeDelivery(subtotal: number): number {
  return Math.max(0, DELIVERY_THRESHOLD - subtotal);
}
