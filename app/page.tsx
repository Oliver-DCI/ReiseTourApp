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

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % sliderImages.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-white min-h-screen">

      {/* HERO SLIDER – gleiche Breite wie Karten */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative w-full h-115 overflow-hidden mb-12 rounded-2xl mt-10">
          <Image
            src={sliderImages[index].img}
            alt={sliderImages[index].city}
            fill
            className="object-cover object-center"
            priority
          />

          <div className="absolute inset-0 bg-black/20" />

          <div className="absolute bottom-8 right-10 bg-[#c9a227]/75 text-white px-4 py-2 rounded-md text-lg font-semibold tracking-wide backdrop-blur-sm border border-white/30 shadow-lg">
            {sliderImages[index].city}
          </div>
        </div>
      </div>

      {/* INTRO TEXTBLOCK */}
      <div className="max-w-3xl mx-auto mb-16 p-8 rounded-xl bg-[#f8f5ef]/95 backdrop-blur-sm shadow-[0_4px_18px_rgba(0,0,0,0.06)] border border-[#e0d8c8] text-center">
        <h2 className="text-2xl font-serif font-bold text-[#c9a227] mb-3 tracking-wide">
          GoldenWings Städtereisen
        </h2>

        <p className="text-[17px] text-slate-700 leading-relaxed font-serif">
          Reisen Sie mit GoldenWings und entdecken Sie unsere exklusiv für Sie zusammengestellten Städtereisen nach Berlin, Frankfurt, Hamburg und München.
        </p>
      </div>

      {/* KARTEN-GRID – identisch wie TourPage */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
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

              <span className="absolute top-3 left-3 bg-[#c9a227] text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                {item.city}
              </span>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col grow">
              <h2 className="text-xl font-bold text-slate-700 mb-2 group-hover:text-[#c9a227] transition-colors">
                {item.city}
              </h2>

              <p className="text-sm text-slate-600 leading-relaxed grow">
                {item.description.length > 12
                  ? item.description.slice(0, 90) + "..."
                  : item.description}
              </p>

              <Link
                href={`/tour/${item.city.toLowerCase()}`}
                className="mt-4 inline-block text-center w-full bg-[#f7e7b5] text-slate-800 font-semibold py-2 px-3 rounded-lg text-sm hover:bg-[#c9a227] hover:text-white transition-all duration-300 active:scale-95"
              >
                Informationen anzeigen
              </Link>
            </div>
          </article>
        ))}
      </div>

    </div>
  );
}
