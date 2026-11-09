import Link from "next/link";
import LegalPage, { Section } from "@/components/legal/LegalPage";
import { LEGAL, STORE_EMAIL, STORE_PHONE } from "@/lib/constants";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Conditions d'utilisation",
  description: "Conditions d'utilisation du site vitrine de la boutique Hoa Ly, Paris 13e.",
  path: "/conditions-utilisation",
});

export default function ConditionsUtilisationPage() {
  return (
    <LegalPage
      title="Conditions d'utilisation"
      current="/conditions-utilisation"
      intro="Les présentes conditions encadrent l'utilisation du site de la boutique Hoa Ly. En naviguant sur le site, vous les acceptez."
    >
      <Section title="1. Objet du site">
        <p>
          Ce site présente les vêtements et accessoires de la boutique Hoa Ly, {LEGAL.siegeSocial}. Il s&apos;agit
          d&apos;un site vitrine : <strong>aucune vente ni aucun paiement n&apos;est réalisé en ligne</strong>. Les
          achats se font exclusivement en boutique, selon les conditions de vente qui y sont appliquées.
        </p>
      </Section>

      <Section title="2. Produits, prix et disponibilités">
        <ul>
          <li>
            Les photographies sont présentées à titre indicatif ; les couleurs peuvent varier légèrement selon
            l&apos;écran utilisé.
          </li>
          <li>Les prix sont indiqués en euros, toutes taxes comprises. Le prix applicable est celui affiché en boutique le jour de l&apos;achat.</li>
          <li>
            Les disponibilités par couleur et par taille sont mises à jour régulièrement mais restent indicatives : un
            article peut avoir été vendu entre-temps.
          </li>
        </ul>
      </Section>

      <Section title="3. Réservation">
        <p>
          Vous pouvez demander à réserver un article en appelant la boutique au{" "}
          <a href={`tel:${STORE_PHONE.replace(/\s/g, "")}`}>{STORE_PHONE}</a>. La réservation est confirmée par la
          boutique et ne vaut pas achat : la vente est conclue en magasin.
        </p>
      </Section>

      <Section title="4. Accès au site">
        <p>
          Le site est accessible gratuitement, sans inscription. Hoa Ly s&apos;efforce d&apos;en assurer
          l&apos;accès en continu, mais peut l&apos;interrompre pour maintenance ou en cas de difficulté technique,
          sans que cela ouvre droit à indemnisation.
        </p>
      </Section>

      <Section title="5. Propriété intellectuelle">
        <p>
          Les contenus du site sont protégés. Toute réutilisation sans autorisation est interdite, comme précisé dans
          les <Link href="/mentions-legales">mentions légales</Link>.
        </p>
      </Section>

      <Section title="6. Liens externes">
        <p>
          Le site contient des liens vers d&apos;autres services (Instagram, Google Maps, OpenStreetMap). Hoa Ly
          n&apos;est pas responsable de leur contenu ni de leurs pratiques en matière de données personnelles.
        </p>
      </Section>

      <Section title="7. Responsabilité">
        <p>
          Hoa Ly veille à l&apos;exactitude des informations publiées mais ne peut garantir l&apos;absence
          d&apos;erreur. Pour toute information déterminante (taille, composition, disponibilité), contactez la
          boutique avant de vous déplacer : <a href={`mailto:${STORE_EMAIL}`}>{STORE_EMAIL}</a>.
        </p>
      </Section>

      <Section title="8. Données personnelles">
        <p>
          Voir la <Link href="/confidentialite">politique de confidentialité</Link> et la{" "}
          <Link href="/cookies">politique de cookies</Link>.
        </p>
      </Section>

      <Section title="9. Droit applicable et litiges">
        <p>
          Les présentes conditions sont soumises au droit français. En cas de différend, une solution amiable sera
          recherchée en priorité. À défaut, les tribunaux français sont compétents dans les conditions prévues par la
          loi.
        </p>
      </Section>
    </LegalPage>
  );
}
