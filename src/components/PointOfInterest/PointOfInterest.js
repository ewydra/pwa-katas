import { useState, useCallback } from "react";
import styled from "styled-components";
import { Map } from "./Map";

const ContentWrapper = styled.div`
  margin-top: 8px;
`;

export function PointOfInterest() {
  const [isLocationLoaded, setLocationLoaded] = useState(false);
  const [hasLocationError, setLocationError] = useState(false);
  const [coordinates, setCoordinates] = useState(null);

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
      <button onClick={getCurrentLocation}>
        Get nearest point of interest
      </button>
      <ContentWrapper>
        {hasLocationError && (
          <span>Geolocation is not supported by your browser</span>
        )}
        {isLocationLoaded && <Map coordinates={coordinates} />}
      </ContentWrapper>
    </>
  );
}
