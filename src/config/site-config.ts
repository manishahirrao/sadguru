/**
 * site-config.ts — single file a non-developer needs to edit.
 * All tuneable constants live here (or are re-exported from lib/).
 * Do NOT duplicate these values anywhere else in the codebase.
 */

// ─── Shop Identity ────────────────────────────────────────────────────────────
export const SHOP_NAME = "Shree Sadguru Chai & Nasta Center";
export const SHOP_TAGLINE = "Pune's favourite chai, made with heart.";
export const SHOP_WHATSAPP_NUMBER = "919284227368"; // country code 91 + number
export const SHOP_PHONE = "+91 92842 27368";
export const SHOP_ADDRESS = "Malhar Srushti, S.N. 10/7/5, Opp. Sinhgad Law College, Ambegaon Budruk, Pune, Maharashtra 411046";
export const SHOP_MAP_EMBED_URL =
  "https://maps.google.com/maps?q=18.463565,73.836764&z=16&output=embed";

// Exact shop GPS coordinates (Malhar Srushti, Ambegaon Budruk)
export const SHOP_LAT = 18.463565;
export const SHOP_LNG = 73.836764;
export const DELIVERY_RADIUS_KM = 2;
export const SHOP_INSTAGRAM = "https://www.instagram.com/shrisadguruchaha.centre?igsi=MXc3NXZ4ZDZyMHZ3OA==";
export const SHOP_FACEBOOK = "";                     // Leave empty if not applicable

// ─── Business Hours ───────────────────────────────────────────────────────────
export const SHOP_HOURS = [
  { day: "In-store", open: "Open 24 hours", close: "" },
  { day: "Online Delivery", open: "10:00 PM – 4:00 AM", close: "" },
];

export const ONLINE_DELIVERY_START_HOUR = 22; // 10 PM
export const ONLINE_DELIVERY_END_HOUR = 4;    // 4 AM

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
  "₹20 delivery charge on all orders. Minimum order ₹50. Delivery within 2 km of our shop in Ambegaon Budruk, Pune.";

// ─── SEO / Meta ───────────────────────────────────────────────────────────────
export const SITE_URL = "https://sadgurucafe.in"; // Replace with real domain
export const OG_IMAGE = "/og-image.jpg";          // Place a real food photo at public/og-image.jpg
