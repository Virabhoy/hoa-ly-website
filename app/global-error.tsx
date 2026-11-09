"use client";

// Dernier filet de sécurité : remplace toute la page si la mise en page racine elle-même échoue.
export default function GlobalError({ retry }: { error: unknown; retry: () => void }) {
  return (
    <html lang="fr">
      <body style={{ fontFamily: "sans-serif", display: "grid", placeItems: "center", minHeight: "100vh", margin: 0 }}>
        <main style={{ textAlign: "center", padding: 24 }}>
          <h1 style={{ fontWeight: 300 }}>Un problème est survenu</h1>
          <p style={{ color: "#4A4A4A" }}>Le site est momentanément indisponible.</p>
          <button
            type="button"
            onClick={() => retry()}
            style={{ marginTop: 16, padding: "12px 28px", background: "#C30202", color: "#fff", border: 0, cursor: "pointer" }}
          >
            Réessayer
          </button>
        </main>
      </body>
    </html>
  );
}
