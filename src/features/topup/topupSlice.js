import { createSlice } from "@reduxjs/toolkit";
import { submitTopUp } from "./topupThunk";

const initialState = {
  loading: false,
  error: null,
  success: false,
};

const topupSlice = createSlice({
  name: "topup",
  initialState,
  reducers: {
    resetTopUp(state) {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitTopUp.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(submitTopUp.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(submitTopUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetTopUp } = topupSlice.actions;
export default topupSlice.reducer;
