import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { moviesApi } from "./features/apiSlice";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApiProvider api={moviesApi}>
        <App />
      </ApiProvider>
    </Provider>
  </React.StrictMode>
);
