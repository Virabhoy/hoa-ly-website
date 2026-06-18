// ─── Types ────────────────────────────────────────────────────────────────────

export type ShowcaseTheme = {
  variant: string;
  bg: string;
  cardBg: string;
  text: string;
  textMid: string;
  accent: string;
  border: string;
  dark: string;
  isSerif: boolean;
  headingWeight: number;
  announcementBg: string;
  announcementText: string;
  btnBg: string;
  btnText: string;
  footerBg: string;
  footerText: string;
};

export type ShowcaseProduct = {
  id: string;
  name: string;
  price: number;
  priceStr: string;
  category: string;
  categoryLabel: string;
  images: string[];
  description: string;
  details: string;
  sizes: string[];
  sizesLabel: string;
  colors: string[];
  material: string;
  care: string;
  ref: string;
  isNew?: boolean;
};

export type ShowcaseCategory = {
  slug: string;
  name: string;
  img: string;
  count: number;
  desc: string;
};

// ─── Themes ──────────────────────────────────────────────────────────────────

export const THEMES: Record<string, ShowcaseTheme> = {
  sobre: {
    variant: "sobre",
    bg: "#FAFAF9", cardBg: "#FFFFFF",
    text: "#0A0A0A", textMid: "#6B6B6B",
    accent: "#C8A882", border: "#E5E5E5", dark: "#050505",
    isSerif: true, headingWeight: 300,
    announcementBg: "#0A0A0A", announcementText: "#FFFFFF",
    btnBg: "#0A0A0A", btnText: "#FFFFFF",
    footerBg: "#050505", footerText: "#FAFAF9",
  },
  editorial: {
    variant: "editorial",
    bg: "#FFFFFF", cardBg: "#F5F5F5",
    text: "#0A0A0A", textMid: "rgba(0,0,0,0.45)",
    accent: "#0A0A0A", border: "rgba(0,0,0,0.1)", dark: "#0A0A0A",
    isSerif: false, headingWeight: 900,
    announcementBg: "#0A0A0A", announcementText: "#FFFFFF",
    btnBg: "#0A0A0A", btnText: "#FFFFFF",
    footerBg: "#0A0A0A", footerText: "#FAFAF9",
  },
  rouge: {
    variant: "rouge",
    bg: "#FFFFFF", cardBg: "#F9FAFB",
    text: "#0F0F0F", textMid: "#6B7280",
    accent: "#DC2626", border: "#E5E7EB", dark: "#0F0F0F",
    isSerif: false, headingWeight: 800,
    announcementBg: "#DC2626", announcementText: "#FFFFFF",
    btnBg: "#DC2626", btnText: "#FFFFFF",
    footerBg: "#0F0F0F", footerText: "#FFFFFF",
  },
  elegant: {
    variant: "elegant",
    bg: "#FAF6F0", cardBg: "#FFFFFF",
    text: "#1C0A00", textMid: "rgba(28,10,0,0.55)",
    accent: "#B85C3C", border: "#E8DDD5", dark: "#1C0A00",
    isSerif: false, headingWeight: 700,
    announcementBg: "#B85C3C", announcementText: "#FFFFFF",
    btnBg: "#B85C3C", btnText: "#FFFFFF",
    footerBg: "#B85C3C", footerText: "#FFFFFF",
  },
};

// ─── Categories ───────────────────────────────────────────────────────────────

export const SHOWCASE_CATEGORIES: ShowcaseCategory[] = [
  { slug: "nouveautes", name: "Nouveautés", img: "/images/D04B8981.jpg", count: 7, desc: "Nos dernières créations et pièces phares de la saison" },
  { slug: "robes", name: "Robes", img: "/images/D04B9067.jpg", count: 6, desc: "Robes Áo Dài, Qipao et Kimono d'inspiration asiatique" },
  { slug: "hauts", name: "Hauts & Tops", img: "/images/D04B9137.jpg", count: 5, desc: "Hauts brodés, tops Qipao et chemises Tang" },
  { slug: "pantalons", name: "Pantalons", img: "/images/D04B9089.jpg", count: 3, desc: "Pantalons et bas coordonnés à nos vestes Tang" },
  { slug: "vestes", name: "Vestes", img: "/images/D04B8902.jpg", count: 4, desc: "Vestes Tang, manteaux et ensembles" },
  { slug: "accessoires", name: "Accessoires", img: "/images/D04B9153.jpg", count: 2, desc: "Bijoux, ceintures et pièces de style asiatique" },
];

// ─── Products ────────────────────────────────────────────────────────────────

export const SHOWCASE_PRODUCTS: ShowcaseProduct[] = [
  {
    id: "robe-qipao-rouge",
    name: "Robe Qipao Rouge",
    price: 89.90, priceStr: "89,90 €",
    category: "robes", categoryLabel: "Robes",
    images: ["/images/D04B9161.jpg"],
    description: "Cette robe Qipao rouge incarne l'élégance de la tradition chinoise. Ornée de motifs bambou brodés sur un satin rouge écarlate, elle s'adapte aux courbes pour un tombé parfait. Collet mandarin, fermeture en diagonale à boutons nœuds — chaque détail sublime la silhouette.",
    details: "Coupe ajustée. Fermeture boutonnée latérale. Longueur mi-genou. Fente discrète. Col mandarin.",
    sizes: ["XS", "S", "M", "L", "XL"],
    sizesLabel: "Taille",
    colors: ["Rouge"],
    material: "95% Polyester satiné, 5% Élasthanne",
    care: "Lavage délicat à 30°C. Repassage à basse température. Pas de sèche-linge.",
    ref: "HOA-RQ-001",
    isNew: true,
  },
  {
    id: "ao-dai-rouge-brodee",
    name: "Áo Dài Rouge Brodée",
    price: 125.00, priceStr: "125,00 €",
    category: "robes", categoryLabel: "Robes",
    images: ["/images/D04B9067.jpg"],
    description: "L'Áo Dài est le vêtement traditionnel vietnamien par excellence. Cette version en rouge ornée de motifs dorés délicatement brodés combine grâce et féminité. La coupe longiligne met en valeur la silhouette avec un raffinement incomparable.",
    details: "Coupe droite longueur cheville. Fente latérale. Boutons traditionnels nœuds. Peut se porter avec ou sans pantalon assorti.",
    sizes: ["XS", "S", "M", "L"],
    sizesLabel: "Taille",
    colors: ["Rouge doré"],
    material: "100% Soie polyester brossée",
    care: "Nettoyage à sec recommandé. Lavage à la main délicat. Ne pas essorer.",
    ref: "HOA-AD-001",
    isNew: true,
  },
  {
    id: "ao-dai-bleu-fleuri",
    name: "Áo Dài Bleu Fleuri",
    price: 115.00, priceStr: "115,00 €",
    category: "robes", categoryLabel: "Robes",
    images: ["/images/D04B9112.jpg"],
    description: "Un Áo Dài d'une délicatesse rare, en bleu royal avec de fines broderies florales multicolores. Cette pièce hommage à l'artisanat vietnamien apporte une touche poétique, aussi bien pour une sortie élégante que pour une occasion spéciale.",
    details: "Coupe droite longueur cheville. Broderies florales en fil contrasté. Col mandarin. Boutons ajourés traditionnels.",
    sizes: ["XS", "S", "M", "L"],
    sizesLabel: "Taille",
    colors: ["Bleu royal"],
    material: "100% Polyester satiné",
    care: "Lavage à la main à 30°C. Ne pas tordre. Séchage à plat.",
    ref: "HOA-AD-002",
  },
  {
    id: "kimono-bordeaux-fleuri",
    name: "Kimono Bordeaux Fleuri",
    price: 98.00, priceStr: "98,00 €",
    category: "robes", categoryLabel: "Robes",
    images: ["/images/D04B9153.jpg"],
    description: "Un kimono d'inspiration japonaise dans un bordeaux profond aux imprimés floraux délicats. Ample et enveloppant, il se porte noué à la taille ou libre — sur une tenue simple ou comme pièce maîtresse d'une soirée.",
    details: "Coupe ample fluide. Manches longues papillon. Ceinture tissu incluse. Longueur cheville.",
    sizes: ["S/M", "L/XL"],
    sizesLabel: "Taille unique",
    colors: ["Bordeaux fleuri"],
    material: "100% Polyester crêpe",
    care: "Lavage délicat à 30°C. Repassage envers à basse température.",
    ref: "HOA-KI-001",
  },
  {
    id: "kimono-satin-noir",
    name: "Kimono Satin Noir",
    price: 149.90, priceStr: "149,90 €",
    category: "robes", categoryLabel: "Robes",
    images: ["/images/D04B9128.jpg"],
    description: "Le luxe absolu : un kimono en satin noir profond avec des bordures rouge carmin et broderies dorées sur les manches. Pièce de caractère qui transcende les codes — à porter avec audace pour des soirées mémorables.",
    details: "Satin lourd structuré. Bordures contrastantes rouge carmin. Broderies fil doré manches. Ceinture large incluse.",
    sizes: ["S/M", "L/XL"],
    sizesLabel: "Taille unique",
    colors: ["Noir / Rouge"],
    material: "90% Polyester satiné, 10% Viscose",
    care: "Nettoyage à sec uniquement. Repassage à vapeur avec linge.",
    ref: "HOA-KI-002",
    isNew: true,
  },
  {
    id: "robe-qipao-enfant",
    name: "Robe Qipao Enfant",
    price: 45.00, priceStr: "45,00 €",
    category: "robes", categoryLabel: "Robes",
    images: ["/images/PER_9038.jpg"],
    description: "La tradition en miniature : cette adorable Qipao pour enfant en rouge vif avec broderies dorées initie les petites filles à la beauté des traditions chinoises. Confortable, pratique et irrésistiblement mignonne.",
    details: "Coupe ajustée enfant. Fermeture zip dos invisible. Machine washable. Tissu doux anti-froissage.",
    sizes: ["2-3 ans", "4-5 ans", "6-7 ans", "8-9 ans", "10-11 ans"],
    sizesLabel: "Âge",
    colors: ["Rouge"],
    material: "100% Polyester facile entretien",
    care: "Lavage machine à 30°C. Séchage tumbler basse température.",
    ref: "HOA-EN-001",
  },
  {
    id: "haut-brode-phoenix",
    name: "Haut Brodé Phœnix",
    price: 75.00, priceStr: "75,00 €",
    category: "hauts", categoryLabel: "Hauts & Tops",
    images: ["/images/D04B9137.jpg"],
    description: "Un haut beige délicat orné d'une broderie phœnix en fils multicolores d'une finesse exceptionnelle. Pièce artisanale qui apporte une touche de poésie orientale — se porte avec un jean comme avec une jupe élégante.",
    details: "Coupe droite légèrement évasée. Col rond. Broderie centrale grande phœnix. Fermeture boutonnée au dos.",
    sizes: ["XS", "S", "M", "L", "XL"],
    sizesLabel: "Taille",
    colors: ["Beige naturel"],
    material: "70% Coton, 30% Lin",
    care: "Lavage machine à 30°C. Repassage à basse température. Séchage à plat.",
    ref: "HOA-HA-001",
    isNew: true,
  },
  {
    id: "top-qipao-bleu",
    name: "Top Qipao Bleu",
    price: 65.00, priceStr: "65,00 €",
    category: "hauts", categoryLabel: "Hauts & Tops",
    images: ["/images/D04B9150.jpg"],
    description: "Le top Qipao est la version modernisée du vêtement traditionnel, raccourci pour s'adapter au quotidien. En bleu nuit avec florales argentées, il se porte avec un pantalon élégant pour un look sophistiqué et contemporain.",
    details: "Coupe courte légèrement ajustée. Col mandarin. Boutons nœuds latéraux. Finition biais contrastant.",
    sizes: ["XS", "S", "M", "L"],
    sizesLabel: "Taille",
    colors: ["Bleu nuit"],
    material: "95% Polyester satiné, 5% Élasthanne",
    care: "Lavage délicat à 30°C. Ne pas essorer.",
    ref: "HOA-HA-002",
  },
  {
    id: "chemise-tang-grise",
    name: "Chemise Tang Grise",
    price: 79.00, priceStr: "79,00 €",
    category: "hauts", categoryLabel: "Hauts & Tops",
    images: ["/images/D04B9182.jpg"],
    description: "La chemise Tang revisitée dans un gris cendré raffiné. Col mandarin, boutons tressés et coupe droite classique pour un homme sûr de son style — entre modernité et tradition millénaire.",
    details: "Coupe droite. Col mandarin. Fermeture boutonnée tressée. Manches courtes. Collection homme.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    sizesLabel: "Taille",
    colors: ["Gris cendré"],
    material: "65% Coton, 35% Polyester",
    care: "Lavage machine à 40°C. Repassage à température moyenne.",
    ref: "HOA-CT-001",
  },
  {
    id: "chemise-tang-rouge",
    name: "Chemise Tang Rouge",
    price: 89.00, priceStr: "89,00 €",
    category: "hauts", categoryLabel: "Hauts & Tops",
    images: ["/images/D04B9094.jpg"],
    description: "Rouge porte-bonheur, la chemise Tang en satin rouge avec broderies dorées est portée lors des grandes occasions en Chine. Ici, elle s'inscrit dans la garde-robe contemporaine comme une pièce festive et iconique.",
    details: "Coupe droite. Col mandarin. Motifs dorés brodés. Boutons tressés. Manches longues. Collection homme.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    sizesLabel: "Taille",
    colors: ["Rouge / Or"],
    material: "100% Satin polyester",
    care: "Lavage délicat à 30°C. Repassage à basse température.",
    ref: "HOA-CT-002",
    isNew: true,
  },
  {
    id: "chemise-kung-fu-noir",
    name: "Chemise Kung Fu Noir",
    price: 85.00, priceStr: "85,00 €",
    category: "pantalons", categoryLabel: "Pantalons",
    images: ["/images/D04B9089.jpg"],
    description: "Inspirée des arts martiaux, cette chemise Kung Fu en noir mat avec broderies dragon doré est une pièce de caractère. La coupe ajustée et le col officier lui confèrent une allure à la fois sportive et élégante. Vendue avec son pantalon assorti.",
    details: "Ensemble haut + pantalon. Coupe ajustée. Col officier. Manches courtes. Broderies dragon. Collection homme.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    sizesLabel: "Taille",
    colors: ["Noir / Or"],
    material: "100% Coton armure",
    care: "Lavage machine à 30°C. Repassage à basse température.",
    ref: "HOA-CT-003",
  },
  {
    id: "pantalon-tang-satin",
    name: "Pantalon Tang Satiné",
    price: 72.00, priceStr: "72,00 €",
    category: "pantalons", categoryLabel: "Pantalons",
    images: ["/images/D04B9149.jpg"],
    description: "Un pantalon Tang en satin noir avec broderies rouges discrètes sur les chevilles. Coupe droite élégante, taille élastiquée pour le confort. Se coordonne parfaitement avec nos vestes et chemises Tang.",
    details: "Coupe droite. Taille élastiquée avec cordon. Broderies chevilles. Deux poches latérales. Collection homme.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    sizesLabel: "Taille",
    colors: ["Noir"],
    material: "100% Polyester satiné",
    care: "Lavage machine à 30°C. Ne pas essorer. Repassage vapeur.",
    ref: "HOA-PT-001",
  },
  {
    id: "veste-tang-grise",
    name: "Veste Tang Grise",
    price: 145.00, priceStr: "145,00 €",
    category: "vestes", categoryLabel: "Vestes",
    images: ["/images/D04B8902.jpg"],
    description: "La veste Tang longue en lin gris ardoise est une pièce intemporelle et architecturale. Sa coupe droite et ses boutons tressés authentiques en font une alternative raffinée au blazer occidental, pour un style élégant à toute heure.",
    details: "Coupe longue droite. Boutons nœuds tressés. Col mandarin. Poches latérales. Manches longues. Collection homme.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    sizesLabel: "Taille",
    colors: ["Gris ardoise"],
    material: "55% Lin, 45% Coton",
    care: "Lavage machine à 30°C délicat. Repassage à la vapeur.",
    ref: "HOA-VT-001",
  },
  {
    id: "veste-tang-fuchsia",
    name: "Veste Tang Fuchsia",
    price: 175.00, priceStr: "175,00 €",
    category: "vestes", categoryLabel: "Vestes",
    images: ["/images/D04B9146.jpg"],
    description: "Audacieux et festif, ce manteau Tang en fuchsia intense avec motifs dorés brodés est une déclaration de style. Sur un simple jean noir, il transforme immédiatement n'importe quelle tenue en une apparition inoubliable.",
    details: "Coupe ajustée. Motifs dorés brodés en surface. Col mandarin. Fermeture boutonnée. Collection homme.",
    sizes: ["S", "M", "L", "XL"],
    sizesLabel: "Taille",
    colors: ["Fuchsia doré"],
    material: "100% Satin polyester",
    care: "Nettoyage à sec uniquement. Ranger dans une housse.",
    ref: "HOA-VT-002",
    isNew: true,
  },
  {
    id: "manteau-wax-colore",
    name: "Manteau Wax Coloré",
    price: 195.00, priceStr: "195,00 €",
    category: "vestes", categoryLabel: "Vestes",
    images: ["/images/D04B8981.jpg"],
    description: "Une rencontre unique entre l'Afrique et l'Asie : ce manteau en tissu wax aux couleurs vives et géométriques est une ode à la diversité culturelle. Photographié dans les rues de Paris, il affirme une identité forte et cosmopolite.",
    details: "Coupe structurée mi-longue. Tissu wax imprimé 100% coton. Col rond. Fermeture boutons. Poches latérales.",
    sizes: ["XS", "S", "M", "L", "XL"],
    sizesLabel: "Taille",
    colors: ["Multicolore"],
    material: "100% Coton wax",
    care: "Lavage à la main à 30°C. Séchage à l'ombre. Ne pas tordre.",
    ref: "HOA-MAN-001",
    isNew: true,
  },
  {
    id: "ensemble-tang-bleu",
    name: "Ensemble Tang Bleu Cobalt",
    price: 185.00, priceStr: "185,00 €",
    category: "vestes", categoryLabel: "Vestes",
    images: ["/images/D04B8910.jpg"],
    description: "L'ensemble Tang est l'expression ultime du style chinois contemporain : veste et pantalon assortis en bleu cobalt vibrant. Une tenue complète qui se distingue aussi bien en journée que lors d'occasions formelles.",
    details: "Ensemble 2 pièces : veste Tang + pantalon assorti. Tissu bleu cobalt. Col mandarin. Boutons tressés.",
    sizes: ["S", "M", "L", "XL"],
    sizesLabel: "Taille",
    colors: ["Bleu cobalt"],
    material: "100% Polyester texturé",
    care: "Lavage machine délicat à 30°C. Repassage à basse température.",
    ref: "HOA-ENS-001",
  },
];

// ─── Helper image → ID map ────────────────────────────────────────────────────

export const IMG_TO_ID: Record<string, string> = {
  "/images/D04B9161.jpg": "robe-qipao-rouge",
  "/images/D04B9067.jpg": "ao-dai-rouge-brodee",
  "/images/D04B9112.jpg": "ao-dai-bleu-fleuri",
  "/images/D04B9153.jpg": "kimono-bordeaux-fleuri",
  "/images/D04B9128.jpg": "kimono-satin-noir",
  "/images/PER_9038.jpg": "robe-qipao-enfant",
  "/images/D04B9137.jpg": "haut-brode-phoenix",
  "/images/D04B9150.jpg": "top-qipao-bleu",
  "/images/D04B9182.jpg": "chemise-tang-grise",
  "/images/D04B9094.jpg": "chemise-tang-rouge",
  "/images/D04B9089.jpg": "chemise-kung-fu-noir",
  "/images/D04B8902.jpg": "veste-tang-grise",
  "/images/D04B9146.jpg": "veste-tang-fuchsia",
  "/images/D04B8981.jpg": "manteau-wax-colore",
  "/images/D04B8910.jpg": "ensemble-tang-bleu",
  "/images/D04B9149.jpg": "pantalon-tang-satin",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function getProductsByCategory(cat?: string): ShowcaseProduct[] {
  if (!cat || cat === "all") return SHOWCASE_PRODUCTS;
  if (cat === "nouveautes") {
    const fresh = SHOWCASE_PRODUCTS.filter(p => p.isNew);
    const rest = SHOWCASE_PRODUCTS.filter(p => !p.isNew).slice(0, 3);
    return [...fresh, ...rest];
  }
  return SHOWCASE_PRODUCTS.filter(p => p.category === cat);
}

export function getProductById(id: string): ShowcaseProduct | undefined {
  return SHOWCASE_PRODUCTS.find(p => p.id === id);
}

export function getRelatedProducts(product: ShowcaseProduct, count = 4): ShowcaseProduct[] {
  const same = SHOWCASE_PRODUCTS.filter(p => p.category === product.category && p.id !== product.id);
  const other = SHOWCASE_PRODUCTS.filter(p => p.category !== product.category);
  return [...same, ...other].slice(0, count);
}
