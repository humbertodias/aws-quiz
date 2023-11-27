import "./App.css"
import './index.css'

import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

function App() {
  return (
    <>
    <Navbar />
    <main className="flex justify-center flex-wrap mt-28">
    <Outlet />
    </main>
    <Footer />
    </>
  )
}

export default App
