import { useSearchParams } from "react-router-dom";
import SearchBar from "../components/SearchBar.jsx";
import RecipeGrid from "../components/RecipeGrid.jsx";
import { Loading, ErrorMessage, Empty } from "../components/Status.jsx";
import { useAsync } from "../hooks/useAsync.js";
import { searchMeals, mealsByCategory, mealsByLetter, getCategories } from "../api/mealdb.js";

export default function Home() {
  // Search state lives in the URL so the back button restores the last search.
  const [params, setParams] = useSearchParams();
  const query = params.get("q") ?? "";
  const category = params.get("category") ?? "";

  const categories = useAsync((signal) => getCategories(signal), []);

  const results = useAsync(
    async (signal) => {
      if (query) {
        const meals = await searchMeals(query, signal);
        return category ? meals.filter((m) => m.strCategory === category) : meals;
      }
      if (category) return mealsByCategory(category, signal);
      return mealsByLetter("c", signal);
    },
    [query, category]
  );

  const handleSearch = ({ query, category }) => {
    const next = {};
    if (query) next.q = query;
    if (category) next.category = category;
    setParams(next);
  };

  return (
    <section>
      <h1>What are you cooking?</h1>
      <SearchBar
        key={`${query}|${category}`}
        initialQuery={query}
        initialCategory={category}
        categories={categories.data ?? []}
        onSearch={handleSearch}
      />

      <h2>{query || category ? "Results" : "Recipes to start with"}</h2>
      {results.status === "loading" && <Loading label="Finding recipes" />}
      {results.status === "error" && <ErrorMessage error={results.error} />}
      {results.status === "success" &&
        (results.data.length ? (
          <RecipeGrid meals={results.data} />
        ) : (
          <Empty>No recipes match that search. Try a shorter name or a different category.</Empty>
        ))}
    </section>
  );
}
