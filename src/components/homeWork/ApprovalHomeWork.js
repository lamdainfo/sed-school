import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import { postRequest } from "../../axios";

import HomeWorkDetail from "./HomeWorkDetail";
import { getSessionData } from "../../utils/Helpers";

const { Content } = Layout;

const ApprovalHomeWork = () => {
  const [btnLoading, setBtnLoading] = useState(false);
  const [apiLoading, setApiLoading] = useState(false);
  const [homeWorkList, setHomeWorkList] = useState([]);
  const [paginationData, setPaginationData] = useState([]);

  useEffect(() => {
    getHomeWorkList();
  }, []);

  const getHomeWorkList = async () => {
    const response = await postRequest("pending-approval-homework-list", {
      scode: getSessionData().code,
      filter_date: "26/11/2021",
    });
    setHomeWorkList(response.data.response.homework_list);
    setPaginationData(response.data.paginationData);
  };

  return (
    <main id="js-page-content" role="main" className="page-content">
      <div id="content">
        <div className="subheader">
          <h1 className="subheader-title">
            <i className="subheader-icon fal fa-clipboard"></i>{" "}
            <span class="fw-300">Homework Approval List</span>
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
              <div className="panel-container show">
                <div className="panel-content">
                  {homeWorkList &&
                    homeWorkList.map((homeWork) => {
                      return (
                        <div className="card border mb-2">
                          <div class="card-body">
                            <img
                              src={homeWork?.created_by_image}
                              class="profile-image rounded-circle"
                            />

                            <span class="badge card-title">
                              {" "}
                              <strong> {homeWork?.subject}</strong>
                            </span>
                            <br />
                            <span class="badge badge-primary">
                              {" "}
                              {homeWork?.class_code}
                            </span>
                            <span class="d-block">
                              <strong>{homeWork?.topic}</strong>
                            </span>

                            <div class="frame-wrap mb-2">
                              <span class="d-block text-muted">
                                Posted By : {homeWork?.created_by}
                              </span>

                              {homeWork?.approved ? (
                                <span class="d-block text-muted">
                                  Approved By : {homeWork?.approve_by}
                                </span>
                              ) : (
                                <span class="badge border border-danger text-danger badge-pill">
                                  NOT APPROVED
                                </span>
                              )}

                              <span class="d-block text-muted">
                                <i class="fal fa-sm fa-angle-double-right text-warning"></i>
                                Assigned On : {homeWork?.assignment_date} &nbsp;
                                <i class="fal fa-sm fa-angle-double-right  text-warning ml-2"></i>
                                Submit By : {homeWork?.submission_date}
                              </span>
                            </div>

                            <HomeWorkDetail homeWorkDetail={homeWork} />
                          </div>
                          <div class="card-footer text-muted py-2">
                            <a
                              href="#"
                              class="text-primary mr-2"
                              onclick="showHWLikes('b0ZJbUdXV1NVQUZMMEVrbFplYVAyUT09')"
                            >
                              {homeWork?.total_like}
                              <i class="fal fa-thumbs-up "></i>
                            </a>

                            <a href="#" class="text-primary mr-2">
                              {homeWork?.comment_count}
                              <i class="fal fa-comment ml-1"></i>
                            </a>

                            <a href="#" class="text-primary mr-2">
                              {homeWork?.documents_count}
                              <i class="fal fa-paperclip"></i>
                            </a>
                          </div>
                        </div>
                      );
                    })}
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

export default ApprovalHomeWork;
