"use client";

import { motion } from "framer-motion";
import ContactForm from "@/components/ContactForm";
import {
  HiOutlineChatAlt2,
  HiOutlineCalendar,
  HiOutlineSparkles,
} from "react-icons/hi";

export default function ContactPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <main className="min-h-screen bg-[#030712] text-white pb-20 overflow-hidden relative">
      
      {/* Ambient Background Effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[100px] -z-10" />

      {/* Header Bereich */}
      <div className="relative py-24 border-b border-white/5">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto px-6 text-center"
        >
          <h4 className="text-blue-400 font-mono text-xs uppercase tracking-[0.5em] mb-4">
            Direct Uplink
          </h4>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8 leading-none">
            Connect to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">futureFLY</span>
          </h1>
          <p className="text-lg text-white/50 max-w-2xl mx-auto leading-relaxed font-light">
            Bereit für den nächsten Layer deiner Reiseplanung? Unser Team steht für 
            hochpräzise Beratung und individuelle Systemkonfigurationen bereit.
          </p>
        </motion.div>
      </div>

      <div className="container mx-auto px-6 -mt-12 relative z-10">
        <div className="grid lg:grid-cols-3 gap-10">

          {/* Linke Spalte: Infokarten (Holographic Cards) */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-1 space-y-6"
          >
            {[
              { icon: HiOutlineChatAlt2, title: "Support Interface", text: "Echtzeit-Beratung für urbane Hotspots in Berlin, Hamburg und darüber hinaus.", color: "blue" },
              { icon: HiOutlineCalendar, title: "Sync Schedule", text: "Buche einen verschlüsselten Video-Call für deine strategische Routenplanung.", color: "cyan" },
              { icon: HiOutlineSparkles, title: "Custom Logic", text: "Exklusive Tour-Algorithmen, exakt auf deine persönlichen Präferenzen kalibriert.", color: "blue" }
            ].map((card, idx) => (
              <motion.div 
                key={idx}
                variants={itemVariants}
                whileHover={{ scale: 1.02, x: 10 }}
                className="bg-white/5 backdrop-blur-xl p-8 rounded-[2rem] border border-white/10 hover:border-blue-500/50 transition-all group"
              >
                <card.icon className={`text-${card.color}-400 mb-4 group-hover:scale-110 transition-transform`} size={36} />
                <h3 className="font-bold text-xl mb-3 tracking-tight">{card.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{card.text}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Rechte Spalte: Formular (The Terminal) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="relative group">
              {/* Outer Glow */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-[3rem] blur opacity-10 group-hover:opacity-30 transition duration-1000"></div>
              
              <div className="relative p-10 md:p-16 rounded-[3rem] bg-slate-900 border border-white/10 shadow-2xl overflow-hidden">
                
                {/* --- FIX: CSS-basiertes Grid statt fehlender grid.svg --- */}
                <div 
                  className="absolute inset-0 opacity-10 pointer-events-none"
                  style={{
                    backgroundImage: `
                      linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '30px 30px'
                  }}
                />
                
                <div className="relative z-10">
                  <h2 className="text-3xl font-bold mb-10 tracking-tighter flex items-center gap-3">
                    <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                    Send Transmission
                  </h2>

                  <div className="future-form-wrapper">
                    <ContactForm />
                  </div>

                  <div className="mt-10 pt-8 border-t border-white/5 flex items-center justify-between">
                    <p className="text-white/20 text-xs font-mono uppercase tracking-widest">
                      Response-Latency: ~24h
                    </p>
                    <div className="flex gap-1">
                      <div className="w-1 h-1 bg-blue-500/40 rounded-full" />
                      <div className="w-1 h-1 bg-blue-500/40 rounded-full" />
                      <div className="w-1 h-1 bg-blue-500/40 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </main>
  );
}