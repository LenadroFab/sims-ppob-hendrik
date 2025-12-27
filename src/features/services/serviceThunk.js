import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../services/api";

export const fetchServices = createAsyncThunk(
  "services/fetch",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/services");
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Gagal mengambil service"
      );
    }
  }
);
