import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { postRequest } from "../../axios";

import SubmitedHomeWorkBlock from "./SubmitedHomeWorkBlock";
import { getSessionData } from "../../utils/Helpers";
import userIcon from "../../images/userIcon.jpg";

const SubmitedHomeWork = (props) => {
  const queryString = props.history.location.query;

  if (queryString === undefined || queryString.hid === undefined) {
    props.history.push("/dashboard");
  }

  const [homeWorkDetail, setHomeWorkDetail] = useState([]);
  const [homeWorkList, setHomeWorkList] = useState([]);
  const [paginationData, setPaginationData] = useState({
    page: 1,
  });

  useEffect(() => {
    getHomeWork();
  }, [props]);

  const getHomeWork = async (hid) => {
    const response = await postRequest("get-single-homework", {
      hid: queryString?.hid,
    });
    setHomeWorkDetail(response.data.response);
    getHomeWorkList(1);
  };

  const getHomeWorkList = async (page) => {
    const response = await postRequest("get-all-submitted-homework", {
      session_code: getSessionData().code,
      hid: queryString.hid,
      page: page,
    });
    setHomeWorkList(response.data.response.homework_list);
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
            <i className="subheader-icon fal fa-clipboard"></i> Homework
            <span className="fw-300"> Submit</span>
          </h1>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div id="panel-1" className="panel">
              <div className="panel-hdr">
                <h2>Homework Submit</h2>
                <div className="panel-toolbar">
                  <Link
                    to="/home-work"
                    className="btn btn-sm btn-default waves-effect waves-themed"
                  >
                    <i className="fal fa-arrow-left"></i> Back
                  </Link>
                </div>
              </div>
              <div className="panel-container show">
                <div className="panel-content">
                  <div className="card border mb-2" key={homeWorkDetail.id}>
                    <div className="card-body">
                      <img
                        src={homeWorkDetail?.created_by_image}
                        alt="created-by-img"
                        className="profile-image rounded-circle"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = userIcon;
                        }}
                      />

                      <span className="badge card-title">
                        {" "}
                        <strong> {homeWorkDetail?.subject}</strong>
                      </span>
                      <br />
                      <span className="badge badge-primary">
                        {" "}
                        {homeWorkDetail?.class_code}
                      </span>
                      <span className="d-block">
                        <strong>{homeWorkDetail?.topic}</strong>
                      </span>

                      <div className="frame-wrap mb-2">
                        <span className="d-block text-muted">
                          Posted By : {homeWorkDetail?.created_by}
                        </span>

                        {homeWorkDetail?.approved ? (
                          <span className="d-block text-muted">
                            Approved By : {homeWorkDetail?.approve_by}
                          </span>
                        ) : (
                          <span className="badge border border-danger text-danger badge-pill">
                            NOT APPROVED
                          </span>
                        )}

                        <span className="d-block text-muted">
                          <i className="fal fa-sm fa-angle-double-right text-warning"></i>
                          Assigned On : {homeWorkDetail?.assignment_date} &nbsp;
                          <i className="fal fa-sm fa-angle-double-right  text-warning ml-2"></i>
                          Submit By : {homeWorkDetail?.submission_date}
                        </span>
                      </div>
                    </div>
                  </div>

                  {homeWorkList &&
                    homeWorkList.map((homeWork, lid) => {
                      return (
                        <SubmitedHomeWorkBlock
                          homeWorkDetail={homeWork}
                          key={lid}
                        />
                      );
                    })}

                  {homeWorkList && homeWorkList.length === 0 && (
                    <div className="alert alert-warning ">
                      No Submited Home Work Found!
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
                                paginationData.record_per_page >
                              paginationData.total_record
                                ? paginationData.total_record
                                : paginationData.current *
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

export default SubmitedHomeWork;
