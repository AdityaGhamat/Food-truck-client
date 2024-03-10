import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AppContextProvider from "./context/AppContextProvider.jsx";
import { store } from "./redux/store.jsx";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AppContextProvider>
    <Provider store={store}>
      <App />
      <Toaster />
    </Provider>
  </AppContextProvider>
);
