import React, { useState, useEffect } from "react";
import { postRequest } from "../../axios";
import moment from "moment";
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
import {
  SuccessNotificationMsg,
  ErrorNotificationMsg,
} from "../../utils/NotificationHelper";
import { getSessionData, getUserData } from "../../utils/Helpers";

const { Option } = Select;

const CreateLiveClass = (props) => {
  const dateFormat = "YYYY-MM-DD";
  const timeFormat = "HH:mm";

  const [state, setState] = useState({
    session_code: getSessionData().code,
    class_code: null,
    sections: [],
    subject_code: null,
    class_date: moment().format("YYYY-MM-DD"),
    class_start_time: moment().format("HH:mm"),
    class_duration: null,
    remarks: null,
    status: 1,
  });

  const [btnLoading, setBtnLoading] = useState(false);
  const [classList, setClassList] = useState([]);
  const [sectionList, setSectionList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);

  const handleChange = (field, value) => {
    setState({ ...state, [field]: value.target.value });
  };

  const handleSelectChange = (field, value) => {
    setState({ ...state, [field]: value });
  };

  useEffect(() => {
    getClassList();
  }, []);

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

    const sectionRes = await postRequest("get-section-by-class", {
      session_code: getSessionData().code,
      class_code: classCode[0],
    });

    setSectionList(sectionRes.data.response);
  };

  const handleSectionChange = async (field, value) => {
    setState({ ...state, sections: [value] });

    const subjectRes = await postRequest("get-subject-by-class-multi-section", {
      session_code: getSessionData().code,
      class_code: state.class_code,
      sections: [value],
      tid: getUserData().tid,
    });

    setSubjectList(subjectRes.data.response);
  };

  const onFinish = async () => {
    setBtnLoading(true);

    try {
      const createClassResponse = await postRequest("live-class-create", state);

      SuccessNotificationMsg("Success", "Live class created successfully");
      setBtnLoading(false);
      props.history.push("/live-class");
    } catch (error) {
      setBtnLoading(false);
      ErrorNotificationMsg(error.errmsg);
    }
  };

  const disablePastDate = (current) => {
    let customDate = moment().format("YYYY-MM-DD");
    return current && current < moment(customDate, "YYYY-MM-DD");
  };

  const handleChangeTime = (time, timeString) => {
    setState({ ...state, class_start_time: timeString });
  };

  const handleChangeDate = (date, dateString) => {
    setState({ ...state, class_date: dateString });
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
                            name="class_code"
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
                          <label>Section *</label>
                          <Form.Item
                            name="sections"
                            rules={[
                              {
                                required: true,
                                message: "Please select section!",
                              },
                            ]}
                          >
                            <Select
                              placeholder="Select Section"
                              onChange={(value) =>
                                handleSectionChange("sections", value)
                              }
                            >
                              {!!sectionList &&
                                sectionList.map((s) => (
                                  <Option key={s} value={s}>
                                    {s}
                                  </Option>
                                ))}
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} lg={8}>
                          <label>Subject *</label>
                          <Form.Item
                            name="subject_code"
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
                                handleSelectChange("subject_code", value)
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
                          <label>Class Date *</label>
                          <Form.Item name="class_date">
                            <DatePicker
                              defaultValue={moment()}
                              format={dateFormat}
                              disabledDate={disablePastDate}
                              onChange={handleChangeDate}
                              style={{ width: "100%" }}
                            />
                          </Form.Item>
                        </Col>

                        <Col xs={24} sm={12} lg={8}>
                          <label>From Time *</label>
                          <Form.Item name="class_start_time">
                            <TimePicker
                              defaultValue={moment()}
                              format={timeFormat}
                              style={{ width: "100%" }}
                              onChange={handleChangeTime}
                            />
                          </Form.Item>
                        </Col>

                        <Col xs={24} sm={12} lg={8}>
                          <label>Duration *</label>
                          <Form.Item
                            name="class_duration"
                            rules={[
                              {
                                required: true,
                                message: "Please select class duration!",
                              },
                            ]}
                          >
                            <Select
                              placeholder="Select Duration"
                              onChange={(value) =>
                                handleSelectChange("class_duration", value)
                              }
                            >
                              <Option value="20">20 min</Option>
                              <Option value="25">25 min</Option>
                              <Option value="30">30 min</Option>
                              <Option value="35">35 min</Option>
                              <Option value="40">40 min</Option>
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
                          <Form.Item name="status">
                            <Select
                              placeholder="Select Status"
                              defaultValue={1}
                              onChange={(value) =>
                                handleSelectChange("status", value)
                              }
                            >
                              <Option value={1}>Active</Option>
                              <Option value={0}>Inactive</Option>
                            </Select>
                          </Form.Item>
                        </Col>
                      </Row>
                    </div>
                    <div className="panel-content border-faded border-left-0 border-right-0 border-bottom-0 d-flex flex-row">
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
                        onClick={() => props.history.push("/dashboard")}
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
