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
    (tour) => tour.city.toLowerCase() === city.toLowerCase(),
  );
  const currentSpot = currentCity?.spots.find(
    (item) => item.id.toLowerCase() === spot.toLowerCase(),
  );

  if (!currentSpot) notFound();

  return (
    <main className="min-h-screen bg-white pb-20">
      {/* Navigation & Header */}
      <div className="max-w-4xl mx-auto px-4 pt-8 md:pt-12">
        <Link
          href={`/tour/${city}`}
          className="text-sm font-medium text-slate-500 hover:text-red-600 transition-colors flex items-center gap-2 mb-6"
        >
          ← Zurück zu {currentCity?.city}
        </Link>

        <h1 className="text-2xl md:text-5xl font-extrabold text-slate-800 tracking-tight mb-6">
          {currentSpot.title}
        </h1>

        {/* Quick Info Bar */}
        <div className="flex flex-wrap gap-4 md:gap-8 mb-8 py-4 border-y border-slate-100">
          <div className="flex items-center gap-2 text-slate-600">
            <span className="text-xl">⏱</span>
            <span className="font-medium">Dauer: {currentSpot.duration}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <span className="text-xl">💰</span>
            <span className="font-medium font-mono text-lg text-slate-900">
              Preis: {currentSpot.price}
            </span>
          </div>
        </div>
      </div>

      {/* Hero Image Container */}
      <div className="max-w-5xl mx-auto px-0 md:px-4 mb-10">
        <div className="relative h-75 md:h-125 w-full overflow-hidden md:rounded-3xl shadow-2xl">
          <Image
            src={currentSpot.img}
            alt={currentSpot.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
          />
        </div>
      </div>

      {/* Text Content Area */}
      <article className="max-w-3xl mx-auto px-4">
        <div className="prose prose-slate lg:prose-lg">
          <h3 className="text-2xl font-bold text-slate-800 mb-4">
            Über diese Tour
          </h3>
          <p className="text-slate-600 leading-relaxed mb-6">
            Erlebe ein unvergessliches Abenteuer in{" "}
            <span className="font-semibold text-slate-900">
              {currentCity?.city}
            </span>
            . Diese Tour zum <span className="italic">{currentSpot.title}</span>{" "}
            ist eines unserer absoluten Highlights und bietet dir die perfekte
            Mischung aus Kultur, Geschichte und atemberaubender Natur.
          </p>

          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl">
            <h4 className="text-red-800 font-bold mb-2 text-lg">
              Warum diese Tour?
            </h4>
            <ul className="list-disc list-inside text-red-700 space-y-2">
              <li>Professionelle lokale Guides</li>
              <li>Kleine Gruppen für ein persönliches Erlebnis</li>
              <li>Alle Eintrittsgelder inklusive</li>
            </ul>
          </div>
        </div>

        {/* Call to Action Button */}
        <div className="mt-12">
          <button className="w-full md:w-auto bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-red-600 transition-all transform active:scale-95 shadow-lg shadow-slate-200">
            Jetzt unverbindlich anfragen
          </button>
        </div>
      </article>
    </main>
  );
}
