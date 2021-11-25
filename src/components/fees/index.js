import React from "react";
import { Row, Col } from "antd";

import DueFees from "./DueFees";
import PaidFees from "./PaidFees";

const Fees = () => {
  return (
    <main className="page-content">
      <div>
        <div className="subheader">
          <h1 className="subheader-title">
            <i className="subheader-icon fal fa-clipboard"></i>{" "}
            <span className="fw-300">Fees</span>
          </h1>
        </div>
        <Row gutter={[15]}>
          <Col xs={24} sm={12} lg={12}>
            <DueFees />
          </Col>
          <Col xs={24} sm={12} lg={12}>
            <PaidFees />
          </Col>
        </Row>
      </div>
    </main>
  );
};

export default Fees;
