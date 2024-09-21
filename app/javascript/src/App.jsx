import React from "react";

import { either, isEmpty, isNil } from "ramda";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { Signup, Login } from "components/Authentication";
import { PrivateRoute } from "components/commons";
import Home from "components/Home";
import { getFromLocalStorage } from "utils/storage";

const App = () => {
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken);

  return (
    <Router>
      <ToastContainer />
      <Switch>
        <Route exact component={Signup} path="/signup" />
        <Route exact component={Login} path="/login" />
        <PrivateRoute
          component={Home}
          condition={isLoggedIn}
          path="/"
          redirectRoute="/login"
        />
      </Switch>
    </Router>
  );
};

export default App;
