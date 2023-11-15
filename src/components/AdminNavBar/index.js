import React from "react";
import { Link } from "react-router-dom";

function AdminNavBar() {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/admin/dashboard" className="text-white text-2xl font-bold">
          Dashboard
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link to="/admin/billings" className="text-white">
              Billings
            </Link>
          </li>
          <li>
            <Link to="/admin/orders" className="text-white">
              Orders
            </Link>
          </li>
          <li>
            <Link to="/admin/restaurants" className="text-white">
              Restaurants
            </Link>
          </li>
          <li>
            <Link to="/logout" className="text-white">
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default AdminNavBar;
