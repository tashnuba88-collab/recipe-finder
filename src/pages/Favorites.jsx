import { Link } from "react-router-dom";
import RecipeGrid from "../components/RecipeGrid.jsx";
import { Empty } from "../components/Status.jsx";
import { useFavorites } from "../context/FavoritesContext.jsx";

export default function Favorites() {
  const { favorites } = useFavorites();

  return (
    <section className="page">
      <h1>Saved recipes</h1>
      {favorites.length ? (
        <RecipeGrid meals={favorites} />
      ) : (
        <>
          <Empty>You haven’t saved anything yet. Tap Save on any recipe to keep it here.</Empty>
          <Link to="/">Find a recipe</Link>
        </>
      )}
    </section>
  );
}
