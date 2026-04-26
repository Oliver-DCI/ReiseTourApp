"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function ReiseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const links = [
    { href: "/tour/berlin", link: "Berlin" },
    { href: "/tour/frankfurt", link: "Frankfurt" },
    { href: "/tour/muenchen", link: "München" },
    { href: "/tour/hamburg", link: "Hamburg" },
  ];

  return (
    <section className="bg-[#030712] min-h-screen">
      
      {/* Vision Sub-Navigation */}
      <nav className="sticky top-0 z-[40] bg-[#030712]/60 backdrop-blur-xl border-b border-white/5 py-4">
        <div className="mx-auto max-w-[1400px] px-7 flex justify-center gap-10">
          {links.map((l) => {
            const isActive = pathname === l.href;

            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative px-4 py-2 transition-all duration-500 group`}
              >
                <span className={`relative z-10 text-xs font-mono uppercase tracking-[0.2em] transition-colors duration-300 ${
                  isActive ? "text-blue-400 font-black" : "text-white/40 group-hover:text-white"
                }`}>
                  {l.link}
                </span>

                {/* Animated Indicator */}
                {isActive && (
                  <motion.div 
                    layoutId="nav-glow"
                    className="absolute inset-0 bg-blue-500/10 rounded-xl border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                    initial={false}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                
                {/* Underline Effect */}
                {isActive && (
                  <motion.span 
                    layoutId="active-line"
                    className="absolute -bottom-4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent" 
                  />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Content Area */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="pt-0"
      >
        {children}
      </motion.div>
    </section>
  );
}