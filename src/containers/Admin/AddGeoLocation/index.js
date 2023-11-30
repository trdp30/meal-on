/* eslint-disable no-undef */
import Button from "components/Button";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { initMap } from "./mapConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationCrosshairs } from "@fortawesome/pro-light-svg-icons";
import classNames from "classnames";

const AddGeoLocation = () => {
  const navigate = useNavigate();
  const { restaurant_id } = useParams();
  const [mapLoaded, toggleMapLoaded] = useState(false);
  const [mapInstance, setMap] = useState();
  const [googleConstructor, setGoogleConstructor] = useState();
  const [marker, setMarker] = useState();

  console.log("marker", marker);

  if (!googleConstructor && google && google.maps && !mapInstance) {
    setGoogleConstructor(google);
  }

  const onSuccess = () => {
    navigate(`/admin/restaurant/${restaurant_id}/add-menu-item`);
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

  return (
    <>
      <div className="flex flex-1 flex-col">
        <div className="flex flex-1 flex-col">
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
          <Button onClick={onSuccess}>Save</Button>
        </div>
      </div>
    </>
  );
};

export default AddGeoLocation;
