const BASE_URL = "https://auction-backend-1awd.onrender.com";


export async function fetchItems() {
  const res = await fetch(`${BASE_URL}/items`);
  if (!res.ok) {
    throw new Error("Failed to fetch items");
  }
  return res.json();
}
