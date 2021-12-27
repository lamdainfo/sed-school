import React, { useState, useEffect } from "react";
import moment from "moment";
import { getUserType } from "../../utils/Helpers";

const LiveClassButton = ({ liveClassDetail }) => {
  const [dateState, setDateState] = useState("");
  const [endDateState, setEndDateState] = useState("");

  var classDateTime =
    moment(liveClassDetail.live_class_date, "DD-MM-YYYY").format("YYYY-MM-DD") +
    " " +
    moment(liveClassDetail.start_time, "HH:mm A").format("HH:mm:ss");

  classDateTime = classDateTime + liveClassDetail.duration;

  var classEndDateTime =
    moment(liveClassDetail.live_class_date, "DD-MM-YYYY").format("YYYY-MM-DD") +
    " " +
    moment(liveClassDetail.end_time, "HH:mm A").format("HH:mm:ss");

  useEffect(() => {
    if (liveClassDetail) {
      setInterval(() => {
        setDateState(moment().diff(classDateTime, "minutes"));
        setEndDateState(moment().diff(classEndDateTime, "minutes"));
      }, 1000);
    }
  }, []);

  return (
    <>
      {dateState > 0 && endDateState > 0 && (
        <a className="btn btn-sm btn-danger text-white disabled">Class Ended</a>
      )}

      {dateState > 0 && endDateState < 0 && (
        <a
          target="_blank"
          href={
            getUserType() === "staff"
              ? liveClassDetail?.teacher_start_url
              : liveClassDetail?.join_url
          }
          className="btn btn-sm btn-success text-white"
        >
          {getUserType() === "staff" ? "Start Class" : "Join Class"}
        </a>
      )}

      {dateState > -5 && dateState <= 0 && (
        <a className="btn btn-sm btn-warning text-white disabled">
          Class will start few min
        </a>
      )}

      {dateState < -5 && (
        <a className="btn btn-sm btn-secondary text-white disabled">
          Class Not Ready
        </a>
      )}
    </>
  );
};

export default LiveClassButton;
