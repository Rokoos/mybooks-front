import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth/index";
import LoadingToRedirect from "../components/LoadingToRedirect";

const AdminRoute = ({ children, ...rest }) => {
  const user = isAuthenticated().user;
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (user && user.role === "admin") {
      setOk(true);
    } else {
      setOk(false);
    }
  }, [user]);

  return ok ? <Route {...rest} /> : <LoadingToRedirect />;
};

export default AdminRoute;
