import { faPenToSquare } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "components/Button";
import { triggerToast } from "components/Notification";
import React, { useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDeleteRestaurantMutation } from "store/sliceApis/restaurantApi";

function RestaurantDetailsCard({ data }) {
  const [deleteRestaurant, result] = useDeleteRestaurantMutation();
  const navigate = useNavigate();
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

  const encodedUrl = useMemo(() => {
    if (location?.lat && location?.lng) {
      const search = new URLSearchParams();
      search.set("api", 1);
      search.set("query", `${location?.lat},${location?.lng}`);
      search.set("query_place_id", location?.place_id);
      const qp = search.toString();
      return `https://www.google.com/maps/search/?${qp}`;
    }
    return "";
  }, [location]);

  useEffect(() => {
    if (result.isSuccess) {
      triggerToast({
        variant: "success",
        message: {
          title: "Restaurant deleted successfully",
        },
      });
      navigate("/admin/restaurant");
    }
    if (result.isError) {
      triggerToast({
        variant: "danger",
        message: {
          title: "Request failed",
          summary: result?.error?.data?.error,
        },
      });
    }
  }, [result.isSuccess, result.isError, result.error, navigate]);

  const handleDelete = () => {
    deleteRestaurant(data._id);
  };

  const handleEdit = () => {};

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex flex-1 flex-col p-6 rounded-md shadow-md overflow-y-auto">
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
            <p className="flex font-semibold text-sm break-words">
              {encodedUrl ? (
                <>
                  <a
                    href={encodedUrl}
                    target="_blank"
                    className="text-blue-700 cursor-pointer underline"
                    rel="noreferrer"
                  >
                    Check on map
                  </a>
                  <Link
                    to="add-geo-location?edit=true"
                    className="text-blue-700 cursor-pointer ml-6"
                    title="Change Location"
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </Link>
                </>
              ) : (
                <Link to="add-geo-location?edit=true">
                  <span className="text-blue-700">Add Location</span>
                </Link>
              )}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center space-x-3 py-4 border-t-[1px] border-gray-200 bg-gray-100">
        <Button
          disabled={result?.isLoading}
          size="lg"
          onClick={handleEdit}
          type="secondary"
        >
          Edit
        </Button>
        <Button
          type="danger"
          size="lg"
          disabled={result?.isLoading}
          loading={result?.isLoading}
          onClick={handleDelete}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}

export default RestaurantDetailsCard;
