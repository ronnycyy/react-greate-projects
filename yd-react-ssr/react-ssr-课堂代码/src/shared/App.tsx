import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import routes from "./Routes";
export default function BasicExample() {
  return (
    <div>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
      </ul>
      {renderRoutes(routes)}
    </div>
  );
}
