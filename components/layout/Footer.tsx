import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";
import { STORE_ADDRESS, STORE_EMAIL, STORE_INSTAGRAM, STORE_PHONE } from "@/lib/constants";
import { CloudMotif, FretBorder } from "@/components/ui/ChineseMotifs";
import { getCategories } from "@/lib/catalog/queries";
import { LEGAL_PAGES } from "@/lib/legal";

export default async function Footer() {
  const categories = await getCategories();

  return (
    <footer className="relative bg-[#0A0A0A] text-[#FAFAF9] mt-24 overflow-hidden">
      <FretBorder className="block text-motif" />
      <CloudMotif className="pointer-events-none absolute bottom-20 right-6 w-72 text-[#C8A882] opacity-10 hidden md:block" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="mb-5 flex items-center gap-4">
              <Image
                src="/images/logo-hoaly-lotus.png"
                alt=""
                width={370}
                height={250}
                className="h-12 w-auto"
              />
              <span className="leading-none">
                <span
                  className="block text-3xl font-bold tracking-[0.2em] text-white"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  HOA LY
                </span>
                <span className="block text-[11px] font-light tracking-[0.55em] uppercase text-[#9A9A9A]" style={{ fontFamily: "var(--font-poppins)" }}>
                  Paris
                </span>
              </span>
            </div>
            <p className="text-sm text-[#9A9A9A] leading-relaxed max-w-xs">
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
            <p className="text-xs tracking-widest uppercase mb-5 text-[#9A9A9A]">Catalogue</p>
            <ul className="space-y-3">
              {categories.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/catalogue/${item.slug}`}
                    className="link-underline text-sm text-[#FAFAF9]/70 hover:text-white transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/collections"
                  className="link-underline text-sm text-[#FAFAF9]/70 hover:text-white transition-colors duration-300"
                >
                  Toutes les collections
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs tracking-widest uppercase mb-5 text-[#9A9A9A]">Contact</p>
            <ul className="space-y-3 text-sm text-[#FAFAF9]/70">
              <li className="flex items-start gap-2">
                <MapPin size={14} className="mt-0.5 shrink-0 text-[#C8A882]" />
                <Link href="/boutique" className="link-underline hover:text-white transition-colors duration-300">
                  {STORE_ADDRESS}
                </Link>
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

        <div className="border-t border-[#FAFAF9]/10 mt-12 pt-8 flex flex-col lg:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#9A9A9A] text-center lg:text-left">
            © {new Date().getFullYear()} Hoa Ly - SARL au capital de 95 000 €. Tous droits réservés.
          </p>
          <nav aria-label="Informations légales">
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {[...LEGAL_PAGES, { href: "/admin", label: "Administration" }].map((page) => (
                <li key={page.href}>
                  <Link
                    href={page.href}
                    className="link-underline text-xs text-[#9A9A9A] hover:text-white transition-colors duration-300"
                  >
                    {page.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
