import Loader from "components/Loader";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetRestaurantByIdQuery } from "store/sliceApis/restaurantApi";
import RestaurantDetailsCard from "components/RestaurantDetailsCard";
import MenuItemList from "components/MenuItemList";
import NotFound from "components/NotFound";

function RestaurantDetails() {
  const { restaurant_id } = useParams();
  const navigate = useNavigate();
  const {
    data = {},
    isLoading,
    error,
  } = useGetRestaurantByIdQuery(restaurant_id);

  if (isLoading) {
    return <Loader />;
  }

  if (error?.originalStatus === 404) {
    return <NotFound handleBackClick={() => navigate("/admin/restaurant")} />;
  }

  return (
    <div className="flex flex-1 flex-col md:flex-row min-h-0 overflow-y-auto space-y-4">
      <div className="flex md:max-w-[400px]">
        <RestaurantDetailsCard data={data} />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div>Dashboard of the restaurant</div>
        <div className="flex flex-1 flex-col p-4 space-y-2">
          <div className="font-semibold">Menu Items:</div>
          <MenuItemList />
        </div>
      </div>
    </div>
  );
}

export default RestaurantDetails;
