import { createAsyncThunk } from "@reduxjs/toolkit";
import { registerUserApi, loginUserApi } from "../../services/api";

/* =========================
   REGISTER USER
========================= */
export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ email, firstName, lastName, password }, { rejectWithValue }) => {
    try {
      const res = await registerUserApi({
        email,
        first_name: firstName,
        last_name: lastName,
        password,
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Register gagal");
    }
  }
);

/* =========================
   LOGIN USER
========================= */
export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await loginUserApi({ email, password });

      // ⬇️ WAJIB RETURN TOKEN DALAM BENTUK OBJECT
      return {
        token: res.data.data.token,
      };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login gagal");
    }
  }
);

/* =========================
   LOGOUT USER
========================= */
export const logoutUser = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("token");
  return true;
});
