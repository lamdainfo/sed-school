import React, { useState } from "react";
import { Modal } from "antd";

import { postRequest } from "../../axios";
import { ShowDocumentPreview } from "../../utils/Helpers";

const SubmitedHomeWorkDetail = (props) => {
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
    const response = await postRequest("get-single-submitted-homework", {
      stu_sub_hid: props?.homeWorkDetail?.homework_submitted_id,
    });
    setHomeWorkDetail(response.data.response);
  };

  return (
    <>
      <button
        className="btn btn-sm btn-success"
        onClick={() => showModelFunction()}
      >
        VIEW SUBMITTED HOMEWORK
      </button>

      <Modal
        title="Submitted Homework Details"
        visible={showModel}
        onOk={hideModelFunction}
        okText="Close"
        onCancel={hideModelFunction}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <div className="row">
          <div className="col-md-4">
            <span className="d-block">
              Teacher : <strong> {homeWorkDetail?.teacher_name}</strong>
            </span>
            <span className="d-block">
              Teacher's Comment :
              <strong>{homeWorkDetail?.teacher_comment}</strong>
            </span>
            <span className="d-block">
              Your Description :{" "}
              <strong> {homeWorkDetail?.student_description}</strong>
            </span>
          </div>
        </div>
        <hr />

        <hr />
        <span className="badge badge-warning">Attachment(s)</span>
        <div className="row mt-3">
          {homeWorkDetail &&
            homeWorkDetail.documents &&
            homeWorkDetail.documents.map((doc) => {
              return (
                <div className="col-md-3">
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

export default SubmitedHomeWorkDetail;
