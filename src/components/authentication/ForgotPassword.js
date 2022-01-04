import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input, Button, Form } from "antd";
import { postRequest } from "../../axios";

import {
  SuccessNotificationMsg,
  ErrorNotificationMsg,
} from "../../utils/NotificationHelper";

const ForgotPassword = (props) => {
  const [state, setState] = useState({
    code: null,
    login_id: null,
    type: "reset-password",
  });
  const [btnLoading, setBtnLoading] = useState(false);

  const handleChange = (field, value) => {
    setState({ ...state, [field]: value.target.value });
  };

  const onSubmit = async () => {
    setBtnLoading(true);

    try {
      const apiResponse = await postRequest("login-otp", state);

      if (apiResponse.data && apiResponse.data.response !== undefined) {
        SuccessNotificationMsg(
          "Success",
          "SMS Send successfully to registerd no!"
        );
        setBtnLoading(false);

        props.history.push({
          pathname: "/forgot-password-verification",
          state: { detail: state },
        });
      } else {
        ErrorNotificationMsg("Error in forgot password!");
        setBtnLoading(false);
      }
    } catch (error) {
      setBtnLoading(false);
      ErrorNotificationMsg(error.errmsg);
    }
  };

  return (
    <>
      <div className="card p-4 border-top-left-radius-0 border-top-right-radius-0">
        <Form onFinish={onSubmit} autoComplete="off" layout="vertical">
          <Form.Item
            label="School Code"
            name="code"
            rules={[
              {
                required: true,
                pattern: new RegExp("^[0-9+]{0,7}$"),
                message: "Please enter school code",
              },
            ]}
          >
            <Input
              onChange={(value) => handleChange("code", value)}
              placeholder="Enter school code"
              maxLength="7"
            />
          </Form.Item>

          <Form.Item
            label="Username / Unique ID"
            name="login_id"
            rules={[
              {
                required: true,
                pattern: new RegExp("^[0-9+]{0,7}$"),
                message: "Please enter username",
              },
            ]}
          >
            <Input
              onChange={(value) => handleChange("login_id", value)}
              placeholder="Enter username"
              maxLength="7"
            />
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={btnLoading}>
            Submit
          </Button>
          <Button
            type="secondary"
            htmlType="button"
            onClick={() => props.history.push("/login")}
          >
            Close
          </Button>
        </Form>
      </div>
    </>
  );
};

export default ForgotPassword;
