import React from "react";
import { Link } from "react-router-dom";

class ForgotPassword extends React.Component {
  state = {
    btnLoading: false,
  };

  onFinish = async (values) => {
    this.setState({ btnLoading: true });
  };

  handleInputChange = (input) => (event) => {
    this.setState({ [input]: event.target.value });
  };

  render() {
    return (
      <>
        <div className="card p-4 border-top-left-radius-0 border-top-right-radius-0">
          <form id="cdComment" method="post" role="form">
         

            <div className="form-row">
              <div className="col-md-12 mb-3">
                <label className="form-label required" for="school_code">
                  School Code
                </label>{" "}
                <span className="text-danger">*</span>
                <input
                  type="text"
                  name="school_code"
                  id="school_code"
                  required
                  className="form-control"
                  maxlength="7"
                  minlength="7"
                />
                <div className="invalid-feedback"></div>
              </div>

              <div className="col-md-12 mb-3">
                <label className="form-label required" for="unique_id">
                  Username / Unique ID
                </label>{" "}
                <span className="text-danger">*</span>
                <input
                  type="text"
                  name="unique_id"
                  id="unique_id"
                  required
                  className="form-control"
                  maxlength="7"
                  minlength="7"
                />
                <div className="invalid-feedback"></div>
              </div>
            </div>
            <button
              className="btn btn-primary ml-auto waves-effect waves-themed"
              type="submit"
            >
              <i className="fal fa-check"></i> Submit
            </button>
            <button
              type="button"
              className="btn btn-default ml-2 waves-effect waves-themed"
              data-dismiss="modal"
            >
              <i className="fal fa-times"></i> Close
            </button>
          </form>
        </div>
        <div className="blankpage-footer text-center">
          <Link to="/login">
            <strong>Back to Login ?</strong>
          </Link>
        </div>
      </>
    );
  }
}

export default ForgotPassword;
