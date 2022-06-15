import React from "react";
// 提供dom操作的功能库
import ReactDOM from "react-dom";
import "./assets/css/index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
