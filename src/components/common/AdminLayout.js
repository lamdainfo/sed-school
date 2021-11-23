import React from "react";
import { Link } from "react-router-dom";

import { getSchoolData, getUserData, logout } from "../../utils/Helpers";
import Sidebar from "../common/Sidebar";
import ChangePassword from "../authentication/ChangePassword";

import "antd/dist/antd.css";

const AdminLayout = (props) => {
  return (
    <div className="page-wrapper mod-nav-link">
      <div className="page-inner">
        <Sidebar />
        <div className="page-content-wrapper">
          <header className="page-header">
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
                  <ChangePassword />
                  <div className="dropdown-divider m-0"></div>
                  <Link
                    onClick={logout}
                    className="dropdown-item fw-500 pt-3 pb-3"
                  >
                    <span>Logout</span>
                    <span className="float-right fw-n">
                      Unique ID: {getUserData().unique_id}
                    </span>
                  </Link>
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
