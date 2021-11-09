import React, { Component } from "react";
import { Layout } from "antd";

const { Content } = Layout;

export default class Dashboard extends Component {
  state = {};

  render() {
    return (
      <main id="js-page-content" role="main" class="page-content">
        <div class="subheader"></div>
        <div class="h-alt-hf d-flex flex-column align-items-center justify-content-center text-center">
          <div
            class="alert alert-danger bg-white pt-4 pr-5 pb-3 pl-5"
            id="demo-alert"
          >
            <h1 class="fs-xxl fw-700 color-fusion-500 d-flex align-items-center justify-content-center m-0">
              <img
                class="profile-image-sm rounded-circle bg-danger-700 mr-1 p-1"
                src="img/logo.png"
                alt="SmartAdmin WebApp Logo"
              />
              <span class="color-danger-700">
                {" "}
                To err is human; to forgive, divine.
              </span>
            </h1>
          </div>
        </div>
      </main>
    );
  }
}
