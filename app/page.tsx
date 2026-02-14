"use client";

import { useState, useEffect } from "react";
import { tours } from "@/data/tours";
import Link from "next/link";
import Image from "next/image";

const sliderImages = [
  { city: "Berlin", img: "/berlin.jpeg" },
  { city: "Frankfurt", img: "/frankfurt.jpeg" },
  { city: "München", img: "/muenchen.jpeg" },
  { city: "Hamburg", img: "/hamburg.jpeg" },
];

export default function ReisePage() {
  const [index, setIndex] = useState(0);

  // Slider wechselt alle 3 Sekunden
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % sliderImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-10 px-6">

      {/* Hero Slider – schmäler + kleinerer Overlay */}
      <div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-[0_6px_25px_rgba(0,0,0,0.08)] mb-8">
        <Image
          src={sliderImages[index].img}
          alt={sliderImages[index].city}
          fill
          priority
          className="object-cover object-center transition-all duration-700 ease-in-out"
        />

        {/* Kleinerer, eleganter Stadtname unten rechts */}
        <div className="absolute bottom-5 right-5 bg-black/40 text-white px-5 py-2 rounded-lg text-xl font-semibold tracking-wide backdrop-blur-sm border border-[#d4af37] shadow-md">
          {sliderImages[index].city}
        </div>
      </div>

      {/* Karten-Grid – näher am Hero */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 mb-8">
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

      {/* Textblock – elegantes Div + näher an Karten */}
      <div className="max-w-3xl mx-auto mb-4 p-6 rounded-xl bg-white/60 backdrop-blur-md shadow-[0_4px_18px_rgba(0,0,0,0.06)] border border-[#e6e6e6]">
        <p className="text-center text-slate-700 leading-relaxed text-[15px] italic">
          Deutschland ist ein Land voller Kontraste – von pulsierenden Metropolen
          bis hin zu stillen Landschaften, die Geschichten erzählen. Jede Stadt
          öffnet ein neues Kapitel voller Kultur, Geschichte und einzigartiger
          Erlebnisse.
        </p>
      </div>

    </div>
  );
}
