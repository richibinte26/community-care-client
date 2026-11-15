import { authClient } from "@/lib/auth-client";

const API = process.env.NEXT_PUBLIC_API_URL;

export async function authFetch(path, options = {}) {
  const { data } = await authClient.token();
  if (!data?.token) throw new Error("Please log in again.");

  const res = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${data.token}`,
      ...options.headers,
    },
  });

  const body = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, data: body };
}