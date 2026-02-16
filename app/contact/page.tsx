"use client";

import ContactForm from "@/components/ContactForm";
import {
  HiOutlineChatAlt2,
  HiOutlineCalendar,
  HiOutlineSparkles,
} from "react-icons/hi";

export default function ContactPage() {
  return (
    <main className="bg-gray-50 pb-20">

      {/* Header Bereich */}
      <div className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 italic">
            Kontaktiere <span className="text-[#d4af37]">GoldenWings</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Du planst eine Städtereise durch Deutschland oder hast Fragen zu
            unseren Touren? Wir beraten dich persönlich, zuverlässig und mit
            Leidenschaft.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 -mt-10">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Linke Spalte: Infokarten */}
          <div className="lg:col-span-1 space-y-6">

            {/* Karte 1 */}
            <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-[#d4af37]">
              <HiOutlineChatAlt2 className="text-[#d4af37] mb-3" size={32} />
              <h3 className="font-bold text-lg mb-2 text-slate-800">
                Fragen & Beratung
              </h3>
              <p className="text-gray-600 text-sm">
                Egal ob Berlin, Hamburg, München oder Frankfurt – wir helfen dir
                bei allen Fragen rund um deine Reiseplanung.
              </p>
            </div>

            {/* Karte 2 */}
            <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-[#d4af37]">
              <HiOutlineCalendar className="text-[#d4af37] mb-3" size={32} />
              <h3 className="font-bold text-lg mb-2 text-slate-800">
                Termin vereinbaren
              </h3>
              <p className="text-gray-600 text-sm">
                Buche ein persönliches Gespräch – telefonisch oder per Video‑Call.
                Wir richten uns nach deinem Zeitplan.
              </p>
            </div>

            {/* Karte 3 */}
            <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-[#d4af37]">
              <HiOutlineSparkles className="text-[#d4af37] mb-3" size={32} />
              <h3 className="font-bold text-lg mb-2 text-slate-800">
                Individuelle Wünsche
              </h3>
              <p className="text-gray-600 text-sm">
                Du möchtest besondere Orte entdecken oder eine exklusive Tour?
                Wir gestalten dein Erlebnis nach deinen Vorstellungen.
              </p>
            </div>

          </div>

          {/* Rechte Spalte: Formular */}
          <div className="lg:col-span-2">
            <div
              className="
                p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100
                bg-gradient-to-br from-[#f8f5ef] via-[#e8d9b8] to-[#d4af37]/40
                backdrop-blur-sm
              "
            >
              <h2 className="text-2xl font-bold mb-8 text-slate-800">
                Schreib uns eine Nachricht
              </h2>

              <ContactForm />

              <p className="mt-6 text-center text-gray-400 text-sm">
                Wir antworten dir in der Regel innerhalb von 24 Stunden.
              </p>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
