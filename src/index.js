import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import { theme } from "./theme.js";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import "./index.css";
import store from "./app/store.js";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
