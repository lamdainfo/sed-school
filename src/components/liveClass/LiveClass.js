import React, { useState, useEffect } from "react";
import moment from "moment";
import { Popconfirm } from "antd";
import { CheckCircleTwoTone } from "@ant-design/icons";

import { postRequest } from "../../axios";
import { getUserType } from "../../utils/Helpers";
import {
  SuccessNotificationMsg,
  ErrorNotificationMsg,
} from "../../utils/NotificationHelper";

import LiveClassAttendentList from "./LiveClassAttendentList";
import LiveClassFilter from "./LiveClassFilter";
import LiveClassButton from "./LiveClassButton";
import userIcon from "../../images/userIcon.jpg";

const LiveClass = (props) => {
  const [popConfirmShowStatus, setPopConfirmShowStatus] = useState(false);
  const [editIndexStatus, setEditIndexStatus] = useState(null);
  const [liveClassList, setLiveClassList] = useState([]);
  const [filterApply, setFilterApply] = useState(false);
  const [paginationData, setPaginationData] = useState({
    page: 1,
  });

  const initFilter = {
    filterDate: moment().format("DD/MM/YYYY"),
  };
  const [filterData, setFilterData] = useState(initFilter);

  useEffect(
    (props) => {
      getLiveClassList(1, true);
    },
    [props]
  );

  const getLiveClassList = async (page, refresh = false) => {
    let apiName =
      getUserType() === "staff"
        ? "live-class-list-staff"
        : "live-class-list-student";

    if (refresh) {
      setFilterApply(false);
      setFilterData(initFilter);
      const getClassResponse = await postRequest(apiName, {
        page: page,
        ...initFilter,
      });
      setLiveClassList(
        getClassResponse.data.response &&
          getClassResponse.data.response.live_classes
          ? getClassResponse.data.response.live_classes
          : []
      );
      setPaginationData(getClassResponse.data.paginationData);
    } else {
      const getClassResponse = await postRequest(apiName, {
        page: page,
        ...filterData,
      });
      setLiveClassList(
        getClassResponse.data.response &&
          getClassResponse.data.response.live_classes
          ? getClassResponse.data.response.live_classes
          : []
      );
      setPaginationData(getClassResponse.data.paginationData);
    }
  };

  const deleteLiveClass = async (id) => {
    try {
      let res = await postRequest("live-class-delete", {
        id: id,
      });

      if (res.data.error === 0) {
        SuccessNotificationMsg("Success", res.data.errmsg);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        ErrorNotificationMsg("Error in delete live class");
        setPopConfirmShowStatus(false);
        setEditIndexStatus(null);
      }
    } catch (error) {
      ErrorNotificationMsg(error.message);
    }
  };

  const handlePrevPage = () => {
    getLiveClassList(paginationData.current - 1);
  };

  const handleNextPage = () => {
    getLiveClassList(paginationData.current + 1);
  };

  const showStatusPopconfirm = (index) => {
    setPopConfirmShowStatus(true);
    setEditIndexStatus(index);
  };

  const handleCancelPopConfirmStatus = () => {
    setPopConfirmShowStatus(false);
    setEditIndexStatus(null);
  };

  const handleFilterChangeFilterDate = (date, dateString) => {
    setFilterData({ ...filterData, filterDate: dateString });
  };

  const handleFilterSelectChange = (field, value) => {
    setFilterData({ ...filterData, [field]: value });
  };

  const applyFilter = () => {
    setFilterApply(true);
    getLiveClassList(1);
  };

  return (
    <main id="js-page-content" role="main" className="page-content">
      <div id="content">
        <div className="subheader">
          <h1 className="subheader-title">
            <i className="subheader-icon fal fa-clipboard"></i>{" "}
            <span className="fw-300">Live Classes </span>
          </h1>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div id="panel-1" className="panel">
              <div className="panel-hdr">
                <h2>Live Classes List</h2>
                <div className="panel-toolbar">
                  <LiveClassFilter
                    handleFilterChangeFilterDate={handleFilterChangeFilterDate}
                    handleFilterSelectChange={handleFilterSelectChange}
                    applyFilter={applyFilter}
                    filterApply={filterApply}
                  />
                </div>
              </div>
              <div className="panel-container show">
                <div className="panel-content">
                  {liveClassList &&
                    liveClassList.map((liveClass) => {
                      return (
                        <div className="card border mb-2" key={liveClass.id}>
                          <div className="card-body">
                            <img
                              src={liveClass.teacher_img}
                              alt="teacher-pic"
                              className="profile-image rounded-circle"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = userIcon;
                              }}
                            />
                            <span className="badge card-title">
                              {getUserType() !== "staff" && (
                                <span style={{ marginRight: "5px" }}>
                                  {liveClass.is_student_attend ? (
                                    <CheckCircleTwoTone twoToneColor="#52c41a" />
                                  ) : (
                                    <CheckCircleTwoTone twoToneColor="#eb2f96" />
                                  )}
                                </span>
                              )}
                              <strong>{liveClass.subject_name}</strong>
                            </span>
                            <br />{" "}
                            {getUserType() === "staff" && (
                              <span
                                className="badge text-white "
                                style={{ backgroundColor: "#0025FF" }}
                              >
                                {liveClass.class_code}
                              </span>
                            )}
                            <div className="frame-wrap mb-0">
                              <span className="d-block text-muted">
                                <i className="fal fa-sm fa-angle-double-right text-warning"></i>
                                <label>Teacher Name :</label>{" "}
                                {liveClass.teacher_name}
                              </span>
                            </div>
                            <div className="frame-wrap mb-0">
                              <span className="d-block text-muted">
                                <i className="fal fa-sm fa-angle-double-right text-warning"></i>
                                Class Scheduled At :{" "}
                                {liveClass.live_class_date +
                                  " " +
                                  liveClass.start_time}
                              </span>
                            </div>
                            <div className="frame-wrap mb-0">
                              <span className="d-block text-muted">
                                <i className="fa fa-sm fa-angle-double-right text-warning"></i>
                                Duration : {liveClass.duration} Minutes
                              </span>
                            </div>
                            {getUserType() !== "staff" && (
                              <div className="frame-wrap mb-2">
                                <span className="d-block text-muted">
                                  <i className="fa fa-sm fa-angle-double-right text-warning"></i>
                                  Remarks : {liveClass?.remarks}
                                </span>
                              </div>
                            )}
                            <LiveClassButton liveClassDetail={liveClass} />
                          </div>

                          {getUserType() === "staff" && (
                            <div className="card-footer text-muted py-2">
                              {liveClass.totalAttend} /{" "}
                              {liveClass.total_students}
                              <LiveClassAttendentList
                                liveClassDetail={liveClass}
                              />
                              {liveClass.totalAttend <= 0 ? (
                                editIndexStatus === liveClass.id ? (
                                  <>
                                    &nbsp;|&nbsp;&nbsp;
                                    <Popconfirm
                                      className="action"
                                      title={
                                        <div>
                                          Do you really want to delete ?<br />
                                          If a Zoom class is deleted then all
                                          other information related this will be
                                          delete.
                                        </div>
                                      }
                                      onConfirm={() =>
                                        deleteLiveClass(liveClass.id)
                                      }
                                      onCancel={() =>
                                        handleCancelPopConfirmStatus()
                                      }
                                      okText="Yes"
                                      placement="right"
                                      visible={popConfirmShowStatus}
                                    >
                                      <span
                                        onClick={() =>
                                          showStatusPopconfirm(liveClass.id)
                                        }
                                      >
                                        <i className="fas fa-trash-alt text-danger mr-2"></i>
                                      </span>
                                    </Popconfirm>
                                  </>
                                ) : (
                                  <>
                                    &nbsp;|&nbsp;&nbsp;
                                    <span
                                      onClick={() =>
                                        showStatusPopconfirm(liveClass.id)
                                      }
                                    >
                                      <i className="fas fa-trash-alt pointer text-danger mr-2"></i>
                                    </span>
                                  </>
                                )
                              ) : (
                                ""
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}

                  {liveClassList && liveClassList.length === 0 && (
                    <div className="alert alert-warning ">
                      No Live Class List Found for {filterData.filterDate}!
                    </div>
                  )}

                  {liveClassList && liveClassList.length > 0 && (
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

export default LiveClass;
