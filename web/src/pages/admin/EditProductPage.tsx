import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../api";

export default function EditProductPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const isNew = id === "new";

  const [form, setForm] = useState({
    name: "",
    description: "",
    priceCents: 0,
    stock: 0,
    imageUrl: "",
    isActive: true,
  });

  useEffect(() => {
    if (!isNew) api.get(`/products/${id}`).then((res) => setForm(res.data));
  }, [id, isNew]);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isNew) await api.post("/products", form);
    else await api.patch(`/products/${id}`, form);
    nav("/admin/products");
  };

  return (
    <form onSubmit={save} className="max-w-lg mx-auto p-4 space-y-3">
      <h1 className="text-2xl font-bold">{isNew ? "New" : "Edit"} Product</h1>
      {["name", "description", "imageUrl"].map((k) => (
        <input
          key={k}
          className="border p-2 w-full"
          placeholder={k}
          value={(form as any)[k] ?? ""}
          onChange={(e) => setForm({ ...form, [k]: e.target.value })}
        />
      ))}
      <input
        type="number"
        className="border p-2 w-full"
        placeholder="priceCents"
        value={form.priceCents}
        onChange={(e) => setForm({ ...form, priceCents: +e.target.value })}
      />
      <input
        type="number"
        className="border p-2 w-full"
        placeholder="stock"
        value={form.stock}
        onChange={(e) => setForm({ ...form, stock: +e.target.value })}
      />
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={form.isActive}
          onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
        />
        Active
      </label>
      <button className="px-3 py-2 rounded bg-black text-white">Save</button>
    </form>
  );
}
