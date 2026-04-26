"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthModal } from "@/app/context/AuthModalContext";
import { useAuth } from "@/app/context/AuthContext";
import { HiOutlineXMark, HiOutlineShieldCheck, HiOutlineCpuChip } from "react-icons/hi2";

export default function AuthModal() {
  const { isOpen, closeModal } = useAuthModal(); // Nutzt die neuen sauberen Funktionen
  const { setUser } = useAuth();

  const [mode, setMode] = useState<"login" | "register">("login");
  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
    street: "",
    zip: "",
    city: "",
  });

  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/register";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Access Denied: Check Credentials");
        return;
      }

      if (mode === "login") {
        setUser(data.user);
        closeModal();
      } else {
        setMode("login");
      }
    } catch (err) {
      setError("System Connection Failure");
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-[100] px-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="absolute inset-0 bg-[#030712]/80 backdrop-blur-md"
          />

          {/* Terminal Window */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-slate-900 border border-white/10 w-full max-w-[500px] rounded-[2.5rem] shadow-[0_0_50px_-12px_rgba(59,130,246,0.3)] overflow-hidden"
          >
            {/* Header / Tabs */}
            <div className="flex border-b border-white/5 bg-white/5">
              <button
                className={`flex-1 py-6 text-xs font-mono uppercase tracking-[0.3em] transition-all ${
                  mode === "login" ? "text-blue-400 bg-blue-500/5 shadow-[inset_0_-2px_0_0_#3b82f6]" : "text-white/30"
                }`}
                onClick={() => setMode("login")}
              >
                Access
              </button>
              <button
                className={`flex-1 py-6 text-xs font-mono uppercase tracking-[0.3em] transition-all ${
                  mode === "register" ? "text-blue-400 bg-blue-500/5 shadow-[inset_0_-2px_0_0_#3b82f6]" : "text-white/30"
                }`}
                onClick={() => setMode("register")}
              >
                Initialize
              </button>
            </div>

            <div className="p-8 md:p-12">
              <div className="flex items-center gap-3 mb-8">
                {mode === "login" ? <HiOutlineShieldCheck className="text-blue-400" size={24} /> : <HiOutlineCpuChip className="text-cyan-400" size={24} />}
                <h3 className="text-xl font-bold uppercase tracking-tighter">
                  {mode === "login" ? "Uplink Secure" : "New Node Creation"}
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {mode === "register" && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: "auto" }}
                    className="flex flex-col gap-4"
                  >
                    <input
                      type="text"
                      placeholder="Username"
                      className="bg-white/5 border border-white/10 p-4 rounded-xl w-full text-sm focus:border-blue-500 transition-colors"
                      value={form.username}
                      onChange={(e) => setForm({ ...form, username: e.target.value })}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Street Protocol"
                      className="bg-white/5 border border-white/10 p-4 rounded-xl w-full text-sm focus:border-blue-500 transition-colors"
                      value={form.street}
                      onChange={(e) => setForm({ ...form, street: e.target.value })}
                      required
                    />
                    <div className="grid grid-cols-3 gap-4">
                      <input
                        type="text"
                        placeholder="ZIP"
                        className="bg-white/5 border border-white/10 p-4 rounded-xl w-full text-sm focus:border-blue-500 transition-colors col-span-1"
                        value={form.zip}
                        onChange={(e) => setForm({ ...form, zip: e.target.value })}
                        required
                      />
                      <input
                        type="text"
                        placeholder="Sector / City"
                        className="bg-white/5 border border-white/10 p-4 rounded-xl w-full text-sm focus:border-blue-500 transition-colors col-span-2"
                        value={form.city}
                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                        required
                      />
                    </div>
                  </motion.div>
                )}

                <input
                  type="email"
                  placeholder="Neural Mail"
                  className="bg-white/5 border border-white/10 p-4 rounded-xl w-full text-sm focus:border-blue-500 transition-colors"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />

                <input
                  type="password"
                  placeholder="Encryption Key"
                  className="bg-white/5 border border-white/10 p-4 rounded-xl w-full text-sm focus:border-blue-500 transition-colors"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                />

                {error && (
                  <p className="text-red-400 text-[10px] font-mono uppercase tracking-widest mt-2">
                    ⚠ Error: {error}
                  </p>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="mt-4 bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-black uppercase text-xs tracking-[0.3em] transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)]"
                >
                  {mode === "login" ? "Execute Login" : "Initialize Identity"}
                </motion.button>
              </form>

              <button
                onClick={closeModal}
                className="mt-8 w-full flex items-center justify-center gap-2 text-white/20 hover:text-white transition-colors text-[10px] font-mono uppercase tracking-[0.2em]"
              >
                <HiOutlineXMark /> Abort Connection
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}