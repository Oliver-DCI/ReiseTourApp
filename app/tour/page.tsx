"use client";

import { tours } from "@/data/tours";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { HiOutlineRocketLaunch } from "react-icons/hi2";

export default function ReisePage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <div className="max-w-7xl mx-auto py-12 px-6">

        {/* Vision Header Block */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-16 p-10 md:p-16 rounded-[3rem] 
             bg-white/5 backdrop-blur-xl text-center
             border border-white/10 overflow-hidden group"
        >
          {/* Background Glow Effect */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/20 rounded-full blur-[100px] group-hover:bg-blue-600/30 transition-colors duration-700" />
          
          <div className="relative z-10">
            <h4 className="text-blue-400 font-mono text-xs uppercase tracking-[0.5em] mb-4">
              Sector Overview
            </h4>
            <h1 className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tighter">
              Explore the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">futureFLY</span> Network
            </h1>

            <p className="max-w-3xl mx-auto text-lg text-white/50 leading-relaxed font-light italic border-t border-white/5 pt-6">
              Von hypermodernen Metropolen bis hin zu geschützten Natursektoren – 
              unser Netzwerk verbindet die wichtigsten Knotenpunkte Deutschlands 
              in einer neuen digitalen Ästhetik.
            </p>
          </div>
        </motion.div>

        {/* Card Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {tours.map((item) => (
            <motion.article
              key={item.city}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="flex flex-col bg-white/5 rounded-[2.5rem] overflow-hidden border border-white/10 hover:border-blue-500/50 transition-all duration-500 group"
            >
              {/* Asset Container */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={item.img}
                  alt={item.city}
                  fill
                  className="object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-110 transition duration-700"
                />

                {/* Cyber Badge */}
                <div className="absolute top-4 left-4 bg-blue-600 text-white text-[10px] font-mono font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                  {item.city}
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-60" />
              </div>

              {/* Data Content */}
              <div className="p-7 flex flex-col grow">
                <h2 className="text-2xl font-black uppercase tracking-tight mb-3 group-hover:text-blue-400 transition-colors">
                  {item.city}
                </h2>

                <p className="text-sm text-white/40 leading-relaxed font-light grow mb-6">
                  {item.description.slice(0, 95)}...
                </p>

                {/* Navigation Action */}
                <Link
                  href={`/tour/${item.city.toLowerCase()}`}
                  className="group/btn flex items-center justify-center gap-2 w-full bg-white/5 hover:bg-blue-600 text-white border border-white/10 hover:border-blue-500 py-4 rounded-2xl text-xs font-mono uppercase tracking-widest transition-all duration-300"
                >
                  <HiOutlineRocketLaunch className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                  Initiate Link
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Footer Alignment */}
        <div className="pb-20"></div>

      </div>
    </div>
  );
}