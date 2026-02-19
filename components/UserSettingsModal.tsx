"use client";

import { useState } from "react";
import { useUserSettingsModal } from "@/app/context/UserSettingsModalContext";
import { useAuth } from "@/app/context/AuthContext";

export default function UserSettingsModal() {
  const { isOpen, setIsOpen } = useUserSettingsModal();
  const { user, setUser } = useAuth();

  const [username, setUsername] = useState(user?.username || "");
  const [street, setStreet] = useState(user?.street || "");
  const [zip, setZip] = useState(user?.zip || "");
  const [city, setCity] = useState(user?.city || "");

  // Passwort Felder
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen || !user) return null;

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
        street,
        zip,
        city,
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
      <div className="bg-white p-8 rounded-xl w-[520px] shadow-xl">

        <h2 className="text-xl font-bold mb-6">Benutzerkonto</h2>

        <form onSubmit={handleSave} className="flex flex-col gap-5">

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

          {/* Email (readonly) */}
          <div>
            <label className="text-sm font-semibold">E-Mail</label>
            <input
              type="email"
              className="border p-2 rounded w-full bg-gray-100 cursor-not-allowed"
              value={user.email}
              disabled
            />
          </div>

          {/* Straße */}
          <div>
            <label className="text-sm font-semibold">Straße</label>
            <input
              type="text"
              className="border p-2 rounded w-full"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              required
            />
          </div>

          {/* PLZ + Ort */}
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1">
              <label className="text-sm font-semibold">PLZ</label>
              <input
                type="text"
                className="border p-2 rounded w-full"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                required
              />
            </div>

            <div className="col-span-2">
              <label className="text-sm font-semibold">Ort</label>
              <input
                type="text"
                className="border p-2 rounded w-full"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Passwort ändern */}
          <div className="mt-2 grid grid-cols-1 gap-4">
            <div>
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
          className="mt-6 text-sm text-red-600 underline"
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
