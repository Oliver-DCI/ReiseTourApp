import { HiOutlineGlobeAlt, HiOutlineHeart } from "react-icons/hi";

export default function AboutPage() {
  return (
    <div className="container mx-auto py-16 px-6 max-w-5xl">
      <div className="grid md:grid-cols-2 gap-12 items-center">

        {/* Bildbereich */}
        <div className="relative h-[400px] bg-slate-200 rounded-3xl overflow-hidden shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1622214366189-72b19cc61597?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Deutschland Landschaft"
            className="w-full h-full object-cover opacity-90"
          />
          </div>

        {/* Textbereich */}
        <div>
          <h1 className="text-4xl font-bold mb-6 italic text-slate-800">
            <span className="text-[#d4af37] italic">Golden</span> 
            <span className="text-[#3a3a3a] italic">Wings</span>
            {" "}–{" "}
            <span className="text-[#d4af37]">Reisen mit Charakter</span>
          </h1>

          <p className="text-lg text-slate-700 mb-6 leading-relaxed">
            Deutschland ist ein Land voller Vielfalt: moderne Metropolen,
            historische Altstädte, majestätische Alpen, stille Seen und
            kilometerlange Küsten. Mit GoldenWings zeigen wir dir die schönsten
            Seiten dieses Landes – stilvoll, persönlich und mit Liebe zum Detail.
          </p>

          <div className="space-y-5">

            {/* Punkt 1 */}
            <div className="flex items-start gap-4">
              <div className="bg-[#f7e7b5] p-2 rounded-lg text-[#d4af37] shadow-sm">
                <HiOutlineGlobeAlt size={26} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">Einzigartige Städtereisen</h3>
                <p className="text-sm text-slate-600">
                  Ob Berlin, Hamburg, München oder Frankfurt – wir gestalten
                  Touren, die Kultur, Architektur und Lifestyle perfekt verbinden.
                </p>
              </div>
            </div>

            {/* Punkt 2 */}
            <div className="flex items-start gap-4">
              <div className="bg-[#f7e7b5] p-2 rounded-lg text-[#d4af37] shadow-sm">
                <HiOutlineHeart size={26} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">Persönlicher Service</h3>
                <p className="text-sm text-slate-600">
                  Wir begleiten dich mit Leidenschaft und Expertise – klar,
                  zuverlässig und immer auf Augenhöhe.
                </p>
              </div>
            </div>

          </div>

          {/* Button */}
          <button className="mt-8 bg-[#d4af37] text-white font-semibold px-8 py-3 rounded-full shadow-md hover:bg-[#b8922c] transition">
            Mehr über GoldenWings erfahren
          </button>
        </div>
      </div>
    </div>
  );
}
