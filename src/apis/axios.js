import axios from "axios";

const BASE_URL = "https://seclob-backend-70c0.onrender.com/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    } else {
      delete config.headers["Authorization"];
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const getData = async (endpoint) => {
  return api.get(endpoint);
};

export const postData = async (endpoint, data) => {
  return api.post(endpoint, data);
};

export const putData = async (endpoint, data) => {
  return api.put(endpoint, data);
};

export const deleteData = async (endpoint) => {
  return api.delete(endpoint);
};

export default api;
