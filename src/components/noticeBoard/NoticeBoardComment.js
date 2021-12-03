import React, { useState, useRef } from "react";
import { Input, Modal, Form, Button } from "antd";
import { postRequest } from "../../axios";
import { getUserType } from "../../utils/Helpers";
import { SuccessNotificationMsg } from "../../utils/NotificationHelper";

const { TextArea } = Input;

const CommentUI = ({ name, comment, userImg }) => {
  return (
    <div className="card border shadow-0 mb-g shadow-sm-hover">
      <div className="card-body border-faded border-top-0 border-left-0 border-right-0 rounded-top">
        <div className="d-flex flex-row align-items-center">
          <span className=" mr-3">
            <span
              className="rounded-circle profile-image d-block"
              style={{
                backgroundImage: `url(${userImg})`,
                backgroundSize: "cover",
              }}
            ></span>
          </span>
          <div className="info-card-text flex-1">
            {comment}
            <span className="text-truncate text-truncate-xl">{name}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const NoticeBoardComment = (props) => {
  const formRef = useRef();
  const [state, setState] = useState({
    comment: null,
  });
  const [showModel, setShowModel] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  const hideModelFunction = () => {
    setShowModel(false);
  };

  const showModelFunction = () => {
    setShowModel(true);
    props?.hideParentModel();
  };

  const handleChange = (field, value) => {
    setState({ ...state, [field]: value.target.value });
  };

  const onFinish = async (status) => {
    setBtnLoading(true);
    const commentResponse = await postRequest("add-notice-board-comment", {
      nid: props?.noticeBoardDetail?.id,
      description: state.comment,
    });

    setBtnLoading(false);

    if (commentResponse.data.errmsg === "") {
      SuccessNotificationMsg("Success", "comment added successfully!");
      setShowModel(false);
      formRef.current.setFieldsValue({ comment: null });
    }
  };

  return (
    <>
      <span
        onClick={getUserType() === "staff" ? "" : () => showModelFunction()}
        className="text-primary mr-2"
      >
        {getUserType() === "staff"
          ? props?.noticeBoardDetail?.comment_count
          : ""}
        &nbsp;
        <i
          className={
            props?.noticeBoardDetail?.comment_count > 0
              ? "fas fa-comment"
              : "fal fa-comment"
          }
        ></i>
      </span>

      <Modal
        title="Comment"
        visible={showModel}
        onCancel={hideModelFunction}
        footer={false}
      >
        {props.noticeBoardDetail &&
          props.noticeBoardDetail.comment.map((cmt) => {
            return (
              <>
                <CommentUI
                  name={cmt.user.name}
                  comment={cmt.description}
                  userImg={cmt.user.image}
                />

                {cmt.reply &&
                  cmt.reply.map((rp) => {
                    return (
                      <CommentUI
                        name={rp.user.name}
                        comment={rp.description}
                        userImg={rp.user.image}
                      />
                    );
                  })}
              </>
            );
          })}
        <hr />

        {props.noticeBoardDetail && props.noticeBoardDetail.can_comment ? (
          <Form
            onFinish={onFinish}
            ref={formRef}
            autoComplete="off"
            layout="vertical"
          >
            <div className="row">
              <div className="col-md-12">
                <Form.Item
                  label="Comment"
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
                    rows={2}
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
        ) : (
          ""
        )}
      </Modal>
    </>
  );
};

export default NoticeBoardComment;
