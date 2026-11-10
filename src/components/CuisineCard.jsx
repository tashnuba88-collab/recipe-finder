import { useAsync } from "../hooks/useAsync.js";
import { AREA_TO_CODE, getCountry } from "../api/restcountries.js";

// Second API: shows facts about the country a cuisine comes from.
export default function CuisineCard({ area }) {
  const code = AREA_TO_CODE[area];
  const { status, data: country } = useAsync(
    async (signal) => (code ? getCountry(code, signal) : null),
    [code]
  );

  if (!code) return null;
  if (status === "loading") return <p className="status">Loading country details…</p>;
  if (status === "error" || !country) {
    return <p className="status">Country details are unavailable right now.</p>;
  }

  const languages = Object.values(country.languages ?? {}).join(", ");
  const currencies = Object.values(country.currencies ?? {})
    .map((c) => c.name)
    .join(", ");

  return (
    <aside className="country" aria-label={`About ${country.name.common}`}>
      <img src={country.flags.svg || country.flags.png} alt={country.flags.alt || `Flag of ${country.name.common}`} />
      <div>
        <h2>{country.name.common}</h2>
        <dl>
          <dt>Capital</dt>
          <dd>{country.capital?.join(", ") || "None listed"}</dd>
          <dt>Region</dt>
          <dd>{country.subregion || country.region}</dd>
          <dt>Population</dt>
          <dd>{country.population.toLocaleString()}</dd>
          {languages && (
            <>
              <dt>Languages</dt>
              <dd>{languages}</dd>
            </>
          )}
          {currencies && (
            <>
              <dt>Currency</dt>
              <dd>{currencies}</dd>
            </>
          )}
        </dl>
      </div>
    </aside>
  );
}
