import { useEffect, useState } from "react";

// Runs an async function whenever `deps` change and tracks its status.
// The function receives an AbortSignal so stale requests are cancelled.
export function useAsync(fn, deps) {
  const [state, setState] = useState({ status: "loading", data: null, error: null });

  useEffect(() => {
    const controller = new AbortController();
    setState({ status: "loading", data: null, error: null });

    fn(controller.signal)
      .then((data) => setState({ status: "success", data, error: null }))
      .catch((error) => {
        if (error.name === "AbortError") return;
        setState({ status: "error", data: null, error });
      });

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state;
}
