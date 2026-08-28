"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { SHOP_NAME } from "@/config/site-config";
import { useCart } from "@/lib/cart-context";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { itemCount } = useCart();

  useEffect(() => setMounted(true), []);
  const displayCount = mounted ? itemCount : 0;

  return (
    <header className="sticky top-0 z-40 bg-[#241712]/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Logo / Shop name */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-display text-xl font-bold tracking-tight text-[#F3E7D3]">
            {SHOP_NAME}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#F3E7D3]/80 transition-colors hover:text-[#D9A441] focus-visible:text-[#D9A441] focus-visible:outline-none"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Cart icon (desktop) */}
        <Link
          href="/menu"
          className="relative hidden items-center gap-1 rounded-full bg-[#C15B2C] px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A441] md:flex"
          aria-label={`View cart, ${displayCount} items`}
        >
          <CartIcon />
          <span>Order</span>
          {displayCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#D9A441] text-xs font-bold text-[#241712]">
              {displayCount}
            </span>
          )}
        </Link>

        {/* Mobile hamburger */}
        <button
          className="flex h-11 w-11 items-center justify-center rounded-md text-[#F3E7D3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A441] md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <XIcon /> : <BurgerIcon />}
        </button>
      </div>

      {/* Mobile menu drawer */}
      {menuOpen && (
        <nav
          className="border-t border-[#F3E7D3]/10 bg-[#241712] px-4 pb-4 pt-2 md:hidden"
          aria-label="Mobile navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block py-3 text-base font-medium text-[#F3E7D3]/80 hover:text-[#D9A441] focus-visible:text-[#D9A441] focus-visible:outline-none"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

function CartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}
function BurgerIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}
function XIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
