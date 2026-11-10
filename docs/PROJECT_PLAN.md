# Project plan: Pantry Search

Capstone Part 1, React app with multiple external APIs

## The problem

Recipe sites are crowded with ads and long life stories before the ingredient list. I want a fast, plain tool where I can search for a dish, see what it needs, and save the ones I'll actually cook. I also like knowing where a dish comes from, so each cuisine links to facts about its country.

## Users and goals

- A home cook who wants to find a recipe by name or category in a few seconds.
- Someone planning the week who wants a short list of saved recipes.
- A curious cook who wants to browse by cuisine and learn about its country.

## APIs

| API | Auth | What it gives the app |
| --- | --- | --- |
| TheMealDB | None | Recipes, categories, cuisines, ingredients, instructions, images |
| REST Countries | None | Flag, capital, region, population, languages and currency for a cuisine's country |

The two are joined by a lookup table in the code that maps a cuisine label like "Italian" to a country code like IT.

## Features

1. Search recipes by name and filter by category.
2. Browse by cuisine.
3. Recipe page with ingredients, method and a video link.
4. Country card on recipe and cuisine pages.
5. Save and unsave recipes, kept in localStorage.
6. Clear loading, error and empty states.

Out of scope for Part 1: accounts, a database, meal planning, shopping lists. Those fit Parts 2 and 3.

## Pages and routes

| Route | Page |
| --- | --- |
| `/` | Search, category filter, cuisine chips, results |
| `/recipe/:id` | Recipe details and country card |
| `/cuisine/:area` | Country card and recipes from that cuisine |
| `/favorites` | Saved recipes |
| `*` | Not found |

## Component structure

Layout (header, nav, footer), SearchBar, RecipeGrid, RecipeCard, FavoriteButton, CuisineCard, Status messages. Pages assemble these. RecipeGrid and RecipeCard are reused on the home, cuisine and favorites pages.

## State and data flow

- Search text and category are controlled inputs, then stored in the URL query string so the back button works.
- A `useAsync` hook runs each fetch, tracks loading, success and error, and cancels stale requests.
- A Favorites context holds saved recipes and writes them to localStorage.

## Risks

| Risk | Plan |
| --- | --- |
| TheMealDB has no name-plus-category search | Search by name, then filter by category in the browser |
| Cuisine labels don't match country names | Keep a lookup table and hide the card when no match exists |
| An API is slow or down | Show an error message and keep the rest of the page working |
| CORS or rate limits | Both APIs allow browser calls without a key |

## Milestones

1. Vite and React Router scaffold, repo on GitHub.
2. TheMealDB search and results.
3. Recipe details page.
4. Favorites.
5. REST Countries and cuisine pages.
6. Styling and responsive pass.
7. README, deploy, demo video.

## Git workflow

One feature branch per milestone, several commits on each, merged into `main` through a pull request.

## Questions for reviewers

- Is the second API integrated in a way that feels useful, or bolted on?
- What would you add to the home page?
