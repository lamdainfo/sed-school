import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import { postRequest } from "../../axios";

import { getUserType } from "../../utils/Helpers";
import { Link } from "react-router-dom";

const { Content } = Layout;

const LiveClass = () => {
  const [btnLoading, setBtnLoading] = useState(false);
  const [apiLoading, setApiLoading] = useState(false);
  const [liveClassList, setLiveClassList] = useState([]);
  const [paginationData, setPaginationData] = useState([]);

  useEffect(() => {
    getLiveClassList();
  }, []);

  const getLiveClassList = async () => {
    const getClassResponse = await postRequest("live-class-list-staff", {
      filterDate: "25/11/2021",
      page: 1,
    });
    setLiveClassList(getClassResponse.data.response.live_classes);
    setPaginationData(getClassResponse.data.paginationData);
  };

  const deleteLiveClass = async () => {
    // const getClassResponse = await postRequest("live-class-list-staff", {
    //   filterDate: "25/11/2021",
    //   page: 1,
    // });
    getLiveClassList()
   
  }; 

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
              <div className="panel-container show">
                <div className="panel-content">
                  {liveClassList &&
                    liveClassList.map((liveClass) => {
                      return (
                        <div className="card border mb-2">
                          <div className="card-body">
                            <img
                              src={liveClass.teacher_img}
                              className="profile-image rounded-circle"
                            />{" "}
                            <span className="badge card-title">
                              {" "}
                              <strong>{liveClass.subject_name}</strong>
                            </span>
                            <br />{" "}
                            <span
                              className="badge text-white "
                              style={{ backgroundColor: "#0025FF" }}
                            >
                              {liveClass.class_code}
                            </span>{" "}
                            <div className="frame-wrap mb-2">
                              <span className="d-block text-muted">
                                <i className="fal fa-sm fa-angle-double-right text-warning"></i>
                                Teacher Name : {liveClass.teacher_name}
                              </span>
                            </div>
                            <div className="frame-wrap mb-2">
                              <span className="d-block text-muted">
                                <i className="fal fa-sm fa-angle-double-right text-warning"></i>
                                Class Scheduled At :{" "}
                                {liveClass.live_class_date +
                                  " " +
                                  liveClass.start_time}
                              </span>
                            </div>
                            <div className="frame-wrap mb-2">
                              <span className="d-block text-muted">
                                <i className="fa fa-sm fa-angle-double-right text-warning"></i>
                                Duration : {liveClass.duration} Minutes
                              </span>
                            </div>
                            {liveClass.is_meeting_ready ? (
                              <a
                                href={
                                  getUserType() === "staff"
                                    ? liveClass.teacher_start_url
                                    : liveClass.join_url
                                }
                                class="btn btn-sm btn-default"
                              >
                                Join Class
                              </a>
                            ) : (
                              <a class="btn btn-sm btn-default">
                                Class Not Ready{" "}
                              </a>
                            )}
                          </div>

                          <div class="card-footer text-muted py-2">
                            {liveClass.totalAttend} / {liveClass.total_students}{" "}
                            &nbsp;
                            <i class="fal fa-user-alt mr-2"></i>
                            &nbsp;|&nbsp;&nbsp;
                            <Link onClick={() => deleteLiveClass()}>
                              <i class="fal fa-trash-alt text-danger mr-2"></i>
                            </Link>
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
                            Showing {paginationData.current} to{" "}
                            {paginationData.last} of{" "}
                            {paginationData.total_record} entries
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
