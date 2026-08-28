/**
 * site-config.ts — single file a non-developer needs to edit.
 * All tuneable constants live here (or are re-exported from lib/).
 * Do NOT duplicate these values anywhere else in the codebase.
 */

// ─── Shop Identity ────────────────────────────────────────────────────────────
export const SHOP_NAME = "Sadguru Chai & Nasta Centre";
export const SHOP_TAGLINE = "Pune's favourite chai, made with heart.";
export const SHOP_WHATSAPP_NUMBER = "919XXXXXXXXX"; // Replace with real number: country code + number, no +
export const SHOP_PHONE = "+91 9XXXXXXXXX";          // Replace with real phone
export const SHOP_ADDRESS = "Near [Landmark], [Area], Pune, Maharashtra";
export const SHOP_MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!..."; // Replace with real embed URL from Google Maps
export const SHOP_INSTAGRAM = "https://instagram.com/sadgurucafe"; // Replace
export const SHOP_FACEBOOK = "";                     // Leave empty if not applicable

// ─── Business Hours ───────────────────────────────────────────────────────────
export const SHOP_HOURS = [
  { day: "Monday – Saturday", open: "07:00", close: "22:00" },
  { day: "Sunday", open: "08:00", close: "21:00" },
];

// ─── Delivery Constants (true source of truth is lib/delivery.ts) ─────────────
// These re-exports let a non-developer find everything in this one file.
export {
  DELIVERY_THRESHOLD,
  DELIVERY_CHARGE,
  MINIMUM_ORDER_DELIVERY,
  calculateDelivery,
  isBelowMinimumOrder,
} from "@/lib/delivery";

// ─── Delivery Area ────────────────────────────────────────────────────────────
export const DELIVERY_AREA_DISCLAIMER =
  "Delivery available within 3 km of the shop. Confirm with us on WhatsApp before ordering from outside this range.";

// ─── SEO / Meta ───────────────────────────────────────────────────────────────
export const SITE_URL = "https://sadgurucafe.in"; // Replace with real domain
export const OG_IMAGE = "/og-image.jpg";          // Place a real food photo at public/og-image.jpg
