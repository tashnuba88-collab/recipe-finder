import { NavLink, Outlet, Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext.jsx";

export default function Layout() {
  const { favorites } = useFavorites();

  return (
    <>
      <header>
        <Link to="/">Pantry Search</Link>
        <nav>
          <NavLink to="/" end>Search</NavLink> <NavLink to="/favorites">Saved ({favorites.length})</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
