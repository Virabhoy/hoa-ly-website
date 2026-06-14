import type { Category, Product, ProductVariant } from "./supabase/types";

const U = (id: string, w = 800, h = 1067) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

// ─── Catégories ───────────────────────────────────────────────────
export const DEMO_CATEGORIES: Category[] = [
  { id: "cat-1", slug: "nouveautes", name: "Nouveautés", description: "Les dernières pièces de la saison", cover_image: U("1483985988355-763728e1935b", 1200, 800), display_order: 0, created_at: "" },
  { id: "cat-2", slug: "robes", name: "Robes", description: "Robes féminines pour toutes les occasions", cover_image: U("1515372039744-b8f02a3ae446"), display_order: 1, created_at: "" },
  { id: "cat-3", slug: "hauts", name: "Hauts & Tops", description: "Tops, chemises et blouses", cover_image: U("1434389677669-e08b4cac3105"), display_order: 2, created_at: "" },
  { id: "cat-4", slug: "pantalons", name: "Pantalons", description: "Pantalons et jeans contemporains", cover_image: U("1541099649105-f69ad21f3246"), display_order: 3, created_at: "" },
  { id: "cat-5", slug: "vestes", name: "Vestes & Manteaux", description: "Vestes légères, blazers et manteaux", cover_image: U("1548624313-0396a0857dfe"), display_order: 4, created_at: "" },
  { id: "cat-6", slug: "accessoires", name: "Accessoires", description: "Sacs, ceintures et foulards", cover_image: U("1584917865442-de89df76afd3"), display_order: 5, created_at: "" },
];

// ─── Variantes helpers ────────────────────────────────────────────
function v(productId: string, colorName: string, colorHex: string, size: string, stock: number): ProductVariant {
  return { id: `${productId}-${colorName}-${size}`, product_id: productId, color_name: colorName, color_hex: colorHex, size, stock, sku: null, display_order: 0 };
}

function sizes(productId: string, colorName: string, colorHex: string, stocks: number[]): ProductVariant[] {
  const s = ["XS", "S", "M", "L", "XL", "XXL"];
  return stocks.map((stock, i) => v(productId, colorName, colorHex, s[i], stock));
}

// ─── Produits ─────────────────────────────────────────────────────
export const DEMO_PRODUCTS: Product[] = [
  // ── ROBES ──
  {
    id: "p-r1", slug: "robe-midi-noire-classique", name: "Robe Midi Noire", description: "Une robe midi intemporelle en tissu fluide, col V, manches longues légèrement évasées. La pièce essentielle du dressing parisien.", category_id: "cat-2", price: 89.90,
    images: [U("1515372039744-b8f02a3ae446"), U("1568702846914-96b305d2aaeb"), U("1596755094514-f87e34085b2c")],
    cover_image: U("1515372039744-b8f02a3ae446"), is_featured: true, is_active: true, display_order: 0, created_at: "", updated_at: "",
    category: DEMO_CATEGORIES[1],
    variants: [...sizes("p-r1", "Noir", "#0A0A0A", [3, 8, 12, 7, 4, 1]), ...sizes("p-r1", "Marine", "#1A2B4C", [2, 5, 8, 5, 2, 0])],
  },
  {
    id: "p-r2", slug: "robe-florale-ete", name: "Robe Florale Été", description: "Légère et colorée, cette robe à imprimé floral saura sublimer vos journées estivales. Tissus 100% viscose, ceinture à nouer.", category_id: "cat-2", price: 69.90,
    images: [U("1539008835657-9e8e9680c956"), U("1515372039744-b8f02a3ae446")],
    cover_image: U("1539008835657-9e8e9680c956"), is_featured: true, is_active: true, display_order: 1, created_at: "", updated_at: "",
    category: DEMO_CATEGORIES[1],
    variants: [...sizes("p-r2", "Multicolore", "#D4A574", [4, 9, 14, 10, 5, 2])],
  },
  {
    id: "p-r3", slug: "robe-rouge-soiree", name: "Robe Rouge Soirée", description: "Robe de soirée sculptante, décolleté asymétrique. Idéale pour vos grandes occasions.", category_id: "cat-2", price: 129.90,
    images: [U("1566174053879-31528523f8ae"), U("1519657337289-077653f0ac36")],
    cover_image: U("1566174053879-31528523f8ae"), is_featured: true, is_active: true, display_order: 2, created_at: "", updated_at: "",
    category: DEMO_CATEGORIES[1],
    variants: [...sizes("p-r3", "Rouge", "#C0392B", [1, 4, 6, 4, 2, 0]), ...sizes("p-r3", "Bordeaux", "#6D2B3D", [2, 3, 5, 3, 1, 0])],
  },
  {
    id: "p-r4", slug: "robe-wrap-beige", name: "Robe Portefeuille Beige", description: "La robe portefeuille incontournable, en crêpe satiné beige. Coupe flatteuse, ajustement parfait.", category_id: "cat-2", price: 79.90,
    images: [U("1496747611176-843222e1e57c"), U("1572804013309-59a88b7e92f1")],
    cover_image: U("1496747611176-843222e1e57c"), is_featured: false, is_active: true, display_order: 3, created_at: "", updated_at: "",
    category: DEMO_CATEGORIES[1],
    variants: [...sizes("p-r4", "Beige", "#C8A882", [5, 10, 15, 10, 5, 2])],
  },
  {
    id: "p-r5", slug: "robe-lin-ete", name: "Robe Longue Lin", description: "Robe longue en lin naturel, coupe droite, bretelles fines. Pour un été élégant et confortable.", category_id: "cat-2", price: 95.00,
    images: [U("1572804013309-59a88b7e92f1"), U("1595777457583-95e059d581b8")],
    cover_image: U("1572804013309-59a88b7e92f1"), is_featured: false, is_active: true, display_order: 4, created_at: "", updated_at: "",
    category: DEMO_CATEGORIES[1],
    variants: [...sizes("p-r5", "Écru", "#F5F0E8", [3, 7, 9, 7, 3, 1]), ...sizes("p-r5", "Sable", "#C19A6B", [2, 5, 7, 5, 2, 0])],
  },
  {
    id: "p-r6", slug: "robe-imprimee-leopard", name: "Robe Imprimé Animal", description: "Robe portefeuille à imprimé léopard, fluide et sensuelle. Un grand classique revisité.", category_id: "cat-2", price: 85.00,
    images: [U("1595777457583-95e059d581b8"), U("1539008835657-9e8e9680c956")],
    cover_image: U("1595777457583-95e059d581b8"), is_featured: false, is_active: true, display_order: 5, created_at: "", updated_at: "",
    category: DEMO_CATEGORIES[1],
    variants: [...sizes("p-r6", "Léopard", "#C8A052", [2, 6, 8, 6, 3, 1])],
  },
  {
    id: "p-r7", slug: "robe-pull-automne", name: "Robe Pull Automne", description: "Robe pull en maille douce, col roulé. Le comfort de l'automne avec une allure chic.", category_id: "cat-2", price: 75.90,
    images: [U("1568702846914-96b305d2aaeb"), U("1515372039744-b8f02a3ae446")],
    cover_image: U("1568702846914-96b305d2aaeb"), is_featured: false, is_active: true, display_order: 6, created_at: "", updated_at: "",
    category: DEMO_CATEGORIES[1],
    variants: [...sizes("p-r7", "Camel", "#C19A6B", [4, 8, 10, 8, 4, 1]), ...sizes("p-r7", "Gris chiné", "#888888", [3, 6, 9, 6, 3, 1])],
  },
  {
    id: "p-r8", slug: "robe-chemise-vichy", name: "Robe Chemise Vichy", description: "Robe chemise à carreaux vichy, boutonnée devant. Style campagne chic, entièrement doublée.", category_id: "cat-2", price: 72.00,
    images: [U("1519657337289-077653f0ac36"), U("1566174053879-31528523f8ae")],
    cover_image: U("1519657337289-077653f0ac36"), is_featured: false, is_active: true, display_order: 7, created_at: "", updated_at: "",
    category: DEMO_CATEGORIES[1],
    variants: [...sizes("p-r8", "Bleu/Blanc", "#4A90D9", [5, 9, 12, 9, 4, 1])],
  },
  {
    id: "p-r9", slug: "robe-bustier-soie", name: "Robe Bustier Soie", description: "Robe bustier en soie naturelle, buste structuré, jupe mi-longue légèrement évasée.", category_id: "cat-2", price: 149.90,
    images: [U("1581044777550-4cfa2707974b"), U("1596755094514-f87e34085b2c")],
    cover_image: U("1581044777550-4cfa2707974b"), is_featured: true, is_active: true, display_order: 8, created_at: "", updated_at: "",
    category: DEMO_CATEGORIES[1],
    variants: [...sizes("p-r9", "Ivoire", "#FFFFF0", [1, 3, 5, 3, 1, 0]), ...sizes("p-r9", "Champagne", "#F7E7CE", [1, 2, 4, 2, 1, 0])],
  },
  {
    id: "p-r10", slug: "robe-asymetrique-graphique", name: "Robe Asymétrique Graphique", description: "Robe à ourlet asymétrique, coupe moderne et architectural. Tissu scuba, maintien parfait.", category_id: "cat-2", price: 98.00,
    images: [U("1596755094514-f87e34085b2c"), U("1568702846914-96b305d2aaeb")],
    cover_image: U("1596755094514-f87e34085b2c"), is_featured: false, is_active: true, display_order: 9, created_at: "", updated_at: "",
    category: DEMO_CATEGORIES[1],
    variants: [...sizes("p-r10", "Noir", "#0A0A0A", [2, 5, 7, 5, 2, 0])],
  },
  {
    id: "p-r11", slug: "robe-dentelle-romantique", name: "Robe Dentelle Romantique", description: "Robe en dentelle de calais, doublée satin. Romantique et élégante pour toutes vos occasions.", category_id: "cat-2", price: 119.00,
    images: [U("1572804013309-59a88b7e92f1"), U("1596755094514-f87e34085b2c")],
    cover_image: U("1572804013309-59a88b7e92f1"), is_featured: false, is_active: true, display_order: 10, created_at: "", updated_at: "",
    category: DEMO_CATEGORIES[1],
    variants: [...sizes("p-r11", "Blanc cassé", "#F5F0E8", [1, 4, 6, 4, 2, 0]), ...sizes("p-r11", "Noir", "#0A0A0A", [2, 4, 6, 4, 2, 0])],
  },

  // ── HAUTS ──
  {
    id: "p-h1", slug: "blouse-florale-satin", name: "Blouse Florale Satin", description: "Blouse en satin de soie à imprimé floral, coupe loose, manches longues. Pièce signature de la maison.", category_id: "cat-3", price: 59.90,
    images: [U("1434389677669-e08b4cac3105"), U("1583744946564-b52ac1c389c8")],
    cover_image: U("1434389677669-e08b4cac3105"), is_featured: true, is_active: true, display_order: 0, created_at: "", updated_at: "",
    category: DEMO_CATEGORIES[2],
    variants: [...sizes("p-h1", "Multicolore", "#D4A574", [4, 8, 12, 8, 4, 1]), ...sizes("p-h1", "Blanc", "#FAFAFA", [3, 7, 10, 7, 3, 1])],
  },
  {
    id: "p-h2", slug: "top-soie-camisole", name: "Camisole Soie", description: "Camisole en soie naturelle, bretelles réglables, biais en satin. Le basique luxe.", category_id: "cat-3", price: 49.90,
    images: [U("1525507119028-ed4c629a60a3"), U("1434389677669-e08b4cac3105")],
    cover_image: U("1525507119028-ed4c629a60a3"), is_featured: false, is_active: true, display_order: 1, created_at: "", updated_at: "",
    category: DEMO_CATEGORIES[2],
    variants: [...sizes("p-h2", "Ivoire", "#FFFFF0", [5, 9, 13, 9, 5, 2]), ...sizes("p-h2", "Rose poudré", "#E8C4B8", [4, 8, 11, 8, 4, 1])],
  },
  {
    id: "p-h3", slug: "chemise-rayee-marine", name: "Chemise Rayée Marine", description: "Chemise en popeline de coton à rayures marines. Coupe droite légèrement oversize, col classique.", category_id: "cat-3", price: 65.00,
    images: [U("1583744946564-b52ac1c389c8"), U("1525507119028-ed4c629a60a3")],
    cover_image: U("1583744946564-b52ac1c389c8"), is_featured: false, is_active: true, display_order: 2, created_at: "", updated_at: "",
    category: DEMO_CATEGORIES[2],
    variants: [...sizes("p-h3", "Marine/Blanc", "#1A2B4C", [4, 8, 11, 8, 4, 1])],
  },
  {
    id: "p-h4", slug: "pull-col-v-cachemire", name: "Pull Col V Cachemire", description: "Pull en cachemire 2 fils, col V légèrement ouvert. Un investissement durable et élégant.", category_id: "cat-3", price: 135.00,
    images: [U("1490481651871-ab68de25d43d"), U("1583744946564-b52ac1c389c8")],
    cover_image: U("1490481651871-ab68de25d43d"), is_featured: true, is_active: true, display_order: 3, created_at: "", updated_at: "",
    category: DEMO_CATEGORIES[2],
    variants: [...sizes("p-h4", "Beige", "#C8A882", [3, 6, 8, 6, 3, 1]), ...sizes("p-h4", "Gris", "#888888", [2, 5, 7, 5, 2, 1]), ...sizes("p-h4", "Noir", "#0A0A0A", [4, 7, 9, 7, 4, 1])],
  },
  {
    id: "p-h5", slug: "top-dos-nu-satin", name: "Top Dos-Nu Satin", description: "Top à dos ouvert en satin fluide, maintenu par de fines bretelles croisées. Glamour discret.", category_id: "cat-3", price: 45.90,
    images: [U("1519657337289-077653f0ac36"), U("1525507119028-ed4c629a60a3")],
    cover_image: U("1519657337289-077653f0ac36"), is_featured: false, is_active: true, display_order: 4, created_at: "", updated_at: "",
    category: DEMO_CATEGORIES[2],
    variants: [...sizes("p-h5", "Champagne", "#F7E7CE", [3, 6, 8, 6, 3, 1]), ...sizes("p-h5", "Noir", "#0A0A0A", [4, 8, 10, 8, 4, 1])],
  },
  {
    id: "p-h6", slug: "chemisier-col-lavalliere", name: "Chemisier Col Lavallière", description: "Chemisier à grand col lavallière, en crêpe de chine. Raffiné et féminin.", category_id: "cat-3", price: 72.00,
    images: [U("1434389677669-e08b4cac3105"), U("1490481651871-ab68de25d43d")],
    cover_image: U("1434389677669-e08b4cac3105"), is_featured: false, is_active: true, display_order: 5, created_at: "", updated_at: "",
    category: DEMO_CATEGORIES[2],
    variants: [...sizes("p-h6", "Blanc", "#FAFAFA", [4, 8, 11, 8, 4, 1]), ...sizes("p-h6", "Bleu lavande", "#B8A9C9", [2, 5, 7, 5, 2, 0])],
  },
  {
    id: "p-h7", slug: "body-dentelle-noir", name: "Body Dentelle Noir", description: "Body en dentelle de calais, manches longues, col montant. Se porte avec un pantalon ou sous un blazer.", category_id: "cat-3", price: 55.00,
    images: [U("1583744946564-b52ac1c389c8"), U("1434389677669-e08b4cac3105")],
    cover_image: U("1583744946564-b52ac1c389c8"), is_featured: false, is_active: true, display_order: 6, created_at: "", updated_at: "",
    category: DEMO_CATEGORIES[2],
    variants: [...sizes("p-h7", "Noir", "#0A0A0A", [3, 7, 9, 7, 3, 1])],
  },
  {
    id: "p-h8", slug: "pull-mohair-rose", name: "Pull Mohair Rose", description: "Pull en mohair doux, coupe oversize et décontractée. La douceur incarnée.", category_id: "cat-3", price: 89.00,
    images: [U("1525507119028-ed4c629a60a3"), U("1490481651871-ab68de25d43d")],
    cover_image: U("1525507119028-ed4c629a60a3"), is_featured: false, is_active: true, display_order: 7, created_at: "", updated_at: "",
    category: DEMO_CATEGORIES[2],
    variants: [...sizes("p-h8", "Rose poudré", "#E8C4B8", [3, 6, 8, 6, 3, 1]), ...sizes("p-h8", "Blanc", "#FAFAFA", [2, 5, 7, 5, 2, 0])],
  },
  {
    id: "p-h9", slug: "top-broderie-anglaise", name: "Top Broderie Anglaise", description: "Top en broderie anglaise blanche, encolure carrée, manches courtes. Fraîcheur et légèreté.", category_id: "cat-3", price: 52.00,
    images: [U("1490481651871-ab68de25d43d"), U("1583744946564-b52ac1c389c8")],
    cover_image: U("1490481651871-ab68de25d43d"), is_featured: false, is_active: true, display_order: 8, created_at: "", updated_at: "",
    category: DEMO_CATEGORIES[2],
    variants: [...sizes("p-h9", "Blanc", "#FAFAFA", [5, 9, 12, 9, 5, 2])],
  },
  {
    id: "p-h10", slug: "cardigan-long-boheme", name: "Cardigan Long Bohème", description: "Long cardigan en maille côtelée, ouverture boutonnée, poches latérales. Style bohème chic.", category_id: "cat-3", price: 98.00,
    images: [U("1583744946564-b52ac1c389c8"), U("1525507119028-ed4c629a60a3")],
    cover_image: U("1583744946564-b52ac1c389c8"), is_featured: false, is_active: true, display_order: 9, created_at: "", updated_at: "",
    category: DEMO_CATEGORIES[2],
    variants: [...sizes("p-h10", "Camel", "#C19A6B", [3, 6, 8, 6, 3, 1]), ...sizes("p-h10", "Gris chiné", "#888888", [2, 5, 7, 5, 2, 1])],
  },

  // ── PANTALONS ──
  {
    id: "p-p1", slug: "pantalon-taille-haute-noir", name: "Pantalon Taille Haute Noir", description: "Pantalon taille haute en crêpe fluide, coupe droite. La base indispensable du dressing contemporain.", category_id: "cat-4", price: 75.90,
    images: [U("1541099649105-f69ad21f3246"), U("1475178626620-a4d074967452")],
    cover_image: U("1541099649105-f69ad21f3246"), is_featured: true, is_active: true, display_order: 0, created_at: "", updated_at: "",
    category: DEMO_CATEGORIES[3],
    variants: [...sizes("p-p1", "Noir", "#0A0A0A", [4, 8, 12, 8, 4, 1]), ...sizes("p-p1", "Marine", "#1A2B4C", [3, 6, 9, 6, 3, 1])],
  },
  {
    id: "p-p2", slug: "jean-coupe-droite-delave", name: "Jean Coupe Droite Délavé", description: "Jean 5 poches en denim stretch délavé, coupe droite légèrement ample. Confort toute la journée.", category_id: "cat-4", price: 89.00,
    images: [U("1475178626620-a4d074967452"), U("1541099649105-f69ad21f3246")],
    cover_image: U("1475178626620-a4d074967452"), is_featured: false, is_active: true, display_order: 1, created_at: "", updated_at: "",
    category: DEMO_CATEGORIES[3],
    variants: [...sizes("p-p2", "Bleu délavé", "#6B8BA4", [3, 7, 10, 7, 3, 1])],
  },
  {
    id: "p-p3", slug: "pantalon-large-imprime", name: "Pantalon Large Imprimé", description: "Pantalon palazzo à imprimé graphique, ceinture élastiquée, fluide et confortable.", category_id: "cat-4", price: 68.00,
    images: [U("1506629082955-511b1aa562c8"), U("1475178626620-a4d074967452")],
    cover_image: U("1506629082955-511b1aa562c8"), is_featured: true, is_active: true, display_order: 2, created_at: "", updated_at: "",
    category: DEMO_CATEGORIES[3],
    variants: [...sizes("p-p3", "Multicolore", "#8B7355", [3, 6, 9, 6, 3, 1])],
  },
  {
    id: "p-p4", slug: "jogger-satin-luxe", name: "Jogger Satin Luxe", description: "Pantalon jogger en satin de soie, élastique en taille, poches zippées. Confort et élégance réunis.", category_id: "cat-4", price: 85.00,
    images: [U("1541099649105-f69ad21f3246"), U("1506629082955-511b1aa562c8")],
    cover_image: U("1541099649105-f69ad21f3246"), is_featured: false, is_active: true, display_order: 3, created_at: "", updated_at: "",
    category: DEMO_CATEGORIES[3],
    variants: [...sizes("p-p4", "Champagne", "#F7E7CE", [2, 5, 7, 5, 2, 0]), ...sizes("p-p4", "Noir", "#0A0A0A", [3, 7, 9, 7, 3, 1])],
  },
  {
    id: "p-p5", slug: "culottes-shorts-lin", name: "Culotte Short Lin", description: "Short tailleur en lin, taille haute, poches passepoilées. Élégance décontractée pour l'été.", category_id: "cat-4", price: 55.00,
    images: [U("1475178626620-a4d074967452"), U("1506629082955-511b1aa562c8")],
    cover_image: U("1475178626620-a4d074967452"), is_featured: false, is_active: true, display_order: 4, created_at: "", updated_at: "",
    category: DEMO_CATEGORIES[3],
    variants: [...sizes("p-p5", "Écru", "#F5F0E8", [4, 8, 11, 8, 4, 1]), ...sizes("p-p5", "Kaki", "#5C6641", [2, 5, 7, 5, 2, 0])],
  },

  // ── VESTES ──
  {
    id: "p-v1", slug: "trench-coat-classique", name: "Trench-Coat Classique", description: "Trench-coat iconique en gabardine imperméable, double boutonnage, ceinture à nouer. Indémodable.", category_id: "cat-5", price: 195.00,
    images: [U("1591047139829-d91aecb6caea"), U("1548624313-0396a0857dfe")],
    cover_image: U("1591047139829-d91aecb6caea"), is_featured: true, is_active: true, display_order: 0, created_at: "", updated_at: "",
    category: DEMO_CATEGORIES[4],
    variants: [...sizes("p-v1", "Camel", "#C19A6B", [2, 4, 6, 4, 2, 0]), ...sizes("p-v1", "Beige", "#C8A882", [1, 3, 5, 3, 1, 0])],
  },
  {
    id: "p-v2", slug: "blazer-structuree-noir", name: "Blazer Structuré Noir", description: "Blazer tailleur en laine et soie, épaulettes légères, doublé satin. La veste de tous les pouvoirs.", category_id: "cat-5", price: 155.00,
    images: [U("1544022613-e87ca75a784a"), U("1591047139829-d91aecb6caea")],
    cover_image: U("1544022613-e87ca75a784a"), is_featured: true, is_active: true, display_order: 1, created_at: "", updated_at: "",
    category: DEMO_CATEGORIES[4],
    variants: [...sizes("p-v2", "Noir", "#0A0A0A", [2, 4, 6, 4, 2, 0]), ...sizes("p-v2", "Marine", "#1A2B4C", [1, 3, 5, 3, 1, 0])],
  },
  {
    id: "p-v3", slug: "veste-cuir-courte", name: "Veste Cuir Courte", description: "Veste courte en agneau nappa, col mao, fermeture zippée. Rock et féminin à la fois.", category_id: "cat-5", price: 245.00,
    images: [U("1548624313-0396a0857dfe"), U("1544022613-e87ca75a784a")],
    cover_image: U("1548624313-0396a0857dfe"), is_featured: true, is_active: true, display_order: 2, created_at: "", updated_at: "",
    category: DEMO_CATEGORIES[4],
    variants: [...sizes("p-v3", "Noir", "#0A0A0A", [1, 3, 4, 3, 1, 0]), ...sizes("p-v3", "Cognac", "#8B4513", [1, 2, 3, 2, 1, 0])],
  },
  {
    id: "p-v4", slug: "veste-tweed-fantaisie", name: "Veste Tweed Fantaisie", description: "Veste courte en tweed multicolore, boutons dorés, col rond. L'esprit couture accessible.", category_id: "cat-5", price: 175.00,
    images: [U("1544022613-e87ca75a784a"), U("1548624313-0396a0857dfe")],
    cover_image: U("1544022613-e87ca75a784a"), is_featured: false, is_active: true, display_order: 3, created_at: "", updated_at: "",
    category: DEMO_CATEGORIES[4],
    variants: [...sizes("p-v4", "Multicolore", "#C8A882", [1, 3, 4, 3, 1, 0])],
  },

  // ── ACCESSOIRES ──
  {
    id: "p-a1", slug: "sac-cabas-cuir-naturel", name: "Sac Cabas Cuir", description: "Grand cabas en cuir naturel, intérieur zippé, deux poches latérales. Spacieux et élégant.", category_id: "cat-6", price: 165.00,
    images: [U("1584917865442-de89df76afd3"), U("1590874103328-eac38a683ce7")],
    cover_image: U("1584917865442-de89df76afd3"), is_featured: true, is_active: true, display_order: 0, created_at: "", updated_at: "",
    category: DEMO_CATEGORIES[5],
    variants: [v("p-a1", "Cognac", "#8B4513", "TU", 8), v("p-a1", "Noir", "#0A0A0A", "TU", 5), v("p-a1", "Camel", "#C19A6B", "TU", 4)],
  },
  {
    id: "p-a2", slug: "foulard-soie-imprime", name: "Foulard Soie Imprimé", description: "Carré de soie 90x90, imprimé original exclusif. Se porte dans les cheveux, autour du cou ou sur le sac.", category_id: "cat-6", price: 79.90,
    images: [U("1590874103328-eac38a683ce7"), U("1584917865442-de89df76afd3")],
    cover_image: U("1590874103328-eac38a683ce7"), is_featured: false, is_active: true, display_order: 1, created_at: "", updated_at: "",
    category: DEMO_CATEGORIES[5],
    variants: [v("p-a2", "Multicolore", "#D4A574", "TU", 15), v("p-a2", "Marine", "#1A2B4C", "TU", 8)],
  },
  {
    id: "p-a3", slug: "ceinture-cuir-boucle-doree", name: "Ceinture Cuir Boucle Dorée", description: "Ceinture en cuir pleine fleur, boucle dorée rectangulaire. La touche chic qui fait la différence.", category_id: "cat-6", price: 55.00,
    images: [U("1611085583191-a3b181a88401"), U("1584917865442-de89df76afd3")],
    cover_image: U("1611085583191-a3b181a88401"), is_featured: false, is_active: true, display_order: 2, created_at: "", updated_at: "",
    category: DEMO_CATEGORIES[5],
    variants: [v("p-a3", "Noir", "#0A0A0A", "TU", 10), v("p-a3", "Cognac", "#8B4513", "TU", 7)],
  },
];

// ─── Utilitaires ──────────────────────────────────────────────────
export function getDemoProductsByCategory(categoryId: string): Product[] {
  return DEMO_PRODUCTS.filter((p) => p.category_id === categoryId);
}

export function getDemoProductBySlug(slug: string): Product | null {
  return DEMO_PRODUCTS.find((p) => p.slug === slug) ?? null;
}

export function getDemoCategoryBySlug(slug: string): Category | null {
  return DEMO_CATEGORIES.find((c) => c.slug === slug) ?? null;
}

export function getDemoFeatured(limit = 8): Product[] {
  return DEMO_PRODUCTS.filter((p) => p.is_featured).slice(0, limit);
}

export function getDemoRelated(categoryId: string, excludeId: string, limit = 4): Product[] {
  return DEMO_PRODUCTS.filter((p) => p.category_id === categoryId && p.id !== excludeId).slice(0, limit);
}
