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
    { href: "/login", link: "Login" },
  ];

  return (
    <header className="bg-gradient-to-r from-white via-[#d6d6d6] to-[#b5b5b5] backdrop-blur-md border-b sticky top-0 z-50 text-[#3f3f3f] shadow-md">
      <nav className="container mx-auto px-8 py-6 flex justify-between items-center">
        <Link href="/" className="font-bold text-3xl flex items-center gap-2 italic">
          <span className="text-[#d4af37]">GoldenWings</span>
        </Link>

        <div className="hidden md:flex space-x-10 font-medium">
          {links.map((l) => {
            const isActive = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative py-2 transition-all duration-300 group ${
                  isActive
                    ? "text-[#d4af37] border-b-2 border-[#d4af37]"
                    : "hover:text-[#d4af37] text-[#5a5a5a]"
                }`}
              >
                {l.link}
              </Link>
            );
          })}
        </div>

        <button className="bg-[#d4af37] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-[#b8860b] transition">
          Jetzt Buchen
        </button>
      </nav>
    </header>
  );
}
