import "./App.css"

import { Outlet } from "react-router-dom"

function App() {
  return (
    <>
    <div>App</div>
    MODE { import.meta.env.MODE }
    <br />
    DEV { import.meta.env.DEV ? 'true' : 'false' }
    <br />
    VITE_API_URL { import.meta.env.VITE_API_URL }
    <Outlet />
    </>
  )
}

export default App
