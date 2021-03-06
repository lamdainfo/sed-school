import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input, Button, Form } from "antd";
import { postRequest } from "../../axios";

import {
  SuccessNotificationMsg,
  ErrorNotificationMsg,
} from "../../utils/NotificationHelper";

const ForgotPasswordVerification = (props) => {
  const [state, setState] = useState({
    otp: null,
    code: props?.location?.state?.detail?.code,
    login_id: props?.location?.state?.detail?.login_id,
    type: "reset-password",
  });
  const [btnLoading, setBtnLoading] = useState(false);

  const handleChange = (field, value) => {
    setState({ ...state, [field]: value.target.value });
  };

  const onSubmit = async () => {
    setBtnLoading(true);

    try {
      const apiResponse = await postRequest("otp-verify", state);
      if (apiResponse.data && apiResponse.data.response === 'success') {        
        setBtnLoading(false);
        props.history.push({
          pathname: "/reset-password",
          state: { detail: state },
        });
      } else {
        ErrorNotificationMsg("Invalid OTP!");
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
            label="OTP"
            name="otp"
            rules={[
              {
                required: true,
                pattern: new RegExp("^[0-9+]{0,6}$"),
                message: "Please enter otp",
              },
            ]}
          >
            <Input
              onChange={(value) => handleChange("otp", value)}
              placeholder="Enter OTP"
              maxLength="6"
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

export default ForgotPasswordVerification;
