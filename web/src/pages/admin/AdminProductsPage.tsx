import { useQuery } from "@tanstack/react-query";
import { api } from "../../api";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { isAdmin } from "../../auth";

type P = {
  id: string;
  name: string;
  priceCents: number;
  stock: number;
  isActive: boolean;
};

export default function AdminProductsPage() {
  const nav = useNavigate();
  useEffect(() => {
    if (!isAdmin()) nav("/login");
  }, [nav]);

  const { data, refetch } = useQuery<P[]>({
    queryKey: ["admin-products"],
    queryFn: async () => (await api.get("/products/admin/all")).data,
  });

  const del = async (id: string) => {
    await api.delete(`/products/${id}`);
    refetch();
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Admin • Products</h1>
        <Link className="underline" to="/admin/products/new">
          New
        </Link>
      </div>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
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
              <td className="text-center">{p.isActive ? "Yes" : "No"}</td>
              <td className="text-right p-2 space-x-3">
                <Link className="underline" to={`/admin/products/${p.id}`}>
                  Edit
                </Link>
                <button className="underline" onClick={() => del(p.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
