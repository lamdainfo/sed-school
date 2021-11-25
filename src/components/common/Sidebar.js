import React from "react";
import { Link } from "react-router-dom";

import LogoSmall from "../../styles/LogoSmall";
import coverBG from "../../images/cover-2-lg.png";
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
            </div>
            <img
              src={coverBG}
              className="cover"
              alt="cover"
            />
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
                    <span className="nav-link-text">List</span>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
