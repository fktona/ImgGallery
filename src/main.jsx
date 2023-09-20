import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
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
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage/>,
    
      },
      ]},
            {
        path: "/login",
        element: <Login/>,
    
      },])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        <RouterProvider router={router} />
  </React.StrictMode>,
)
