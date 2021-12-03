import React, { useState, useRef, useEffect } from "react";
import moment from "moment";
import { Modal, Form, Button, DatePicker, Select, Col, Row } from "antd";

import { postRequest } from "../../axios";
import { getSessionData, getUserData } from "../../utils/Helpers";

const { Option } = Select;

const LiveClassFilter = (props) => {
  const dateFormat = "DD/MM/YYYY";
  const formRef = useRef();
  const [state, setState] = useState({
    comment: null,
  });
  const [showModel, setShowModel] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  const [classList, setClassList] = useState([]);
  const [sectionList, setSectionList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);

  useEffect(() => {
    getClassList();
  }, []);

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

    let classArr = classRes.data.response.as_class_teacher.concat(
      classRes.data.response.as_subject_teacher
    );

    let uniqueClassList = [];
    classArr.map((cls) => {
      let clsname = cls.split("-");
      uniqueClassList.push(clsname[0]);
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
    props.applyFilter();
    setShowModel(false);
  };

  return (
    <>
      <span onClick={() => showModelFunction()} style={{ float: "right" }}>
        <button className="btn btn-sm btn-primary waves-effect waves-themed">
          <i className="fal fa-filter"></i> Filter
        </button>
      </span>

      <Modal
        title="Live Class Filter"
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
                  defaultValue={moment()}
                  format={dateFormat}
                  onChange={props.handleFilterChangeFilterDate}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[15]}>
            <Col xs={24} sm={12} lg={8}>
              <Form.Item name="class_code" label="Class">
                <Select
                  placeholder="Select Class"
                  onChange={(value) => handleClassChange("class_code", value)}
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
              <Form.Item label="Section" name="sections">
                <Select
                  mode="multiple"
                  placeholder="Select Section"
                  onChange={(value) => handleSectionChange("sections", value)}
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
              <Form.Item label="Subject" name="subject">
                <Select
                  placeholder="Select Subject"
                  // onChange={(value) => handleSubjectChange("subject", value)}
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
          </Row>

          <div className="panel-content mt-2 d-flex flex-row">
            <Button
              type="primary"
              htmlType="submit"
              loading={btnLoading}
              className="btn btn-primary ml-auto waves-effect waves-themed"
            >
              Apply Filter
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default LiveClassFilter;
