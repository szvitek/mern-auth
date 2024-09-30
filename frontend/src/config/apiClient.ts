import axios, { CreateAxiosDefaults } from "axios";
import queryClient from "./queryClient";
import { navigate } from "@/lib/navigation";

const options: CreateAxiosDefaults = {
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
};

const TokenRefreshClient = axios.create(options);
TokenRefreshClient.interceptors.response.use((response) => response.data);

const API = axios.create(options);

API.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const { config, response } = error;
    const { status, data } = response || {};

    // try to refresh the access token
    if (status === 401 && data?.errorCode === "InvalidAccessToken") {
      try {
        // todo: refactor this refresh logic!!!
        // to prevent infinite loops in some cases use a different client here that doesn't have
        // response interceptor
        // tbh: i don't like this approach need to find a more robust solution
        await TokenRefreshClient.get("/auth/refresh");
        return TokenRefreshClient(config);
      } catch {
        // clear all the cached data if unable to refresh the access token
        queryClient.clear();
        // todo: i don't like this solution either
        navigate?.("/login", {
          state: {
            redirectUrl: window.location.pathname,
          },
        });
      }
    }

    return Promise.reject({ status, ...data });
  }
);

export default API;
