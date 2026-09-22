import axios from "axios";

export const httpClient = axios.create({
    baseURL: import.meta.env.VITE_BASE_API,
});

httpClient.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
        config.headers.set("Authorization", `Bearer ${accessToken}`);
    }
    return config;
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });

  failedQueue = [];
};

const refreshToken = async () => {
  try {
    await post("/auth/refresh");
    processQueue(null);
  } catch (error) {
    processQueue(error);
    throw error;
  }
};

const getNewToken = async () => {
  if (!isRefreshing) {
    isRefreshing = true;
    await refreshToken();
    isRefreshing = false;
    return;
  }

  // Return a promise that resolves with the new token
  return new Promise((resolve, reject) => {
    failedQueue.push({ resolve, reject });
  });
};

// Handle refresh token
httpRequest.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const shouldRenewToken =
      error.response.status == 401 &&
      !originalRequest._retry;

    if (shouldRenewToken) {
      originalRequest._retry = true;
      try {
        await getNewToken();
        return httpRequest(originalRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

const _send = async (method, path, data, config) => {
    const response = await httpClient.request({
        ...config,
        method,
        url: path,
        data,
    });

    return response.data;
};

const get = async (path, config) => {
    return await _send("get", path, null, config);
};

const post = async (path, data, config) => {
    return await _send("post", path, data, config);
};

const put = async (path, data, config) => {
    return await _send("put", path, data, config);
};

const patch = async (path, data, config) => {
    return await _send("patch", path, data, config);
};

const del = async (path, config) => {
    return await _send("delete", path, null, config);
};

const http = { get, post, put, patch, del };

export default http;
