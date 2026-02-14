//'use client'
import Link from "next/link";
import { FaInstagram, FaFacebookF, FaXTwitter } from "react-icons/fa6";
import { HiOutlineMail, HiOutlineLocationMarker } from "react-icons/hi";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#cfcfcf] via-[#9e9e9e] to-[#6b6b6b] text-[#2f2f2f] py-12 border-t border-[#5a5a5a] mt-10">
      <div className="container mx-auto px-6">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* ### Spalte 1: Über uns */}
          <div>
            <h3 className="text-[#d4af37] text-xl font-bold mb-4 italic">
              <span className="text-[#d4af37]">Golden</span>Wings
            </h3>
            <p className="text-sm leading-relaxed text-[#f0f0f0]">
              Deine Experten für unvergessliche Abenteuer in den schönsten Städten Deutschlands.
              Wir bringen dich zu den Highlights, Geheimtipps und urbanen Erlebnissen.
            </p>
          </div>

          {/* ### Spalte 2: Kontakt Info */}
          <div>
            <h4 className="text-[#d4af37] font-semibold mb-4 text-lg">Kontakt</h4>
            <ul className="space-y-3">

              <li className="flex items-center gap-3">
                <HiOutlineMail className="text-[#d4af37]" size={20} />
                <a
                  href="mailto:info-goldenwings@gmx.de"
                  className="hover:text-[#d4af37] transition text-[#e5e5e5]"
                >
                  info-goldenwings@gmx.de
                </a>
              </li>

              <li className="flex items-start gap-3">
                <HiOutlineLocationMarker
                  className="text-[#d4af37] mt-1"
                  size={20}
                />
                <span className="text-[#e5e5e5]">
                  Kennedyallee 101
                  <br />
                  Frankfurt am Main, Germany
                </span>
              </li>

            </ul>
          </div>

          {/* ### Spalte 3: Social Media */}
          <div>
            <h4 className="text-[#d4af37] font-semibold mb-4 text-lg">Folge uns</h4>
            <div className="flex gap-4 mb-6">
              <a
                href="#"
                className="p-3 bg-[#8a8a8a] rounded-full hover:bg-[#d4af37] hover:text-white transition"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="#"
                className="p-3 bg-[#8a8a8a] rounded-full hover:bg-[#d4af37] hover:text-white transition"
              >
                <FaXTwitter size={20} />
              </a>
              <a
                href="#"
                className="p-3 bg-[#8a8a8a] rounded-full hover:bg-[#d4af37] hover:text-white transition"
              >
                <FaFacebookF size={20} />
              </a>
            </div>
          </div>

        </div>

        {/* ### Copyright */}
        <div className="border-t border-[#5a5a5a] mt-12 pt-8 text-center text-sm text-[#e5e5e5]">
          <p className="text-2xl text-[#d4af37]">GoldenWings</p>
          <p>
            © {new Date().getFullYear()} GoldenWings – Alle Rechte vorbehalten.
          </p>
          <div className="mt-2 space-x-4">
            <Link href="/privacy" className="hover:text-[#d4af37]">
              Datenschutz
            </Link>
            <Link href="/terms" className="hover:text-[#d4af37]">
              AGB
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
