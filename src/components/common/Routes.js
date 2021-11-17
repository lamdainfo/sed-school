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

import NoticeBoard from "../noticeBoard/NoticeBoard";
import CreateNoticeBoard from "../noticeBoard/CreateNoticeBoard";

import HomeWork from "../homeWork/HomeWork";
import CreateHomeWork from "../homeWork/CreateHomeWork";
import SubmitedHomeWork from "../homeWork/SubmitedHomeWork";

import LiveClass from "../liveClass/LiveClass";
import CreateLiveClass from "../liveClass/CreateLiveClass";

import Fees from "../fees";

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

        <PrivateRoute exact path="/notice-board" component={NoticeBoard} />
        <PrivateRoute exact path="/create-notice-board" component={CreateNoticeBoard} />

        <PrivateRoute exact path="/home-work" component={HomeWork} />
        <PrivateRoute exact path="/create-home-work" component={CreateHomeWork} />
        <PrivateRoute exact path="/submitted-home-work" component={SubmitedHomeWork} />

        <PrivateRoute exact path="/live-class" component={LiveClass} />
        <PrivateRoute exact path="/create-live-class" component={CreateLiveClass} />

        <PrivateRoute exact path="/fees" component={Fees} />
        
        <OpenRoute exact path="/logout" component={Logout} />
        <OpenRoute path="*" component={Notfound} />
      </Switch>
    );
  }
}
