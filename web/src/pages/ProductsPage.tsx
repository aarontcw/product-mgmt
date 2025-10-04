import { useQuery } from "@tanstack/react-query";
import { api } from "../api";
import type { Product } from "../types";
import { useCart } from "../store/cart";
import { Link } from "react-router-dom";

export default function ProductsPage() {
  const { data } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => (await api.get("/products")).data,
  });
  const add = useCart((s) => s.add);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Store</h1>
        <nav className="space-x-3">
          <Link to="/cart" className="underline">
            Cart
          </Link>
          <Link to="/login" className="underline">
            Login
          </Link>
          <Link to="/admin/products" className="underline">
            Admin
          </Link>
        </nav>
      </header>

      <div className="grid md:grid-cols-3 gap-4">
        {data?.map((p) => (
          <div key={p.id} className="border rounded-xl p-4">
            <div className="font-semibold">{p.name}</div>
            <div className="text-sm text-gray-600">{p.description}</div>
            <div className="my-2 font-bold">
              ${(p.priceCents / 100).toFixed(2)}
            </div>
            <button
              className="px-3 py-2 rounded bg-black text-white"
              onClick={() =>
                add({
                  productId: p.id,
                  name: p.name,
                  priceCents: p.priceCents,
                  quantity: 1,
                })
              }
              disabled={p.stock <= 0}
            >
              {p.stock > 0 ? "Add to cart" : "Out of stock"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
