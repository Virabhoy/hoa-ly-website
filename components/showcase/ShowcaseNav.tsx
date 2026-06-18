"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const VERSIONS = [
  { label: "Sobre", href: "/showcase/sobre", dot: "#C8A882" },
  { label: "Éditorial", href: "/showcase/editorial", dot: "#FFFFFF" },
  { label: "Rouge", href: "/showcase/rouge", dot: "#DC2626" },
  { label: "Élégant", href: "/showcase/elegant", dot: "#B85C3C" },
  { label: "Admin", href: "/showcase/admin", dot: "#6366F1" },
];

export default function ShowcaseNav() {
  const pathname = usePathname();

  return (
    <div className="fixed top-0 left-0 right-0 z-[200]" style={{ backgroundColor: "#0A0A0A", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "44px" }}>
        <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 500 }}>
          Hoa Ly — Design Variants
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          {VERSIONS.map((v) => {
            const active = pathname.startsWith(v.href);
            return (
              <Link
                key={v.href}
                href={v.href}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "4px 12px",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  borderRadius: "2px",
                  transition: "all 0.15s",
                  backgroundColor: active ? "rgba(255,255,255,0.1)" : "transparent",
                  color: active ? "#FFFFFF" : "rgba(255,255,255,0.4)",
                  textDecoration: "none",
                }}
              >
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: active ? v.dot : "rgba(255,255,255,0.2)", flexShrink: 0, transition: "background-color 0.15s" }} />
                {v.label}
              </Link>
            );
          })}
        </div>
        <Link
          href="/"
          style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", textDecoration: "none" }}
        >
          ← Site principal
        </Link>
      </div>
    </div>
  );
}
