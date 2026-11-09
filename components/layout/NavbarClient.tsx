"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, Phone, MapPin } from "lucide-react";
import { STORE_INSTAGRAM, STORE_PHONE } from "@/lib/constants";

export interface NavLink {
  label: string;
  href: string;
}

interface NavbarClientProps {
  links: NavLink[];
  /** Message du bandeau défini dans l'admin, sinon le message par défaut. */
  announcement: string | null;
}

export default function NavbarClient({ links, announcement }: NavbarClientProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white">
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-[#0A0A0A] focus:text-white focus:px-4 focus:py-2 focus:text-xs focus:tracking-widest focus:uppercase"
      >
        Aller au contenu
      </a>
      {/* Bandeau d'annonce */}
      <div className="bg-motif text-white">
        <p className="max-w-7xl mx-auto px-6 py-2.5 text-center text-[10px] sm:text-[11px] tracking-[0.25em] uppercase">
          {announcement ?? (
            <>
              Boutique ouverte du lundi au samedi · 50 avenue de Choisy, Paris 13<sup>e</sup>
            </>
          )}
        </p>
      </div>

      {/* Ligne principale : logo et accès rapides */}
      <div className="border-b border-[#EFEAE6]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between gap-6 py-5 lg:py-7">
          <Link href="/" className="flex items-center gap-3 lg:gap-4">
            <Image
              src="/images/logo-hoaly-lotus.png"
              alt=""
              width={370}
              height={250}
              className="h-9 lg:h-12 w-auto"
              preload
            />
            <span className="leading-none">
              <span
                className="block text-xl lg:text-3xl font-bold tracking-[0.18em] text-motif"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                HOA LY
              </span>
              <span className="block text-[8px] lg:text-[10px] font-light tracking-[0.5em] uppercase text-[#6B6B6B]" style={{ fontFamily: "var(--font-poppins)" }}>
                Paris
              </span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-10 text-[11px] tracking-[0.2em] uppercase">
            <a
              href={`tel:${STORE_PHONE.replace(/\s/g, "")}`}
              className="link-underline inline-flex items-center gap-2 hover:text-motif transition-colors duration-300"
            >
              <Phone size={14} className="text-motif" />
              {STORE_PHONE}
            </a>
            <Link
              href="/boutique"
              className="link-underline inline-flex items-center gap-2 hover:text-motif transition-colors duration-300"
            >
              <MapPin size={14} className="text-motif" />
              Nous trouver
            </Link>
            <a
              href={`https://www.instagram.com/${STORE_INSTAGRAM}`}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline hover:text-motif transition-colors duration-300"
            >
              Instagram
            </a>
          </div>

          <button
            className="lg:hidden p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Rangée des collections, très espacée */}
      <div className="hidden lg:block border-b border-[#EFEAE6]">
        <ul className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-wrap items-center justify-center gap-x-7 xl:gap-x-14 gap-y-3 py-5">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="link-underline text-[11px] tracking-[0.25em] uppercase text-[#0A0A0A] hover:text-motif transition-colors duration-300"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/catalogue"
              className="link-underline text-[11px] tracking-[0.25em] uppercase text-motif transition-colors duration-300"
            >
              Tout le catalogue
            </Link>
          </li>
        </ul>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="lg:hidden border-b border-[#EFEAE6] bg-[#FAFAF9]">
          <ul className="flex flex-col py-3">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block px-6 py-3.5 text-[11px] tracking-[0.25em] uppercase hover:bg-white hover:text-motif transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/catalogue"
                className="block px-6 py-3.5 text-[11px] tracking-[0.25em] uppercase text-motif"
                onClick={() => setMenuOpen(false)}
              >
                Tout le catalogue
              </Link>
            </li>
            <li>
              <Link
                href="/boutique"
                className="block px-6 py-3.5 text-[11px] tracking-[0.25em] uppercase border-t border-[#E5E5E5]"
                onClick={() => setMenuOpen(false)}
              >
                La boutique : adresse et horaires
              </Link>
            </li>
            <li>
              <a
                href={`tel:${STORE_PHONE.replace(/\s/g, "")}`}
                className="block px-6 py-3.5 text-[11px] tracking-[0.25em] uppercase border-t border-[#E5E5E5]"
              >
                {STORE_PHONE}
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
