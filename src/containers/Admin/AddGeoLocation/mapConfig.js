/* eslint-disable no-undef */

import { triggerToast } from "components/Notification";

let map, positionMarker, locationButton, markerTimer, centerChangeTimer;

export async function initMap(onInitialized, setMarker) {
  const addMarker = (cor) => {
    if (positionMarker?.map) positionMarker.map = null;

    positionMarker = new AdvancedMarkerElement({
      map: map,
      position: cor,
      gmpDraggable: false,
    });

    clearTimeout(markerTimer);
    markerTimer = setTimeout(() => {
      setMarker(positionMarker.position);
    }, 1000);
  };
  const onLocationButtonClick = async () => {
    const pos = await getCurrentLocation(map);
    if (pos.coords) {
      const cord = {
        lat: pos?.coords?.latitude || 26.6330247,
        lng: pos?.coords?.longitude || 93.6033658,
      };

      addMarker(cord);
      map.setCenter(cord);
    }
  };

  const onCenterChanged = async () => {
    const cur = await map.getCenter();
    clearTimeout(centerChangeTimer);
    centerChangeTimer = setTimeout(() => {
      const position = {
        lat: cur?.lat(),
        lng: cur?.lng(),
      };
      addMarker(position);
    }, 700);
  };

  const stopCenterChangeEvent = async () => {
    if (map?.removeListener) {
      map.removeListener("center_changed");
    }
  };

  const startCenterChangeEvent = async () => {
    stopCenterChangeEvent();
    map.addListener("center_changed", onCenterChanged);
  };

  // Request needed libraries.
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  const currentLocation = await getCurrentLocation();

  const position = {
    lat: currentLocation?.coords?.latitude || 26.6330247,
    lng: currentLocation?.coords?.longitude || 93.6033658,
  };

  map = new Map(document.getElementById("map"), {
    zoom: 16,
    center: position,
    mapId: "MENU_ON_ROAD_MAP_ID",
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: true,
    streetViewControl: false,
    rotateControl: true,
    fullscreenControl: false,
  });

  addMarker(position);

  startCenterChangeEvent();

  if (locationButton?.removeEventListener) {
    locationButton.removeEventListener("click", onLocationButtonClick);
  }

  locationButton = document.getElementById("get-current-location");

  map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(locationButton);
  locationButton.addEventListener("click", onLocationButtonClick);

  onInitialized(map);
}

const onError = (error) => {
  triggerToast({
    variant: "danger",
    message: {
      title: "Something went wrong!",
      summary: error?.message,
    },
  });
};

const getCurrentLocation = async () => {
  if (navigator.geolocation && navigator.geolocation.getCurrentPosition) {
    return new Promise((resolve) =>
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position),
        (error) => {
          onError(error);
          resolve(error);
        },
      ),
    );
  } else {
    // Browser doesn't support Geolocation
    triggerToast({
      variant: "danger",
      message: {
        title: "Something went wrong!",
        summary: "Location functionality not available in this browser/system",
      },
    });
  }
};
