import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { Space } from "antd";
import { postRequest } from "../../axios";

import HomeWorkDetail from "./HomeWorkDetail";
import HomeWorkLikeList from "./HomeWorkLikeList";
import HomeWorkFilter from "./HomeWorkFilter";

import {
  getSessionData,
  getSchoolData,
  getUserType,
} from "../../utils/Helpers";
import userIcon from "../../images/userIcon.jpg";

const HomeWork = (props) => {
  const [homeWorkList, setHomeWorkList] = useState([]);
  const [paginationData, setPaginationData] = useState({
    page: 1,
  });

  const [filterData, setFilterData] = useState({
    class_code: "",
    filter_date: "",
    subject: "",
    is_assignment: 0,
    is_submission: 0,
  });

  useEffect(() => {
    getHomeWorkList(1);
  }, []);

  const getHomeWorkList = async (page) => {
    const response = await postRequest("get-all-homework", {
      sid: getSessionData().code,
      school_code: getSchoolData().school_code,
      page: page,
      ...filterData,
    });
    setHomeWorkList(
      response.data.response && response.data.response.homework_list
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

  const handleFilterChangeFilterDate = (date, dateString) => {
    if (date === null) {
      setFilterData({
        ...filterData,
        filter_date: "",
        is_assignment: 0,
        is_submission: 0,
      });
    } else {
      setFilterData({
        ...filterData,
        filter_date: date !== null ? moment(date).format("YYYY-MM-DD") : "",
      });
    }
  };

  const handleFilterChangeDateType = (e) => {
    setFilterData({
      ...filterData,
      is_assignment: e.target.value === "is_assignment" ? "1" : "0",
      is_submission: e.target.value === "is_submission" ? "1" : "0",
    });
  };

  const handleFilterSelectChange = (field, value) => {
    setFilterData({
      ...filterData,
      [field]: value !== undefined && value !== "" ? value : "",
    });
  };

  const applyFilter = () => {
    getHomeWorkList(1);
  };

  return (
    <main id="js-page-content" role="main" className="page-content">
      <div id="content">
        <div className="subheader">
          <h1 className="subheader-title">
            <i className="subheader-icon fal fa-clipboard"></i>{" "}
            <span className="fw-300">Homework</span>
          </h1>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div id="panel-1" className="panel">
              <div className="panel-hdr">
                <h2>Homework</h2>
                <div className="panel-toolbar">
                  <HomeWorkFilter
                    filterData={filterData}
                    handleFilterChangeFilterDate={handleFilterChangeFilterDate}
                    handleFilterSelectChange={handleFilterSelectChange}
                    handleFilterChangeDateType={handleFilterChangeDateType}
                    applyFilter={applyFilter}
                  />
                </div>
              </div>
              <div className="panel-container show">
                <div className="panel-content">
                  {homeWorkList &&
                    homeWorkList.map((homeWork) => {
                      return (
                        <div className="card border mb-2" key={homeWork.id}>
                          <div className="card-body">
                            <img
                              src={homeWork?.created_by_image}
                              alt="created-by-img"
                              className="profile-image rounded-circle"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = userIcon;
                              }}
                            />

                            <span className="badge card-title">
                              <strong> {homeWork?.subject}</strong>
                            </span>
                            <br />
                            {getUserType() === "staff" && (
                              <span className="badge badge-primary">
                                {homeWork?.class_code}
                              </span>
                            )}
                            <span className="d-block">
                              <strong>{homeWork?.topic}</strong>
                            </span>

                            <div className="frame-wrap mb-2">
                              <span className="d-block text-muted">
                                Posted By : {homeWork?.created_by}
                              </span>

                              {getUserType() === "staff" ? (
                                homeWork?.approved ? (
                                  <span className="d-block text-muted">
                                    Approved By : {homeWork?.approve_by}
                                  </span>
                                ) : (
                                  <span className="badge border border-danger text-danger badge-pill">
                                    NOT APPROVED
                                  </span>
                                )
                              ) : (
                                ""
                              )}

                              <span className="d-block text-muted">
                                <i className="fal fa-sm fa-angle-double-right text-warning"></i>
                                Assigned On : {homeWork?.assignment_date} &nbsp;
                                <i className="fal fa-sm fa-angle-double-right  text-warning ml-2"></i>
                                Submit By : {homeWork?.submission_date}
                              </span>
                            </div>

                            <HomeWorkDetail
                              homeWorkDetail={homeWork}
                              history={props.history}
                            />

                            {getUserType() === "staff" && homeWork?.approved === 0 && (
                              <Space>
                                <Link
                                  className="btn btn-sm btn-outline-info ml-2"
                                  to={{
                                    pathname: "/edit-home-work",
                                    query: { hid: homeWork?.id },
                                  }}
                                >
                                  Edit
                                </Link>
                              </Space>
                            )}
                          </div>

                          <div className="card-footer text-muted py-2">
                            <HomeWorkLikeList
                              homeWorkDetail={homeWork}
                              hideParent={false}
                            />
                            {homeWork.comment_enable ? (
                              <span className="text-primary mr-2 pointer">
                                {getUserType() === "staff"
                                  ? homeWork.comment_count
                                  : ""}
                                &nbsp;
                                {getUserType() === "staff" ? (
                                  <i
                                    className={
                                      homeWork.comment_count > 0
                                        ? "fas fa-comment"
                                        : "fal fa-comment"
                                    }
                                  ></i>
                                ) : (
                                  <i
                                    className={
                                      homeWork.is_user_comment
                                        ? "fas fa-comment"
                                        : "fal fa-comment"
                                    }
                                  ></i>
                                )}
                              </span>
                            ) : (
                              ""
                            )}
                            <span className="text-primary mr-2">
                              {getUserType() === "staff"
                                ? homeWork.documents_count
                                : ""}
                              &nbsp;
                              <i
                                className={
                                  homeWork.documents_count > 0
                                    ? "fas fa-paperclip"
                                    : "fal fa-paperclip"
                                }
                              ></i>
                            </span>{" "}
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

export default HomeWork;
