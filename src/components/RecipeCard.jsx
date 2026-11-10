import { Link } from "react-router-dom";
import FavoriteButton from "./FavoriteButton.jsx";

export default function RecipeCard({ meal }) {
  return (
    <li className="card">
      <Link to={`/recipe/${meal.idMeal}`} className="card-link">
        <img src={`${meal.strMealThumb}/preview`} alt="" loading="lazy" />
        <h3>{meal.strMeal}</h3>
      </Link>
      <FavoriteButton meal={meal} className="card-fav" />
    </li>
  );
}
