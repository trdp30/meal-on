import Loader from "components/Loader";
import React from "react";
import { useParams } from "react-router-dom";
import { useGetRestaurantByIdQuery } from "store/sliceApis/restaurantApi";

function RestaurantDetails() {
  const { restaurant_id } = useParams();
  const { data = {}, isLoading } = useGetRestaurantByIdQuery(restaurant_id);
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

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-1 flex-col max-w-md mx-auto bg-white p-6 rounded-md shadow-md overflow-y-auto">
      <h2 className="text-3xl font-bold text-gray-600 mb-4">
        Restaurant Details
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-gray-600">Name:</label>
          <p className="font-semibold">{name}</p>
        </div>
        <div>
          <label className="text-gray-600">Email:</label>
          <p className="font-semibold">{email}</p>
        </div>
        <div>
          <label className="text-gray-600">Address 1:</label>
          <p className="font-semibold">{address1}</p>
        </div>
        <div>
          <label className="text-gray-600">Address 2:</label>
          <p className="font-semibold">{address2}</p>
        </div>
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
        <div>
          <label className="text-gray-600">Phone:</label>
          <p className="font-semibold">{phone}</p>
        </div>
      </div>
    </div>
  );
}

export default RestaurantDetails;
