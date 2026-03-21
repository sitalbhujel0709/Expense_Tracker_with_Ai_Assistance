import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from "axios";

interface RetryableRequest extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
  timeout: 60000
})

const refreshAxios: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
  timeout: 60000,
});

let isRefreshing = false;

let failedQueue: {
  resolve: (value?: unknown) => void;
  reject: (error?: unknown) => void;
}[] = [];

const processQueue = (error: AxiosError | null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    error ? reject(error) : resolve();
  })
  failedQueue = [];
}
axiosInstance.interceptors.response.use((response) => response, async (error: AxiosError) => {
  const originalRequest = error.config as RetryableRequest | undefined;
  if (!originalRequest) {
    return Promise.reject(error);
  }
  console.warn("🔴 Request failed:", {
    url: originalRequest?.url,
    status: error.response?.status,
  });
  if (originalRequest.url?.includes("/users/refresh")) {
    return Promise.reject(error);
  }
  if (error.response?.status !== 401 || originalRequest._retry) {
    return Promise.reject(error);
  }
  if (isRefreshing) {
    console.log("⏳ Refresh in progress — queuing request:", originalRequest?.url);
    return new Promise((resolve, reject) => {
      failedQueue.push({ resolve, reject });
    }).then(() => {
      return axiosInstance(originalRequest);
    })

  }
  originalRequest._retry = true;
  isRefreshing = true;
  console.log("🔄 Attempting token refresh...");

  try {
    await refreshAxios.post("/users/refresh");
    processQueue(null);
    console.log("Token refreshed successfully");
    return axiosInstance(originalRequest);
  } catch (error) {
    processQueue(error as AxiosError);
    return Promise.reject(error);
  } finally {
    isRefreshing = false;
  }
})

export default axiosInstance;