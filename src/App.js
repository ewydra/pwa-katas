import React from "react";
import { DeviceOrientation, TodoList } from "./components";
import { NetworkStatus } from "./components/NetworkStatus";

function App() {
  return (
    <div>
      <NetworkStatus />
      <hr />
      <TodoList />
      <hr />
      <DeviceOrientation />
    </div>
  );
}

export default App;
