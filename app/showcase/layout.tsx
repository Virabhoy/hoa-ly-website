import type { Metadata } from "next";
import ShowcaseNav from "@/components/showcase/ShowcaseNav";
import { requireAdmin } from "@/lib/auth";

// Maquettes de design présentées au client : réservées aux personnes connectées à l'admin,
// et jamais indexées. À supprimer avant la mise en ligne si elles ne servent plus.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function ShowcaseLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();

  return (
    <>
      <ShowcaseNav />
      <div style={{ paddingTop: "44px" }}>{children}</div>
    </>
  );
}
