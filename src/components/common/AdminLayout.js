import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Layout, Row, Col, Menu, Dropdown, Select } from "antd";

import { logout } from "../../utils/Helpers";
import Sidebar from "../common/Sidebar";

import "antd/dist/antd.css";

import whitelogo from "../../images/logo.png";
import darklogo from "../../images/logo.png";

import {
  UserOutlined,
  LogoutOutlined,
  BellOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";

const { Header, Content } = Layout;
const { Option } = Select;

export class AdminLayout extends Component {
  state = {
    visible: false,
    // authUserId: authUserData().appusersId,
    profilepic: "",
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

  render() {
    return (
      <div className="page-wrapper">
        <div className="page-inner">
          <Sidebar />
          <div className="page-content-wrapper">
            <header className="page-header" role="banner">
              <div className="page-logo">
                <a
                  href="#"
                  className="page-logo-link press-scale-down d-flex align-items-center position-relative"
                  data-toggle="modal"
                  data-target="#modal-shortcut"
                >
                  <img
                    src="img/logo.png"
                    alt="SmartAdmin WebApp"
                    aria-roledescription="logo"
                  />
                  <span className="page-logo-text mr-1">SmartAdmin WebApp</span>
                  <span className="position-absolute text-white opacity-50 small pos-top pos-right mr-2 mt-n2"></span>
                  <i className="fal fa-angle-down d-inline-block ml-1 fs-lg color-primary-300"></i>
                </a>
              </div>

              <div className="hidden-lg-up">
                <a
                  href="#"
                  className="header-btn btn press-scale-down"
                  data-action="toggle"
                  data-className="mobile-nav-on"
                >
                  <i className="ni ni-menu"></i>
                </a>
              </div>
            </header>

            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default AdminLayout;
