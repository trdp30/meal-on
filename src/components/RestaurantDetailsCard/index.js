import React from "react";

function RestaurantDetailsCard({ data }) {
  const {
    name,
    email,
    address1,
    address2,
    state,
    district,
    city,
    pin_code,
    location,
    phone,
  } = data;

  return (
    <div className="flex flex-1 flex-col p-6 rounded-md shadow-md">
      <h2 className="text-sm font-bold text-gray-600 mb-4">
        Restaurant Details
      </h2>
      <div className="mb-4">
        <p className="font-semibold text-3xl">{name}</p>
        <p className="font-semibold">{phone}</p>
        <p className="font-semibold">{email}</p>
        <p className="font-medium text-sm">
          {address1}, {address2}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-gray-600">State:</label>
          <p className="font-semibold">{state}</p>
        </div>
        <div>
          <label className="text-gray-600">District:</label>
          <p className="font-semibold">{district}</p>
        </div>
        <div>
          <label className="text-gray-600">City:</label>
          <p className="font-semibold">{city}</p>
        </div>
        <div>
          <label className="text-gray-600">PIN Code:</label>
          <p className="font-semibold">{pin_code}</p>
        </div>
        <div colSpan="2">
          <label className="text-gray-600">Location:</label>
          <p className="font-semibold">{JSON.stringify(location)}</p>
        </div>
      </div>
    </div>
  );
}

export default RestaurantDetailsCard;
