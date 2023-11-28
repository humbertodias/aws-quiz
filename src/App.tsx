import "./App.css"
import './index.css'

import { Outlet } from "react-router-dom"
import Footer from "./components/Footer"

function App() {
  return (
    <>
    <main>
    <Outlet />
    </main>
    <Footer />
    </>
  )
}

export default App
