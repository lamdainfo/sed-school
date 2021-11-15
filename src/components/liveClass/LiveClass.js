import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import { postRequest } from "../../axios";

const { Content } = Layout;

const LiveClass = () => {
  const [btnLoading, setBtnLoading] = useState(false);
  const [apiLoading, setApiLoading] = useState(false);
  const [noticeBoardList, setNoticeBoardList] = useState([]);
  const [paginationData, setPaginationData] = useState([]);

  return (
    <main id="js-page-content" role="main" className="page-content">
      <div id="content">
        <div className="subheader">
          <h1 className="subheader-title">
            <i className="subheader-icon fal fa-clipboard"></i>{" "}
            <span class="fw-300">Live Classes</span>
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
                <h2>Live Classes List</h2>
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
                        <strong>ENGLISH</strong>
                      </span>
                      <br />{" "}
                      <span
                        className="badge text-white "
                        style={{ backgroundColor: "#0025FF" }}
                      >
                        V-A
                      </span>{" "}
                      <div className="frame-wrap mb-2">
                        <span className="d-block text-muted">
                          <i className="fas fa-sm fa-angle-double-right text-warning"></i>
                          Live Class ID : 25 October
                        </span>
                      </div>
                      <div className="frame-wrap mb-2">
                        <span className="d-block text-muted">
                          <i className="fas fa-sm fa-angle-double-right text-warning"></i>
                          Class Scheduled At : 25 October
                        </span>
                      </div>
                      <div className="frame-wrap mb-2">
                        <span className="d-block text-muted">
                          <i className="fa fa-sm fa-angle-double-right text-warning"></i>
                          Duration : 25 October
                        </span>
                      </div>
                      <div className="frame-wrap mb-2">
                        <span className="d-block text-muted">
                          <i className="fas fa-sm fa-angle-double-right text-warning"></i>
                          Created At : 25 October
                        </span>
                      </div>
                    </div>

                    <div class="card-footer text-muted py-2">
                      <span id="attd083am5IMjhJZEN4VTJHRFdWWE1uQT09">0</span> /
                      7 / 7 <i class="fal fa-user-alt mr-2"></i>
                      &nbsp;&nbsp;|&nbsp;&nbsp;
                      <a href="javascript:void(0);">
                        <i class="fas fa-trash-alt text-danger mr-2"></i>
                      </a>
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
};

export default LiveClass;
