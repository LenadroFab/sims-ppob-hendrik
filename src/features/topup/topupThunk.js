import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../services/api";
import { fetchBalance } from "../dashboard/dashboardThunk";

export const submitTopUp = createAsyncThunk(
  "topup/submit",
  async (amount, thunkAPI) => {
    try {
      await API.post("/topup", {
        amount: Number(amount),
      });

      // refresh saldo
      thunkAPI.dispatch(fetchBalance());

      return true;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Top up gagal"
      );
    }
  }
);
