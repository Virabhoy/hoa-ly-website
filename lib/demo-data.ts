import type { Category, Product, ProductVariant } from "./supabase/types";

const U = (id: string, w = 800, h = 1067) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

const L = (filename: string) => `/images/${filename}`;

// ─── Catégories ───────────────────────────────────────────────────
export const DEMO_CATEGORIES: Category[] = [
  { id: "cat-1", slug: "nouveautes", name: "Nouveautés", description: "Les dernières pièces de la saison", cover_image: L("D04B8981.jpg"), display_order: 0, created_at: "" },
  { id: "cat-2", slug: "robes", name: "Robes", description: "Robes et tenues féminines d'inspiration asiatique", cover_image: L("D04B9067.jpg"), display_order: 1, created_at: "" },
  { id: "cat-3", slug: "hauts", name: "Hauts & Tops", description: "Hauts brodés et chemises d'exception", cover_image: L("D04B9137.jpg"), display_order: 2, created_at: "" },
  { id: "cat-4", slug: "pantalons", name: "Pantalons & Ensembles", description: "Ensembles et pantalons contemporains", cover_image: L("D04B9089.jpg"), display_order: 3, created_at: "" },
  { id: "cat-5", slug: "vestes", name: "Vestes & Manteaux", description: "Vestes traditionnelles et manteaux d'exception", cover_image: L("D04B8902.jpg"), display_order: 4, created_at: "" },
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
    id: "p-r1", slug: "robe-qipao-rouge", name: "Robe Qipao Rouge",
    description: "Robe qipao en satin rouge, col mandarin, motifs bambou et fleurs dorés. Une pièce iconique de la mode asiatique, élégante et structurée. Fermeture cachée sur le côté, fente sur l'ourlet.",
    category_id: "cat-2", price: 89.90,
    images: [L("D04B9161.jpg"), L("D04B9067.jpg")],
    cover_image: L("D04B9161.jpg"), is_featured: true, is_active: true, display_order: 0, created_at: "", updated_at: "",
    category: DEMO_CATEGORIES[1],
    variants: [...sizes("p-r1", "Rouge", "#C0392B", [3, 8, 12, 7, 4, 1]), ...sizes("p-r1", "Bordeaux", "#6D2B3D", [2, 5, 8, 5, 2, 0])],
  },
  {
    id: "p-r2", slug: "ao-dai-rouge-brode", name: "Áo Dài Rouge Brodée",
    description: "Magnifique áo dài en soie rouge, broderies dorées de fleurs et motifs traditionnels vietnamiens. Coupe droite et élancée, chapeau assorti inclus sur commande. La robe nationale revisitée avec raffinement.",
    category_id: "cat-2", price: 125.00,
    images: [L("D04B9067.jpg"), L("D04B9161.jpg")],
    cover_image: L("D04B9067.jpg"), is_featured: true, is_active: true, display_order: 1, created_at: "", updated_at: "",
    category: DEMO_CATEGORIES[1],
    variants: [...sizes("p-r2", "Rouge doré", "#C0392B", [4, 9, 14, 10, 5, 2])],
  },
  {
    id: "p-r3", slug: "ao-dai-bleu-fleuri", name: "Áo Dài Bleu Fleuri",
    description: "Áo dài en tissu bleu délicat avec broderies florales et motifs abstraits bleus et verts. Coupe longue et fluide, parfaite pour les cérémonies et grandes occasions.",
    category_id: "cat-2", price: 115.00,
    images: [L("D04B9112.jpg"), L("D04B9067.jpg")],
    cover_image: L("D04B9112.jpg"), is_featured: true, is_active: true, display_order: 2, created_at: "", updated_at: "",
    category: DEMO_CATEGORIES[1],
    variants: [...sizes("p-r3", "Bleu", "#4A90D9", [1, 4, 6, 4, 2, 0]), ...sizes("p-r3", "Indigo", "#1A2B4C", [2, 3, 5, 3, 1, 0])],
  },
  {
    id: "p-r4", slug: "kimono-bordeaux-fleuri", name: "Kimono Bordeaux Fleuri",
    description: "Kimono court en satin bordeaux, imprimé floral japonais en harmonie de rouge et rose. Ceinturé à la taille, manches larges traditionnelles. Une pièce bohème et précieuse.",
    category_id: "cat-2", price: 98.00,
    images: [L("D04B9153.jpg"), L("D04B9161.jpg")],
    cover_image: L("D04B9153.jpg"), is_featured: false, is_active: true, display_order: 3, created_at: "", updated_at: "",
    category: DEMO_CATEGORIES[1],
    variants: [...sizes("p-r4", "Bordeaux fleuri", "#6D2B3D", [5, 10, 15, 10, 5, 2])],
  },
  {
    id: "p-r5", slug: "robe-qipao-enfant-rouge", name: "Robe Qipao Enfant",
    description: "Robe qipao enfant en satin rouge, col mandarin, motifs bambou et fleurs dorés. Une pièce traditionnelle pour les petites demoiselles lors des fêtes du Têt et grandes occasions.",
    category_id: "cat-2", price: 45.00,
    images: [L("PER_9038.jpg")],
    cover_image: L("PER_9038.jpg"), is_featured: false, is_active: true, display_order: 4, created_at: "", updated_at: "",
    category: DEMO_CATEGORIES[1],
    variants: [v("p-r5", "Rouge", "#C0392B", "2-3 ans", 5), v("p-r5", "Rouge", "#C0392B", "4-5 ans", 8), v("p-r5", "Rouge", "#C0392B", "6-7 ans", 6), v("p-r5", "Rouge", "#C0392B", "8-10 ans", 4)],
  },
  {
    id: "p-r6", slug: "robe-imprimee-leopard", name: "Robe Imprimé Animal",
    description: "Robe portefeuille à imprimé léopard, fluide et sensuelle. Un grand classique revisité.",
    category_id: "cat-2", price: 85.00,
    images: [U("1595777457583-95e059d581b8"), U("1539008835657-9e8e9680c956")],
    cover_image: U("1595777457583-95e059d581b8"), is_featured: false, is_active: true, display_order: 5, created_at: "", updated_at: "",
    category: DEMO_CATEGORIES[1],
    variants: [...sizes("p-r6", "Léopard", "#C8A052", [2, 6, 8, 6, 3, 1])],
  },
  {
    id: "p-r7", slug: "robe-pull-automne", name: "Robe Pull Automne",
    description: "Robe pull en maille douce, col roulé. Le confort de l'automne avec une allure chic.",
    category_id: "cat-2", price: 75.90,
    images: [U("1568702846914-96b305d2aaeb"), U("1515372039744-b8f02a3ae446")],
    cover_image: U("1568702846914-96b305d2aaeb"), is_featured: false, is_active: true, display_order: 6, created_at: "", updated_at: "",
    category: DEMO_CATEGORIES[1],
    variants: [...sizes("p-r7", "Camel", "#C19A6B", [4, 8, 10, 8, 4, 1]), ...sizes("p-r7", "Gris chiné", "#888888", [3, 6, 9, 6, 3, 1])],
  },
  {
    id: "p-r8", slug: "robe-chemise-vichy", name: "Robe Chemise Vichy",
    description: "Robe chemise à carreaux vichy, boutonnée devant. Style campagne chic, entièrement doublée.",
    category_id: "cat-2", price: 72.00,
    images: [U("1519657337289-077653f0ac36"), U("1566174053879-31528523f8ae")],
    cover_image: U("1519657337289-077653f0ac36"), is_featured: false, is_active: true, display_order: 7, created_at: "", updated_at: "",
    category: DEMO_CATEGORIES[1],
    variants: [...sizes("p-r8", "Bleu/Blanc", "#4A90D9", [5, 9, 12, 9, 4, 1])],
  },
  {
    id: "p-r9", slug: "kimono-satin-noir-dragon", name: "Kimono Satin Noir Dragon",
    description: "Kimono long en satin noir, broderie dragon doré sur la poitrine, bordures rouges contrastées. Une pièce majestueuse alliant force et élégance, idéale pour les soirées.",
    category_id: "cat-2", price: 149.90,
    images: [L("D04B9128.jpg")],
    cover_image: L("D04B9128.jpg"), is_featured: true, is_active: true, display_order: 8, created_at: "", updated_at: "",
    category: DEMO_CATEGORIES[1],
    variants: [...sizes("p-r9", "Noir/Rouge", "#0A0A0A", [1, 3, 5, 3, 1, 0])],
  },
  {
    id: "p-r10", slug: "robe-asymetrique-graphique", name: "Robe Asymétrique Graphique",
    description: "Robe à ourlet asymétrique, coupe moderne et architecturale. Tissu scuba, maintien parfait.",
    category_id: "cat-2", price: 98.00,
    images: [U("1596755094514-f87e34085b2c"), U("1568702846914-96b305d2aaeb")],
    cover_image: U("1596755094514-f87e34085b2c"), is_featured: false, is_active: true, display_order: 9, created_at: "", updated_at: "",
    category: DEMO_CATEGORIES[1],
    variants: [...sizes("p-r10", "Noir", "#0A0A0A", [2, 5, 7, 5, 2, 0])],
  },
  {
    id: "p-r11", slug: "robe-dentelle-romantique", name: "Robe Dentelle Romantique",
    description: "Robe en dentelle de calais, doublée satin. Romantique et élégante pour toutes vos occasions.",
    category_id: "cat-2", price: 119.00,
    images: [U("1572804013309-59a88b7e92f1"), U("1596755094514-f87e34085b2c")],
    cover_image: U("1572804013309-59a88b7e92f1"), is_featured: false, is_active: true, display_order: 10, created_at: "", updated_at: "",
    category: DEMO_CATEGORIES[1],
    variants: [...sizes("p-r11", "Blanc cassé", "#F5F0E8", [1, 4, 6, 4, 2, 0]), ...sizes("p-r11", "Noir", "#0A0A0A", [2, 4, 6, 4, 2, 0])],
  },

  // ── HAUTS ──
  {
    id: "p-h1", slug: "haut-brode-phoenix", name: "Haut Brodé Phoenix",
    description: "Haut en tissu camel avec grande broderie phoenix multicolore sur la poitrine. Un mariage contemporain entre l'élégance parisienne et la tradition asiatique. Se porte avec un pantalon noir.",
    category_id: "cat-3", price: 75.00,
    images: [L("D04B9137.jpg")],
    cover_image: L("D04B9137.jpg"), is_featured: true, is_active: true, display_order: 0, created_at: "", updated_at: "",
    category: DEMO_CATEGORIES[2],
    variants: [...sizes("p-h1", "Camel", "#C8A882", [4, 8, 12, 8, 4, 1])],
  },
  {
    id: "p-h2", slug: "top-qipao-bleu-marine", name: "Top Qipao Bleu Marine",
    description: "Top style qipao en satin bleu marine, motifs floraux argentés, col mandarin. Élégant et féminin, se porte avec un pantalon ou une jupe longue.",
    category_id: "cat-3", price: 65.00,
    images: [L("D04B9150.jpg")],
    cover_image: L("D04B9150.jpg"), is_featured: false, is_active: true, display_order: 1, created_at: "", updated_at: "",
    category: DEMO_CATEGORIES[2],
    variants: [...sizes("p-h2", "Bleu Marine", "#1A2B4C", [5, 9, 13, 9, 5, 2])],
  },
  {
    id: "p-h3", slug: "chemise-tang-rouge", name: "Chemise Tang Rouge Brodée",
    description: "Chemise style Tang en satin rouge, motifs dragons et fleurs dorés tissés, boutons pression traditionnels. Coupe droite élégante, col mandarin. Porte avec un pantalon noir pour un look affirmé.",
    category_id: "cat-3", price: 89.00,
    images: [L("D04B9094.jpg")],
    cover_image: L("D04B9094.jpg"), is_featured: false, is_active: true, display_order: 2, created_at: "", updated_at: "",
    category: DEMO_CATEGORIES[2],
    variants: [...sizes("p-h3", "Rouge doré", "#C0392B", [4, 8, 11, 8, 4, 1])],
  },
  {
    id: "p-h4", slug: "chemise-tang-grise", name: "Chemise Tang Grise",
    description: "Chemise style kung fu en lin gris, col mandarin, boutons traditionnels dorés et orange. Sobre et distingué, idéal pour toutes occasions. Version manches longues et manches courtes disponibles.",
    category_id: "cat-3", price: 79.00,
    images: [L("D04B9182.jpg"), L("D04B8902.jpg")],
    cover_image: L("D04B9182.jpg"), is_featured: true, is_active: true, display_order: 3, created_at: "", updated_at: "",
    category: DEMO_CATEGORIES[2],
    variants: [...sizes("p-h4", "Gris clair", "#888888", [3, 6, 8, 6, 3, 1])],
  },
  {
    id: "p-h5", slug: "chemise-kung-fu-noire-dragon", name: "Chemise Kung Fu Noire Dragon",
    description: "Chemise kung fu manches courtes en coton noir, broderie dragon doré en relief sur la poitrine. Style arts martiaux revisité en look urbain, coupe décontractée.",
    category_id: "cat-3", price: 69.00,
    images: [L("D04B9089.jpg"), L("D04B9149.jpg")],
    cover_image: L("D04B9089.jpg"), is_featured: false, is_active: true, display_order: 4, created_at: "", updated_at: "",
    category: DEMO_CATEGORIES[2],
    variants: [...sizes("p-h5", "Noir/Or", "#0A0A0A", [3, 6, 8, 6, 3, 1])],
  },
  {
    id: "p-h6", slug: "chemisier-col-lavalliere", name: "Chemisier Col Lavallière",
    description: "Chemisier à grand col lavallière, en crêpe de chine. Raffiné et féminin.",
    category_id: "cat-3", price: 72.00,
    images: [U("1434389677669-e08b4cac3105"), U("1490481651871-ab68de25d43d")],
    cover_image: U("1434389677669-e08b4cac3105"), is_featured: false, is_active: true, display_order: 5, created_at: "", updated_at: "",
    category: DEMO_CATEGORIES[2],
    variants: [...sizes("p-h6", "Blanc", "#FAFAFA", [4, 8, 11, 8, 4, 1]), ...sizes("p-h6", "Bleu lavande", "#B8A9C9", [2, 5, 7, 5, 2, 0])],
  },
  {
    id: "p-h7", slug: "body-dentelle-noir", name: "Body Dentelle Noir",
    description: "Body en dentelle de calais, manches longues, col montant. Se porte avec un pantalon ou sous un blazer.",
    category_id: "cat-3", price: 55.00,
    images: [U("1583744946564-b52ac1c389c8"), U("1434389677669-e08b4cac3105")],
    cover_image: U("1583744946564-b52ac1c389c8"), is_featured: false, is_active: true, display_order: 6, created_at: "", updated_at: "",
    category: DEMO_CATEGORIES[2],
    variants: [...sizes("p-h7", "Noir", "#0A0A0A", [3, 7, 9, 7, 3, 1])],
  },
  {
    id: "p-h8", slug: "pull-mohair-rose", name: "Pull Mohair Rose",
    description: "Pull en mohair doux, coupe oversize et décontractée. La douceur incarnée.",
    category_id: "cat-3", price: 89.00,
    images: [U("1525507119028-ed4c629a60a3"), U("1490481651871-ab68de25d43d")],
    cover_image: U("1525507119028-ed4c629a60a3"), is_featured: false, is_active: true, display_order: 7, created_at: "", updated_at: "",
    category: DEMO_CATEGORIES[2],
    variants: [...sizes("p-h8", "Rose poudré", "#E8C4B8", [3, 6, 8, 6, 3, 1]), ...sizes("p-h8", "Blanc", "#FAFAFA", [2, 5, 7, 5, 2, 0])],
  },
  {
    id: "p-h9", slug: "top-broderie-anglaise", name: "Top Broderie Anglaise",
    description: "Top en broderie anglaise blanche, encolure carrée, manches courtes. Fraîcheur et légèreté.",
    category_id: "cat-3", price: 52.00,
    images: [U("1490481651871-ab68de25d43d"), U("1583744946564-b52ac1c389c8")],
    cover_image: U("1490481651871-ab68de25d43d"), is_featured: false, is_active: true, display_order: 8, created_at: "", updated_at: "",
    category: DEMO_CATEGORIES[2],
    variants: [...sizes("p-h9", "Blanc", "#FAFAFA", [5, 9, 12, 9, 5, 2])],
  },
  {
    id: "p-h10", slug: "cardigan-long-boheme", name: "Cardigan Long Bohème",
    description: "Long cardigan en maille côtelée, ouverture boutonnée, poches latérales. Style bohème chic.",
    category_id: "cat-3", price: 98.00,
    images: [U("1583744946564-b52ac1c389c8"), U("1525507119028-ed4c629a60a3")],
    cover_image: U("1583744946564-b52ac1c389c8"), is_featured: false, is_active: true, display_order: 9, created_at: "", updated_at: "",
    category: DEMO_CATEGORIES[2],
    variants: [...sizes("p-h10", "Camel", "#C19A6B", [3, 6, 8, 6, 3, 1]), ...sizes("p-h10", "Gris chiné", "#888888", [2, 5, 7, 5, 2, 1])],
  },

  // ── PANTALONS & ENSEMBLES ──
  {
    id: "p-p1", slug: "ensemble-noir-dragon-rouge", name: "Ensemble Noir Dragon Rouge",
    description: "Ensemble veste et pantalon en coton noir, broderies dragon rouge et motifs circulaires en relief. Style kung fu contemporain, élégant et affirmé. Disponible séparément sur demande.",
    category_id: "cat-4", price: 165.00,
    images: [L("D04B9149.jpg"), L("D04B9089.jpg")],
    cover_image: L("D04B9149.jpg"), is_featured: true, is_active: true, display_order: 0, created_at: "", updated_at: "",
    category: DEMO_CATEGORIES[3],
    variants: [...sizes("p-p1", "Noir/Rouge", "#0A0A0A", [4, 8, 12, 8, 4, 1])],
  },
  {
    id: "p-p2", slug: "ensemble-tang-bleu-cobalt", name: "Ensemble Tang Bleu Cobalt",
    description: "Ensemble veste et pantalon en lin bleu cobalt teint naturellement. Style Tang chinois, finitions artisanales, boutons brodés. Un look complet, sobre et saisissant.",
    category_id: "cat-4", price: 185.00,
    images: [L("D04B8910.jpg")],
    cover_image: L("D04B8910.jpg"), is_featured: false, is_active: true, display_order: 1, created_at: "", updated_at: "",
    category: DEMO_CATEGORIES[3],
    variants: [...sizes("p-p2", "Bleu cobalt", "#1A4CC9", [3, 7, 10, 7, 3, 1])],
  },
  {
    id: "p-p3", slug: "pantalon-large-imprime", name: "Pantalon Large Imprimé",
    description: "Pantalon palazzo à imprimé graphique, ceinture élastiquée, fluide et confortable.",
    category_id: "cat-4", price: 68.00,
    images: [U("1506629082955-511b1aa562c8"), U("1475178626620-a4d074967452")],
    cover_image: U("1506629082955-511b1aa562c8"), is_featured: true, is_active: true, display_order: 2, created_at: "", updated_at: "",
    category: DEMO_CATEGORIES[3],
    variants: [...sizes("p-p3", "Multicolore", "#8B7355", [3, 6, 9, 6, 3, 1])],
  },
  {
    id: "p-p4", slug: "jogger-satin-luxe", name: "Jogger Satin Luxe",
    description: "Pantalon jogger en satin de soie, élastique en taille, poches zippées. Confort et élégance réunis.",
    category_id: "cat-4", price: 85.00,
    images: [U("1541099649105-f69ad21f3246"), U("1506629082955-511b1aa562c8")],
    cover_image: U("1541099649105-f69ad21f3246"), is_featured: false, is_active: true, display_order: 3, created_at: "", updated_at: "",
    category: DEMO_CATEGORIES[3],
    variants: [...sizes("p-p4", "Champagne", "#F7E7CE", [2, 5, 7, 5, 2, 0]), ...sizes("p-p4", "Noir", "#0A0A0A", [3, 7, 9, 7, 3, 1])],
  },
  {
    id: "p-p5", slug: "culottes-shorts-lin", name: "Culotte Short Lin",
    description: "Short tailleur en lin, taille haute, poches passepoilées. Élégance décontractée pour l'été.",
    category_id: "cat-4", price: 55.00,
    images: [U("1475178626620-a4d074967452"), U("1506629082955-511b1aa562c8")],
    cover_image: U("1475178626620-a4d074967452"), is_featured: false, is_active: true, display_order: 4, created_at: "", updated_at: "",
    category: DEMO_CATEGORIES[3],
    variants: [...sizes("p-p5", "Écru", "#F5F0E8", [4, 8, 11, 8, 4, 1]), ...sizes("p-p5", "Kaki", "#5C6641", [2, 5, 7, 5, 2, 0])],
  },

  // ── VESTES ──
  {
    id: "p-v1", slug: "manteau-wax-colore-paris", name: "Manteau Wax Coloré Paris",
    description: "Manteau en tissu wax multicolore, coupe mi-longue structurée, boutons assortis. Une explosion de couleurs et de joie, photographié devant l'Hôtel de Ville de Paris. Pièce unique de la collection.",
    category_id: "cat-5", price: 195.00,
    images: [L("D04B8981.jpg")],
    cover_image: L("D04B8981.jpg"), is_featured: true, is_active: true, display_order: 0, created_at: "", updated_at: "",
    category: DEMO_CATEGORIES[4],
    variants: [...sizes("p-v1", "Multicolore", "#D4A574", [2, 4, 6, 4, 2, 0])],
  },
  {
    id: "p-v2", slug: "veste-tang-grise", name: "Veste Tang Grise",
    description: "Veste style Tang en lin gris, col mandarin, boutons traditionnels orange et dorés. Coupe droite et élancée, finitions artisanales soignées. La veste fusion qui traverse les saisons.",
    category_id: "cat-5", price: 145.00,
    images: [L("D04B8902.jpg"), L("D04B9182.jpg")],
    cover_image: L("D04B8902.jpg"), is_featured: true, is_active: true, display_order: 1, created_at: "", updated_at: "",
    category: DEMO_CATEGORIES[4],
    variants: [...sizes("p-v2", "Gris", "#888888", [2, 4, 6, 4, 2, 0])],
  },
  {
    id: "p-v3", slug: "veste-tang-fuchsia", name: "Veste Tang Fuchsia Dorée",
    description: "Veste Tang en satin fuchsia, motifs dorés tissés, boutons pression traditionnels. Audacieuse et raffinée, idéale pour les fêtes du Têt, mariages et occasions spéciales.",
    category_id: "cat-5", price: 175.00,
    images: [L("D04B9146.jpg")],
    cover_image: L("D04B9146.jpg"), is_featured: true, is_active: true, display_order: 2, created_at: "", updated_at: "",
    category: DEMO_CATEGORIES[4],
    variants: [...sizes("p-v3", "Fuchsia", "#C0157A", [1, 3, 4, 3, 1, 0])],
  },
  {
    id: "p-v4", slug: "veste-tweed-fantaisie", name: "Veste Tweed Fantaisie",
    description: "Veste courte en tweed multicolore, boutons dorés, col rond. L'esprit couture accessible.",
    category_id: "cat-5", price: 175.00,
    images: [U("1544022613-e87ca75a784a"), U("1548624313-0396a0857dfe")],
    cover_image: U("1544022613-e87ca75a784a"), is_featured: false, is_active: true, display_order: 3, created_at: "", updated_at: "",
    category: DEMO_CATEGORIES[4],
    variants: [...sizes("p-v4", "Multicolore", "#C8A882", [1, 3, 4, 3, 1, 0])],
  },

  // ── ACCESSOIRES ──
  {
    id: "p-a1", slug: "sac-cabas-cuir-naturel", name: "Sac Cabas Cuir",
    description: "Grand cabas en cuir naturel, intérieur zippé, deux poches latérales. Spacieux et élégant.",
    category_id: "cat-6", price: 165.00,
    images: [U("1584917865442-de89df76afd3"), U("1590874103328-eac38a683ce7")],
    cover_image: U("1584917865442-de89df76afd3"), is_featured: true, is_active: true, display_order: 0, created_at: "", updated_at: "",
    category: DEMO_CATEGORIES[5],
    variants: [v("p-a1", "Cognac", "#8B4513", "TU", 8), v("p-a1", "Noir", "#0A0A0A", "TU", 5), v("p-a1", "Camel", "#C19A6B", "TU", 4)],
  },
  {
    id: "p-a2", slug: "foulard-soie-imprime", name: "Foulard Soie Imprimé",
    description: "Carré de soie 90x90, imprimé original exclusif. Se porte dans les cheveux, autour du cou ou sur le sac.",
    category_id: "cat-6", price: 79.90,
    images: [U("1590874103328-eac38a683ce7"), U("1584917865442-de89df76afd3")],
    cover_image: U("1590874103328-eac38a683ce7"), is_featured: false, is_active: true, display_order: 1, created_at: "", updated_at: "",
    category: DEMO_CATEGORIES[5],
    variants: [v("p-a2", "Multicolore", "#D4A574", "TU", 15), v("p-a2", "Marine", "#1A2B4C", "TU", 8)],
  },
  {
    id: "p-a3", slug: "ceinture-cuir-boucle-doree", name: "Ceinture Cuir Boucle Dorée",
    description: "Ceinture en cuir pleine fleur, boucle dorée rectangulaire. La touche chic qui fait la différence.",
    category_id: "cat-6", price: 55.00,
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
