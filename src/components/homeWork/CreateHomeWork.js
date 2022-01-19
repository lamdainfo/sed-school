import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import {
  Input,
  Row,
  Col,
  Select,
  Form,
  Button,
  DatePicker,
  Space,
  Switch,
} from "antd";
import { postRequest } from "../../axios";

import PageHeader from "../common/PageHeader";
import HomeworkDocumentUpload from "./HomeworkDocumentUpload";
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
  const formRef = useRef();
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
    projectDocuments: [],
    is_draft: "0",
  });
  const [btnLoading, setBtnLoading] = useState(false);
  const [classList, setClassList] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [switchStatus, setSwitchStatus] = useState(false);

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
    setState({ ...state, assignment_date: date, submission_date: date });
    formRef.current.setFieldsValue({ submission_date: date });
  };

  const handleChangeSubmissionDate = (date, dateString) => {
    setState({ ...state, submission_date: date });
  };

  const disablePastDate = (current) => {
    let customDate = moment().format("DD-MM-YYYY");
    return current && current < moment(customDate, "DD-MM-YYYY");
  };

  const disableSubmissionDate = (current) => {
    let customDate = state.assignment_date;
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
    setState({ ...state, [field]: value, student_list: [], subject: null });
    setSwitchStatus(false);
    formRef.current.setFieldsValue({ student_list: [], subject: null });

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

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const onFinish = async () => {
    setBtnLoading(true);

    let studentsArr = [];
    state.student_list.map((student) => {
      let sInfo = student.split("-");
      studentsArr.push({ id: sInfo[0], name: sInfo[1] });
    });

    let multifile = [];
    state.projectDocuments.map((img) => {
      getBase64(img.file, (imageUrl) => {
        img.file = imageUrl.replace("data:", "").replace(/^.+,/, "");
      });
      multifile.push(img);
    });

    await sleep(state.projectDocuments.length * 1000);

    const payload = {
      edit_mode: "",
      sid: getSessionData().code,
      subject: state.subject,
      topic: state.topic,
      description: state.description,
      page_no: state.page_no,
      chapter_no: state.chapter_no,
      comment_enable: state.comment_enable,
      assignment_date: moment(state.assignment_date, "DD-MM-YYYY").format(
        "YYYY-MM-DD"
      ),
      submission_date: moment(state.submission_date, "DD-MM-YYYY").format(
        "YYYY-MM-DD"
      ),
      school_code: getSchoolData().school_code,
      is_draft: state.is_draft,
      tclass: state.class_code,
      hid: "",
      sdata: {
        class_code: state.class_code,
        edit_mode: "",
        homework_id: "",
        edit_student_list: [],
        student_list: studentsArr,
      },
      multifile: multifile,
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

  const handleProjectDocumentChange = (images) => {
    setState({ ...state, projectDocuments: images });
  };

  const handleDocumentDelete = (doc) => {
    let documents = state.projectDocuments;
    let documentIndex = documents.findIndex(
      (res) => res.file.uid === doc.file.uid
    );
    documents.splice(documentIndex, 1);
    setState({ ...state, projectDocuments: documents });
  };

  const onSwitchChange = async (status) => {
    let studentsArr = [];
    if (status) {
      studentList.map((s) => {
        studentsArr.push(s.student_class_id + "-" + s.student_name);
        return null;
      });
    }

    setSwitchStatus(status);
    setState({ ...state, student_list: studentsArr });
    formRef.current.setFieldsValue({ student_list: studentsArr });
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
                      ref={formRef}
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
                            <>
                              Select All{" "}
                              <Switch
                                onChange={onSwitchChange}
                                checked={switchStatus}
                                disabled={
                                  state.class_code !== null ? false : true
                                }
                              />
                            </>
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
                                allowClear={false}
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
                                allowClear={false}
                                defaultValue={moment()}
                                format={dateFormat}
                                disabledDate={disableSubmissionDate}
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
                            <Form.Item label="Page No." name="page_no">
                              <Input
                                onChange={(value) =>
                                  handleChange("page_no", value)
                                }
                              />
                            </Form.Item>
                          </Col>
                          <Col xs={24} sm={12} lg={8}>
                            <Form.Item label="Chapter No." name="chapter_no">
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
                            <HomeworkDocumentUpload
                              stateValues={state}
                              handleProjectDocumentChange={
                                handleProjectDocumentChange
                              }
                              handleDocumentDelete={handleDocumentDelete}
                            />
                          </Col>
                        </Row>
                        <br />
                      </div>

                      <div className="panel-content border-faded border-left-0 border-right-0 border-bottom-0 d-flex flex-row justify-content-end">
                        <Space>
                          <Button
                            type="secondary"
                            onClick={() =>
                              setState({ ...state, is_draft: "1" })
                            }
                            htmlType="submit"
                            loading={btnLoading}
                            className="btn btn-danger ml-auto waves-effect waves-themed"
                          >
                            Draft
                          </Button>
                          <Button
                            type="primary"
                            htmlType="submit"
                            onClick={() =>
                              setState({ ...state, is_draft: "0" })
                            }
                            loading={btnLoading}
                            className="btn btn-primary ml-auto waves-effect waves-themed"
                          >
                            Publish
                          </Button>
                        </Space>
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
