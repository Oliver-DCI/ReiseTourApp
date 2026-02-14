import { HiOutlineGlobeAlt, HiOutlineHeart } from "react-icons/hi";

export default function AboutPage() {
  return (
    <div className="container mx-auto py-16 px-6 max-w-5xl">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Fake Bild Platzhalter */}
        <div className="relative h-400px bg-slate-200 rounded-3xl overflow-hidden shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?q=80&w=1000"
            alt="Unser Team in Cusco"
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute bottom-4 left-4 bg-white/90 p-4 rounded-xl shadow-lg">
            <p className="text-sm font-bold text-gray-800">
              Hallo aus Cusco! 👋
            </p>
          </div>
        </div>

        {/* Text-Inhalt */}
        <div>
          <h1 className="text-4xl font-bold mb-6 italic text-slate-800">
            Kleine Agentur,{" "}
            <span className="text-red-600">riesige Abenteuer</span>
          </h1>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Willkommen bei **PeruExplore**. Wir sind ein kleines,
            spezialisiertes Team mit Sitz im Herzen von **Cusco**. Unsere
            Mission? Dir die Anden so zu zeigen, wie wir sie lieben:
            authentisch, sicher und unvergesslich.
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="bg-red-100 p-2 rounded-lg text-red-600">
                <HiOutlineGlobeAlt size={24} />
              </div>
              <div>
                <h3 className="font-bold">Individuelle Touren</h3>
                <p className="text-sm text-gray-600">
                  Wir bieten maßgeschneiderte Erlebnisse in{" "}
                  <strong>Cusco, Puno (Titicacasee) und Arequipa</strong>.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                <HiOutlineHeart size={24} />
              </div>
              <div>
                <h3 className="font-bold">Zweisprachiger Service</h3>
                <p className="text-sm text-gray-600">
                  Egal ob <strong>Deutsch</strong> oder <strong>English</strong>{" "}
                  – wir kommunizieren klar und direkt, damit du dich sicher
                  fühlst.
                </p>
              </div>
            </div>
          </div>

          <button className="mt-8 bg-slate-800 text-white px-8 py-3 rounded-full hover:bg-slate-700 transition">
            Lerne unser Team kennen
          </button>
        </div>
      </div>
    </div>
  );
}
