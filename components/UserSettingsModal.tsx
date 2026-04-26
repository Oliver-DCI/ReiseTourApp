"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
// Wir holen uns die expliziten Funktionen aus deinem Context
import { useUserSettingsModal } from "@/app/context/UserSettingsModalContext";
import { useAuth } from "@/app/context/AuthContext";
import { 
  HiOutlineUser, 
  HiOutlineShieldCheck, 
  HiOutlineMap, 
  HiOutlineLockClosed,
  HiOutlineTrash,
  HiOutlineXMark
} from "react-icons/hi2";

export default function UserSettingsModal() {
  // KORREKTUR: Wir nutzen 'closeSettings' statt 'setIsOpen'
  const { isOpen, closeSettings } = useUserSettingsModal();
  const { user, setUser } = useAuth();

  const [username, setUsername] = useState(user?.username || "");
  const [street, setStreet] = useState(user?.street || "");
  const [zip, setZip] = useState(user?.zip || "");
  const [city, setCity] = useState(user?.city || "");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Sync Form mit User-Daten wenn Modal geöffnet wird
  useEffect(() => { 
    if (isOpen && user) { 
      setUsername(user.username || ""); 
      setStreet(user.street || ""); 
      setZip(user.zip || ""); 
      setCity(user.city || ""); 
    } 
  }, [isOpen, user]);

  if (!user) return null;

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (newPassword && newPassword !== repeatPassword) {
      setError("Encryption Keys do not match.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/user/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, street, zip, city, oldPassword, newPassword }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setError(data.error || "Update Sync Failed");
        return;
      }

      setUser(data.user);
      setSuccess("Identity Updated Successfully");
      setOldPassword("");
      setNewPassword("");
      setRepeatPassword("");
    } catch (err) {
      setLoading(false);
      setError("Connection to Core lost.");
    }
  }

  async function handleDelete() {
    if (!confirm("Are you sure you want to terminate this identity node?")) return;
    const res = await fetch("/api/user/delete", { method: "DELETE" });
    if (res.ok) {
      setUser(null);
      closeSettings(); // KORREKTUR: Hier closeSettings nutzen
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-[100] px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSettings} // KORREKTUR: Hier closeSettings nutzen
            className="absolute inset-0 bg-[#030712]/90 backdrop-blur-md"
          />

          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-slate-900 border border-white/10 w-full max-w-[600px] h-[85vh] overflow-y-auto rounded-[3rem] shadow-[0_0_50px_-12px_rgba(59,130,246,0.3)] scrollbar-hide"
          >
            {/* Header Area */}
            <div className="sticky top-0 bg-slate-900/80 backdrop-blur-xl p-8 border-b border-white/5 z-10 flex justify-between items-center">
              <div>
                <h4 className="text-blue-400 font-mono text-[10px] uppercase tracking-[0.4em] mb-1">System Core</h4>
                <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Identity Management</h2>
              </div>
              <button onClick={closeSettings} className="p-3 rounded-2xl bg-white/5 text-white/40 hover:text-white transition-colors">
                <HiOutlineXMark size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-8 space-y-10">
              
              {/* Profile Section */}
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-blue-400">
                  <HiOutlineUser size={18} />
                  <span className="text-xs font-mono uppercase tracking-widest">Base Identity</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-white/30 ml-2">Alias / Username</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white focus:border-blue-500 outline-none transition-all" value={username} onChange={(e) => setUsername(e.target.value)} required />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-white/30 ml-2">Locked Neural Address</label>
                    <input type="email" className="w-full bg-white/5 border border-white/5 p-4 rounded-2xl text-white/30 cursor-not-allowed" value={user.email} disabled />
                  </div>
                </div>
              </section>

              {/* Geo Section */}
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-cyan-400">
                  <HiOutlineMap size={18} />
                  <span className="text-xs font-mono uppercase tracking-widest">Deployment Sector</span>
                </div>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-white/30 ml-2">Street Protocol</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white focus:border-blue-500 outline-none transition-all" value={street} onChange={(e) => setStreet(e.target.value)} required />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-1 space-y-1">
                      <label className="text-[10px] font-mono text-white/30 ml-2">ZIP</label>
                      <input type="text" className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white focus:border-blue-500 outline-none transition-all" value={zip} onChange={(e) => setZip(e.target.value)} required />
                    </div>
                    <div className="col-span-2 space-y-1">
                      <label className="text-[10px] font-mono text-white/30 ml-2">Node / City</label>
                      <input type="text" className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white focus:border-blue-500 outline-none transition-all" value={city} onChange={(e) => setCity(e.target.value)} required />
                    </div>
                  </div>
                </div>
              </section>

              {/* Encryption Section */}
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-purple-400">
                  <HiOutlineLockClosed size={18} />
                  <span className="text-xs font-mono uppercase tracking-widest">Security Update</span>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <input type="password" placeholder="Current Key" className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white focus:border-blue-500 outline-none transition-all placeholder:text-white/10" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="password" placeholder="New Key" className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white focus:border-blue-500 outline-none transition-all placeholder:text-white/10" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                    <input type="password" placeholder="Repeat Key" className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white focus:border-blue-500 outline-none transition-all placeholder:text-white/10" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} />
                  </div>
                </div>
              </section>

              {/* Feedback Messages */}
              <div className="font-mono text-[10px] uppercase tracking-widest text-center">
                {error && <p className="text-red-500 animate-pulse">⚠ Status: {error}</p>}
                {success && <p className="text-green-500 flex items-center justify-center gap-2"><HiOutlineShieldCheck /> {success}</p>}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-4 pt-4">
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white py-5 rounded-2xl font-black uppercase text-xs tracking-[0.3em] transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)]"
                >
                  {loading ? "Synchronizing..." : "Sync Identity"}
                </motion.button>

                <button
                  type="button"
                  onClick={handleDelete}
                  className="flex items-center justify-center gap-2 text-white/20 hover:text-red-500 transition-colors text-[10px] font-mono uppercase tracking-[0.2em] py-4"
                >
                  <HiOutlineTrash size={14} /> Terminate Node Account
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}