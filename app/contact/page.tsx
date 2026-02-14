// app/contact/page.tsx

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
            ¡Hablemos! — <span className="text-red-500">Lass uns reden</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Hast du Fragen zu unseren Routen, spezielle Wünsche für deine
            Peru-Reise oder möchtest du einfach eine unverbindliche Beratung?
            Wir sind für dich da.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 -mt-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Linke Spalte: Infokarten (Motivation) */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-red-500">
              <HiOutlineChatAlt2 className="text-red-500 mb-3" size={32} />
              <h3 className="font-bold text-lg mb-2">Fragen & Anregungen</h3>
              <p className="text-gray-600 text-sm">
                Keine Frage ist zu klein. Wir helfen dir gerne bei der Planung
                deiner Details.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-blue-500">
              <HiOutlineCalendar className="text-blue-500 mb-3" size={32} />
              <h3 className="font-bold text-lg mb-2">Termin vereinbaren</h3>
              <p className="text-gray-600 text-sm">
                Schreib uns dein Wunschdatum für ein Telefonat oder ein
                Zoom-Meeting.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-green-500">
              <HiOutlineSparkles className="text-green-500 mb-3" size={32} />
              <h3 className="font-bold text-lg mb-2">Individuelle Wünsche</h3>
              <p className="text-gray-600 text-sm">
                Du willst etwas ganz Spezielles in Cusco oder Puno erleben? Sag
                es uns!
              </p>
            </div>
          </div>

          {/* Rechte Spalte: Das eigentliche Formular */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100">
              <h2 className="text-2xl font-bold mb-8 text-slate-800">
                Sende uns eine Nachricht
              </h2>
              <ContactForm />
              <p className="mt-6 text-center text-gray-400 text-sm">
                Wir antworten dir normalerweise innerhalb von 24 Stunden
                (peruanische Zeit).
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
