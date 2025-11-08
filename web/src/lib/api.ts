import axios from "axios";

const baseURL =
  (typeof window !== "undefined" && window.__API_URL__) ||
  import.meta.env.VITE_API_URL ||
  "http://localhost:4000";

export const api = axios.create({
  baseURL
});

export default api;

