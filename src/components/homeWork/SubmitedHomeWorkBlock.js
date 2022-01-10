import React from "react";
import { Space } from "antd";

import HomeWorkComment from "./HomeWorkComment";
import { ShowDocumentPreview } from "../../utils/Helpers";
import userIcon from "../../images/userIcon.jpg";

const SubmitedHomeWorkBlock = (props) => {
  return (
    <>
      <div className="card border mb-2">
        <div className="card-body">
          <img
            src={props.homeWorkDetail?.student_image_url}
            alt="student-img"
            className="profile-image rounded-circle"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = userIcon;
            }}
          />
          <span className="card-title mb-2 ml-2">
            <strong>{props.homeWorkDetail?.student_name}</strong>
            <br />
            <span className="badge badge-primary">
              Section : {props.homeWorkDetail?.homework_class}
            </span>
          </span>
          <p className="d-block">
            Submitted On : {props.homeWorkDetail?.submitted_date}
          </p>
          <p className="d-block">
            <strong>{props.homeWorkDetail?.student_description}</strong>
          </p>

          <div className="row">
            <div className="col-md-12">
              <div className="lightgallery">
                <div className="col-md-3">
                  {props.homeWorkDetail?.description_audio_file && (
                    <audio controls>
                      <source
                        src={
                          props.homeWorkDetail?.description_audio_file.file_url
                        }
                        type="audio/mpeg"
                      />
                    </audio>
                  )}
                </div>

                {props.homeWorkDetail?.documents.map((doc, key) => {
                  return (
                    <div className="col-md-3" key={key}>
                      {ShowDocumentPreview(doc.file_url, doc.ext)}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {props.homeWorkDetail && props.homeWorkDetail.teacher_comment !== "" && (
            <>
              <p className="d-block mt-3">
                <strong>
                  Teacher's Comment : {props.homeWorkDetail?.teacher_comment}
                </strong>
              </p>
              {props.homeWorkDetail?.comment_audio_file && (
                <p className="d-block mt-3">
                  <audio controls>
                    <source
                      src={props.homeWorkDetail?.comment_audio_file.file_url}
                      type="audio/mpeg"
                    />
                  </audio>
                </p>
              )}
            </>
          )}
        </div>

        <div className="card-footer text-muted py-2">
          {props.homeWorkDetail.teacher_comment !== "" ? (
            <Space>
              <HomeWorkComment
                htmlText={
                  <button className="btn btn-sm btn-danger waves-effect waves-themed">
                    Re-Submit
                  </button>
                }
                stu_sub_hid={props.homeWorkDetail.id}
                status={2}
              />
              <HomeWorkComment
                htmlText={
                  <button className="btn btn-sm btn-outline-info waves-effect waves-themed">
                    Edit Comment
                  </button>
                }
                stu_sub_hid={props.homeWorkDetail.id}
                commentText={props.homeWorkDetail.teacher_comment}
                status={1}
              />
            </Space>
          ) : (
            <>
              <HomeWorkComment
                htmlText={
                  <button className="btn btn-sm btn-danger waves-effect waves-themed">
                    Re-Submit
                  </button>
                }
                stu_sub_hid={props.homeWorkDetail.id}
                status={2}
              />
              <HomeWorkComment
                htmlText={
                  <button className="btn btn-sm btn-primary waves-effect waves-themed ml-2">
                    Add Comment
                  </button>
                }
                stu_sub_hid={props.homeWorkDetail.id}
                status={1}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SubmitedHomeWorkBlock;
