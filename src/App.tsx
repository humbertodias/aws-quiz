import "./App.css"

import { Outlet } from "react-router-dom"
// import Header from "./components/Header"
import './index.css'

function App() {
  return (
    <div className="flex justify-center flex-wrap">
    {/* <Header /> */}
    <Outlet />
    </div>
  )
}

export default App
