"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/app/context/AuthContext";

export default function NotesBox({ city }: { city: string }) {
  const { user } = useAuth();

  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);

  // ⭐ Notizen laden
  async function loadNotes() {
    const res = await fetch(`/api/notes?city=${city}`);
    const data = await res.json();
    setNotes(data.notes || []);
  }

  useEffect(() => {
    if (user) loadNotes();
  }, [user]);

  // ⭐ Notiz speichern
  async function saveNote() {
    await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ city, note }),
    });

    setNote("");
    loadNotes(); // ⭐ neu laden
  }

  // ⭐ Notiz löschen
  async function deleteNote(id: string) {
    await fetch(`/api/notes?id=${id}`, {
      method: "DELETE",
    });
    loadNotes();
  }

  // ⭐ Notiz erledigt markieren
  async function toggleDone(id: string, done: boolean) {
    await fetch("/api/notes", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, done }),
    });
    loadNotes();
  }

  return (
    <div
      className="
        mt-16 p-8 rounded-2xl 
        bg-white/70 backdrop-blur-md 
        shadow-[0_4px_18px_rgba(0,0,0,0.08)]
        border border-[#d4af37]/40
      "
    >
      {/* Titel */}
      <h3
        className="
          text-3xl font-bold mb-6 
          text-[#d4af37] tracking-wide
        "
      >
        Deine Notizen zu {city}
      </h3>

      {!user ? (
        <p className="text-red-600 font-medium">
          Du musst eingeloggt sein, um Notizen zu dieser Reise zu erfassen.
        </p>
      ) : (
        <>
          {/* Textarea */}
          <textarea
            className="
              w-full border border-[#d4af37]/40 
              p-4 rounded-xl mb-4 
              bg-white/60 backdrop-blur-sm
              focus:outline-none focus:ring-2 focus:ring-[#d4af37]/60
              transition
            "
            rows={5}
            placeholder="Schreibe hier deine Notizen zur Reise..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

          {/* Button */}
          <button
            onClick={saveNote}
            className="
              px-8 py-3 rounded-full text-sm font-semibold 
              bg-[#d4af37] text-white 
              hover:bg-[#b8962f] transition shadow-md
            "
          >
            Notiz speichern
          </button>

          {/* ⭐ Gespeicherte Notizen */}
          {notes.length > 0 && (
            <div className="mt-10 space-y-4">
              <h4 className="text-xl font-bold text-[#d4af37] tracking-wide mb-4">
                Deine gespeicherten Notizen
              </h4>

              {notes.map((n: any) => (
                <div
                  key={n._id}
                  className="
                    p-4 rounded-xl 
                    bg-white/80 backdrop-blur 
                    border border-[#d4af37]/30 
                    shadow-sm
                  "
                >
                  <p
                    className={`text-slate-700 whitespace-pre-line ${
                      n.done ? "line-through opacity-60" : ""
                    }`}
                  >
                    {n.text}
                  </p>

                  <p className="text-xs text-slate-500 mt-2">
                    {new Date(n.createdAt).toLocaleString("de-DE")}
                  </p>

                  <div className="flex gap-3 mt-4">

                    {/* Erledigt */}
                    <button
                      onClick={() => toggleDone(n._id, !n.done)}
                      className="
                        px-3 py-1 rounded-full text-xs font-semibold
                        bg-[#d4af37]/20 text-[#d4af37]
                        hover:bg-[#d4af37]/30 transition
                      "
                    >
                      {n.done ? "Rückgängig" : "Erledigt"}
                    </button>

                    {/* Löschen */}
                    <button
                      onClick={() => deleteNote(n._id)}
                      className="
                        px-3 py-1 rounded-full text-xs font-semibold
                        bg-red-100 text-red-600
                        hover:bg-red-200 transition
                      "
                    >
                      Löschen
                    </button>

                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
