import { Link } from "react-router-dom";

export default function RecipeCard({ meal }) {
  return (
    <li>
      <Link to={`/recipe/${meal.idMeal}`}>
        <img src={`${meal.strMealThumb}/preview`} alt="" width="120" />
        <h3>{meal.strMeal}</h3>
      </Link>
    </li>
  );
}
