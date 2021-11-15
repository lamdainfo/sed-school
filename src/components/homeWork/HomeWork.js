import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import { postRequest } from "../../axios";

import HomeWorkDetail from "./HomeWorkDetail";

const { Content } = Layout;

const HomeWork = () => {
  const [btnLoading, setBtnLoading] = useState(false);
  const [apiLoading, setApiLoading] = useState(false);
  const [homeWorkList, setHomeWorkList] = useState([]);
  const [paginationData, setPaginationData] = useState([]);

  return (
    <main id="js-page-content" role="main" className="page-content">
      <div id="content">
        <div className="subheader">
          <h1 className="subheader-title">
            <i className="subheader-icon fal fa-clipboard"></i>{" "}
            <span class="fw-300">Homework</span>
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
                <h2>Homework</h2>{" "}
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
                    <div class="card-body">
                      <img
                        src="https://schoolonweb-private.s3.ap-south-1.amazonaws.com/uploads/2222222/image/52c08ac4b46b504749e57e15ce1112ad2ed50a68.jpeg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&amp;X-Amz-Algorithm=AWS4-HMAC-SHA256&amp;X-Amz-Credential=AKIA5FCGLRFPOLTY3PA5%2F20211111%2Fap-south-1%2Fs3%2Faws4_request&amp;X-Amz-Date=20211111T153605Z&amp;X-Amz-SignedHeaders=host&amp;X-Amz-Expires=3600&amp;X-Amz-Signature=3c92ee0ec0fa653f46e3321ab5118b6f1b01f7a1070b2769d35a8b1727439a5b"
                        class="profile-image rounded-circle"
                      />

                      <span class="badge card-title">
                        {" "}
                        <strong> MATHEMATICS</strong>
                      </span>
                      <br />
                      <span class="badge badge-primary"> II-A</span>
                      <span class="d-block">
                        <strong>More addition and subtraction</strong>
                      </span>

                      <div class="frame-wrap mb-2">
                        <span class="d-block text-muted">
                          Posted By : CHANDRANI SEN
                        </span>

                        <span class="d-block text-muted">
                          Approved By : PRIDE ADMIN
                        </span>

                        <span class="d-block text-muted">
                          <i class="fas fa-sm fa-angle-double-right text-warning"></i>
                          Assigned On : 04 August &nbsp;
                          <i class="fas fa-sm fa-angle-double-right  text-warning ml-2"></i>
                          Submit By : 04 August
                        </span>
                      </div>

                      <HomeWorkDetail />

                      <a
                        href="#"
                        target="_blank"
                        class="btn btn-sm btn-success ml-2"
                      >
                        VIEW SUBMITTED HOMEWORK
                      </a>
                    </div>
                    <div class="card-footer text-muted py-2">
                      <a
                        href="#"
                        class="text-primary mr-2"
                        onclick="showHWLikes('b0ZJbUdXV1NVQUZMMEVrbFplYVAyUT09')"
                      >
                        2<i class="fas fa-thumbs-up "></i>
                      </a>

                      <a href="#" class="text-primary mr-2">
                        0<i class="fal fa-comment ml-1"></i>
                      </a>

                      <a href="#" class="text-primary mr-2">
                        2<i class="fas fa-paperclip"></i>
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

export default HomeWork;
