export const dynamic = "force-dynamic";

import Link from "next/link";
import { AtSign, Mail, Navigation, Phone } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StoreCard from "@/components/home/StoreCard";
import JsonLd from "@/components/seo/JsonLd";
import { CloudMotif, OrnamentDivider } from "@/components/ui/ChineseMotifs";
import { getStoreHours } from "@/lib/catalog/queries";
import { STORE_ADDRESS, STORE_EMAIL, STORE_INSTAGRAM, STORE_PHONE } from "@/lib/constants";
import { pageMetadata } from "@/lib/site";
import { storeJsonLd } from "@/lib/structured-data";

export const metadata = pageMetadata({
  title: "La boutique",
  description: `Adresse, horaires, accès et contact de la boutique Hoa Ly : ${STORE_ADDRESS}.`,
  path: "/boutique",
});

const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Hoa+Ly+50+Avenue+de+Choisy+75013+Paris";

export default async function BoutiquePage() {
  const hours = await getStoreHours();
  const contacts = [
    { icon: Phone, label: "Téléphone", value: STORE_PHONE, href: `tel:${STORE_PHONE.replace(/\s/g, "")}` },
    { icon: Mail, label: "E-mail", value: STORE_EMAIL, href: `mailto:${STORE_EMAIL}` },
    { icon: AtSign, label: "Instagram", value: `@${STORE_INSTAGRAM}`, href: `https://www.instagram.com/${STORE_INSTAGRAM}`, external: true },
    { icon: Navigation, label: "Itinéraire", value: "Ouvrir dans Google Maps", href: MAPS_URL, external: true },
  ];

  return (
    <>
      <JsonLd data={storeJsonLd(hours)} />
      <Navbar />
      <main id="contenu" className="pt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative py-12 overflow-hidden text-center">
            <CloudMotif className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 w-56 sm:w-72 text-motif opacity-15 hidden sm:block" />
            <CloudMotif className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 w-56 sm:w-72 text-motif opacity-15 -scale-x-100 hidden sm:block" />
            <h1
              className="relative text-4xl sm:text-5xl font-light tracking-[0.15em] uppercase"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              La boutique
            </h1>
            <OrnamentDivider className="relative mx-auto mt-4 w-40 text-motif" />
            <p className="relative mt-6 text-sm text-[#4A4A4A] max-w-xl mx-auto leading-relaxed">
              Toutes les pièces présentées sur le site sont à essayer et à réserver en boutique, {STORE_ADDRESS}.
            </p>
          </div>

          {/* Contact */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contacts.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-start gap-3 h-full bg-white border border-[#EFEAE6] p-5 hover:border-motif transition-colors"
                >
                  <c.icon size={18} className="mt-0.5 shrink-0 text-motif" aria-hidden />
                  <span>
                    <span className="block text-xs tracking-widest uppercase text-[#6B6B6B]">{c.label}</span>
                    <span className="block mt-1 text-sm group-hover:text-motif transition-colors break-all">{c.value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-10 bg-[#F5F2EE] px-6 py-6 text-center">
            <p className="text-sm text-[#4A4A4A]">
              Une pièce vous plaît ? Appelez-nous pour la réserver dans votre couleur et votre taille avant de passer.
            </p>
            <Link
              href="/catalogue"
              className="inline-block mt-4 px-8 py-3 bg-motif text-white text-xs tracking-widest uppercase hover:bg-[#0A0A0A] transition-colors"
            >
              Voir le catalogue
            </Link>
          </div>
        </div>

        {/* Adresse, horaires, métro et carte */}
        <StoreCard hours={hours} />
      </main>
      <Footer />
    </>
  );
}
