import Button from "components/Button";
import Loader from "components/Loader";
import { RestaurantTable } from "components/RestaurantTable";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllRestaurantQuery } from "store/sliceApis/restaurantApi";

function Restaurants() {
  const { data, isLoading } = useGetAllRestaurantQuery();
  const navigate = useNavigate();

  if (isLoading) {
    return <Loader />;
  }

  const navigateToCreateRestaurant = () => {
    navigate("/admin/create-restaurant");
  };

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex justify-end p-4 pt-0">
        <Button onClick={navigateToCreateRestaurant}>Create Restaurant</Button>
      </div>
      <div className="flex flex-1 flex-col overflow-y-auto md:px-4 sm:px-2 px-0">
        <RestaurantTable data={data} isLoading={isLoading} customRowId="_id" />
      </div>
    </div>
  );
}

export default Restaurants;
