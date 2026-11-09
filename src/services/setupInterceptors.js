import axios from "axios";
import { api, setAuthHeader, clearAuthHeader } from "./api";
import { setTokens, clearSession } from "../redux/auth/slice";

const PUBLIC_URLS = ["/users/signin", "/users/signup"];

let refreshPromise = null;

const requestNewTokens = async (refreshToken) => {
  const { data } = await axios.get(
    `${api.defaults.baseURL}/users/current/refresh`,
    { headers: { Authorization: `Bearer ${refreshToken}` } },
  );
  return data;
};

export const setupInterceptors = (store) => {
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const original = error.config;
      const isExpired =
        error.response?.status === 401 &&
        original &&
        !original._retry &&
        !PUBLIC_URLS.includes(original.url);

      if (!isExpired) {
        return Promise.reject(error);
      }

      original._retry = true;

      try {
        refreshPromise ??= requestNewTokens(
          store.getState().auth.refreshToken,
        ).finally(() => {
          refreshPromise = null;
        });

        const tokens = await refreshPromise;

        store.dispatch(setTokens(tokens));
        setAuthHeader(tokens.token);
        original.headers.Authorization = `Bearer ${tokens.token}`;

        return api(original);
      } catch {
        clearAuthHeader();
        store.dispatch(clearSession());
        return Promise.reject(error);
      }
    },
  );
};
