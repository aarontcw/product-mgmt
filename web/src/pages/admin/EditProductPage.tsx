import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import { api } from "../../api";

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
    if (isNew) await api.post("/products", form);
    else await api.patch(`/products/${id}`, form);
    nav("/admin/products");
  };

  return (
    <Layout>
      <form
        onSubmit={save}
        className="max-w-lg mx-auto bg-white shadow p-6 rounded space-y-3"
      >
        <h1 className="text-2xl font-bold">{isNew ? "New" : "Edit"} Product</h1>
        <input
          className="border p-2 w-full rounded"
          placeholder="name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="border p-2 w-full rounded"
          placeholder="description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          type="number"
          className="border p-2 w-full rounded"
          placeholder="priceCents"
          value={form.priceCents}
          onChange={(e) => setForm({ ...form, priceCents: +e.target.value })}
        />
        <input
          type="number"
          className="border p-2 w-full rounded"
          placeholder="stock"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: +e.target.value })}
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.isActive}
            onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
          />{" "}
          Active
        </label>
        <button className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
          Save
        </button>
      </form>
    </Layout>
  );
}
