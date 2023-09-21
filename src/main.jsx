import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import HomePage from "./Components/Homepage";

import Login from "./Components/Login";
import ErrorPage from "./ErrorPage";
import {
  createHashRouter,
  createBrowserRouter,
  RouterProvider,
  Routes,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/homepage",
    element: <App />,
    children: [
      {
        path: "/homepage",
        element: <HomePage />,
      },
    ],
  },
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
