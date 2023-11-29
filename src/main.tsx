import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.tsx";
import App from "./App.tsx";
import Exam from "./pages/Exam.tsx";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/exam/:id/:name", element: <Exam /> },
    ],
  },
]
const router = createBrowserRouter( routes
  , { basename: import.meta.env.MODE == 'gh-pages' ? '/aws-quiz/' : '/' } 
  );

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  // </React.StrictMode>
);
