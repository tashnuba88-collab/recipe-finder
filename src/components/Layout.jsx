import { NavLink, Outlet, Link } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <header>
        <Link to="/">Pantry Search</Link>
        <nav>
          <NavLink to="/" end>Search</NavLink> <NavLink to="/favorites">Saved</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
