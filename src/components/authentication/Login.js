import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Input, Button, Form } from "antd";
import { postRequest } from "../../axios";
import Password from "antd/lib/input/Password";

import {
  SuccessNotificationMsg,
  ErrorNotificationMsg,
} from "../../utils/NotificationHelper";
import { redirectIfLoggedIn } from "../../utils/Helpers";
import { AUTH_USER_TOKEN_KEY } from "../../utils/constants";

const Login = () => {
  const [state, setState] = useState({
    code: null,
    username: null,
    password: null,
  });
  const [btnLoading, setBtnLoading] = useState(false);

  useEffect(() => {
    redirectIfLoggedIn();
  }, []);

  const handleChange = (field, value) => {
    setState({ ...state, [field]: value.target.value });
  };

  const onLogin = async () => {
    setBtnLoading(true);

    try {
      const response = await postRequest("login", state);
      
      localStorage.clear();
      localStorage.setItem("dbtoken", response.data.response.dbtoken);
      localStorage.setItem("restoken", response.data.response.restoken);
      localStorage.setItem("userType", response.data.response.userType);

      SuccessNotificationMsg("Success", "Succesfully logged in!");
      window.location.href = "/dashboard";

    } catch (error) {
      setBtnLoading(false);
      ErrorNotificationMsg(error.errmsg);
    }
  };

  return (
    <>
      <div className="card p-4 border-top-left-radius-0 border-top-right-radius-0">
        <Form onFinish={onLogin} autoComplete="off" layout="vertical">
          <Form.Item
            label="School Code"
            name="code"
            rules={[
              {
                required: true,
                whitespace: true,
                message: "Please enter school code",
              },
            ]}
          >
            <Input
              onChange={(value) => handleChange("code", value)}
              placeholder="Enter school code"
            />
          </Form.Item>

          <Form.Item
            label="Username / Unique ID"
            name="username"
            rules={[
              {
                required: true,
                whitespace: true,
                message: "Please enter username",
              },
            ]}
          >
            <Input
              onChange={(value) => handleChange("username", value)}
              placeholder="Enter username"
            />
          </Form.Item>

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
            Sign In
          </Button>
        </Form>
      </div>
      <div className="blankpage-footer text-center">
        <Link to="/forgot-password">
          <strong>Forgot Password?</strong>
        </Link>
      </div>
    </>
  );
};

export default Login;
