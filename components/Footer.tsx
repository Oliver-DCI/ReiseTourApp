import Link from "next/link";
import { FaInstagram, FaFacebookF, FaXTwitter } from "react-icons/fa6";
import { HiOutlineMail, HiOutlineLocationMarker } from "react-icons/hi";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#e6dfd3] via-[#d4c7b4] to-[#b8a894] text-[#3a3a3a] py-12 border-t border-[#a89b88]">
      <div className="container mx-auto px-6">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Über uns */}
          <div>
            <h3 className="text-xl font-bold mb-4 italic">
              <span className="text-[#d4af37]">Golden</span>
              <span className="text-[#3a3a3a]">Wings</span>
            </h3>

            <p className="text-sm leading-relaxed text-[#4a4a4a]">
              Deine Experten für unvergessliche Abenteuer in den schönsten Städten Deutschlands.
              Wir bringen dich zu den Highlights, Geheimtipps und urbanen Erlebnissen.
            </p>
          </div>

          {/* Kontakt */}
          <div>
            <h4 className="text-[#c9a227] font-semibold mb-4 text-lg">Kontakt</h4>
            <ul className="space-y-3">

              <li className="flex items-center gap-3">
                <HiOutlineMail className="text-[#c9a227]" size={20} />
                <a
                  href="mailto:info-goldenwings@gmx.de"
                  className="hover:text-[#c9a227] transition text-[#4a4a4a]"
                >
                  info-goldenwings@gmx.de
                </a>
              </li>

              <li className="flex items-start gap-3">
                <HiOutlineLocationMarker className="text-[#c9a227] mt-1" size={20} />
                <span className="text-[#4a4a4a]">
                  Kennedyallee 101
                  <br />
                  Frankfurt am Main, Germany
                </span>
              </li>

            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-[#c9a227] font-semibold mb-4 text-lg">Folge uns</h4>
            <div className="flex gap-4 mb-6">
              <a className="p-3 bg-[#c9a227] text-white rounded-full hover:bg-[#a8861a] transition">
                <FaInstagram size={20} />
              </a>
              <a className="p-3 bg-[#c9a227] text-white rounded-full hover:bg-[#a8861a] transition">
                <FaXTwitter size={20} />
              </a>
              <a className="p-3 bg-[#c9a227] text-white rounded-full hover:bg-[#a8861a] transition">
                <FaFacebookF size={20} />
              </a>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-[#a89b88] mt-12 pt-8 text-center text-sm text-[#4a4a4a]">
          <p className="text-xl font-bold italic">
            <span className="text-[#d4af37]">Golden</span>
            <span className="text-[#3a3a3a]">Wings</span>
          </p>

          <p>
            © {new Date().getFullYear()}{" "}
            <span className="text-[#3a3a3a]">Golden Wings</span> – Alle Rechte vorbehalten.
          </p>

          <div className="mt-2 space-x-4">
            <Link href="/privacy" className="hover:text-[#c9a227]">Datenschutz</Link>
            <Link href="/terms" className="hover:text-[#c9a227]">AGB</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
