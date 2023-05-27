import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "@mui/material/styles";
import { ThemeConfig } from "./configuration";
import RouterConfig from "./configuration/router.config.jsx";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StateProvider } from "./configuration/state.config";

ReactDOM.createRoot(document.getElementById("application")).render(
  <React.StrictMode>
    <ThemeProvider theme={ThemeConfig}>
      <StateProvider>
        <RouterProvider router={RouterConfig}></RouterProvider>
      </StateProvider>
    </ThemeProvider>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  </React.StrictMode>
);
