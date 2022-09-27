import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";
import { store } from "./redux/store";

import "antd/dist/antd.min.css";
import "antd-country-phone-input/dist/index.css";

import "./global.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
