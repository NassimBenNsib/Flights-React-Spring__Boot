import React, { useEffect, useState } from "react";
import {
  TextField,
  Typography,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Add, Search } from "@mui/icons-material";
import { DataGridView, AddEditUser } from "admin/components/UsersPanel";

export default function Users({ data = [] }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    role: "",
  });
  const [formOptions, setFormOptions] = useState({
    isSearching: false,
    isDrawerOpen: false,
    selectedRow: {},
  });
  const [rows, setRows] = useState(null);

  useEffect(() => {
    setRows(data.map((item) => ({ ...item })));
  }, [data]);

  const handleChange = ({ target: { name, value } }) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSearch = () => {
    setFormOptions({ ...formOptions, isSearching: true });
    setTimeout(() => {
      const newRows = data.filter((item) => {
        return (
          item.firstName
            .toLowerCase()
            .includes(formData.firstName.toLowerCase().trim()) &&
          item.lastName
            .toLowerCase()
            .includes(formData.lastName.toLowerCase().trim()) &&
          item.username
            .toLowerCase()
            .includes(formData.username.toLowerCase().trim()) &&
          item.roles[0].name
            .toLowerCase()
            .includes(formData.role.toLowerCase().trim())
        );
      });
      setRows(newRows);
      setFormOptions({ ...formOptions, isSearching: false });
    }, 1000);
  };

  const handleSelectRow = (row) => {
    setTimeout(() => {
      setFormOptions({ ...formOptions, isDrawerOpen: true, selectedRow: row });
    }, 1000);
  };

  return (
    <Box
      sx={{
        padding: "20px",
        width: "100%",
        maxWidth: "calc(100vw - 250px)",
      }}
    >
      <Box sx={{ bgcolor: "#fff", px: 2, py: 3, borderRadius: 2 }}>
        <Box
          direction="row"
          sx={{
            marginBottom: "20px",
            display: "flex",
            gap: "20px",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              width: "100%",
              margin: 0,
            }}
          >
            Search Filters
          </Typography>
          <LoadingButton
            variant="contained"
            size="small"
            color="primary"
            endIcon={<Search />}
            loading={formOptions.isSearching}
            sx={{
              background: "#FE6B8B",
              fontSize: "15px",
              color: "#fff",
              borderRadius: "5px",
              boxShadow: "none",
              padding: "10px 20px",
              cursor: !formOptions.isSearching ? "pointer" : "not-allowed",
            }}
            onClick={handleSearch}
          >
            Search
          </LoadingButton>

          <Button
            variant="contained"
            size="small"
            color="primary"
            endIcon={<Add />}
            sx={{
              background: "linear-gradient(145deg, #FE6B8B 30%, #FF8E53 90%)",
              fontSize: "15px",
              color: "#fff",
              borderRadius: "5px",
              boxShadow: "none",
              padding: "10px 20px",
            }}
            onClick={() => {
              setFormOptions({ ...formOptions, isDrawerOpen: true });
            }}
          >
            create
          </Button>
        </Box>
        <Box
          direction="row"
          sx={{
            marginBottom: "20px",
            display: "flex",
            gap: "20px",
          }}
        >
          <TextField
            type="search"
            fullWidth
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />
          <TextField
            type="search"
            fullWidth
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />
          <TextField
            type="search"
            fullWidth
            label="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />

          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel id="select-role-label">Role</InputLabel>
            <Select
              labelId="select-role-label"
              id="select-role-field"
              name="role"
              onChange={handleChange}
              value={formData.role}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="ROLE_ADMIN">Admin</MenuItem>
              <MenuItem value="ROLE_USER">User</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box
          sx={{
            height: "calc(100vh - 250px)",
            overflowY: "auto",
          }}
        >
          <DataGridView
            data={rows === null ? data : rows}
            onSelect={handleSelectRow}
          />
        </Box>
      </Box>
      <Box
        sx={{
          maxHeight: "calc(100vh - 250px)",
          overflowY: "auto",
        }}
      >
        <AddEditUser
          open={formOptions.isDrawerOpen}
          onClose={() => {
            setFormOptions({
              ...formOptions,
              isDrawerOpen: false,
              selectedRow: {},
            });
          }}
          data={formOptions.selectedRow}
        />
      </Box>
    </Box>
  );
}
