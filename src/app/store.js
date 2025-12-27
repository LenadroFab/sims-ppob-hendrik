import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import topupReducer from "../features/topup/topupSlice";
import profileReducer from "../features/profile/profileSlice";
import balanceReducer from "../features/balance/balanceSlice"; // ✅ BARU
import dashboardReducer from "../features/dashboard/dashboardSlice";
import serviceReducer from "../features/services/serviceSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    topup: topupReducer,
    balance: balanceReducer, // ✅ BARU
    dashboard: dashboardReducer,
    services: serviceReducer,
  },
});

export default store;
