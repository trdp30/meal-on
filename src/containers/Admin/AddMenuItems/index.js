/* eslint-disable default-case */
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AddMenuItemForm from "components/AddMenuItemForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/pro-light-svg-icons";
import Loader from "components/Loader";
import { useGetRestaurantByIdQuery } from "store/sliceApis/restaurantApi";
import NotFound from "components/NotFound";

const AddMenuItems = () => {
  const navigate = useNavigate();
  const { restaurant_id } = useParams();
  const { isLoading, error } = useGetRestaurantByIdQuery(restaurant_id);

  const handleCancel = () => {
    navigate(-1);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error?.originalStatus === 404) {
    return <NotFound handleBackClick={() => navigate("/admin/restaurant")} />;
  }

  return (
    <div className="flex flex-1 flex-col min-h-0">
      <div className="text-right">
        <Link
          to={`/admin/restaurant/${restaurant_id}`}
          className="text-blue-700 text-sm underline py-2 px-4"
        >
          Go to Restaurant details
          <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
        </Link>
      </div>
      <AddMenuItemForm handleCancel={handleCancel} />
    </div>
  );
};

export default AddMenuItems;
