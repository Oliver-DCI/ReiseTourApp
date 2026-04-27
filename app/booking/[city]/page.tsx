"use client";

import React, { use } from "react"; // React explizit importiert
import { tours } from "@/data/tours";
import { notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { HiOutlineArrowLeft, HiOutlineShieldCheck, HiOutlineRocketLaunch } from "react-icons/hi2";

// Wir definieren die Komponente explizit
function BookingPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  // Params mit dem neuen Next.js 15 Hook 'use' entpacken
  const resolvedParams = use(params);
  const city = resolvedParams.city;

  const currentCity = tours.find(
    (tour) => tour.city.toLowerCase() === city.toLowerCase()
  );

  if (!currentCity) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-[#030712] text-white pt-32 pb-20 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-600/10 blur-[120px] -z-10" />

      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <Link
            href={`/tour/${city}`}
            className="group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white/40 hover:text-blue-400 transition-colors mb-8"
          >
            <HiOutlineArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            Abort & Return to {currentCity.city}
          </Link>

          <h4 className="text-blue-400 font-mono text-xs uppercase tracking-[0.5em] mb-4">
            Final Protocol
          </h4>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">
            Confirm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Mission</span>
          </h1>
        </motion.div>

        {/* Booking Card */}
        <div className="grid md:grid-cols-5 gap-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-3 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-10 md:p-12 shadow-2xl"
          >
            <div className="space-y-8">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/30 block mb-2">Target Sector</span>
                <p className="text-3xl font-bold uppercase">{currentCity.city}</p>
              </div>

              <div className="pt-8 border-t border-white/5">
                <div className="flex items-start gap-4 mb-6">
                  <HiOutlineShieldCheck className="text-blue-400 mt-1" size={24} />
                  <div>
                    <h3 className="font-bold uppercase tracking-tight">Verschlüsselte Buchung</h3>
                    <p className="text-sm text-white/40 leading-relaxed">Deine Anfrage wird über ein gesichertes Protokoll an unsere Dispatcher gesendet.</p>
                  </div>
                </div>
                
                <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black uppercase text-xs tracking-[0.3em] py-6 rounded-2xl shadow-[0_0_40px_rgba(37,99,235,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3">
                  <HiOutlineRocketLaunch size={20} />
                  Initiate Checkout
                </button>
              </div>
            </div>
          </motion.div>

          {/* Side Info */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="md:col-span-2 space-y-6"
          >
            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8">
              <h4 className="text-[10px] font-mono uppercase tracking-widest text-blue-400 mb-4">Intelligence Note</h4>
              <p className="text-xs text-white/40 leading-relaxed italic">
                "Die finale Konfiguration deines Aufenthaltes in {currentCity.city} wird nach Bestätigung innerhalb von 24 Stunden synchronisiert."
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}

// Hier ist der entscheidende Teil für Next.js:
export default BookingPage;