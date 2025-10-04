import { create } from 'zustand';
type Item = { productId:string; name:string; priceCents:number; quantity:number };
type CartState = {
  items: Item[]; add:(i:Item)=>void; remove:(id:string)=>void; clear:()=>void;
};
export const useCart = create<CartState>((set)=>({
  items: [],
  add: (i)=> set(s=>{
    const e = s.items.find(x=>x.productId===i.productId);
    if (e) return { items: s.items.map(x=>x.productId===i.productId? {...x, quantity:x.quantity+i.quantity}:x) };
    return { items: [...s.items, i] };
  }),
  remove: (id)=> set(s=>({ items: s.items.filter(i=>i.productId!==id) })),
  clear: ()=> set({ items: [] }),
}));