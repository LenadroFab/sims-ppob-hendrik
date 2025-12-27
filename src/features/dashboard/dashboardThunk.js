import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../services/api";

/* =========================
   GET SALDO
========================= */
export const fetchBalance = createAsyncThunk(
  "dashboard/fetchBalance",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/balance");
      return res.data.data.balance;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Gagal mengambil saldo"
      );
    }
  }
);

/* =========================
   GET BANNER
========================= */
export const fetchBanner = createAsyncThunk(
  "dashboard/fetchBanner",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/banner");
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Gagal mengambil banner"
      );
    }
  }
);
