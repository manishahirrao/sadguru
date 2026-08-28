"use client";

/**
 * cart-context.tsx — client-side cart state with localStorage persistence.
 *
 * Persistence rules:
 * - Cart is written to localStorage on every change with a `savedAt` Unix timestamp.
 * - On hydration, any cart older than 24 hours is silently discarded (prevents stale prices).
 * - orderable: false items are rejected at the add-to-cart handler, not just hidden in UI.
 */

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
} from "react";
import type { MenuItem } from "@/lib/types";

const STORAGE_KEY = "sadguru_cart";
const CART_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

export interface CartItem {
  id: string;            // MenuItem.id + optional variant label
  menuItemId: string;
  name: string;
  price: number;         // Base price
  selectedVariant?: string;
  lineTotal: number;     // effectivePrice × qty
  qty: number;
  deliveryEligible: boolean;
}

interface CartState {
  items: CartItem[];
  savedAt: number;       // Unix timestamp ms
}

type CartAction =
  | { type: "ADD"; item: CartItem }
  | { type: "REMOVE"; id: string }
  | { type: "UPDATE_QTY"; id: string; qty: number }
  | { type: "CLEAR" };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD": {
      const existing = state.items.find((i) => i.id === action.item.id);
      if (existing) {
        return {
          ...state,
          savedAt: Date.now(),
          items: state.items.map((i) =>
            i.id === action.item.id
              ? {
                  ...i,
                  qty: i.qty + action.item.qty,
                  lineTotal: (i.qty + action.item.qty) * (i.price + getVariantDelta(i)),
                }
              : i
          ),
        };
      }
      return {
        ...state,
        savedAt: Date.now(),
        items: [...state.items, action.item],
      };
    }
    case "REMOVE":
      return {
        ...state,
        savedAt: Date.now(),
        items: state.items.filter((i) => i.id !== action.id),
      };
    case "UPDATE_QTY": {
      if (action.qty <= 0) {
        return {
          ...state,
          savedAt: Date.now(),
          items: state.items.filter((i) => i.id !== action.id),
        };
      }
      return {
        ...state,
        savedAt: Date.now(),
        items: state.items.map((i) =>
          i.id === action.id
            ? { ...i, qty: action.qty, lineTotal: action.qty * effectivePriceOf(i) }
            : i
        ),
      };
    }
    case "CLEAR":
      return { items: [], savedAt: Date.now() };
    default:
      return state;
  }
}

function getVariantDelta(_item: CartItem): number {
  // lineTotal is already computed at add time; this is a no-op placeholder
  return 0;
}

function effectivePriceOf(item: CartItem): number {
  return item.lineTotal / item.qty;
}

const emptyState: CartState = { items: [], savedAt: 0 };

function loadFromStorage(): CartState {
  if (typeof window === "undefined") return emptyState;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyState;
    const parsed: CartState = JSON.parse(raw);
    if (Date.now() - parsed.savedAt > CART_TTL_MS) {
      // Cart is stale — silently discard
      localStorage.removeItem(STORAGE_KEY);
      return emptyState;
    }
    return parsed;
  } catch {
    return emptyState;
  }
}

interface CartContextValue {
  items: CartItem[];
  addItem: (menuItem: MenuItem, qty: number, selectedVariant?: string, effectivePrice?: number) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  subtotal: number;
  itemCount: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, emptyState, loadFromStorage);

  // Persist to localStorage on every state change
  useEffect(() => {
    if (state.items.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [state]);

  const addItem = useCallback(
    (menuItem: MenuItem, qty: number, selectedVariant?: string, effectivePrice?: number) => {
      // Guard: orderable: false items are rejected at the data layer, not just hidden in UI
      if (!menuItem.orderable) {
        console.warn(`Attempted to add non-orderable item "${menuItem.name}" to cart. Blocked.`);
        return;
      }
      const price = effectivePrice ?? menuItem.price;
      const cartItemId = selectedVariant
        ? `${menuItem.id}__${selectedVariant}`
        : menuItem.id;
      const cartItem: CartItem = {
        id: cartItemId,
        menuItemId: menuItem.id,
        name: menuItem.name,
        price: menuItem.price,
        selectedVariant,
        lineTotal: price * qty,
        qty,
        deliveryEligible: menuItem.deliveryEligible,
      };
      dispatch({ type: "ADD", item: cartItem });
    },
    []
  );

  const removeItem = useCallback((id: string) => dispatch({ type: "REMOVE", id }), []);
  const updateQty = useCallback(
    (id: string, qty: number) => dispatch({ type: "UPDATE_QTY", id, qty }),
    []
  );
  const clearCart = useCallback(() => dispatch({ type: "CLEAR" }), []);

  const subtotal = state.items.reduce((sum, i) => sum + i.lineTotal, 0);
  const itemCount = state.items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider
      value={{ items: state.items, addItem, removeItem, updateQty, clearCart, subtotal, itemCount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
