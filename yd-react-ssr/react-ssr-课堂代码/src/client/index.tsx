import React from "react";
import ReactDOM from "react-dom";
import App from "../shared/App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { createClientStore } from "../shared/store/index";
// recoil

ReactDOM.hydrate(
  <Provider store={createClientStore()}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
