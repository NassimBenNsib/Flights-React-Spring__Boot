import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { PhoneAndroid, Logout, AirportShuttle } from "@mui/icons-material";

export default function NavTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 300,
        height: "100vh",
        background: "#FF8E53",
        borderRadius: "0 30px 30px 0",
        overflow: "hidden",
        py: 5,
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{
          borderRight: 1,
        }}
      >
        <Tab
          component="a"
          onClick={(event) => {
            event.preventDefault();
          }}
          label="Pilot"
          href="/pilot"
          sx={{
            "&.MuiTab-root": {
              p: 3,
              color: "white",
              borderRadius: "0 30px 100px 0",
              fontWeight: "bold",
            },
            "&.Mui-selected": {
              color: "#FF8E53",
              fontWeight: "bold",
              background: "white",
              borderRadius: "0 30px 100px 0",
            },
          }}
        />{" "}
        <Tab
          component="a"
          onClick={(event) => {
            event.preventDefault();
          }}
          label="Flights"
          href="/flights"
          sx={{
            "&.MuiTab-root": {
              p: 3,
              color: "white",
              borderRadius: "0 30px 100px 0",
              fontWeight: "bold",
            },
            "&.Mui-selected": {
              color: "#FF8E53",
              fontWeight: "bold",
              background: "white",
              borderRadius: "0 30px 100px 0",
            },
          }}
        />{" "}
        <Tab
          component="a"
          onClick={(event) => {
            event.preventDefault();
          }}
          label="Airports"
          href="/airport"
          sx={{
            "&.MuiTab-root": {
              p: 3,
              color: "white",
              borderRadius: "0 30px 100px 0",
              fontWeight: "bold",
            },
            "&.Mui-selected": {
              color: "#FF8E53",
              fontWeight: "bold",
              background: "white",
              borderRadius: "0 30px 100px 0",
            },
          }}
        />{" "}
        <Tab
          component="a"
          onClick={(event) => {
            event.preventDefault();
          }}
          label="Logout"
          href="/logout"
          sx={{
            margin: "200px 0",
            fontSize: "17px",
            "&.MuiTab-root": {
              p: 3,
              color: "white",
              borderRadius: "0 30px 100px 0",
              fontWeight: "bold",
            },
            "&.Mui-selected": {
              color: "#FF8E53",
              fontWeight: "bold",
              background: "white",
              borderRadius: "0 30px 100px 0",
            },
          }}
          iconPosition="start"
          icon={<AirportShuttle />}
        />
      </Tabs>
    </Box>
  );
}
