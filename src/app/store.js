import { configureStore, createSlice } from "@reduxjs/toolkit";

// Initialize localStorage for first-time visit
if (localStorage.getItem("isRegistered") === null) {
  localStorage.setItem("isRegistered", false);
}

if (localStorage.getItem("binancekeys") === null) {
  localStorage.setItem("binancekeys", false);
}

if (localStorage.getItem("currentComponent") === null) {
  localStorage.setItem("currentComponent", "login");
}
// Define initial state
const initialState = {
  isRegistered: localStorage.getItem("isRegistered") === "true",
  binancekeys: localStorage.getItem("binancekeys") === "true",
  currentComponent: localStorage.getItem("currentComponent") || "login",
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
    // Reducers for navigation
    navigateToVerifyEmail: (state) => {
      state.currentComponent = "verifyOtp";
      localStorage.setItem("currentComponent", "verifyOtp");
    },
    navigateToDashboard: (state) => {
      state.currentComponent = "dashboard";
      localStorage.setItem("currentComponent", "dashboard");
    },
    navigateToProvideKeys: (state) => {
      state.currentComponent = "provideKeys";
      localStorage.setItem("currentComponent", "login");
    },
    // Add a reducer to handle navigation to the login component
    navigateToLogin: (state) => {
      state.currentComponent = "login";
      localStorage.setItem("currentComponent", "login");
    },
    // Add a reducer to handle navigation to the register component
    navigateToRegister: (state) => {
      state.currentComponent = "register";
      localStorage.setItem("currentComponent", "register");
    },
  },
});

// Export actions
export const {
  registerUser,
  setBinanceKeys,
  navigateToVerifyEmail,
  navigateToDashboard,
  navigateToProvideKeys,
  navigateToLogin,
  navigateToRegister,
} = registrationSlice.actions;

export default configureStore({
  reducer: {
    registration: registrationSlice.reducer,
  },
});
