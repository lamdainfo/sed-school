import React, { Component } from "react";
import { ErrorNotificationMsg } from "../../utils/NotificationHelper";

export default class Logout extends Component {
  componentDidMount() {
    try {
      localStorage.clear();
      window.location.href = "/";
    } catch (err) {
      ErrorNotificationMsg("Error", err.message);
    }
  }

  render() {
    return <div></div>;
  }
}
