import { useState, useCallback } from "react";
import { Button, FlexWrapper } from "..";
import { Map } from "./Map";

export function PointOfInterest() {
  const [isLocationLoaded, setLocationLoaded] = useState(false);
  const [hasLocationError, setLocationError] = useState(false);
  const [coordinates, setCoordinates] = useState(null);

  const resetLocation = useCallback(() => {
    setLocationLoaded(false);
    setLocationError(false);
    setCoordinates(null);
  }, []);

  const getCurrentLocation = useCallback(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCoordinates({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLocationLoaded(true);
      });
    } else {
      setLocationError(true);
    }
  }, []);

  return (
    <>
      <FlexWrapper>
        <Button onClick={getCurrentLocation}>
          Get nearest point of interest
        </Button>
        {isLocationLoaded && <Button onClick={resetLocation}>Reset</Button>}
      </FlexWrapper>
      {hasLocationError && (
        <span>Geolocation is not supported by your browser</span>
      )}
      {isLocationLoaded && <Map coordinates={coordinates} />}
    </>
  );
}
