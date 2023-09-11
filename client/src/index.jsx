import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

//Config Router
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import ErrorPage from "./pages/Error/ErrorPage";
import Cars from "./pages/Cars/Cars";
import Car from "./pages/Car/Car"
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/alugar",
        element: <Cars />,
      },
      {
        path: "/alugar/:id",
        element: <Car />,
      },
      {
        path: "/cadastro",
        element: <Register />
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
