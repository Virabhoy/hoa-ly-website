"use client";

import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";
import { STORE_HOURS } from "@/lib/constants";

type Hours = Record<string, string>;

export default function AdminParametresPage() {
  const [hours, setHours] = useState<Hours>({ ...STORE_HOURS });
  const [announcement, setAnnouncement] = useState("");
  const [announcementEnabled, setAnnouncementEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function fetchSettings() {
      const res = await fetch("/api/admin/settings");
      if (res.ok) {
        const data: Array<{ key: string; value: unknown }> = await res.json();
        for (const s of data) {
          if (s.key === "store_hours") setHours(s.value as Hours);
          if (s.key === "announcement") {
            const v = s.value as { enabled: boolean; text: string };
            setAnnouncement(v.text ?? "");
            setAnnouncementEnabled(v.enabled ?? false);
          }
        }
      }
      setLoading(false);
    }
    fetchSettings();
  }, []);

  async function saveSetting(key: string, value: unknown) {
    return fetch("/api/admin/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, value }),
    });
  }

  async function handleSave() {
    setSaving(true);
    await Promise.all([
      saveSetting("store_hours", hours),
      saveSetting("announcement", { enabled: announcementEnabled, text: announcement }),
    ]);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  if (loading) return <div className="flex justify-center py-24"><Spinner className="w-6 h-6" /></div>;

  return (
    <div className="p-8 max-w-2xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-medium">Paramètres</h1>
          <p className="text-sm text-[#6B6B6B] mt-1">Configuration générale de la boutique.</p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          {saving && <Spinner className="w-3 h-3 mr-2 border-white/20 border-t-white" />}
          {saved ? "✓ Enregistré" : "Enregistrer"}
        </Button>
      </div>

      {/* Horaires */}
      <div className="bg-white border border-[#E5E5E5] p-6 mb-6">
        <h2 className="text-xs tracking-widest uppercase font-medium text-[#6B6B6B] mb-5">
          Horaires d&apos;ouverture
        </h2>
        <div className="space-y-3">
          {Object.entries(hours).map(([day, time]) => (
            <div key={day} className="flex items-center gap-4">
              <label className="w-24 text-sm font-medium flex-shrink-0">{day}</label>
              <input
                value={time}
                onChange={(e) => setHours((prev) => ({ ...prev, [day]: e.target.value }))}
                className="flex-1 border border-[#E5E5E5] px-3 py-2 text-sm focus:outline-none focus:border-[#0A0A0A]"
                placeholder="ex: 10h00 – 20h00"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Annonce */}
      <div className="bg-white border border-[#E5E5E5] p-6">
        <h2 className="text-xs tracking-widest uppercase font-medium text-[#6B6B6B] mb-5">
          Bandeau d&apos;annonce
        </h2>
        <label className="flex items-center gap-3 mb-4 cursor-pointer">
          <input
            type="checkbox"
            checked={announcementEnabled}
            onChange={(e) => setAnnouncementEnabled(e.target.checked)}
            className="w-4 h-4"
          />
          <span className="text-sm">Activer le bandeau d&apos;annonce</span>
        </label>
        <textarea
          value={announcement}
          onChange={(e) => setAnnouncement(e.target.value)}
          rows={2}
          placeholder="Ex: Soldes d'été — jusqu'à -50% sur une sélection d'articles"
          disabled={!announcementEnabled}
          className="w-full border border-[#E5E5E5] px-4 py-3 text-sm focus:outline-none focus:border-[#0A0A0A] resize-none disabled:opacity-50"
        />
      </div>
    </div>
  );
}
