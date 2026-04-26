import { tours } from "@/data/tours";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { HiOutlineArrowLeft, HiOutlineMapPin, HiOutlineTicket } from "react-icons/hi2";

import Weather from "@/components/Weather";
import WeatherForecast from "@/components/WeatherForecast";
import NotesBox from "@/components/NotesBox";

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
    <main className="min-h-screen bg-[#030712] text-white">

      {/* Hero Section - The Perspective */}
      <div className="relative h-[50vh] md:h-[65vh] w-full overflow-hidden">
        <Image
          src={currentCity.img}
          alt={currentCity.city}
          fill
          className="object-cover scale-105"
          priority
        />
        
        {/* Darker Overlay for Vision-Look */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-[#030712]" />

        <div className="absolute inset-0 flex flex-col justify-center items-center p-6">
          <Link
            href="/tour"
            className="absolute top-10 left-6 md:left-12 group flex items-center gap-2 bg-white/5 hover:bg-blue-500/20 backdrop-blur-xl border border-white/10 px-5 py-2.5 rounded-full transition-all text-xs font-mono uppercase tracking-widest"
          >
            <HiOutlineArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            Return to Fleet
          </Link>

          <h4 className="text-blue-400 font-mono text-xs uppercase tracking-[0.5em] mb-4">
            Destination Hub
          </h4>
          <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter text-center">
            {currentCity.city}
          </h1>
        </div>
      </div>

      {/* Content Grid */}
      <section className="max-w-6xl mx-auto px-6 -mt-20 relative z-10 pb-24">

        {/* Intelligence Briefing (Intro) */}
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-8 md:p-12 rounded-[3rem] shadow-2xl mb-12">
          <div className="flex items-center gap-3 mb-6 text-blue-400">
            <HiOutlineMapPin size={24} />
            <span className="text-xs font-mono uppercase tracking-widest">Sector Intelligence</span>
          </div>

          <p className="text-xl md:text-2xl text-white/80 leading-relaxed font-light max-w-4xl">
            {currentCity.description}
          </p>
        </div>

        {/* Environmental Data (Wetter) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          <div className="hover:scale-[1.01] transition-transform">
            <Weather city={currentCity.city} />
          </div>
          <div className="hover:scale-[1.01] transition-transform">
            <WeatherForecast city={currentCity.city} />
          </div>
        </div>

        {/* Active Nodes (Erlebnisse) */}
        <div className="flex items-end justify-between mb-10 border-b border-white/10 pb-6">
          <div>
            <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight">
              Available <span className="text-blue-500">Nodes</span>
            </h3>
            <p className="text-white/40 text-sm font-mono mt-2">Kuratierte Erlebnisse im Zielsektor</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {currentCity.spots.map((spot) => (
            <Link
              href={`/tour/${city}/${spot.id}`}
              key={spot.id}
              className="group"
            >
              <div className="h-full flex flex-col bg-white/5 rounded-[2.5rem] overflow-hidden border border-white/10 group-hover:border-blue-500/50 group-hover:shadow-[0_0_40px_-15px_rgba(59,130,246,0.5)] transition-all duration-500">

                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={spot.img}
                    alt={spot.title}
                    fill
                    className="object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-110 transition duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-[#030712]/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10">
                    <span className="text-blue-400 font-mono font-bold text-sm">
                      {spot.price}
                    </span>
                  </div>
                </div>

                <div className="p-8 grow flex flex-col">
                  <h4 className="text-2xl font-bold mb-4 group-hover:text-blue-400 transition-colors">
                    {spot.title}
                  </h4>

                  <div className="mt-auto flex items-center justify-between">
                    <span className="flex items-center gap-2 text-white/40 text-xs font-mono uppercase tracking-widest">
                      <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {spot.duration}
                    </span>

                    <span className="text-blue-500 text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                      Engage Protocol →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Transmission Hub (Notizen & Buchung) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Buchungs-Action */}
          <div className="lg:col-span-1 p-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-[3rem] shadow-2xl flex flex-col justify-center text-center">
            <HiOutlineTicket className="text-white/20 mx-auto mb-6" size={60} />
            <p className="text-lg font-bold mb-8 leading-tight">
              Bereit für die Finalisierung deiner Reisepläne?
            </p>
            <Link
              href={`/booking/${city}`}
              className="bg-white text-blue-600 font-black uppercase text-xs tracking-[0.2em] px-8 py-5 rounded-[1.5rem] hover:scale-105 transition-transform shadow-xl"
            >
              Confirm Booking
            </Link>
          </div>

          {/* Notizen-System */}
          <div className="lg:col-span-2">
            <NotesBox city={currentCity.city} />
          </div>

        </div>
      </section>
    </main>
  );
}