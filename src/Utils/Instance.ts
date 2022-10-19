import axios, { AxiosRequestConfig } from "axios";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true
});

instance.interceptors.request.use(function (config: AxiosRequestConfig) {
  const accessToken = localStorage.getItem("token");
  if (accessToken) {
    if (config.headers) config.headers.common["Authorization"] = ` ${accessToken}`;
  }
  return config;
});
