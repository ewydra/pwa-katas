import { useCallback, useEffect, useState } from "react";

export function DeviceOrientation() {
  const [isPermissionGranted, setPermissionGranted] = useState(false);
  const [alpha, setAlpha] = useState("-");
  const [beta, setBeta] = useState("-");
  const [gamma, setGamma] = useState("-");

  const setDeviceOrientation = useCallback((event) => {
    setAlpha(event.alpha.toFixed(1));
    setBeta(event.beta.toFixed(1));
    setGamma(event.gamma.toFixed(1));
  }, []);

  const requestDeviceOrientation = useCallback(() => {
    if (typeof DeviceMotionEvent.requestPermission === "function") {
      DeviceMotionEvent.requestPermission().then((state) => {
        if (state === "granted") {
          setPermissionGranted(true);
        }
      });
    } else {
      setPermissionGranted(true);
    }
  }, []);

  useEffect(() => {
    if (isPermissionGranted) {
      window.addEventListener("deviceorientation", setDeviceOrientation);

      return () => {
        window.removeEventListener("deviceorientation", setDeviceOrientation);
      };
    }
  }, [isPermissionGranted, setDeviceOrientation]);

  if (!isPermissionGranted) {
    return (
      <>
        <p>Device orientation</p>
        <button onClick={requestDeviceOrientation}>Turn on</button>
      </>
    );
  }

  return (
    <>
      <p>Device orientation</p>
      <div>α (alpha): {alpha}°</div>
      <div>β (beta): {beta}°</div>
      <div>γ (gamma): {gamma}°</div>
    </>
  );
}
