"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Nouveautés", href: "/catalogue/nouveautes" },
  { label: "Robes", href: "/catalogue/robes" },
  { label: "Hauts", href: "/catalogue/hauts" },
  { label: "Pantalons", href: "/catalogue/pantalons" },
  { label: "Vestes", href: "/catalogue/vestes" },
  { label: "Accessoires", href: "/catalogue/accessoires" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-[#FAFAF9]/95 backdrop-blur-sm border-b border-[#E5E5E5]" : "bg-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl tracking-[0.15em] uppercase font-light"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Hoa Ly
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-xs tracking-widest uppercase text-[#0A0A0A] hover:text-[#C8A882] transition-colors duration-200"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-4">
          <Link
            href="/catalogue"
            className="hidden lg:block text-xs tracking-widest uppercase hover:text-[#C8A882] transition-colors duration-200"
          >
            Catalogue
          </Link>

          {/* Mobile menu toggle */}
          <button
            className="lg:hidden p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-[#FAFAF9] border-t border-[#E5E5E5]">
          <ul className="flex flex-col py-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block px-6 py-3 text-xs tracking-widest uppercase hover:bg-[#E5E5E5] transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
