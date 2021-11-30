import React, { useState, useEffect } from "react";
import { postRequest } from "../../axios";

import HomeWorkDetail from "./HomeWorkDetail";
import { getSessionData } from "../../utils/Helpers";

const ApprovalHomeWork = () => {
  const [homeWorkList, setHomeWorkList] = useState([]);
  const [paginationData, setPaginationData] = useState({
    page: 1,
  });

  useEffect(() => {
    getHomeWorkList(1);
  }, []);

  const getHomeWorkList = async (page) => {
    const response = await postRequest("pending-approval-homework-list", {
      scode: getSessionData().code,
      filterDate: "",
      class_section: "",
      subject_id: "",
      page: page,
    });

    setHomeWorkList(
      response.data.response.homework_list
        ? response.data.response.homework_list
        : []
    );
    setPaginationData(response.data.paginationData);
  };

  const handlePrevPage = () => {
    getHomeWorkList(paginationData.current - 1);
  };

  const handleNextPage = () => {
    getHomeWorkList(paginationData.current + 1);
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
                              alt="created-by-img"
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
                        </div>
                      );
                    })}

                  {homeWorkList && homeWorkList.length === 0 && (
                    <div className="alert alert-warning ">
                      No Home Work List Found!
                    </div>
                  )}

                  {homeWorkList && homeWorkList.length > 0 && (
                    <div>
                      <div className="dataTables_wrapper mt-3">
                        <div className="row">
                          <div className="col-md-5">
                            <div className="dataTables_info">
                              Showing{" "}
                              {paginationData.current === 1
                                ? "1"
                                : (paginationData.current - 1) * 10 + 1}{" "}
                              to{" "}
                              {paginationData.current *
                                paginationData.record_per_page}{" "}
                              of {paginationData.total_record} entries
                            </div>
                          </div>
                          <div className="col-md-7 right">
                            <div className="dataTables_paginate paging_simple_numbers">
                              <ul className="pagination">
                                <li
                                  className={
                                    paginationData.prev === ""
                                      ? "paginate_button page-item previous disabled"
                                      : "paginate_button page-item previous"
                                  }
                                >
                                  <a
                                    onClick={handlePrevPage}
                                    className="page-link"
                                  >
                                    <i className="fal fa-chevron-left"></i>
                                  </a>
                                </li>
                                <li
                                  className={
                                    paginationData.next === ""
                                      ? "paginate_button page-item next disabled"
                                      : "paginate_button page-item next"
                                  }
                                >
                                  <a
                                    onClick={handleNextPage}
                                    className="page-link"
                                  >
                                    <i className="fal fa-chevron-right"></i>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
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
