import React from "react";
import ReactDom from "react-dom";
import App from "../shared/App";
import {Provider} from 'react-redux';
import { createClientStore } from "../shared/store";
import { BrowserRouter as Router } from "react-router-dom";

ReactDom.render(
<Provider store={createClientStore()}>
  <Router>
    <App />
  </Router>
</Provider>,
  document.getElementById("root")
);
