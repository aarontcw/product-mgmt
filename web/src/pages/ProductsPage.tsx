import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../api";
import Layout from "../components/Layout";
import { useAuth } from "../store/auth";
import { useCart } from "../store/cart";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export type Product = {
  id: string;
  name: string;
  description?: string;
  priceCents: number;
  stock: number;
  isActive: boolean;
};

export default function ProductsPage() {
  const nav = useNavigate();
  const { token, clearAuth } = useAuth();
  const { add } = useCart();

  // logout-by-default if no token found
  useEffect(() => {
    if (!localStorage.getItem("token")) clearAuth();
  }, [clearAuth]);

  const { data, isLoading } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => (await api.get("/products")).data,
  });

  const onAdd = (p: Product) => {
    if (!token) {
      toast.error("Please login before adding to cart");
      setTimeout(() => nav("/login"), 1000);
      return;
    }
    add({
      productId: p.id,
      name: p.name,
      priceCents: p.priceCents,
      quantity: 1,
    });
    toast.success(`${p.name} added to cart 🛒`);
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Products</h1>
      {isLoading ? (
        <p>Loading…</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {data?.map((p) => (
            <div
              key={p.id}
              className="bg-white shadow-sm hover:shadow-md rounded-xl p-4 transition"
            >
              <h2 className="font-semibold">{p.name}</h2>
              <p className="text-sm text-gray-600">{p.description}</p>
              <p className="font-bold my-2">
                ${(p.priceCents / 100).toFixed(2)}
              </p>
              <button
                className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
                disabled={p.stock <= 0}
                onClick={() => onAdd(p)}
              >
                {p.stock > 0 ? "Add to Cart" : "Out of stock"}
              </button>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}
