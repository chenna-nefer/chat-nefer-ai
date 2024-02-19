import { configureStore, createSlice } from "@reduxjs/toolkit";

// Initialize localStorage for first-time visit
if (localStorage.getItem("isRegistered") === null) {
  localStorage.setItem("isRegistered", false);
}

if (localStorage.getItem("binancekeys") === null) {
  localStorage.setItem("binancekeys", false);
}

// Define initial state
const initialState = {
  isRegistered: localStorage.getItem("isRegistered") === "true",
  binancekeys: localStorage.getItem("binancekeys") === "true",
};

// Create slice for registration
const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    // Action to set registration status
    registerUser: (state) => {
      state.isRegistered = true;
      localStorage.setItem("isRegistered", true);
    },

    // Action to set Binance API keys status
    setBinanceKeys: (state) => {
      state.binancekeys = true;
      localStorage.setItem("binancekeys", true);
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
