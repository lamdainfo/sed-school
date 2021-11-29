import React from "react";
import { Row, Col } from "antd";

import NoticeBoardDashboard from "../noticeBoard/NoticeBoardDashboard";
import HomeWorkDashboard from "../homeWork/HomeWorkDashboard";

const Dashboard = () => {
  return (
    <main id="js-page-content" className="page-content">
      <div>
        <div className="subheader">
          <h1 className="subheader-title">
            <i className="subheader-icon fal fa-clipboard"></i>{" "}
            <span className="fw-300">Dashboard</span>
          </h1>
        </div>
        <Row gutter={[15]}>
          <Col xs={24} sm={12} lg={12}>
            <NoticeBoardDashboard />
          </Col>
          <Col xs={24} sm={12} lg={12}>
            <HomeWorkDashboard />
          </Col>
        </Row>
      </div>
    </main>
  );
};

export default Dashboard;
