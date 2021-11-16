import React, { useState, useEffect } from "react";
import { postRequest } from "../../axios";

import NoticeBoardDetail from "./NoticeBoardDetail";

const NoticeBoard = () => {
  // const [btnLoading, setBtnLoading] = useState(false);
  // const [apiLoading, setApiLoading] = useState(false);
  const [noticeBoardList, setNoticeBoardList] = useState([]);
  const [paginationData, setPaginationData] = useState([]);

  useEffect(() => {
    getNoticeBoardList();
  }, []);

  const getNoticeBoardList = async () => {
    const response = await postRequest("get-all-notice-board-information", {
      scode: "RDRzM3N0VXRJT0p6LzRCcnFTakZqQT09",
    });
    setNoticeBoardList(response.data.response.noticeinfo);
    setPaginationData(response.data.paginationData);
  };

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
                  alt="loadingStuff"
                  style={{ marginLeft: "41%", display: "none" }}
                  width="100"
                />
              </h4>
              <div className="panel-container">
                <div className="panel-content">
                  {noticeBoardList &&
                    noticeBoardList.map((noticeBoard) => {
                      return (
                        <div className="card border mb-2" key={noticeBoard.id}>
                          <div className="card-body">
                            <img
                              src={noticeBoard.published_by_image}
                              className="profile-image rounded-circle"
                              alt="publish-by"
                            />{" "}
                            <span className="badge card-title">
                              {" "}
                              <strong>{noticeBoard.subject}</strong>
                            </span>
                            <br />{" "}
                            <span
                              className="badge text-white "
                              style={{ backgroundColor: "#0025FF" }}
                            >
                              {noticeBoard.category}
                            </span>{" "}
                            <span className="d-block text-muted">
                              Posted By : {noticeBoard.published_by}
                            </span>
                            <div className="frame-wrap mb-2">
                              {" "}
                              <span className="d-block text-muted">
                                <i className="fas fa-sm fa-angle-double-right text-warning"></i>{" "}
                                Posted On : {noticeBoard.posted_on}
                              </span>{" "}
                            </div>
                            <NoticeBoardDetail
                              noticeBoardDetail={noticeBoard}
                            />
                          </div>
                          <div className="card-footer text-muted py-2">
                            {" "}
                            <span className="text-primary">
                              {noticeBoard.total_like}{" "}
                              <i className="fal fa-thumbs-up"></i>
                            </span>{" "}
                            &nbsp;&nbsp;{" "}
                            <span className="text-primary">
                              {noticeBoard.comment_count}{" "}
                              <i className="fal fa-comment"></i>
                            </span>{" "}
                            &nbsp;&nbsp;{" "}
                            <span className="text-primary">
                              {noticeBoard.documents_count}{" "}
                              <i className="fal fa-paperclip"></i>
                            </span>{" "}
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

export default NoticeBoard;
