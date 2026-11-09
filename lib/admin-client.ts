// Appels aux routes /api/admin depuis les pages de l'admin (côté navigateur).

export async function api<T = unknown>(url: string, method = "GET", body?: unknown): Promise<T> {
  const res = await fetch(url, {
    method,
    headers: body === undefined ? undefined : { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (res.status === 401) {
    window.location.href = "/admin/login";
  }
  if (!res.ok) throw new Error(data.error ?? "Une erreur est survenue.");
  return data as T;
}

export async function uploadImage(file: File): Promise<string> {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
  const data = await res.json().catch(() => ({}));
  if (res.status === 401) window.location.href = "/admin/login";
  if (!res.ok) throw new Error(data.error ?? "Envoi de la photo impossible.");
  return data.url as string;
}

export function errorMessage(e: unknown): string {
  return e instanceof Error ? e.message : "Une erreur est survenue.";
}
