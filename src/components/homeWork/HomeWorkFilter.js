import React, { useState, useRef } from "react";
import moment from "moment";
import { Modal, Form, Button, DatePicker, Col, Row } from "antd";

const HomeWorkFilter = (props) => {
  const dateFormat = "DD/MM/YYYY";
  const formRef = useRef();
  const [state, setState] = useState({
    comment: null,
  });
  const [showModel, setShowModel] = useState(false);

  const hideModelFunction = () => {
    setShowModel(false);
  };

  const showModelFunction = () => {
    setShowModel(true);
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
