import React, { Component } from "react";
import footerlogo from "../images/logo.png";

class LogoSmall extends Component {
  render() {
    return <img alt="logo" style={{ width: "160px" }} src={footerlogo}></img>;
  }
}

export default LogoSmall;
