import React from "react";
import { getUserType } from "../../utils/Helpers";

const ButtonUI = (props) => {
  return (
    <div
      className="col-sm-6 col-xl-4 pointer"
      onClick={() => props.history.push(props.url)}
    >
      <div
        className={
          "p-3 " +
          props.color +
          " rounded overflow-hidden position-relative text-white mb-g"
        }
      >
        <div>
          <h3 className="display-4 d-block l-h-n m-0 fw-500 text-white">
            {props.title}
            <small className="m-0 l-h-n">{props.subtitle}</small>
          </h3>
        </div>
        <i
          className={
            props.icon +
            " position-absolute pos-right pos-bottom opacity-15 mb-n1 mr-n1"
          }
          style={{ fontSize: "6rem" }}
        ></i>
      </div>
    </div>
  );
};

const Dashboard = (props) => {
  return (
    <main className="page-content">
      <div className="row">
        {getUserType() === "staff" && (
          <>
            <ButtonUI
              title="Notice Board"
              subtitle="Create"
              url="/create-notice-board"
              icon="fal fa-user"
              color="bg-primary-800"
              history={props.history}
            />
            <ButtonUI
              title="Homework"
              subtitle="Create"
              url="/create-home-work"
              icon="fal fa-user"
              color="bg-warning-800"
              history={props.history}
            />
            <ButtonUI
              title="Live Class"
              subtitle="Create"
              url="/create-live-class"
              icon="fal fa-user"
              color="bg-success-800"
              history={props.history}
            />
          </>
        )}

        <ButtonUI
          title="Notice Board"
          subtitle="Show List"
          url="/notice-board"
          icon="fal fa-user"
          color="bg-primary-300"
          history={props.history}
        />
        <ButtonUI
          title="Homework"
          subtitle="Show List"
          url="/home-work"
          icon="fal fa-user"
          color="bg-warning-400"
          history={props.history}
        />
        <ButtonUI
          title="Live Class"
          subtitle="Show List"
          url="/live-class"
          icon="fal fa-user"
          color="bg-success-200"
          history={props.history}
        />
        {getUserType() !== "staff" && (
          <ButtonUI
            title="Fees"
            subtitle="Details"
            url="/fees"
            icon="fal fa-user"
            color="bg-info-200"
            history={props.history}
          />
        )}
      </div>
    </main>
  );
};

export default Dashboard;
