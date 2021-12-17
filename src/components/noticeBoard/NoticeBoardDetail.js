import React, { useState } from "react";
import { Modal } from "antd";

import { postRequest } from "../../axios";
import NoticeBoardLikeList from "./NoticeBoardLikeList";
import {
  getSessionData,
  getUserType,
  ShowDocumentPreview,
} from "../../utils/Helpers";

const NoticeBoardDetail = (props) => {
  const [showModel, setShowModel] = useState(false);
  const [noticeBoardDetail, setNoticeBoardDetail] = useState(null);

  const hideModelFunction = () => {
    setShowModel(false);
  };

  const showModelFunction = () => {
    setShowModel(true);
    getNoticeBoard();
  };

  const getNoticeBoard = async () => {
    const response = await postRequest("get-single-notice-board-information", {
      nid: props.noticeBoardDetail.id,
      session_code: getSessionData().code,
    });
    setNoticeBoardDetail(response.data.response);
  };

  return (
    <>
      <button
        className="btn btn-sm btn-outline-info"
        onClick={() => showModelFunction()}
      >
        OPEN
      </button>

      <Modal
        title="Notice Board Details"
        visible={showModel}
        onOk={hideModelFunction}
        okText="Close"
        onCancel={hideModelFunction}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <div className="row">
          <div className="col-md-4">
            <img
              src={noticeBoardDetail?.published_by_image}
              className="profile-image rounded-circle"
              alt="publish-by"
            />
            <span className="d-block">
              Posted On : <strong> {noticeBoardDetail?.posted_on}</strong>
            </span>
            <span className="d-block">
              Category :
              <span
                className="badge text-white"
                style={{
                  backgroundColor: noticeBoardDetail?.category_bg_color,
                }}
              >
                {noticeBoardDetail?.category}
              </span>
            </span>
          </div>
          <div className="col-md-8 text-right">
            <div className="frame-wrap mb-2">
              <span className="d-block">
                Posted By : <strong>{noticeBoardDetail?.published_by}</strong>
              </span>
              {getUserType() === "staff" && (
                <span className="d-block">
                  Approved By :{" "}
                  <strong>{noticeBoardDetail?.approved_by}</strong>
                </span>
              )}
            </div>

            <NoticeBoardLikeList
              noticeBoardDetail={noticeBoardDetail}
              hideParentModel={() => hideModelFunction()}
            />
            {noticeBoardDetail?.comment_enable ? (
              <span
                className="text-primary mr-2 pointer"
                onClick={() =>
                  props.history.push(
                    "/notice-board-comment/" + noticeBoardDetail?.id
                  )
                }
              >
                {getUserType() === "staff"
                  ? noticeBoardDetail?.comment_count
                  : ""}
                &nbsp;
                {getUserType() === "staff" ? (
                  <i
                    className={
                      noticeBoardDetail?.comment_count > 0
                        ? "fas fa-comment"
                        : "fal fa-comment"
                    }
                  ></i>
                ) : (
                  <i
                    className={
                      noticeBoardDetail?.is_user_comment
                        ? "fas fa-comment"
                        : "fal fa-comment"
                    }
                  ></i>
                )}
              </span>
            ) : (
              ""
            )}

            <span className="text-primary">
              {getUserType() === "staff"
                ? noticeBoardDetail?.documents_count
                : ""}{" "}
              <i
                className={
                  noticeBoardDetail?.documents_count > 0
                    ? "fas fa-paperclip"
                    : "fal fa-paperclip"
                }
              ></i>
            </span>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-md-12">
            <p>
              Subject : <strong>{noticeBoardDetail?.subject}</strong>
            </p>
            <hr />
            <p>{noticeBoardDetail?.description}</p>
          </div>
        </div>
        <hr />
        <span className="badge badge-warning">Attachment(s)</span>
        <div className="row mt-3">
          {noticeBoardDetail &&
            noticeBoardDetail.document &&
            noticeBoardDetail.document.map((doc, key) => {
              return (
                <div className="col-md-3" key={key}>
                  {ShowDocumentPreview(doc.file_url, doc.ext)}
                </div>
              );
            })}

          {noticeBoardDetail?.document?.length === 0 && (
            <div className="col-md-12">No attachment found.</div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default NoticeBoardDetail;
