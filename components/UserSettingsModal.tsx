"use client";

import { useState } from "react";
import { useUserSettingsModal } from "@/app/context/UserSettingsModalContext";
import { useAuth } from "@/app/context/AuthContext";

export default function UserSettingsModal() {
  const { isOpen, setIsOpen } = useUserSettingsModal();
  const { user, setUser } = useAuth();

  const [username, setUsername] = useState(user?.username || "");
  const [newsletter, setNewsletter] = useState(user?.newsletter || false);

  // Passwort Felder (Variante B)
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (newPassword && newPassword !== repeatPassword) {
      setError("Die neuen Passwörter stimmen nicht überein.");
      setLoading(false);
      return;
    }

    const res = await fetch("/api/user/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        newsletter,
        oldPassword,
        newPassword,
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "Fehler beim Speichern");
      return;
    }

    setUser(data.user);
    setSuccess("Änderungen gespeichert!");
  }

  async function handleDelete() {
    if (!confirm("Bist du sicher, dass du deinen Account löschen möchtest?")) {
      return;
    }

    const res = await fetch("/api/user/delete", {
      method: "DELETE",
    });

    if (res.ok) {
      setUser(null);
      setIsOpen(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl w-[450px] shadow-xl">

        <h2 className="text-xl font-bold mb-4">Benutzerkonto</h2>

        <form onSubmit={handleSave} className="flex flex-col gap-4">

          {/* Username */}
          <div>
            <label className="text-sm font-semibold">Benutzername</label>
            <input
              type="text"
              className="border p-2 rounded w-full"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Email (nicht änderbar) */}
          <div>
            <label className="text-sm font-semibold">E-Mail</label>
            <input
              type="email"
              className="border p-2 rounded w-full bg-gray-100 cursor-not-allowed"
              value={user.email}
              disabled
            />
          </div>

          {/* Newsletter */}
          <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
            <input
              type="checkbox"
              checked={newsletter}
              onChange={(e) => setNewsletter(e.target.checked)}
            />
            Newsletter abonnieren
          </label>

          {/* Passwort ändern */}
          <div className="mt-2">
            <label className="text-sm font-semibold">Altes Passwort</label>
            <input
              type="password"
              className="border p-2 rounded w-full"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Neues Passwort</label>
            <input
              type="password"
              className="border p-2 rounded w-full"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Neues Passwort wiederholen</label>
            <input
              type="password"
              className="border p-2 rounded w-full"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}
          {success && <p className="text-green-600 text-sm">{success}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-[#c9a227] text-white py-2 rounded hover:bg-[#a88a1f]"
          >
            {loading ? "Speichern..." : "Speichern"}
          </button>
        </form>

        {/* Account löschen */}
        <button
          onClick={handleDelete}
          className="mt-4 text-sm text-red-600 underline"
        >
          Account löschen
        </button>

        <button
          onClick={() => setIsOpen(false)}
          className="mt-4 text-sm underline block"
        >
          Schließen
        </button>
      </div>
    </div>
  );
}
