import React, { Component } from "react";
import { Input } from "antd";
import { Link } from "react-router-dom";

export default class CreateHomeWork extends Component {
  state = {};

  render() {
    return (
      <main id="js-page-content" role="main" className="page-content">
        <div id="content">
          <div className="subheader">
            <h1 className="subheader-title">
              <i className="subheader-icon fal fa-clipboard"></i> Notice{" "}
              <span className="fw-300">Board</span>
            </h1>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div id="panel-1" className="panel">
                <div className="panel-hdr">
                  <h2>Notice Board</h2>
                  <div class="panel-toolbar">
                    <Link
                      to="/notice-board"
                      class="btn btn-sm btn-info waves-effect waves-themed"
                    >
                      <i class="fal fa-clipboard-list"></i> View Notice Board
                    </Link>
                  </div>
                </div>
                <div className="panel-container show">
                  <div class="panel-content p-0">
                    <form
                      action="https://dev.lamdainfotech.com/stafflogin/noticeboard/new?authToken=M05NeFB4bnUyNURmNnNRcWtvSG52Zz09&amp;dToken=UGREUmZjMzVJa09WYVY4eVUzZXV3Z092Y2w3TGlSSm9hQVN5dEc5S2w0cz0="
                      method="post"
                      enctype="multipart/form-data"
                      role="form"
                    >
                      <div class="panel-content">
                        <div class="form-row">
                          <div class="col-md-4 mb-3">
                            <label for="stdClass" class="form-label">
                              Class
                            </label>
                            <select
                              id="stdClass"
                              name="stdClass"
                              class="form-control"
                            >
                              <option value="" selected>
                                Select...
                              </option>
                              <option value="II-A">II-A</option>
                              <option value="V-A">V-A</option>
                            </select>
                          </div>
                          <div class="col-md-8 mb-3">
                            <label for="rolls" class="form-label">
                              Roll(s)
                            </label>
                            <select
                              id="rolls"
                              name="rolls[]"
                              multiple="multiple"
                              class="select2 form-control"
                            ></select>
                            <div class="custom-control custom-switch mt-1">
                              <input
                                type="checkbox"
                                class="custom-control-input"
                                name="slRolls"
                                id="slRolls"
                              />
                              <label class="custom-control-label" for="slRolls">
                                Select All
                              </label>
                            </div>
                          </div>
                        </div>

                        <hr />
                        <div class="form-row">
                          <div class="col-md-4 mb-3">
                            <label
                              class="form-label required"
                              for="form_description"
                            >
                              Category
                            </label>
                            <span class="text-danger">*</span>

                            <select
                              id="category"
                              name="category"
                              class="form-control"
                            >
                              <option value="">Select...</option>
                              <option value="ODMySjM4TEJ6bldRaytjYnozU2dodz09">
                                CLASS TEACHER UPDATES
                              </option>
                            </select>
                          </div>
                          <div class="col-md-4 mb-3">
                            <label
                              class="form-label required"
                              for="enable_commnet"
                            >
                              Enable Comment
                            </label>
                            <span class="text-danger">*</span>

                            <select
                              id="enable_commnet"
                              name="enable_commnet"
                              class="form-control"
                            >
                              <option value="1">Yes</option>
                              <option value="0" selected>
                                No
                              </option>
                            </select>
                          </div>
                        </div>
                        <div class="form-row">
                          <div class="col-md-12 mb-3">
                            <label class="form-label required" for="subject">
                              Subject{" "}
                            </label>
                            <span class="text-danger">*</span>
                            <input
                              type="text"
                              name="subject"
                              id="subject"
                              required
                              class="form-control"
                              maxlength="150"
                            />
                          </div>
                        </div>
                        <div class="form-row">
                          <div class="col-md-12 mb-3">
                            <label
                              class="form-label required"
                              for="description"
                            >
                              Description
                            </label>
                            <span class="text-danger">*</span>
                            <textarea
                              name="description"
                              id="description"
                              required
                              class="form-control"
                              rows="5"
                            ></textarea>
                          </div>
                        </div>
                        <div class="form-row">
                          <div class="col-md-12 mb-3">
                            <label class="form-label">
                              Attachment(s) [Attach up to 4 files.]
                            </label>
                          </div>
                        </div>
                      </div>
                      <div class="panel-content border-faded border-left-0 border-right-0 border-bottom-0 d-flex flex-row">
                        <button
                          type="submit"
                          id="form_submitNew"
                          name="submitNew"
                          value="1"
                          class="btn btn-primary ml-auto waves-effect waves-themed"
                        >
                          Publish
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
