import { NavLink, Outlet, Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext.jsx";

export default function Layout() {
  const { favorites } = useFavorites();

  return (
    <>
      <header className="site-header">
        <Link to="/" className="wordmark">
          Pantry Search
        </Link>
        <nav aria-label="Main">
          <NavLink to="/" end>
            Search
          </NavLink>
          <NavLink to="/favorites">Saved ({favorites.length})</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="site-footer">
        Recipe data from{" "}
        <a href="https://www.themealdb.com" target="_blank" rel="noreferrer">
          TheMealDB
        </a>
        .
      </footer>
    </>
  );
}
