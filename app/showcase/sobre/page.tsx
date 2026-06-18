"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IMG_TO_ID } from "@/lib/showcase-data";

const BG = "#FAFAF9";
const DARK = "#0A0A0A";
const MID = "#6B6B6B";
const LIGHT = "#F0EDE8";
const GOLD = "#C8A882";
const BORDER = "#E5E5E5";

const CATS = [
  { name: "Nouveautés", img: "/images/D04B8981.jpg", count: 8, slug: "nouveautes" },
  { name: "Robes", img: "/images/D04B9067.jpg", count: 7, slug: "robes" },
  { name: "Hauts & Tops", img: "/images/D04B9137.jpg", count: 4, slug: "hauts" },
  { name: "Pantalons", img: "/images/D04B9089.jpg", count: 3, slug: "pantalons" },
  { name: "Vestes", img: "/images/D04B8902.jpg", count: 5, slug: "vestes" },
  { name: "Accessoires", img: "/images/D04B9153.jpg", count: 2, slug: "accessoires" },
];

const NEW_IN = [
  { img: "/images/D04B9161.jpg", name: "Robe Qipao Rouge", price: "89,90 €", sub: "Robe" },
  { img: "/images/D04B9128.jpg", name: "Kimono Satin Noir", price: "149,90 €", sub: "Robe" },
  { img: "/images/D04B8981.jpg", name: "Manteau Wax Coloré", price: "195,00 €", sub: "Veste" },
  { img: "/images/D04B9146.jpg", name: "Veste Tang Fuchsia", price: "175,00 €", sub: "Veste" },
];

const LOOKBOOK = [
  { img: "/images/D04B9067.jpg", name: "Áo Dài Rouge Brodée", price: "125,00 €" },
  { img: "/images/D04B9112.jpg", name: "Áo Dài Bleu Fleuri", price: "115,00 €" },
  { img: "/images/D04B9153.jpg", name: "Kimono Bordeaux Fleuri", price: "98,00 €" },
  { img: "/images/D04B9094.jpg", name: "Chemise Tang Rouge", price: "89,00 €" },
  { img: "/images/D04B8902.jpg", name: "Veste Tang Grise", price: "145,00 €" },
  { img: "/images/D04B9149.jpg", name: "Ensemble Noir Dragon", price: "165,00 €" },
  { img: "/images/D04B9150.jpg", name: "Top Qipao Bleu", price: "65,00 €" },
  { img: "/images/D04B9182.jpg", name: "Chemise Tang Grise", price: "79,00 €" },
];

const NAV_LINKS = ["Nouveautés", "Robes", "Hauts", "Pantalons", "Vestes", "Accessoires"];

export default function SobrePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: BG, color: DARK, fontFamily: "var(--font-inter, sans-serif)" }}>

      {/* Announcement bar */}
      <div style={{ backgroundColor: DARK, color: "#FFF", textAlign: "center", padding: "8px 16px", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase" }}>
        Livraison offerte dès 80 € &nbsp;·&nbsp; Retours gratuits &nbsp;·&nbsp;{" "}
        <span style={{ color: GOLD, cursor: "pointer" }}>Découvrir nos nouveautés →</span>
      </div>

      {/* Navbar */}
      <nav style={{ backgroundColor: BG, borderBottom: `1px solid ${BORDER}`, position: "sticky", top: "44px", zIndex: 50 }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <a href="#" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "50%", overflow: "hidden", flexShrink: 0, boxShadow: "0 1px 4px rgba(0,0,0,0.1)" }}>
              <Image src="/images/Logo Hoaly.png" alt="Hoa Ly Paris" width={40} height={40} style={{ width: "100%", height: "100%", objectFit: "cover" }} priority />
            </div>
            <span style={{ fontSize: "15px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: DARK, fontFamily: "var(--font-cormorant)" }}>Hoa Ly</span>
          </a>

          {/* Center nav */}
          <ul style={{ display: "flex", gap: "28px", listStyle: "none", padding: 0, margin: 0 }}>
            {NAV_LINKS.map((l) => (
              <li key={l}>
                <a href="#" style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: MID, textDecoration: "none", transition: "color 0.15s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = DARK)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = MID)}
                >{l}</a>
              </li>
            ))}
          </ul>

          {/* Right icons */}
          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={MID} strokeWidth="1.5" style={{ cursor: "pointer" }}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={MID} strokeWidth="1.5" style={{ cursor: "pointer" }}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <div style={{ position: "relative", cursor: "pointer" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={MID} strokeWidth="1.5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              <span style={{ position: "absolute", top: "-5px", right: "-5px", width: "15px", height: "15px", borderRadius: "50%", backgroundColor: GOLD, color: "#FFF", fontSize: "9px", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>2</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ maxWidth: "1280px", margin: "0 auto", padding: "40px 24px 64px", display: "grid", gridTemplateColumns: "3fr 2fr", gap: "40px", alignItems: "center" }}>
        {/* Left: tall product image */}
        <div style={{ position: "relative" }}>
          <div style={{ position: "relative", aspectRatio: "4/5", overflow: "hidden" }}>
            <Image src="/images/D04B9067.jpg" alt="Collection Printemps 2025" fill priority style={{ objectFit: "cover", objectPosition: "top" }} sizes="760px" />
          </div>
          {/* Floating tag */}
          <div style={{ position: "absolute", bottom: "32px", right: "-20px", backgroundColor: BG, padding: "16px 24px", borderLeft: `2px solid ${GOLD}`, boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
            <p style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, marginBottom: "4px" }}>Collection</p>
            <p style={{ fontSize: "20px", fontWeight: 300, fontFamily: "var(--font-cormorant)", letterSpacing: "0.05em", lineHeight: 1.2 }}>Printemps<br />2025</p>
          </div>
        </div>

        {/* Right: text */}
        <div>
          <p style={{ fontSize: "11px", letterSpacing: "0.25em", textTransform: "uppercase", color: GOLD, marginBottom: "16px" }}>Hoa Ly Paris</p>
          <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 300, lineHeight: 1.1, letterSpacing: "0.02em", margin: "0 0 24px" }}>
            L&apos;élégance<br />de l&apos;Orient<br />à Paris
          </h1>
          <p style={{ fontSize: "14px", color: MID, lineHeight: 1.8, maxWidth: "320px", marginBottom: "32px" }}>
            Prêt-à-porter d&apos;inspiration asiatique, conçu pour la femme contemporaine. Chaque pièce est une invitation au voyage au cœur des traditions.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: "12px", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: DARK, textDecoration: "none", fontWeight: 600 }}>
              <span>Découvrir la collection</span>
              <svg width="20" height="1" viewBox="0 0 20 1"><line x1="0" y1="0.5" x2="20" y2="0.5" stroke={DARK} strokeWidth="1"/></svg>
            </a>
            <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: "12px", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: GOLD, textDecoration: "none" }}>
              <span>Voir le lookbook</span>
              <svg width="20" height="1" viewBox="0 0 20 1"><line x1="0" y1="0.5" x2="20" y2="0.5" stroke={GOLD} strokeWidth="1"/></svg>
            </a>
          </div>
        </div>
      </section>

      {/* Séparateur */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
        <div style={{ borderTop: `1px solid ${BORDER}` }} />
      </div>

      {/* Categories */}
      <section style={{ maxWidth: "1280px", margin: "0 auto", padding: "64px 24px" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "40px" }}>
          <div>
            <p style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, marginBottom: "8px" }}>Notre univers</p>
            <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, letterSpacing: "0.05em", margin: 0 }}>Nos Collections</h2>
          </div>
          <Link href="/showcase/sobre/catalogue" style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: MID, textDecoration: "none" }}>Tout explorer →</Link>
        </div>

        {/* Asymmetric 3-2-1 grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridTemplateRows: "280px 240px", gap: "12px" }}>
          {/* Nouveautés — big, spans 2 rows left */}
          <Link href="/showcase/sobre/catalogue/nouveautes" style={{ gridRow: "1 / 3", position: "relative", overflow: "hidden", cursor: "pointer", display: "block", textDecoration: "none" }}>
            <Image src={CATS[0].img} alt={CATS[0].name} fill style={{ objectFit: "cover", objectPosition: "top", transition: "transform 0.6s ease" }} sizes="430px"
              onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.04)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)" }} />
            <div style={{ position: "absolute", bottom: "20px", left: "20px" }}>
              <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "26px", fontWeight: 400, color: "#FFF", letterSpacing: "0.05em" }}>{CATS[0].name}</p>
              <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.65)", letterSpacing: "0.1em", marginTop: "2px" }}>{CATS[0].count} pièces</p>
            </div>
          </Link>

          {/* Robes — top center */}
          <Link href="/showcase/sobre/catalogue/robes" style={{ position: "relative", overflow: "hidden", cursor: "pointer", display: "block", textDecoration: "none" }}>
            <Image src={CATS[1].img} alt={CATS[1].name} fill style={{ objectFit: "cover", objectPosition: "top", transition: "transform 0.6s ease" }} sizes="430px"
              onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.04)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 55%)" }} />
            <div style={{ position: "absolute", bottom: "16px", left: "16px" }}>
              <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "22px", fontWeight: 400, color: "#FFF", letterSpacing: "0.05em" }}>{CATS[1].name}</p>
              <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.65)", letterSpacing: "0.1em", marginTop: "2px" }}>{CATS[1].count} pièces</p>
            </div>
          </Link>

          {/* Hauts — top right */}
          <Link href="/showcase/sobre/catalogue/hauts" style={{ position: "relative", overflow: "hidden", cursor: "pointer", display: "block", textDecoration: "none" }}>
            <Image src={CATS[2].img} alt={CATS[2].name} fill style={{ objectFit: "cover", objectPosition: "top", transition: "transform 0.6s ease" }} sizes="430px"
              onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.04)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 55%)" }} />
            <div style={{ position: "absolute", bottom: "16px", left: "16px" }}>
              <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "22px", fontWeight: 400, color: "#FFF", letterSpacing: "0.05em" }}>{CATS[2].name}</p>
              <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.65)", letterSpacing: "0.1em", marginTop: "2px" }}>{CATS[2].count} pièces</p>
            </div>
          </Link>

          {/* Pantalons — bottom center */}
          <Link href="/showcase/sobre/catalogue/pantalons" style={{ position: "relative", overflow: "hidden", cursor: "pointer", display: "block", textDecoration: "none" }}>
            <Image src={CATS[3].img} alt={CATS[3].name} fill style={{ objectFit: "cover", objectPosition: "top", transition: "transform 0.6s ease" }} sizes="430px"
              onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.04)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 55%)" }} />
            <div style={{ position: "absolute", bottom: "16px", left: "16px" }}>
              <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "22px", fontWeight: 400, color: "#FFF", letterSpacing: "0.05em" }}>{CATS[3].name}</p>
              <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.65)", letterSpacing: "0.1em", marginTop: "2px" }}>{CATS[3].count} pièces</p>
            </div>
          </Link>

          {/* Vestes — bottom right */}
          <Link href="/showcase/sobre/catalogue/vestes" style={{ position: "relative", overflow: "hidden", cursor: "pointer", display: "block", textDecoration: "none" }}>
            <Image src={CATS[4].img} alt={CATS[4].name} fill style={{ objectFit: "cover", objectPosition: "top", transition: "transform 0.6s ease" }} sizes="430px"
              onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.04)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 55%)" }} />
            <div style={{ position: "absolute", bottom: "16px", left: "16px" }}>
              <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "22px", fontWeight: 400, color: "#FFF", letterSpacing: "0.05em" }}>{CATS[4].name}</p>
              <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.65)", letterSpacing: "0.1em", marginTop: "2px" }}>{CATS[4].count} pièces</p>
            </div>
          </Link>
        </div>

        {/* Accessoires full-width below */}
        <Link href="/showcase/sobre/catalogue/accessoires" style={{ marginTop: "12px", position: "relative", height: "180px", overflow: "hidden", cursor: "pointer", display: "block", textDecoration: "none" }}>
          <Image src={CATS[5].img} alt={CATS[5].name} fill style={{ objectFit: "cover", objectPosition: "center 30%", transition: "transform 0.6s ease" }} sizes="1280px"
            onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.03)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,0,0,0.55) 0%, transparent 50%)" }} />
          <div style={{ position: "absolute", top: "50%", left: "28px", transform: "translateY(-50%)" }}>
            <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "28px", fontWeight: 400, color: "#FFF", letterSpacing: "0.08em" }}>{CATS[5].name}</p>
            <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.65)", letterSpacing: "0.1em", marginTop: "4px" }}>{CATS[5].count} pièces · Bijoux, ceintures, sacs</p>
          </div>
        </Link>
      </section>

      {/* New In */}
      <section style={{ backgroundColor: LIGHT, padding: "64px 24px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "40px" }}>
            <div>
              <p style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, marginBottom: "8px" }}>Tout juste arrivé</p>
              <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, letterSpacing: "0.05em", margin: 0 }}>Nouvelles Arrivées</h2>
            </div>
            <Link href="/showcase/sobre/catalogue/nouveautes" style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: MID, textDecoration: "none" }}>Voir tout →</Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px" }}>
            {NEW_IN.map((p, i) => (
              <Link key={i} href={`/showcase/sobre/produit/${IMG_TO_ID[p.img] ?? "robe-qipao-rouge"}`} style={{ cursor: "pointer", textDecoration: "none", color: "inherit", display: "block" }}>
                <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden", backgroundColor: "#FFF" }}>
                  <Image src={p.img} alt={p.name} fill style={{ objectFit: "cover", objectPosition: "top", transition: "transform 0.6s ease" }} sizes="320px"
                    onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.04)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
                  />
                  <div style={{ position: "absolute", top: "12px", left: "12px", backgroundColor: DARK, color: "#FFF", fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", padding: "4px 10px", fontWeight: 600 }}>
                    Nouveau
                  </div>
                </div>
                <div style={{ paddingTop: "14px" }}>
                  <p style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: GOLD, marginBottom: "4px" }}>{p.sub}</p>
                  <p style={{ fontSize: "14px", fontFamily: "var(--font-cormorant)", fontWeight: 500, letterSpacing: "0.03em", lineHeight: 1.3 }}>{p.name}</p>
                  <p style={{ fontSize: "13px", color: MID, marginTop: "6px" }}>{p.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial mid-page: big image + text */}
      <section style={{ maxWidth: "1280px", margin: "0 auto", padding: "64px 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "56px", alignItems: "center" }}>
        <div style={{ position: "relative", aspectRatio: "5/6", overflow: "hidden" }}>
          <Image src="/images/D04B8910.jpg" alt="Collection homme" fill style={{ objectFit: "cover", objectPosition: "top" }} sizes="640px" />
        </div>
        <div>
          <p style={{ fontSize: "11px", letterSpacing: "0.25em", textTransform: "uppercase", color: GOLD, marginBottom: "16px" }}>Inspiration</p>
          <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 300, lineHeight: 1.1, letterSpacing: "0.02em", marginBottom: "24px" }}>
            L&apos;art de s&apos;habiller<br />à la parisienne
          </h2>
          <p style={{ fontSize: "14px", color: MID, lineHeight: 1.9, maxWidth: "360px", marginBottom: "32px" }}>
            Chaque pièce de notre collection est pensée pour la femme moderne : des coupes flatteuses, des matières nobles et des imprimés uniques inspirés des traditions d&apos;Asie.
          </p>
          <div style={{ display: "flex", gap: "24px" }}>
            {[{ v: "700+", l: "Créations" }, { v: "4.8", l: "Note clients" }, { v: "5+", l: "Années d'expertise" }].map((s) => (
              <div key={s.l} style={{ borderLeft: `1px solid ${BORDER}`, paddingLeft: "20px" }}>
                <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "32px", fontWeight: 300, color: DARK, lineHeight: 1 }}>{s.v}</p>
                <p style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: MID, marginTop: "4px" }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full lookbook grid */}
      <section style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px 64px" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "32px" }}>
          <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 300, letterSpacing: "0.05em", margin: 0 }}>Tout notre catalogue</h2>
          <Link href="/showcase/sobre/catalogue" style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: MID, textDecoration: "none" }}>Voir le catalogue complet →</Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
          {LOOKBOOK.map((p, i) => (
            <Link key={i} href={`/showcase/sobre/produit/${IMG_TO_ID[p.img] ?? "robe-qipao-rouge"}`} style={{ cursor: "pointer", textDecoration: "none", color: "inherit", display: "block" }}>
              <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden", backgroundColor: LIGHT }}>
                <Image src={p.img} alt={p.name} fill style={{ objectFit: "cover", objectPosition: "top", transition: "transform 0.6s ease" }} sizes="320px"
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.04)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
                />
              </div>
              <div style={{ paddingTop: "12px" }}>
                <p style={{ fontSize: "13px", fontFamily: "var(--font-cormorant)", fontWeight: 500, letterSpacing: "0.02em", lineHeight: 1.3 }}>{p.name}</p>
                <p style={{ fontSize: "12px", color: MID, marginTop: "4px" }}>{p.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section style={{ backgroundColor: LIGHT, padding: "64px 24px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "48px" }}>
            <div>
              <p style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, marginBottom: "8px" }}>Ce que disent nos clientes</p>
              <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, letterSpacing: "0.05em", margin: 0 }}>Avis Google</h2>
              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "16px" }}>
                <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "60px", fontWeight: 300, color: DARK, lineHeight: 1 }}>4.8</span>
                <div>
                  <div style={{ display: "flex", gap: "4px" }}>{[1,2,3,4,5].map((s) => <span key={s} style={{ color: GOLD, fontSize: "16px" }}>★</span>)}</div>
                  <p style={{ fontSize: "11px", color: MID, marginTop: "4px", letterSpacing: "0.08em" }}>147 avis vérifiés Google</p>
                </div>
              </div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
            {[
              { author: "Sophie M.", time: "il y a 2 semaines", text: "Boutique magnifique ! La sélection est très bien faite et les conseils sont précieux. J'ai trouvé ma robe de soirée parfaite ici. Je reviendrai sans hésiter." },
              { author: "Camille D.", time: "il y a 1 mois", text: "Un vrai coup de cœur ! Des vêtements de qualité à des prix très accessibles. L'ambiance est chaleureuse, le service impeccable. Un incontournable du 13e." },
              { author: "Marie L.", time: "il y a 3 semaines", text: "J'adore cette boutique, j'y reviens à chaque saison. La collection est superbe cette année. La gérante a un œil parfait pour choisir ses pièces uniques." },
            ].map((r, i) => (
              <div key={i} style={{ backgroundColor: "#FFF", padding: "28px" }}>
                <div style={{ display: "flex", gap: "4px", marginBottom: "16px" }}>{[1,2,3,4,5].map((s) => <span key={s} style={{ color: GOLD, fontSize: "13px" }}>★</span>)}</div>
                <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "16px", color: DARK, lineHeight: 1.7, fontStyle: "italic", marginBottom: "20px" }}>
                  &ldquo;{r.text}&rdquo;
                </p>
                <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: "16px" }}>
                  <p style={{ fontSize: "13px", fontWeight: 600 }}>{r.author}</p>
                  <p style={{ fontSize: "11px", color: MID, marginTop: "2px" }}>{r.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Store info */}
      <section style={{ maxWidth: "1280px", margin: "0 auto", padding: "64px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "start" }}>
          <div>
            <p style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, marginBottom: "8px" }}>Venez nous rendre visite</p>
            <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, letterSpacing: "0.05em", marginBottom: "32px" }}>Notre Boutique</h2>
            {[
              { label: "Adresse", value: "50 Avenue de Choisy, 75013 Paris" },
              { label: "Téléphone", value: "01 53 79 25 44" },
              { label: "Horaires", value: "Mar–Ven 10h–19h30 · Sam 10h–19h · Dim 11h–17h" },
              { label: "Métro", value: "Ligne 7 — Place d'Italie ou Tolbiac" },
            ].map((item) => (
              <div key={item.label} style={{ display: "flex", gap: "20px", marginBottom: "20px", alignItems: "flex-start" }}>
                <div style={{ width: "1px", alignSelf: "stretch", backgroundColor: GOLD, flexShrink: 0 }} />
                <div>
                  <p style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, marginBottom: "4px" }}>{item.label}</p>
                  <p style={{ fontSize: "14px", color: DARK, lineHeight: 1.6 }}>{item.value}</p>
                </div>
              </div>
            ))}
            <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginTop: "8px", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: DARK, textDecoration: "none", fontWeight: 600 }}>
              <span>Voir sur Google Maps</span>
              <svg width="16" height="1" viewBox="0 0 16 1"><line x1="0" y1="0.5" x2="16" y2="0.5" stroke={DARK} strokeWidth="1"/></svg>
            </a>
          </div>
          <div style={{ backgroundColor: LIGHT, height: "400px", display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${BORDER}` }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "50%", border: `1px solid ${GOLD}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "18px", fontWeight: 400 }}>50 Avenue de Choisy</p>
              <p style={{ fontSize: "12px", color: MID, marginTop: "4px" }}>75013 Paris</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section style={{ backgroundColor: DARK, color: "#FFF", padding: "64px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: "500px", margin: "0 auto" }}>
          <p style={{ fontSize: "11px", letterSpacing: "0.25em", textTransform: "uppercase", color: GOLD, marginBottom: "12px" }}>Newsletter</p>
          <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 300, letterSpacing: "0.05em", marginBottom: "12px" }}>Restez inspirée</h2>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: "32px" }}>
            Recevez nos nouvelles collections, conseils style et exclusivités en avant-première.
          </p>
          <div style={{ display: "flex", gap: "0" }}>
            <input type="email" placeholder="Votre adresse email" style={{ flex: 1, padding: "13px 16px", backgroundColor: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRight: "none", color: "#FFF", fontSize: "13px", outline: "none", fontFamily: "var(--font-inter)" }} />
            <button style={{ padding: "13px 24px", backgroundColor: GOLD, border: "none", color: "#FFF", fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer" }}>S&apos;inscrire</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: "#050505", color: "#FFF", padding: "56px 24px 32px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "48px", paddingBottom: "48px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "50%", overflow: "hidden" }}>
                  <Image src="/images/Logo Hoaly.png" alt="Hoa Ly" width={40} height={40} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0) invert(1)" }} />
                </div>
                <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "20px", fontWeight: 400, letterSpacing: "0.1em", color: "#FFF" }}>Hoa Ly Paris</span>
              </div>
              <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)", lineHeight: 1.8, maxWidth: "240px" }}>
                Prêt-à-porter féminin d&apos;inspiration asiatique, au cœur du 13ème arrondissement de Paris.
              </p>
              <div style={{ display: "flex", gap: "16px", marginTop: "20px" }}>
                {["Instagram", "Pinterest", "Facebook"].map((s) => (
                  <a key={s} href="#" style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>{s}</a>
                ))}
              </div>
            </div>
            {[
              { title: "Collections", links: ["Nouveautés", "Robes", "Hauts & Tops", "Pantalons", "Vestes", "Accessoires"] },
              { title: "Information", links: ["Notre histoire", "Boutique", "Livraison", "Retours", "FAQ"] },
              { title: "Contact", links: ["50 Av. de Choisy, 75013", "01 53 79 25 44", "contact@hoaly.paris"] },
            ].map((col) => (
              <div key={col.title}>
                <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, marginBottom: "16px" }}>{col.title}</p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                  {col.links.map((l) => <li key={l}><a href="#" style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>{l}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ paddingTop: "24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.2)" }}>© 2025 Hoa Ly SARL · Tous droits réservés</p>
            <a href="/mentions-legales" style={{ fontSize: "10px", color: "rgba(255,255,255,0.2)", textDecoration: "none" }}>Mentions légales</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
