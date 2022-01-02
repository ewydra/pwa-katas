import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useCallback } from "react";

const containerStyle = {
  width: "400px",
  height: "400px",
};

const libraries = ["places"];

export function Map({ coordinates }) {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
    libraries,
  });

  const onMapLoad = useCallback(
    (map) => {
      const maps = window.google.maps;
      const placesService = new maps.places.PlacesService(map);

      placesService.nearbySearch(
        {
          location: coordinates,
          rankBy: maps.places.RankBy.DISTANCE,
          type: "tourist_attraction",
        },
        (results) => {
          const [pointOfInterest] = results;
          const infoWindow = new maps.InfoWindow();

          const marker = new maps.Marker({
            place: {
              location: pointOfInterest.geometry.location,
              placeId: pointOfInterest.place_id,
            },
            map,
            title: pointOfInterest.name,
          });

          map.panTo(pointOfInterest.geometry.location);
          infoWindow.setContent(pointOfInterest.name);
          infoWindow.open(map, marker);
        }
      );
    },
    [coordinates]
  );

  if (!isLoaded) {
    return "Loading...";
  }

  if (loadError) {
    return "An error occured when trying to load a map.";
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={coordinates}
      zoom={15}
      onLoad={onMapLoad}
    />
  );
}
