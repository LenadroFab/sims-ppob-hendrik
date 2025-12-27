import axios from "axios";

/* ===============================
   AXIOS INSTANCE
=============================== */
export const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // ⬅️ AMBIL DARI .env
  headers: {
    "Content-Type": "application/json",
  },
});

/* ===============================
   INTERCEPTOR TOKEN
=============================== */
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* ===============================
   AUTH
=============================== */
export const registerUserApi = (userData) =>
  API.post("/registration", userData);

export const loginUserApi = async (userData) => {
  const res = await API.post("/login", userData);

  // SIMPAN TOKEN
  localStorage.setItem("token", res.data.data.token);

  return res;
};

/* ===============================
   PROFILE
=============================== */
export const getProfile = () => API.get("/profile");

export const updateProfile = (profileData) =>
  API.put("/profile/update", profileData);

export const updateProfileImage = (formData) =>
  API.put("/profile/image", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

/* ===============================
   PPOB
=============================== */
export const getBalance = () => API.get("/balance");

export const getServices = () => API.get("/services");

export const getBanner = () => API.get("/banner");

export const topupBalance = (data) => API.post("/topup", data);

export const createTransaction = (data) => API.post("/transaction", data);

export const getTransactionHistory = () => API.get("/transaction/history");
