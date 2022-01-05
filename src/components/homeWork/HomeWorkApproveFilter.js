import React, { useState, useRef, useEffect } from "react";
import {
  Modal,
  Form,
  Button,
  DatePicker,
  Col,
  Row,
  Radio,
  Select,
  Space,
} from "antd";

import { postRequest } from "../../axios";
import { getSessionData, getUserData, getUserType } from "../../utils/Helpers";

const { Option } = Select;

const HomeWorkApproveFilter = (props) => {
  const dateFormat = "DD/MM/YYYY";
  const formRef = useRef();
  const [state, setState] = useState({
    comment: null,
  });
  const [showModel, setShowModel] = useState(false);
  const [classList, setClassList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);

  useEffect(() => {
    getClassList();

    if (getUserType() !== "staff") {
      loadSubjects();
    }
  }, []);

  const loadSubjects = () => {
    handleClassChange(
      "class_code",
      getUserData().stdClass + "-" + getUserData().stdSection
    );
  };

  const hideModelFunction = () => {
    setShowModel(false);
  };

  const showModelFunction = () => {
    setShowModel(true);
  };

  const getClassList = async () => {
    const classRes = await postRequest("get-teacher-class-subject", {
      session_code: getSessionData().code,
      tid: getUserData().tid,
    });

    let classArr = classRes.data.response.as_class_teacher;
    let uniqueClassList = classArr.filter(
      (item, pos) => classArr.indexOf(item) === pos
    );
    setClassList(uniqueClassList);
  };

  const handleClassChange = async (field, value) => {
    if (value !== undefined && value !== "") {
      let classCode = value.split("-");

      setState({ ...state, [field]: classCode[0] });

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
      props.handleFilterSelectChange(field, value);
    }
  };

  const onFinish = async () => {
    props.applyFilter();
    setShowModel(false);
  };

  const onReset = () => {
    window.location.href = "/approval-home-work";
  };

  return (
    <>
      <span onClick={() => showModelFunction()} style={{ float: "right" }}>
        <button className="btn btn-sm btn-primary waves-effect waves-themed">
          <i className="fal fa-filter"></i> Filter
        </button>
      </span>

      <Modal
        title="Homework Filter"
        visible={showModel}
        onCancel={hideModelFunction}
        footer={false}
      >
        <Form
          onFinish={onFinish}
          ref={formRef}
          autoComplete="off"
          layout="vertical"
        >
          <Row gutter={[15]}>
            <Col xs={24} sm={12} lg={12}>
              <Form.Item name="filterDate" label="Date">
                <DatePicker
                  format={dateFormat}
                  onChange={props.handleFilterChangeFilterDate}
                  style={{ width: "100%" }}
                  disabled={
                    props?.filterData?.is_assignment === 0 &&
                    props?.filterData?.is_submission === 0
                      ? true
                      : false
                  }
                />
              </Form.Item>
            </Col>
            {getUserType() === "staff" && (
              <>
                <Col xs={24} sm={12} lg={12}>
                  <Form.Item name="class_section" label="Class">
                    <Select
                      allowClear
                      placeholder="Select Class"
                      onChange={(value) =>
                        handleClassChange("class_section", value)
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

                <Col xs={24} sm={12} lg={12}>
                  <Form.Item name="subject_id" label="Subject">
                    <Select
                      allowClear
                      placeholder="Select Subject"
                      onChange={(value) =>
                        props.handleFilterSelectChange("subject_id", value)
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
              </>
            )}
          </Row>

          <div className="panel-content mt-2 d-flex flex-row justify-content-end">
            <Space>
              <Button
                type="primary"
                htmlType="submit"
                className="btn btn-primary ml-auto waves-effect waves-themed"
              >
                Apply Filter
              </Button>
              <button
                onClick={onReset}
                className="btn btn-secondary ml-auto waves-effect waves-themed"
              >
                Clear Filter
              </button>
            </Space>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default HomeWorkApproveFilter;
