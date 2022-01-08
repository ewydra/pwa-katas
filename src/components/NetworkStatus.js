import { useEffect, useState } from "react";
import styled from "styled-components";

const StatusIndicator = styled.span`
  color: ${({ isOnline }) => (isOnline ? "green" : "red")};
`;

export function NetworkStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const setOnline = () => setIsOnline(true);
  const setOffline = () => setIsOnline(false);

  useEffect(() => {
    window.addEventListener("offline", setOffline);
    window.addEventListener("online", setOnline);

    return () => {
      window.removeEventListener("offline", setOffline);
      window.removeEventListener("online", setOnline);
    };
  }, []);

  return (
    <div>
      Your status:{" "}
      <StatusIndicator isOnline={isOnline}>
        {isOnline ? "Online" : "Offline"}
      </StatusIndicator>
    </div>
  );
}
