import React, { useState } from "react";
import { Modal } from "antd";

import { postRequest } from "../../axios";
import HomeWorkComment from "./HomeWorkComment";
import { getSessionData } from "../../utils/Helpers";

const HomeWorkDetail = (props) => {
  const [showModel, setShowModel] = useState(false);
  const [homeWorkDetail, setHomeWorkDetail] = useState(null);

  const hideModelFunction = () => {
    setShowModel(false);
  };

  const showModelFunction = () => {
    setShowModel(true);
    getHomeWork();
  };

  const getHomeWork = async () => {
    const response = await postRequest("get-single-homework", {
      hid: props.homeWorkDetail.id,
    });
    setHomeWorkDetail(response.data.response);
  };

  const approveHomeWork = async () => {
    alert("call api")
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
        title="Homework Details"
        visible={showModel}
        onCancel={hideModelFunction}
      >
        <div className="row">
          <div className="col-md-4">
            <img
              src={homeWorkDetail?.created_by_image}
              className="profile-image rounded-circle"
              alt="publish-by"
            />
            <span className="d-block">
              Assigned On : <strong> {homeWorkDetail?.assignment_date}</strong>
            </span>
            <span className="d-block">
              Submit By :<strong>{homeWorkDetail?.submission_date}</strong>
            </span>
          </div>
          <div className="col-md-8 text-right">
            <div className="frame-wrap mb-2">
              <span className="d-block">
                Posted By : <strong>{homeWorkDetail?.published_by}</strong>
              </span>
              {homeWorkDetail?.approved ? (
                <span className="d-block">
                  Approved By : <strong>{homeWorkDetail?.approve_by}</strong>
                </span>
              ) : (
                <button
                  type="button"
                  class="btn btn-sm btn-danger"
                  onClick={approveHomeWork}
                >
                  <i class="fal fa-hand-paper"></i> Approve Now
                </button>
              )}
            </div>
            <span className="text-primary ">
              {homeWorkDetail?.total_like} <i className="fal fa-thumbs-up"></i>
            </span>{" "}
            &nbsp;&nbsp; 0{" "}
            <HomeWorkComment hideParentModel={() => hideModelFunction()} />
            &nbsp;&nbsp;
            <span className="text-primary">
              {homeWorkDetail?.documents_count}{" "}
              <i className="fal fa-paperclip"></i>
            </span>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-md-12">
            <p>
              Class : <strong>{homeWorkDetail?.class_code}</strong>
            </p>
            <p>
              Subject : <strong>{homeWorkDetail?.subject}</strong>
            </p>
            <p>
              Page No. : <strong>{homeWorkDetail?.page_no}</strong>
            </p>
            <p>
              Chapter No : <strong>{homeWorkDetail?.chapter_no}</strong>
            </p>
            <p>
              Topic : <strong>{homeWorkDetail?.topic}</strong>
            </p>
            <hr />
            <p>Description : {homeWorkDetail?.description}</p>
          </div>
        </div>
        <hr />
        <span className="badge badge-warning">Attachment(s)</span>
        <div className="row mt-3">
          {homeWorkDetail &&
            homeWorkDetail.documents &&
            homeWorkDetail.documents.map((doc) => {
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

          {homeWorkDetail?.documents?.length === 0 && (
            <div class="col-md-12">No attachment found.</div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default HomeWorkDetail;
