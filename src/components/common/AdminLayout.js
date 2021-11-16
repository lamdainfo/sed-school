import React from "react";

import { getSchoolData, getUserData, logout } from "../../utils/Helpers";
import Sidebar from "../common/Sidebar";

import "antd/dist/antd.css";

const AdminLayout = (props) => {
  return (
    <div className="page-wrapper">
      <div className="page-inner">
        <Sidebar />
        <div className="page-content-wrapper">
          <header className="page-header">
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
              >
                <i className="ni ni-menu"></i>
              </a>
            </div>
            <div className="ml-auto d-flex">
              <div>
                <a
                  href="#"
                  data-toggle="dropdown"
                  title={getUserData().name}
                  className="header-icon d-flex align-items-center justify-content-center ml-2 "
                >
                  <img
                    src={getUserData().image_url}
                    className="profile-image rounded-circle"
                    alt={getUserData().name}
                  />
                </a>
                <div className="dropdown-menu dropdown-menu-animated dropdown-lg">
                  <div className="dropdown-header bg-trans-gradient d-flex flex-row py-4 rounded-top">
                    <div className="d-flex flex-row align-items-center mt-1 mb-1 color-white">
                      <span className="mr-2">
                        <img
                          src={getUserData().image_url}
                          className="rounded-circle profile-image"
                          alt={getUserData().name}
                        />
                      </span>
                      <div className="info-card-text">
                        <div className="fs-lg text-truncate text-truncate-lg">
                          {getUserData().name}{" "}
                        </div>
                        <span className="text-truncate text-truncate-md opacity-80">
                          {getSchoolData().sch_name}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="dropdown-divider m-0"></div>
                  <a href="#" className="dropdown-item" data-action="app-reset">
                    <span data-i18n="drpdwn.reset_layout">Change Password</span>
                  </a>
                  <div className="dropdown-divider m-0"></div>
                  <a
                    className="dropdown-item fw-500 pt-3 pb-3"
                    href="page_login.html"
                  >
                    <span onClick={logout}>Logout</span>
                    <span className="float-right fw-n">
                      Unique ID: {getUserData().unique_id}
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </header>

          {props.children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
