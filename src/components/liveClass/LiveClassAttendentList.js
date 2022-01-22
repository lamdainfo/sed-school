import React, { useState } from "react";
import { Modal, Radio, Button, Space } from "antd";

import { postRequest } from "../../axios";
import { getUserType } from "../../utils/Helpers";
import {
  SuccessNotificationMsg,
  ErrorNotificationMsg,
} from "../../utils/NotificationHelper";

const LiveClassAttendentList = (props) => {
  const [showModel, setShowModel] = useState(false);
  const [studentList, setStudentList] = useState(null);
  const [btnLoading, setBtnLoading] = useState(false);

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

  const onChange = (e, selectedStudent) => {
    let items = [...studentList];
    let documentIndex = items.findIndex(
      (res) => res.student_id === selectedStudent.student_id
    );
    let item = { ...items[documentIndex] };
    item.is_meeting_attended = e.target.value;
    items[documentIndex] = item;
    setStudentList(items);
  };

  const updateAttendance = async () => {
    setBtnLoading(true);
    const payload = {
      student_list: studentList,
    };

    try {
      const res = await postRequest(
        "student-live-class-attended-update",
        payload
      );

      if (res.data.status === "success") {
        SuccessNotificationMsg("Success", "Attendance updated successfully.");
        setBtnLoading(false);
        window.location.href = "/live-class";
      } else {
        setBtnLoading(false);
        ErrorNotificationMsg("Error in updated attendance.");
      }
    } catch (error) {
      console.log(error);
      setBtnLoading(false);
      ErrorNotificationMsg(error.errmsg);
    }
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
        onCancel={hideModelFunction}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        footer={false}
      >
        <div className="modal-body">
          <div className="row">
            <div className="col-md-12 mb-3">
              <span className="d-block">
                Subject : <strong>{props.liveClassDetail?.subject_name}</strong>
              </span>
            </div>
          </div>

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
                          <td>
                            <Radio.Group
                              key={id}
                              onChange={(e) => onChange(e, student)}
                              value={student?.is_meeting_attended}
                            >
                              <Radio value={1}>Present</Radio>
                              <Radio value={0}>Absent</Radio>
                              <Radio value={2}>Late</Radio>
                            </Radio.Group>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
          <hr/>
          <div className="col-md-12">
            <div className="panel-content d-flex flex-row justify-content-end">
              <Space>
                <Button
                  type="secondary"
                  onClick={hideModelFunction}
                  htmlType="button"
                  className="btn btn-danger ml-auto waves-effect waves-themed"
                >
                  Close
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={updateAttendance}
                  loading={btnLoading}
                  className="btn btn-primary ml-auto waves-effect waves-themed"
                >
                  Update Attendance
                </Button>
              </Space>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default LiveClassAttendentList;
