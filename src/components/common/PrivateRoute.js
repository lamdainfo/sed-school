import * as React from "react";
import { Route, Redirect } from "react-router-dom";
import AdminLayout from "./AdminLayout";

import { validateToken, redirectIfNotLoggedIn } from "../../utils/Helpers";

const PrivateRoute = ({
  component: Component,
  ...rest
}: any & { component: any }) => {
  const authCheck = () => {
    redirectIfNotLoggedIn();
    return validateToken(localStorage.getItem("restoken"));
  };

  return (
    <AdminLayout>
      <Route
        {...rest}
        render={(props) => {
          return authCheck() ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          );
        }}
      />
    </AdminLayout>
  );
};

export default PrivateRoute;
