import {
  NetworkStatus,
  DeviceOrientation,
  PointOfInterest,
  QrCodeScanner,
  TodoList,
  Accordion,
} from "./components";

const navigationItems = {
  "Todo List": TodoList,
  "Device Orientation": DeviceOrientation,
  "QR Code Scanner": QrCodeScanner,
  "Point Of Interest": PointOfInterest,
};

function App() {
  return (
    <>
      <NetworkStatus />
      {Object.entries(navigationItems).map(([label, Component]) => (
        <Accordion label={label} key={label}>
          <Component />
        </Accordion>
      ))}
    </>
  );
}

export default App;
