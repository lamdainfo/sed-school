import React, { useState, useRef } from "react";
import { Input, Modal, Form, Button } from "antd";
import { postRequest } from "../../axios";
import { SuccessNotificationMsg } from "../../utils/NotificationHelper";

const { TextArea } = Input;

const NoticeBoardCommentPost = (props) => {
  const formRef = useRef();
  const [state, setState] = useState({
    comment: "xcvcxvcxv",
  });
  const [showModel, setShowModel] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  const hideModelFunction = () => {
    setShowModel(false);
  };

  const showModelFunction = () => {
    setShowModel(true);
  };

  const handleChange = (field, value) => {
    setState({ ...state, [field]: value.target.value });
  };

  const onFinish = async () => {
    setBtnLoading(true);
    let commentResponse = "";

    if (props.commentType === "reply") {
      commentResponse = await postRequest("add-notice-board-comment-reply", {
        nid: props?.nid,
        cid: props?.cid,
        description: state.comment,
      });
    }

    if (props.commentType === "comment") {
      commentResponse = await postRequest("add-notice-board-comment", {
        nid: props?.nid,
        description: state.comment,
      });
    }

    setBtnLoading(false);

    if (commentResponse.data.errmsg === "") {
      SuccessNotificationMsg("Success", "comment added successfully!");
      setShowModel(false);
      formRef.current.setFieldsValue({ comment: null });
      props.refreshScreen();
    }
  };

  return (
    <>
      <span onClick={() => showModelFunction()}>{props.html}</span>

      <Modal
        title={
          props.commentType && props.commentType === "reply"
            ? "Reply"
            : "Comment"
        }
        visible={showModel}
        onCancel={hideModelFunction}
        footer={false}
      >
        <Form
          onFinish={onFinish}
          ref={formRef}
          autoComplete="off"
          layout="vertical"
        >
          <div className="row">
            <div className="col-md-12">
              <Form.Item
                label={
                  props.commentType && props.commentType === "reply"
                    ? "Reply"
                    : "Comment"
                }
                name="comment"
                rules={[
                  {
                    required: true,
                    whitespace: true,
                    message: "Please enter comment",
                  },
                ]}
              >
                <TextArea
                  rows={4}
                  defaultValue={props?.commentText}
                  value={props?.commentText}
                  onChange={(value) => handleChange("comment", value)}
                />
              </Form.Item>
            </div>
          </div>

          <div className="panel-content mt-2 d-flex flex-row">
            <Button
              type="primary"
              htmlType="submit"
              loading={btnLoading}
              className="btn btn-primary ml-auto waves-effect waves-themed"
            >
              Submit
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default NoticeBoardCommentPost;
