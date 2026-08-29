"use client";

interface MenuCategoryTabsProps {
  categories: string[];
  active: string;
  onChange: (cat: string) => void;
}

const CATEGORY_LABELS: Record<string, string> = {
  all: "All",
  nasta: "Nasta",
  beverages: "Chai & Beverages",
  addon: "Add-ons",
  other: "Other",
};

export default function MenuCategoryTabs({
  categories,
  active,
  onChange,
}: MenuCategoryTabsProps) {
  const all = ["all", ...categories];

  return (
    <div
      role="tablist"
      aria-label="Menu categories"
      className="flex gap-2 overflow-x-auto pb-1 scrollbar-none"
    >
      {all.map((cat) => {
        const label = CATEGORY_LABELS[cat] ?? cat.charAt(0).toUpperCase() + cat.slice(1);
        const isActive = active === cat;
        return (
          <button
            key={cat}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(cat)}
            className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C15B2C] ${
              isActive
                ? "border-[#C15B2C] bg-[#C15B2C] text-white"
                : "border-[#241712]/20 bg-white text-[#241712] hover:border-[#C15B2C]"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
