import { createSlice } from "@reduxjs/toolkit";
import { fetchBalance } from "../dashboard/dashboardThunk";

const initialState = {
  balance: 0, // jangan hardcode
};

const balanceSlice = createSlice({
  name: "balance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBalance.fulfilled, (state, action) => {
      state.balance = action.payload;
    });
  },
});

export default balanceSlice.reducer;
