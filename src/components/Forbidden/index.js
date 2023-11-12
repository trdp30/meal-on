import React from "react";
import { useNavigate } from "react-router-dom";

const ForbiddenErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md text-center">
        <h1 className="text-4xl font-bold text-red-600">403 Forbidden</h1>
        <p className="text-gray-600 mt-2">
          Oops! You don't have permission to access this page.
        </p>
        <button
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 cursor-pointer"
          onClick={navigate(-1)}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ForbiddenErrorPage;
