import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Input, Button, Form, Checkbox } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import Password from "antd/lib/input/Password";

import {
  SuccessNotificationMsg,
  ErrorNotificationMsg,
} from "../../utils/NotificationHelper";
import { redirectIfLoggedIn } from "../../utils/Helpers";
import { AUTH_USER_TOKEN_KEY } from "../../utils/constants";

const Login = () => {
  const [state, setState] = useState({ email: "", password: "" });
  const [btnLoading, setBtnLoading] = useState(false);

  useEffect(() => {
    redirectIfLoggedIn();
  }, []);

  const handleChange = (field, value) => {
    setState({ ...state, [field]: value.target.value });
  };

  const onLogin = () => {
    setBtnLoading(true);
  };

  return (
    <>
      <div className="card p-4 border-top-left-radius-0 border-top-right-radius-0">
        <form
          id="form-login"
          action="#"
          method="post"
          className="needs-validation"
          novalidate
        >
          <input
            type="hidden"
            name="_token"
            value="Je0YbOykAQt0qg8XVs72uRhtPdheZRmZK0S6UoUg"
          />

          <div className="form-group">
            <label className="form-label" for="sch_code">
              School Code
            </label>
            <input
              type="text"
              id="sch_code"
              name="school_code"
              maxlength="7"
              className="form-control"
              required
              value=""
            />
            <div className="invalid-feedback">Please enter School Code</div>
          </div>
          <div className="form-group">
            <label className="form-label" for="username">
              Username / Unique ID
            </label>
            <input
              type="text"
              id="username"
              name="username"
              maxlength="7"
              className="form-control"
              required
              value=""
            />
            <div className="invalid-feedback">Please enter Username</div>
          </div>
          <div className="form-group">
            <label className="form-label" for="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              required
              value=""
            />
            <div className="invalid-feedback">Enter your password</div>
          </div>
          <button
            type="submit"
            className="btn btn-primary waves-effect waves-themed"
          >
            <i className="fal fa-sign-in-alt mr-1"></i> Sign In
          </button>
        </form>
      </div>
      <div className="blankpage-footer text-center">
        <Link to="/forgot-password">
          <strong>Forgot password?</strong>
        </Link>
      </div>
    </>
  );
};

export default Login;
