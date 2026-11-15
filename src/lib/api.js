
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getUpcomingEvents() {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured.");
  }

  const response = await fetch(`${API_URL}/events`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch upcoming events.");
  }

  const events = await response.json();

  return Array.isArray(events) ? events : [];
}
