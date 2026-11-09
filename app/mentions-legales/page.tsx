import Link from "next/link";
import LegalPage, { InfoBox, Section } from "@/components/legal/LegalPage";
import { LEGAL, STORE_EMAIL, STORE_PHONE } from "@/lib/constants";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Mentions légales",
  description: "Mentions légales du site de la boutique Hoa Ly, Paris 13e : éditeur, hébergeur, propriété intellectuelle.",
  path: "/mentions-legales",
});

const muted = "text-[#6B6B6B]";

export default function MentionsLegalesPage() {
  return (
    <LegalPage
      title="Mentions légales"
      current="/mentions-legales"
      intro="Informations prévues par l'article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique (LCEN)."
    >
      <Section title="1. Éditeur du site">
        <p>Le présent site est édité par :</p>
        <InfoBox>
          <p><span className={muted}>Dénomination sociale :</span> Hoa Ly</p>
          <p><span className={muted}>Forme juridique :</span> {LEGAL.formeJuridique}</p>
          <p><span className={muted}>Capital social :</span> {LEGAL.capital}</p>
          <p><span className={muted}>SIRET :</span> {LEGAL.siret}</p>
          <p><span className={muted}>SIREN :</span> {LEGAL.siren}</p>
          <p><span className={muted}>Immatriculation :</span> {LEGAL.rcs}</p>
          <p><span className={muted}>N° TVA intracommunautaire :</span> {LEGAL.tva}</p>
          <p><span className={muted}>Siège social :</span> {LEGAL.siegeSocial}</p>
          <p><span className={muted}>Téléphone :</span> {STORE_PHONE}</p>
          <p><span className={muted}>E-mail :</span> {STORE_EMAIL}</p>
        </InfoBox>
      </Section>

      <Section title="2. Directeur de la publication">
        <p>
          Le directeur de la publication est <strong>{LEGAL.responsable}</strong>, en sa qualité de gérant de la
          société Hoa Ly. Il peut être contacté à l&apos;adresse <a href={`mailto:${STORE_EMAIL}`}>{STORE_EMAIL}</a>.
        </p>
      </Section>

      <Section title="3. Hébergement">
        <p>Le site est hébergé par :</p>
        <InfoBox>
          <p className="font-medium">IONOS SARL</p>
          <p>7 place de la Gare, BP 70109, 57201 Sarreguemines Cedex, France</p>
          <p>
            <span className={muted}>Téléphone :</span> 08 05 54 21 80 -{" "}
            <a href="https://www.ionos.fr" target="_blank" rel="noopener noreferrer">ionos.fr</a>
          </p>
        </InfoBox>
        <p>Le serveur qui héberge le site et ses données est situé dans l&apos;Union européenne.</p>
      </Section>

      <Section title="4. Propriété intellectuelle">
        <p>
          L&apos;ensemble des contenus de ce site (textes, photographies, logos, illustrations, mise en page) est la
          propriété exclusive de la société Hoa Ly ou de ses partenaires et est protégé par le Code de la propriété
          intellectuelle.
        </p>
        <p>
          Toute reproduction, représentation, modification ou diffusion de tout ou partie de ces contenus, par quelque
          procédé que ce soit, est interdite sans l&apos;autorisation écrite préalable de Hoa Ly, sous peine de
          poursuites.
        </p>
        <p>
          Les photographies de produits présentées à titre d&apos;illustration peuvent provenir de banques d&apos;images
          libres de droits ; elles restent la propriété de leurs auteurs.
        </p>
      </Section>

      <Section title="5. Données personnelles et cookies">
        <p>
          Le traitement des données personnelles est décrit dans la{" "}
          <Link href="/confidentialite">politique de confidentialité</Link>, et l&apos;usage des cookies dans la{" "}
          <Link href="/cookies">politique de cookies</Link>.
        </p>
      </Section>

      <Section title="6. Conditions d'utilisation">
        <p>
          L&apos;utilisation du site est régie par les{" "}
          <Link href="/conditions-utilisation">conditions d&apos;utilisation</Link>.
        </p>
      </Section>

      <Section title="7. Droit applicable">
        <p>
          Le présent site et les présentes mentions sont soumis au droit français. En cas de litige, et à défaut de
          résolution amiable, les tribunaux français sont compétents dans les conditions prévues par la loi.
        </p>
      </Section>
    </LegalPage>
  );
}
