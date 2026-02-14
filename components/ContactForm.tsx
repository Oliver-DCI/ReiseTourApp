"use client";

import { FormEvent, useState } from "react";
import { HiOutlineUser, HiOutlineMail } from "react-icons/hi";
import { HiOutlineChatAlt2 } from "react-icons/hi";
import { IoSendSharp } from "react-icons/io5";

export default function ContactForm() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    alert(
      "Vielen Dank! Deine Nachricht wurde erfolgreich gesendet. Wir melden uns so schnell wie möglich bei dir."
    );
  };

  return (
    <div className="container mx-auto py-6 px-4 max-w-2xl">

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800 italic">
          Schreib uns eine Nachricht
        </h1>
        <p className="text-gray-600 mt-2">
          Wir freuen uns auf deine Anfrage zu unseren Deutschland‑Touren.
        </p>
      </div>

      {/* Formular */}
      <form
        className="space-y-6 bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
        onSubmit={handleSubmit}
      >
        {/* Name */}
        <div className="relative">
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            Name
          </label>
          <div className="relative flex items-center">
            <HiOutlineUser className="absolute ml-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Dein Name"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#d4af37] outline-none transition"
            />
          </div>
        </div>

        {/* Email */}
        <div className="relative">
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            Email
          </label>
          <div className="relative flex items-center">
            <HiOutlineMail className="absolute ml-3 text-gray-400" size={20} />
            <input
              type="email"
              placeholder="deine@mail.com"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#d4af37] outline-none transition"
            />
          </div>
        </div>

        {/* Nachricht */}
        <div className="relative">
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            Deine Nachricht
          </label>
          <div className="relative flex">
            <HiOutlineChatAlt2
              className="absolute ml-3 mt-3 text-gray-400"
              size={20}
            />
            <textarea
              rows={5}
              maxLength={300}
              placeholder="Wie können wir dir weiterhelfen?"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#d4af37] outline-none transition resize-none"
            />
          </div>
        </div>

        {/* Button */}
        <button
          className="w-full bg-[#d4af37] hover:bg-[#b8922c] text-white font-semibold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95"
          type="submit"
        >
          <IoSendSharp size={18} />
          Nachricht senden
        </button>
      </form>
    </div>
  );
}
