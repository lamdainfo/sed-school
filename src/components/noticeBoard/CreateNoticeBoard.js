import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { Input, Row, Col, Select, Form, Button, Switch, Space } from "antd";
import { postRequest } from "../../axios";

import PageHeader from "../common/PageHeader";
import NoticeBoardDocumentUpload from "./NoticeBoardDocumentUpload";
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

const CreateNoticeBoard = (props) => {
  const formRef = useRef();
  const [state, setState] = useState({
    edit_mode: "",
    posted_on: null,
    category: null,
    subject: null,
    description: null,
    comment_enable: 0,
    school_code: null,
    is_draft: "0",
    class_code: null,
    student_list: [],
    projectDocuments: [],
    uploadedFiles: [],
  });
  const [btnLoading, setBtnLoading] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [classList, setClassList] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [switchStatus, setSwitchStatus] = useState(false);

  useEffect(() => {
    getCategoryList();
    getClassList();
  }, []);

  const handleChange = (field, value) => {
    setState({ ...state, [field]: value.target.value });
  };

  const handleSelectChange = (field, value) => {
    setState({ ...state, [field]: value });
  };

  const getCategoryList = async () => {
    const response = await postRequest("get-notice-board-category", {
      applyFilter: 0,
    });
    setCategoryList(response.data.response);
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
    setState({ ...state, [field]: classCode[0], student_list: [] });
    setSwitchStatus(false);
    formRef.current.setFieldsValue({ student_list: [] });

    const studentRes = await postRequest("get-student-list-by-class", {
      sid: getSessionData().code,
      sclass: classCode[0],
      sections: classCode[1],
    });

    setStudentList(studentRes.data.response);
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
    console.log(state);
    return false;

    setBtnLoading(true);

    let studentsArr = [];
    state.student_list.map((student) => {
      let sInfo = student.split("-");
      studentsArr.push({ id: sInfo[0], name: sInfo[1] });
      return null;
    });

    let multifile = [];
    state.projectDocuments.map((img) => {
      getBase64(img.file, (imageUrl) => {
        img.file = imageUrl.replace("data:", "").replace(/^.+,/, "");
      });
      multifile.push(img);
      return null;
    });

    await sleep(state.projectDocuments.length * 1000);

    const payload = {
      edit_mode: "",
      session_id: getSessionData().code,
      posted_on: moment().format("YYYY-MM-DD"),
      category: state.category,
      subject: state.subject,
      description: state.description,
      comment_enable: state.comment_enable,
      school_code: getSchoolData().school_code,
      is_draft: state.is_draft,
      sdata: {
        class_code: state.class_code,
        edit_student_list: [],
        student_list: studentsArr,
        staff_list: [],
      },
      multifile: multifile,
    };

    try {
      await postRequest("add-notice-board", payload);
      SuccessNotificationMsg("Success", "Notice Board created successfully");
      setBtnLoading(false);
      props.history.push("/notice-board");
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
                                value={state.student_list}
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
                          <Col xs={24} sm={12} lg={8}>
                            <Form.Item
                              name="category"
                              label="Category"
                              rules={[
                                {
                                  required: true,
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
                                    <Option key={s.id} value={s.id}>
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
                              label="Subject"
                              name="subject"
                              rules={[
                                {
                                  required: true,
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
                              <TextArea
                                rows={4}
                                onChange={(value) =>
                                  handleChange("description", value)
                                }
                              />
                            </Form.Item>
                          </Col>

                          <Col xs={24} sm={12} lg={24}>
                            <NoticeBoardDocumentUpload
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

export default CreateNoticeBoard;
