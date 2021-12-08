import React, { useState, useEffect } from "react";
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
import {
  getSessionData,
  getUserData,
  getSchoolData,
} from "../../utils/Helpers";

const { Option } = Select;
const { TextArea } = Input;

const CreateHomeWork = (props) => {
  const dateFormat = "DD-MM-YYYY";
  const [state, setState] = useState({
    class_code: null,
    student_list: [],
    assignment_date: moment().format("DD-MM-YYYY"),
    submission_date: moment().format("DD-MM-YYYY"),
    subject: null,
    page_no: null,
    chapter_no: null,
    comment_enable: 0,
    topic: "",
    description: null,
  });
  const [btnLoading, setBtnLoading] = useState(false);
  const [classList, setClassList] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);

  useEffect(() => {
    getClassList();
  }, []);

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

  const getClassList = async () => {
    const classRes = await postRequest("get-teacher-class-subject", {
      session_code: getSessionData().code,
      tid: getUserData().tid,
    });

    let classArr = classRes.data.response.as_class_teacher.concat(
      classRes.data.response.as_subject_teacher
    );
    let uniqueClassList = classArr.filter(
      (item, pos) => classArr.indexOf(item) === pos
    );
    setClassList(uniqueClassList);
  };

  const handleClassChange = async (field, value) => {
    let classCode = value.split("-");

    setState({ ...state, [field]: classCode[0] });

    const studentRes = await postRequest("get-student-list-by-class", {
      sid: getSessionData().code,
      sclass: classCode[0],
      sections: classCode[1],
    });

    setStudentList(studentRes.data.response);

    const subjectRes = await postRequest("get-subject-by-class-multi-section", {
      session_code: getSessionData().code,
      class_code: classCode[0],
      sections: [classCode[1]],
      tid: getUserData().tid,
    });

    setSubjectList(subjectRes.data.response);
  };

  const onFinish = async () => {
    setBtnLoading(true);

    let studentsArr = [];
    state.student_list.map((student) => {
      let sInfo = student.split("-");
      studentsArr.push({ id: sInfo[0], name: sInfo[1] });
    });

    const payload = {
      edit_mode: "",
      sid: getSessionData().code,
      subject: state.subject,
      topic: state.topic,
      description: state.description,
      page_no: state.page_no,
      chapter_no: state.chapter_no,
      comment_enable: state.comment_enable,
      assignment_date: moment(state.assignment_date).format("YYYY-MM-DD"),
      submission_date: moment(state.submission_date).format("YYYY-MM-DD"),
      school_code: getSchoolData().school_code,
      is_draft: "0",
      tclass: state.class_code,
      hid: "",
      sdata: {
        class_code: state.class_code,
        edit_mode: "",
        homework_id: "",
        edit_student_list: [],
        student_list: studentsArr,
      },
      // "multifile": [
      //   {
      //     "file_name": "IMG_1636181784933",
      //     "ext": ".jpg",
      //     "file": ""
      //   }
      // ]
    };

    try {
      const res = await postRequest("add-homework", payload);

      if (res.data.response === "success") {
        SuccessNotificationMsg("Success", "Homework created successfully.");
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
                        to="/create-home-work-by-subject"
                        className="btn btn-sm btn-primary waves-effect waves-themed"
                      >
                        <i className="fal fa-plus"></i> Create By Subject
                      </Link>
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
                      autoComplete="off"
                      layout="vertical"
                    >
                      <div className="panel-content">
                        <Row gutter={[15]}>
                          <Col xs={24} sm={12} lg={8}>
                            <Form.Item
                              name="class_code"
                              label="Class"
                              rules={[
                                {
                                  required: true,
                                  message: "Please select class!",
                                },
                              ]}
                            >
                              <Select
                                placeholder="Select Class"
                                onChange={(value) =>
                                  handleClassChange("class_code", value)
                                }
                              >
                                {!!classList &&
                                  classList.map((s) => (
                                    <Option key={s} value={s}>
                                      {s}
                                    </Option>
                                  ))}
                              </Select>
                            </Form.Item>
                          </Col>

                          <Col xs={24} sm={12} lg={8}>
                            <Form.Item
                              name="student_list"
                              label="Roll(s)"
                              rules={[
                                {
                                  required: true,
                                  message: "Please select students!",
                                },
                              ]}
                            >
                              <Select
                                mode="multiple"
                                placeholder="Select Rolls"
                                onChange={(value) =>
                                  handleSelectChange("student_list", value)
                                }
                              >
                                {!!studentList &&
                                  studentList.map((s) => (
                                    <Option
                                      key={s.roll_no}
                                      value={
                                        s.student_class_id +
                                        "-" +
                                        s.student_name
                                      }
                                    >
                                      {s.roll_no + " - " + s.student_name}
                                    </Option>
                                  ))}
                              </Select>
                            </Form.Item>
                          </Col>
                        </Row>
                        <hr />

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

                          <Col xs={24} sm={12} lg={24}>
                            <Form.Item
                              label="Subject"
                              name="subject"
                              rules={[
                                {
                                  required: true,
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
                                {!!subjectList &&
                                  subjectList.map((s) => (
                                    <Option key={s.id} value={s.id}>
                                      {s.subject_name}
                                    </Option>
                                  ))}
                              </Select>
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

export default CreateHomeWork;
