import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Hoa Ly – Prêt-à-porter Paris 75013",
    template: "%s | Hoa Ly",
  },
  description:
    "Boutique de prêt-à-porter féminin à Paris 75013. Découvrez notre collection de vêtements élégants et contemporains.",
  keywords: ["vêtements", "prêt-à-porter", "mode féminine", "Paris", "boutique"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${cormorant.variable}`}>
      <body>{children}</body>
    </html>
  );
}
