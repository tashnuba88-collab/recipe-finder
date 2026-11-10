import { Link, useParams } from "react-router-dom";
import CuisineCard from "../components/CuisineCard.jsx";
import RecipeGrid from "../components/RecipeGrid.jsx";
import { Loading, ErrorMessage, Empty } from "../components/Status.jsx";
import { useAsync } from "../hooks/useAsync.js";
import { mealsByArea } from "../api/mealdb.js";

export default function Cuisine() {
  const { area } = useParams();
  const { status, data: meals, error } = useAsync((signal) => mealsByArea(area, signal), [area]);

  return (
    <section className="page">
      <Link to="/" className="back">
        ← Back to search
      </Link>
      <h1>{area} recipes</h1>
      <CuisineCard area={area} />

      {status === "loading" && <Loading label="Finding recipes" />}
      {status === "error" && <ErrorMessage error={error} />}
      {status === "success" &&
        (meals.length ? <RecipeGrid meals={meals} /> : <Empty>No recipes found for this cuisine.</Empty>)}
    </section>
  );
}
