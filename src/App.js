import React from "react";
import { DeviceOrientation, QrCodeScanner, TodoList } from "./components";
import { NetworkStatus } from "./components/NetworkStatus";

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
    </div>
  );
}

export default App;
