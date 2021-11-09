import React from "react";
import Login from "./Login";
import "./Authentication.scss";
class Authenticate extends React.Component {
  state = {
    activeTabKey: "login",
  };

  handleTabCallback = (tabKey) => {
    this.setState({ activeTabKey: tabKey });
  };

  render() {
    return (
      <div className="authPage">
        <div className="container">
          <div className="login_wraper">
            <React.Fragment>
              <Login onchangeTab={this.handleTabCallback} />
            </React.Fragment>
          </div>
        </div>
      </div>
    );
  }
}

export default Authenticate;
