import { tours } from "@/data/tours";
import Link from "next/link";
import Image from "next/image";

export default function ReisePage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-6">

        {/* Textblock – jetzt im eleganten Div */}
        <div className="max-w-4xl mx-auto mb-12 p-8 rounded-2xl bg-white/60 backdrop-blur-md shadow-[0_4px_18px_rgba(0,0,0,0.06)] border border-[#e6e6e6] text-center">
          <h1 className="text-3xl font-bold mb-4 text-slate-800 italic">
            Deutschland entdecken –{" "}
            <span className="text-[#d4af37]">Vielfalt erleben</span>
          </h1>

          <h2 className="text-xl font-semibold mb-4 text-slate-600">
            Von der Nordsee bis zu den Alpen – jede Region erzählt ihre eigene Geschichte.
          </h2>

          <p className="text-slate-700 leading-relaxed italic text-[15px]">
            Deutschland ist ein Land voller Kontraste: moderne Metropolen, stille Wälder,
            historische Altstädte und beeindruckende Landschaften. Jede Stadt öffnet ein
            neues Kapitel voller Kultur, Geschichte und einzigartiger Erlebnisse.
          </p>
        </div>

        {/* Karten-Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {tours.map((item) => (
            <article
              key={item.city}
              className="flex flex-col bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300 group"
            >
              {/* Bild */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={item.img}
                  alt={item.city}
                  fill
                  className="object-cover object-center group-hover:scale-110 transition duration-700"
                />

                {/* Gold Badge */}
                <span className="absolute top-3 left-3 bg-[#d4af37] text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                  {item.city}
                </span>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col grow">
                <h2 className="text-xl font-bold text-slate-700 mb-2 group-hover:text-[#d4af37] transition-colors">
                  {item.city}
                </h2>

                <p className="text-sm text-slate-600 leading-relaxed grow">
                  {item.description.length > 12
                    ? item.description.slice(0, 90) + "..."
                    : item.description}
                </p>

                {/* Button */}
                <Link
                  href={`/tour/${item.city.toLowerCase()}`}
                  className="mt-4 inline-block text-center w-full bg-[#f7e7b5] text-slate-800 font-semibold py-2 px-3 rounded-lg text-sm hover:bg-[#d4af37] hover:text-white transition-all duration-300 active:scale-95"
                >
                  Mehr Infos anzeigen
                </Link>
              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
}
