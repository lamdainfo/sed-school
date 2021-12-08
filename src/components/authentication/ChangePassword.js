import React, { useState } from "react";
import { Modal, Col, Row, Button, Form, Space } from "antd";
import Password from "antd/lib/input/Password";
import { postRequest } from "../../axios";

import { SuccessNotificationMsg } from "../../utils/NotificationHelper";
import { getUserData, getSchoolData, logout } from "../../utils/Helpers";

const ChangePassword = () => {
  const [state, setStatus] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [btnLoading, setBtnLoading] = useState(false);
  const [showModel, setShowModel] = useState(false);

  const handleChange = (field, value) => {
    setStatus({ ...state, [field]: value.target.value });
  };

  const hideModelFunction = () => {
    setShowModel(false);
  };

  const showModelFunction = () => {
    setShowModel(true);
  };

  const onFinish = async () => {
    setBtnLoading(true);
    const changePassResponse = await postRequest("update-password", {
      login_id: getUserData().unique_id,
      code: getSchoolData().school_code,
      password: state.newPassword,
    });

    setBtnLoading(false);
    if (changePassResponse.data.errmsg === "") {
      SuccessNotificationMsg("Success", "Password changed successfully!");
      setTimeout(() => {
        logout();
      }, 2000);
    }
  };

  return (
    <>
      <span className="dropdown-item" onClick={() => showModelFunction()}>
        <span>Change Password</span>
      </span>

      <Modal
        title="Change Password"
        visible={showModel}
        onCancel={hideModelFunction}
        footer={false}
      >
        <Form onFinish={onFinish} autoComplete="off" layout="vertical">
          <Row gutter={[15]}>
            <Col xs={24} sm={24} lg={24}>
              <Form.Item
                name="newPassword"
                label="New Password"
                rules={[
                  {
                    required: true,
                    message: "Please input new password!",
                  },
                  {
                    min: 5,
                    message: "Password must be minimum six characters.",
                  },
                ]}
              >
                <Password
                  name="newPassword"
                  onChange={(value) => handleChange("newPassword", value)}
                  placeholder="New Password"
                  maxLength="15"
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} lg={24}>
              <Form.Item
                name="confirmNewPassword"
                label="Confirm Password"
                rules={[
                  {
                    required: true,
                    message: "Please input confirm password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue("newPassword") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        "The password do not match with new password!"
                      );
                    },
                  }),
                ]}
              >
                <Password
                  name="confirmNewPassword"
                  onChange={(value) =>
                    handleChange("confirmNewPassword", value)
                  }
                  placeholder="Confirm Password"
                  maxLength="15"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row
            gutter={[15]}
            align="end"
            justify="space-between"
            className="bottomButtons"
          >
            <Col></Col>
            <Col>
              <Space>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  loading={btnLoading}
                >
                  Submit
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default ChangePassword;
