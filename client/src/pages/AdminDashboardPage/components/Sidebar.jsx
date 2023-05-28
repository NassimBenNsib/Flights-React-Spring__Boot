import React from "react";
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Flight,
  Image,
  SupervisorAccount,
  Person,
  Settings,
  FlightTakeoff,
  Logout,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "src/configurations/state.config";

const sidebarItems = [
  {
    name: "Users",
    icon: <Person />,
    path: "/users",
  },
  {
    name: "Pilots",
    icon: <SupervisorAccount />,
    path: "/pilots",
  },
  {
    name: "Airplanes",
    icon: <Flight />,
    path: "/airplanes",
  },
  {
    name: "Flights",
    icon: <FlightTakeoff />,
    path: "/flights",
  },
  {
    name: "Settings",
    icon: <Settings />,
    path: "/setting",
  },
];
const Sidebar = () => {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const globalState = React.useContext(GlobalContext);

  return (
    <List
      sx={{
        width: 400,
        height: "100vh",
        background: "#fff",
        position: "sticky",
        overflow: "auto",
      }}
    >
      <ListItem
        sx={{
          marginBottom: 5,
        }}
      >
        <ListItemAvatar>
          <Avatar
            size="large"
            sx={{
              background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
              width: "50px",
              height: "50px",
              marginRight: "10px",
            }}
          >
            {globalState.state.user.firstName[0] +
              globalState.state.user.lastName[0]}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={globalState.state.user.role.replace("ROLE_", " ")}
          secondary={globalState.state.user.fullName}
        />
        <Divider />
      </ListItem>
      {sidebarItems.map((item, index) => (
        <ListItemButton
          sx={{
            py: 2,
          }}
          key={index}
          onClick={() => {
            navigate("/admin" + item.path);
            setSelectedIndex(index);
          }}
          selected={selectedIndex === index}
        >
          <ListItemIcon color="primary">{item.icon}</ListItemIcon>
          <ListItemText primary={item.name} />
        </ListItemButton>
      ))}

      <ListItemButton
        sx={{
          marginTop: "100px",
        }}
        onClick={() => {
          globalState.dispatch({ type: "LOGOUT" });
          navigate("/login");
        }}
      >
        <ListItemIcon color="primary">
          <Logout />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </List>
  );
};

export default Sidebar;
