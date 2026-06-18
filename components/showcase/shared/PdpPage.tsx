"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import type { ShowcaseTheme } from "@/lib/showcase-data";
import { SHOWCASE_PRODUCTS, getProductById, getRelatedProducts } from "@/lib/showcase-data";

interface Props {
  theme: ShowcaseTheme;
  id: string;
}

export function PdpPage({ theme, id }: Props) {
  const product = getProductById(id) ?? SHOWCASE_PRODUCTS[0];
  const related = getRelatedProducts(product, 4);

  const [selectedSize, setSelectedSize] = useState("");
  const [qty, setQty] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [wishlist, setWishlist] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string>("description");

  const hStyle = {
    fontFamily: theme.isSerif ? "var(--font-cormorant)" : "inherit",
    fontWeight: theme.headingWeight,
  };

  const handleAddToCart = () => {
    if (!selectedSize) return;
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2200);
  };

  const accordions = [
    { key: "description", label: "Description", content: product.description },
    { key: "details", label: "Détails produit", content: product.details },
    { key: "material", label: "Matière & Entretien", content: `${product.material}\n\n${product.care}` },
    { key: "delivery", label: "Livraison & Retours", content: "Livraison standard offerte dès 80 €, sous 3-5 jours ouvrés.\nRetours gratuits dans un délai de 30 jours.\nReprises en boutique au 50 Av. de Choisy, Paris 75013." },
  ];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: theme.bg, color: theme.text }}>
      {/* Announcement */}
      <div style={{ backgroundColor: theme.announcementBg, color: theme.announcementText, textAlign: "center", padding: "8px 16px", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase" }}>
        Livraison offerte dès 80 € d&apos;achat · Retours gratuits 30 jours
      </div>

      {/* Navbar */}
      <nav style={{ backgroundColor: theme.bg, borderBottom: `1px solid ${theme.border}`, position: "sticky", top: "44px", zIndex: 50 }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", height: "56px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href={`/showcase/${theme.variant}`} style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
            <div style={{ width: "34px", height: "34px", borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}>
              <Image src="/images/Logo Hoaly.png" alt="Hoa Ly" width={34} height={34} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <span style={{ fontSize: "13px", letterSpacing: "0.18em", textTransform: "uppercase", color: theme.text, ...hStyle }}>HOA LY</span>
          </Link>

          <div style={{ display: "flex", gap: "28px" }}>
            {["Robes", "Hauts", "Vestes", "Nouveautés"].map(l => (
              <Link key={l} href={`/showcase/${theme.variant}/catalogue/${l.toLowerCase()}`}
                style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: theme.textMid, textDecoration: "none" }}>
                {l}
              </Link>
            ))}
          </div>

          <Link href={`/showcase/${theme.variant}/catalogue`}
            style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: theme.accent, fontWeight: 700, textDecoration: "none" }}>
            Catalogue →
          </Link>
        </div>
      </nav>

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
        {/* Breadcrumb */}
        <div style={{ display: "flex", gap: "8px", fontSize: "12px", color: theme.textMid, alignItems: "center", padding: "16px 0" }}>
          <Link href={`/showcase/${theme.variant}`} style={{ color: theme.textMid, textDecoration: "none" }}>Accueil</Link>
          <span>›</span>
          <Link href={`/showcase/${theme.variant}/catalogue/${product.category}`} style={{ color: theme.textMid, textDecoration: "none" }}>{product.categoryLabel}</Link>
          <span>›</span>
          <span style={{ color: theme.text }}>{product.name}</span>
        </div>

        {/* Product grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "56px", alignItems: "start", paddingBottom: "64px" }}>
          {/* Image */}
          <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden", backgroundColor: theme.cardBg }}>
            <Image src={product.images[0]} alt={product.name} fill
              style={{ objectFit: "cover", objectPosition: "top" }} sizes="640px" priority />
            {product.isNew && (
              <span style={{ position: "absolute", top: "16px", left: "16px", backgroundColor: theme.btnBg, color: theme.btnText, fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", padding: "5px 14px", fontWeight: 700 }}>
                Nouveau
              </span>
            )}
          </div>

          {/* Info panel */}
          <div style={{ position: "sticky", top: "118px" }}>
            <p style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: theme.accent, marginBottom: "8px" }}>
              {product.categoryLabel} · Réf. {product.ref}
            </p>
            <h1 style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", margin: "0 0 10px", lineHeight: 1.1, ...hStyle }}>{product.name}</h1>
            <p style={{ fontSize: "28px", fontWeight: 800, margin: "0 0 28px" }}>{product.priceStr}</p>

            {/* Color */}
            <div style={{ marginBottom: "22px" }}>
              <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: theme.textMid, marginBottom: "10px" }}>
                Couleur : <span style={{ color: theme.text }}>{product.colors[0]}</span>
              </p>
              <div style={{ display: "flex", gap: "8px" }}>
                <div style={{ width: "28px", height: "28px", borderRadius: "50%", backgroundColor: theme.accent, boxShadow: `0 0 0 2px ${theme.bg}, 0 0 0 3.5px ${theme.accent}` }} />
              </div>
            </div>

            {/* Size */}
            <div style={{ marginBottom: "24px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: theme.textMid, margin: 0 }}>
                  {product.sizesLabel} : <span style={{ color: theme.text }}>{selectedSize || "—"}</span>
                </p>
                <button style={{ fontSize: "11px", color: theme.accent, background: "none", border: "none", cursor: "pointer", textDecoration: "underline", padding: 0 }}>
                  Guide des tailles
                </button>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {product.sizes.map(s => (
                  <button key={s} onClick={() => setSelectedSize(s)}
                    style={{ padding: "8px 16px", fontSize: "12px", fontWeight: 600, border: "1.5px solid", cursor: "pointer", transition: "all 0.15s", backgroundColor: selectedSize === s ? theme.btnBg : theme.bg, color: selectedSize === s ? theme.btnText : theme.text, borderColor: selectedSize === s ? theme.btnBg : theme.border }}>
                    {s}
                  </button>
                ))}
              </div>
              {!selectedSize && <p style={{ fontSize: "11px", color: "#EF4444", marginTop: "6px" }}>Veuillez choisir une taille</p>}
            </div>

            {/* Qty + CTA */}
            <div style={{ display: "flex", gap: "10px", marginBottom: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", border: `1.5px solid ${theme.border}` }}>
                <button onClick={() => setQty(Math.max(1, qty - 1))}
                  style={{ width: "40px", height: "50px", background: "none", border: "none", cursor: "pointer", fontSize: "20px", color: theme.text, lineHeight: 1 }}>−</button>
                <span style={{ width: "38px", textAlign: "center", fontSize: "14px", fontWeight: 700 }}>{qty}</span>
                <button onClick={() => setQty(qty + 1)}
                  style={{ width: "40px", height: "50px", background: "none", border: "none", cursor: "pointer", fontSize: "20px", color: theme.text, lineHeight: 1 }}>+</button>
              </div>
              <button onClick={handleAddToCart}
                style={{ flex: 1, height: "50px", backgroundColor: addedToCart ? "#16A34A" : (selectedSize ? theme.btnBg : theme.border), color: addedToCart ? "#FFFFFF" : (selectedSize ? theme.btnText : theme.textMid), border: "none", cursor: selectedSize ? "pointer" : "not-allowed", fontSize: "12px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", transition: "all 0.2s" }}>
                {addedToCart ? "✓ Ajouté au panier !" : "Ajouter au panier"}
              </button>
            </div>

            {/* Wishlist */}
            <button onClick={() => setWishlist(w => !w)}
              style={{ width: "100%", height: "44px", border: `1.5px solid ${wishlist ? theme.accent : theme.border}`, background: wishlist ? `${theme.accent}12` : "none", cursor: "pointer", fontSize: "12px", fontWeight: 600, letterSpacing: "0.08em", color: wishlist ? theme.accent : theme.text, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", transition: "all 0.2s" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill={wishlist ? theme.accent : "none"} stroke={wishlist ? theme.accent : "currentColor"} strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {wishlist ? "Retiré des favoris" : "Ajouter aux favoris"}
            </button>

            {/* Trust badges */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", marginTop: "20px" }}>
              {[
                { icon: "🚚", text: "Livraison offerte dès 80 €" },
                { icon: "↩️", text: "Retours gratuits 30 j." },
                { icon: "🔒", text: "Paiement sécurisé" },
              ].map(b => (
                <div key={b.text} style={{ textAlign: "center", padding: "12px 8px", backgroundColor: theme.cardBg, border: `1px solid ${theme.border}` }}>
                  <div style={{ fontSize: "16px", marginBottom: "4px" }}>{b.icon}</div>
                  <p style={{ fontSize: "10px", color: theme.textMid, lineHeight: 1.4, margin: 0 }}>{b.text}</p>
                </div>
              ))}
            </div>

            {/* Accordions */}
            <div style={{ marginTop: "24px", borderTop: `1px solid ${theme.border}` }}>
              {accordions.map(a => (
                <div key={a.key} style={{ borderBottom: `1px solid ${theme.border}` }}>
                  <button onClick={() => setOpenAccordion(openAccordion === a.key ? "" : a.key)}
                    style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", background: "none", border: "none", cursor: "pointer", fontSize: "13px", fontWeight: 600, color: theme.text, textAlign: "left" }}>
                    <span>{a.label}</span>
                    <span style={{ fontSize: "22px", color: theme.textMid, fontWeight: 300, lineHeight: 1 }}>{openAccordion === a.key ? "−" : "+"}</span>
                  </button>
                  {openAccordion === a.key && (
                    <div style={{ paddingBottom: "16px", fontSize: "13px", color: theme.textMid, lineHeight: 1.75, whiteSpace: "pre-line" }}>
                      {a.content}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section style={{ backgroundColor: theme.cardBg, padding: "52px 24px" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <h2 style={{ fontSize: "22px", margin: "0 0 28px", ...hStyle }}>Vous aimerez aussi</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
              {related.map(p => (
                <Link key={p.id} href={`/showcase/${theme.variant}/produit/${p.id}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
                  <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden", backgroundColor: theme.bg }}>
                    <Image src={p.images[0]} alt={p.name} fill
                      style={{ objectFit: "cover", objectPosition: "top", transition: "transform 0.5s" }} sizes="320px"
                      onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.06)"; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
                    />
                  </div>
                  <div style={{ paddingTop: "10px" }}>
                    <p style={{ fontSize: "13px", lineHeight: 1.3, margin: "0 0 4px", ...hStyle }}>{p.name}</p>
                    <p style={{ fontSize: "13px", color: theme.accent, fontWeight: 700, margin: 0 }}>{p.priceStr}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer style={{ backgroundColor: theme.footerBg, color: theme.footerText, padding: "32px 24px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <Link href={`/showcase/${theme.variant}/catalogue/${product.category}`} style={{ color: theme.footerText, textDecoration: "none", fontSize: "13px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>
            ← Retour au catalogue
          </Link>
          <p style={{ fontSize: "12px", color: `${theme.footerText}80`, margin: 0 }}>© 2025 Hoa Ly SARL · 50 Av. de Choisy, Paris 75013</p>
          <Link href={`/showcase/${theme.variant}`} style={{ fontSize: "12px", color: `${theme.footerText}80`, textDecoration: "none" }}>Retour à l&apos;accueil</Link>
        </div>
      </footer>
    </div>
  );
}
