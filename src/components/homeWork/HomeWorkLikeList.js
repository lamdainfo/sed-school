import React, { useState } from "react";
import { Modal } from "antd";
import { postRequest } from "../../axios";

const HomeWorkLikeList = (props) => {
  const [showModel, setShowModel] = useState(false);
  const [likeList, setLikeList] = useState(null);

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

  return (
    <>
      <span className="text-primary" onClick={() => showModelFunction()}>
        {props.homeWorkDetail.total_like}{" "}
        <i
          className={
            props.homeWorkDetail.total_like > 0
              ? "fas fa-thumbs-up"
              : "fal fa-thumbs-up"
          }
        ></i>
      </span>

      <Modal
        title="Assigned Student List"
        visible={showModel}
        onCancel={hideModelFunction}
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