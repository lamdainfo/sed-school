import React, { Component } from "react";
import { Layout } from "antd";

const { Content } = Layout;

export default class SubmitedHomeWorkBlock extends Component {
  state = {};
  render() {
    return (
      <>
        <div className="card border mb-2">
          <div className="card-body">
            <img
              src="https://schoolonweb-private.s3.ap-south-1.amazonaws.com/uploads/2222222/image/24b1a6b55dda7aa38d276d056cb7027c912eedb4.jpeg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&amp;X-Amz-Algorithm=AWS4-HMAC-SHA256&amp;X-Amz-Credential=AKIA5FCGLRFPOLTY3PA5%2F20211111%2Fap-south-1%2Fs3%2Faws4_request&amp;X-Amz-Date=20211111T160301Z&amp;X-Amz-SignedHeaders=host&amp;X-Amz-Expires=3600&amp;X-Amz-Signature=a6249153f8e6b3cd6db3727bad265329f9ea68f134342c6d7f5c312683bf4709"
              className="profile-image rounded-circle"
            />
            <span className="card-title mb-2">
              <strong>PRIYAM SASMAL</strong>
              <br />
              <span className="badge badge-primary">Section : A, Roll : 2</span>
            </span>
            <p className="d-block">Submitted On : 11-08-2021 7:44 pm</p>
            <p className="d-block">
              <strong>s.s.t (h.w)</strong>
            </p>
            <div className="row">
              <div className="col-md-12">
                <div className="lightgallery">
                  <a href="https://schoolediary.s3.ap-south-1.amazonaws.com/uploads/2222222/2021/homeWorksImages/sh_20210811_87677346.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&amp;X-Amz-Algorithm=AWS4-HMAC-SHA256&amp;X-Amz-Credential=AKIA5FCGLRFPO33VAOPF%2F20211111%2Fap-south-1%2Fs3%2Faws4_request&amp;X-Amz-Date=20211111T160301Z&amp;X-Amz-SignedHeaders=host&amp;X-Amz-Expires=3600&amp;X-Amz-Signature=d3af2823adef1eda64e7cba24d66bdf809450121c5871c34d951c249055ce34a">
                    <img src="" className="img-thumbnail align-text-top" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer text-muted py-2">
            <button className="btn btn-sm btn-danger waves-effect waves-themed">
              Re-Submit
            </button>
            <button className="btn btn-sm btn-primary waves-effect waves-themed ml-2">
              Add Comment
            </button>
          </div>
        </div>
      </>
    );
  }
}
