import React from "react";
import HomeWorkComment from "./HomeWorkComment";

const SubmitedHomeWorkBlock = (props) => {
  return (
    <>
      <div className="card border mb-2">
        <div className="card-body">
          <img
            src={props.homeWorkDetail?.student_image_url}
            alt="student-img"
            className="profile-image rounded-circle"
          />
          <span className="card-title mb-2">
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
                {props.homeWorkDetail?.documents.map((docs, did) => {
                  return (
                    <a href="" key={did}>
                      <img
                        src={docs.file_url}
                        alt="doc-img"
                        className="img-thumbnail align-text-top"
                        width="100"
                      />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="card-footer text-muted py-2">
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
        </div>
      </div>
    </>
  );
};

export default SubmitedHomeWorkBlock;
