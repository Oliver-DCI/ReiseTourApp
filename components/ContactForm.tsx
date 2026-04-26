"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
// Korrigierte Imports für Heroicons v2
import { 
  HiOutlineUser, 
  HiOutlineEnvelope,         
  HiOutlineChatBubbleOvalLeftEllipsis 
} from "react-icons/hi2";
import { IoPaperPlaneOutline } from "react-icons/io5";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulation einer Transmission
    setTimeout(() => {
      setIsSubmitting(false);
      alert(
        "Transmission Successful. Wir haben deine Daten empfangen und melden uns im nächsten Zeitfenster."
      );
    }, 1500);
  };

  return (
    <div className="container mx-auto py-12 px-4 max-w-2xl relative">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-blue-500/5 blur-[120px] -z-10" />

      {/* Header Area */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h4 className="text-blue-400 font-mono text-[10px] uppercase tracking-[0.5em] mb-3">
          Comms Interface
        </h4>
        <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
          Send <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Transmission</span>
        </h1>
        <p className="text-white/40 mt-4 font-light text-sm tracking-wide">
          Initiiere eine direkte Verbindung zu unserem Operations-Team.
        </p>
      </motion.div>

      {/* Glass Form */}
      <motion.form
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="space-y-8 bg-white/5 backdrop-blur-2xl p-10 md:p-12 rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden"
        onSubmit={handleSubmit}
      >
        {/* Glow Effect Corner */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name Field */}
          <div className="space-y-2">
            <label className="text-[10px] font-mono uppercase tracking-widest text-white/30 ml-2">
              Identity Token
            </label>
            <div className="relative flex items-center group">
              <HiOutlineUser className="absolute ml-4 text-white/20 group-focus-within:text-blue-400 transition-colors" size={18} />
              <input
                type="text"
                placeholder="Name / Alias"
                className="w-full bg-white/5 pl-12 pr-4 py-4 border border-white/10 rounded-2xl focus:border-blue-500 outline-none transition-all text-white placeholder:text-white/10"
                required
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label className="text-[10px] font-mono uppercase tracking-widest text-white/30 ml-2">
              Neural Address
            </label>
            <div className="relative flex items-center group">
              {/* ⭐ HIER KORRIGIERT: HiOutlineEnvelope statt HiOutlineMail */}
              <HiOutlineEnvelope className="absolute ml-4 text-white/20 group-focus-within:text-blue-400 transition-colors" size={18} />
              <input
                type="email"
                placeholder="name@nexus.com"
                className="w-full bg-white/5 pl-12 pr-4 py-4 border border-white/10 rounded-2xl focus:border-blue-500 outline-none transition-all text-white placeholder:text-white/10"
                required
              />
            </div>
          </div>
        </div>

        {/* Message Field */}
        <div className="space-y-2">
          <label className="text-[10px] font-mono uppercase tracking-widest text-white/30 ml-2">
            Data Packet
          </label>
          <div className="relative flex group">
            {/* ⭐ HIER KORRIGIERT: HiOutlineChatBubbleOvalLeftEllipsis statt HiOutlineChatAlt2 */}
            <HiOutlineChatBubbleOvalLeftEllipsis
              className="absolute ml-4 mt-4 text-white/20 group-focus-within:text-blue-400 transition-colors"
              size={18}
            />
            <textarea
              rows={5}
              maxLength={300}
              placeholder="Inhalt der Übertragung..."
              className="w-full bg-white/5 pl-12 pr-4 py-4 border border-white/10 rounded-2xl focus:border-blue-500 outline-none transition-all resize-none text-white placeholder:text-white/10"
              required
            />
          </div>
        </div>

        {/* Action Button */}
        <motion.button
          whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(37,99,235,0.3)" }}
          whileTap={{ scale: 0.98 }}
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 transition-all uppercase text-xs tracking-[0.3em] relative overflow-hidden group"
          type="submit"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Encrypting...
            </span>
          ) : (
            <>
              <IoPaperPlaneOutline size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              Start Transmission
            </>
          )}
        </motion.button>
      </motion.form>
    </div>
  );
}