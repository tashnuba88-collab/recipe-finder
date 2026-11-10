import { Link, useParams } from "react-router-dom";
import CuisineCard from "../components/CuisineCard.jsx";
import FavoriteButton from "../components/FavoriteButton.jsx";
import { Loading, ErrorMessage, Empty } from "../components/Status.jsx";
import { useAsync } from "../hooks/useAsync.js";
import { getMeal, getIngredients } from "../api/mealdb.js";

export default function Recipe() {
  const { id } = useParams();
  const { status, data: meal, error } = useAsync((signal) => getMeal(id, signal), [id]);

  if (status === "loading") return <Loading label="Loading recipe" />;
  if (status === "error") return <ErrorMessage error={error} />;
  if (!meal) {
    return (
      <section className="page">
        <Empty>That recipe doesn’t exist.</Empty>
        <Link to="/">Back to search</Link>
      </section>
    );
  }

  const steps = meal.strInstructions
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <article className="page recipe">
      <Link to="/" className="back">
        ← Back to search
      </Link>
      <div className="recipe-top">
        <img src={meal.strMealThumb} alt={meal.strMeal} />
        <div>
          <h1>{meal.strMeal}</h1>
          <p className="meta">
            {meal.strCategory},{" "}
            {meal.strArea === "Unknown" ? (
              "cuisine unknown"
            ) : (
              <Link to={`/cuisine/${meal.strArea}`}>{meal.strArea} cuisine</Link>
            )}
          </p>
          <FavoriteButton meal={meal} />
          {meal.strYoutube && (
            <p>
              <a href={meal.strYoutube} target="_blank" rel="noreferrer">
                Watch on YouTube
              </a>
            </p>
          )}
        </div>
      </div>

      <CuisineCard area={meal.strArea} />

      <div className="recipe-body">
        <section>
          <h2>Ingredients</h2>
          <ul className="ingredients">
            {getIngredients(meal).map(({ name, measure }) => (
              <li key={name}>
                <span>{measure}</span> {name}
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2>Method</h2>
          {steps.map((step, i) => (
            <p key={i}>{step}</p>
          ))}
        </section>
      </div>
    </article>
  );
}
