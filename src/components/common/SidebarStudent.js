import React from "react";
import { Link } from "react-router-dom";

import LogoSmall from "../../styles/LogoSmall";
import coverBG from "../../images/cover-2-lg.png";
import { getUserData, getSchoolData } from "../../utils/Helpers";
import userIcon from "../../images/userIcon.jpg";

const SidebarStudent = (props) => {

  const toggleSidebar = () => {
    props.toggleSidebar();
  };
  
  return (
    <>
      <aside
        className={
          props.isSidebarOpen
            ? "page-sidebar sidebaropen"
            : "page-sidebar sidebarclose"
        }
      >
        <div className="page-logo">
          <Link to="/dashboard">
            <LogoSmall />
          </Link>
          <div style={{ marginLeft: "30px" }}>
            <a href="#" onClick={toggleSidebar} className="hamburger hamopen">
              <span></span>
              <span></span>
              <span></span>
            </a>
          </div>
        </div>

        <nav id="js-primary-nav" className="primary-nav" role="navigation">
          <div className="info-card">
            <img
              src={getSchoolData()?.sch_img}
              className="profile-image rounded-circle"
              alt="School Logo"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = userIcon;
              }}
            />
            <div className="info-card-text">
              <a className="d-flex align-items-center text-white">
                {getUserData().name}
              </a>
              <span className="d-inline-block text-truncate text-truncate-sm mt-1">
                Class :{" "}
                {getUserData().stdClass + " - " + getUserData().stdSection}
                <br />
                Roll No. : {getUserData().stdRoll}
              </span>
            </div>
            <img src={coverBG} className="cover" alt="cover" />
          </div>

          <ul id="js-nav-menu" className="nav-menu">
            <li>
              <Link to="/dashboard">
                <i className="fal fa-home"></i>
                <span className="nav-link-text">Dashboard</span>
              </Link>
            </li>

            <li>
              <Link to="/notice-board">
                <i className="fal fa-file-edit"></i>
                <span className="nav-link-text">Notice Board</span>
              </Link>
            </li>

            <li>
              <Link to="/home-work">
                <i className="fal fa-book-reader"></i>
                <span className="nav-link-text">Homework</span>
              </Link>
            </li>

            <li>
              <Link to="/live-class">
                <i className="fal fa-camcorder"></i>
                <span className="nav-link-text">Live Classes</span>
              </Link>
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

export default SidebarStudent;
