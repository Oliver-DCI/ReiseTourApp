"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthModal } from "@/app/context/AuthModalContext";
import { useAuth } from "@/app/context/AuthContext";
import { useUserSettingsModal } from "@/app/context/UserSettingsModalContext";
import UserSettingsModal from "@/components/UserSettingsModal";

export default function Header() {
  const pathname = usePathname();
  const { setIsOpen } = useAuthModal();
  const { user, setUser } = useAuth();
  const { setIsOpen: openSettings } = useUserSettingsModal();

  const links = [
    { href: "/", link: "Home" },
    { href: "/tour", link: "Reise" },
    { href: "/about", link: "Über uns" },
    { href: "/contact", link: "Kontakt" },
  ];

  return (
    <>
      <header className="bg-gradient-to-r from-[#f8f5ef] via-[#e6dfd3] to-[#d4c7b4] backdrop-blur-md border-b sticky top-0 z-50 shadow-md">
        <nav className="relative max-w-[1650px] mx-auto px-2 py-5 flex items-center">

          {/* Logo */}
          <Link href="/" className="font-bold text-3xl italic tracking-wide z-10">
            <span className="text-[#d4af37]">Golden</span>
            <span className="text-[#3a3a3a]">Wings</span>
          </Link>

          {/* Navigation – absolut zentriert */}
          <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex gap-12 font-bold">
            {links.map((l) => {
              const isActive = pathname === l.href;

              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`relative py-2 transition-all duration-300 ${
                    isActive
                      ? "text-[#c9a227] border-b-2 border-[#c9a227]"
                      : "text-[#3a3a3a] hover:text-[#c9a227]"
                  }`}
                >
                  {l.link}
                </Link>
              );
            })}
          </div>

          {/* Rechts: Login oder User */}
          <div className="ml-auto z-10">
            {user ? (
              <div className="flex items-center gap-6">

                {/* Username → öffnet UserSettingsModal */}
                <button
                  onClick={() => openSettings(true)}
                  className="text-[#3a3a3a] font-semibold text-[16px] hover:text-[#c9a227] transition"
                >
                  Hallo, {user.username}
                </button>

                {/* Logout */}
                <button onClick={async () => { 
                  await fetch("/api/auth/logout", { method: "POST" }); 
                  setUser(null); }} className="px-6 py-2.5 rounded-full text-sm font-semibold bg-[#3a3a3a]
                 text-white hover:bg-[#1f1f1f] transition shadow-md" > 
                 Logout 
                  </button>
              </div>
            ) : (
              <button
                onClick={() => setIsOpen(true)}
                className="px-6 py-2.5 rounded-full text-sm font-semibold 
                           bg-[#3a3a3a] text-white 
                           hover:bg-[#1f1f1f] transition shadow-md"
              >
                Login
              </button>
            )}
          </div>

        </nav>
      </header>

      {/* User Settings Modal */}
      <UserSettingsModal />
    </>
  );
}
