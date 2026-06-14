"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Spinner from "@/components/ui/Spinner";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    setLoading(false);
    if (res.ok) {
      router.push("/admin");
    } else {
      const data = await res.json();
      setError(data.error ?? "Erreur de connexion");
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <p
            className="text-4xl font-light tracking-[0.15em] uppercase text-white"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Hoa Ly
          </p>
          <p className="text-xs tracking-widest uppercase text-[#6B6B6B] mt-2">
            Administration
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs tracking-widest uppercase text-[#6B6B6B] mb-2">
              Identifiant
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              className="w-full bg-[#1A1A1A] text-white border border-[#333] px-4 py-3 text-sm focus:outline-none focus:border-[#C8A882] transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs tracking-widest uppercase text-[#6B6B6B] mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full bg-[#1A1A1A] text-white border border-[#333] px-4 py-3 text-sm focus:outline-none focus:border-[#C8A882] transition-colors"
            />
          </div>

          {error && (
            <p className="text-red-400 text-xs text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#C8A882] text-white text-xs tracking-widest uppercase hover:bg-[#b8987a] transition-colors disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
          >
            {loading && <Spinner className="w-4 h-4 border-white/20 border-t-white" />}
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}
