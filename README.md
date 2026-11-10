cat > README.md <<'EOF'
# Pantry Search

Pantry Search is a React app for finding recipes. You can search by name, filter by category, open a recipe to see its ingredients and method, and save the ones you want to cook later. Each recipe links to its cuisine, and a cuisine page shows facts about the country it comes from.

I built it for Capstone Part 1, a React app that fetches data from external APIs.

## Features

- Search recipes by name and filter by category
- Browse recipes by cuisine from a dropdown
- Recipe page with a photo, ingredients, method and a video link
- Country card with the flag, capital, region, population, languages and currency
- Save and unsave recipes. Saved recipes stay in the browser between visits
- Search terms are stored in the URL, so the back button returns to your last search
- Loading, error and empty messages on every page that fetches data

## Built with

- React 18
- React Router 6
- Vite
- Plain CSS

## Setup

You need Node 18 or newer.

    git clone https://github.com/tashnuba88-collab/recipe-finder.git
    cd recipe-finder
    npm install
    npm run dev

Open the address Vite prints, usually http://localhost:5173.

To make a production build:

    npm run build

The output goes to the `dist` folder. Neither API needs a key, so there is nothing else to configure.

## APIs

The app uses two free APIs.

### TheMealDB

https://www.themealdb.com/api.php

It provides the recipes. The app uses the public test key `1`. The base URL is `https://www.themealdb.com/api/json/v1/1`.

- `/search.php?s={name}` searches recipes by name
- `/search.php?f={letter}` lists recipes starting with a letter, used for the starter list on the home page
- `/filter.php?c={category}` lists recipes in a category
- `/filter.php?a={area}` lists recipes for a cuisine
- `/lookup.php?i={id}` returns the full recipe
- `/list.php?c=list` returns the list of categories
- `/list.php?a=list` returns the list of cuisines

### REST Countries

https://restcountries.com

It provides facts about the country behind a cuisine. The base URL is `https://restcountries.com/v3.1`.

- `/alpha/{code}?fields=name,flags,capital,region,subregion,population,languages,currencies` returns one country by its ISO code

TheMealDB labels cuisines with words like "Italian", while REST Countries needs a country. The table in `src/api/restcountries.js` maps each cuisine label to a country code, for example Italian to IT.

## Routes

- `/` search, category filter, cuisine dropdown and results
- `/recipe/:id` recipe details and country card
- `/cuisine/:area` country card and recipes for one cuisine
- `/favorites` saved recipes
- any other address shows a not found page

## Project structure

    src/
      api/
        mealdb.js           TheMealDB fetch helpers
        restcountries.js    REST Countries helper and the cuisine-to-country table
      hooks/
        useAsync.js         loading, success and error handling for fetches
      context/
        FavoritesContext.jsx   saved recipes shared across pages
      components/
        Layout, SearchBar, RecipeGrid, RecipeCard,
        FavoriteButton, CuisineCard, Status
      pages/
        Home, Recipe, Cuisine, Favorites, NotFound

## How it works

- The search form is a controlled component. The text box and the category dropdown are both held in React state.
- The search text and category are saved in the URL query string, so a search can be restored with the back button.
- `useAsync` runs a fetch whenever its inputs change and reports whether it is loading, finished or failed. It cancels the previous request when a new one starts, so old results never replace new ones.
- `FavoritesContext` keeps the list of saved recipes and writes it to localStorage.
- `RecipeGrid` and `RecipeCard` are used on the home, cuisine and saved pages.

## Challenges and known bugs

Challenges I ran into:

- TheMealDB cannot search by name and category together. When both are set, the app searches by name and filters the results by category in the browser.
- The API returns `null` instead of an empty list when nothing matches. `src/api/mealdb.js` turns that into an empty array.
- Ingredients arrive as 20 numbered fields (`strIngredient1` to `strIngredient20`). A helper collects the ones that are not empty.
- Cuisine labels do not match country names, so I wrote the lookup table. A cuisine that is not in the table shows no country card.
- The cuisine list from the API is long and repeats some names. The app removes the duplicates, sorts the list and shows it as a dropdown.
- Quick searches could show results from an older request. Cancelling the previous request in `useAsync` fixed that.

Known bugs and limits:

- Some cuisines in the dropdown have no recipes, so their page shows a "no recipes found" message.
- The starter list on the home page always shows recipes that start with the letter C.
- Results from the category filter have only a name and photo. Full details load when you open a recipe.
- Saved recipes are stored in one browser, so they do not sync between devices.
- The public test key for TheMealDB may be rate limited if it gets heavy use.

## Project documents

- `docs/PROJECT_PLAN.md` project plan
- `docs/GIT_WORKFLOW.md` branch and pull request plan
- `docs/VIDEO_SCRIPT.md` outline for the demo video
EOF
