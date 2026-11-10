import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "pantry-search:favorites";
const FavoritesContext = createContext(null);

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
  } catch {
    return [];
  }
}

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(load);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // Storage can be blocked or full. The app still works for this session.
    }
  }, [favorites]);

  const isFavorite = (id) => favorites.some((meal) => meal.idMeal === id);

  const toggleFavorite = (meal) => {
    const { idMeal, strMeal, strMealThumb } = meal;
    setFavorites((current) =>
      current.some((m) => m.idMeal === idMeal)
        ? current.filter((m) => m.idMeal !== idMeal)
        : [...current, { idMeal, strMeal, strMealThumb }]
    );
  };

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used inside FavoritesProvider");
  return ctx;
}
