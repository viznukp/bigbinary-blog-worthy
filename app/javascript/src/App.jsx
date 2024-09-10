import React from "react";

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import Posts from "./components/Posts";
import Show from "./components/Posts/Show";

const App = () => (
  <Router>
    <Switch>
      <Route exact component={Posts} path="/" />
      <Route exact component={Posts} path="/home" />
      <Route exact component={Show} path="/show" />
    </Switch>
  </Router>
);

export default App;
