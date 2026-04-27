"use client";

import { motion } from "framer-motion";
import { tours } from "@/data/tours";
import { notFound } from "next/navigation";
import Image from "next/image";
import { use } from "react"; // WICHTIG: React 'use' Hook importieren
import Link from "next/link";
import { 
  HiOutlineClock, 
  HiOutlineTicket, 
  HiOutlineCheckBadge, 
  HiOutlineArrowLeft 
} from "react-icons/hi2";

export default function SpotDetailPage({
  params,
}: {
  params: Promise<{ city: string; spot: string }>; // Muss als Promise definiert sein
}) {
  // FEHLERBEHEBUNG: In Next.js 15 Client Components müssen params mit 'use' entpackt werden
  const resolvedParams = use(params);
  const city = resolvedParams.city;
  const spot = resolvedParams.spot;

  const currentCity = tours.find(
    (tour) => tour.city.toLowerCase() === city.toLowerCase()
  );
  
  const currentSpot = currentCity?.spots.find(
    (item) => item.id.toLowerCase() === spot.toLowerCase()
  );

  if (!currentSpot) return notFound();

  return (
    <main className="min-h-screen bg-[#030712] text-white pb-32 relative overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[150px] -z-10" />
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-cyan-600/5 rounded-full blur-[120px] -z-10" />

      {/* Navigation & Header */}
      <div className="max-w-5xl mx-auto px-6 pt-12 md:pt-20">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <Link
            href={`/tour/${city}`}
            className="group inline-flex items-center gap-2 text-sm font-mono uppercase tracking-[0.2em] text-white/40 hover:text-blue-400 transition-colors mb-8"
          >
            <HiOutlineArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            Back to {currentCity?.city} System
          </Link>

          <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-8 leading-none">
            {currentSpot.title.split(' ').map((word, i) => (
              <span key={i} className={i % 2 === 1 ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400" : ""}>
                {word}{" "}
              </span>
            ))}
          </h1>
        </motion.div>

        {/* Info Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-8 py-6 border-y border-white/10 mb-12"
        >
          <div className="flex items-center gap-3">
            <HiOutlineClock className="text-blue-400" size={24} />
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest text-white/30">Duration</span>
              <span className="font-bold font-mono">{currentSpot.duration}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <HiOutlineTicket className="text-cyan-400" size={24} />
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest text-white/30">Price Matrix</span>
              <span className="font-bold font-mono text-xl text-cyan-400">{currentSpot.price}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Hero Image */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="max-w-6xl mx-auto px-6 mb-16"
      >
        <div className="relative h-[400px] md:h-[600px] w-full overflow-hidden rounded-[3rem] border border-white/10 shadow-2xl group">
          <Image
            src={spot.startsWith('berlin') ? currentSpot.img : currentSpot.img} // Fallback-Check
            alt={currentSpot.title}
            fill
            className="object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent" />
        </div>
      </motion.div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2">
          <h3 className="text-blue-400 font-mono text-xs uppercase tracking-[0.4em] mb-6">
            Mission Overview
          </h3>
          <p className="text-xl text-white/70 leading-relaxed font-light mb-8">
            Erlebe eine hochgradig kuratierte Expedition in {" "}
            <span className="text-white font-medium">{currentCity?.city}</span>. 
            Diese Sequenz am <span className="italic text-blue-400">{currentSpot.title}</span> verbindet historische Daten mit futuristischer Ästhetik.
          </p>
        </div>

        {/* Sidebar */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] self-start"
        >
          <div className="flex items-center gap-2 mb-6">
            <HiOutlineCheckBadge className="text-blue-400" size={24} />
            <h4 className="text-sm font-bold uppercase tracking-widest">Protocol Stats</h4>
          </div>
          <ul className="space-y-4">
            {["Premium Stealth Guides", "Small Squad Sizes", "All-Access Pass"].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-xs font-mono text-white/40">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                {item}
              </li>
            ))}
          </ul>
          <button className="w-full mt-10 bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.3em] transition-all">
            Start Mission
          </button>
        </motion.div>
      </div>
    </main>
  );
}