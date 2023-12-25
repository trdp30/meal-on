/* eslint-disable no-undef */
import Button from "components/Button";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { initMap } from "./mapConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationCrosshairs,
  faSpinner,
} from "@fortawesome/pro-light-svg-icons";
import classNames from "classnames";
import {
  useUpdateRestaurantMutation,
  useGetRestaurantByIdQuery,
} from "store/sliceApis/restaurantApi";
import { triggerToast } from "components/Notification";
import NotFound from "components/NotFound";

const AddGeoLocation = () => {
  const navigate = useNavigate();
  const { restaurant_id } = useParams();
  const [search] = useSearchParams();
  const isEditView = search.get("edit") === "true";
  const {
    data = {},
    isLoading,
    error,
  } = useGetRestaurantByIdQuery(restaurant_id);
  const [submit, result] = useUpdateRestaurantMutation();
  const [mapLoaded, toggleMapLoaded] = useState(false);
  const [mapInstance, setMap] = useState();
  const [googleConstructor, setGoogleConstructor] = useState();
  const [marker, setMarker] = useState();

  if (!googleConstructor && google && google.maps && !mapInstance) {
    setGoogleConstructor(google);
  }

  useEffect(() => {
    if (result?.isSuccess && !result?.isLoading) {
      if (isEditView) {
        navigate(`/admin/restaurant/${restaurant_id}`);
      } else {
        navigate(`/admin/restaurant/${restaurant_id}/add-menu-item`);
      }
    }
  }, [
    result?.isSuccess,
    result?.isLoading,
    navigate,
    restaurant_id,
    isEditView,
  ]);

  useEffect(() => {
    if (result.isSuccess) {
      triggerToast({
        variant: "success",
        message: {
          title: "GeoLocation added successfully",
        },
      });
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
  }, [result.isSuccess, result.isError, result.error]);

  const handleSubmit = () => {
    submit({
      id: restaurant_id,
      body: {
        location: marker,
      },
    });
  };

  const handleCancel = () => {
    navigate(`/admin/restaurant/${restaurant_id}`);
  };

  const onInitialized = (map, state) => {
    setMap(map);
    toggleMapLoaded(true);
  };

  useEffect(() => {
    if (googleConstructor && !mapInstance && !isLoading) {
      initMap({ onInitialized, setMarker, existingLocation: data?.location });
    }
  }, [googleConstructor, mapInstance, isLoading, data?.location]);

  const disableAction = useMemo(
    () => result.isLoading || !marker || !Object.keys(marker).length,
    [marker, result],
  );

  if (error?.originalStatus === 404) {
    return <NotFound handleBackClick={() => navigate("/admin/restaurant")} />;
  }

  return (
    <>
      <div className="flex flex-1 flex-col">
        <div className="flex flex-1 flex-col px-4">
          <div className="text-base font-medium pb-4 relative">
            <div>Select the location in the map:</div>
            <div className="text-xs">
              (Point the marker as closest to the location)
            </div>
          </div>
          <div id="map" className="h-full w-full"></div>
          {isLoading && (
            <FontAwesomeIcon
              icon={faSpinner}
              spin
              className="absolute top-[50%] right-[50%]"
            />
          )}
          <button
            id="get-current-location"
            className={classNames(mapLoaded ? "pr-2.5" : "hidden")}
          >
            <FontAwesomeIcon
              icon={faLocationCrosshairs}
              className="h-6 w-6 bg-white p-2.5 hover:bg-gray-50 active:bg-gray-100 cursor-pointer"
            />
          </button>
        </div>
        <div className="flex justify-center py-3 space-x-4">
          {isEditView && (
            <div>
              <Button
                onClick={handleCancel}
                type="tertiary"
                isFullWidth
                size="md"
                disabled={disableAction}
                loading={result.isLoading}
              >
                Cancel
              </Button>
            </div>
          )}
          <div className="w-40">
            <Button
              onClick={handleSubmit}
              isFullWidth
              disabled={disableAction}
              loading={result.isLoading}
            >
              Confirm & Save
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddGeoLocation;
