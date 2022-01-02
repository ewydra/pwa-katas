import React from "react";
import { TodoList } from "./components";
import { NetworkStatus } from "./components/NetworkStatus";

function App() {
  return (
    <div>
      <NetworkStatus />
      <hr />
      <TodoList />
    </div>
  );
}

export default App;
