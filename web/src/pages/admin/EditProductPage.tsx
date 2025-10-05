import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import { api } from "../../api";
import toast from "react-hot-toast";

export default function EditProductPage() {
  const { id } = useParams();
  const isNew = id === "new";
  const nav = useNavigate();
  const [form, setForm] = useState({
    name: "",
    description: "",
    priceCents: 0,
    stock: 0,
    isActive: true,
  });

  useEffect(() => {
    if (!isNew) api.get(`/products/${id}`).then((r) => setForm(r.data));
  }, [id, isNew]);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isNew) {
        await api.post("/products", form);
        toast.success("New product added successfully!");
      } else {
        await api.patch(`/products/${id}`, form);
        toast.success("Product updated successfully!");
      }
      setTimeout(() => nav("/admin/products"), 800);
    } catch {
      toast.error("Operation failed. Please check inputs.");
    }
  };

  return (
    <Layout>
      <form
        onSubmit={save}
        className="max-w-lg mx-auto bg-white shadow p-6 rounded space-y-4"
      >
        <h1 className="text-2xl font-bold">
          {isNew ? "Add New Product" : "Update Product"}
        </h1>

        <label className="block">
          <span className="text-sm font-semibold">Product Name</span>
          <input
            className="border p-2 w-full rounded"
            placeholder="e.g. Travel Umbrella"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold">Description</span>
          <input
            className="border p-2 w-full rounded"
            placeholder="Short product description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold">Price (in cents)</span>
          <input
            type="number"
            className="border p-2 w-full rounded"
            placeholder="e.g. 1500"
            value={form.priceCents}
            onChange={(e) => setForm({ ...form, priceCents: +e.target.value })}
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold">Stock Quantity</span>
          <input
            type="number"
            className="border p-2 w-full rounded"
            placeholder="e.g. 30"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: +e.target.value })}
          />
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.isActive}
            onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
          />
          Active
        </label>

        <div className="flex gap-3">
          <button className="flex-1 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
            {isNew ? "Add Product" : "Update Product"}
          </button>
          <button
            type="button"
            onClick={() => nav("/admin/products")}
            className="flex-1 bg-gray-300 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </Layout>
  );
}
