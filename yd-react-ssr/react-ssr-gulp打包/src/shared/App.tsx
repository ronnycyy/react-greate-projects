import React from 'react';
import Home from './Home'
import About from './About'
import {renderRoutes} from 'react-router-config';
import routes from './Routes';
import {
    Switch,
    Route,
    Link
  } from "react-router-dom";

export default function App() {
  return (
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>

        <hr />
        {renderRoutes(routes)}

        {/* <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
        </Switch> */}
      </div>
  );
}


