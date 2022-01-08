import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Input, Row, Col, Form, Upload, Button, Space } from "antd";
import { postRequest } from "../../axios";
import { UploadOutlined } from "@ant-design/icons";

import PageHeader from "../common/PageHeader";
import SubmitHomeworkDocumentUpload from "./SubmitHomeworkDocumentUpload";

import {
  SuccessNotificationMsg,
  ErrorNotificationMsg,
} from "../../utils/NotificationHelper";
import { getSessionData } from "../../utils/Helpers";

const { TextArea } = Input;

const SubmitHomeWork = (props) => {
  const queryString = props.history.location.query;
  if (queryString?.hid === undefined) {
    props.history.push("/dashboard");
  }

  const [state, setState] = useState({
    description: null,
    projectDocuments: [],
    // desc_audio_file: {
    //   extension: "mp3",
    //   file: "",
    // },
    // comment_audio_file: {
    //   extension: "mp3",
    //   file: "",
    // },
  });
  const [btnLoading, setBtnLoading] = useState(false);

  const handleChange = (field, value) => {
    setState({ ...state, [field]: value.target.value });
  };

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const onFinish = async () => {
    setBtnLoading(true);

    let multifile = [];
    state.projectDocuments.map((img) => {
      getBase64(img.file, (imageUrl) => {
        img.file = imageUrl.replace("data:", "").replace(/^.+,/, "");
      });
      multifile.push(img);
    });

    await sleep(state.projectDocuments.length * 1000);

    try {
      const res = await postRequest("add-student-submitted-homework", {
        session_code: getSessionData().code,
        hid: queryString.hid,
        description: state.description,
        image_files: multifile,
      });

      if (res.data.errmsg === "") {
        SuccessNotificationMsg("Homework submited successfully.");
        setBtnLoading(false);
        props.history.push("/home-work");
      } else {
        setBtnLoading(false);
        ErrorNotificationMsg("Error in Homework submit.");
      }
    } catch (error) {
      setBtnLoading(false);
      ErrorNotificationMsg(error.errmsg);
    }
  };

  const handleProjectDocumentChange = (images) => {
    setState({ ...state, projectDocuments: images });
  };

  const handleDocumentDelete = (doc) => {
    let documents = state.projectDocuments;
    let documentIndex = documents.findIndex(
      (res) => res.file.uid === doc.file.uid
    );
    documents.splice(documentIndex, 1);
    setState({ ...state, projectDocuments: documents });
  };

  return (
    <>
      <main id="js-page-content" role="main" className="page-content">
        <div id="content">
          <PageHeader pageTitle="Homework Submit" />
          <div className="row">
            <div className="col-md-12">
              <div id="panel-1" className="panel">
                <div className="panel-hdr">
                  <h2>Homework Submit</h2>
                  <div className="panel-toolbar">
                    <Space>
                      <Link
                        to="/home-work"
                        className="btn btn-sm btn-info waves-effect waves-themed"
                      >
                        Back
                      </Link>
                    </Space>
                  </div>
                </div>
                <div className="panel-container show">
                  <div className="panel-content p-0">
                    <Form
                      onFinish={onFinish}
                      autoComplete="off"
                      layout="vertical"
                    >
                      <div className="panel-content">
                        <Row gutter={[15]}>
                          <Col xs={24} sm={12} lg={24}>
                            <Form.Item
                              label="Description"
                              name="description"
                              rules={[
                                {
                                  required: true,
                                  whitespace: true,
                                  message: "Please enter description",
                                },
                              ]}
                            >
                              <TextArea
                                rows={4}
                                onChange={(value) =>
                                  handleChange("description", value)
                                }
                              />
                            </Form.Item>
                          </Col>

                          <Col xs={24} sm={12} lg={24}>
                            <SubmitHomeworkDocumentUpload
                              stateValues={state}
                              handleProjectDocumentChange={
                                handleProjectDocumentChange
                              }
                              handleDocumentDelete={handleDocumentDelete}
                            />
                          </Col>
                        </Row>
                        <br />
                      </div>

                      <div className="panel-content border-faded border-left-0 border-right-0 border-bottom-0 d-flex flex-row">
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default SubmitHomeWork;
