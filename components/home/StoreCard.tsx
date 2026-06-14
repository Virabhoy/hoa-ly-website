"use client";

import dynamic from "next/dynamic";
import { MapPin, Phone, Clock, Train } from "lucide-react";
import { STORE_ADDRESS, STORE_HOURS, STORE_METRO, STORE_PHONE, STORE_LAT, STORE_LNG } from "@/lib/constants";

const OpenStreetMap = dynamic(() => import("./OpenStreetMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-72 bg-[#F0EDE8] flex items-center justify-center">
      <span className="text-sm text-[#6B6B6B]">Chargement de la carte…</span>
    </div>
  ),
});

export default function StoreCard() {
  const today = new Date().toLocaleDateString("fr-FR", { weekday: "long" });
  const todayCapitalized = today.charAt(0).toUpperCase() + today.slice(1);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Info */}
        <div>
          <h2
            className="text-3xl font-light tracking-wide mb-8"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Notre Boutique
          </h2>

          <div className="flex items-start gap-3 mb-6">
            <MapPin size={16} className="mt-0.5 shrink-0 text-[#C8A882]" />
            <div>
              <p className="text-xs tracking-widest uppercase text-[#6B6B6B] mb-1">Adresse</p>
              <p className="text-sm">{STORE_ADDRESS}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 mb-6">
            <Phone size={16} className="mt-0.5 shrink-0 text-[#C8A882]" />
            <div>
              <p className="text-xs tracking-widest uppercase text-[#6B6B6B] mb-1">Téléphone</p>
              <a href={`tel:${STORE_PHONE.replace(/\s/g, "")}`} className="text-sm hover:text-[#C8A882] transition-colors">
                {STORE_PHONE}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3 mb-6">
            <Clock size={16} className="mt-0.5 shrink-0 text-[#C8A882]" />
            <div className="flex-1">
              <p className="text-xs tracking-widest uppercase text-[#6B6B6B] mb-3">Horaires</p>
              <table className="w-full text-sm">
                <tbody>
                  {Object.entries(STORE_HOURS).map(([day, hours]) => (
                    <tr
                      key={day}
                      className={`${day === todayCapitalized ? "font-medium text-[#C8A882]" : "text-[#6B6B6B]"}`}
                    >
                      <td className="py-0.5 pr-4">{day}</td>
                      <td className="py-0.5">{hours}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Train size={16} className="mt-0.5 shrink-0 text-[#C8A882]" />
            <div>
              <p className="text-xs tracking-widest uppercase text-[#6B6B6B] mb-3">Accès Métro</p>
              <div className="flex flex-wrap gap-3">
                {STORE_METRO.map((m, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 text-xs">
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
                      style={{ backgroundColor: m.color }}
                    >
                      {m.line}
                    </span>
                    <span className="text-[#6B6B6B]">{m.station}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Carte OpenStreetMap — 100% gratuit, sans clé API */}
        <div className="h-80 lg:h-[420px] overflow-hidden border border-[#E5E5E5]">
          <OpenStreetMap lat={STORE_LAT} lng={STORE_LNG} zoom={16} label="Hoa Ly" />
        </div>
      </div>
    </section>
  );
}
