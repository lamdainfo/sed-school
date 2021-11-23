import React, { useState } from "react";
import { Modal } from "antd";

import { postRequest } from "../../axios";
import NoticeBoardComment from "./NoticeBoardComment";
import { getSessionData } from "../../utils/Helpers";

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
        onCancel={hideModelFunction}
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
                style={{ backgroundColor: "#0025FF" }}
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
              <span className="d-block">
                Approved By : <strong>{noticeBoardDetail?.approved_by}</strong>
              </span>
            </div>
            <span className="text-primary ">
              {noticeBoardDetail?.total_like}{" "}
              <i className="fal fa-thumbs-up"></i>
            </span>{" "}
            &nbsp;&nbsp; 0{" "}
            <NoticeBoardComment hideParentModel={() => hideModelFunction()} />
            &nbsp;&nbsp;
            <span className="text-primary">
              {noticeBoardDetail?.documents_count}{" "}
              <i className="fal fa-paperclip"></i>
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
            noticeBoardDetail.document.map((doc) => {
              return (
                <div class="col-md-2">
                  {doc.ext !== ".jpeg" ? (
                    <iframe src={doc.file_url} height="400px"></iframe>
                  ) : (
                    <img src={doc.file_url} alt="attchment" width="100" />
                  )}
                </div>
              );
            })}

          {noticeBoardDetail?.document?.length === 0 && (
            <div class="col-md-12">No attachment found.</div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default NoticeBoardDetail;
