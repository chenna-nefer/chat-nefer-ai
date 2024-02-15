import { createStore } from "redux";

// Initial state
const initialState = {
  isRegistered: false,
};

// Reducer
function registrationReducer(state = initialState, action) {
  switch (action.type) {
    case "REGISTER_USER":
      return { ...state, isRegistered: true };
    default:
      return state;
  }
}

// Create store

const store = createStore(registrationReducer);

export default store;
