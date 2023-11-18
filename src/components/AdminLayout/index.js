import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AdminNavBar from "../AdminNavBar";
import AuthContext from "contexts/AuthContext";
import { includes } from "lodash";
import roles from "utils/roles";
import Loader from "components/Loader";

function AdminLayout() {
  const { currentUserRoles } = useContext(AuthContext);
  const canAccess = includes(currentUserRoles, roles.admin);
  const navigate = useNavigate();

  useEffect(() => {
    if (!canAccess) {
      navigate("/");
    }
  }, [canAccess, navigate]);

  if (!canAccess) {
    return <Loader />;
  }

  return (
    <>
      <AdminNavBar />
      <Outlet />
    </>
  );
}

export default AdminLayout;
