// One place for loading, error and empty messages so every page handles them the same way.
export function Loading({ label = "Loading" }) {
  return (
    <p className="status" role="status">
      {label}…
    </p>
  );
}

export function ErrorMessage({ error }) {
  return (
    <p className="status status-error" role="alert">
      Something went wrong: {error?.message || "unknown error"}. Check your connection and reload the page.
    </p>
  );
}

export function Empty({ children }) {
  return <p className="status">{children}</p>;
}
