import React, { useState } from "react";
import { Modal } from "antd";

import { postRequest } from "../../axios";
import HomeWorkComment from "./HomeWorkComment";
import HomeWorkLikeList from "./HomeWorkLikeList";
import { ShowDocumentPreview, getUserType } from "../../utils/Helpers";
import { SuccessNotificationMsg } from "../../utils/NotificationHelper";

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
    await postRequest("approve-homework", {
      hid: props.homeWorkDetail.id,
      status: "1",
    });
    SuccessNotificationMsg("Success", "Approved successfully");

    setTimeout(() => {
      window.location.reload();
    }, 2000);
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
        onOk={hideModelFunction}
        okText="Close"
        onCancel={hideModelFunction}
        cancelButtonProps={{ style: { display: "none" } }}
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
              {getUserType() === "staff" ? (
                homeWorkDetail?.approved ? (
                  <span className="d-block">
                    Approved By : <strong>{homeWorkDetail?.approve_by}</strong>
                  </span>
                ) : (
                  <button
                    type="button"
                    className="btn btn-sm btn-danger"
                    onClick={approveHomeWork}
                  >
                    <i className="fal fa-hand-paper"></i> Approve Now
                  </button>
                )
              ) : (
                ""
              )}
            </div>
            <HomeWorkLikeList
              homeWorkDetail={homeWorkDetail}
              hideParentModel={() => hideModelFunction()}
            />

            {homeWorkDetail?.comment_enable ? (
              <HomeWorkComment hideParentModel={() => hideModelFunction()} />
            ) : (
              ""
            )}

            <span className="text-primary">
              {getUserType() === "staff" ? homeWorkDetail?.documents_count : ""}{" "}
              <i
                className={
                  homeWorkDetail?.documents_count > 0
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
            {getUserType() === "staff" && (
              <p>
                Class : <strong>{homeWorkDetail?.class_code}</strong>
              </p>
            )}
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
                <div className="col-md-2">
                  {ShowDocumentPreview(doc.file_url, doc.ext)}
                </div>
              );
            })}

          {homeWorkDetail?.documents?.length === 0 && (
            <div className="col-md-12">No attachment found.</div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default HomeWorkDetail;
