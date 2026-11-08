# Pantry Search

A React app for finding recipes. Search by name, narrow by category, open a recipe to see its ingredients and method, and save the ones you want to cook later. Each cuisine links to facts about its country. Saved recipes stay in your browser between visits.

Built for Project 1: React Application with External API Integration.

Deployed URL: _add your Netlify or Vercel link here_

## Features

- Search recipes by name and filter by category
- Recipe page with ingredients, method and a video link when one exists
- Browse by cuisine, with a country card (flag, capital, population, languages, currency) from a second API
- Save and unsave recipes, kept in localStorage
- Search terms live in the URL, so the back button returns you to your last search
- Loading, error and empty states on every page that fetches data

## Setup

You need Node 18 or newer.

```bash
git clone <your-repo-url>
cd recipe-finder
npm install
npm run dev
```

Open the address Vite prints, usually http://localhost:5173.

To make a production build, run `npm run build`. The output goes to `dist/`.

## APIs

The app combines two free APIs that need no sign-up.

### 1. TheMealDB

[TheMealDB](https://www.themealdb.com/api.php) provides the recipes. The app uses the public test key `1`.

| Purpose | Endpoint |
| --- | --- |
| Search by name | `/search.php?s={name}` |
| Filter by category | `/filter.php?c={category}` |
| Starter recipes on the home page | `/search.php?f={letter}` |
| Full recipe by id | `/lookup.php?i={id}` |
| List of categories | `/list.php?c=list` |
| List of cuisines | `/list.php?a=list` |
| Recipes for a cuisine | `/filter.php?a={area}` |

Base URL: `https://www.themealdb.com/api/json/v1/1`

### 2. REST Countries

[REST Countries](https://restcountries.com) provides facts about the country behind a cuisine.

| Purpose | Endpoint |
| --- | --- |
| Country by ISO code | `/v3.1/alpha/{code}?fields=name,flags,capital,region,subregion,population,languages,currencies` |

TheMealDB names cuisines with labels like "Italian", so `src/api/restcountries.js` holds a table that maps each label to a country code.

## Routes

| Path | Page |
| --- | --- |
| `/` | Search and results |
| `/recipe/:id` | Recipe details |
| `/cuisine/:area` | Country card and recipes for one cuisine |
| `/favorites` | Saved recipes |
| `*` | Not found page |

## Project structure

```
src/
  api/mealdb.js            TheMealDB fetch helpers
  api/restcountries.js     REST Countries helper and cuisine-to-country table
  hooks/useAsync.js        loading / error / data handling with request cancellation
  context/                 favorites state shared across pages
  components/              Layout, SearchBar, RecipeCard, RecipeGrid, FavoriteButton, CuisineCard, Status
  pages/                   Home, Recipe, Cuisine, Favorites, NotFound
```

## Challenges and known bugs

- The API has no single call for "name plus category." When both are set, the app searches by name and filters the results by category in the browser.
- The category filter endpoint returns only an id, name and image, so those results have less detail than a name search. Full details load when you open a recipe.
- The API returns `null` instead of an empty list when nothing matches. `api/mealdb.js` converts that to an empty array.
- Ingredients come as 20 numbered fields (`strIngredient1` to `strIngredient20`), so a helper collects the non-empty ones.
- Fast typing and clicking could show results from an older request. `useAsync` cancels the previous request with an AbortController to prevent that.
- Cuisine labels and country names don't match, so the country card depends on a hand-written table. A cuisine missing from the table shows no card.
- Known: the home page starter list always shows recipes starting with "c."
- Known: saved recipes are stored per browser, so they don't sync across devices.
- Known: the public test key may be rate limited under heavy use.

## Documents

- `docs/PROJECT_PLAN.md` project plan
- `docs/GIT_WORKFLOW.md` branch and pull request plan
- `docs/VIDEO_SCRIPT.md` outline for the demo video
