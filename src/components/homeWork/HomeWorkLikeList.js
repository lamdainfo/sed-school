import React, { useState } from "react";
import { Modal } from "antd";

import { postRequest } from "../../axios";
import { getSessionData } from "../../utils/Helpers";

const HomeWorkLikeList = (props) => {
  const [showModel, setShowModel] = useState(false);
  const [homeWorkDetail, setHomeWorkDetail] = useState(null);

  const hideModelFunction = () => {
    setShowModel(false);
  };

  const showModelFunction = () => {
    setShowModel(true);
    getNoticeBoard();
  };

  const getNoticeBoard = async () => {
    const response = await postRequest("get-single-homework", {
      hid: props.homeWorkDetail.id,      
    });
    setHomeWorkDetail(response.data.response);
  };

  return (
    <>
      <span className="text-primary mr-2" onClick={() => showModelFunction()}>
        {props.homeWorkDetail.total_like}{" "}
        <i className="fal fa-thumbs-up"></i>
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
                Topic : <strong>{homeWorkDetail?.topic}</strong>
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
                <tbody id="loadData">
                  <tr>
                    <td>1</td>
                    <td>
                      <i className="fal fa-eye text-primary"></i> SHAUNA NATH
                    </td>
                    <td>II</td>
                    <td>A</td>
                    <td>2</td>
                    <td>
                      <i className="fal fa-thumbs-up text-primary"></i>
                    </td>
                  </tr>
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
