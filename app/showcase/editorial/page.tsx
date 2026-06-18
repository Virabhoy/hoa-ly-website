"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IMG_TO_ID } from "@/lib/showcase-data";

const CATS = ["Tout", "Robes", "Hauts", "Vestes", "Ensembles"];

const PRODUCTS = [
  { name: "Robe Qipao Rouge", price: "89,90 €", img: "/images/D04B9161.jpg", cat: "Robes" },
  { name: "Veste Tang Grise", price: "145,00 €", img: "/images/D04B8902.jpg", cat: "Vestes" },
  { name: "Áo Dài Bleu Fleuri", price: "115,00 €", img: "/images/D04B9112.jpg", cat: "Robes" },
  { name: "Kimono Satin Noir", price: "149,90 €", img: "/images/D04B9128.jpg", cat: "Robes" },
  { name: "Haut Brodé Phoenix", price: "75,00 €", img: "/images/D04B9137.jpg", cat: "Hauts" },
  { name: "Ensemble Tang Bleu", price: "185,00 €", img: "/images/D04B8910.jpg", cat: "Ensembles" },
  { name: "Top Qipao Bleu", price: "65,00 €", img: "/images/D04B9150.jpg", cat: "Hauts" },
  { name: "Veste Tang Fuchsia", price: "175,00 €", img: "/images/D04B9146.jpg", cat: "Vestes" },
];

const MORE = [
  { name: "Áo Dài Rouge Brodée", price: "125,00 €", img: "/images/D04B9067.jpg" },
  { name: "Chemise Tang Rouge", price: "89,00 €", img: "/images/D04B9094.jpg" },
  { name: "Kimono Bordeaux", price: "98,00 €", img: "/images/D04B9153.jpg" },
  { name: "Ensemble Noir Dragon", price: "165,00 €", img: "/images/D04B9149.jpg" },
];

const RECO = [
  { name: "Chemise Tang Grise", price: "79,00 €", img: "/images/D04B9182.jpg" },
  { name: "Manteau Wax Coloré", price: "195,00 €", img: "/images/D04B8981.jpg" },
  { name: "Kimono Noir Dragon", price: "149,90 €", img: "/images/D04B9128.jpg" },
  { name: "Robe Qipao Enfant", price: "45,00 €", img: "/images/PER_9038.jpg" },
];

export default function EditorialPage() {
  const [activeCat, setActiveCat] = useState("Tout");
  const filtered = activeCat === "Tout" ? PRODUCTS : PRODUCTS.filter((p) => p.cat === activeCat);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#FFFFFF", color: "#0A0A0A", fontFamily: "var(--font-inter, sans-serif)" }}>

      {/* Navbar */}
      <nav style={{ borderBottom: "1px solid rgba(0,0,0,0.08)", backgroundColor: "#FFFFFF", position: "sticky", top: "44px", zIndex: 50 }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", height: "56px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: "32px" }}>
            {["À Propos", "Presse", "Notre Histoire"].map((l) => (
              <a key={l} href="#" style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#0A0A0A", textDecoration: "none", opacity: 0.5 }}>{l}</a>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "50%", overflow: "hidden", flexShrink: 0, boxShadow: "0 1px 4px rgba(0,0,0,0.12)" }}>
              <Image src="/images/Logo Hoaly.png" alt="Hoa Ly" width={36} height={36} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <span style={{ fontSize: "18px", fontWeight: 900, letterSpacing: "0.2em", textTransform: "uppercase" }}>HOA LY</span>
          </div>
          <div style={{ display: "flex", gap: "32px" }}>
            {["Boutique", "Lookbook", "Contact"].map((l) => (
              <a key={l} href="#" style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#0A0A0A", textDecoration: "none", opacity: 0.5 }}>{l}</a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ maxWidth: "1280px", margin: "0 auto", padding: "48px 24px 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", alignItems: "start" }}>
          {/* Left */}
          <div style={{ paddingTop: "16px" }}>
            <p style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(0,0,0,0.35)", marginBottom: "12px" }}>— Nouvelle Collection</p>
            <h1 style={{ fontSize: "clamp(3rem, 8vw, 7rem)", fontWeight: 900, textTransform: "uppercase", lineHeight: 0.88, letterSpacing: "-0.02em", margin: 0 }}>
              NOS<br />DERNIÈRES<br />CRÉATIONS
            </h1>
            <p style={{ marginTop: "24px", fontSize: "14px", color: "rgba(0,0,0,0.45)", maxWidth: "300px", lineHeight: 1.7 }}>
              Mode d&apos;inspiration asiatique au cœur de Paris — tradition, élégance et contemporanéité.
            </p>
            <div style={{ display: "flex", gap: "12px", marginTop: "32px" }}>
              <button style={{ backgroundColor: "#0A0A0A", color: "#FFF", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", padding: "12px 32px", border: "none", cursor: "pointer" }}>
                Découvrir
              </button>
              <button style={{ backgroundColor: "transparent", color: "#0A0A0A", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", padding: "12px 32px", border: "1px solid #0A0A0A", cursor: "pointer" }}>
                Lookbook
              </button>
            </div>
          </div>
          {/* Right: image with overlap card */}
          <div style={{ position: "relative", marginTop: "-32px" }}>
            <div style={{ position: "relative", height: "520px", overflow: "hidden" }}>
              <Image src="/images/D04B8981.jpg" alt="Collection" fill style={{ objectFit: "cover", objectPosition: "top" }} sizes="640px" />
            </div>
            <div style={{ position: "absolute", bottom: "-16px", left: "-48px", backgroundColor: "#FFF", padding: "16px 20px", border: "1px solid rgba(0,0,0,0.08)" }}>
              <p style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(0,0,0,0.35)", marginBottom: "4px" }}>Collection</p>
              <p style={{ fontSize: "18px", fontWeight: 900, textTransform: "uppercase", lineHeight: 1.1 }}>Printemps<br />2025</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px 64px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "48px 0 28px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.1em" }}>Nos Collections</h2>
            <Link href="/showcase/editorial/catalogue" style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(0,0,0,0.4)", textDecoration: "none" }}>Tout voir →</Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
            {[
              { name: "Nouveautés", img: "/images/D04B8981.jpg", count: 8, slug: "nouveautes" },
              { name: "Robes", img: "/images/D04B9067.jpg", count: 7, slug: "robes" },
              { name: "Hauts & Tops", img: "/images/D04B9137.jpg", count: 4, slug: "hauts" },
              { name: "Pantalons", img: "/images/D04B9089.jpg", count: 3, slug: "pantalons" },
              { name: "Vestes", img: "/images/D04B8902.jpg", count: 5, slug: "vestes" },
              { name: "Accessoires", img: "/images/D04B9153.jpg", count: 2, slug: "accessoires" },
            ].map((cat, i) => (
              <Link key={i} href={`/showcase/editorial/catalogue/${cat.slug}`} style={{ position: "relative", height: "200px", overflow: "hidden", cursor: "pointer", display: "block", textDecoration: "none" }}>
                <Image src={cat.img} alt={cat.name} fill style={{ objectFit: "cover", objectPosition: "top", transition: "transform 0.5s" }} sizes="430px"
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.05)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 55%)" }} />
                <div style={{ position: "absolute", bottom: "14px", left: "14px" }}>
                  <p style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#FFF" }}>{cat.name}</p>
                  <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.55)", letterSpacing: "0.1em", marginTop: "2px" }}>{cat.count} pièces</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Products section */}
      <section style={{ maxWidth: "1280px", margin: "64px auto 0", padding: "0 24px 64px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px" }}>
          <h2 style={{ fontSize: "24px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.1em" }}>Nos Produits</h2>
          <Link href="/showcase/editorial/catalogue" style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(0,0,0,0.4)", textDecoration: "none" }}>Tout voir →</Link>
        </div>

        {/* Category filter */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "40px", flexWrap: "wrap" }}>
          {CATS.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              style={{
                padding: "8px 20px",
                fontSize: "11px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                fontWeight: 600,
                border: "1px solid",
                cursor: "pointer",
                transition: "all 0.15s",
                backgroundColor: activeCat === cat ? "#0A0A0A" : "#FFF",
                color: activeCat === cat ? "#FFF" : "rgba(0,0,0,0.5)",
                borderColor: activeCat === cat ? "#0A0A0A" : "rgba(0,0,0,0.15)",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 4-col grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
          {filtered.map((p, i) => (
            <Link key={i} href={`/showcase/editorial/produit/${IMG_TO_ID[p.img] ?? "robe-qipao-rouge"}`} style={{ cursor: "pointer", textDecoration: "none", color: "inherit", display: "block" }}>
              <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden", backgroundColor: "#F5F5F5" }}>
                <Image src={p.img} alt={p.name} fill style={{ objectFit: "cover", objectPosition: "top", transition: "transform 0.5s" }} sizes="320px"
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.06)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
                />
              </div>
              <div style={{ paddingTop: "12px" }}>
                <p style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", lineHeight: 1.3 }}>{p.name}</p>
                <p style={{ fontSize: "13px", color: "rgba(0,0,0,0.5)", marginTop: "4px" }}>{p.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Dark billboard */}
      <section style={{ backgroundColor: "#0A0A0A", color: "#FAFAF9", padding: "64px 24px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center" }}>
          <div style={{ position: "relative", height: "400px", overflow: "hidden" }}>
            <Image src="/images/D04B9067.jpg" alt="" fill style={{ objectFit: "cover", objectPosition: "top" }} sizes="640px" />
            <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.15)" }} />
          </div>
          <div>
            <p style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "12px" }}>Notre Identité</p>
            <h2 style={{ fontSize: "clamp(3rem, 7vw, 6rem)", fontWeight: 900, textTransform: "uppercase", lineHeight: 0.88, letterSpacing: "-0.02em" }}>
              MATCH<br />PARFAIT
            </h2>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.45)", marginTop: "20px", maxWidth: "300px", lineHeight: 1.7 }}>
              Trouvez votre pièce signature parmi notre sélection curated de créations d&apos;inspiration asiatique.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginTop: "40px" }}>
              {[{ v: "700+", l: "Pièces" }, { v: "6", l: "Catégories" }, { v: "5+", l: "Univers" }, { v: "380", l: "Clientes" }].map((s) => (
                <div key={s.l}>
                  <p style={{ fontSize: "28px", fontWeight: 900, color: "#FAFAF9" }}>{s.v}</p>
                  <p style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginTop: "4px" }}>{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* More products */}
      <section style={{ maxWidth: "1280px", margin: "0 auto", padding: "64px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.1em" }}>Sélection Phare</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
          {MORE.map((p, i) => (
            <Link key={i} href={`/showcase/editorial/produit/${IMG_TO_ID[p.img] ?? "robe-qipao-rouge"}`} style={{ cursor: "pointer", textDecoration: "none", color: "inherit", display: "block" }}>
              <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden", backgroundColor: "#F5F5F5" }}>
                <Image src={p.img} alt={p.name} fill style={{ objectFit: "cover", objectPosition: "top", transition: "transform 0.5s" }} sizes="320px"
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.06)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
                />
              </div>
              <div style={{ paddingTop: "12px" }}>
                <p style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>{p.name}</p>
                <p style={{ fontSize: "13px", color: "rgba(0,0,0,0.5)", marginTop: "4px" }}>{p.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Avis */}
      <section style={{ backgroundColor: "#F5F5F5", padding: "64px 24px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "40px" }}>
            <div>
              <p style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(0,0,0,0.4)", marginBottom: "8px" }}>Ce que disent nos clientes</p>
              <h2 style={{ fontSize: "36px", fontWeight: 300, fontFamily: "var(--font-cormorant)", letterSpacing: "0.05em" }}>Avis Google</h2>
              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "12px" }}>
                <span style={{ fontSize: "56px", fontWeight: 300, fontFamily: "var(--font-cormorant)", lineHeight: 1 }}>4.8</span>
                <div>
                  <div style={{ display: "flex", gap: "3px", marginBottom: "4px" }}>
                    {[1,2,3,4,5].map((s) => <span key={s} style={{ color: "#0A0A0A", fontSize: "14px" }}>★</span>)}
                  </div>
                  <p style={{ fontSize: "11px", color: "rgba(0,0,0,0.4)" }}>147 avis vérifiés</p>
                </div>
              </div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            {[
              { author: "Sophie M.", time: "il y a 2 semaines", text: "Boutique magnifique ! La sélection est très bien faite et les conseils sont précieux. J'ai trouvé ma robe de soirée parfaite. Je reviendrai sans hésiter." },
              { author: "Camille D.", time: "il y a 1 mois", text: "Un vrai coup de cœur ! Des vêtements de qualité à des prix accessibles. L'ambiance est chaleureuse, le service impeccable. Un incontournable du 13e." },
              { author: "Marie L.", time: "il y a 3 semaines", text: "J'adore cette boutique, j'y reviens à chaque saison. La collection est superbe. La gérante a un œil parfait pour choisir ses pièces uniques." },
            ].map((r, i) => (
              <div key={i} style={{ backgroundColor: "#FFF", padding: "28px", display: "flex", flexDirection: "column", gap: "16px" }}>
                <span style={{ fontSize: "20px", color: "rgba(0,0,0,0.2)" }}>"</span>
                <p style={{ fontSize: "13px", color: "#3A3A3A", lineHeight: 1.7, fontStyle: "italic" }}>{r.text}</p>
                <div style={{ display: "flex", gap: "2px" }}>{[1,2,3,4,5].map((s) => <span key={s} style={{ color: "#0A0A0A", fontSize: "11px" }}>★</span>)}</div>
                <div style={{ borderTop: "1px solid #F0EDE8", paddingTop: "12px" }}>
                  <p style={{ fontSize: "13px", fontWeight: 600 }}>{r.author}</p>
                  <p style={{ fontSize: "11px", color: "rgba(0,0,0,0.4)", marginTop: "2px" }}>{r.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recommandations */}
      <section style={{ maxWidth: "1280px", margin: "0 auto", padding: "64px 24px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "32px" }}>Recommandations</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
          {RECO.map((p, i) => (
            <Link key={i} href={`/showcase/editorial/produit/${IMG_TO_ID[p.img] ?? "robe-qipao-rouge"}`} style={{ cursor: "pointer", textDecoration: "none", color: "inherit", display: "block" }}>
              <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden", backgroundColor: "#F5F5F5" }}>
                <Image src={p.img} alt={p.name} fill style={{ objectFit: "cover", objectPosition: "top", transition: "transform 0.5s" }} sizes="320px"
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.06)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
                />
              </div>
              <div style={{ paddingTop: "12px" }}>
                <p style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>{p.name}</p>
                <p style={{ fontSize: "13px", color: "rgba(0,0,0,0.5)", marginTop: "4px" }}>{p.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Store info */}
      <section style={{ backgroundColor: "#F5F5F5", padding: "64px 24px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "start" }}>
          <div>
            <p style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(0,0,0,0.4)", marginBottom: "8px" }}>Venez nous rendre visite</p>
            <h2 style={{ fontSize: "36px", fontWeight: 300, fontFamily: "var(--font-cormorant)", letterSpacing: "0.05em", marginBottom: "32px" }}>Notre Boutique</h2>
            {[
              { icon: "📍", label: "Adresse", value: "50 Avenue de Choisy, 75013 Paris" },
              { icon: "📞", label: "Téléphone", value: "01 53 79 25 44" },
              { icon: "🕐", label: "Horaires", value: "Mar–Ven : 10h–19h30 | Sam : 10h–19h | Dim : 11h–17h" },
              { icon: "🚇", label: "Métro", value: "Ligne 7 — Place d'Italie ou Tolbiac" },
            ].map((item) => (
              <div key={item.label} style={{ display: "flex", gap: "16px", marginBottom: "20px" }}>
                <span style={{ fontSize: "16px", marginTop: "2px" }}>{item.icon}</span>
                <div>
                  <p style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(0,0,0,0.4)", marginBottom: "4px" }}>{item.label}</p>
                  <p style={{ fontSize: "14px", lineHeight: 1.6 }}>{item.value}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ position: "relative", height: "400px", backgroundColor: "#E0DDD8", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(0,0,0,0.08)" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "32px", marginBottom: "8px" }}>📍</div>
              <p style={{ fontSize: "14px", fontWeight: 600 }}>50 Avenue de Choisy</p>
              <p style={{ fontSize: "12px", color: "rgba(0,0,0,0.5)", marginTop: "4px" }}>75013 Paris</p>
              <p style={{ fontSize: "11px", color: "rgba(0,0,0,0.35)", marginTop: "8px" }}>Ouvrez sur Google Maps →</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: "#0A0A0A", color: "#FAFAF9" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "48px 24px 24px" }}>
          <div style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "40px", display: "flex", justifyContent: "space-between", alignItems: "start" }}>
            <div style={{ display: "flex", gap: "24px" }}>
              {["Instagram", "Pinterest", "Contact"].map((l) => (
                <a key={l} href="#" style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>{l}</a>
              ))}
            </div>
          </div>
          <div style={{ padding: "24px 0" }}>
            <h2 style={{ fontSize: "clamp(5rem, 18vw, 14rem)", fontWeight: 900, textTransform: "uppercase", lineHeight: 0.8, letterSpacing: "-0.02em", color: "rgba(255,255,255,0.05)", margin: 0 }}>
              HOA<br />LY
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "32px", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "32px" }}>
            {[
              { title: "HOA LY", links: ["Concept", "Presse", "Carrières"] },
              { title: "Information", links: ["Boutique", "Lookbook", "Éditions"] },
              { title: "Livraison", links: ["Politique", "Retours", "Suivi"] },
              { title: "Contact", links: ["Email", "Téléphone", "FAQ"] },
            ].map((col) => (
              <div key={col.title}>
                <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: "16px" }}>{col.title}</p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                  {col.links.map((l) => <li key={l}><a href="#" style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>{l}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "24px", borderTop: "1px solid rgba(255,255,255,0.08)", marginTop: "24px" }}>
            <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.25)" }}>© 2025 Hoa Ly SARL — 50 Avenue de Choisy, 75013 Paris</p>
            <a href="/mentions-legales" style={{ fontSize: "10px", color: "rgba(255,255,255,0.25)", textDecoration: "none" }}>Mentions légales</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
