"use client";
import { useState } from "react";
import Image from "next/image";

const SIDEBAR_BG = "#111827";
const SIDEBAR_BORDER = "rgba(255,255,255,0.06)";
const MAIN_BG = "#F9FAFB";
const ACCENT = "#6366F1";
const TEXT_DARK = "#111827";
const TEXT_MED = "#6B7280";

const NAV = [
  { icon: "⊞", label: "Tableau de bord", active: true },
  { icon: "◈", label: "Produits", active: false },
  { icon: "◎", label: "Commandes", active: false },
  { icon: "◉", label: "Clientes", active: false },
  { icon: "◈", label: "Catégories", active: false },
  { icon: "⚙", label: "Paramètres", active: false },
];

const PRODUCTS_TABLE = [
  { img: "/images/D04B9161.jpg", name: "Robe Qipao Rouge", cat: "Robes", price: "89,90 €", stock: 12, status: "En ligne" },
  { img: "/images/D04B9067.jpg", name: "Áo Dài Rouge Brodée", cat: "Robes", price: "125,00 €", stock: 8, status: "En ligne" },
  { img: "/images/D04B8902.jpg", name: "Veste Tang Grise", cat: "Vestes", price: "145,00 €", stock: 5, status: "En ligne" },
  { img: "/images/D04B9128.jpg", name: "Kimono Satin Noir", cat: "Robes", price: "149,90 €", stock: 3, status: "Faible stock" },
  { img: "/images/D04B9146.jpg", name: "Veste Tang Fuchsia", cat: "Vestes", price: "175,00 €", stock: 0, status: "Épuisé" },
  { img: "/images/D04B9112.jpg", name: "Áo Dài Bleu Fleuri", cat: "Robes", price: "115,00 €", stock: 14, status: "En ligne" },
];

const STATS = [
  { label: "Produits en ligne", value: "24", sub: "+3 ce mois", color: ACCENT, icon: "◈" },
  { label: "Catégories", value: "6", sub: "Actives", color: "#10B981", icon: "⊞" },
  { label: "Visites ce mois", value: "1 247", sub: "+18% vs mois dernier", color: "#F59E0B", icon: "◉" },
  { label: "Avis Google", value: "4.8★", sub: "147 avis vérifiés", color: "#EF4444", icon: "★" },
];

type Tab = "produits" | "categories" | "avis";

export default function AdminShowcasePage() {
  const [activeTab, setActiveTab] = useState<Tab>("produits");
  const [activeSideNav, setActiveSideNav] = useState("Tableau de bord");

  return (
    <div style={{ display: "flex", minHeight: "calc(100vh - 44px)", backgroundColor: MAIN_BG, fontFamily: "var(--font-inter, sans-serif)" }}>

      {/* Sidebar */}
      <aside style={{ width: "240px", backgroundColor: SIDEBAR_BG, color: "#FFF", display: "flex", flexDirection: "column", position: "sticky", top: "44px", height: "calc(100vh - 44px)", flexShrink: 0, zIndex: 40 }}>
        {/* Logo */}
        <div style={{ padding: "20px 20px 16px", borderBottom: `1px solid ${SIDEBAR_BORDER}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}>
              <Image src="/images/Logo Hoaly.png" alt="Hoa Ly" width={32} height={32} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div>
              <p style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.05em" }}>HOA LY</p>
              <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.35)", marginTop: "1px" }}>Administration</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "12px 8px" }}>
          {NAV.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveSideNav(item.label)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 12px",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
                marginBottom: "2px",
                transition: "all 0.15s",
                backgroundColor: activeSideNav === item.label ? "rgba(99,102,241,0.15)" : "transparent",
                color: activeSideNav === item.label ? ACCENT : "rgba(255,255,255,0.5)",
              }}
            >
              <span style={{ fontSize: "14px", lineHeight: 1 }}>{item.icon}</span>
              <span style={{ fontSize: "13px", fontWeight: activeSideNav === item.label ? 600 : 400 }}>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <div style={{ padding: "12px 8px", borderTop: `1px solid ${SIDEBAR_BORDER}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px" }}>
            <div style={{ width: "28px", height: "28px", borderRadius: "50%", backgroundColor: ACCENT, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700, color: "#FFF", flexShrink: 0 }}>A</div>
            <div>
              <p style={{ fontSize: "12px", fontWeight: 600, color: "#FFF" }}>Admin</p>
              <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.35)" }}>admin@hoaly.paris</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, overflowY: "auto" }}>

        {/* Top bar */}
        <div style={{ backgroundColor: "#FFF", borderBottom: "1px solid #E5E7EB", padding: "0 28px", height: "56px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 30 }}>
          <div>
            <p style={{ fontSize: "16px", fontWeight: 700, color: TEXT_DARK }}>Tableau de bord</p>
            <p style={{ fontSize: "11px", color: TEXT_MED, marginTop: "1px" }}>Hoa Ly — Vue d&apos;ensemble</p>
          </div>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <a href="/" target="_blank" style={{ fontSize: "12px", padding: "8px 16px", border: "1px solid #E5E7EB", borderRadius: "6px", color: TEXT_MED, textDecoration: "none", fontWeight: 600 }}>
              Voir le site →
            </a>
            <button style={{ fontSize: "12px", padding: "8px 16px", backgroundColor: ACCENT, color: "#FFF", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: 600 }}>
              + Ajouter produit
            </button>
          </div>
        </div>

        <div style={{ padding: "28px" }}>

          {/* Stats cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "28px" }}>
            {STATS.map((s) => (
              <div key={s.label} style={{ backgroundColor: "#FFF", borderRadius: "8px", padding: "20px", border: "1px solid #E5E7EB" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                  <p style={{ fontSize: "12px", color: TEXT_MED, fontWeight: 500 }}>{s.label}</p>
                  <span style={{ fontSize: "16px", color: s.color }}>{s.icon}</span>
                </div>
                <p style={{ fontSize: "28px", fontWeight: 800, color: TEXT_DARK, lineHeight: 1 }}>{s.value}</p>
                <p style={{ fontSize: "11px", color: TEXT_MED, marginTop: "6px" }}>{s.sub}</p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div style={{ backgroundColor: "#FFF", borderRadius: "8px", border: "1px solid #E5E7EB", overflow: "hidden" }}>
            <div style={{ borderBottom: "1px solid #E5E7EB", display: "flex", padding: "0 20px" }}>
              {(["produits", "categories", "avis"] as Tab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: "14px 20px",
                    fontSize: "13px",
                    fontWeight: activeTab === tab ? 700 : 500,
                    color: activeTab === tab ? ACCENT : TEXT_MED,
                    background: "none",
                    border: "none",
                    borderBottom: activeTab === tab ? `2px solid ${ACCENT}` : "2px solid transparent",
                    cursor: "pointer",
                    textTransform: "capitalize",
                    letterSpacing: "0.03em",
                    transition: "all 0.15s",
                    marginBottom: "-1px",
                  }}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Produits tab */}
            {activeTab === "produits" && (
              <div>
                <div style={{ padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #F9FAFB" }}>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: TEXT_DARK }}>24 produits au total</p>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <input placeholder="Rechercher..." style={{ fontSize: "12px", padding: "7px 12px", border: "1px solid #E5E7EB", borderRadius: "6px", outline: "none", color: TEXT_DARK, backgroundColor: "#FFF" }} />
                    <select style={{ fontSize: "12px", padding: "7px 12px", border: "1px solid #E5E7EB", borderRadius: "6px", outline: "none", color: TEXT_MED, backgroundColor: "#FFF" }}>
                      <option>Toutes catégories</option>
                      <option>Robes</option>
                      <option>Hauts</option>
                      <option>Vestes</option>
                    </select>
                  </div>
                </div>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ backgroundColor: "#F9FAFB" }}>
                      {["Produit", "Catégorie", "Prix", "Stock", "Statut", "Actions"].map((h) => (
                        <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: "11px", fontWeight: 700, color: TEXT_MED, letterSpacing: "0.08em", textTransform: "uppercase" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {PRODUCTS_TABLE.map((p, i) => (
                      <tr key={i} style={{ borderTop: "1px solid #F3F4F6" }}>
                        <td style={{ padding: "12px 16px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            <div style={{ width: "40px", height: "52px", overflow: "hidden", borderRadius: "4px", flexShrink: 0, position: "relative" }}>
                              <Image src={p.img} alt={p.name} fill style={{ objectFit: "cover", objectPosition: "top" }} sizes="40px" />
                            </div>
                            <p style={{ fontSize: "13px", fontWeight: 600, color: TEXT_DARK }}>{p.name}</p>
                          </div>
                        </td>
                        <td style={{ padding: "12px 16px" }}>
                          <span style={{ fontSize: "11px", padding: "3px 10px", backgroundColor: "#F3F4F6", borderRadius: "999px", color: TEXT_MED, fontWeight: 600 }}>{p.cat}</span>
                        </td>
                        <td style={{ padding: "12px 16px", fontSize: "13px", fontWeight: 700, color: TEXT_DARK }}>{p.price}</td>
                        <td style={{ padding: "12px 16px", fontSize: "13px", color: p.stock === 0 ? "#EF4444" : p.stock <= 3 ? "#F59E0B" : TEXT_DARK, fontWeight: 600 }}>{p.stock}</td>
                        <td style={{ padding: "12px 16px" }}>
                          <span style={{
                            fontSize: "11px",
                            padding: "3px 10px",
                            borderRadius: "999px",
                            fontWeight: 700,
                            backgroundColor: p.status === "En ligne" ? "#DCFCE7" : p.status === "Faible stock" ? "#FEF3C7" : "#FEE2E2",
                            color: p.status === "En ligne" ? "#16A34A" : p.status === "Faible stock" ? "#D97706" : "#DC2626",
                          }}>
                            {p.status}
                          </span>
                        </td>
                        <td style={{ padding: "12px 16px" }}>
                          <div style={{ display: "flex", gap: "8px" }}>
                            <button style={{ fontSize: "11px", padding: "5px 10px", border: "1px solid #E5E7EB", borderRadius: "4px", background: "none", cursor: "pointer", color: TEXT_MED, fontWeight: 600 }}>Modifier</button>
                            <button style={{ fontSize: "11px", padding: "5px 10px", border: "1px solid #FEE2E2", borderRadius: "4px", background: "none", cursor: "pointer", color: "#EF4444", fontWeight: 600 }}>Suppr.</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div style={{ padding: "14px 20px", borderTop: "1px solid #F3F4F6", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <p style={{ fontSize: "12px", color: TEXT_MED }}>Affichage 6 / 24 produits</p>
                  <div style={{ display: "flex", gap: "4px" }}>
                    {[1, 2, 3, 4].map((n) => (
                      <button key={n} style={{ width: "32px", height: "32px", borderRadius: "4px", border: "1px solid", fontSize: "12px", cursor: "pointer", backgroundColor: n === 1 ? ACCENT : "#FFF", color: n === 1 ? "#FFF" : TEXT_MED, borderColor: n === 1 ? ACCENT : "#E5E7EB", fontWeight: n === 1 ? 700 : 400 }}>{n}</button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Catégories tab */}
            {activeTab === "categories" && (
              <div style={{ padding: "20px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
                  {[
                    { name: "Nouveautés", count: 8, img: "/images/D04B8981.jpg", color: "#6366F1" },
                    { name: "Robes", count: 7, img: "/images/D04B9067.jpg", color: "#EC4899" },
                    { name: "Hauts & Tops", count: 4, img: "/images/D04B9137.jpg", color: "#F59E0B" },
                    { name: "Pantalons", count: 3, img: "/images/D04B9089.jpg", color: "#10B981" },
                    { name: "Vestes & Manteaux", count: 5, img: "/images/D04B8902.jpg", color: "#8B5CF6" },
                    { name: "Accessoires", count: 2, img: "/images/D04B9182.jpg", color: "#EF4444" },
                  ].map((cat) => (
                    <div key={cat.name} style={{ border: "1px solid #E5E7EB", borderRadius: "8px", overflow: "hidden", cursor: "pointer" }}>
                      <div style={{ position: "relative", height: "120px" }}>
                        <Image src={cat.img} alt={cat.name} fill style={{ objectFit: "cover", objectPosition: "top" }} sizes="400px" />
                        <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.35)" }} />
                        <div style={{ position: "absolute", bottom: "12px", left: "12px" }}>
                          <p style={{ color: "#FFF", fontWeight: 700, fontSize: "14px" }}>{cat.name}</p>
                          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "11px", marginTop: "2px" }}>{cat.count} produits</p>
                        </div>
                      </div>
                      <div style={{ padding: "12px", display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                        <button style={{ fontSize: "11px", padding: "5px 10px", border: "1px solid #E5E7EB", borderRadius: "4px", background: "none", cursor: "pointer", color: TEXT_MED, fontWeight: 600 }}>Modifier</button>
                        <button style={{ fontSize: "11px", padding: "5px 10px", border: "none", borderRadius: "4px", cursor: "pointer", backgroundColor: ACCENT, color: "#FFF", fontWeight: 700 }}>Voir →</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Avis tab */}
            {activeTab === "avis" && (
              <div style={{ padding: "20px" }}>
                <div style={{ display: "flex", gap: "24px", alignItems: "center", padding: "20px", backgroundColor: "#F9FAFB", borderRadius: "8px", marginBottom: "20px" }}>
                  <div style={{ textAlign: "center", padding: "0 24px", borderRight: "1px solid #E5E7EB" }}>
                    <p style={{ fontSize: "48px", fontWeight: 900, color: TEXT_DARK, lineHeight: 1 }}>4.8</p>
                    <div style={{ display: "flex", gap: "3px", justifyContent: "center", marginTop: "8px" }}>
                      {[1,2,3,4,5].map((s) => <span key={s} style={{ color: "#F59E0B", fontSize: "16px" }}>★</span>)}
                    </div>
                    <p style={{ fontSize: "11px", color: TEXT_MED, marginTop: "6px" }}>147 avis Google</p>
                  </div>
                  <div style={{ flex: 1 }}>
                    {[{ stars: 5, pct: 82 }, { stars: 4, pct: 12 }, { stars: 3, pct: 4 }, { stars: 2, pct: 1 }, { stars: 1, pct: 1 }].map((r) => (
                      <div key={r.stars} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                        <span style={{ fontSize: "11px", color: TEXT_MED, width: "20px", textAlign: "right" }}>{r.stars}★</span>
                        <div style={{ flex: 1, height: "8px", backgroundColor: "#E5E7EB", borderRadius: "4px", overflow: "hidden" }}>
                          <div style={{ width: `${r.pct}%`, height: "100%", backgroundColor: "#F59E0B", borderRadius: "4px" }} />
                        </div>
                        <span style={{ fontSize: "11px", color: TEXT_MED, width: "28px" }}>{r.pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {[
                    { author: "Sophie M.", time: "il y a 2 semaines", rating: 5, text: "Boutique magnifique ! La sélection est très bien faite. Je reviendrai sans hésiter." },
                    { author: "Camille D.", time: "il y a 1 mois", rating: 5, text: "Un vrai coup de cœur ! L'ambiance est chaleureuse, le service impeccable." },
                    { author: "Marie L.", time: "il y a 3 semaines", rating: 5, text: "J'adore cette boutique. La gérante a un œil parfait pour choisir ses pièces uniques." },
                    { author: "Nguyen T.", time: "il y a 2 mois", rating: 4, text: "Très belle boutique avec une sélection originale. Personnel attentionné et de bons conseils." },
                  ].map((r, i) => (
                    <div key={i} style={{ padding: "16px", border: "1px solid #E5E7EB", borderRadius: "8px", display: "flex", gap: "14px", alignItems: "flex-start" }}>
                      <div style={{ width: "36px", height: "36px", borderRadius: "50%", backgroundColor: ACCENT, color: "#FFF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 700, flexShrink: 0 }}>
                        {r.author[0]}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
                          <div>
                            <span style={{ fontSize: "13px", fontWeight: 700, color: TEXT_DARK, marginRight: "10px" }}>{r.author}</span>
                            <span style={{ fontSize: "11px", color: TEXT_MED }}>{r.time}</span>
                          </div>
                          <div style={{ display: "flex", gap: "2px" }}>
                            {[1,2,3,4,5].map((s) => <span key={s} style={{ color: s <= r.rating ? "#F59E0B" : "#E5E7EB", fontSize: "11px" }}>★</span>)}
                          </div>
                        </div>
                        <p style={{ fontSize: "13px", color: "#374151", lineHeight: 1.6 }}>{r.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick actions */}
          <div style={{ marginTop: "20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div style={{ backgroundColor: "#FFF", borderRadius: "8px", border: "1px solid #E5E7EB", padding: "20px" }}>
              <p style={{ fontSize: "13px", fontWeight: 700, color: TEXT_DARK, marginBottom: "16px" }}>Activité récente</p>
              {[
                { action: "Produit ajouté", detail: "Robe Qipao Rouge", time: "Il y a 2h", color: "#DCFCE7", dot: "#16A34A" },
                { action: "Stock mis à jour", detail: "Kimono Satin Noir → 3 unités", time: "Il y a 5h", color: "#FEF3C7", dot: "#D97706" },
                { action: "Produit modifié", detail: "Veste Tang Fuchsia — prix", time: "Hier", color: "#DBEAFE", dot: "#2563EB" },
                { action: "Produit épuisé", detail: "Veste Tang Fuchsia", time: "Il y a 2j", color: "#FEE2E2", dot: "#DC2626" },
              ].map((a, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: a.dot, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: "12px", fontWeight: 600, color: TEXT_DARK }}>{a.action}</p>
                    <p style={{ fontSize: "11px", color: TEXT_MED, marginTop: "1px" }}>{a.detail}</p>
                  </div>
                  <span style={{ fontSize: "10px", color: TEXT_MED, flexShrink: 0 }}>{a.time}</span>
                </div>
              ))}
            </div>
            <div style={{ backgroundColor: "#FFF", borderRadius: "8px", border: "1px solid #E5E7EB", padding: "20px" }}>
              <p style={{ fontSize: "13px", fontWeight: 700, color: TEXT_DARK, marginBottom: "16px" }}>Actions rapides</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {[
                  { label: "Ajouter un nouveau produit", icon: "+", color: ACCENT },
                  { label: "Créer une nouvelle catégorie", icon: "⊞", color: "#10B981" },
                  { label: "Voir le site vitrine", icon: "→", color: "#6B7280" },
                  { label: "Exporter le catalogue CSV", icon: "↓", color: "#F59E0B" },
                ].map((a) => (
                  <button key={a.label} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 14px", border: "1px solid #E5E7EB", borderRadius: "6px", background: "none", cursor: "pointer", textAlign: "left" }}>
                    <span style={{ width: "24px", height: "24px", borderRadius: "4px", backgroundColor: `${a.color}15`, color: a.color, fontSize: "14px", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{a.icon}</span>
                    <span style={{ fontSize: "12px", fontWeight: 600, color: TEXT_DARK }}>{a.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
