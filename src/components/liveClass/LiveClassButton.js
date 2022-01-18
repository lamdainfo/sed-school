import React, { useState, useEffect } from "react";
import moment from "moment";

import { postRequest } from "../../axios";
import { getUserType } from "../../utils/Helpers";

const LiveClassButton = ({ liveClassDetail }) => {
  const [startDiff, setDateState] = useState("");
  const [endDiff, setEndDateState] = useState("");

  var classStartTime =
    moment(liveClassDetail.live_class_date, "DD-MM-YYYY").format("YYYY-MM-DD") +
    " " +
    moment(liveClassDetail.start_time, "HH:mm A").format("HH:mm:ss");

  var classEndTime =
    moment(liveClassDetail.live_class_date, "DD-MM-YYYY").format("YYYY-MM-DD") +
    " " +
    moment(liveClassDetail.end_time, "HH:mm A").format("HH:mm:ss");

  useEffect(() => {
    if (liveClassDetail) {
      setInterval(() => {
        setDateState(moment().diff(classStartTime, "minutes"));
        setEndDateState(moment().diff(classEndTime, "minutes"));
      }, 1000);
    }
  }, []);

  const fillAttendance = async () => {
    if (getUserType() === "staff") {
      window.open(liveClassDetail?.teacher_start_url);
    } else {
      const response = await postRequest("student-live-class-activity-update", {
        live_class_id: liveClassDetail.id,
      });
      window.open(liveClassDetail?.join_url);
    }
  };

  const renderStaffButton = (startDiff, endDiff) => {
    if (endDiff > 0) {
      return (
        <a className="btn btn-sm btn-danger text-white disabled">Class Ended</a>
      );
    }

    if (startDiff >= -4 && endDiff <= 0) {
      return (
        <a
          href="#"
          onClick={fillAttendance}
          className="btn btn-sm btn-success text-white"
        >
          Start Class
        </a>
      );
    }

    if (startDiff < -4) {
      return (
        <a className="btn btn-sm btn-secondary text-white disabled">
          Class Not Ready
        </a>
      );
    }
  };

  const renderStudentButton = (startDiff, endDiff) => {
    if (endDiff > 0) {
      return (
        <a className="btn btn-sm btn-danger text-white disabled">Class Ended</a>
      );
    }

    if (startDiff >= 0 && endDiff <= 0) {
      return (
        <a
          href="#"
          onClick={fillAttendance}
          className="btn btn-sm btn-success text-white"
        >
          Start Class
        </a>
      );
    }

    if (startDiff < 0) {
      return (
        <a className="btn btn-sm btn-secondary text-white disabled">
          Class Not Ready
        </a>
      );
    }
  };

  return (
    <>
      {getUserType() === "staff" && renderStaffButton(startDiff, endDiff)}

      {getUserType() !== "staff" && renderStudentButton(startDiff, endDiff)}
    </>
  );
};

export default LiveClassButton;
