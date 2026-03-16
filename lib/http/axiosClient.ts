import axios from "axios";

export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? "",
  timeout: 15000,
});

axiosClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    try {
      const token = window.localStorage.getItem("access_token");
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: config.headers?.Authorization ?? `Bearer ${token}`,
        };
      }
    } catch {
      // ignore storage errors for now
    }
  }

  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status as number | undefined;
    const message =
      error?.response?.data?.message ??
      error?.message ??
      "Unexpected error while performing request.";

    // TODO: hook 401/403 handling (redirect to login, refresh, etc.)
    if (status === 401 || status === 403) {
      // placeholder for future auth handling
    }

    return Promise.reject(new Error(message));
  },
);

