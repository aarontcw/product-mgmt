import { create } from "zustand";

type Item = {
  productId: string;
  name: string;
  priceCents: number;
  quantity: number;
};

type CartState = {
  items: Item[];
  add: (item: Item) => void;
  remove: (id: string) => void;
  clear: () => void;
  updateQuantity: (id: string, qty: number) => void;
};

export const useCart = create<CartState>((set) => ({
  items: [],

  // Add item or increase quantity if it already exists
  add: (item) =>
  set((s) => {
    const existing = s.items.find((i) => i.productId === item.productId);
    if (existing)
      return {
        items: s.items.map((i) =>
          i.productId === item.productId
            ? { ...i, quantity: i.quantity + item.quantity, stock: item.stock }
            : i
        ),
      };
    return { items: [...s.items, item] };
  }),

  // Remove item by productId
  remove: (id) =>
    set((state) => ({
      items: state.items.filter((i) => i.productId !== id),
    })),

  // Clear the cart entirely
  clear: () => set({ items: [] }),

  // Update quantity directly
  updateQuantity: (id, qty) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.productId === id ? { ...i, quantity: qty } : i
      ),
    })),
}));