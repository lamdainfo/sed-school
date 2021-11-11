import React, { Component } from "react";
import { Modal } from "antd";
import HomeWorkComment from "./HomeWorkComment";

export default class HomeWorkDetail extends Component {
  state = {
    showModel: false,
  };

  hideModel = () => {
    this.setState({ showModel: false });
  };

  showModel = () => {
    this.setState({ showModel: true });
  };

  render() {
    const { showModel } = this.state;
    return (
      <>
        <button
          className="btn btn-sm btn-outline-info"
          onClick={() => this.showModel()}
        >
          OPEN
        </button>

        <Modal
          title="Homework Details"
          visible={showModel}
          onCancel={this.hideModel}
        >
          <div className="row">
            <div className="col-md-4">
              <img
                src="https://schoolonweb-private.s3.ap-south-1.amazonaws.com/uploads/2222222/image/63b45c31626394532b39e78c38fc924c91cb78bd.jpeg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&amp;X-Amz-Algorithm=AWS4-HMAC-SHA256&amp;X-Amz-Credential=AKIA5FCGLRFPOLTY3PA5%2F20211111%2Fap-south-1%2Fs3%2Faws4_request&amp;X-Amz-Date=20211111T090855Z&amp;X-Amz-SignedHeaders=host&amp;X-Amz-Expires=3600&amp;X-Amz-Signature=7ce6d3dedb988579ea9a96fe45e3305bb368c6988f968f920260dd56b33376b0"
                className="profile-image rounded-circle"
              />
              <span className="d-block">
                Assigned On : <strong> 25 October</strong>
              </span>
              <span className="d-block">
                Submit By : <strong> 25 October</strong>
              </span>
            </div>
            <div className="col-md-8 text-right">
              <div className="frame-wrap mb-2">
                <span className="d-block">
                  Posted By : <strong>ADMIN</strong>
                </span>
              </div>
              <div className="frame-wrap mb-2">
                <span className="d-block">
                  Approved By : <strong>ADMIN</strong>
                </span>
              </div>
              <span className="text-primary ">
                <i className="fal fa-thumbs-up"></i>
              </span>{" "}
              &nbsp;&nbsp;
              <HomeWorkComment hideParentModel={this.hideModel} />
              &nbsp;&nbsp;
              <span className="text-primary">
                <i className="fal fa-paperclip"></i>
              </span>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-md-12">
              <p>
                Class : <strong> III-A</strong>
              </p>
              <p>
                Subject : <strong>SOCIAL STUDIES</strong>
              </p>
              <p>
                Page No. : <strong> 2</strong>
              </p>
              <p>
                Chapter No : <strong>7</strong>
              </p>
              <p>
                Topic : <strong>Important cities of India</strong>
              </p>
              <hr />
              <p>
                <b>Description :</b> You are requested to submit SA 1 Exam
                Answersheet (Notebook) in School reception as soon as possible
                before 30th October'2021. Note: Please ignore the message if
                already been submitted. Thanks and Regards, The Pride
                International School
              </p>
            </div>
          </div>
          <hr />
          <span className="badge badge-warning">Attachment(s)</span>
          <div className="row">
            <div className="col-md-6">
              <span className="text-danger">No attachment found.</span>
            </div>
          </div>
        </Modal>
      </>
    );
  }
}
