const BASE_URL = "http://localhost:4000";

export async function fetchItems() {
  const res = await fetch(`${BASE_URL}/items`);
  if (!res.ok) {
    throw new Error("Failed to fetch items");
  }
  return res.json();
}
