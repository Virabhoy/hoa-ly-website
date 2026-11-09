import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// Politique de sécurité du contenu, sans nonce (voir la doc Next 16 : guides/content-security-policy.md).
// Les images distantes passent par l'optimiseur de Next, donc par le site lui-même ; seules les tuiles
// de la carte OpenStreetMap et les photos des auteurs d'avis Google sont chargées directement par le navigateur.
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' blob: data: https://*.tile.openstreetmap.org https://lh3.googleusercontent.com",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  // Ignoré en HTTP (local), actif dès que le site est servi en HTTPS.
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
];

const nextConfig: NextConfig = {
  // Ne pas annoncer la technologie utilisée (en-tête X-Powered-By).
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  images: {
    // Plafonds : un visiteur ne peut pas faire télécharger d'énormes images ni remplir le disque.
    maximumResponseBody: 15_000_000,
    maximumDiskCacheSize: 500_000_000,
    // Unsplash ne sert qu'au catalogue de démonstration : à retirer une fois les vrais produits saisis.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
