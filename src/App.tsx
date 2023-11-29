import "./App.css";
import "./index.css";

import { Outlet } from "react-router-dom";
import { startAssistant } from "./speak";

function App() {
  startAssistant()
  return (
    <>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
