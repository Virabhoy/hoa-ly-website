"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import type { ShowcaseTheme } from "@/lib/showcase-data";
import { SHOWCASE_CATEGORIES, getProductsByCategory } from "@/lib/showcase-data";

const SORT_OPTIONS = [
  { value: "default", label: "Recommandés" },
  { value: "price-asc", label: "Prix croissant" },
  { value: "price-desc", label: "Prix décroissant" },
  { value: "new", label: "Nouveautés d'abord" },
];

interface Props {
  theme: ShowcaseTheme;
  cat?: string;
}

export function CataloguePage({ theme, cat }: Props) {
  const [sort, setSort] = useState("default");

  const activeCatObj = SHOWCASE_CATEGORIES.find(c => c.slug === cat);
  const activeCatLabel = activeCatObj?.name ?? "Catalogue";

  let products = getProductsByCategory(cat);
  if (sort === "price-asc") products = [...products].sort((a, b) => a.price - b.price);
  if (sort === "price-desc") products = [...products].sort((a, b) => b.price - a.price);
  if (sort === "new") products = [...products.filter(p => p.isNew), ...products.filter(p => !p.isNew)];

  const hStyle = {
    fontFamily: theme.isSerif ? "var(--font-cormorant)" : "inherit",
    fontWeight: theme.headingWeight,
  };

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
            {SHOWCASE_CATEGORIES.slice(0, 4).map(c => (
              <Link key={c.slug} href={`/showcase/${theme.variant}/catalogue/${c.slug}`}
                style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: cat === c.slug ? theme.accent : theme.textMid, fontWeight: cat === c.slug ? 700 : 400, textDecoration: "none" }}>
                {c.name}
              </Link>
            ))}
          </div>

          <Link href={`/showcase/${theme.variant}/catalogue`}
            style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: theme.accent, fontWeight: 700, textDecoration: "none" }}>
            Tout voir →
          </Link>
        </div>
      </nav>

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px 80px" }}>
        {/* Breadcrumb */}
        <div style={{ display: "flex", gap: "8px", fontSize: "12px", color: theme.textMid, alignItems: "center", padding: "16px 0" }}>
          <Link href={`/showcase/${theme.variant}`} style={{ color: theme.textMid, textDecoration: "none" }}>Accueil</Link>
          <span>›</span>
          <Link href={`/showcase/${theme.variant}/catalogue`} style={{ color: cat ? theme.textMid : theme.accent, fontWeight: cat ? 400 : 600, textDecoration: "none" }}>Catalogue</Link>
          {cat && (
            <>
              <span>›</span>
              <span style={{ color: theme.accent, fontWeight: 600 }}>{activeCatLabel}</span>
            </>
          )}
        </div>

        {/* Category hero banner */}
        {activeCatObj && (
          <div style={{ position: "relative", height: "200px", marginBottom: "32px", overflow: "hidden" }}>
            <Image src={activeCatObj.img} alt={activeCatObj.name} fill style={{ objectFit: "cover", objectPosition: "center 30%" }} sizes="1280px" />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.2) 100%)", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 40px" }}>
              <p style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", marginBottom: "8px" }}>{activeCatObj.count} produits</p>
              <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "#FFFFFF", margin: 0, ...hStyle }}>{activeCatObj.name}</h1>
              <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.75)", marginTop: "8px", maxWidth: "400px" }}>{activeCatObj.desc}</p>
            </div>
          </div>
        )}

        {!cat && (
          <div style={{ marginBottom: "32px" }}>
            <h1 style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", margin: "0 0 8px", ...hStyle }}>Toute la collection</h1>
            <p style={{ fontSize: "13px", color: theme.textMid }}>{products.length} produits disponibles</p>
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: "40px" }}>
          {/* Sidebar */}
          <aside>
            <div style={{ position: "sticky", top: "120px" }}>
              <p style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: theme.textMid, marginBottom: "12px" }}>Collections</p>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Link href={`/showcase/${theme.variant}/catalogue`}
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 12px", fontSize: "13px", textDecoration: "none", color: !cat ? theme.accent : theme.text, fontWeight: !cat ? 700 : 400, backgroundColor: !cat ? `${theme.accent}15` : "transparent", borderLeft: !cat ? `2px solid ${theme.accent}` : "2px solid transparent" }}>
                  <span>Tout voir</span>
                  <span style={{ fontSize: "11px", color: theme.textMid }}>({SHOWCASE_CATEGORIES.reduce((s, c) => s + c.count, 0)})</span>
                </Link>
                {SHOWCASE_CATEGORIES.map(c => (
                  <Link key={c.slug} href={`/showcase/${theme.variant}/catalogue/${c.slug}`}
                    style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 12px", fontSize: "13px", textDecoration: "none", color: cat === c.slug ? theme.accent : theme.text, fontWeight: cat === c.slug ? 700 : 400, backgroundColor: cat === c.slug ? `${theme.accent}15` : "transparent", borderLeft: cat === c.slug ? `2px solid ${theme.accent}` : "2px solid transparent" }}>
                    <span>{c.name}</span>
                    <span style={{ fontSize: "11px", color: theme.textMid }}>({c.count})</span>
                  </Link>
                ))}
              </div>

              <div style={{ marginTop: "28px", padding: "18px", backgroundColor: theme.cardBg, border: `1px solid ${theme.border}` }}>
                <p style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: theme.textMid, marginBottom: "6px" }}>Besoin d&apos;aide ?</p>
                <p style={{ fontSize: "12px", color: theme.textMid, lineHeight: 1.6, marginBottom: "10px" }}>Notre équipe vous accompagne Mar–Sam 10h–19h</p>
                <a href="tel:0153792544" style={{ fontSize: "13px", fontWeight: 700, color: theme.accent, textDecoration: "none" }}>01 53 79 25 44</a>
              </div>
            </div>
          </aside>

          {/* Main */}
          <main>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
              <p style={{ fontSize: "13px", color: theme.textMid }}>{products.length} résultat{products.length !== 1 ? "s" : ""}</p>
              <select value={sort} onChange={e => setSort(e.target.value)}
                style={{ fontSize: "12px", padding: "8px 14px", border: `1px solid ${theme.border}`, color: theme.text, backgroundColor: theme.bg, outline: "none", cursor: "pointer" }}>
                {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>

            {products.length === 0 ? (
              <div style={{ textAlign: "center", padding: "80px 0", color: theme.textMid }}>
                <p style={{ fontSize: "16px", marginBottom: "12px" }}>Aucun produit dans cette catégorie</p>
                <Link href={`/showcase/${theme.variant}/catalogue`} style={{ fontSize: "13px", color: theme.accent, textDecoration: "underline" }}>
                  Voir toute la collection
                </Link>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
                {products.map(p => (
                  <Link key={p.id} href={`/showcase/${theme.variant}/produit/${p.id}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
                    <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden", backgroundColor: theme.cardBg }}>
                      <Image src={p.images[0]} alt={p.name} fill
                        style={{ objectFit: "cover", objectPosition: "top", transition: "transform 0.5s ease" }}
                        sizes="(max-width: 1280px) 33vw, 400px"
                        onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.06)"; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
                      />
                      {p.isNew && (
                        <span style={{ position: "absolute", top: "10px", left: "10px", backgroundColor: theme.btnBg, color: theme.btnText, fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", padding: "4px 10px", fontWeight: 700 }}>
                          Nouveau
                        </span>
                      )}
                    </div>
                    <div style={{ paddingTop: "10px" }}>
                      <p style={{ fontSize: "10px", color: theme.accent, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "3px" }}>{p.categoryLabel}</p>
                      <p style={{ fontSize: "14px", lineHeight: 1.3, ...hStyle }}>{p.name}</p>
                      <p style={{ fontSize: "15px", fontWeight: 700, marginTop: "5px" }}>{p.priceStr}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ backgroundColor: theme.footerBg, color: theme.footerText, padding: "32px 24px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <Link href={`/showcase/${theme.variant}`} style={{ color: theme.footerText, textDecoration: "none", fontSize: "13px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>
            ← Retour à l&apos;accueil
          </Link>
          <p style={{ fontSize: "12px", color: `${theme.footerText}80`, margin: 0 }}>© 2025 Hoa Ly SARL · 50 Av. de Choisy, Paris 75013</p>
          <Link href={`/showcase/${theme.variant}/catalogue`} style={{ fontSize: "12px", color: `${theme.footerText}80`, textDecoration: "none" }}>Politique de retour</Link>
        </div>
      </footer>
    </div>
  );
}
