/* eslint-disable no-undef */
import Button from "components/Button";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { initMap } from "./mapConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationCrosshairs } from "@fortawesome/pro-light-svg-icons";
import classNames from "classnames";
import { useUpdateRestaurantMutation } from "store/sliceApis/restaurantApi";
import { triggerToast } from "components/Notification";

const AddGeoLocation = () => {
  const navigate = useNavigate();
  const { restaurant_id } = useParams();
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
      navigate(`/admin/restaurant/${restaurant_id}/add-menu-item`);
    }
  }, [result?.isSuccess, result?.isLoading, navigate, restaurant_id]);

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
        location: {
          lat: marker.lat,
          lng: marker.lng,
        },
      },
    });
  };

  const onInitialized = (map, state) => {
    setMap(map);
    toggleMapLoaded(true);
  };

  useEffect(() => {
    if (googleConstructor && !mapInstance) {
      initMap(onInitialized, setMarker);
    }
  }, [googleConstructor, mapInstance]);

  const disableAction = useMemo(
    () => result.isLoading || !marker || !Object.keys(marker).length,
    [marker, result],
  );

  return (
    <>
      <div className="flex flex-1 flex-col">
        <div className="flex flex-1 flex-col px-4">
          <div className="text-base font-medium pb-4">
            <div>Select the location in the map:</div>
            <div className="text-xs">
              (Point the marker as closest to the location)
            </div>
          </div>
          <div id="map" className="h-full w-full"></div>
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
        <div className="flex justify-center py-3">
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
