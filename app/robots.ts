import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Administration, API et maquettes n'ont rien à faire dans les résultats de recherche.
      disallow: ["/admin", "/api/", "/showcase"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
