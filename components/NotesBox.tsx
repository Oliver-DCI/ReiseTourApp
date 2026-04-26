"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/app/context/AuthContext";
import { HiOutlineDocumentPlus, HiOutlineTrash, HiOutlineCheckCircle, HiOutlineArrowPath } from "react-icons/hi2";

export default function NotesBox({ city }: { city: string }) {
  const { user } = useAuth();
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  async function loadNotes() {
    setLoading(true);
    const res = await fetch(`/api/notes?city=${city}`);
    const data = await res.json();
    setNotes(data.notes || []);
    setLoading(false);
  }

  useEffect(() => {
    if (user) loadNotes();
  }, [user, city]);

  async function saveNote() {
    if (!note.trim()) return;
    await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ city, note }),
    });
    setNote("");
    loadNotes();
  }

  async function deleteNote(id: string) {
    await fetch(`/api/notes?id=${id}`, { method: "DELETE" });
    loadNotes();
  }

  async function toggleDone(id: string, done: boolean) {
    await fetch("/api/notes", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, done }),
    });
    loadNotes();
  }

  return (
    <div className="mt-16 p-8 md:p-12 rounded-[3rem] bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl relative overflow-hidden">
      
      {/* HUD Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h4 className="text-blue-400 font-mono text-[10px] uppercase tracking-[0.4em] mb-1">
            Mission Log System
          </h4>
          <h3 className="text-3xl font-black text-white uppercase tracking-tighter">
            Einträge: <span className="text-blue-500">{city}</span>
          </h3>
        </div>
        {loading && <HiOutlineArrowPath className="text-blue-500 animate-spin" size={24} />}
      </div>

      {!user ? (
        <div className="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/20 text-blue-400 text-sm font-mono text-center">
          ⚠ AUTHENTICATION REQUIRED: Log in to access local logs.
        </div>
      ) : (
        <div className="space-y-6">
          {/* Input Area */}
          <div className="relative group">
            <textarea
              className="w-full bg-white/5 border border-white/10 p-6 rounded-2xl text-white placeholder:text-white/20 focus:border-blue-500 outline-none transition-all resize-none font-light italic"
              rows={4}
              placeholder="System-Notiz erfassen..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <button
              onClick={saveNote}
              className="absolute bottom-4 right-4 bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-xl text-xs font-mono uppercase tracking-widest transition-all shadow-lg flex items-center gap-2"
            >
              <HiOutlineDocumentPlus size={16} /> Save Data
            </button>
          </div>

          {/* Logs List */}
          <div className="space-y-4 pt-6 border-t border-white/5">
            <AnimatePresence mode="popLayout">
              {notes.map((n: any) => (
                <motion.div
                  key={n._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`group relative p-6 rounded-2xl border transition-all ${
                    n.done 
                      ? "bg-white/5 border-white/5 opacity-50" 
                      : "bg-white/10 border-white/10 hover:border-blue-500/30"
                  }`}
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <p className={`text-white text-sm leading-relaxed ${n.done ? "line-through text-white/30" : ""}`}>
                        {n.text}
                      </p>
                      <div className="mt-3 text-[10px] font-mono text-white/20 uppercase tracking-widest">
                        Timestamp: {new Date(n.createdAt).toLocaleString("de-DE")}
                      </div>
                    </div>

                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => toggleDone(n._id, !n.done)}
                        className={`p-2 rounded-lg transition-colors ${
                          n.done ? "text-blue-500 bg-blue-500/10" : "text-white/40 hover:bg-white/10 hover:text-white"
                        }`}
                        title={n.done ? "Re-activate" : "Complete"}
                      >
                        <HiOutlineCheckCircle size={20} />
                      </button>
                      <button
                        onClick={() => deleteNote(n._id)}
                        className="p-2 rounded-lg text-white/40 hover:bg-red-500/20 hover:text-red-400 transition-colors"
                        title="Purge"
                      >
                        <HiOutlineTrash size={20} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {notes.length === 0 && !loading && (
              <p className="text-center text-white/10 font-mono text-xs py-10 uppercase tracking-[0.2em]">
                No logs found for this node.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}