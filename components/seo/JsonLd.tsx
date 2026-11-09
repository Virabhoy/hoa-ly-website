/**
 * Données structurées schema.org, lues par Google (fiche boutique, produits, fil d'Ariane).
 * Le remplacement de « < » empêche toute injection de balise (recommandation de la doc Next).
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
