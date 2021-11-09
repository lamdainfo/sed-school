import React, { Component } from "react";
// import "./Common.scss";
export class Notfound extends Component {
  render() {
    return (
      <div
        className="message-box"
        style={{ marginTop: "300px", textAlign: "center" }}
      >
        <h2>404 Page Not Found</h2>
      </div>
    );
  }
}

export default Notfound;
