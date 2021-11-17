import React, { useState } from "react";
import { Modal, Col, Row, Button, Form, Space } from "antd";
import Password from "antd/lib/input/Password";

const ChangePassword = (props) => {
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
  };

  return (
    <>
      <a className="dropdown-item" onClick={() => showModelFunction()}>
        <span>Change Password</span>
      </a>

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
                name="currentPassword"
                label="Current Password"
                rules={[
                  {
                    required: true,
                    message: "Please input current password!",
                  },
                ]}
              >
                <Password
                  name="currentPassword"
                  onChange={(value) => handleChange("currentPassword", value)}
                  placeholder="Current Password"
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} lg={24}>
              <Form.Item
                name="newPassword"
                label="New Password"
                rules={[
                  {
                    required: true,
                    message: "Please input new password!",
                  },
                  () => ({
                    validator(rule, value) {
                      if (
                        !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!_%*#?&])[A-Za-z\d@$!_%*#?&]{6,}$/.test(
                          value
                        )
                      ) {
                        return Promise.reject(
                          "Password should be minimum six characters, at least one letter and one number and one special character."
                        );
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <Password
                  name="newPassword"
                  onChange={(value) => handleChange("newPassword", value)}
                  placeholder="New Password"
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
                        "The two passwords that you entered do not match!"
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
