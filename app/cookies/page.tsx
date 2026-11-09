import Link from "next/link";
import LegalPage, { Section } from "@/components/legal/LegalPage";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Cookies",
  description: "Le site Hoa Ly ne dépose aucun cookie de suivi : détail des cookies et traceurs utilisés.",
  path: "/cookies",
});

const cell = "border border-[#E5E5E5] px-3 py-2 align-top text-left";

export default function CookiesPage() {
  return (
    <LegalPage
      title="Politique de cookies"
      current="/cookies"
      intro="En bref : aucun cookie de mesure d'audience, de publicité ou de réseau social. C'est pourquoi le site ne vous affiche pas de bandeau de consentement."
    >
      <Section title="1. Qu'est-ce qu'un cookie ?">
        <p>
          Un cookie est un petit fichier déposé sur votre appareil par un site internet. Il permet par exemple de
          rester connecté ou de mémoriser des préférences. D&apos;autres traceurs (stockage local du navigateur, pixels)
          fonctionnent de façon comparable et sont soumis aux mêmes règles.
        </p>
      </Section>

      <Section title="2. Cookies déposés par le site">
        <p>
          <strong>Pour les visiteurs : aucun.</strong> La consultation du catalogue, des collections et des fiches
          produits ne dépose aucun cookie ni aucun autre traceur sur votre appareil.
        </p>
        <p>Un seul cookie existe, et il ne concerne que le personnel de la boutique qui se connecte à l&apos;administration :</p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[32rem] text-xs border-collapse">
            <thead className="bg-[#F5F2EE] text-[#0A0A0A]">
              <tr>
                <th scope="col" className={cell}>Nom</th>
                <th scope="col" className={cell}>Finalité</th>
                <th scope="col" className={cell}>Durée</th>
                <th scope="col" className={cell}>Consentement</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={`${cell} font-mono`}>__Host-hoaly_session</td>
                <td className={cell}>Maintenir la connexion à l&apos;espace d&apos;administration</td>
                <td className={cell}>1 h sans activité, 12 h au plus</td>
                <td className={cell}>Non requis : cookie strictement nécessaire au service demandé</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Les cookies strictement nécessaires sont dispensés de consentement (article 82 de la loi Informatique et
          Libertés et lignes directrices de la CNIL).
        </p>
      </Section>

      <Section title="3. Services tiers">
        <p>
          La carte de la boutique (OpenStreetMap) et les photos de profil des avis Google sont chargées depuis les
          serveurs de ces services, qui reçoivent alors l&apos;adresse IP de votre appareil. Hoa Ly ne leur demande de
          déposer aucun cookie. Les liens vers Instagram ou Google Maps vous font quitter le site : les règles de ces
          services s&apos;appliquent alors. Voir la <Link href="/confidentialite">politique de confidentialité</Link>.
        </p>
      </Section>

      <Section title="4. Gérer les cookies">
        <p>
          Vous pouvez à tout moment supprimer ou bloquer les cookies depuis les réglages de votre navigateur (Chrome,
          Safari, Firefox, Edge...). Cela n&apos;a aucune incidence sur la consultation du site public.
        </p>
        <p>
          Si un outil de mesure d&apos;audience ou de publicité devait être ajouté un jour, votre consentement serait
          demandé au préalable et cette page serait mise à jour.
        </p>
      </Section>
    </LegalPage>
  );
}
