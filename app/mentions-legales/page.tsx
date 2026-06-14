import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { LEGAL, STORE_EMAIL, STORE_PHONE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Mentions Légales",
  description: "Mentions légales de la boutique Hoa Ly, Paris 75013.",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-[#E5E5E5] pt-8 mt-8 first:border-0 first:pt-0 first:mt-0">
      <h2
        className="text-xl font-light tracking-wide mb-5"
        style={{ fontFamily: "var(--font-cormorant)" }}
      >
        {title}
      </h2>
      <div className="text-sm text-[#6B6B6B] space-y-2 leading-relaxed">{children}</div>
    </div>
  );
}

export default function MentionsLegalesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="py-10 border-b border-[#E5E5E5] mb-10">
            <p className="text-xs tracking-widest uppercase text-[#6B6B6B] mb-2">Informations légales</p>
            <h1
              className="text-4xl font-light tracking-wide"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Mentions Légales
            </h1>
          </div>

          {/* Éditeur du site */}
          <Section title="1. Éditeur du site">
            <p>Le présent site internet est édité par la société :</p>
            <div className="mt-4 bg-[#F5F5F5] p-5 space-y-1.5 text-[#0A0A0A]">
              <p><span className="text-[#6B6B6B]">Dénomination sociale :</span> Hoa Ly</p>
              <p><span className="text-[#6B6B6B]">Forme juridique :</span> {LEGAL.formeJuridique}</p>
              <p><span className="text-[#6B6B6B]">Capital social :</span> {LEGAL.capital}</p>
              <p><span className="text-[#6B6B6B]">SIRET :</span> {LEGAL.siret}</p>
              <p><span className="text-[#6B6B6B]">SIREN :</span> {LEGAL.siren}</p>
              <p><span className="text-[#6B6B6B]">Immatriculation :</span> {LEGAL.rcs}</p>
              <p><span className="text-[#6B6B6B]">N° TVA Intracommunautaire :</span> {LEGAL.tva}</p>
              <p><span className="text-[#6B6B6B]">Siège social :</span> {LEGAL.siegeSocial}</p>
            </div>
          </Section>

          {/* Responsable de publication */}
          <Section title="2. Responsable de la publication">
            <p>
              Le responsable de la publication est <strong className="text-[#0A0A0A]">{LEGAL.responsable}</strong>,
              en sa qualité de gérant de la société Hoa Ly.
            </p>
            <p>
              Pour toute question relative au contenu du site, vous pouvez le contacter à l&apos;adresse
              suivante :{" "}
              <a href={`mailto:${STORE_EMAIL}`} className="text-[#C8A882] hover:underline">
                {STORE_EMAIL}
              </a>
            </p>
          </Section>

          {/* Hébergement */}
          <Section title="3. Hébergement">
            <p>Ce site est hébergé par :</p>
            <div className="mt-3 space-y-1">
              <p className="text-[#0A0A0A] font-medium">Vercel Inc.</p>
              <p>340 Pine Street, Suite 701, San Francisco, California 94104, USA</p>
              <p>
                <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-[#C8A882] hover:underline">
                  vercel.com
                </a>
              </p>
            </div>
          </Section>

          {/* Contact */}
          <Section title="4. Contact">
            <p>Pour tout renseignement, vous pouvez nous contacter par :</p>
            <ul className="mt-3 space-y-2">
              <li>
                <span className="text-[#0A0A0A]">Téléphone : </span>
                <a href={`tel:${STORE_PHONE.replace(/\s/g, "")}`} className="text-[#C8A882] hover:underline">
                  {STORE_PHONE}
                </a>
              </li>
              <li>
                <span className="text-[#0A0A0A]">Email : </span>
                <a href={`mailto:${STORE_EMAIL}`} className="text-[#C8A882] hover:underline">
                  {STORE_EMAIL}
                </a>
              </li>
              <li>
                <span className="text-[#0A0A0A]">Adresse : </span>
                {LEGAL.siegeSocial}
              </li>
            </ul>
          </Section>

          {/* Propriété intellectuelle */}
          <Section title="5. Propriété intellectuelle">
            <p>
              L&apos;ensemble du contenu de ce site (textes, photographies, vidéos, illustrations, logos,
              marques) est la propriété exclusive de la société Hoa Ly ou de ses partenaires, et est
              protégé par les lois françaises et internationales relatives à la propriété intellectuelle.
            </p>
            <p>
              Toute reproduction, représentation, modification, publication, adaptation de tout ou partie
              des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf
              autorisation écrite préalable de Hoa Ly.
            </p>
          </Section>

          {/* Données personnelles */}
          <Section title="6. Données personnelles">
            <p>
              Ce site vitrine ne collecte pas de données personnelles via des formulaires d&apos;inscription,
              de paiement ou de création de compte.
            </p>
            <p>
              Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique
              et Libertés, vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression des données
              vous concernant. Pour exercer ce droit, contactez-nous à{" "}
              <a href={`mailto:${STORE_EMAIL}`} className="text-[#C8A882] hover:underline">
                {STORE_EMAIL}
              </a>.
            </p>
          </Section>

          {/* Cookies */}
          <Section title="7. Cookies">
            <p>
              Ce site peut utiliser des cookies techniques nécessaires à son bon fonctionnement. Ces cookies
              ne nécessitent pas de consentement préalable conformément aux lignes directrices de la CNIL.
            </p>
            <p>
              Vous pouvez configurer votre navigateur pour refuser les cookies, sans que cela n&apos;affecte
              votre navigation sur le site.
            </p>
          </Section>

          {/* Droit applicable */}
          <Section title="8. Droit applicable et juridiction compétente">
            <p>
              Le présent site est soumis au droit français. Tout litige relatif à son utilisation sera
              soumis à la compétence exclusive des tribunaux de Paris.
            </p>
            <p className="text-xs text-[#6B6B6B] mt-4">
              Dernière mise à jour : juin 2026
            </p>
          </Section>

          <div className="mt-12 pt-8 border-t border-[#E5E5E5]">
            <Link
              href="/"
              className="text-xs tracking-widest uppercase text-[#6B6B6B] hover:text-[#0A0A0A] transition-colors border-b border-[#6B6B6B] pb-0.5"
            >
              ← Retour à l&apos;accueil
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
