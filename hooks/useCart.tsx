"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { CartItem } from "@/lib/types";

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load from localStorage only on client
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("audiophile_cart");
      if (saved) {
        try {
          setItems(JSON.parse(saved));
        } catch {
          console.warn("Invalid cart data in localStorage — clearing it");
          localStorage.removeItem("audiophile_cart");
        }
      }
    }
  }, []);

  // Save to localStorage whenever items change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("audiophile_cart", JSON.stringify(items));
    }
  }, [items]);

  // Add item or update quantity
  const addItem = (
    item: Omit<CartItem, "quantity"> & { quantity?: number }
  ) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + (item.quantity || 1) }
            : i
        );
      }
      return [...prev, { ...item, quantity: item.quantity || 1 }];
    });
  };

  // Remove item
  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  // Update quantity (auto-remove if 0)
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity } : i)));
  };

  // Clear entire cart
  const clearCart = () => {
    setItems([]);
  };

  // Derived values
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
