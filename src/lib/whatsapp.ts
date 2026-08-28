/**
 * lib/whatsapp.ts — WhatsApp message builders and deep-link generator.
 *
 * ENCODING NOTE: Always use encodeURIComponent. The ₹ symbol (U+20B9) and
 * newlines must be tested explicitly on Android + iOS WhatsApp before launch,
 * as rendering has historically differed between versions.
 * encodeURIComponent converts \n → %0A and ₹ → %E2%82%B9 correctly.
 */

import { SHOP_WHATSAPP_NUMBER, SHOP_NAME } from "@/config/site-config";
import { calculateDelivery, DELIVERY_THRESHOLD } from "@/lib/delivery";
import type { CartItem } from "@/lib/cart-context";

/** Builds the deep link URL for a given pre-composed message text. */
export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${SHOP_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Multi-item cart order message (FR-WHATSAPP-003).
 * Used by the "Send Order on WhatsApp" button in the cart.
 */
export function buildCartOrderMessage(
  cartItems: CartItem[],
  subtotal: number,
  deliveryCharge: number,
  total: number
): string {
  const lines = cartItems.map(
    (item) =>
      `${item.qty}x ${item.name}${item.selectedVariant ? ` (${item.selectedVariant})` : ""} - Rs.${item.lineTotal}`
  );

  const deliveryLine =
    deliveryCharge === 0
      ? `Delivery: FREE (order >= Rs.${DELIVERY_THRESHOLD})`
      : `Delivery: Rs.${deliveryCharge}`;

  return [
    `Hi ${SHOP_NAME}! I'd like to order:`,
    ...lines,
    ``,
    `Subtotal: Rs.${subtotal}`,
    deliveryLine,
    `Total: Rs.${total}`,
    ``,
    `Name:`,
    `Delivery Address:`,
  ].join("\n");
}

/**
 * Single-item quick-order message (FR-WHATSAPP-002).
 * Used by the "Order on WhatsApp" button on each ProductCard (skips the cart).
 */
export function buildQuickOrderMessage(
  itemName: string,
  price: number,
  selectedVariant?: string
): string {
  const variantNote = selectedVariant ? ` (${selectedVariant})` : "";
  return [
    `Hi ${SHOP_NAME}! I'd like to order:`,
    `1x ${itemName}${variantNote} - Rs.${price}`,
    ``,
    `Name:`,
    `Delivery Address:`,
  ].join("\n");
}

/**
 * Default greeting for the floating WhatsApp button (FR-WHATSAPP-001).
 */
export function buildGreetingLink(): string {
  const message = `Hi ${SHOP_NAME}! I'd like to know more about your menu.`;
  return buildWhatsAppLink(message);
}

/** Convenience: build and return the full cart order link in one call. */
export function buildCartOrderLink(
  cartItems: CartItem[],
  subtotal: number
): string {
  const deliveryCharge = calculateDelivery(subtotal);
  const total = subtotal + deliveryCharge;
  const message = buildCartOrderMessage(cartItems, subtotal, deliveryCharge, total);
  return buildWhatsAppLink(message);
}
