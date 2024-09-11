import React from "react";

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Posts from "components/Posts";

const App = () => (
  <Router>
    <ToastContainer />
    <Switch>
      <Route exact component={Posts} path="/" />
    </Switch>
  </Router>
);

export default App;
