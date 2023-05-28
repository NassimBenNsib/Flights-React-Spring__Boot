import { createBrowserRouter } from "react-router-dom";
import * as Pages from "../pages";
import { Navigate } from "react-router-dom";

export default createBrowserRouter([
  {
    path: "/",
    element: <Pages.AdminDashboardPage />,
  },

  {
    path: "/home",
    element: <Navigate to="/admin" />,
  },
  {
    path: "/admin",
    element: <Pages.AdminDashboardPage />,
  },
  {
    path: "/admin/*",
    element: <Pages.AdminDashboardPage />,
  },
  {
    path: "/login",
    element: <Pages.LoginPage />,
  },
  {
    path: "/register",
    element: <Pages.RegisterPage />,
  },
  ,
  {
    path: "*",
    element: <div>Error</div>,
  },
]);
