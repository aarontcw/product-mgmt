import { useState } from "react";
import { api } from "../api";
import { setAuth } from "../auth";

export default function LoginPage() {
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("Admin123!");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await api.post("/auth/login", { email, password });
    setAuth(res.data.token, res.data.user.role);
    alert(`Logged in as ${res.data.user.role}`);
  };

  return (
    <form onSubmit={submit} className="max-w-sm mx-auto p-4 space-y-3">
      <h1 className="text-2xl font-bold">Login</h1>
      <input
        className="border p-2 w-full"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        className="border p-2 w-full"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button className="px-3 py-2 rounded bg-black text-white w-full">
        Login
      </button>
    </form>
  );
}
