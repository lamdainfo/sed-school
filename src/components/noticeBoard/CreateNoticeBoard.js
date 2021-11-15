import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Input, Row, Col, Select, Form, Upload, Button } from "antd";
import { postRequest } from "../../axios";
import { UploadOutlined } from "@ant-design/icons";

import PageHeader from "../common/PageHeader";

const { Option } = Select;
const { TextArea } = Input;

const CreateNoticeBoard = () => {
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
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    getCategoryList();
  }, []);

  const handleChange = (field, value) => {
    setState({ ...state, [field]: value.target.value });
  };

  const handleSelectChange = (field, value) => {
    setState({ ...state, [field]: value });
  };

  const getCategoryList = async () => {
    const response = await postRequest("get-notice-board-category");
    setCategoryList(response.data.response);
  };

  const onFinish = async () => {
    setBtnLoading(true);
  };

  const uploadProps = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text",
    },
  };

  return (
    <>
      <main id="js-page-content" role="main" className="page-content">
        <div id="content">
          <PageHeader pageTitle="Notice Board" />
          <div className="row">
            <div className="col-md-12">
              <div id="panel-1" className="panel">
                <div className="panel-hdr">
                  <h2>Notice Board</h2>
                  <div className="panel-toolbar">
                    <Link
                      to="/notice-board"
                      className="btn btn-sm btn-info waves-effect waves-themed"
                    >
                      <i className="fal fa-clipboard-list"></i> View Notice
                      Board
                    </Link>
                  </div>
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
                            <Form.Item
                              name="class"
                              label="Class"
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
                            <Form.Item
                              name="rolls"
                              label="Roll(s)"
                              rules={[
                                {
                                  required: true,
                                  whitespace: true,
                                  message: "Please select rolls!",
                                },
                              ]}
                            >
                              <Select
                                placeholder="Select Rolls"
                                onChange={(value) =>
                                  handleSelectChange("rolls", value)
                                }
                              >
                                <Option value="7">7</Option>
                                <Option value="8">8</Option>
                              </Select>
                            </Form.Item>
                          </Col>
                        </Row>
                        <hr />

                        <Row gutter={[15]}>
                          <Col xs={24} sm={12} lg={8}>
                            <Form.Item
                              name="category"
                              label="Category"
                              rules={[
                                {
                                  required: true,
                                  whitespace: true,
                                  message: "Please select category!",
                                },
                              ]}
                            >
                              <Select
                                placeholder="Select Category"
                                onChange={(value) =>
                                  handleSelectChange("category", value)
                                }
                              >
                                {!!categoryList &&
                                  categoryList.map((s) => (
                                    <Option key={s.id} value={s.name}>
                                      {s.name}
                                    </Option>
                                  ))}
                              </Select>
                            </Form.Item>
                          </Col>
                          <Col xs={24} sm={12} lg={8}>
                            <Form.Item
                              name="comment_enable"
                              label="Enable Comment"
                            >
                              <Select
                                defaultValue="0"
                                onChange={(value) =>
                                  handleSelectChange("comment_enable", value)
                                }
                              >
                                <Option value="0">No</Option>
                                <Option value="1">Yes</Option>
                              </Select>
                            </Form.Item>
                          </Col>

                          <Col xs={24} sm={12} lg={24}>
                            <Form.Item
                              label="Subject"
                              name="subject"
                              rules={[
                                {
                                  required: true,
                                  whitespace: true,
                                  message: "Please enter subject",
                                },
                              ]}
                            >
                              <Input
                                onChange={(value) =>
                                  handleChange("subject", value)
                                }
                              />
                            </Form.Item>
                          </Col>

                          <Col xs={24} sm={12} lg={24}>
                            <Form.Item
                              label="Description"
                              name="description"
                              rules={[
                                {
                                  required: true,
                                  whitespace: true,
                                  message: "Please enter description",
                                },
                              ]}
                            >
                              <TextArea rows={4} />
                            </Form.Item>
                          </Col>

                          <Col xs={24} sm={12} lg={24}>
                            <label>Attachment(s) [Attach up to 4 files.]</label>
                            <br />
                            <Upload {...uploadProps}>
                              <Button icon={<UploadOutlined />}>
                                Click to Upload
                              </Button>
                            </Upload>
                          </Col>
                        </Row>
                        <br />
                      </div>

                      <div className="panel-content border-faded border-left-0 border-right-0 border-bottom-0 d-flex flex-row">
                        <Button
                          type="primary"
                          htmlType="submit"
                          loading={btnLoading}
                          className="btn btn-primary ml-auto waves-effect waves-themed"
                        >
                          Publish
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
    </>
  );
};

export default CreateNoticeBoard;
