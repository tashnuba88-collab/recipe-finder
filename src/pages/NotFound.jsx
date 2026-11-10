import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="page">
      <h1>Page not found</h1>
      <p>
        That address doesn’t lead anywhere. <Link to="/">Go to search</Link>.
      </p>
    </section>
  );
}
