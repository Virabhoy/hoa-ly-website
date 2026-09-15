import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";
import { STORE_ADDRESS, STORE_EMAIL, STORE_INSTAGRAM, STORE_PHONE } from "@/lib/constants";
import { CloudMotif, FretBorder } from "@/components/ui/ChineseMotifs";

export default function Footer() {
  return (
    <footer className="relative bg-[#0A0A0A] text-[#FAFAF9] mt-24 overflow-hidden">
      <FretBorder className="block text-motif" />
      <CloudMotif className="pointer-events-none absolute bottom-20 right-6 w-72 text-[#C8A882] opacity-10 hidden md:block" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <Image
              src="/images/logo-hoaly.png"
              alt="Hoa Ly Paris"
              width={387}
              height={369}
              className="mb-4 w-28 h-auto"
              style={{ filter: "brightness(0) invert(1)" }}
            />
            <p className="text-sm text-[#6B6B6B] leading-relaxed max-w-xs">
              Prêt-à-porter féminin contemporain au cœur du 13e arrondissement de Paris.
            </p>
            <a
              href={`https://www.instagram.com/${STORE_INSTAGRAM}`}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline inline-flex items-center gap-2 mt-4 text-sm text-[#C8A882] hover:text-white transition-colors duration-300"
            >
              @{STORE_INSTAGRAM}
            </a>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs tracking-widest uppercase mb-5 text-[#6B6B6B]">Collections</p>
            <ul className="space-y-3">
              {[
                { label: "Nouveautés", slug: "nouveautes" },
                { label: "Robes", slug: "robes" },
                { label: "Hauts & Tops", slug: "hauts" },
                { label: "Pantalons", slug: "pantalons" },
                { label: "Vestes & Manteaux", slug: "vestes" },
                { label: "Accessoires", slug: "accessoires" },
              ].map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/catalogue/${item.slug}`}
                    className="link-underline text-sm text-[#FAFAF9]/70 hover:text-white transition-colors duration-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs tracking-widest uppercase mb-5 text-[#6B6B6B]">Contact</p>
            <ul className="space-y-3 text-sm text-[#FAFAF9]/70">
              <li className="flex items-start gap-2">
                <MapPin size={14} className="mt-0.5 shrink-0 text-[#C8A882]" />
                <span>{STORE_ADDRESS}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="shrink-0 text-[#C8A882]" />
                <a href={`tel:${STORE_PHONE.replace(/\s/g, "")}`} className="link-underline hover:text-white transition-colors duration-300">
                  {STORE_PHONE}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="shrink-0 text-[#C8A882]" />
                <a href={`mailto:${STORE_EMAIL}`} className="link-underline hover:text-white transition-colors duration-300">
                  {STORE_EMAIL}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#FAFAF9]/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#6B6B6B]">
            © {new Date().getFullYear()} Hoa Ly — SARL au capital de 95 000 €. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/mentions-legales" className="link-underline text-xs text-[#6B6B6B] hover:text-white transition-colors duration-300">
              Mentions légales
            </Link>
            <Link href="/admin" className="link-underline text-xs text-[#6B6B6B] hover:text-white transition-colors duration-300">
              Administration
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
