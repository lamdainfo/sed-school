import React, { useState } from "react";
import { Modal } from "antd";
import NoticeBoardComment from "./NoticeBoardComment";

const NoticeBoardDetail = (props) => {
  const [showModel, setShowModel] = useState(false);

  const hideModelFunction = () => {
    setShowModel(false);
  };

  const showModelFunction = () => {
    setShowModel(true);
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
              src={props.noticeBoardDetail.published_by_image}
              className="profile-image rounded-circle"
              alt="publish-by"
            />
            <span className="d-block">
              Posted On : <strong> {props.noticeBoardDetail.posted_on}</strong>
            </span>
            <span className="d-block">
              Category :
              <span
                className="badge text-white"
                style={{ backgroundColor: "#0025FF" }}
              >
                {props.noticeBoardDetail.category}
              </span>
            </span>
          </div>
          <div className="col-md-8 text-right">
            <div className="frame-wrap mb-2">
              <span className="d-block">
                Posted By :{" "}
                <strong>{props.noticeBoardDetail.published_by}</strong>
              </span>
            </div>
            <span className="text-primary ">
              {props.noticeBoardDetail.total_like}{" "}
              <i className="fal fa-thumbs-up"></i>
            </span>{" "}
            &nbsp;&nbsp;
            0  <NoticeBoardComment hideParentModel={() => hideModelFunction()} />
            &nbsp;&nbsp;
            <span className="text-primary">
              {props.noticeBoardDetail.documents_count}{" "}
              <i className="fal fa-paperclip"></i>
            </span>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-md-12">
            <p>
              Subject : <strong>{props.noticeBoardDetail.subject}</strong>
            </p>
            <hr />
            <p>
              Dear Parents, You are requested to submit SA 1 Exam Answersheet
              (Notebook) in School reception as soon as possible before 30th
              October'2021. Note: Please ignore the message if already been
              submitted. Thanks and Regards, The Pride International School
            </p>
          </div>
        </div>
        <hr />
        <span className="badge badge-warning">Attachment(s)</span>
        <div className="row">
          <div className="col-md-6">
            <span className="text-danger">No attachment found.</span>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default NoticeBoardDetail;
