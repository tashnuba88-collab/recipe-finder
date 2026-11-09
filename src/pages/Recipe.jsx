import { Link, useParams } from "react-router-dom";
import { Loading, ErrorMessage, Empty } from "../components/Status.jsx";
import { useAsync } from "../hooks/useAsync.js";
import { getMeal } from "../api/mealdb.js";

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

  return (
    <article>
      <Link to="/">← Back to search</Link>
      <h1>{meal.strMeal}</h1>
      <p>
        {meal.strCategory}, {meal.strArea}
      </p>
      <img src={meal.strMealThumb} alt={meal.strMeal} width="300" />
    </article>
  );
}
