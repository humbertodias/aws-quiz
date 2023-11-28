import "./App.css";
import "./index.css";

import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import { startAssistant } from "./speak";

function App() {
  startAssistant()
  return (
    <>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
