import { MoreVert } from "@mui/icons-material";
import { IconButton, MenuItem, Menu, Fade } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useMemo, useState } from "react";

function DataGridView({ data = [], onDelete, onSelect }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <DataGrid
      rows={data}
      rowCount={data.length}
      columns={[
        { field: "id", headerName: "ID", width: 70 },
        { field: "username", headerName: "Username", width: 230 },
        { field: "firstName", headerName: "First Name", width: 230 },
        {
          field: "lastName",
          headerName: "Last Name",
          width: "230",
        },
        {
          field: "roles",
          headerName: "Role",
          width: 100,
          valueGetter: (params) => {
            return params.row.roles[0].name.replace("ROLE_", "");
          },
        },
        {
          field: "phoneNumber",
          headerName: "Phone Number",
          width: 230,
          valueGetter: (params) => {
            return "+216 " + params.row.phoneNumber;
          },
        },
        { field: "email", headerName: "Email", width: 280 },
        {
          field: "actions",
          fixed: "right",
          headerName: "",
          sortable: false,
          filterable: false,
          width: 100,
          renderCell: (params) => (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
              }}
            >
              <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? "long-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MoreVert />
              </IconButton>

              <Menu
                id={"long-button" + params.id}
                MenuListProps={{
                  "aria-labelledby": "fade-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
              >
                <MenuItem onClick={() => {}}>Delete</MenuItem>
                <MenuItem
                  onClick={() => {
                    setAnchorEl(null);
                    onSelect({
                      ...params.row,
                      phoneNumber: "+216" + params.row.phoneNumber,
                      role: params.row.roles[0].name,
                      password: "",
                      confirmPassword: "",
                    });
                  }}
                >
                  Edit
                </MenuItem>
              </Menu>
            </div>
          ),
        },
      ]}
    />
  );
}

export default DataGridView;
