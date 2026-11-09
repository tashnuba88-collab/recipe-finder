import RecipeCard from "./RecipeCard.jsx";

export default function RecipeGrid({ meals }) {
  return (
    <ul className="grid">
      {meals.map((meal) => (
        <RecipeCard key={meal.idMeal} meal={meal} />
      ))}
    </ul>
  );
}
