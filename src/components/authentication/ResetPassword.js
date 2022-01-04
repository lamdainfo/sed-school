import React, { useState, useEffect } from "react";
import { Input, Button, Form } from "antd";
import Password from "antd/lib/input/Password";
import { postRequest } from "../../axios";

import {
  SuccessNotificationMsg,
  ErrorNotificationMsg,
} from "../../utils/NotificationHelper";

const ResetPassword = (props) => {
  const [state, setState] = useState({
    password: null,
    code: props?.location?.state?.detail?.code,
    login_id: props?.location?.state?.detail?.login_id,
  });
  const [btnLoading, setBtnLoading] = useState(false);

  const handleChange = (field, value) => {
    setState({ ...state, [field]: value.target.value });
  };

  const onSubmit = async () => {
    setBtnLoading(true);

    try {
      const apiResponse = await postRequest("update-password", state);
      if (apiResponse.data && apiResponse.data.errmsg === "") {
        setBtnLoading(false);
        SuccessNotificationMsg("Success", "Password change successfully.");
        props.history.push("login");
      } else {
        ErrorNotificationMsg("Error in update password!");
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
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                whitespace: true,
                message: "Please enter password",
              },
            ]}
          >
            <Password
              onChange={(value) => handleChange("password", value)}
              placeholder="Enter password"
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

export default ResetPassword;
