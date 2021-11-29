import React, { Component } from "react";

import LogoSmall from "../../styles/LogoSmall";
import { validateToken } from "../../utils/Helpers";
import { AUTH_USER_TOKEN_KEY } from "../../utils/constants";

import "antd/dist/antd.css";
import "../../css/page-login-alt.css";
export class FrontLayout extends Component {
  state = {
    loginStatus: false,
    visible: false,
  };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  componentDidMount() {
    const loginStatus = validateToken(
      localStorage.getItem(AUTH_USER_TOKEN_KEY)
    );
    this.setState({ loginStatus });
  }

  render() {
    return (
      <>
        <div className="login-page">
          <div className="blankpage-form-field">
            <div className="page-logo m-0 w-100 align-items-center justify-content-center rounded border-bottom-left-radius-0 border-bottom-right-radius-0 px-4">
              <a
                href="javascript:void(0)"
                className="page-logo-link press-scale-down d-flex align-items-center"
              >
                <LogoSmall />
              </a>
            </div>
            {this.props.children}
          </div>
        </div>
      </>
    );
  }
}

export default FrontLayout;
