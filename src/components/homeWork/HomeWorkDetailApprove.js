import React, { useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { Modal, Space } from "antd";

import { postRequest } from "../../axios";
import HomeWorkComment from "./HomeWorkComment";
import HomeWorkLikeList from "./HomeWorkLikeList";
import SubmitedHomeWorkDetail from "./SubmitedHomeWorkDetail";

import { ShowDocumentPreview, getUserType } from "../../utils/Helpers";
import {
  ErrorNotificationMsg,
  SuccessNotificationMsg,
} from "../../utils/NotificationHelper";

import userIcon from "../../images/userIcon.jpg";

const HomeWorkDetailApprove = (props) => {
  const [showModel, setShowModel] = useState(false);
  const [homeWorkDetail, setHomeWorkDetail] = useState(null);
  const [submissionAllow, setSubmissionAllow] = useState(true);

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
    setSubmissionAllow(response.data.response.is_submission_allowed);
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

  const deleteHomeWork = async () => {
    await postRequest("remove-home-work", {
      hid: props.homeWorkDetail.id,
      status: "1",
    });
    SuccessNotificationMsg("Success", "Homework deleted successfully");

    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  var classDateTime = moment(
    homeWorkDetail?.submission_date,
    "DD-MM-YYYY"
  ).format("YYYY-MM-DD");
  var isSubmissionDateOver = moment().diff(classDateTime, "day") > 0 ? 1 : 0;

  const renderButtons = () => {
    if (isSubmissionDateOver === 1) {
      return (
        <button className="btn btn-sm btn-danger" disabled>
          Homework Submission Disabled
        </button>
      );
    } else if (homeWorkDetail?.is_homework_complete === 1) {
      return <SubmitedHomeWorkDetail homeWorkDetail={homeWorkDetail} />;
    } else if (homeWorkDetail?.is_homework_complete === 2) {
      return (
        <Link
          className="btn btn-sm btn-outline-danger ml-2"
          to={{
            pathname: "/submit-home-work",
            query: { hid: homeWorkDetail?.id },
          }}
        >
          RE-SUBMIT HOMEWORK
        </Link>
      );
    } else {
      if (homeWorkDetail?.student_homework_status === 1) {
        return <SubmitedHomeWorkDetail homeWorkDetail={homeWorkDetail} />;
      } else {
        return (
          <Link
            className="btn btn-sm btn-outline-danger ml-2"
            to={{
              pathname: "/submit-home-work",
              query: { hid: homeWorkDetail?.id },
            }}
          >
            SUBMIT HOMEWORK
          </Link>
        );
      }
    }
  };

  const onSwitchChange = async (status) => {
    const response = await postRequest("toggle-homework-submission-allow", {
      hid: props.homeWorkDetail.id,
      status,
    });
    if (response.data.errmsg === "") {
      SuccessNotificationMsg("Success", "Change done successfully");
      setSubmissionAllow(status);
    } else {
      ErrorNotificationMsg("Something went wrong");
    }
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
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = userIcon;
              }}
            />
            <span className="d-block">
              Assigned On : <strong> {homeWorkDetail?.assignment_date}</strong>
            </span>
            <span className="d-block">
              Submit By : <strong>{homeWorkDetail?.submission_date}</strong>
            </span>

            <div className="mt-3">
              {getUserType() !== "staff" ? (
                <Space>{renderButtons()}</Space>
              ) : (
                <Space>
                  {homeWorkDetail?.approved === 1 && (
                    <>
                      <Link
                        className="btn btn-sm btn-outline-success ml-2"
                        to={{
                          pathname: "/submitted-home-work",
                          query: { hid: homeWorkDetail?.id },
                        }}
                      >
                        VIEW SUBMITTED HOMEWORK
                      </Link>
                    </>
                  )}
                </Space>
              )}
            </div>
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
                  <Space>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      onClick={approveHomeWork}
                    >
                      <i className="fal fa-hand-paper"></i> Approve Now
                    </button>

                    <Link
                      className="btn btn-sm btn-info ml-2"
                      to={{
                        pathname: "/edit-home-work",
                        query: { hid: homeWorkDetail?.id },
                      }}
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-sm btn-danger ml-2"
                      onClick={deleteHomeWork}
                    >
                      <i className="fal fa-bin"></i> Delete
                    </button>
                  </Space>
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
        {homeWorkDetail?.documents?.length !== 0 && (
          <>
            <hr />
            <span className="badge badge-warning">Attachment(s)</span>
            <div className="row mt-3">
              {homeWorkDetail &&
                homeWorkDetail.documents &&
                homeWorkDetail.documents.map((doc, key) => {
                  return (
                    <div className="col-md-3" key={key}>
                      {ShowDocumentPreview(doc.file_url, doc.ext)}
                    </div>
                  );
                })}
            </div>
          </>
        )}
      </Modal>
    </>
  );
};

export default HomeWorkDetailApprove;
