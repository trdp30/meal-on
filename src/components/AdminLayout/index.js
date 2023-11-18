import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AdminNavBar from "../AdminNavBar";
import AuthContext from "contexts/AuthContext";
import { includes } from "lodash";
import roles from "utils/roles";

function AdminLayout() {
  const { currentUserRoles, isAuthenticating } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticating && !includes(currentUserRoles, roles.admin)) {
      navigate("/");
    }
  }, [isAuthenticating, currentUserRoles, navigate]);

  return (
    <>
      <AdminNavBar />
      <Outlet />
    </>
  );
}

export default AdminLayout;
