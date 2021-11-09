import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Layout } from "antd";

const { Sider } = Layout;

class Sidebar extends Component {
  state = {
    authUser: "",
    currentRoute: "",
  };

  async componentDidMount() {}

  render() {
    const { currentRoute } = this.state;

    return (
      <>
        <aside className="page-sidebar">
          <div className="page-logo">
            <Link to="\">
              <img
                src="https://dev.lamdainfotech.com/parentlogin/img/logo.png"
                alt="School eDiary"
                aria-roledescription="logo"
              />
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
                  tabindex="0"
                />
                <a
                  href="#"
                  onclick="return false;"
                  className="btn-primary btn-search-close js-waves-off"
                  data-action="toggle"
                  data-className="list-filter-active"
                  data-target=".page-sidebar"
                >
                  <i className="fal fa-chevron-up"></i>
                </a>
              </div>
            </div>

            <div className="info-card">
              <img
                src="https://schoolonweb-private.s3.ap-south-1.amazonaws.com/uploads/2222222/image/57c3c0cf71b0b5dd4ac45538bd124eb2d2ca0c96.png?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&amp;X-Amz-Algorithm=AWS4-HMAC-SHA256&amp;X-Amz-Credential=AKIA5FCGLRFPOLTY3PA5%2F20211109%2Fap-south-1%2Fs3%2Faws4_request&amp;X-Amz-Date=20211109T101322Z&amp;X-Amz-SignedHeaders=host&amp;X-Amz-Expires=3600&amp;X-Amz-Signature=762b40b2eccbc47a7154953e006f8dd564b51fa1a62b2528507e3301547d4d92"
                className="profile-image rounded-circle"
                alt="School Logo"
              />
              <div className="info-card-text">
                <a className="d-flex align-items-center text-white">
                  <span className="text-truncate text-truncate-sm d-inline-block">
                    ABHIDHANI MANDAL
                  </span>
                </a>
                <span className="d-inline-block text-truncate text-truncate-sm">
                  Class : II-A
                  <br />
                  Roll No. : 1
                </span>
              </div>
              <img
                src="https://dev.lamdainfotech.com/parentlogin/img/card-backgrounds/cover-2-lg.png"
                className="cover"
                alt="cover"
              />
              <a
                href="#"
                onclick="return false;"
                className="pull-trigger-btn"
                data-action="toggle"
                data-className="list-filter-active"
                data-target=".page-sidebar"
                data-focus="nav_filter_input"
              >
                <i className="fal fa-angle-down"></i>
              </a>
            </div>

            <ul id="js-nav-menu" className="nav-menu">
              <li>
                <a
                  href="https://dev.lamdainfotech.com/parentlogin/dashboard?authToken=S0krRzRwTXB6Q3pQWlp3eFdFYXlhdz09&amp;dToken=UGREUmZjMzVJa09WYVY4eVUzZXV3Z092Y2w3TGlSSm9hQVN5dEc5S2w0cz0="
                  title="Dashboard"
                  data-filter-tags="dashboard"
                >
                  <i className="fal fa-home"></i>
                  <span className="nav-link-text" data-i18n="nav.dashboard">
                    Dashboard
                  </span>
                </a>
              </li>

              <li>
                <a
                  href="https://dev.lamdainfotech.com/parentlogin/noticeboard/all?authToken=S0krRzRwTXB6Q3pQWlp3eFdFYXlhdz09&amp;dToken=UGREUmZjMzVJa09WYVY4eVUzZXV3Z092Y2w3TGlSSm9hQVN5dEc5S2w0cz0="
                  title="Notice Board"
                  data-filter-tags="notice board"
                >
                  <i className="fal fa-file-edit"></i>
                  <span className="nav-link-text" data-i18n="nav.notice_board">
                    Notice Board
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="https://dev.lamdainfotech.com/parentlogin/homework/all?authToken=S0krRzRwTXB6Q3pQWlp3eFdFYXlhdz09&amp;dToken=UGREUmZjMzVJa09WYVY4eVUzZXV3Z092Y2w3TGlSSm9hQVN5dEc5S2w0cz0="
                  title="Homework"
                  data-filter-tags="homework"
                >
                  <i className="fal fa-book-reader"></i>
                  <span className="nav-link-text" data-i18n="nav.homework">
                    Homework
                  </span>
                </a>
              </li>

              <li>
                <a
                  href="https://dev.lamdainfotech.com/parentlogin/live-class?authToken=S0krRzRwTXB6Q3pQWlp3eFdFYXlhdz09&amp;dToken=UGREUmZjMzVJa09WYVY4eVUzZXV3Z092Y2w3TGlSSm9hQVN5dEc5S2w0cz0="
                  title="Live Classes"
                  data-filter-tags="live classes"
                >
                  <i className="fal fa-camcorder"></i>
                  <span className="nav-link-text">Live Classes</span>
                </a>
              </li>

              <li>
                <a
                  href="https://dev.lamdainfotech.com/parentlogin/fees?authToken=S0krRzRwTXB6Q3pQWlp3eFdFYXlhdz09&amp;dToken=UGREUmZjMzVJa09WYVY4eVUzZXV3Z092Y2w3TGlSSm9hQVN5dEc5S2w0cz0="
                  title="Fees"
                  data-filter-tags="fees"
                >
                  <i className="fal fa-receipt"></i>
                  <span className="nav-link-text" data-i18n="nav.fees">
                    Fees
                  </span>
                </a>
              </li>
            </ul>
          </nav>
        </aside>
      </>
    );
  }
}

export default withRouter(Sidebar);
