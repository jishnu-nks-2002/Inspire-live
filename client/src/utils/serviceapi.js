const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function getAllServices() {
  const res = await fetch(`${API_BASE}/services`, { next: { revalidate: 60 } });
  if (!res.ok) return [];
  const data = await res.json();
  return data.data || [];
}

export async function getServiceBySlug(slug) {
  const res = await fetch(`${API_BASE}/services/slug/${slug}`, { next: { revalidate: 60 } });
  if (!res.ok) return null;
  const data = await res.json();
  return data.data || null;
}