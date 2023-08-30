import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";


//Config Router
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home"
import ErrorPage from "./pages/Error/ErrorPage"
import CarRent from './pages/CarRent/CarRent'

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
      {
        path: '/alugar',
        element: <CarRent/>
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
