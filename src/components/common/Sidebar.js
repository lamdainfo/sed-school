import React from "react";
import { Link } from "react-router-dom";

import LogoSmall from "../../styles/LogoSmall";
import { getUserData, getSchoolData } from "../../utils/Helpers";

const Sidebar = () => {
  return (
    <>
      <aside className="page-sidebar">
        <div className="page-logo">
          <Link to="/dashboard">
            <LogoSmall />
          </Link>
        </div>

        <nav id="js-primary-nav" className="primary-nav" role="navigation">
          <div className="nav-filter">
            <div className="position-relative">
              <input
                type="text"
                id="nav_filter_input"
                placeholder="Filter menu"
                className="form-control"
              />
              <a
                href="#"
                className="btn-primary btn-search-close js-waves-off"
                data-action="toggle"
                data-target=".page-sidebar"
              >
                <i className="fal fa-chevron-up"></i>
              </a>
            </div>
          </div>

          <div className="info-card">
            <img
              src={getSchoolData().sch_img}
              className="profile-image rounded-circle"
              alt="School Logo"
            />
            <div className="info-card-text">
              <a className="d-flex align-items-center text-white">
                <span className="text-truncate text-truncate-sm d-inline-block">
                  {getUserData().name}
                </span>
              </a>
              {/* <span className="d-inline-block text-truncate text-truncate-sm">
                Class : II-A
                <br />
                Roll No. : 1
              </span> */}
            </div>
            <img
              src="https://dev.lamdainfotech.com/parentlogin/img/card-backgrounds/cover-2-lg.png"
              className="cover"
              alt="cover"
            />
            <a
              href="#"
              className="pull-trigger-btn"
              data-action="toggle"
              data-target=".page-sidebar"
              data-focus="nav_filter_input"
            >
              <i className="fal fa-angle-down"></i>
            </a>
          </div>

          <ul id="js-nav-menu" className="nav-menu">
            <li>
              <Link to="/dashboard">
                <i className="fal fa-home"></i>
                <span className="nav-link-text">Dashboard</span>
              </Link>
            </li>

            <li className="active">
              <a title="Form Stuff">
                <i className="fal fa-file-edit"></i>
                <span className="nav-link-text">Notice Board</span>
              </a>
              <ul>
                <li>
                  <Link to="/create-notice-board">
                    <span className="nav-link-text">Create</span>
                  </Link>
                </li>
                <li>
                  <Link to="/notice-board">
                    <span className="nav-link-text">View</span>
                  </Link>
                </li>
              </ul>
            </li>

            <li className="active">
              <a title="Form Stuff">
                <i className="fal fa-book-reader"></i>
                <span className="nav-link-text">Homework</span>
              </a>
              <ul>
                <li>
                  <Link to="/create-home-work">
                    <span className="nav-link-text">Create</span>
                  </Link>
                </li>
                <li>
                  <Link to="/home-work">
                    <span className="nav-link-text">View</span>
                  </Link>
                </li>
                <li>
                  <Link to="/approval-home-work">
                    <span className="nav-link-text">Approval List</span>
                  </Link>
                </li>
              </ul>
            </li>

            <li className="active">
              <a title="Form Stuff">
                <i className="fal fa-camcorder"></i>
                <span className="nav-link-text">Live Classes</span>
              </a>
              <ul>
                <li>
                  <Link to="/create-live-class">
                    <span className="nav-link-text">Create</span>
                  </Link>
                </li>
                <li>
                  <Link to="/live-class">
                    <span className="nav-link-text">View</span>
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/fees">
                <i className="fal fa-receipt"></i>
                <span className="nav-link-text">Fees</span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
