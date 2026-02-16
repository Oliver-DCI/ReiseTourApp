import { tours } from "@/data/tours";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";

import Weather from "@/components/Weather";
import WeatherForecast from "@/components/WeatherForecast";

type IdParamsCity = {
  params: Promise<{ city: string }>;
};

export default async function CityPage({ params }: IdParamsCity) {
  const { city } = await params;

  const currentCity = tours.find(
    (tour) => tour.city.toLowerCase() === city.toLowerCase()
  );

  if (!currentCity) notFound();

  return (
    <main className="min-h-screen bg-[#faf7f2] p-0 m-0">

      {/* Hero Section */}
      <div className="relative h-[40vh] md:h-[50vh] w-full m-0 p-0">
        <Image
          src={currentCity.img}
          alt={currentCity.city}
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white p-4">
          <Link
            href="/tour"
            className="absolute top-8 left-8 bg-white/20 hover:bg-white/40 backdrop-blur-md px-4 py-2 rounded-full transition text-sm font-medium"
          >
            ← Alle Ziele
          </Link>

          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter shadow-sm">
            {currentCity.city}
          </h1>
        </div>
      </div>

      {/* Content */}
      <section className="max-w-5xl mx-auto px-6 py-12">

        {/* Intro */}
        <div className="mb-16">
          <h2 className="text-sm uppercase tracking-widest text-[#d4af37] font-bold mb-2">
            Entdecken
          </h2>

          <p className="text-xl md:text-2xl text-slate-700 leading-relaxed font-light">
            {currentCity.description}
          </p>
        </div>

        {/* Wetter + Vorhersage */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <Weather city={currentCity.city} />
          <WeatherForecast city={currentCity.city} />
        </div>

        {/* Erlebnisse */}
        <h3 className="text-3xl font-bold text-slate-900 mb-8 border-b pb-4">
          Verfügbare Erlebnisse
        </h3>

        <div className="grid gap-6">
          {currentCity.spots.map((spot) => (
            <Link
              href={`/tour/${city}/${spot.id}`}
              key={spot.id}
              className="group block"
            >
              <div className="flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-[#d4af37] hover:shadow-xl transition-all duration-300">

                {/* Bild */}
                <div className="relative w-full md:w-64 h-48 md:h-auto">
                  <Image
                    src={spot.img}
                    alt={spot.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>

                {/* Info */}
                <div className="p-6 flex flex-col justify-center grow">

                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-xl font-bold text-slate-800 group-hover:text-[#d4af37] transition-colors">
                      {spot.title}
                    </h4>

                    <span className="bg-[#f7e7b5] text-slate-800 px-3 py-1 rounded-lg text-sm font-bold border border-[#d4af37] shadow-sm">
                      {spot.price}
                    </span>
                  </div>

                  <div className="flex items-center text-slate-500 text-sm gap-4">
                    <span className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {spot.duration}
                    </span>

                    <span className="text-[#d4af37] font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                      Details anzeigen →
                    </span>
                  </div>

                </div>
              </div>
            </Link>
          ))}
        </div>

      </section>
    </main>
  );
}
