import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const fetchBalance = async () => {
  const res = await axios.get(`${API}/balance`);
  return res.data.data.balance;
};
