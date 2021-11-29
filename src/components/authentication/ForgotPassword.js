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
         

            <div class="form-row">
              <div class="col-md-12 mb-3">
                <label class="form-label required" for="school_code">
                  School Code
                </label>{" "}
                <span class="text-danger">*</span>
                <input
                  type="text"
                  name="school_code"
                  id="school_code"
                  required
                  class="form-control"
                  maxlength="7"
                  minlength="7"
                />
                <div class="invalid-feedback"></div>
              </div>

              <div class="col-md-12 mb-3">
                <label class="form-label required" for="unique_id">
                  Username / Unique ID
                </label>{" "}
                <span class="text-danger">*</span>
                <input
                  type="text"
                  name="unique_id"
                  id="unique_id"
                  required
                  class="form-control"
                  maxlength="7"
                  minlength="7"
                />
                <div class="invalid-feedback"></div>
              </div>
            </div>
            <button
              class="btn btn-primary ml-auto waves-effect waves-themed"
              type="submit"
            >
              <i class="fal fa-check"></i> Submit
            </button>
            <button
              type="button"
              class="btn btn-default ml-2 waves-effect waves-themed"
              data-dismiss="modal"
            >
              <i class="fal fa-times"></i> Close
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
