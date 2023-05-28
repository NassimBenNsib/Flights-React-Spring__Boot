import { Box, Stack } from "@mui/material";
import React, { useEffect } from "react";

import { Sidebar, UsersPanel } from "admin/components";
import { GlobalContext } from "src/configurations/state.config";
import { Navigate, Route, Routes } from "react-router-dom";
import { USER_ROLE } from "src/constants";
import { request } from "src/utils";
import { APIConfig } from "src/configurations";

function AdminDashboardPage() {
  const globalState = React.useContext(GlobalContext);

  useEffect(() => {
    request({
      callback: (response) => {
        globalState.dispatch({
          type: "SET",
          payload: {
            data: response.data,
            name: "users",
          },
        });
      },
      error_callback: (error) => {
        console.log(error);
      },
      method: "get",
      url: APIConfig.baseUrl + "/auth/users",
      withNotification: true,
      data: {},
      header: {
        Authorization: "Bearer " + globalState.state.user.token,
      },
    });
  }, []);

  if (Boolean(globalState.state.user) === false) {
    return <Navigate to="/login" />;
  } else if (globalState.state.user.role !== USER_ROLE.ROLE_ADMIN) {
    return <Navigate to="/user" />;
  }

  return (
    <Box
      className="Admin-Dashboard-Page"
      sx={{
        width: "100%",
        minHeight: "100vh",
      }}
    >
      <Box
        className="AdminDashboard-Container-Page"
        orientation="horizontal"
        sx={{
          // maxWidth: "1500px",
          width: "100%",
          margin: "auto",
          height: "100vh",
          boxShadow: 3,
          display: "flex",
        }}
      >
        <Sidebar />
        <Routes>
          <Route
            path="users"
            element={<UsersPanel data={globalState.state.users} />}
          />
        </Routes>
      </Box>
    </Box>
  );
}

export default AdminDashboardPage;
