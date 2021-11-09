import React, { Component } from "react";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import Config from "./Config";
import Routes from "./components/common/Routes";
import { AUTH_USER_TOKEN_KEY } from "./utils/constants";

const history = createBrowserHistory();
const token = localStorage.getItem(AUTH_USER_TOKEN_KEY);

export default class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Routes />
      </Router>
    );
  }
}
