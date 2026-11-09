import { Link, useParams } from "react-router-dom";
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
      <section>
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
    <article>
      <Link to="/">← Back to search</Link>
      <h1>{meal.strMeal}</h1>
      <p>
        {meal.strCategory}, {meal.strArea}
      </p>
      <img src={meal.strMealThumb} alt={meal.strMeal} width="300" />
      {meal.strYoutube && (
        <p>
          <a href={meal.strYoutube} target="_blank" rel="noreferrer">
            Watch on YouTube
          </a>
        </p>
      )}

      <h2>Ingredients</h2>
      <ul>
        {getIngredients(meal).map(({ name, measure }) => (
          <li key={name}>
            {measure} {name}
          </li>
        ))}
      </ul>

      <h2>Method</h2>
      {steps.map((step, i) => (
        <p key={i}>{step}</p>
      ))}
    </article>
  );
}
