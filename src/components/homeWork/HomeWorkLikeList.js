import React, { useState, useEffect } from "react";
import { Modal } from "antd";

import { postRequest } from "../../axios";
import { getUserType } from "../../utils/Helpers";
import { SuccessNotificationMsg } from "../../utils/NotificationHelper";

const HomeWorkLikeList = (props) => {
  const [showModel, setShowModel] = useState(false);
  const [likeList, setLikeList] = useState(null);
  const [studentLikeStatus, setStudentLikeStatus] = useState(false);

  useEffect(() => {
    if (props.homeWorkDetail) {
      setStudentLikeStatus(props.homeWorkDetail.is_user_liked);
    }
  }, [props.homeWorkDetail]);

  const hideModelFunction = () => {
    setShowModel(false);
  };

  const showModelFunction = () => {
    setShowModel(true);
    getLikeList();
  };

  const getLikeList = async () => {
    const response = await postRequest("get-student-like-by-type", {
      object_id: props.homeWorkDetail.id,
      type: "hw",
    });
    setLikeList(response.data.response);
  };

  const likeHomeWork = async () => {
    const likeResponse = await postRequest("add-homework-like", {
      hid: props.homeWorkDetail.id,
    });

    if (likeResponse.data.errmsg === "") {
      SuccessNotificationMsg("Success", "Like updated successfully!");
      setStudentLikeStatus(studentLikeStatus ? false : true);
      if (props.hideParent) {
        props?.hideParentModel();
      }
    }
  };

  return (
    <>
      <span
        className="text-primary mr-2 pointer"
        onClick={
          getUserType() === "staff"
            ? () => showModelFunction()
            : () => likeHomeWork()
        }
      >
        {props?.homeWorkDetail?.total_like}
        &nbsp;
        {getUserType() === "staff" ? (
          <i
            className={
              props?.homeWorkDetail?.total_like > 0
                ? "fas fa-thumbs-up"
                : "fal fa-thumbs-up"
            }
          ></i>
        ) : (
          <i
            className={
              studentLikeStatus ? "fas fa-thumbs-up" : "fal fa-thumbs-up"
            }
          ></i>
        )}
      </span>

      <Modal
        title="Assigned Student List"
        visible={showModel}
        onOk={hideModelFunction}
        okText="Close"
        onCancel={hideModelFunction}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <div className="modal-body">
          <div className="row">
            <div className="col-md-12">
              <span className="d-block">
                Topic : <strong>{props.homeWorkDetail?.topic}</strong>
              </span>
              <span className="d-block">
                Assignment Date :{" "}
                <strong>{props.homeWorkDetail?.assignment_date}</strong>
              </span>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-md-12">
              <table className="table">
                <thead>
                  <tr>
                    <th colspan="6">
                      {" "}
                      <h3>
                        {" "}
                        <strong>Assigned Student Like List</strong>
                      </h3>
                    </th>
                  </tr>
                  <tr>
                    <td>SL.</td>
                    <td>Name</td>
                    <td>Class</td>
                    <td>Section</td>
                    <td>Roll No.</td>
                    <td>Like</td>
                  </tr>
                </thead>
                <tbody>
                  {likeList &&
                    likeList.map((student, id) => {
                      return (
                        <tr key={id}>
                          <td>{id + 1}</td>
                          <td>
                            <i
                              className={
                                student?.is_seen
                                  ? "fas fa-eye text-primary"
                                  : "fal fa-eye text-primary"
                              }
                            ></i>{" "}
                            {student?.name}
                          </td>
                          <td>{student?.class}</td>
                          <td>{student?.section}</td>
                          <td>{student?.roll}</td>
                          <td>
                            <i
                              className={
                                student?.like
                                  ? "fas fa-thumbs-up text-primary"
                                  : "fal fa-thumbs-up text-primary"
                              }
                            ></i>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default HomeWorkLikeList;
