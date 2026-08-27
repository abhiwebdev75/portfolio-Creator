import { useState, useEffect, useCallback } from 'react';
import api, { getErrorMessage } from '../api/client';

/**
 * Fetch data from the API with loading/error state and a refetch function.
 * @param {string} path API path relative to baseURL, e.g. '/projects'
 */
export default function useFetch(path) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = useCallback(() => {
    setLoading(true);
    return api
      .get(path)
      .then((res) => {
        setData(res.data);
        setError(null);
      })
      .catch((err) => setError(getErrorMessage(err)))
      .finally(() => setLoading(false));
  }, [path]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, loading, error, refetch, setData };
}
