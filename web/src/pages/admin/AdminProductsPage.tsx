import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../api";
import Layout from "../../components/Layout";
import { useAuth } from "../../store/auth";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

type Product = {
  id: string;
  name: string;
  priceCents: number;
  stock: number;
  isActive: boolean;
};

export default function AdminProductsPage() {
  const { role } = useAuth();
  const nav = useNavigate();

  useEffect(() => {
    if (role !== "ADMIN") nav("/login");
  }, [role, nav]);

  const { data, refetch, isLoading } = useQuery<Product[]>({
    queryKey: ["admin-products"],
    queryFn: async () => (await api.get("/products/admin/all")).data,
  });

  const del = async (id: string, name: string) => {
    const confirmDelete = confirm(
      `Are you sure you want to remove the product "${name}"? This action cannot be undone.`
    );
    if (!confirmDelete) return;
    try {
      await api.delete(`/products/${id}`);
      toast.success(`"${name}" has been successfully removed.`);
      refetch();
    } catch {
      toast.error("Failed to delete product. Please try again.");
    }
  };

  return (
    <Layout>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">All Products</h1>
        <Link
          to="/admin/products/new"
          className="underline text-indigo-600 font-semibold"
        >
          + Add a Product
        </Link>
      </div>

      {isLoading ? (
        <p>Loading…</p>
      ) : (
        <table className="w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Active</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="p-2">{p.name}</td>
                <td className="text-center">
                  ${(p.priceCents / 100).toFixed(2)}
                </td>
                <td className="text-center">{p.stock}</td>
                <td className="text-center">{p.isActive ? "✅" : "❌"}</td>
                <td className="text-right p-2 space-x-3">
                  <Link
                    to={`/admin/products/${p.id}`}
                    className="underline text-blue-600"
                  >
                    Update Product
                  </Link>
                  <button
                    onClick={() => del(p.id, p.name)}
                    className="underline text-red-600"
                  >
                    Remove Product
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Layout>
  );
}
