"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { tours } from "@/data/tours";
import Link from "next/link";
import Image from "next/image";
import { HiOutlineRocketLaunch } from "react-icons/hi2";

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
    }, 5000); // Etwas langsamer für mehr "Cinematic"-Feeling
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-[#030712] min-h-screen pb-20 text-white overflow-hidden">

      {/* HERO SLIDER – Das immersive Interface */}
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <div className="relative w-full h-[500px] overflow-hidden rounded-[3rem] border border-white/10 shadow-[0_0_50px_-12px_rgba(59,130,246,0.3)]">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <Image
                src={sliderImages[index].img}
                alt={sliderImages[index].city}
                fill
                className="object-cover grayscale-[20%]"
                priority
              />
              {/* Vision Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-black/20" />
            </motion.div>
          </AnimatePresence>

          {/* Cyber HUD Elements */}
          <div className="absolute top-8 left-8 flex items-center gap-3 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/70">System Active: Remote Scan</span>
          </div>

          <div className="absolute bottom-10 left-10">
             <motion.h4 
               key={`title-${index}`}
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               className="text-6xl md:text-8xl font-black uppercase tracking-tighter"
             >
               {sliderImages[index].city}
             </motion.h4>
          </div>

          {/* Index Indicator */}
          <div className="absolute bottom-10 right-10 flex gap-2">
            {sliderImages.map((_, i) => (
              <div 
                key={i} 
                className={`h-1 transition-all duration-500 rounded-full ${i === index ? "w-8 bg-blue-500" : "w-2 bg-white/20"}`} 
              />
            ))}
          </div>
        </div>
      </div>

      {/* INTRO TEXTBLOCK – Vision Style */}
      <div className="max-w-7xl mx-auto px-6 my-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full p-10 md:p-16 rounded-[3rem] bg-white/5 backdrop-blur-xl text-center border border-white/10 relative overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
          
          <h2 className="text-4xl md:text-5xl font-black mb-8 uppercase tracking-tighter">
            future<span className="text-blue-400">FLY</span> – Navigation neu definiert
          </h2>

          <p className="text-xl text-white/50 leading-relaxed max-w-4xl mx-auto font-light italic">
            Vergessen Sie klassische Reisen. Wir bieten Ihnen den Zugang zu den 
            wichtigsten urbanen Knotenpunkten Deutschlands – kuratiert, präzise 
            und mit der Ästhetik von morgen.
          </p>
        </motion.div>
      </div>

      {/* KARTEN-GRID – Node Selection */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {tours.map((item, i) => (
          <motion.article
            key={item.city}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="flex flex-col bg-white/5 rounded-[2.5rem] overflow-hidden border border-white/10 hover:border-blue-500/50 transition-all duration-500 group"
          >
            <div className="relative h-64 overflow-hidden">
              <Image
                src={item.img}
                alt={item.city}
                fill
                className="object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-110 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030712] to-transparent opacity-60" />
              <span className="absolute top-4 left-4 bg-blue-600 text-white text-[10px] font-mono font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                {item.city}
              </span>
            </div>

            <div className="p-8 flex flex-col grow">
              <h2 className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition-colors uppercase tracking-tight">
                {item.city}
              </h2>

              <p className="text-sm text-white/40 leading-relaxed grow font-light">
                {item.description.slice(0, 90)}...
              </p>

              <Link
                href={`/tour/${item.city.toLowerCase()}`}
                className="mt-8 flex items-center justify-center gap-2 w-full bg-white/5 hover:bg-blue-600 text-white py-4 rounded-2xl text-xs font-mono uppercase tracking-widest border border-white/10 hover:border-blue-500 transition-all group/btn"
              >
                <HiOutlineRocketLaunch className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                Initiate Link
              </Link>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}