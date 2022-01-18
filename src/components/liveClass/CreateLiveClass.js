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
const { TextArea } = Input;

const CreateLiveClass = (props) => {
  const dateFormat = "DD-MM-YYYY";
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

    let uniqueClassList = [];
    classArr.map((cls) => {
      let clsname = cls.split("-");
      uniqueClassList.push(clsname[0]);
      return null;
    });

    let uniqueClasses = uniqueClassList.filter((v, i, a) => a.indexOf(v) === i);
    setClassList(uniqueClasses);
  };

  const handleClassChange = async (field, value) => {
    setState({ ...state, [field]: value });
    const sectionRes = await postRequest("get-section-by-class", {
      session_code: getSessionData().code,
      class_code: value,
    });
    setSectionList(sectionRes.data.response);
  };

  const handleSectionChange = async (field, value) => {
    setState({ ...state, sections: value });
    const subjectRes = await postRequest("get-subject-by-class-multi-section", {
      session_code: getSessionData().code,
      class_code: state.class_code,
      sections: value,
      tid: getUserData().tid,
    });

    setSubjectList(subjectRes.data.response);
  };

  const onFinish = async () => {
    let classDateTime =
      moment(state.class_date, "YYYY-MM-DD").format("YYYY-MM-DD") +
      " " +
      moment(state.class_start_time, "HH:mm A").format("HH:mm") +
      ":00";

    let diffinMinutes = moment().diff(classDateTime, "minutes");

    if (diffinMinutes > 0) {
      ErrorNotificationMsg("You can't create live class for past time.");
      return false;
    }

    setBtnLoading(true);

    try {
      let res = await postRequest("live-class-create", state);

      if (res.data.status === "success") {
        SuccessNotificationMsg("Success", res.data.message);
        setBtnLoading(false);
        props.history.push("/live-class");
      } else {
        setBtnLoading(false);
        ErrorNotificationMsg("Error in live class create.");
      }
    } catch (error) {
      setBtnLoading(false);
      ErrorNotificationMsg(error.message);
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
                            name="sections"
                            label="Section"
                            rules={[
                              {
                                required: true,
                                message: "Please select section!",
                              },
                            ]}
                          >
                            <Select
                              mode="multiple"
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
                          <Form.Item
                            name="subject_code"
                            label="Subject"
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
                          <Form.Item name="class_date" label="Class Date">
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
                          <Form.Item name="class_start_time" label="From Time">
                            <TimePicker
                              defaultValue={moment()}
                              format={timeFormat}
                              style={{ width: "100%" }}
                              onChange={handleChangeTime}
                            />
                          </Form.Item>
                        </Col>

                        <Col xs={24} sm={12} lg={8}>
                          <Form.Item
                            name="class_duration"
                            label="Duration"
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

                        <Col xs={24} sm={12} lg={24}>
                          <Form.Item name="remarks" label="Remarks">
                            <TextArea
                              placeholder="Enter Remarks"
                              rows={2}
                              onChange={(value) =>
                                handleChange("remarks", value)
                              }
                            />
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
                        onClick={() => props.history.push("/dashboard")}
                        className="btn btn-danger waves-effect waves-themed"
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
