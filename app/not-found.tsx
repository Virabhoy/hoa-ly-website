import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CloudMotif, OrnamentDivider } from "@/components/ui/ChineseMotifs";

export const metadata = { title: "Page introuvable" };

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main id="contenu" className="relative overflow-hidden">
        <CloudMotif className="pointer-events-none absolute -right-10 top-10 w-72 text-motif opacity-10 hidden sm:block" />
        <div className="relative max-w-xl mx-auto px-6 py-28 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-motif">Erreur 404</p>
          <h1 className="mt-4 text-4xl sm:text-5xl font-light" style={{ fontFamily: "var(--font-cormorant)" }}>
            Cette page est introuvable
          </h1>
          <OrnamentDivider className="mx-auto mt-5 w-32 text-motif" />
          <p className="mt-6 text-sm text-[#4A4A4A] leading-relaxed">
            L&apos;article a peut-être été vendu ou retiré du catalogue, ou l&apos;adresse contient une erreur.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/catalogue"
              className="px-8 py-3 bg-motif text-white text-xs tracking-widest uppercase hover:bg-[#0A0A0A] transition-colors"
            >
              Voir le catalogue
            </Link>
            <Link
              href="/"
              className="px-8 py-3 border border-[#E5E5E5] text-xs tracking-widest uppercase hover:border-[#0A0A0A] transition-colors"
            >
              Retour à l&apos;accueil
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
