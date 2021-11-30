import React, { useState, useEffect } from "react";
import { postRequest } from "../../axios";

import NoticeBoardDetail from "./NoticeBoardDetail";
import NoticeBoardLikeList from "./NoticeBoardLikeList";
import { getSessionData, getUserType } from "../../utils/Helpers";
import { Link } from "react-router-dom";

const NoticeBoardDashboard = () => {
  const [noticeBoardList, setNoticeBoardList] = useState([]);
  useEffect(() => {
    getNoticeBoardList(1);
  }, []);

  const getNoticeBoardList = async (page) => {
    const response = await postRequest("get-all-notice-board-information", {
      scode: getSessionData().code,
      first: "5",
    });
    setNoticeBoardList(response.data.response.noticeinfo);
  };

  return (
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
                        <NoticeBoardDetail noticeBoardDetail={noticeBoard} />
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
                <div class="text-right text-primary">
                  <Link to="/notice-board">
                    <span class="btn btn-sm btn-warning waves-effect waves-themed">
                      {" "}
                      View more...{" "}
                    </span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeBoardDashboard;
