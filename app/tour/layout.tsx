"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
    <section className="bg-white min-h-screen">

      {/* Sub-Navigation im GoldenWings-Stil */}
      <nav className="bg-white py-4 border-b border-[#e6e6e6] shadow-sm">
        <div className="container mx-auto flex justify-center gap-10 font-medium text-slate-700">
          {links.map((l) => {
            const isActive = pathname === l.href;

            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative py-2 transition-all duration-300 group ${
                  isActive
                    ? "text-[#d4af37] font-semibold"
                    : "hover:text-[#d4af37] text-slate-700"
                }`}
              >
                {l.link}

                {/* Goldene Unterstreichung beim aktiven Link */}
                {isActive && (
                  <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-[#d4af37] rounded-full"></span>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Inhalt */}
      <div className="py-8">{children}</div>
    </section>
  );
}
