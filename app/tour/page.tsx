import { tours } from "@/data/tours";

import Link from "next/link";
import Image from "next/image";
export default function ReisePage() {
  return (
    <div className="container mx-auto py-16 px-6">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4 text-slate-700">
          DEUTSCHLAND EXTRA: Die Vielfalt der Horizonte
        </h1>
        <h2 className="text-2xl font-semibold mb-4 text-slate-500">
          Von der rauen Nordsee über verwunschene Wälder bis zu den Gipfeln der Alpen.
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto italic text-lg">
          Es gibt Reisen, die verändern nicht nur deinen Standort, sondern deinen Blick auf die Welt. Wer Deutschland bereist, folgt einem Weg aus Geschichte, Kultur und lebendiger Gegenwart. Hier, wo Leuchttürme dem Wind trotzen und Burgen von vergangenen Zeiten erzählen, wartet hinter jeder Kurve ein neues Kapitel voller Entdeckungen.
        </p>
      </div>

      {/* Grid Bereich */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tours.map((item) => (
          <article
            key={item.city}
            className="flex flex-col bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 group"
          >
            {/* Bild Bereich */}
            <div className="relative h-64 overflow-hidden">
              <Image
                src={item.img}
                alt={item.city}
                fill
                className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                {item.city}
              </span>
            </div>

            {/* Content Bereich */}
            <div className="p-6 flex flex-col grow">
              <h2 className="text-2xl font-bold text-slate-700 mb-3 group-hover:text-red-600 transition-colors">
                {item.city}
              </h2>

              <div className="mb-6 grow">
                <p className="text-md text-slate-600 leading-relaxed">
                  {/* Schneidet den String bei 12 Zeichen ab und fügt ... hinzu */}
                  {item.description.length > 12
                    ? item.description.slice(0, 100) + "..."
                    : item.description}
                </p>
              </div>

              <div className="mt-auto">
                <Link
                  href={`/tour/${item.city.toLowerCase()}`}
                  className="inline-block text-center w-full bg-blue-100 text-slate-800 font-bold py-4 rounded-xl hover:bg-slate-800 hover:text-white transition-all duration-300 transform active:scale-95"
                >
                  {item.title} ansehen
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
