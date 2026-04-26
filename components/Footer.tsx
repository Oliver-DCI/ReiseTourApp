"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaInstagram, FaFacebookF, FaXTwitter } from "react-icons/fa6";
import { HiOutlineEnvelope, HiOutlineMapPin } from "react-icons/hi2";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#030712] text-white/50 py-16 border-t border-white/5 relative overflow-hidden">
      
      {/* Subtiler Glow-Effekt im Hintergrund */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-32 bg-blue-500/5 blur-[120px] -z-10" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">

          {/* Brand Section */}
          <div className="space-y-6">
            <h3 className="text-2xl font-black tracking-tighter text-white uppercase">
              future<span className="text-blue-500">FLY</span>
            </h3>
            <p className="text-sm leading-relaxed font-light max-w-xs">
              Die nächste Generation der urbanen Fortbewegung. 
              Wir vernetzen die Metropolen Deutschlands in einem 
              einzigartigen digitalen Ökosystem.
            </p>
          </div>

          {/* Navigation / Kontakt */}
          <div className="space-y-6">
            <h4 className="text-white text-xs font-mono uppercase tracking-[0.3em]">Network Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-4 group">
                <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:border-blue-500/50 transition-colors">
                  <HiOutlineEnvelope className="text-blue-400" size={18} />
                </div>
                <a
                  href="mailto:ops@futurefly.com"
                  className="text-sm hover:text-white transition-colors font-mono"
                >
                  ops@futurefly.com
                </a>
              </li>

              <li className="flex items-start gap-4 group">
                <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:border-blue-500/50 transition-colors mt-1">
                  <HiOutlineMapPin className="text-blue-400" size={18} />
                </div>
                <span className="text-sm font-light">
                  Sector: Kennedyallee 101
                  <br />
                  60596 Frankfurt / Node-Alpha
                </span>
              </li>
            </ul>
          </div>

          {/* Social / Sync Section */}
          <div className="space-y-6">
            <h4 className="text-white text-xs font-mono uppercase tracking-[0.3em]">Social Sync</h4>
            <div className="flex gap-3">
              {[
                { icon: <FaInstagram size={18} />, label: "Instagram" },
                { icon: <FaXTwitter size={18} />, label: "X" },
                { icon: <FaFacebookF size={18} />, label: "Facebook" }
              ].map((social, i) => (
                <motion.a
                  key={i}
                  whileHover={{ y: -3, backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                  className="p-4 bg-white/5 border border-white/10 rounded-2xl text-white/70 hover:text-blue-400 hover:border-blue-500/50 transition-all cursor-pointer"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 mt-16 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[10px] font-mono uppercase tracking-widest text-white/20">
            © {currentYear} futureFLY Operations – All Systems Nominal
          </div>

          <div className="flex gap-8 text-[10px] font-mono uppercase tracking-widest">
            <Link href="/privacy" className="hover:text-blue-400 transition-colors">Privacy Protocol</Link>
            <Link href="/terms" className="hover:text-blue-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}