import React, { useState, useEffect } from "react";
import { postRequest } from "../../axios";

import NoticeBoardDetail from "./NoticeBoardDetail";
import NoticeBoardLikeList from "./NoticeBoardLikeList";
import { getSessionData, getUserType } from "../../utils/Helpers";

const NoticeBoard = () => {
  const [noticeBoardList, setNoticeBoardList] = useState([]);
  const [paginationData, setPaginationData] = useState({
    page: 1,
  });

  useEffect(() => {
    getNoticeBoardList(1);
  }, []);

  const getNoticeBoardList = async (page) => {
    const response = await postRequest("get-all-notice-board-information", {
      scode: getSessionData().code,
      page: page,
    });
    setNoticeBoardList(response.data.response.noticeinfo);
    setPaginationData(response.data.paginationData);
  };

  const handlePrevPage = () => {
    getNoticeBoardList(paginationData.current - 1);
  };

  const handleNextPage = () => {
    getNoticeBoardList(paginationData.current + 1);
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
                              style={{ backgroundColor: noticeBoard.category_bg_color }}
                            >
                              {noticeBoard.category}
                            </span>{" "}
                            <span className="d-block text-muted">
                              Posted By : {noticeBoard.published_by}
                            </span>
                            <span className="d-block text-muted">
                              Approved By : {noticeBoard.approved_by}
                            </span>
                            <div className="frame-wrap mb-2">
                              {" "}
                              <span className="d-block text-muted">
                                <i className="fal fa-sm fa-angle-double-right text-warning"></i>{" "}
                                Posted On : {noticeBoard.posted_on}
                              </span>{" "}
                            </div>
                            <NoticeBoardDetail
                              noticeBoardDetail={noticeBoard}
                            />
                          </div>
                          <div className="card-footer text-muted py-2">
                            <NoticeBoardLikeList
                              noticeBoardDetail={noticeBoard}
                              hideParent={false}
                            />
                            <span className="text-primary mr-2">
                              {getUserType() === "staff"
                                ? noticeBoard.comment_count
                                : ""}&nbsp;
                              <i
                                className={
                                  noticeBoard.comment_count > 0
                                    ? "fas fa-comment"
                                    : "fal fa-comment"
                                }
                              ></i>
                            </span>
                            <span className="text-primary mr-2">
                              {getUserType() === "staff"
                                ? noticeBoard.documents_count
                                : ""}{" "}
                              <i
                                className={
                                  noticeBoard.documents_count > 0
                                    ? "fas fa-paperclip"
                                    : "fal fa-paperclip"
                                }
                              ></i>
                            </span>{" "}
                          </div>
                        </div>
                      );
                    })}

                  {noticeBoardList && noticeBoardList.length === 0 && (
                    <div className="alert alert-warning">
                      No Notice Board List Found!
                    </div>
                  )}

                  {noticeBoardList && noticeBoardList.length > 0 && (
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

export default NoticeBoard;
