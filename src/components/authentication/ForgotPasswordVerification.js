import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Input, Button, Form, Divider } from "antd";
import Password from "antd/lib/input/Password";
import {
  SuccessNotificationMsg,
  ErrorNotificationMsg,
} from "../../utils/NotificationHelper";

class ForgotPasswordVerification extends React.Component {
  state = {
    btnLoading: false,
  };

  onFinish = async (values) => {
    let { email, verificationcode, newpassword } = this.state;
    this.setState({ btnLoading: true });
  };

  handleInputChange = (input) => (event) => {
    this.setState({ [input]: event.target.value });
  };

  render() {
    return (
      <div className="authPage">
        <div className="container">
          <div className="login_wraper">
      <div className="login-box">
        <h1 className="text-center">Set New Password</h1>
        <Divider />
        <p className="text-center">
          Please enter the verification code sent to your email adress below.
        </p>

        <Form
          onFinish={this.onFinish}
          initialValues={
            {
              //email: props.stateValues.email,
            }
          }
        >
          <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 10]}>
            <Col className="gutter-row" span={24}>
              <Form.Item
                name="verificationcode"
                rules={[
                  {
                    required: true,
                    message: "Please input verification code!",
                  },
                ]}
              >
                <Input
                  placeholder="Enter verification code *"
                  onChange={this.handleInputChange("verificationcode")}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 10]}>
            <Col className="gutter-row" span={24}>
              <Form.Item
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid e-mail!",
                  },
                  {
                    required: true,
                    message: "Please input E-mail!",
                  },
                ]}
              >
                <Input
                  placeholder="Email address *"
                  onChange={this.handleInputChange("email")}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 10]}>
            <Col className="gutter-row" span={24}>
              <Form.Item
                name="newpassword"
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
                  placeholder="Enter password *"
                  onChange={this.handleInputChange("newpassword")}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 30]}>
            <Col className="gutter-row text-right" span={24}>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="w100"
                loading={this.state.btnLoading}
              >
                SUBMIT
              </Button>
            </Col>
          </Row>

          <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 0]}>
            <Col className="gutter-row" span={24}>
              <p className="text-center">
                <Link to="/login" className="button-link">Return to Login</Link>
              </p>
            </Col>
          </Row>
        </Form>
      </div>
      </div>
      </div>
      </div>
    );
  }
}

export default ForgotPasswordVerification;
