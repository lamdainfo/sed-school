import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Input, Button, Form } from "antd";
import Password from "antd/lib/input/Password";
import { postRequest } from "../../axios";

import Config from "../../Config";
import {
  SuccessNotificationMsg,
  ErrorNotificationMsg,
} from "../../utils/NotificationHelper";
import { redirectIfLoggedIn } from "../../utils/Helpers";

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
      const loginResponse = await postRequest("login", state);

      if (
        loginResponse.data &&
        loginResponse.data.response.dbtoken !== undefined
      ) {
        localStorage.clear();
        localStorage.setItem("dbtoken", loginResponse.data.response.dbtoken);
        localStorage.setItem("restoken", loginResponse.data.response.restoken);
        localStorage.setItem("userType", loginResponse.data.response.userType);

        const userDetailResponse = await axios.post(
          Config.API_URL + "login-user-info",
          state,
          {
            headers: {
              DBAuth: loginResponse.data.response.dbtoken,
              Authorization: `Bearer ${loginResponse.data.response.restoken}`,
            },
          }
        );

        let userData = {
          name: userDetailResponse.data.response.name,
          mobile: userDetailResponse.data.response.mobile,
          image_url: userDetailResponse.data.response.image_url,
          unique_id: state.username,
          tid: userDetailResponse.data.response.id,
          stdClass: userDetailResponse.data.response?.stdClass,
          stdSection: userDetailResponse.data.response?.stdSection,
          stdRoll: userDetailResponse.data.response?.stdRoll,
        };

        let schoolData = {
          sch_name:
            userDetailResponse.data.response.school_information.sch_name,
          address: userDetailResponse.data.response.school_information.address,
          district:
            userDetailResponse.data.response.school_information.district,
          sch_img: userDetailResponse.data.response.school_image.school_logo,
          school_code: state.code,
        };

        localStorage.setItem(
          "session_data",
          JSON.stringify(userDetailResponse.data.response.sessionData)
        );
        localStorage.setItem("schoolData", JSON.stringify(schoolData));
        localStorage.setItem(
          "school_menu",
          userDetailResponse.data.response.school_information.school_menu
        );
        localStorage.setItem("userData", JSON.stringify(userData));
        localStorage.setItem(
          "upload_img_limit",
          userDetailResponse.data.response.hw_submission_image_upload_limit
        );
      }

      SuccessNotificationMsg("Success", "Succesfully logged in!");
      setBtnLoading(false);
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
            name="username"
            rules={[
              {
                required: true,
                pattern: new RegExp("^[0-9+]{0,7}$"),
                message: "Please enter username",
              },
            ]}
          >
            <Input
              onChange={(value) => handleChange("username", value)}
              placeholder="Enter username"
              maxLength="7"
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
