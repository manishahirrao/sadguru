"use client";

import { useState, useMemo } from "react";
import type { Metadata } from "next";
import menuData from "@/data/menu.json";
import type { MenuItem } from "@/lib/types";
import ProductCard from "@/components/ProductCard";
import MenuCategoryTabs from "@/components/MenuCategoryTabs";
import ScrollReveal from "@/components/ScrollReveal";

const items = menuData as MenuItem[];

// Derive unique categories preserving order of first appearance
const categories = Array.from(new Set(items.map((i) => i.category)));

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = useMemo(
    () =>
      activeCategory === "all"
        ? items
        : items.filter((i) => i.category === activeCategory),
    [activeCategory]
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <ScrollReveal>
        <h1 className="font-display text-3xl font-bold text-[#241712]">Our Menu</h1>
        <p className="mt-1 text-[#241712]/60">
          Everything is made fresh — order on WhatsApp in seconds.
        </p>
      </ScrollReveal>

      {/* Category tabs */}
      <div className="sticky top-[60px] z-20 -mx-4 bg-[#F7EFDD]/90 px-4 py-3 backdrop-blur-sm">
        <MenuCategoryTabs
          categories={categories}
          active={activeCategory}
          onChange={setActiveCategory}
        />
      </div>

      {/* Product grid */}
      <ScrollReveal>
        <div
          className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          role="list"
          aria-label="Menu items"
        >
          {filtered.map((item) => (
            <div key={item.id} role="listitem">
              <ProductCard item={item} />
            </div>
          ))}
        </div>
      </ScrollReveal>

      {filtered.length === 0 && (
        <p className="py-12 text-center text-[#241712]/50">
          No items in this category yet.
        </p>
      )}
    </div>
  );
}
