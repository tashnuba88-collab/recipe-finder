import { useFavorites } from "../context/FavoritesContext.jsx";

export default function FavoriteButton({ meal, className = "" }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const saved = isFavorite(meal.idMeal);

  return (
    <button
      type="button"
      className={`fav-btn ${saved ? "is-saved" : ""} ${className}`}
      aria-pressed={saved}
      onClick={() => toggleFavorite(meal)}
    >
      {saved ? "Saved" : "Save"}
    </button>
  );
}
