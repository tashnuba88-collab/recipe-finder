// TheMealDB: free, no auth. "1" is the public test key.
const BASE = "https://www.themealdb.com/api/json/v1/1";

async function get(path, signal) {
  const res = await fetch(`${BASE}/${path}`, { signal });
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  const data = await res.json();
  // The API returns { meals: null } when nothing matches.
  return data.meals ?? [];
}

export const searchMeals = (query, signal) =>
  get(`search.php?s=${encodeURIComponent(query)}`, signal);

export const mealsByCategory = (category, signal) =>
  get(`filter.php?c=${encodeURIComponent(category)}`, signal);

export const mealsByLetter = (letter, signal) =>
  get(`search.php?f=${encodeURIComponent(letter)}`, signal);

export async function getMeal(id, signal) {
  const meals = await get(`lookup.php?i=${encodeURIComponent(id)}`, signal);
  return meals[0] ?? null;
}

export async function getCategories(signal) {
  const rows = await get("list.php?c=list", signal);
  return rows.map((row) => row.strCategory);
}

// The API stores ingredients as strIngredient1..20 and strMeasure1..20.
export function getIngredients(meal) {
  const items = [];
  for (let i = 1; i <= 20; i++) {
    const name = meal[`strIngredient${i}`]?.trim();
    const measure = meal[`strMeasure${i}`]?.trim();
    if (name) items.push({ name, measure: measure || "" });
  }
  return items;
}

export const mealsByArea = (area, signal) =>
  get(`filter.php?a=${encodeURIComponent(area)}`, signal);

export async function getAreas(signal) {
  const rows = await get("list.php?a=list", signal);
  // The API repeats some names, so remove duplicates and sort.
  const areas = rows.map((row) => row.strArea).filter((area) => area !== "Unknown");
  return [...new Set(areas)].sort();
}
