import { tours } from "@/data/tours";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default async function SpotDetailPage({
  params,
}: {
  params: Promise<{ city: string; spot: string }>;
}) {
  const { city, spot } = await params;

  const currentCity = tours.find(
    (tour) => tour.city.toLowerCase() === city.toLowerCase()
  );
  const currentSpot = currentCity?.spots.find(
    (item) => item.id.toLowerCase() === spot.toLowerCase()
  );

  if (!currentSpot) notFound();

  return (
    <main className="min-h-screen bg-[#faf7f2] pb-20">

      {/* Navigation & Header */}
      <div className="max-w-4xl mx-auto px-4 pt-8 md:pt-12">
        <Link
          href={`/tour/${city}`}
          className="text-sm font-medium text-slate-600 hover:text-[#d4af37] transition-colors flex items-center gap-2 mb-6"
        >
          ← Zurück zu {currentCity?.city}
        </Link>

        <h1 className="text-2xl md:text-5xl font-extrabold text-slate-800 tracking-tight mb-6">
          {currentSpot.title}
        </h1>

        {/* Quick Info Bar */}
        <div className="flex flex-wrap gap-4 md:gap-8 mb-8 py-4 border-y border-slate-200">
          <div className="flex items-center gap-2 text-slate-700">
            <span className="text-xl">⏱</span>
            <span className="font-medium">Dauer: {currentSpot.duration}</span>
          </div>

          <div className="flex items-center gap-2 text-slate-700">
            <span className="text-xl">💰</span>
            <span className="font-semibold text-lg text-[#d4af37]">
              {currentSpot.price}
            </span>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="max-w-5xl mx-auto px-0 md:px-4 mb-10">
        <div className="relative h-75 md:h-125 w-full overflow-hidden md:rounded-3xl shadow-xl">
          <Image
            src={currentSpot.img}
            alt={currentSpot.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Text Content */}
      <article className="max-w-3xl mx-auto px-4">
        <div className="prose prose-slate lg:prose-lg">

          <h3 className="text-2xl font-bold text-slate-800 mb-4">
            Über diese Tour
          </h3>

          <p className="text-slate-700 leading-relaxed mb-6">
            Erlebe ein unvergessliches Abenteuer in{" "}
            <span className="font-semibold text-slate-900">
              {currentCity?.city}
            </span>
            . Diese Tour zum <span className="italic">{currentSpot.title}</span>{" "}
            gehört zu unseren beliebtesten Erlebnissen und verbindet Kultur,
            Geschichte und beeindruckende Natur auf einzigartige Weise.
          </p>

          {/* Info Box – jetzt in Gold statt Rot */}
          <div className="bg-[#f7e7b5]/40 border-l-4 border-[#d4af37] p-6 rounded-r-xl shadow-sm">
            <h4 className="text-[#d4af37] font-bold mb-2 text-lg">
              Warum diese Tour?
            </h4>
            <ul className="list-disc list-inside text-slate-700 space-y-2">
              <li>Erfahrene lokale Guides</li>
              <li>Kleine Gruppen für ein persönliches Erlebnis</li>
              <li>Alle Eintrittsgelder inklusive</li>
            </ul>
          </div>
        </div>

        {/* Call to Action Button */}
        <div className="mt-12">
          <button className="w-full md:w-auto bg-[#d4af37] text-white px-10 py-4 rounded-2xl font-bold hover:bg-[#b8922c] transition-all active:scale-95 shadow-lg">
            Jetzt unverbindlich anfragen
          </button>
        </div>
      </article>
    </main>
  );
}
