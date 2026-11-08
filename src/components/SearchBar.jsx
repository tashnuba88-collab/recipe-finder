import { useState } from "react";

// Controlled form: the input and the select both live in React state.
export default function SearchBar({ initialQuery, initialCategory, categories, onSearch }) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ query: query.trim(), category });
  };

  const handleCategory = (e) => {
    setCategory(e.target.value);
    onSearch({ query: query.trim(), category: e.target.value });
  };

  return (
    <form className="search" onSubmit={handleSubmit} role="search">
      <label className="field">
        <span>Recipe name</span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Try “pasta” or “curry”"
        />
      </label>
      <label className="field">
        <span>Category</span>
        <select value={category} onChange={handleCategory}>
          <option value="">Any</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>
      <button type="submit" className="primary">
        Search
      </button>
    </form>
  );
}
