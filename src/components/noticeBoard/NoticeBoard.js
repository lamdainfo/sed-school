import React, { Component } from "react";
import { Layout } from "antd";
import NoticeBoardDetail from "./NoticeBoardDetail";

const { Content } = Layout;

export default class NoticeBoard extends Component {
  state = {};

  render() {
    return (
      <main id="js-page-content" role="main" className="page-content">
        <div id="content">
          <div className="subheader">
            <h1 className="subheader-title">
              <i className="subheader-icon fal fa-clipboard"></i>
              <span className="fw-300"> Notice Board</span>
              <span id="filterBtn" style={{ float: "right" }}>
                <button className="btn btn-sm btn-primary waves-effect waves-themed">
                  <i className="fal fa-filter"></i> Filter
                </button>
              </span>
            </h1>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div id="panel-1" className="panel">
                <div className="panel-hdr">
                  <h2>Notice Board</h2>{" "}
                </div>
                <h4>
                  <img
                    src="https://dev.lamdainfotech.com/parentlogin/img/ajax-loader.gif"
                    id="loadingStuff"
                    style={{ marginLeft: "41%", display: "none" }}
                    width="100"
                  />
                </h4>
                <div className="panel-container show" id="loadData">
                  <div className="panel-content" id="loadData">
                    <div className="card border mb-2">
                      <div className="card-body">
                        <img
                          src="https://schoolonweb-private.s3.ap-south-1.amazonaws.com/uploads/2222222/image/63b45c31626394532b39e78c38fc924c91cb78bd.jpeg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&amp;X-Amz-Algorithm=AWS4-HMAC-SHA256&amp;X-Amz-Credential=AKIA5FCGLRFPOLTY3PA5%2F20211111%2Fap-south-1%2Fs3%2Faws4_request&amp;X-Amz-Date=20211111T085052Z&amp;X-Amz-SignedHeaders=host&amp;X-Amz-Expires=3600&amp;X-Amz-Signature=7157fda28b90d978900e890925fbd80de19a98209142102ca4d01199b683beac"
                          className="profile-image rounded-circle"
                        />{" "}
                        <span className="badge card-title">
                          {" "}
                          <strong>
                            SUBMISSION OF SA-1 EXAM ANSWER NOTEBOOKS (class 1 to
                            Class 5 only)
                          </strong>
                        </span>
                        <br />{" "}
                        <span
                          className="badge text-white "
                          style={{ backgroundColor: "#0025FF" }}
                        >
                          EXAMINATION
                        </span>{" "}
                        <span className="d-block text-muted">
                          Posted By : ADMIN
                        </span>
                        <div className="frame-wrap mb-2">
                          {" "}
                          <span className="d-block text-muted">
                            <i className="fas fa-sm fa-angle-double-right text-warning"></i>{" "}
                            Posted On : 25 October
                          </span>{" "}
                        </div>
                        <NoticeBoardDetail />
                      </div>
                      <div className="card-footer text-muted py-2">
                        {" "}
                        <span className="text-primary">
                          <i className="fal fa-thumbs-up"></i>
                        </span>{" "}
                        &nbsp;&nbsp;{" "}
                        <span className="text-primary">
                          <i className="fal fa-comment"></i>
                        </span>{" "}
                        &nbsp;&nbsp;{" "}
                        <span className="text-primary">
                          <i className="fal fa-paperclip"></i>
                        </span>{" "}
                      </div>
                    </div>
                    <div>
                      <div className="dataTables_wrapper">
                        <div className="row">
                          <div className="col-md-5">
                            <div
                              className="dataTables_info"
                              id="dt_basic_info"
                              role="status"
                              style={{ paddingLeft: "10px" }}
                              aria-live="polite"
                            >
                              Showing 1 to 10 of 29 entries
                            </div>
                          </div>
                          <div className="col-md-7">
                            <div
                              className="dataTables_paginate paging_simple_numbers"
                              id="dt_basic_paginate"
                            >
                              <ul
                                className="pagination"
                                style={{ paddingRight: "10px" }}
                              >
                                <li
                                  className="paginate_button page-item previous disabled"
                                  id="prevBtn"
                                >
                                  {" "}
                                  <a href="#" className="page-link">
                                    <i className="fal fa-chevron-left"></i>
                                  </a>{" "}
                                </li>
                                <li
                                  className="paginate_button page-item next"
                                  id="nextBtn"
                                >
                                  {" "}
                                  <a href="#" className="page-link">
                                    <i className="fal fa-chevron-right"></i>
                                  </a>{" "}
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
