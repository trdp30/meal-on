import Loader from "components/Loader";
import React from "react";
import { useGetAllRestaurantQuery } from "store/sliceApis/restaurantApi";

function Restaurants() {
  const { data, isLoading } = useGetAllRestaurantQuery();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <code>{JSON.stringify(data, null, " ")}</code>
    </div>
  );
}

export default Restaurants;
