import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import config from "../../Config";
import OpenRoute from "./OpenRoute";
import PrivateRoute from "./PrivateRoute";

/* open Route Components */
import Login from "../authentication/Login";
import Register from "../authentication/Register";
import ForgotPassword from "../authentication/ForgotPassword";
import ForgotPasswordVerification from "../authentication/ForgotPasswordVerification";

/* Auth Required Private Route Components */
import Dashboard from "../dashboard/Dashboard";

/* Other Common Route Components */
import Logout from "../authentication/Logout";
import Maintenance from "../common/Maintenance";
import Notfound from "../common/Notfound";

export default class Routes extends Component {
  render() {
    if (config.IS_MAINTENANCE_MODE) {
      return <Route path="*" component={Maintenance} />;
    }

    return (
      <Switch>
        <OpenRoute exact path="/" component={Login} />       
        <OpenRoute exact path="/login" component={Login} />
        <OpenRoute exact path="/register" component={Register} />       
        <OpenRoute exact path="/forgot-password" component={ForgotPassword} />
        <OpenRoute
          exact
          path="/forgot-password-verification"
          component={ForgotPasswordVerification}
        />

        <PrivateRoute exact path="/dashboard" component={Dashboard} />

        <OpenRoute exact path="/logout" component={Logout} />
        <OpenRoute path="*" component={Notfound} />
      </Switch>
    );
  }
}
