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

      {/* Sub-Navigation */}
      <nav className="bg-white py-4 border-b border-[#e6e6e6] shadow-sm">
        <div className="mx-auto max-w-[1400px] px-7 flex justify-center gap-10 font-medium">
          {links.map((l) => {
            const isActive = pathname === l.href;

            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative py-2 transition-all duration-300 ${
                  isActive
                    ? "text-[#c9a227] font-semibold"
                    : "text-[#4a4a4a] hover:text-[#c9a227]"
                }`}
              >
                {l.link}

                {isActive && (
                  <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-[#c9a227] rounded-full" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Inhalt */}
      <div className="pt-0 pb-8">{children}</div>
    </section>
  );
}
