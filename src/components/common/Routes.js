import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import config from "../../Config";
import OpenRoute from "./OpenRoute";
import PrivateRoute from "./PrivateRoute";

/* open Route Components */
import Login from "../authentication/Login";
import ForgotPassword from "../authentication/ForgotPassword";
import ResetPassword from "../authentication/ResetPassword";
import ForgotPasswordVerification from "../authentication/ForgotPasswordVerification";

/* Auth Required Private Route Components */
import Dashboard from "../dashboard/Dashboard";

import NoticeBoard from "../noticeBoard/NoticeBoard";
import CreateNoticeBoard from "../noticeBoard/CreateNoticeBoard";
import NoticeBoardComment from "../noticeBoard/NoticeBoardComment";

import HomeWork from "../homeWork/HomeWork";
import ApprovalHomeWork from "../homeWork/ApprovalHomeWork";
import CreateHomeWork from "../homeWork/CreateHomeWork";
import CreateHomeWorkBySubject from "../homeWork/CreateHomeWorkBySubject";
import EditHomeWork from "../homeWork/EditHomeWork";
import SubmitedHomeWork from "../homeWork/SubmitedHomeWork";
import SubmitHomeWork from "../homeWork/SubmitHomeWork";

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
        <OpenRoute exact path="/forgot-password" component={ForgotPassword} />
        <OpenRoute
          exact
          path="/forgot-password-verification"
          component={ForgotPasswordVerification}
        />
        <OpenRoute exact path="/reset-password" component={ResetPassword} />

        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/notice-board" component={NoticeBoard} />
        <PrivateRoute
          exact
          path="/create-notice-board"
          component={CreateNoticeBoard}
        />
        <PrivateRoute
          exact
          path="/notice-board-comment/:nid"
          component={NoticeBoardComment}
        />

        <PrivateRoute exact path="/home-work" component={HomeWork} />
        <PrivateRoute
          exact
          path="/create-home-work"
          component={CreateHomeWork}
        />
        <PrivateRoute
          exact
          path="/create-home-work-by-subject"
          component={CreateHomeWorkBySubject}
        />
        <PrivateRoute
          exact
          path="/edit-home-work"
          component={EditHomeWork}
        />        
        <PrivateRoute
          exact
          path="/approval-home-work"
          component={ApprovalHomeWork}
        />
        <PrivateRoute
          exact
          path="/submitted-home-work"
          component={SubmitedHomeWork}
        />
        <PrivateRoute
          exact
          path="/submit-home-work"
          component={SubmitHomeWork}
        />

        <OpenRoute exact path="/logout" component={Logout} />
        <OpenRoute path="*" component={Notfound} />
      </Switch>
    );
  }
}
