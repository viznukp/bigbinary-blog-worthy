import React from "react";

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import Posts from "./components/Posts";

const App = () => (
  <Router>
    <Switch>
      <Route exact component={Posts} path="/" />
    </Switch>
  </Router>
);

export default App;
