import React, { useState } from "react";
import { Input, Modal } from "antd";
import { postRequest } from "../../axios";

const { TextArea } = Input;

const HomeWorkComment = (props) => {
  const [showModel, setShowModel] = useState(false);
  const [likeList, setLikeList] = useState(null);

  const hideModelFunction = () => {
    setShowModel(false);
  };

  const showModelFunction = () => {
    setShowModel(true);
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
      <span onClick={() => showModelFunction()} className="text-primary">
        {props.htmlText}
      </span>

      <Modal title="Comment" visible={showModel} onCancel={hideModelFunction}>
        <div className="row">
          <div className="col-md-12">
            <TextArea rows={4} />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default HomeWorkComment;
