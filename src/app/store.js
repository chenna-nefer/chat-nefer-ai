import { configureStore, createSlice } from "@reduxjs/toolkit";

// Define initial state
const initialState = {
  isRegistered: false,
  binanceApiKey: localStorage.getItem("binanceApiKey")
    ? atob(localStorage.getItem("binanceApiKey"))
    : "",
  binanceSecretKey: localStorage.getItem("binanceSecretKey")
    ? atob(localStorage.getItem("binanceSecretKey"))
    : "",
};

// Create slice for registration
const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    // Action to set registration status
    registerUser: (state) => {
      state.isRegistered = true;
    },
    // Action to set Binance API keys
    setBinanceKeys: (state, action) => {
      const encodedApiKey = btoa(action.payload.apiKey);
      const encodedSecretKey = btoa(action.payload.secretKey);
      state.binanceApiKey = encodedApiKey;
      state.binanceSecretKey = encodedSecretKey;
      localStorage.setItem("binanceApiKey", encodedApiKey);
      localStorage.setItem("binanceSecretKey", encodedSecretKey);
    },
  },
});

// Export actions
export const { registerUser, setBinanceKeys } = registrationSlice.actions;

// Configure and export the store
export default configureStore({
  reducer: {
    registration: registrationSlice.reducer,
  },
});
