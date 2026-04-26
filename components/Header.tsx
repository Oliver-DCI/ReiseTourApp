"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
// Wir importieren die Hooks für die Modal-Steuerung
import { useAuthModal } from "@/app/context/AuthModalContext";
import { useAuth } from "@/app/context/AuthContext";
import { useUserSettingsModal } from "@/app/context/UserSettingsModalContext";
import UserSettingsModal from "@/components/UserSettingsModal";
import { HiOutlineUserCircle, HiOutlinePower } from "react-icons/hi2";

export default function Header() {
  const pathname = usePathname();
  
  // KORREKTUR: Nutze die Funktionen, die dein Context tatsächlich anbietet
  const { openModal } = useAuthModal(); 
  const { user, setUser } = useAuth();
  const { openSettings } = useUserSettingsModal();

  const links = [
    { href: "/", link: "Home" },
    { href: "/tour", link: "Nodes" },
    { href: "/about", link: "About" },
    { href: "/contact", link: "Comms" },
  ];

  return (
    <>
      <header className="sticky top-0 z-[60] bg-[#030712]/60 backdrop-blur-xl border-b border-white/5">
        <nav className="relative max-w-[1650px] mx-auto px-6 py-4 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2 z-10">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.5)] group-hover:rotate-90 transition-transform duration-500">
                <span className="text-white font-black text-xl">F</span>
            </div>
            <span className="font-black text-2xl uppercase tracking-tighter text-white">
              future<span className="text-blue-500">FLY</span>
            </span>
          </Link>

          {/* Navigation */}
          <div className="hidden md:flex items-center gap-2 bg-white/5 p-1 rounded-2xl border border-white/5">
            {links.map((l) => {
              const isActive = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`relative px-6 py-2 rounded-xl text-xs font-mono uppercase tracking-[0.2em] transition-all duration-300 ${
                    isActive ? "text-blue-400" : "text-white/40 hover:text-white"
                  }`}
                >
                  <span className="relative z-10">{l.link}</span>
                  {isActive && (
                    <motion.div 
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-blue-500/10 border border-blue-500/20 rounded-xl"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* User Interface */}
          <div className="z-10">
            {user ? (
              <div className="flex items-center gap-4">
                <button
                  onClick={openSettings} // KORREKTUR: Direkter Funktionsaufruf ohne (true)
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-all group"
                >
                  <HiOutlineUserCircle className="text-blue-400 group-hover:scale-110 transition-transform" size={20} />
                  <span className="text-xs font-mono text-white/70">{user.username}</span>
                </button>

                <button 
                  onClick={async () => { 
                    await fetch("/api/auth/logout", { method: "POST" }); 
                    setUser(null); 
                  }} 
                  className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all"
                  title="Terminate Session"
                > 
                  <HiOutlinePower size={18} />
                </button>
              </div>
            ) : (
              <button
                onClick={openModal} // KORREKTUR: openModal statt setIsOpen
                className="px-8 py-2.5 rounded-xl text-xs font-mono uppercase tracking-widest 
                           bg-blue-600 text-white hover:bg-blue-500 
                           transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] active:scale-95"
              >
                Access System
              </button>
            )}
          </div>
        </nav>
      </header>

      <UserSettingsModal />
    </>
  );
}