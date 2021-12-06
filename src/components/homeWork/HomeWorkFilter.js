import React, { useState, useRef, useEffect } from "react";
import moment from "moment";
import { Modal, Form, Button, DatePicker, Col, Row, Radio, Select } from "antd";

import { postRequest } from "../../axios";
import { getSessionData, getUserData } from "../../utils/Helpers";

const { Option } = Select;

const HomeWorkFilter = (props) => {
  const dateFormat = "DD/MM/YYYY";
  const formRef = useRef();
  const [state, setState] = useState({
    comment: null,
  });
  const [showModel, setShowModel] = useState(false);
  const [classList, setClassList] = useState([]);

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
    let uniqueClassList = classArr.filter(
      (item, pos) => classArr.indexOf(item) === pos
    );
    setClassList(uniqueClassList);
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
          <Row gutter={[15]} className="mb-3">
            <Col xs={24} sm={12} lg={12}>
              <label>Based On</label>
              <br />
              <Radio.Group onChange={props.handleFilterChangeDateType}>
                <Radio value="is_assignment">Assignment Date</Radio>
                <Radio value="is_submission">Submission Date</Radio>
              </Radio.Group>
            </Col>
          </Row>

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
            <Col xs={24} sm={12} lg={12}>
              <Form.Item name="class_code" label="Class">
                <Select
                  placeholder="Select Class"
                  onChange={(value) =>
                    props.handleFilterSelectChange("category", value)
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
              <Form.Item name="subject" label="Subject">
                <Select
                  placeholder="Select Subject"
                  onChange={(value) =>
                    props.handleFilterSelectChange("category", value)
                  }
                ></Select>
              </Form.Item>
            </Col>
          </Row>

          <div className="panel-content mt-2 d-flex flex-row">
            <Button
              type="primary"
              htmlType="submit"
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

export default HomeWorkFilter;