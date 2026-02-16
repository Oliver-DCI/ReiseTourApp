"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const links = [
    { href: "/", link: "Home" },
    { href: "/tour", link: "Reise" },
    { href: "/about", link: "Über uns" },
    { href: "/contact", link: "Kontakt" },
  ];

  return (
    <header className="bg-gradient-to-r from-[#f8f5ef] via-[#e6dfd3] to-[#d4c7b4] backdrop-blur-md border-b sticky top-0 z-50 shadow-md">
      
      <nav className="max-w-[1400px] mx-auto px-7 py-8 flex justify-between items-center">
        
        {/* Logo */}
        <Link
          href="/"
          className="font-bold text-3xl italic tracking-wide"
        >
          <span className="text-[#c9a227]">GoldenWings</span>
        </Link>

        {/* Navigation */}
        <div className="hidden md:flex gap-10 font-medium">
          {links.map((l) => {
            const isActive = pathname === l.href;

            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative py-2 transition-all duration-300 ${
                  isActive
                    ? "text-[#c9a227] border-b-2 border-[#c9a227]"
                    : "text-[#4a4a4a] hover:text-[#c9a227]"
                }`}
              >
                {l.link}
              </Link>
            );
          })}
        </div>

        {/* Login Button */}
        <Link
          href="/login"
          className="px-6 py-2.5 rounded-full text-sm font-semibold 
                     bg-[#3a3a3a] text-white 
                     hover:bg-[#1f1f1f] transition shadow-md"
        >
          Login
        </Link>

      </nav>
    </header>
  );
}
