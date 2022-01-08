import React, { useState, useRef } from "react";
import { Modal, Form, Button, Col, Row, Select } from "antd";

import { postRequest } from "../../axios";
import { getSessionData, getSchoolData } from "../../utils/Helpers";
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

  const handleFilterSelectChange = (value) => {
    setState({ ...state, selectedMonth: value });
  };

  const onFinish = async () => {
    let selectedMonthArr = [];
    state.selectedMonth.map((month) => {
      let sInfo = month.split("-");
      selectedMonthArr.push({ monthId: sInfo[0], monthName: sInfo[1] });
    });

    const payload = {
      form_data: {
        paymentGateway: "PayUmoney",
        schoolCode: getSchoolData().school_code,
        sessionCode: getSessionData().rcode,
        sid: "1",
        categoryId: props?.categoryId,
        nameArray: props?.nameArray,
        amount: state.selectedMonth.length * props?.amountPerMonth,
        selectedMonth: selectedMonthArr,
        platform: "web",
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
            <Col xs={24} sm={24} lg={24}>
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
                      <Option
                        key={s.monthId}
                        value={s.monthId + "-" + s.monthName}
                      >
                        {s.monthName}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[15]}>
            <Col xs={24} sm={24} lg={24}>
              <table className="table table-sm table-bordered table-hover">
                <thead className="thead-themed text-center">
                  <tr>
                    <th>
                      PREVIOUS DUE
                      <br />
                      (1)
                    </th>
                    <th>
                      NUMBER OF MONTH(S)
                      <br />
                      (2)
                    </th>
                    <th>
                      AMOUNT
                      <br />
                      (3)
                    </th>
                    <th>
                      TOTAL
                      <br />
                      (1+2x3)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-right">
                      <i className="fal fa-rupee-sign"></i>
                      <span>0</span>
                    </td>
                    <td className="text-right">
                      <span>{state.selectedMonth.length}</span>
                    </td>
                    <td className="text-right">
                      <i className="fal fa-rupee-sign"></i>
                      <span> {props?.amountPerMonth}</span>
                    </td>
                    <td className="text-right">
                      <i className="fal fa-rupee-sign"></i>
                      <span>
                        {state.selectedMonth.length * props?.amountPerMonth}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
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
        <p>
          Payable Amount : {state.selectedMonth.length * props?.amountPerMonth}
        </p>
        <form action="https://secure.payu.in/_payment" method="POST">
          <input
            type="hidden"
            name="key"
            value={pgData?.pgDetails?.merchantKey}
          />
          <input type="hidden" name="hash" value={pgData?.pgDetails?.hash} />
          <input type="hidden" name="txnid" value={pgData?.pgDetails?.txnid} />
          <input
            type="hidden"
            name="amount"
            value={pgData?.pgDetails?.amount}
          />
          <input
            type="hidden"
            name="firstname"
            value={pgData?.pgDetails?.firstname}
          />
          <input type="hidden" name="email" value={pgData?.pgDetails?.email} />
          <input type="hidden" name="phone" value={pgData?.pgDetails?.phone} />
          <input
            type="hidden"
            name="productinfo"
            value={pgData?.pgDetails?.productinfo}
          />
          <input
            type="hidden"
            name="service_provider"
            value="payu_paisa"
            size="64"
          />
          <input type="hidden" name="surl" value={pgData?.pgDetails?.surl} />
          <input type="hidden" name="furl" value={pgData?.pgDetails?.furl} />
          <input type="hidden" name="udf1" value={pgData?.pgDetails?.udf1} />
          <input type="hidden" name="udf2" value={pgData?.pgDetails?.udf2} />
          <input type="hidden" name="udf3" value={pgData?.pgDetails?.udf3} />
          <input type="hidden" name="udf4" value={pgData?.pgDetails?.udf4} />
          <input type="hidden" name="udf5" value={pgData?.pgDetails?.udf5} />
          <input type="hidden" name="udf6" value="web" />

          <input
            type="submit"
            value="Submit"
            className="btn btn-primary ml-auto waves-effect waves-themed"
          />
        </form>
      </Modal>
    </>
  );
};

export default FeePayment;
