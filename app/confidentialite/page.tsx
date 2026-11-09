import Link from "next/link";
import LegalPage, { InfoBox, Section } from "@/components/legal/LegalPage";
import { LEGAL, STORE_EMAIL } from "@/lib/constants";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Politique de confidentialité",
  description: "Comment la boutique Hoa Ly traite vos données personnelles et comment exercer vos droits (RGPD).",
  path: "/confidentialite",
});

const cell = "border border-[#E5E5E5] px-3 py-2 align-top text-left";

export default function ConfidentialitePage() {
  return (
    <LegalPage
      title="Politique de confidentialité"
      current="/confidentialite"
      intro="Ce site est une vitrine : il ne propose ni compte client, ni paiement, ni formulaire, et n'utilise aucun outil de mesure d'audience ou de publicité. Voici, en toute transparence, les seules données traitées et vos droits."
    >
      <Section title="1. Responsable du traitement">
        <InfoBox>
          <p className="font-medium">Hoa Ly, {LEGAL.formeJuridique} au capital de {LEGAL.capital}</p>
          <p>{LEGAL.siegeSocial}</p>
          <p>{LEGAL.rcs}</p>
          <p>
            Contact : <a href={`mailto:${STORE_EMAIL}`}>{STORE_EMAIL}</a>
          </p>
        </InfoBox>
        <p>
          Hoa Ly n&apos;a pas désigné de délégué à la protection des données ; toute demande peut être adressée au
          contact ci-dessus.
        </p>
      </Section>

      <Section title="2. Données traitées">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[36rem] text-xs border-collapse">
            <thead className="bg-[#F5F2EE] text-[#0A0A0A]">
              <tr>
                <th scope="col" className={cell}>Situation</th>
                <th scope="col" className={cell}>Données</th>
                <th scope="col" className={cell}>Finalité et base légale</th>
                <th scope="col" className={cell}>Durée de conservation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={cell}>Consultation du site</td>
                <td className={cell}>Adresse IP, type de navigateur, pages demandées, date et heure</td>
                <td className={cell}>Fonctionnement et sécurité du site (journaux techniques du serveur). Intérêt légitime.</td>
                <td className={cell}>14 jours</td>
              </tr>
              <tr>
                <td className={cell}>Prise de contact par téléphone ou e-mail</td>
                <td className={cell}>Nom, coordonnées, contenu de votre demande</td>
                <td className={cell}>Répondre à votre demande, préparer une réservation en boutique. Intérêt légitime ou mesures précontractuelles.</td>
                <td className={cell}>3 ans après le dernier échange</td>
              </tr>
              <tr>
                <td className={cell}>Espace d&apos;administration (personnel de la boutique)</td>
                <td className={cell}>Identifiant, adresse IP lors des connexions</td>
                <td className={cell}>Protéger l&apos;accès à l&apos;administration (blocage des tentatives répétées). Intérêt légitime.</td>
                <td className={cell}>Session : 12 h au plus. Journaux de connexion : 3 mois</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Aucune donnée n&apos;est vendue ni utilisée à des fins publicitaires. Aucune décision automatisée ni profilage
          n&apos;est réalisé.
        </p>
      </Section>

      <Section title="3. Services tiers et destinataires">
        <p>Vos données ne sont accessibles qu&apos;au personnel habilité de Hoa Ly et aux prestataires suivants :</p>
        <ul>
          <li>
            <strong>IONOS SARL</strong> (France), hébergeur du site : le serveur, situé dans l&apos;Union européenne,
            stocke les journaux techniques. IONOS agit en qualité de sous-traitant, dans le cadre d&apos;un contrat de
            traitement des données conforme au RGPD.
          </li>
          <li>
            <strong>OpenStreetMap Foundation</strong> (Royaume-Uni) : lorsque la carte de la boutique s&apos;affiche,
            votre navigateur télécharge les fonds de carte depuis ses serveurs, qui reçoivent votre adresse IP. Le
            Royaume-Uni bénéficie d&apos;une décision d&apos;adéquation de la Commission européenne.
          </li>
          <li>
            <strong>Google</strong> (États-Unis) : les avis clients affichés proviennent de la fiche Google de la
            boutique. Leurs auteurs les ont publiés eux-mêmes sur Google ; leur photo de profil est chargée depuis les
            serveurs de Google, qui reçoivent alors votre adresse IP. Google adhère au Data Privacy Framework.
          </li>
        </ul>
        <p>
          Les polices de caractères et les photos du catalogue sont servies par le site lui-même : aucune requête
          n&apos;est envoyée à Google Fonts ni aux banques d&apos;images lors de votre visite. Les liens vers Instagram ou
          Google Maps ne transmettent rien tant que vous ne cliquez pas dessus.
        </p>
      </Section>

      <Section title="4. Cookies">
        <p>
          Le site public ne dépose aucun cookie sur l&apos;appareil des visiteurs. Le détail figure dans la{" "}
          <Link href="/cookies">politique de cookies</Link>.
        </p>
      </Section>

      <Section title="5. Sécurité">
        <p>
          Le site est servi en HTTPS. L&apos;espace d&apos;administration est protégé par identifiant et mot de passe,
          avec limitation des tentatives de connexion et déconnexion automatique après une heure d&apos;inactivité.
        </p>
      </Section>

      <Section title="6. Vos droits">
        <p>
          Conformément au Règlement général sur la protection des données (RGPD) et à la loi Informatique et Libertés,
          vous disposez des droits d&apos;accès, de rectification, d&apos;effacement, de limitation, d&apos;opposition et de
          portabilité de vos données, ainsi que du droit de définir des directives relatives à leur sort après votre
          décès.
        </p>
        <p>
          Pour les exercer, écrivez à <a href={`mailto:${STORE_EMAIL}`}>{STORE_EMAIL}</a> ou par courrier à Hoa Ly,{" "}
          {LEGAL.siegeSocial}. Une réponse vous sera apportée dans un délai d&apos;un mois ; une pièce d&apos;identité
          pourra vous être demandée en cas de doute raisonnable sur votre identité.
        </p>
        <p>
          Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de la
          CNIL (3 place de Fontenoy, TSA 80715, 75334 Paris Cedex 07,{" "}
          <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">cnil.fr</a>).
        </p>
      </Section>

      <Section title="7. Modifications">
        <p>
          Cette politique peut évoluer, notamment si de nouveaux services sont ajoutés au site. La date de dernière mise
          à jour figure en bas de cette page.
        </p>
      </Section>
    </LegalPage>
  );
}
