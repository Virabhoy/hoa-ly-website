import NavbarClient, { type NavLink } from "./NavbarClient";
import { getAnnouncement, getCategories } from "@/lib/catalog/queries";

/** Libellé court pour le menu : « Hauts & Tops » devient « Hauts ». */
function shortLabel(name: string): string {
  return name.split(/\s+(?:&|et)\s+/i)[0];
}

// Le menu suit les catégories gérées dans l'admin (ordre d'affichage compris).
export default async function Navbar() {
  const [categories, announcement] = await Promise.all([getCategories(), getAnnouncement()]);
  const links: NavLink[] = [
    ...categories.map((c) => ({ label: shortLabel(c.name), href: `/catalogue/${c.slug}` })),
    { label: "Collections", href: "/collections" },
  ];
  return <NavbarClient links={links} announcement={announcement} />;
}
