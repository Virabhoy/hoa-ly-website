"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IMG_TO_ID } from "@/lib/showcase-data";

const BG = "#FAF6F0";
const TEXT = "#1C0A00";
const ACCENT = "#B85C3C";
const BORDER = "#E8DDD5";
const CARD_BG = "#FFFFFF";

const CATS_SIDEBAR = [
  { label: "Femme", sub: ["Robes", "Hauts", "Accessoires"] },
  { label: "Homme", sub: ["Chemises", "Vestes", "Ensembles"] },
  { label: "Enfant", sub: ["Robes Enfant"] },
];

const NEW_IN = [
  { img: "/images/D04B8981.jpg", name: "Manteau Wax Coloré Paris", price: "195,00 €", tag: "Nouveauté" },
  { img: "/images/D04B9067.jpg", name: "Áo Dài Rouge Brodée", price: "125,00 €", tag: "Collection" },
  { img: "/images/D04B9112.jpg", name: "Áo Dài Bleu Fleuri", price: "115,00 €", tag: "Tendance" },
  { img: "/images/D04B9153.jpg", name: "Kimono Bordeaux Fleuri", price: "98,00 €", tag: "Bestseller" },
];

const MEN = [
  { img: "/images/D04B8902.jpg", name: "Veste Tang Grise", price: "145,00 €" },
  { img: "/images/D04B9094.jpg", name: "Chemise Tang Rouge", price: "89,00 €" },
  { img: "/images/D04B9146.jpg", name: "Veste Tang Fuchsia", price: "175,00 €" },
  { img: "/images/D04B8910.jpg", name: "Ensemble Tang Bleu", price: "185,00 €" },
];

const INSTA = ["/images/D04B9149.jpg", "/images/D04B9150.jpg", "/images/D04B9161.jpg", "/images/D04B9128.jpg"];

export default function ElegantPage() {
  const [openSection, setOpenSection] = useState("Femme");

  return (
    <div style={{ minHeight: "100vh", backgroundColor: BG, color: TEXT, fontFamily: "var(--font-inter, sans-serif)" }}>

      {/* Top announcement bar */}
      <div style={{ backgroundColor: ACCENT, color: "#FFF", textAlign: "center", padding: "8px 16px", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600 }}>
        Livraison offerte dès 80 € d&apos;achat · Code : HOALY
      </div>

      {/* Navbar */}
      <nav style={{ borderBottom: `1px solid ${BORDER}`, backgroundColor: BG, position: "sticky", top: "44px", zIndex: 50 }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: "32px" }}>
            {["Femme", "Homme", "Livraison", "À Propos"].map((l, i) => (
              <a key={l} href="#" style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: i === 0 ? ACCENT : `${TEXT}80`, textDecoration: "none", fontWeight: i === 0 ? 700 : 400 }}>{l}</a>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "50%", overflow: "hidden", flexShrink: 0, boxShadow: `0 0 0 1.5px ${ACCENT}` }}>
              <Image src="/images/Logo Hoaly.png" alt="Hoa Ly" width={36} height={36} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <span style={{ fontSize: "20px", fontWeight: 900, letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "var(--font-cormorant)" }}>HOA LY</span>
          </div>
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={TEXT} strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={TEXT} strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <div style={{ position: "relative", cursor: "pointer" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={TEXT} strokeWidth="1.5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              <span style={{ position: "absolute", top: "-6px", right: "-6px", width: "16px", height: "16px", borderRadius: "50%", backgroundColor: ACCENT, color: "#FFF", fontSize: "9px", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>2</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ maxWidth: "1280px", margin: "0 auto", padding: "48px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "56px", alignItems: "start" }}>
          {/* Image gauche */}
          <div style={{ position: "relative" }}>
            <div style={{ position: "relative", aspectRatio: "4/5", overflow: "hidden" }}>
              <Image src="/images/D04B9067.jpg" alt="Collection" fill priority style={{ objectFit: "cover", objectPosition: "top" }} sizes="640px" />
            </div>
            <div style={{ position: "absolute", bottom: "24px", left: "24px", backgroundColor: CARD_BG, padding: "16px 20px", borderLeft: `3px solid ${ACCENT}`, maxWidth: "260px" }}>
              <p style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: ACCENT, marginBottom: "6px" }}>Collection Printemps 2025</p>
              <p style={{ fontSize: "14px", fontWeight: 600, lineHeight: 1.4 }}>Áo Dài Rouge Brodée</p>
              <p style={{ fontSize: "12px", color: `${TEXT}60`, marginTop: "4px" }}>125,00 €</p>
            </div>
          </div>

          {/* Droite : titre + catalogue */}
          <div style={{ paddingTop: "24px" }}>
            <p style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: `${TEXT}50`, marginBottom: "8px" }}>Bienvenue chez</p>
            <h1 style={{ fontSize: "clamp(3rem, 6vw, 5rem)", fontWeight: 900, textTransform: "uppercase", lineHeight: 0.9, letterSpacing: "-0.01em", margin: "0 0 6px" }}>
              HOA LY
            </h1>
            <p style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 300, color: ACCENT, fontFamily: "var(--font-cormorant)", letterSpacing: "0.05em", marginBottom: "16px" }}>
              Prêt-à-Porter
            </p>
            <p style={{ fontSize: "13px", color: `${TEXT}60`, maxWidth: "300px", lineHeight: 1.8, marginBottom: "32px" }}>
              Mode d&apos;inspiration asiatique au cœur du 13ème arrondissement de Paris. Qualité, tradition et élégance contemporaine.
            </p>

            {/* Catalogue accordion */}
            <div style={{ borderTop: `1px solid ${BORDER}` }}>
              <p style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: `${TEXT}40`, padding: "12px 0" }}>Catalogue</p>
              {CATS_SIDEBAR.map((cat) => (
                <div key={cat.label} style={{ borderBottom: `1px solid ${BORDER}` }}>
                  <button
                    onClick={() => setOpenSection(openSection === cat.label ? "" : cat.label)}
                    style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", background: "none", border: "none", cursor: "pointer", fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: TEXT }}
                  >
                    <span>{cat.label}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2">
                      <path d={openSection === cat.label ? "m18 15-6-6-6 6" : "m6 9 6 6 6-6"} />
                    </svg>
                  </button>
                  {openSection === cat.label && (
                    <div style={{ paddingBottom: "12px", display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      {cat.sub.map((s) => (
                        <span key={s} style={{ fontSize: "11px", padding: "6px 14px", border: `1px solid ${BORDER}`, cursor: "pointer", color: TEXT, letterSpacing: "0.08em", transition: "all 0.15s" }}>{s}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button style={{ marginTop: "28px", backgroundColor: ACCENT, color: "#FFF", fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", padding: "14px 32px", border: "none", cursor: "pointer" }}>
              Voir le Catalogue Complet
            </button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px 64px", borderTop: `1px solid ${BORDER}` }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", margin: "48px 0 24px" }}>
          <div>
            <p style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: `${TEXT}40`, marginBottom: "6px" }}>Explorer par univers</p>
            <h2 style={{ fontSize: "26px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.01em" }}>Nos Collections</h2>
          </div>
          <Link href="/showcase/elegant/catalogue" style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: ACCENT, fontWeight: 700, textDecoration: "none" }}>Tout voir →</Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
          {[
            { name: "Nouveautés", img: "/images/D04B8981.jpg", count: 8, slug: "nouveautes" },
            { name: "Robes", img: "/images/D04B9067.jpg", count: 7, slug: "robes" },
            { name: "Hauts & Tops", img: "/images/D04B9137.jpg", count: 4, slug: "hauts" },
            { name: "Pantalons", img: "/images/D04B9089.jpg", count: 3, slug: "pantalons" },
            { name: "Vestes", img: "/images/D04B8902.jpg", count: 5, slug: "vestes" },
            { name: "Accessoires", img: "/images/D04B9153.jpg", count: 2, slug: "accessoires" },
          ].map((cat, i) => (
            <Link key={i} href={`/showcase/elegant/catalogue/${cat.slug}`} style={{ position: "relative", height: "195px", overflow: "hidden", cursor: "pointer", display: "block", textDecoration: "none" }}>
              <Image src={cat.img} alt={cat.name} fill style={{ objectFit: "cover", objectPosition: "top", transition: "transform 0.5s" }} sizes="430px"
                onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.05)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(28,10,0,0.72) 0%, transparent 55%)" }} />
              <div style={{ position: "absolute", bottom: "14px", left: "14px" }}>
                <p style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#FFF" }}>{cat.name}</p>
                <p style={{ fontSize: "10px", color: `${ACCENT}CC`, letterSpacing: "0.1em", marginTop: "3px" }}>{cat.count} pièces</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Nouvelles arrivées */}
      <section style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px 64px", borderTop: `1px solid ${BORDER}` }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", margin: "48px 0 28px" }}>
          <div>
            <p style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: `${TEXT}40`, marginBottom: "6px" }}>Nos pièces phares</p>
            <h2 style={{ fontSize: "28px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.01em" }}>Nouvelles Arrivées</h2>
          </div>
          <a href="#" style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: ACCENT, fontWeight: 700, textDecoration: "none" }}>Voir plus →</a>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
          {NEW_IN.map((p, i) => (
            <Link key={i} href={`/showcase/elegant/produit/${IMG_TO_ID[p.img] ?? "robe-qipao-rouge"}`} style={{ cursor: "pointer", textDecoration: "none", color: "inherit", display: "block" }}>
              <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden", backgroundColor: CARD_BG }}>
                <Image src={p.img} alt={p.name} fill style={{ objectFit: "cover", objectPosition: "top", transition: "transform 0.5s" }} sizes="320px"
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.05)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
                />
                <span style={{ position: "absolute", top: "12px", left: "12px", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", padding: "4px 10px", backgroundColor: ACCENT, color: "#FFF", fontWeight: 700 }}>{p.tag}</span>
              </div>
              <div style={{ paddingTop: "12px" }}>
                <p style={{ fontSize: "12px", fontWeight: 600, lineHeight: 1.4 }}>{p.name}</p>
                <p style={{ fontSize: "14px", fontWeight: 800, color: ACCENT, marginTop: "4px" }}>{p.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Pièces Homme */}
      <section style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px 64px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
          <h2 style={{ fontSize: "24px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.01em" }}>Pièces Homme</h2>
          <a href="#" style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: ACCENT, fontWeight: 700, textDecoration: "none" }}>Voir Plus →</a>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
          {MEN.map((p, i) => (
            <Link key={i} href={`/showcase/elegant/produit/${IMG_TO_ID[p.img] ?? "robe-qipao-rouge"}`} style={{ cursor: "pointer", textDecoration: "none", color: "inherit", display: "block" }}>
              <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden", backgroundColor: CARD_BG }}>
                <Image src={p.img} alt={p.name} fill style={{ objectFit: "cover", objectPosition: "top", transition: "transform 0.5s" }} sizes="320px"
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.05)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
                />
              </div>
              <div style={{ paddingTop: "12px" }}>
                <p style={{ fontSize: "12px", fontWeight: 600, lineHeight: 1.4 }}>{p.name}</p>
                <p style={{ fontSize: "14px", fontWeight: 800, color: ACCENT, marginTop: "4px" }}>{p.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Avis */}
      <section style={{ backgroundColor: "#F2EDE7", padding: "64px 24px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "40px" }}>
            <div>
              <p style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: `${TEXT}40`, marginBottom: "8px" }}>Ce que disent nos clientes</p>
              <h2 style={{ fontSize: "32px", fontWeight: 300, fontFamily: "var(--font-cormorant)", letterSpacing: "0.05em" }}>Avis Google</h2>
              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "12px" }}>
                <span style={{ fontSize: "52px", fontWeight: 300, fontFamily: "var(--font-cormorant)", lineHeight: 1 }}>4.8</span>
                <div>
                  <div style={{ display: "flex", gap: "4px" }}>{[1,2,3,4,5].map((s) => <span key={s} style={{ color: ACCENT, fontSize: "14px" }}>★</span>)}</div>
                  <p style={{ fontSize: "11px", color: `${TEXT}50`, marginTop: "4px" }}>147 avis vérifiés</p>
                </div>
              </div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            {[
              { author: "Sophie M.", time: "il y a 2 semaines", text: "Boutique magnifique ! La sélection est très bien faite. J'ai trouvé ma robe parfaite. Je reviendrai sans hésiter." },
              { author: "Camille D.", time: "il y a 1 mois", text: "Un vrai coup de cœur ! Des vêtements de qualité. L'ambiance est chaleureuse, le service impeccable. Un incontournable du 13e." },
              { author: "Isabelle R.", time: "il y a 1 semaine", text: "Service exceptionnel et vêtements de belle qualité. La vitrine donne envie d'entrer. Merci à toute l'équipe !" },
            ].map((r, i) => (
              <div key={i} style={{ backgroundColor: CARD_BG, padding: "28px", display: "flex", flexDirection: "column", gap: "14px" }}>
                <span style={{ fontSize: "24px", color: ACCENT, opacity: 0.4 }}>"</span>
                <p style={{ fontSize: "13px", color: "#4A3728", lineHeight: 1.7, fontStyle: "italic" }}>{r.text}</p>
                <div style={{ display: "flex", gap: "4px" }}>{[1,2,3,4,5].map((s) => <span key={s} style={{ color: ACCENT, fontSize: "11px" }}>★</span>)}</div>
                <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: "12px" }}>
                  <p style={{ fontSize: "13px", fontWeight: 600 }}>{r.author}</p>
                  <p style={{ fontSize: "11px", color: `${TEXT}40`, marginTop: "2px" }}>{r.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram grid */}
      <section style={{ maxWidth: "1280px", margin: "0 auto", padding: "64px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
          <h2 style={{ fontSize: "24px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.01em" }}>Nos Inspirations</h2>
          <a href="#" style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: ACCENT, fontWeight: 700, textDecoration: "none" }}>@hoaly_paris</a>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }}>
          {INSTA.map((img, i) => (
            <div key={i} style={{ position: "relative", aspectRatio: "1/1", overflow: "hidden", cursor: "pointer" }}>
              <Image src={img} alt="" fill style={{ objectFit: "cover", objectPosition: "top", transition: "transform 0.5s" }} sizes="320px"
                onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.08)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Info boutique */}
      <section style={{ backgroundColor: "#F2EDE7", padding: "64px 24px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px" }}>
          <div>
            <p style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: `${TEXT}40`, marginBottom: "8px" }}>Venez nous rendre visite</p>
            <h2 style={{ fontSize: "32px", fontWeight: 300, fontFamily: "var(--font-cormorant)", letterSpacing: "0.05em", marginBottom: "32px" }}>Notre Boutique</h2>
            {[
              { label: "Adresse", value: "50 Avenue de Choisy, 75013 Paris" },
              { label: "Téléphone", value: "01 53 79 25 44" },
              { label: "Horaires", value: "Mar–Ven 10h–19h30 · Sam 10h–19h · Dim 11h–17h" },
              { label: "Métro", value: "Ligne 7 — Place d'Italie ou Tolbiac" },
            ].map((item) => (
              <div key={item.label} style={{ display: "flex", gap: "16px", marginBottom: "20px", alignItems: "flex-start" }}>
                <div style={{ width: "4px", height: "4px", borderRadius: "50%", backgroundColor: ACCENT, marginTop: "8px", flexShrink: 0 }} />
                <div>
                  <p style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: `${TEXT}40`, marginBottom: "4px" }}>{item.label}</p>
                  <p style={{ fontSize: "14px", lineHeight: 1.6, color: TEXT }}>{item.value}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ backgroundColor: "#E8DDD5", display: "flex", alignItems: "center", justifyContent: "center", padding: "32px" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "50%", backgroundColor: ACCENT, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <p style={{ fontSize: "15px", fontWeight: 700, color: TEXT }}>50 Avenue de Choisy</p>
              <p style={{ fontSize: "12px", color: `${TEXT}60`, marginTop: "4px" }}>75013 Paris</p>
              <p style={{ fontSize: "11px", color: `${TEXT}40`, marginTop: "12px", letterSpacing: "0.1em" }}>VOIR SUR GOOGLE MAPS →</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: ACCENT, color: "#FFF" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "64px 24px 32px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "48px", paddingBottom: "48px", borderBottom: "1px solid rgba(255,255,255,0.2)" }}>
            <div>
              <p style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: "8px" }}>Restez informée</p>
              <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.75)", lineHeight: 1.7, marginBottom: "16px", maxWidth: "220px" }}>Recevez nos exclusivités et nouveautés en avant-première.</p>
              <div style={{ display: "flex" }}>
                <input type="email" placeholder="Votre email" style={{ flex: 1, fontSize: "12px", padding: "10px 12px", backgroundColor: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", color: "#FFF", outline: "none" }} />
                <button style={{ backgroundColor: "#FFF", color: ACCENT, fontSize: "12px", fontWeight: 700, padding: "10px 16px", border: "none", cursor: "pointer" }}>→</button>
              </div>
            </div>
            {[
              { title: "Shop", links: ["Femme", "Homme", "Enfant", "Nouvelles Arrivées"] },
              { title: "Aide", links: ["Livraison", "Retours", "FAQ", "Tailles"] },
              { title: "Connexion", links: ["Instagram", "Facebook", "Pinterest"] },
            ].map((col) => (
              <div key={col.title}>
                <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: "16px" }}>{col.title}</p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                  {col.links.map((l) => <li key={l} style={{ fontSize: "12px", color: "rgba(255,255,255,0.75)" }}>{l}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ overflow: "hidden", paddingTop: "8px" }}>
            <p style={{ fontSize: "clamp(4rem, 18vw, 14rem)", fontWeight: 900, color: "rgba(255,255,255,0.1)", lineHeight: 1, letterSpacing: "-0.02em", textAlign: "right" }}>HOA LY</p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "8px" }}>
            <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.45)" }}>© 2025 Hoa Ly SARL — 50 Av. de Choisy, 75013 Paris</p>
            <a href="/mentions-legales" style={{ fontSize: "10px", color: "rgba(255,255,255,0.45)", textDecoration: "none" }}>Mentions légales</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
