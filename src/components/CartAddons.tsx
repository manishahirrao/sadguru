"use client";

/**
 * CartAddons — compact add-on suggestions shown inside the cart drawer.
 * Shows items with category "addon" as quick +1 tap chips.
 */

import { useCart } from "@/lib/cart-context";
import menuData from "@/data/menu.json";
import type { MenuItem } from "@/lib/types";

const addons = (menuData as MenuItem[]).filter(
  (i) => i.category === "addon" && i.available && i.orderable
);

export default function CartAddons() {
  const { addItem } = useCart();

  if (addons.length === 0) return null;

  return (
    <div className="border-t border-[#241712]/10 px-5 py-3">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#241712]/40">
        Add-ons
      </p>
      <div className="flex flex-wrap gap-2">
        {addons.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => addItem(item, 1)}
            className="flex items-center gap-1.5 rounded-full border border-[#241712]/15 bg-white px-3 py-1.5 text-xs font-medium text-[#241712] transition-colors hover:border-[#C15B2C] hover:bg-[#C15B2C] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C15B2C]"
            aria-label={`Add ${item.name} ₹${item.price}`}
          >
            <span>+</span>
            <span>{item.name}</span>
            <span className="opacity-60">₹{item.price}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
