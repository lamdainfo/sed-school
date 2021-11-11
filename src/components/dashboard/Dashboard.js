import React, { Component } from "react";
import { Layout } from "antd";

const { Content } = Layout;

export default class Dashboard extends Component {
  state = {};

  render() {
    return (
      <main id="js-page-content" role="main" className="page-content">
        <div className="subheader"></div>
        <div className="h-alt-hf d-flex flex-column align-items-center justify-content-center text-center">
          <div
            className="alert alert-danger bg-white pt-4 pr-5 pb-3 pl-5"
            id="demo-alert"
          >
            <h1 className="fs-xxl fw-700 color-fusion-500 d-flex align-items-center justify-content-center m-0">
              <span className="color-danger-700">Welcome to Dashboard</span>
            </h1>
          </div>
        </div>
      </main>
    );
  }
}
