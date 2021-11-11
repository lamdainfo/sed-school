import React, { Component } from "react";
import { Input, Modal } from "antd";

const { TextArea } = Input;

export default class NoticeBoardComment extends Component {
  state = {
    showModel: false,
  };

  hideModel = () => {
    this.setState({ showModel: false });
  };

  showModel = () => {
    this.setState({ showModel: true }, () => {
      this.props.hideParentModel();
    });
  };

  render() {
    const { showModel } = this.state;
    return (
      <>
        <span onClick={() => this.showModel()} className="text-primary">
          <i className="fal fa-comment"></i>
        </span>

        <Modal title="Comment" visible={showModel} onCancel={this.hideModel}>
          <div className="row">
            <div className="col-md-12">
              <TextArea rows={4} />
            </div>
          </div>
        </Modal>
      </>
    );
  }
}
