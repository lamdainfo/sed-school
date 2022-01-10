import React, { useState } from "react";
import { Modal } from "antd";

import { postRequest } from "../../axios";
import { getUserType } from "../../utils/Helpers";

const LiveClassAttendentList = (props) => {
  const [showModel, setShowModel] = useState(false);
  const [studentList, setStudentList] = useState(null);

  const hideModelFunction = () => {
    setShowModel(false);
  };

  const showModelFunction = () => {
    setShowModel(true);
    getAttendentList();
  };

  const getAttendentList = async () => {
    const response = await postRequest("student-live-class-attended-list", {
      id: props.liveClassDetail.id,
    });
    setStudentList(response.data.response.student_list);
  };

  return (
    <>
      <a
        className="text-primary mr-1 pointer"
        onClick={getUserType() === "staff" ? () => showModelFunction() : ""}
      >
        <i className="fal fa-user-alt ml-2"></i>
      </a>

      <Modal
        title="Attendent Student List"
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
                Subject : <strong>{props.liveClassDetail?.subject_name}</strong>
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
                        <strong>Attendent Student List</strong>
                      </h3>
                    </th>
                  </tr>
                  <tr>
                    <td>SL.</td>
                    <td>Name</td>
                    <td>Class</td>
                    <td>Roll No.</td>
                    <td>Status</td>
                  </tr>
                </thead>
                <tbody>
                  {studentList &&
                    studentList.map((student, id) => {
                      return (
                        <tr key={id}>
                          <td>{id + 1}</td>
                          <td>{student?.student_name}</td>
                          <td>{student?.class}</td>

                          <td>{student?.roll}</td>
                          <td>Present Absent Late {student?.is_meeting_attended ? "Yes" : "No"}</td>
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

export default LiveClassAttendentList;
