import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";


//Config Router
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home"
import ErrorPage from "./pages/ErrorPage"

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      // {
      //   path: '/whatever',
      //   element: <Whatever/>
      // }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
