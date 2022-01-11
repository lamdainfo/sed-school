import React from "react";
import { Upload, Button, Row, Col } from "antd";
import ImgCrop from "antd-img-crop";
import {
  InboxOutlined,
  DeleteOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { isImageOrFile } from "../../utils/Helpers";
import { ErrorNotificationMsg } from "../../utils/NotificationHelper";

const { Dragger } = Upload;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
class NoticeBoardDocumentUpload extends React.Component {
  uploadProductFile = async ({ file, onSuccess, onError }) => {
    if (file.size > 5242880) {
      ErrorNotificationMsg("Maximum size for file upload is 5MB.");
      return false;
    }

    let uploadImageStat = this.props.stateValues.projectDocuments;
    let docObj = {
      file_name: file.name,
      ext: "." + file.name.split(".").pop(),
      file: file,
    };

    getBase64(file, (imageUrl) => (docObj.furl = imageUrl));
    await sleep(300);
    uploadImageStat.push(docObj);
    this.props.handleProjectDocumentChange(uploadImageStat);
  };

  beforeCropFeature = async (file) => {
    if (isImageOrFile(file.type)) {
      return true;
    } else { 
      ErrorNotificationMsg("Supported file types are jpg, jpeg, png.");
      return false;
    }
  };

  render() {
    const { projectDocuments } = this.props.stateValues;
    const uploadProps = {
      multiple: false,
      listType: "picture-card",
      showUploadList: false,
      accept: ".jpg,.jpeg,.png",
      maxCount: 10,
      disabled: projectDocuments.length >= 10 ? true : false,
      projectDocuments,
    };
    return (
      <>
        <div className="secction-title" id="area3">
          <h3>Attachment(s)</h3>
        </div>

        <div className="upload-document">
          <ImgCrop
            rotate={true}
            aspect={3 / 4}
            beforeCrop={this.beforeCropFeature}
          >
            <Dragger {...uploadProps} customRequest={this.uploadProductFile}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Supported file types are
                jpg, jpeg, png. File upload limit is 10.
              </p>
            </Dragger>
          </ImgCrop>
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
                          {isImageOrFile(document.file.type) ? (
                            <img src={document.furl} alt={document.url}></img>
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

export default NoticeBoardDocumentUpload;
