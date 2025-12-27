import { createSlice } from "@reduxjs/toolkit";
import {
  fetchProfile,
  updateProfile,
  uploadProfileImage,
} from "./profileThunk";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    resetProfileError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ======================
         FETCH PROFILE
      ====================== */
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ======================
         UPDATE PROFILE
      ====================== */
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ======================
         UPLOAD PROFILE IMAGE
      ====================== */
      .addCase(uploadProfileImage.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadProfileImage.fulfilled, (state, action) => {
        state.loading = false;
        if (state.data) {
          state.data.profile_image = action.payload.profile_image;
        }
      })
      .addCase(uploadProfileImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetProfileError } = profileSlice.actions;
export default profileSlice.reducer;
