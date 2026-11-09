import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { OrnamentDivider } from "@/components/ui/ChineseMotifs";
import { LEGAL_PAGES, LEGAL_UPDATED } from "@/lib/legal";

export function Section({ id, title, children }: { id?: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="border-t border-[#E5E5E5] pt-8 mt-8 first:border-0 first:pt-0 first:mt-0 scroll-mt-48">
      <h2 className="text-2xl font-light tracking-wide mb-4" style={{ fontFamily: "var(--font-cormorant)" }}>
        {title}
      </h2>
      <div className="text-sm text-[#4A4A4A] space-y-3 leading-relaxed [&_a]:text-motif [&_a]:underline [&_a]:underline-offset-2 [&_strong]:text-[#0A0A0A] [&_strong]:font-medium [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5">
        {children}
      </div>
    </section>
  );
}

/** Encadré d'informations (identité de la société, hébergeur...). */
export function InfoBox({ children }: { children: React.ReactNode }) {
  return <div className="bg-[#F5F2EE] p-5 space-y-1.5 text-[#0A0A0A]">{children}</div>;
}

export default function LegalPage({
  title,
  intro,
  current,
  children,
}: {
  title: string;
  intro?: string;
  current: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main id="contenu" className="pt-10 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="py-10 mb-10 text-center">
            <p className="text-xs tracking-[0.25em] uppercase text-motif mb-3">Informations légales</p>
            <h1 className="text-4xl sm:text-5xl font-light tracking-wide" style={{ fontFamily: "var(--font-cormorant)" }}>
              {title}
            </h1>
            <OrnamentDivider className="mx-auto mt-4 w-32 text-motif" />
            {intro && <p className="mt-6 text-sm text-[#4A4A4A] leading-relaxed max-w-xl mx-auto">{intro}</p>}
          </header>

          {children}

          <p className="mt-12 text-xs text-[#6B6B6B]">Dernière mise à jour : {LEGAL_UPDATED}</p>

          <nav aria-label="Informations légales" className="mt-8 pt-8 border-t border-[#E5E5E5]">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-xs tracking-widest uppercase">
              {LEGAL_PAGES.map((page) => (
                <li key={page.href}>
                  {page.href === current ? (
                    <span aria-current="page" className="text-[#0A0A0A]">{page.label}</span>
                  ) : (
                    <Link href={page.href} className="text-[#6B6B6B] hover:text-motif transition-colors">
                      {page.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </main>
      <Footer />
    </>
  );
}
