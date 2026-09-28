import { useEffect, useState } from "react";

import { API_URL } from "../services/api";

// ========================================
// PUBLIC CONTENT LOADER
// ========================================
// Loads published content from the CMS. Results are cached for the
// session so navigating between pages does not refetch or flash.
// ========================================

const cache = new Map();

const fetchJson = (path) => {
  if (!cache.has(path)) {
    const request = fetch(`${API_URL}${path}`)
      .then(async (response) => {
        const data = await response.json().catch(() => ({}));
        if (!response.ok) {
          const error = new Error(data.message || "Request failed.");
          error.status = response.status;
          throw error;
        }
        return data.data;
      })
      .catch((error) => {
        // Allow a retry on the next visit
        cache.delete(path);
        throw error;
      });

    cache.set(path, request);
  }

  return cache.get(path);
};

// Returns { data, loading, error } for a public API path, e.g. "/api/blog"
const usePublicData = (path, fallback = null) => {
  const [state, setState] = useState({ path, data: fallback, loading: Boolean(path), error: null });

  useEffect(() => {
    if (!path) return;

    let active = true;

    fetchJson(path)
      .then((data) => active && setState({ path, data, loading: false, error: null }))
      .catch((error) => active && setState({ path, data: fallback, loading: false, error }));

    return () => {
      active = false;
    };
    // fallback is only an initial value
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  // Ignore a stale result while a new path is loading
  if (state.path !== path) return { data: fallback, loading: true, error: null };

  return state;
};

export default usePublicData;
