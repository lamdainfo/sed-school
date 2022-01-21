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
import EditHomeworkDocumentUpload from "./EditHomeworkDocumentUpload";
import {
  SuccessNotificationMsg,
  ErrorNotificationMsg,
} from "../../utils/NotificationHelper";
import {
  getSessionData,
  getSchoolData,
  getUserData,
} from "../../utils/Helpers";

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
    subject: null,
    projectDocuments: [],
  });
  const [btnLoading, setBtnLoading] = useState(false);
  const [homeWorkDetail, setHomeWorkDetail] = useState(null);
  const [subjectList, setSubjectList] = useState([]);

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
    setState({
      page_no: response.data.response.page_no,
      chapter_no: response.data.response.chapter_no,
      topic: response.data.response.topic,
      description: response.data.response.description,
      comment_enable: response.data.response.comment_enable,
      assignment_date: response.data.response.assignment_date,
      submission_date: response.data.response.submission_date,
      subject: response.data.response.subject,
      projectDocuments: response.data.response.documents,
    });
    formRef.current.setFieldsValue({
      page_no: response.data.response.page_no,
      chapter_no: response.data.response.chapter_no,
      topic: response.data.response.topic,
      description: response.data.response.description,
      comment_enable: response.data.response.comment_enable,
      assignment_date: moment(
        response.data.response.assignment_date,
        "DD-MM-YYYY"
      ),
      submission_date: moment(
        response.data.response.submission_date,
        "DD-MM-YYYY"
      ),
      subject: response.data.response.subject,
    });
    getSubjectList(response.data.response.class_code);
  };

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

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function toDataURL(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.send();
  }

  const onFinish = async () => {
    setBtnLoading(true);

    let multifile = [];
    state.projectDocuments.map((img) => {
      if (img.file !== undefined && img.file !== "") {
        getBase64(img.file, (imageUrl) => {
          img.file = imageUrl.replace("data:", "").replace(/^.+,/, "");
        });
      } else {
        toDataURL(img.file_url, function (dataUrl) {
          console.log("RESULT:", dataUrl);
          img.file = dataUrl.replace("data:", "").replace(/^.+,/, "");
        });
      }
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
      is_draft: homeWorkDetail.is_draft,
      tclass: homeWorkDetail.class_code,
      hid: queryString?.hid,
      sdata: {
        class_code: homeWorkDetail.class_code,
        edit_mode: "",
        homework_id: "",
        edit_student_list: [],
        student_list: homeWorkDetail.students,
      },
      multifile: multifile,
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

  const getSubjectList = async (classCodeVal) => {
    if (classCodeVal !== "") {
      let classCode = classCodeVal.split("-");
      const subjectRes = await postRequest(
        "get-subject-by-class-multi-section",
        {
          session_code: getSessionData().code,
          class_code: classCode[0],
          sections: [classCode[1]],
          tid: getUserData().tid,
        }
      );

      setSubjectList(subjectRes.data.response);
    }
  };

  const uploadProps = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text",
    },
  };

  const handleProjectDocumentChange = (images) => {
    setState({ ...state, projectDocuments: images });
  };

  const handleDocumentDelete = (doc) => {
    if (doc.id !== undefined && doc.id !== "") {
      let documents = state.projectDocuments;
      let documentIndex = documents.findIndex((res) => res.id === doc.id);
      documents.splice(documentIndex, 1);
      setState({ ...state, projectDocuments: documents });
    } else {
      let documents = state.projectDocuments;
      let documentIndex = documents.findIndex(
        (res) => res.file.uid === doc.file.uid
      );
      documents.splice(documentIndex, 1);
      setState({ ...state, projectDocuments: documents });
    }
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
                            <EditHomeworkDocumentUpload
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
