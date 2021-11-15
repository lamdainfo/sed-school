import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { postRequest } from "../../axios";
import {
  Input,
  Form,
  Row,
  Col,
  Select,
  DatePicker,
  TimePicker,
  Button,
} from "antd";

import PageHeader from "../common/PageHeader";

const { Option } = Select;

const CreateLiveClass = () => {
  const [state, setState] = useState({
    edit_mode: "",
    posted_on: null,
    category: null,
    subject: null,
    description: null,
    comment_enable: null,
    school_code: null,
    is_draft: null,
  });
  const [btnLoading, setBtnLoading] = useState(false);

  const handleChange = (field, value) => {
    setState({ ...state, [field]: value.target.value });
  };

  const handleSelectChange = (field, value) => {
    setState({ ...state, [field]: value });
  };

  const onFinish = async () => {
    setBtnLoading(true);
  };

  return (
    <main id="js-page-content" role="main" className="page-content">
      <div id="content">
        <PageHeader pageTitle="Live Class" />
        <div className="row">
          <div className="col-md-12">
            <div id="panel-1" className="panel">
              <div className="panel-hdr">
                <h2>Create Live Class</h2>
              </div>
              <div className="panel-container show">
                <div className="panel-content p-0">
                  <Form
                    onFinish={onFinish}
                    autoComplete="off"
                    layout="vertical"
                  >
                    <div className="panel-content">
                      <Row gutter={[15]}>
                        <Col xs={24} sm={12} lg={8}>
                          <label>Class *</label>
                          <Form.Item
                            name="class"
                            rules={[
                              {
                                required: true,
                                whitespace: true,
                                message: "Please select class!",
                              },
                            ]}
                          >
                            <Select
                              placeholder="Select Class"
                              onChange={(value) =>
                                handleSelectChange("class", value)
                              }
                            >
                              <Option value="7">7</Option>
                              <Option value="8">8</Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} lg={8}>
                          <label>Section *</label>
                          <Form.Item
                            name="section"
                            rules={[
                              {
                                required: true,
                                whitespace: true,
                                message: "Please select section!",
                              },
                            ]}
                          >
                            <Input
                              placeholder="Enter API key"
                              onChange={(value) =>
                                handleChange("section", value)
                              }
                            />
                          </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} lg={8}>
                          <label>Subject *</label>
                          <Form.Item
                            name="subject"
                            rules={[
                              {
                                required: true,
                                whitespace: true,
                                message: "Please select subject!",
                              },
                            ]}
                          >
                            <Select
                              placeholder="Select Subject"
                              onChange={(value) =>
                                handleSelectChange("subject", value)
                              }
                            >
                              <Option value="Maths">Maths</Option>
                              <Option value="science">science</Option>
                            </Select>
                          </Form.Item>
                        </Col>

                        <Col xs={24} sm={12} lg={8}>
                          <label>Class Date *</label>
                          <Form.Item
                            name="date"
                            rules={[
                              {
                                required: true,
                                message: "Please select date!",
                              },
                            ]}
                          >
                            <DatePicker
                              placeholder="class date"
                              onChange={(value) => handleChange("date", value)}
                            />
                          </Form.Item>
                        </Col>

                        <Col xs={24} sm={12} lg={8}>
                          <label>From Time *</label>
                          <Form.Item
                            name="fronttime"
                            rules={[
                              {
                                required: true,
                                message: "Please select front time!",
                              },
                            ]}
                          >
                            <TimePicker
                              onChange={(value) =>
                                handleChange("fronttime", value)
                              }
                            />
                          </Form.Item>
                        </Col>

                        <Col xs={24} sm={12} lg={8}>
                          <label>Duration *</label>
                          <Form.Item
                            name="duration"
                            rules={[
                              {
                                required: true,
                                message: "Please select duration!",
                              },
                            ]}
                          >
                            <Select
                              placeholder="Select Duration"
                              onChange={(value) =>
                                handleSelectChange("duration", value)
                              }
                            >
                              <Option value="30 min">30 min</Option>
                              <Option value="40 min">40 min</Option>
                            </Select>
                          </Form.Item>
                        </Col>

                        <Col xs={24} sm={12} lg={16}>
                          <label>Remarks</label>
                          <Form.Item name="remarks">
                            <Input
                              placeholder="Enter Remarks"
                              onChange={(value) =>
                                handleChange("remarks", value)
                              }
                            />
                          </Form.Item>
                        </Col>

                        <Col xs={24} sm={12} lg={8}>
                          <label>Status *</label>
                          <Form.Item
                            name="status"
                            rules={[
                              {
                                required: true,
                                message: "Please select status!",
                              },
                            ]}
                          >
                            <Select
                              placeholder="Select Status"
                              onChange={(value) =>
                                handleSelectChange("status", value)
                              }
                            >
                              <Option value="shopify">Active</Option>
                              <Option value="wordpress">Inactive</Option>
                            </Select>
                          </Form.Item>
                        </Col>
                      </Row>
                    </div>
                    <div class="panel-content border-faded border-left-0 border-right-0 border-bottom-0 d-flex flex-row">
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={btnLoading}
                        className="btn btn-primary ml-auto waves-effect waves-themed"
                      >
                        Create
                      </Button>

                      <Button
                        type="reset"
                        loading={btnLoading}
                        onClick={() => this.props.history.push("/dashboard")}
                        className="btn btn-primary ml-auto waves-effect waves-themed"
                      >
                        Cancel
                      </Button>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CreateLiveClass;
