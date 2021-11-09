import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Input,
  Button,
  Form,
  Checkbox,
  Divider,
  Space,
  Select,
} from "antd";
import Password from "antd/lib/input/Password";
import {
  SuccessNotificationMsg,
  ErrorNotificationMsg,
} from "../../utils/NotificationHelper";

export const Register = (props) => {
  const { history } = props;
  const formRef = useRef(null);

  const [state, setState] = useState({
    name: "",
    crn: "",
    licence: "",
    type: "",
    address: "",
    phone: "",
    email: "",
    password: "",
  });
  const [btnLoading, setBtnLoading] = useState(false);

  const handleChange = (field, value) => {
    setState({ ...state, [field]: value.target.value });
  };

  const handleSelectChange = (field, value) => {
    setState({ ...state, [field]: value });
  };

  const onRegister = () => {
    setBtnLoading(true);
  };

  return (
    <div className="authPage">
      <div className="container">
        <div class="reg_wraper">
          <div className="pagename">
            <span>Registration</span>
          </div>

          <Form onFinish={onRegister} ref={formRef} autoComplete="off">
            <Row gutter={[15]}>
              <Col xs={24} sm={12} lg={12}>
                <Form.Item
                  name="hospitalName"
                  rules={[
                    {
                      required: true,
                      message: "Please input hospital name!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Hospital Name"
                    onChange={(value) => handleChange("hospitalName", value)}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} lg={12}>
                <Form.Item
                  name="state"
                  rules={[
                    {
                      required: true,
                      message: "Please input state!",
                    },
                  ]}
                >
                  <Input
                    placeholder="State"
                    onChange={(value) => handleChange("state", value)}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} lg={12}>
                <Form.Item
                  name="city"
                  rules={[
                    {
                      required: true,
                      message: "Please select city!",
                    },
                  ]}
                >
                  <Select
                    placeholder="City"
                    onChange={(value) => handleSelectChange("city", value)}
                  >
                    <Select.Option value="Ahmedabad">Ahmedabad</Select.Option>
                    <Select.Option value="Surat">Surat</Select.Option>
                    <Select.Option value="Baroda">Baroda</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} lg={12}>
                <Form.Item
                  name="area"
                  rules={[
                    {
                      required: true,
                      message: "Please input area!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Area"
                    onChange={(value) => handleChange("area", value)}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} lg={12}>
                <Form.Item name="pincode">
                  <Input
                    placeholder="Pincode"
                    onChange={(value) => handleChange("pincode", value)}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} lg={12}>
                <Form.Item name="email">
                  <Input
                    placeholder="Email"
                    onChange={(value) => handleChange("email", value)}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} lg={12}>
                <Form.Item name="username">
                  <Input
                    placeholder="Username"
                    onChange={(value) => handleChange("username", value)}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} lg={12}>
                <Form.Item name="phone">
                  <Input
                    placeholder="Phone"
                    onChange={(value) => handleChange("phone", value)}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} lg={12}>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input password!",
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
                    placeholder="Password *"
                    onChange={(value) => handleChange("password", value)}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} lg={12}>
                <Form.Item
                  name="confirm_password"
                  rules={[
                    {
                      required: true,
                      message: "Please input confirm password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        if (!value || getFieldValue("password") === value) {
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
                    placeholder="Confirm Password *"
                    onChange={(value) =>
                      handleChange("confirm_password", value)
                    }
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} lg={12}>
                <Form.Item name="defaultLang">
                  <Select
                    placeholder="Default Lang"
                    onChange={(value) =>
                      handleSelectChange("defaultLang", value)
                    }
                  >
                    <Select.Option value="English">English</Select.Option>
                    <Select.Option value="Hindi">Hindi</Select.Option>
                    <Select.Option value="Gujarati">Gujarati</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 0]}>
              <Col xs={24} sm={12} lg={12} align="start">
                <Form.Item name="accept_terms_condition" className="checkwrap">
                  <Checkbox>
                    I accept the{" "}
                    <Link to="/" className="button-link">
                      terms and conditions
                    </Link>
                  </Checkbox>
                </Form.Item>
              </Col>
            </Row>
            <Divider />

            <Row gutter={[15]} className="bottomButtons">
              <Col xs={24} align="end">
                <Space>
                  <Button
                    type="secondary"
                    htmlType="button"
                    onClick={props.history.goBack}
                  >
                    Back
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={state.btnLoading}
                  >
                    Register
                  </Button>
                </Space>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;
