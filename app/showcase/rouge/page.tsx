"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IMG_TO_ID } from "@/lib/showcase-data";

const RED = "#DC2626";
const DARK = "#0F0F0F";

const CATS = ["Tout", "Robes", "Hauts", "Vestes", "Ensembles"];

const PRODUCTS = [
  { name: "Robe Qipao Rouge", price: "89,90 €", img: "/images/D04B9161.jpg", cat: "Robes", rating: 4.9, reviews: 48 },
  { name: "Áo Dài Rouge Brodée", price: "125,00 €", img: "/images/D04B9067.jpg", cat: "Robes", rating: 5.0, reviews: 32 },
  { name: "Veste Tang Fuchsia", price: "175,00 €", img: "/images/D04B9146.jpg", cat: "Vestes", rating: 4.8, reviews: 21 },
  { name: "Kimono Satin Noir", price: "149,90 €", img: "/images/D04B9128.jpg", cat: "Robes", rating: 4.9, reviews: 56 },
  { name: "Ensemble Noir Dragon", price: "165,00 €", img: "/images/D04B9149.jpg", cat: "Ensembles", rating: 4.7, reviews: 18 },
  { name: "Haut Brodé Phoenix", price: "75,00 €", img: "/images/D04B9137.jpg", cat: "Hauts", rating: 4.8, reviews: 44 },
];

const TICKER = "NOUVELLE COLLECTION ★ DÉCOUVREZ NOS PIÈCES ★ HOA LY PARIS ★ STYLE ASIATIQUE ★ EXPRIMEZ VOTRE STYLE ★ ";

function Stars({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", gap: "2px" }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} width="10" height="10" viewBox="0 0 24 24" fill={s <= Math.floor(rating) ? RED : "#E5E7EB"} xmlns="http://www.w3.org/2000/svg">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export default function RougePage() {
  const [activeCat, setActiveCat] = useState("Tout");
  const filtered = activeCat === "Tout" ? PRODUCTS : PRODUCTS.filter((p) => p.cat === activeCat);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#FFFFFF", color: DARK, fontFamily: "var(--font-inter, sans-serif)" }}>

      {/* Ticker */}
      <div style={{ backgroundColor: RED, overflow: "hidden", padding: "8px 0" }}>
        <div className="ticker-animate">
          {[...Array(6)].map((_, i) => (
            <span key={i} style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 700, color: "#FFF", paddingRight: "0" }}>{TICKER}</span>
          ))}
        </div>
      </div>

      {/* Navbar */}
      <nav style={{ borderBottom: "1px solid #F3F4F6", backgroundColor: "#FFF", position: "sticky", top: "44px", zIndex: 50 }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", height: "56px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: "28px" }}>
            {["Nouveautés", "Collections", "Tout voir"].map((l) => (
              <a key={l} href="#" style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#6B7280", textDecoration: "none" }}>{l}</a>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "50%", overflow: "hidden", flexShrink: 0, boxShadow: `0 0 0 2px ${RED}` }}>
              <Image src="/images/Logo Hoaly.png" alt="Hoa Ly" width={36} height={36} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <span style={{ fontSize: "18px", fontWeight: 900, letterSpacing: "0.2em", textTransform: "uppercase" }}>HOA LY</span>
          </div>
          <div style={{ display: "flex", gap: "20px" }}>
            <a href="#" style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#6B7280", textDecoration: "none" }}>Panier (2)</a>
            <a href="/admin" style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: RED, textDecoration: "none", fontWeight: 700 }}>Connexion</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ maxWidth: "1280px", margin: "0 auto", padding: "48px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "center", minHeight: "520px" }}>
          {/* Left */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
              <div style={{ width: "32px", height: "1px", backgroundColor: RED }} />
              <span style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: RED, fontWeight: 700 }}>Collection 2025</span>
            </div>
            <h1 style={{ fontSize: "clamp(3rem, 7vw, 6rem)", fontWeight: 900, textTransform: "uppercase", lineHeight: 0.85, letterSpacing: "-0.02em", margin: "0 0 24px" }}>
              EXPRIMEZ<br />VOTRE<br /><span style={{ color: RED }}>STYLE</span>
            </h1>
            <p style={{ fontSize: "14px", color: "#6B7280", maxWidth: "300px", lineHeight: 1.7 }}>
              Mode unique alliant traditions asiatiques et élégance parisienne contemporaine.
            </p>
            <div style={{ display: "flex", gap: "12px", marginTop: "32px" }}>
              <button style={{ backgroundColor: RED, color: "#FFF", fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", padding: "14px 32px", border: "none", cursor: "pointer" }}>
                Acheter Maintenant
              </button>
              <button style={{ backgroundColor: "transparent", color: DARK, fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", padding: "14px 32px", border: "1px solid #E5E7EB", cursor: "pointer" }}>
                Explorer →
              </button>
            </div>
            <div style={{ display: "flex", gap: "40px", marginTop: "40px" }}>
              {[{ v: "700+", l: "Articles" }, { v: "4.8★", l: "Note moyenne" }, { v: "2 000+", l: "Clientes" }].map((s) => (
                <div key={s.l}>
                  <p style={{ fontSize: "22px", fontWeight: 900, color: DARK }}>{s.v}</p>
                  <p style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#9CA3AF", marginTop: "2px" }}>{s.l}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Right */}
          <div style={{ position: "relative" }}>
            <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden" }}>
              <Image src="/images/D04B9067.jpg" alt="Hero" fill style={{ objectFit: "cover", objectPosition: "top" }} sizes="640px" />
            </div>
            <div style={{ position: "absolute", top: "-16px", right: "-16px", backgroundColor: RED, color: "#FFF", padding: "16px 20px", textAlign: "center" }}>
              <p style={{ fontSize: "32px", fontWeight: 900, lineHeight: 1 }}>35%</p>
              <p style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", marginTop: "2px" }}>DE RÉD.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px 64px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
          <h2 style={{ fontSize: "24px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.01em" }}>Nos Collections</h2>
          <Link href="/showcase/rouge/catalogue" style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: RED, fontWeight: 700, textDecoration: "none" }}>Tout voir →</Link>
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
            <Link key={i} href={`/showcase/rouge/catalogue/${cat.slug}`} style={{ position: "relative", height: "190px", overflow: "hidden", cursor: "pointer", display: "block", textDecoration: "none" }}>
              <Image src={cat.img} alt={cat.name} fill style={{ objectFit: "cover", objectPosition: "top", transition: "transform 0.5s" }} sizes="430px"
                onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.05)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,15,15,0.75) 0%, transparent 55%)" }} />
              <div style={{ position: "absolute", bottom: "12px", left: "12px" }}>
                <p style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#FFF" }}>{cat.name}</p>
                <p style={{ fontSize: "10px", color: `${RED}CC`, letterSpacing: "0.1em", marginTop: "2px" }}>{cat.count} pièces</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Nouvelles Collections */}
      <section style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px 64px" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "24px" }}>
          <div>
            <p style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#9CA3AF", marginBottom: "6px" }}>Inspirés par la saison</p>
            <h2 style={{ fontSize: "28px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.01em" }}>Nouvelles Collections</h2>
          </div>
          <button style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: RED, fontWeight: 700, background: "none", border: "none", cursor: "pointer" }}>Tout voir →</button>
        </div>
        {/* Horizontal scroll */}
        <div style={{ display: "flex", gap: "16px", overflowX: "auto", paddingBottom: "16px", scrollbarWidth: "none" }}>
          {[
            { img: "/images/D04B9161.jpg", name: "Robe Qipao Rouge", price: "89,90 €" },
            { img: "/images/D04B8981.jpg", name: "Manteau Wax Paris", price: "195,00 €" },
            { img: "/images/D04B9128.jpg", name: "Kimono Satin Noir", price: "149,90 €" },
            { img: "/images/D04B9146.jpg", name: "Veste Tang Fuchsia", price: "175,00 €" },
            { img: "/images/D04B9112.jpg", name: "Áo Dài Bleu Fleuri", price: "115,00 €" },
            { img: "/images/D04B9153.jpg", name: "Kimono Bordeaux", price: "98,00 €" },
          ].map((p, i) => (
            <Link key={i} href={`/showcase/rouge/produit/${IMG_TO_ID[p.img] ?? "robe-qipao-rouge"}`} style={{ flexShrink: 0, width: "180px", cursor: "pointer", textDecoration: "none", color: "inherit", display: "block" }}>
              <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden", backgroundColor: "#F9FAFB" }}>
                <Image src={p.img} alt={p.name} fill style={{ objectFit: "cover", objectPosition: "top" }} sizes="200px" />
              </div>
              <p style={{ marginTop: "8px", fontSize: "12px", fontWeight: 600, lineHeight: 1.3 }}>{p.name}</p>
              <p style={{ fontSize: "13px", fontWeight: 700, color: RED, marginTop: "2px" }}>{p.price}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Category filter + grid */}
      <section style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px 64px", borderTop: "1px solid #F3F4F6" }}>
        <div style={{ marginBottom: "24px", marginTop: "48px" }}>
          <h2 style={{ fontSize: "28px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.01em", marginBottom: "6px" }}>Trouver par Catégorie</h2>
          <p style={{ fontSize: "13px", color: "#9CA3AF" }}>Trouvez le style qui vous correspond.</p>
        </div>
        <div style={{ display: "flex", gap: "8px", marginBottom: "32px", flexWrap: "wrap" }}>
          {CATS.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              style={{
                padding: "8px 20px",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                borderRadius: "999px",
                border: "none",
                cursor: "pointer",
                transition: "all 0.15s",
                backgroundColor: activeCat === cat ? RED : "#F3F4F6",
                color: activeCat === cat ? "#FFF" : "#6B7280",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
          {filtered.map((p, i) => (
            <Link key={i} href={`/showcase/rouge/produit/${IMG_TO_ID[p.img] ?? "robe-qipao-rouge"}`} style={{ cursor: "pointer", textDecoration: "none", color: "inherit", display: "block" }}>
              <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden", backgroundColor: "#F9FAFB" }}>
                <Image src={p.img} alt={p.name} fill style={{ objectFit: "cover", objectPosition: "top" }} sizes="430px" />
                <div style={{ position: "absolute", top: "12px", right: "12px", backgroundColor: "rgba(255,255,255,0.9)", padding: "4px 10px", fontSize: "12px", fontWeight: 700, backdropFilter: "blur(4px)" }}>
                  {p.price}
                </div>
              </div>
              <div style={{ paddingTop: "12px" }}>
                <p style={{ fontSize: "14px", fontWeight: 600, lineHeight: 1.3 }}>{p.name}</p>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "6px" }}>
                  <Stars rating={p.rating} />
                  <span style={{ fontSize: "11px", color: "#9CA3AF" }}>({p.reviews})</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Dark CTA section */}
      <section style={{ backgroundColor: DARK, color: "#FFF" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "64px 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center" }}>
          <div>
            <p style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: RED, fontWeight: 700, marginBottom: "12px" }}>Collection Exclusive</p>
            <h2 style={{ fontSize: "clamp(3rem, 7vw, 5rem)", fontWeight: 900, textTransform: "uppercase", lineHeight: 0.88, letterSpacing: "-0.02em" }}>
              COLLECTION<br /><span style={{ color: RED }}>PHARE</span>
            </h2>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.45)", marginTop: "20px", maxWidth: "280px", lineHeight: 1.7 }}>
              Nos pièces les plus emblématiques — tradition asiatique et mode contemporaine parisienne.
            </p>
            <button style={{ marginTop: "32px", backgroundColor: RED, color: "#FFF", fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", padding: "14px 32px", border: "none", cursor: "pointer" }}>
              Découvrir →
            </button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div style={{ position: "relative", aspectRatio: "3/4" }}>
              <Image src="/images/D04B9094.jpg" alt="" fill style={{ objectFit: "cover", objectPosition: "top" }} sizes="300px" />
            </div>
            <div style={{ position: "relative", aspectRatio: "3/4", marginTop: "32px" }}>
              <Image src="/images/D04B9150.jpg" alt="" fill style={{ objectFit: "cover", objectPosition: "top" }} sizes="300px" />
            </div>
          </div>
        </div>
      </section>

      {/* Meilleures tenues */}
      <section style={{ maxWidth: "1280px", margin: "0 auto", padding: "64px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
          <h2 style={{ fontSize: "28px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.01em" }}>Meilleures Tenues</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
          {[
            { img: "/images/D04B9182.jpg", name: "Chemise Tang Grise", price: "79,00 €" },
            { img: "/images/D04B8910.jpg", name: "Ensemble Tang Bleu", price: "185,00 €" },
            { img: "/images/D04B9153.jpg", name: "Kimono Bordeaux", price: "98,00 €" },
            { img: "/images/PER_9038.jpg", name: "Robe Qipao Enfant", price: "45,00 €" },
          ].map((p, i) => (
            <Link key={i} href={`/showcase/rouge/produit/${IMG_TO_ID[p.img] ?? "robe-qipao-rouge"}`} style={{ cursor: "pointer", textDecoration: "none", color: "inherit", display: "block" }}>
              <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden", backgroundColor: "#F9FAFB" }}>
                <Image src={p.img} alt={p.name} fill style={{ objectFit: "cover", objectPosition: "top" }} sizes="320px" />
              </div>
              <p style={{ marginTop: "8px", fontSize: "13px", fontWeight: 600, lineHeight: 1.3 }}>{p.name}</p>
              <p style={{ fontSize: "13px", fontWeight: 700, color: RED, marginTop: "2px" }}>{p.price}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Avis */}
      <section style={{ backgroundColor: "#F9FAFB", padding: "64px 24px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "40px" }}>
            <div>
              <p style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#9CA3AF", marginBottom: "8px" }}>Ce que disent nos clientes</p>
              <h2 style={{ fontSize: "28px", fontWeight: 900, textTransform: "uppercase" }}>Avis Vérifiés</h2>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "10px" }}>
                <span style={{ fontSize: "48px", fontWeight: 900, color: DARK, lineHeight: 1 }}>4.8</span>
                <div>
                  <Stars rating={5} />
                  <p style={{ fontSize: "11px", color: "#9CA3AF", marginTop: "4px" }}>147 avis vérifiés</p>
                </div>
              </div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            {[
              { author: "Sophie M.", time: "il y a 2 semaines", text: "Boutique magnifique ! La sélection est très bien faite. J'ai trouvé ma robe de soirée parfaite. Je reviendrai sans hésiter." },
              { author: "Camille D.", time: "il y a 1 mois", text: "Un vrai coup de cœur ! Des vêtements de qualité à des prix accessibles. L'ambiance est chaleureuse, le service impeccable." },
              { author: "Nguyen T.", time: "il y a 2 mois", text: "Très belle boutique avec une sélection originale et tendance. Personnel attentionné. Je recommande pour trouver des pièces uniques." },
            ].map((r, i) => (
              <div key={i} style={{ backgroundColor: "#FFF", padding: "24px", borderLeft: `3px solid ${RED}` }}>
                <Stars rating={5} />
                <p style={{ fontSize: "13px", color: "#374151", lineHeight: 1.7, margin: "12px 0", fontStyle: "italic" }}>&ldquo;{r.text}&rdquo;</p>
                <p style={{ fontSize: "13px", fontWeight: 700 }}>{r.author}</p>
                <p style={{ fontSize: "11px", color: "#9CA3AF", marginTop: "2px" }}>{r.time}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Red ticker footer */}
      <div style={{ backgroundColor: RED, overflow: "hidden", padding: "8px 0" }}>
        <div className="ticker-animate">
          {[...Array(6)].map((_, i) => (
            <span key={i} style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 700, color: "#FFF" }}>{TICKER}</span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer style={{ backgroundColor: DARK, color: "#FFF" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "64px 24px 32px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "48px", paddingBottom: "48px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: RED }} />
                <span style={{ fontSize: "22px", fontWeight: 900, letterSpacing: "0.2em", textTransform: "uppercase" }}>HOA LY</span>
              </div>
              <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)", lineHeight: 1.7, maxWidth: "220px" }}>Prêt-à-porter féminin d&apos;inspiration asiatique — 13e arrondissement de Paris.</p>
              <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", marginTop: "12px" }}>50 Avenue de Choisy, 75013 Paris</p>
            </div>
            {[
              { title: "Shop", links: ["Nouveautés", "Robes", "Hauts", "Vestes"] },
              { title: "Aide", links: ["Livraison", "Retours", "FAQ"] },
              { title: "Contact", links: ["contact@hoaly.paris", "01 53 79 25 44"] },
            ].map((col) => (
              <div key={col.title}>
                <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: "16px" }}>{col.title}</p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                  {col.links.map((l) => <li key={l} style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)" }}>{l}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ paddingTop: "24px", overflow: "hidden" }}>
            <p style={{ fontSize: "clamp(4rem, 15vw, 12rem)", fontWeight: 900, color: "rgba(255,255,255,0.04)", lineHeight: 1, letterSpacing: "-0.02em", textAlign: "right" }}>HOA LY</p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "8px" }}>
            <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.2)" }}>© 2025 Hoa Ly SARL</p>
            <a href="/mentions-legales" style={{ fontSize: "10px", color: "rgba(255,255,255,0.2)", textDecoration: "none" }}>Mentions légales</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
