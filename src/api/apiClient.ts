import axios, { AxiosRequestConfig } from "axios";

const TOKEN_KEY = "conduit_token";

export const getToken = (): string | null => localStorage.getItem(TOKEN_KEY);
export const setToken = (token: string): void => localStorage.setItem(TOKEN_KEY, token);
export const removeToken = (): void => localStorage.removeItem(TOKEN_KEY);

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL ?? "http://localhost:3000/api",
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = getToken();
  if (token && config.headers) {
    config.headers["Authorization"] = `Token ${token}`;
  }
  return config;
});

export default apiClient;
