import axios from "axios";
import { getToken } from "../utils/auth";

//* Creation d'une instance Axios utilisée pour tous les appels HTTP

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
});

//? Interceptor requêtes => ajoute le token

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

//? Interceptor response => gère erreur 401

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      window.dispatchEvent(new Event("auth:logout"));
    }
    return Promise.reject(err);
  }
);
