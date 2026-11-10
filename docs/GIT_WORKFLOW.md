# Git workflow

The instructor's rubric rewards feature branches, multiple commits and merged pull requests. Build the app in the order below and commit as you go. Do not paste everything in at once and split it afterward.

## One-time setup

```bash
git init
git branch -M main
git add README.md .gitignore
git commit -m "Add README and gitignore"
git remote add origin https://github.com/<you>/recipe-finder.git
git push -u origin main
```

## Branch order

| Branch | Work | Suggested commits |
| --- | --- | --- |
| `feature/scaffold-routing` | Vite project, React Router, Layout, empty pages | "Scaffold Vite React app", "Add routes and layout" |
| `feature/mealdb-search` | `api/mealdb.js`, `useAsync`, SearchBar, RecipeGrid, RecipeCard, Home | "Add MealDB API helpers", "Add useAsync hook", "Add controlled search form", "Render results grid" |
| `feature/recipe-details` | Recipe page, ingredient helper | "Add recipe page", "Show ingredients and method" |
| `feature/favorites` | Favorites context, FavoriteButton, Favorites page | "Add favorites context", "Add save button", "Add favorites page" |
| `feature/country-api` | `api/restcountries.js`, CuisineCard, Cuisine page, cuisine chips | "Add REST Countries helper", "Add country card", "Add cuisine page" |
| `feature/styling` | `styles.css`, responsive fixes, focus states | "Add base styles", "Style cards and recipe page", "Fix mobile layout" |
| `docs/readme-final` | Final README, deployed link, known bugs | "Finish README" |

## For each branch

```bash
git switch main
git pull
git switch -b feature/mealdb-search
# work, then commit in small steps
git add src/api/mealdb.js
git commit -m "Add MealDB API helpers"
git push -u origin feature/mealdb-search
```

Open a pull request on GitHub with a short description of what changed and how you tested it. Merge it, then:

```bash
git switch main
git pull
```

## Pull request description template

```
What: one sentence on what this adds.
How I tested: pages I clicked through, searches I tried.
Notes: anything unfinished or odd.
```
