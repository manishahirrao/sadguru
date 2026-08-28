/** Variant option for a menu item (e.g. Maggi: Plain / Masala / Cheese). */
export interface Variant {
  label: string;
  priceDelta: number; // Added to base price. Use 0 for no change.
}

/**
 * A single menu item as stored in menu.json.
 * All boolean flags default to true; only exceptions (e.g. tobacco) set them false.
 */
export interface MenuItem {
  id: string;
  name: string;
  category: string;           // e.g. "nasta", "beverages", "other"
  price: number;              // Base price in ₹
  veg: boolean;               // true = veg (green dot), false = non-veg (red dot)
  image: string;              // Path relative to /public, e.g. "/images/misal-pav.webp"
  description: string;
  available: boolean;         // false = "Sold out today" — item shown but unorderable
  orderable: boolean;         // false = display-only (e.g. tobacco). Enforced at data layer.
  deliveryEligible: boolean;  // false = "In-store purchase only"
  variants?: Variant[];       // Optional. Omit or leave empty for no variant picker.
}
