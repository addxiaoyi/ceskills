export const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
export async function api(path: string, init?: RequestInit){
  const r = await fetch(`${API_BASE}${path}`, init);
  if(!r.ok) throw new Error(`${r.status} ${await r.text()}`);
  return r.json();
}
