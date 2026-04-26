import { HiOutlineGlobeAlt, HiOutlineHeart } from "react-icons/hi";
import { motion } from "framer-motion"; // Falls du Framer Motion bereits nutzt

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-[#030712] text-white py-20 px-6 overflow-hidden">
      
      {/* Hintergrund-Glow (Passend zum Vision-Style) */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Bildbereich mit Cyber-Rahmen */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative h-[500px] bg-slate-900 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1622214366189-72b19cc61597?q=80&w=687&auto=format&fit=crop"
                alt="futureFLY Experience"
                className="w-full h-full object-cover opacity-60 grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent"></div>
            </div>
          </div>

          {/* Textbereich */}
          <div className="space-y-8">
            <div>
              <h4 className="text-blue-400 font-mono text-xs uppercase tracking-[0.4em] mb-4">
                Next-Gen Travel
              </h4>
              <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-6">
                future<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">FLY</span>
              </h1>
              <p className="text-lg text-white/60 leading-relaxed font-light italic border-l-2 border-blue-500/50 pl-6">
                Vergiss klassische Reisen. Wir transformieren urbane Erkundungen in 
                hochtechnologische Erlebnisse – präzise, stilvoll und visionär.
              </p>
            </div>

            <div className="space-y-6">
              {/* Punkt 1 */}
              <div className="flex items-start gap-5 p-4 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-blue-500/50 transition-all duration-300">
                <div className="bg-blue-500/20 p-3 rounded-2xl text-blue-400">
                  <HiOutlineGlobeAlt size={28} />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">Smart Expedition</h3>
                  <p className="text-sm text-white/40 leading-relaxed">
                    Unsere Algorithmen kuratieren Städte-Trips, die Architektur, 
                    Kultur und Innovation in Echtzeit verschmelzen.
                  </p>
                </div>
              </div>

              {/* Punkt 2 */}
              <div className="flex items-start gap-5 p-4 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-cyan-500/50 transition-all duration-300">
                <div className="bg-cyan-500/20 p-3 rounded-2xl text-cyan-400">
                  <HiOutlineHeart size={28} />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">Holographic Service</h3>
                  <p className="text-sm text-white/40 leading-relaxed">
                    Wir begleiten dich mit technologischer Expertise und 
                    menschlicher Leidenschaft – rund um die Uhr verfügbar.
                  </p>
                </div>
              </div>
            </div>

            {/* Vision-Button */}
            <button className="group relative flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-bold px-10 py-4 rounded-2xl shadow-[0_0_30px_rgba(37,99,235,0.3)] transition-all overflow-hidden">
              <span className="relative z-10 uppercase text-xs tracking-widest">
                Discover futureFLY
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}