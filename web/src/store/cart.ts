import { create } from 'zustand';

type Item = { productId: string; name: string; priceCents: number; quantity: number };
type CartState = {
  items: Item[];
  add: (item: Item) => void;
  remove: (id: string) => void;
  clear: () => void;
};
export const useCart = create<CartState>((set) => ({
  items: [],
  add: (item) => set((s) => {
    const ex = s.items.find(i => i.productId === item.productId);
    if (ex) return { items: s.items.map(i => i.productId === item.productId ? { ...i, quantity: i.quantity + item.quantity } : i) };
    return { items: [...s.items, item] };
  }),
  remove: (id) => set((s) => ({ items: s.items.filter(i => i.productId !== id) })),
  clear: () => set({ items: [] }),
}));