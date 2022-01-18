import React, { useState, useRef, useEffect } from "react";
import { Modal, Form, Button, DatePicker, Select, Col, Row, Space } from "antd";
import { postRequest } from "../../axios";

const { Option } = Select;

const NoticeBoardFilter = (props) => {
  const dateFormat = "DD/MM/YYYY";
  const formRef = useRef();
  const [showModel, setShowModel] = useState(false);
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    getCategoryList();
  }, []);

  const hideModelFunction = () => {
    setShowModel(false);
  };

  const showModelFunction = () => {
    setShowModel(true);
  };

  const getCategoryList = async () => {
    const response = await postRequest("get-notice-board-category", {
      applyFilter: 1,
    });
    setCategoryList(response.data.response);
  };

  const onFinish = async () => {
    props.applyFilter();
    setShowModel(false);
  };

  const onReset = () => {
    window.location.href = "/notice-board";
  };

  return (
    <>
      <span onClick={() => showModelFunction()} style={{ float: "right" }}>
        <button
          className={
            props.filterApply
              ? "btn btn-sm btn-secondary waves-effect waves-themed"
              : "btn btn-sm btn-primary waves-effect waves-themed"
          }
        >
          <i className="fal fa-filter"></i> Filter
        </button>
      </span>

      <Modal
        title="Notice Board Filter"
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
              <Form.Item name="posted_date" label="Posted Date">
                <DatePicker
                  format={dateFormat}
                  onChange={props.handleFilterChangeFilterDate}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} lg={12}>
              <Form.Item name="category" label="Category">
                <Select
                  placeholder="Select Category"
                  allowClear
                  onChange={(value) =>
                    props.handleFilterSelectChange("category", value)
                  }
                >
                  {!!categoryList &&
                    categoryList.map((s) => (
                      <Option key={s.id} value={s.name}>
                        {s.name}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
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

export default NoticeBoardFilter;
