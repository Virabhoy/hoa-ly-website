"use client";

import { useEffect, useRef } from "react";

interface OpenStreetMapProps {
  lat: number;
  lng: number;
  zoom?: number;
  label?: string;
}

export default function OpenStreetMap({ lat, lng, zoom = 16, label = "Hoa Ly" }: OpenStreetMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current || !mapRef.current) return;
    initialized.current = true;

    // Leaflet est importé dynamiquement côté client uniquement
    import("leaflet").then((L) => {
      // Supprime l'icône par défaut cassée dans Next.js
      // @ts-expect-error - Leaflet private property
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const map = L.map(mapRef.current!, {
        center: [lat, lng],
        zoom,
        zoomControl: true,
        attributionControl: true,
        scrollWheelZoom: false,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      L.marker([lat, lng])
        .addTo(map)
        .bindPopup(
          `<div style="font-family:sans-serif;padding:4px 2px"><strong>${label}</strong><br/>50 Avenue de Choisy, 75013 Paris</div>`
        )
        .openPopup();
    });

    return () => {
      // Cleanup handled by component unmount
    };
  }, [lat, lng, zoom, label]);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        crossOrigin=""
      />
      <div
        ref={mapRef}
        className="w-full h-full min-h-72"
        style={{ zIndex: 0 }}
      />
    </>
  );
}
