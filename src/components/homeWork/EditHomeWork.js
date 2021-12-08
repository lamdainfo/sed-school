import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import {
  Input,
  Row,
  Col,
  Select,
  Form,
  Upload,
  Button,
  DatePicker,
  Space,
} from "antd";
import { postRequest } from "../../axios";
import { UploadOutlined } from "@ant-design/icons";

import PageHeader from "../common/PageHeader";
import {
  SuccessNotificationMsg,
  ErrorNotificationMsg,
} from "../../utils/NotificationHelper";
import { getSessionData, getSchoolData } from "../../utils/Helpers";

const { Option } = Select;
const { TextArea } = Input;

const EditHomeWork = (props) => {
  const formRef = useRef();
  const queryString = props.history.location.query;
  if (queryString === undefined || queryString.hid === undefined) {
    props.history.push("/dashboard");
  }

  const dateFormat = "DD-MM-YYYY";
  const [state, setState] = useState({
    assignment_date: "",
    submission_date: "",
    page_no: null,
    chapter_no: null,
    comment_enable: 0,
    topic: "",
    description: null,
  });
  const [btnLoading, setBtnLoading] = useState(false);
  const [homeWorkDetail, setHomeWorkDetail] = useState(null);

  useEffect(() => {
    if (props?.history?.location?.query?.hid) {
      getHomeworkDetail();
    }
  }, []);

  const getHomeworkDetail = async () => {
    const response = await postRequest("get-edit-homework", {
      hid: queryString?.hid,
    });
    setHomeWorkDetail(response.data.response);
    formRef.current.setFieldsValue({
      page_no: response.data.response.page_no,
      chapter_no: response.data.response.chapter_no,
      topic: response.data.response.topic,
      description: response.data.response.description,
      comment_enable: response.data.response.comment_enable,
      assignment_date: moment(),
      submission_date: moment(),
    });
  };

  const handleChange = (field, value) => {
    setState({ ...state, [field]: value.target.value });
  };

  const handleSelectChange = (field, value) => {
    setState({ ...state, [field]: value });
  };

  const handleChangeAssignmentDate = (date, dateString) => {
    setState({ ...state, assignment_date: date });
  };

  const handleChangeSubmissionDate = (date, dateString) => {
    setState({ ...state, submission_date: date });
  };

  const disablePastDate = (current) => {
    let customDate = moment().format("DD-MM-YYYY");
    return current && current < moment(customDate, "DD-MM-YYYY");
  };

  const onFinish = async () => {
    setBtnLoading(true);
    
    const payload = {
      edit_mode: "",
      sid: getSessionData().code,
      subject: homeWorkDetail.subject,
      topic: state.topic,
      description: state.description,
      page_no: state.page_no,
      chapter_no: state.chapter_no,
      comment_enable: state.comment_enable,
      assignment_date: moment(state.assignment_date).format("YYYY-MM-DD"),
      submission_date: moment(state.submission_date).format("YYYY-MM-DD"),
      school_code: getSchoolData().school_code,
      is_draft: "0",
      tclass: homeWorkDetail.class_code,
      hid: queryString?.hid,
        sdata: {
          class_code: homeWorkDetail.class_code,
          edit_mode: "",
          homework_id: "",
          edit_student_list: [],
          student_list: homeWorkDetail.students,
        },
      "multifile": [
        {
          "file_name": "IMG_1636181784933",
          "ext": ".jpg",
          "file": ""
        }
      ]
    };

    try {
      const res = await postRequest("add-homework", payload);

      if (res.data.response === "success") {
        SuccessNotificationMsg("Success", "Homework updated successfully.");
        setBtnLoading(false);
        props.history.push("/home-work");
      } else {
        setBtnLoading(false);
        ErrorNotificationMsg("Error in Homework create.");
      }
    } catch (error) {
      setBtnLoading(false);
      ErrorNotificationMsg(error.errmsg);
    }
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
          <PageHeader pageTitle="Home Work" />
          <div className="row">
            <div className="col-md-12">
              <div id="panel-1" className="panel">
                <div className="panel-hdr">
                  <h2>Home Work</h2>
                  <div className="panel-toolbar">
                    <Space>
                      <Link
                        to="/home-work"
                        className="btn btn-sm btn-info waves-effect waves-themed"
                      >
                        <i className="fal fa-clipboard-list"></i> View Home Work
                      </Link>
                    </Space>
                  </div>
                </div>
                <div className="panel-container show">
                  <div className="panel-content p-0">
                    <Form
                      onFinish={onFinish}
                      ref={formRef}
                      autoComplete="off"
                      layout="vertical"
                    >
                      <div className="panel-content">
                        <Row gutter={[15]}>
                          <Col xs={24} sm={12} lg={12}>
                            <Form.Item
                              name="assignment_date"
                              label="Assignment Date"
                            >
                              <DatePicker
                                defaultValue={moment()}
                                format={dateFormat}
                                disabledDate={disablePastDate}
                                onChange={handleChangeAssignmentDate}
                                style={{ width: "100%" }}
                              />
                            </Form.Item>
                          </Col>
                          <Col xs={24} sm={12} lg={12}>
                            <Form.Item
                              name="submission_date"
                              label="Submission Date"
                            >
                              <DatePicker
                                defaultValue={moment()}
                                format={dateFormat}
                                disabledDate={disablePastDate}
                                onChange={handleChangeSubmissionDate}
                                style={{ width: "100%" }}
                              />
                            </Form.Item>
                          </Col>

                          <Col xs={24} sm={12} lg={8}>
                            <Form.Item
                              label="Page No."
                              name="page_no"
                              rules={[
                                {
                                  required: true,
                                  whitespace: true,
                                  message: "Please enter page no",
                                },
                              ]}
                            >
                              <Input
                                onChange={(value) =>
                                  handleChange("page_no", value)
                                }
                              />
                            </Form.Item>
                          </Col>
                          <Col xs={24} sm={12} lg={8}>
                            <Form.Item
                              label="Chapter No."
                              name="chapter_no"
                              rules={[
                                {
                                  required: true,
                                  whitespace: true,
                                  message: "Please enter chapter no",
                                },
                              ]}
                            >
                              <Input
                                onChange={(value) =>
                                  handleChange("chapter_no", value)
                                }
                              />
                            </Form.Item>
                          </Col>
                          <Col xs={24} sm={12} lg={8}>
                            <Form.Item
                              name="comment_enable"
                              label="Enable Comment"
                            >
                              <Select
                                defaultValue={0}
                                onChange={(value) =>
                                  handleSelectChange("comment_enable", value)
                                }
                              >
                                <Option value={0}>No</Option>
                                <Option value={1}>Yes</Option>
                              </Select>
                            </Form.Item>
                          </Col>

                          <Col xs={24} sm={12} lg={24}>
                            <Form.Item
                              label="Topic"
                              name="topic"
                              rules={[
                                {
                                  required: true,
                                  whitespace: true,
                                  message: "Please enter topic",
                                },
                              ]}
                            >
                              <Input
                                onChange={(value) =>
                                  handleChange("topic", value)
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
                              <TextArea
                                rows={4}
                                onChange={(value) =>
                                  handleChange("description", value)
                                }
                              />
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

export default EditHomeWork;
