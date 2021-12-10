import React, { useState, useRef, useEffect } from "react";
import moment from "moment";
import { Modal, Form, Button, Col, Row, Select, Radio } from "antd";

import { postRequest } from "../../axios";
import { getSessionData, getUserData, getUserType } from "../../utils/Helpers";
import { ErrorNotificationMsg } from "../../utils/NotificationHelper";

const { Option } = Select;

const FeePayment = (props) => {
  const formRef = useRef();
  const [state, setState] = useState({
    selectedMonth: [],
  });
  const [showModel, setShowModel] = useState(false);
  const [showPGModel, setShowPGModel] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [pgData, setPGData] = useState(null);

  const hideModelFunction = () => {
    setShowModel(false);
  };

  const showModelFunction = () => {
    setShowModel(true);
  };

  const hidePGModelFunction = () => {
    setShowPGModel(false);
  };

  const showPGModelFunction = () => {
    setShowPGModel(true);
  };

  const handleFilterSelectChange = (field, value) => {
    setState({ ...state, selectedMonth: value });
  };

  const onFinish = async () => {
    const payload = {
      form_data: {
        paymentGateway: "PayUmoney",
        schoolCode: "2222222",
        sessionCode: "2021",
        sid: "1",
        categoryId: "2",
        nameArray: [
          {
            id: "6",
            markOptional: 0,
          },
        ],
        amount: "702",
        selectedMonth: [
          {
            monthId: "10",
            monthName: "OCT",
          },
          {
            monthId: "11",
            monthName: "NOV",
          },
        ],
      },
    };

    setBtnLoading(true);

    try {
      let res = await postRequest("get-payment-gateway-detail", payload);

      if (res.data.error === 0) {
        setBtnLoading(false);
        setPGData(res.data.response.data);
        hideModelFunction();
        showPGModelFunction();
      } else {
        setBtnLoading(false);
        ErrorNotificationMsg("Error in fees payment.");
      }
    } catch (error) {
      setBtnLoading(false);
      ErrorNotificationMsg(error.message);
    }
  };

  return (
    <>
      <button
        onClick={() => showModelFunction()}
        className="btn btn-block btn-success"
        type="submit"
      >
        PAY NOW
      </button>

      <Modal
        title="Select Month for Payment"
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
              <Form.Item
                name="subject"
                label="Select Month(s)"
                rules={[
                  {
                    required: true,
                    message: "Please select atleast one month!",
                  },
                ]}
              >
                <Select
                  mode="multiple"
                  placeholder="Select Month"
                  onChange={(value) => handleFilterSelectChange(value)}
                >
                  {!!props.feesDueDetail &&
                    props.feesDueDetail.map((s) => (
                      <Option key={s.monthId} value={s.monthId}>
                        {s.monthName}
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
              Submit
            </Button>
          </div>
        </Form>
      </Modal>

      <Modal
        title="Select Payment Gateway"
        visible={showPGModel}
        onCancel={hidePGModelFunction}
        footer={false}
      >
        <form
          action="https://secure.payu.in/_payment"
          method="POST"
        >
          <input type="hidden" name="key" value={pgData?.pgDetails?.merchantKey} />
          <input type="hidden" name="hash" value={pgData?.pgDetails?.hash} />
          <input type="hidden" name="txnid" value={pgData?.pgDetails?.txnid} />
          <input type="hidden" name="amount" value={pgData?.pgDetails?.amount} />
          <input type="hidden" name="firstname" value={pgData?.pgDetails?.firstname} />
          <input type="hidden" name="email" value={pgData?.pgDetails?.email} />
          <input type="hidden" name="phone" value={pgData?.pgDetails?.phone} />
          <input type="hidden" name="productinfo" value={pgData?.pgDetails?.productinfo} />
          <input
            type="hidden"
            name="service_provider"
            value="payu_paisa"
            size="64"
          />
          <input type="hidden" name="surl" value={pgData?.pgDetails?.surl} />
          <input type="hidden" name="furl" value={pgData?.pgDetails?.furl} />
          <input type="hidden" name="udf1" value={pgData?.pgDetails?.udf1} />
        
          <input type="submit" value="Submit"  />
        {/* <Row gutter={[15]}>
          <Col xs={24} sm={12} lg={12}>
            <Form.Item name="subject" label="Select Month(s)">
              <Radio on>PayUmoney</Radio>
            </Form.Item>
          </Col>
        </Row> */}
        </form>
      </Modal>
    </>
  );
};

export default FeePayment;
