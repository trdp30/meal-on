import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavBar from "../AdminNavBar";

function AdminLayout() {
  return (
    <>
      <AdminNavBar />
      <Outlet />
    </>
  );
}

export default AdminLayout;
