import React from "react";
import {
  NetworkStatus,
  DeviceOrientation,
  PointOfInterest,
  QrCodeScanner,
  TodoList,
} from "./components";

function App() {
  return (
    <div>
      <NetworkStatus />
      <hr />
      <TodoList />
      <hr />
      <DeviceOrientation />
      <hr />
      <QrCodeScanner />
      <hr />
      <PointOfInterest />
    </div>
  );
}

export default App;
