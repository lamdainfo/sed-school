import * as React from "react";
import { Route, Redirect } from "react-router-dom";
import AdminLayout from "./AdminLayout";

import { validateToken, redirectIfNotAdmin } from "../../utils/Helpers";
import { AUTH_USER_TOKEN_KEY } from "../../utils/constants";

const PrivateRoute = ({
  component: Component,
  ...rest
}: any & { component: any }) => {
  const authCheck = () => {
    // redirectIfNotAdmin();
    // return validateToken(localStorage.getItem(AUTH_USER_TOKEN_KEY));
    return true;
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
