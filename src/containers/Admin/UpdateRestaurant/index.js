import Loader from "components/Loader";
import NotFound from "components/NotFound";
import RestaurantForm from "components/RestaurantForm";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetRestaurantByIdQuery,
  useUpdateRestaurantMutation,
} from "store/sliceApis/restaurantApi";

function UpdateRestaurant() {
  const { restaurant_id } = useParams();
  const {
    data = {},
    isLoading,
    error,
  } = useGetRestaurantByIdQuery(restaurant_id);
  const [submit, result] = useUpdateRestaurantMutation();

  const navigate = useNavigate();

  const handleSubmit = (payload) => {
    submit({
      id: restaurant_id,
      body: payload,
    });
  };

  const back = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (result?.isSuccess && !result?.isLoading) {
      navigate(`/admin/restaurant/${restaurant_id}`);
    }
  }, [result?.isSuccess, result?.isLoading, navigate, restaurant_id]);

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (error?.originalStatus === 404) {
    return <NotFound handleBackClick={() => navigate("/admin/restaurant")} />;
  }

  return (
    <div>
      <RestaurantForm
        existingData={data}
        isLoading={isLoading || result?.isLoading}
        handleSubmit={handleSubmit}
        back={back}
      />
    </div>
  );
}

export default UpdateRestaurant;
