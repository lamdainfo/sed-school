import React from "react";
import { Upload, Button, Row, Col } from "antd";
import {
  InboxOutlined,
  DeleteOutlined,
  DownloadOutlined,
  FileTextOutlined,
  FileImageOutlined,
} from "@ant-design/icons";
import { isImageOrFile } from "../../utils/Helpers";
import { ErrorNotificationMsg } from "../../utils/NotificationHelper";

const { Dragger } = Upload;

class HomeworkDocumentUpload extends React.Component {
  uploadFile = (info) => {
    let isValidationFiles = true;
    info.fileList.forEach((doc) => {
      let isLt2M = doc.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        ErrorNotificationMsg("Image must smaller than 2MB!");
        isValidationFiles = false;
      }
    });

    if (isValidationFiles) {
      let docs = [];
      info.fileList.forEach((doc) => {
        console.log(doc);

        let docObj = {
          file_name: doc.name,
          ext: "." + doc.name.split(".").pop(),
          file: doc,
        };
        docs.push(docObj);
      });

      this.props.handleProjectDocumentChange(docs);
    }
  };

  render() {
    const { projectDocuments } = this.props.stateValues;
    const uploadProps = {
      multiple: true,
      listType: "picture-card",
      showUploadList: false,
      accept: ".jpg,.jpeg,.png",
      maxCount: 10,
      beforeUpload: (file) => {
        return false;
      },
      disabled: projectDocuments.length >= 10 ? true : false,
      projectDocuments,
    };
    return (
      <>
        <div className="secction-title" id="area3">
          <h3>Attachment(s)</h3>
        </div>

        <div className="upload-document">
          <Dragger {...uploadProps} onChange={this.uploadFile}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Supported file types are jpg,
              jpeg, png. File upload limit is 10.
            </p>
          </Dragger>
        </div>

        <div className="documents_wrap">
          <div className="documents">
            <Row gutter={[16]}>
              {projectDocuments &&
                projectDocuments.map((document, index) => {
                  return (
                    <Col xs={24} sm={12} md={8} lg={6} xl={4} key={index}>
                      <div className="imgdiv photo">
                        <div className="img_wrap">
                          {isImageOrFile(document.type) ? (
                            <FileImageOutlined />
                          ) : (
                            <FileTextOutlined />
                          )}
                        </div>
                        <h5>{document.file_name}</h5>
                        <div className="btnwrp">
                          <Button
                            type="primary"
                            htmlType="button"
                            size="small"
                            icon={<DeleteOutlined />}
                            onClick={() =>
                              this.props.handleDocumentDelete(document)
                            }
                          ></Button>
                        </div>
                      </div>
                    </Col>
                  );
                })}
            </Row>
          </div>
        </div>
      </>
    );
  }
}

export default HomeworkDocumentUpload;
