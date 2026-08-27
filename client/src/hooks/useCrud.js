import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import api, { getErrorMessage } from '../api/client';

/**
 * List + create/update/delete for a REST collection, with local state kept in sync.
 * @param {string} endpoint e.g. '/projects'
 */
export default function useCrud(endpoint) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    setLoading(true);
    return api
      .get(endpoint)
      .then((res) => setItems(res.data))
      .catch((err) => toast.error(getErrorMessage(err)))
      .finally(() => setLoading(false));
  }, [endpoint]);

  useEffect(() => {
    load();
  }, [load]);

  const create = async (data) => {
    const res = await api.post(endpoint, data);
    setItems((prev) => [...prev, res.data]);
    return res.data;
  };

  const update = async (id, data) => {
    const res = await api.put(`${endpoint}/${id}`, data);
    setItems((prev) => prev.map((it) => (it._id === id ? res.data : it)));
    return res.data;
  };

  const remove = async (id) => {
    await api.delete(`${endpoint}/${id}`);
    setItems((prev) => prev.filter((it) => it._id !== id));
  };

  return { items, loading, load, create, update, remove };
}
