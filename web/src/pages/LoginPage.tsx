import { useState } from "react";
import { api } from "../api";
import { useAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Layout from "../components/Layout";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuth } = useAuth();
  const nav = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      const { token, user } = res.data;
      setAuth(token, user.role);
      toast.success(`Welcome, ${user.role === "ADMIN" ? "Admin" : "User"}!`);
      setTimeout(() => {
        if (user.role === "ADMIN") nav("/admin/products");
        else nav("/");
      }, 800);
    } catch {
      toast.error("Login failed. Check your credentials.");
    }
  };

  return (
    <Layout>
      <form
        onSubmit={submit}
        className="max-w-sm mx-auto bg-white shadow rounded p-6 space-y-3"
      >
        <h1 className="text-2xl font-bold text-center text-indigo-600">
          Login
        </h1>
        <input
          className="border w-full p-2 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="border w-full p-2 rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
          Login
        </button>
      </form>
    </Layout>
  );
}
