import React, { Component } from "react";
import { Input, Form, Row, Col, Select, DatePicker, TimePicker } from "antd";

import PageHeader from "../common/PageHeader";

const { Option } = Select;

export default class CreateLiveClass extends Component {
  state = {};

  handleInputChange = (input) => (event) => {
    this.setState({ [input]: event.target.value });
  };

  render() {
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
                      onFinish={this.onFinish}
                      ref={this.formRef}
                      autoComplete="off"
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
                                onChange={this.handleSelectChange}
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
                                onChange={this.handleInputChange("section")}
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
                                onChange={this.handleSelectChange}
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
                                onChange={this.handleInputChange("date")}
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
                                onChange={this.handleInputChange("fronttime")}
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
                                onChange={this.handleSelectChange}
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
                                onChange={this.handleInputChange("remarks")}
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
                                onChange={this.handleSelectChange}
                              >
                                <Option value="shopify">Active</Option>
                                <Option value="wordpress">Inactive</Option>
                              </Select>
                            </Form.Item>
                          </Col>
                        </Row>
                      </div>
                      <div class="panel-content border-faded border-left-0 border-right-0 border-bottom-0 d-flex flex-row">
                        <button
                          type="submit"
                          class="btn btn-danger ml-auto  mr-2 waves-effect waves-themed"
                        >
                          Create
                        </button>
                        <button
                          type="reset"
                          class="btn btn-primary  waves-effect waves-themed"
                          onClick={() => this.props.history.push("/dashboard")}
                        >
                          Cancel
                        </button>
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
  }
}
