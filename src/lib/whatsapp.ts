/**
 * lib/whatsapp.ts — WhatsApp message builders and deep-link generator.
 */

import { SHOP_WHATSAPP_NUMBER, SHOP_NAME } from "@/config/site-config";
import { calculateDelivery } from "@/lib/delivery";
import type { CartItem } from "@/lib/cart-context";

/** Standard footer appended to every WhatsApp message */
const MESSAGE_FOOTER = [
  ``,
  `---`,
  `Online Delivery Hours: 10:00 PM - 4:00 AM only`,
  `We also have Cigarettes & Pharmacy items (Condoms etc.) available - mention if needed!`,
].join("\n");

/** Builds the deep link URL for a given pre-composed message text. */
export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${SHOP_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Multi-item cart order message.
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

  return [
    `Hi ${SHOP_NAME}! I'd like to order:`,
    ...lines,
    ``,
    `Subtotal: Rs.${subtotal}`,
    `Delivery: Rs.${deliveryCharge}`,
    `Total: Rs.${total}`,
    ``,
    `Name:`,
    `Delivery Address:`,
    MESSAGE_FOOTER,
  ].join("\n");
}

/**
 * Single-item quick-order message.
 * Used by the "Order on WhatsApp" button on each ProductCard.
 */
export function buildQuickOrderMessage(
  itemName: string,
  price: number,
  selectedVariant?: string
): string {
  const variantNote = selectedVariant ? ` (${selectedVariant})` : "";
  const priceNote = price > 0 ? ` - Rs.${price}` : ``;
  return [
    `Hi ${SHOP_NAME}! I'd like to order:`,
    `1x ${itemName}${variantNote}${priceNote}`,
    ``,
    `Name:`,
    `Delivery Address:`,
    MESSAGE_FOOTER,
  ].join("\n");
}

/**
 * Default greeting for the floating WhatsApp button.
 */
export function buildGreetingLink(): string {
  const message = [
    `Hi ${SHOP_NAME}! I'd like to know more about your menu.`,
    MESSAGE_FOOTER,
  ].join("\n");
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
