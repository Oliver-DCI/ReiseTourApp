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
    { href: "/tour/cusco", link: "Cusco" },
    { href: "/tour/arequipa", link: "Arequipa" },
    { href: "/tour/puno", link: "Puno" },
  ];

  return (
    <section>
      {/* Eine Sub-Navigation für die Regionen */}
      <nav className="bg-slate-100 py-4 border-b">
        <div className="container mx-auto flex justify-center gap-8 font-medium text-slate-600">
          {links.map((l) => {
            const isActive = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative py-2 transition-all font-medium  duration-300 group ${
                  isActive
                    ? "text-red-600 border-b-2 border-red-600"
                    : "hover:text-red-600 text-gray-600"
                }`}
              >
                {l.link}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="py-8">
        {children} {/* Hier wird die jeweilige Unterseite geladen */}
      </div>
    </section>
  );
}
