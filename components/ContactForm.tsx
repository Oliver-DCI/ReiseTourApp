"use client";
import { FormEvent, useState } from "react";
import { HiOutlineUser, HiOutlineMail } from "react-icons/hi"; // Heroicons
import { GiMountainRoad } from "react-icons/gi"; // Game Icons (super für Peru!)
import { IoSendSharp } from "react-icons/io5"; // Ionicons

// ### Client Component
// ### Man muss ganz Oben schreiben
// ### Dies wird verwenden, wenn es Interaktivität gibt, z.B.(Formulare, Buttons, Hooks)

export default function ContactForm() {
  const [email, setEmail] = useState("");

  // ### Wichtig für den Formular
  // ### "use client" eintragen
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault(); // Verhindert, dass die Seite neu lädt

    //  ### Hier könntest du die Daten an eine API senden
    alert(
      "¡Gracias! Deine Peru-Anfrage wurde erfolgreich gesendet. Wir melden uns in Kürze! 🏔️",
    );
  };
  return (
    <div className="container mx-auto py-12 px-4 max-w-2xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          Dein Peru-Abenteuer wartet 🇵🇪
        </h1>
        <p className="text-gray-600 mt-2">
          Schreib uns kurz deine Wünsche (max. 5 Zeilen).
        </p>
      </div>

      <form
        className="space-y-6 bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
        onSubmit={handleSubmit}
      >
        {/* #### Name */}
        <div className="relative">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Name
          </label>
          <div className="relative flex items-center">
            <HiOutlineUser className="absolute ml-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Dein Name"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>
        </div>

        {/* ### Email */}
        <div className="relative">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Email
          </label>
          <div className="relative flex items-center">
            <HiOutlineMail className="absolute ml-3 text-gray-400" size={20} />
            <input
              type="email"
              placeholder="deine@mail.com"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>
        </div>

        {/* ##### Peru Nachricht */}
        <div className="relative">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Was planst du in Peru?
          </label>
          <div className="relative flex">
            <GiMountainRoad
              className="absolute ml-3 mt-3 text-gray-400"
              size={20}
            />
            <textarea
              rows={5} // ### WICHTIG: Als Zahl in Klammern für TypeScript!
              maxLength={300}
              placeholder="Erzähl uns von deiner Traumreise..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition resize-none"
            />
          </div>
        </div>

        {/* #### Button */}
        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95"
          type="submit"
        >
          <IoSendSharp size={18} />
          Anfrage absenden
        </button>
      </form>
    </div>
  );
}
