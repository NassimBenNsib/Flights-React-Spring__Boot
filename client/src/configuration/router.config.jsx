import { createBrowserRouter } from "react-router-dom";
import * as Pages from "../page";

export default createBrowserRouter([
  {
    path: "/",
    element: <Pages.LoginPage />,
  },
  {
    path: "/users",
    element: <Pages.UsersDashboardPages />,
  },
  // {
  //   path: "/home",
  //   element: <Pages.HomePage />,
  // },
  {
    path: "/register",
    element: <Pages.RegisterPage />,
  },
  {
    path: "/login",
    element: <Pages.LoginPage />,
  },
  {
    path: "*",
    element: <div>Error</div>,
  },
]);
