import React from "react";

import { either, isEmpty, isNil } from "ramda";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { Signup, Login } from "components/Authentication";
import { PrivateRoute } from "components/commons";
import Home from "components/Home";
import MyPostList from "components/MyPostList";
import Create from "components/Posts/Create";
import DownloadPost from "components/Posts/DownloadPost";
import Edit from "components/Posts/Edit";
import Show from "components/Posts/Show";
import { getFromLocalStorage } from "utils/storage";

const App = () => {
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken);

  return (
    <Router>
      <ToastContainer />
      <Switch>
        <Route exact component={Show} path="/posts/:slug/show" />
        <Route exact component={Create} path="/posts/new" />
        <Route exact component={Signup} path="/signup" />
        <Route exact component={Login} path="/login" />
        <Route exact component={Edit} path="/posts/:slug/edit" />
        <Route exact component={MyPostList} path="/posts/mine" />
        <Route exact component={DownloadPost} path="/posts/:slug/download" />;
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
