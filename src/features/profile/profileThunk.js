import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../services/api";

/* =========================
   GET PROFILE
========================= */
export const fetchProfile = createAsyncThunk(
  "profile/fetch",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/profile");
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Gagal mengambil profile"
      );
    }
  }
);

/* =========================
   UPDATE PROFILE
========================= */
export const updateProfile = createAsyncThunk(
  "profile/update",
  async ({ first_name, last_name }, thunkAPI) => {
    try {
      const res = await API.put("/profile/update", {
        first_name,
        last_name,
      });
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Gagal update profile"
      );
    }
  }
);

/* =========================
   UPLOAD PROFILE IMAGE
========================= */
export const uploadProfileImage = createAsyncThunk(
  "profile/uploadImage",
  async (file, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await API.put("/profile/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Gagal upload foto profile"
      );
    }
  }
);
