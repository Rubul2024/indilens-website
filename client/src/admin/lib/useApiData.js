import { useCallback, useEffect, useState } from "react";

// Loads data with a fetcher(signal) and exposes reload/setData for
// optimistic updates. The fetcher must be stable (module-level or memoised).
const useApiData = (fetcher, initialData = null) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [version, setVersion] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    fetcher(controller.signal)
      .then((result) => {
        setData(result);
        setError("");
      })
      .catch((fetchError) => {
        if (fetchError.name !== "AbortError") setError(fetchError.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [fetcher, version]);

  const reload = useCallback(() => {
    setLoading(true);
    setVersion((value) => value + 1);
  }, []);

  return { data, setData, loading, error, reload };
};

export default useApiData;
