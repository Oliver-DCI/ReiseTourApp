"use client";

import { useState } from "react";
import { useAuthModal } from "@/app/context/AuthModalContext";
import { useAuth } from "@/app/context/AuthContext";

export default function AuthModal() {
  const { isOpen, setIsOpen } = useAuthModal();
  const { setUser } = useAuth();

  const [mode, setMode] = useState<"login" | "register">("login");
  const [form, setForm] = useState({ email: "", password: "", username: "" });
  const [error, setError] = useState("");

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/register";

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Fehler");
      return;
    }

    if (mode === "login") {
      setUser(data.user);
      setIsOpen(false);
    } else {
      setMode("login");
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl w-[400px] shadow-xl">

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            className={`pb-2 border-b-2 ${
              mode === "login" ? "border-[#c9a227]" : "border-transparent"
            }`}
            onClick={() => setMode("login")}
          >
            Login
          </button>

          <button
            className={`pb-2 border-b-2 ${
              mode === "register" ? "border-[#c9a227]" : "border-transparent"
            }`}
            onClick={() => setMode("register")}
          >
            Registrieren
          </button>
        </div>

        {/* Formular */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {mode === "register" && (
            <input
              type="text"
              placeholder="Benutzername"
              className="border p-2 rounded"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
            />
          )}

          <input
            type="email"
            placeholder="E-Mail"
            className="border p-2 rounded"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <input
            type="password"
            placeholder="Passwort"
            className="border p-2 rounded"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            className="bg-[#c9a227] text-white py-2 rounded hover:bg-[#a88a1f]"
          >
            {mode === "login" ? "Einloggen" : "Registrieren"}
          </button>
        </form>

        <button
          onClick={() => setIsOpen(false)}
          className="mt-4 text-sm underline"
        >
          Schließen
        </button>
      </div>
    </div>
  );
}
