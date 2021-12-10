import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Space } from "antd";

import { postRequest } from "../../axios";
import { getSessionData, getUserType } from "../../utils/Helpers";
import NoticeBoardCommentPost from "./NoticeBoardCommentPost";

const CommentUI = ({ time, comment, userImg, cmt, refreshScreen, nid }) => {
  return (
    <div className="alert alert-info fade show px-3 py-2" role="alert">
      <div className="row">
        <div className="col-md-1">
          <img src={userImg} alt="User Photo" className="img-thumbnail" />
        </div>
        <div className="col-md-10">
          <h4>
            <i className="fal fa-comment-o"></i> <strong>{comment}</strong>
          </h4>
          <p>{time}</p>
        </div>
        <div className="col-md-1"></div>

        {cmt.reply?.length === 0 && getUserType() !== "staff" ? (
          <div>
            <NoticeBoardCommentPost
              commentType="comment"
              refreshScreen={refreshScreen}
              nid={nid}
              cid={cmt.id}
              commentText={comment}
              html={
                <button className="btn btn-sm btn-success waves-effect waves-themed">
                  Edit
                </button>
              }
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

const CommentReplyUI = (props) => {
  return (
    <div className="row justify-content-end">
      <div className="col-10">
        <div className="alert alert-success fade show px-3 py-2" role="alert">
          <div className="row">
            <div className="col-md-1">
              <img
                src={props.userImg}
                alt="User Photo"
                className="img-thumbnail"
              />
            </div>
            <div className="col-md-10">
              <h4>
                <i className="fal fa-reply"></i>{" "}
                <strong>{props.comment}</strong>
              </h4>
              <p>{props.time}</p>
            </div>
            <div className="col-md-1">
              {getUserType() === "staff" && (
                <NoticeBoardCommentPost
                  commentType="reply"
                  nid={props.nid}
                  cid={props.cid}
                  commentText={props.comment}
                  refreshScreen={props.refreshScreen}
                  html={
                    <button className="btn btn-sm btn-success waves-effect waves-themed">
                      Edit
                    </button>
                  }
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const NoticeBoardComment = (props) => {
  const [noticeBoardDetail, setNoticeBoardDetail] = useState(null);
  useEffect(() => {
    getNoticeBoard();
  }, []);

  const getNoticeBoard = async () => {
    const response = await postRequest("get-single-notice-board-information", {
      nid: props.match.params.nid,
      session_code: getSessionData().code,
    });
    setNoticeBoardDetail(response.data.response);
  };

  const refreshScreen = () => {
    getNoticeBoard();
  };

  return (
    <main id="js-page-content" role="main" className="page-content">
      <div id="content">
        <div className="subheader">
          <h1 className="subheader-title">
            <i className="subheader-icon fal fa-clipboard"></i>
            <span className="fw-300"> Notice Board Comment</span>
          </h1>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div id="panel-1" className="panel">
              <div className="panel-hdr">
                <h2>Notice Board Comment</h2>
                <div className="panel-toolbar">
                  <Space>
                    <Link
                      to="/notice-board"
                      className="btn btn-sm btn-info waves-effect waves-themed"
                    >
                      <i className="fal fa-clipboard-list"></i> View Notice
                      Board
                    </Link>
                  </Space>
                </div>
              </div>
              <div className="panel-container">
                <div className="panel-content">
                  <div className="panel-tag px-3 py-2">
                    Comments for : <strong>{noticeBoardDetail?.subject}</strong>
                    <br />
                    Category : &nbsp;
                    <span
                      className="badge text-white"
                      style={{
                        backgroundColor: noticeBoardDetail?.category_bg_color,
                      }}
                    >
                      {noticeBoardDetail?.category}
                    </span>
                    <br />
                    Posted on : <strong>{noticeBoardDetail?.posted_on}</strong>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      {noticeBoardDetail?.comment.map((cmt) => {
                        return (
                          <>
                            <CommentUI
                              time={cmt.time}
                              comment={cmt.description}
                              userImg={cmt.user.image}
                              cmt={cmt}
                              refreshScreen={refreshScreen}
                              nid={noticeBoardDetail?.id}
                            />

                            {cmt.reply &&
                              cmt.reply.map((rp) => {
                                return (
                                  <CommentReplyUI
                                    time={rp.updated_at}
                                    comment={rp.description}
                                    userImg={rp.user.image}
                                    nid={noticeBoardDetail?.id}
                                    cid={rp.id}
                                    refreshScreen={refreshScreen}
                                  />
                                );
                              })}

                            {cmt?.reply?.length === 0 &&
                            getUserType() === "staff" ? (
                              <div>
                                <NoticeBoardCommentPost
                                  commentType="reply"
                                  refreshScreen={refreshScreen}
                                  nid={noticeBoardDetail?.id}
                                  cid={cmt.id}
                                  html={
                                    <button className="btn btn-sm btn-success waves-effect waves-themed">
                                      Add Reply
                                    </button>
                                  }
                                />
                              </div>
                            ) : (
                              ""
                            )}
                          </>
                        );
                      })}
                    </div>
                  </div>

                  {noticeBoardDetail?.comment.length === 0 &&
                  getUserType() !== "staff" ? (
                    <div>
                      <NoticeBoardCommentPost
                        commentType="comment"
                        refreshScreen={refreshScreen}
                        nid={noticeBoardDetail?.id}
                        html={
                          <button className="btn btn-sm btn-success waves-effect waves-themed">
                            Add Comment
                          </button>
                        }
                      />
                    </div>
                  ) : (
                    ""
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

export default NoticeBoardComment;
