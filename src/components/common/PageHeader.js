import React from "react";

const PageHeader = (props) => {
  return (
    <div className="subheader">
      <h1 className="subheader-title">
        <i className="subheader-icon fal fa-clipboard"></i>
        <span className="fw-300"> {props.pageTitle}</span>
      </h1>
    </div>
  );
};

export default PageHeader;
