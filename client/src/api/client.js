import axios from 'axios';

// In dev, requests go to /api and are proxied to the server by Vite.
// In a split production deployment, set VITE_API_URL to the API's base URL.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
});

const TOKEN_KEY = 'portfolio_token';

export const tokenStore = {
  get: () => localStorage.getItem(TOKEN_KEY),
  set: (t) => localStorage.setItem(TOKEN_KEY, t),
  clear: () => localStorage.removeItem(TOKEN_KEY),
};

// Attach the bearer token to every request when present
api.interceptors.request.use((config) => {
  const token = tokenStore.get();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/** Pull a human-friendly message out of an Axios error */
export function getErrorMessage(err, fallback = 'Something went wrong') {
  return err?.response?.data?.message || err?.message || fallback;
}

/** Resolve an uploaded-file path to a full URL when the API is on another origin */
export function mediaUrl(path) {
  if (!path) return '';
  if (/^https?:\/\//i.test(path)) return path;
  const base = import.meta.env.VITE_API_URL;
  if (base) return base.replace(/\/api\/?$/, '') + path;
  return path; // dev: relative path served through the proxy
}

export default api;
