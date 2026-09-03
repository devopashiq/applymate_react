import { getToken, setToken } from "../service/token.service";
import { api } from "./axios";
import { authService } from "../service/auth.service";

api.interceptors.request.use((config) => {
  const accessToken = getToken();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  } else {
    delete config.headers.Authorization;
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log(error.response);

    const originalRequest = error.config;
    

    // // If the refresh request itself failed, don't try again.
    // if (originalRequest.url === "/api/auth/refresh") {
    //   // Clear auth state here if needed
    //   // store.dispatch(logout());
    //   return Promise.reject(error);
    // }

    if (error?.response?.status === 401 && !error.config._retry) {
      error.config._retry = true;

      try {
        const response = await authService.refreshToken();
        setToken(response?.data?.accessToken);
        return api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
