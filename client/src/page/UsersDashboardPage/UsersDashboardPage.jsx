import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  OutlinedInput,
  CircularProgress,
  Grid,
} from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import { validator, request } from "../../util";
import { APIConfig } from "../../configuration";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";
import "./style.css";
import { generator } from "../../util";
import { GlobalContext } from "../../configuration/state.config";

/*
  i have a users page
    The user entity has the following attributes:
      - username
      - firstName
      - lastName
      - phoneNumber
      - email
      - password
      - role
      - createdAt
      - updatedAt

    The user entity has the following actions:
      - create
      - read
      - update
      - delete

      The user entity has the following routes:
      - /user (with get,post,put,delete,patch methods)

      The user entity has the following components:
      - UsersDashboardPage

    - I want create a Data view for the user entity
        - The data View has the following elements:
            All information about users
            Filter by username/email/phoneNumber/firstName,lastNmae
            Pagination
            Search by username/email/phoneNumber/firstName,lastNmae
            Sort by username/email/phoneNumber/firstName,lastNmae
            Add a user
            Edit a user
            Delete a user
            Show a user

    - Drawer have the form to add or edit a user

      
    ===> let statrt with the data view

*/

const DataView = (users = []) => {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid {...data} slots={{ toolbar: GridToolbar }} />
    </div>
  );
};

function UsersDashboardPage() {
  const [formData, setFormData] = useState({
    username: "nassim",
    firstName: "Nassim",
    lastName: "Ben Nsib",
    phoneNumber: "+21655518510",
    email: "bennsib.nassim@gmail.com",
    password: "123Bingo2023&",
    confirmPassword: "123Bingo2023&",
  });

  const [errors, setErrors] = useState({
    username: undefined,
    firstName: undefined,
    lastName: undefined,
    phoneNumber: undefined,
    email: undefined,
    password: undefined,
    confirmPassword: undefined,
  });

  const [formOptions, setFormOptions] = useState({
    showPassword: false,
    isLoading: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formOptions.isLoading) return;
    const errors = {};
    let noError = true;
    Object.keys(formData).forEach((name) => {
      errors[name] = handleFormInput(name, formData[name]);
      noError = noError && errors[name] === undefined;
    });

    if (noError === false) {
      setErrors(errors);
    } else {
      setFormOptions({ ...formOptions, isLoading: true });

      request({
        callback: (data) => {
          setFormData({ ...UsersFormData });
          setFormOptions({ ...formOptions, isLoading: false });
        },
        error_callback: (error) => {
          setFormOptions({ ...formOptions, isLoading: false });
        },
        method: "post",
        url: APIConfig.baseUrl + "/user",
        titleSuccess: "Account created successfully",
        titleError: "Cannot create account",
        withNotification: true,
        data: formData,
      });
    }
  };

  const handleFormInput = (name, value) => {
    let result;
    if (name === "confirmPassword") {
      result = validator[`${name}Validator`](value, formData.password);
      setErrors({
        ...errors,
        [name]: result,
      });
    } else {
      result = validator[`${name}Validator`]?.(value);
      setErrors({ ...errors, [name]: result });
    }
    return result;
  };

  const handleChange = ({ target: { name, value } }) => {
    setFormData({ ...formData, [name]: value });
    handleFormInput(name, value);
  };

  const handleShowPassword = () => {
    setFormOptions({
      ...formOptions,
      showPassword: !formOptions.showPassword,
    });
  };

  return (
    <Box
      className="Users-Page"
      sx={{
        width: "100%",
        minHeight: "100vh",
        height: "fit-content",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
        p: 2,
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        className="Users-Container-Page"
        sx={{
          width: "100%",
          maxWidth: 550,
          p: 4,
          borderRadius: 5,
          bgcolor: "background.paper",
          boxShadow: 3,
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          textAlign="center"
          sx={{ fontWeight: "bolder" }}
        >
          CREATE AN ACCOUNT
        </Typography>

        <TextField
          fullWidth
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          error={Boolean(errors.firstName)}
          helperText={errors.firstName}
          margin="normal"
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          error={Boolean(errors.lastName)}
          helperText={errors.lastName}
          margin="normal"
          variant="outlined"
        />

        <TextField
          fullWidth
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={Boolean(errors.email)}
          helperText={errors.email}
          margin="normal"
          variant="outlined"
        />

        <TextField
          fullWidth
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          error={Boolean(errors.username)}
          helperText={errors.username}
          margin="normal"
          variant="outlined"
        />

        <MuiTelInput
          fullWidth
          label="Phone Number"
          value={formData.phoneNumber}
          onChange={(value) => {
            handleChange({ target: { name: "phoneNumber", value } });
          }}
          error={Boolean(errors.phoneNumber)}
          helperText={errors.phoneNumber}
          margin="normal"
          variant="outlined"
        />

        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel htmlFor="password-input">Password</InputLabel>
          <OutlinedInput
            id="password-input"
            name="password"
            type={formOptions.showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            error={Boolean(errors.password)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={handleShowPassword} edge="end">
                  {formOptions.showPassword ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
          {errors.password && (
            <Typography variant="caption" color="error" align="left">
              {errors.password}
            </Typography>
          )}
        </FormControl>

        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel htmlFor="confirm-password-input">
            Confirm Password
          </InputLabel>
          <OutlinedInput
            id="confirm-password-input"
            name="confirmPassword"
            type={formOptions.showPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={handleChange}
            error={Boolean(errors.confirmPassword)}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: errors.phoneNumber ? "red" : "#FF8E53",
                },
                "&:hover fieldset": {
                  borderColor: errors.phoneNumber ? "red" : "#FF8E53",
                },
                "&.Mui-focused fieldset": {
                  borderColor: errors.phoneNumber ? "red" : "#FF8E53",
                },
              },
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={handleShowPassword} edge="end">
                  {formOptions.showPassword ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
              </InputAdornment>
            }
            label="Confirm Password"
          />
          {errors.confirmPassword && (
            <Typography variant="caption" color="error" align="left">
              {errors.confirmPassword}
            </Typography>
          )}
        </FormControl>

        <Box sx={{ mt: 3 }}>
          <Typography variant="body2" color="textSecondary" align="center">
            Already have an account?{" "}
            <Link
              to={{ pathname: "/login", state: { from: "Users" } }}
              style={{ cursor: "pointer", textDecoration: "none" }}
            >
              <Typography variant="body2" component="span" color="primary">
                Sign In
              </Typography>
            </Link>
          </Typography>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Typography variant="body2" color="textSecondary" align="center">
            By creating an account, you agree to our{" "}
            <Typography
              variant="body2"
              color="primary"
              component="span"
              sx={{ cursor: "pointer" }}
            >
              Terms of Service
            </Typography>{" "}
            and{" "}
            <Typography
              variant="body2"
              color="primary"
              component="span"
              sx={{ cursor: "pointer" }}
            >
              Privacy Policy
            </Typography>
          </Typography>
        </Box>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{
            mt: 3,
            py: 1,
            background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
            fontWeight: "bold",
            fontSize: "20px",
            color: "#fff",
            cursor: !formOptions.isLoading ? "pointer" : "not-allowed",
          }}
          onClick={handleSubmit}
        >
          {formOptions.isLoading ? (
            <CircularProgress color="secondary" />
          ) : (
            "Users"
          )}
        </Button>
      </Box>
    </Box>
  );
}

const VISIBLE_FIELDS = ["name", "rating", "country", "dateCreated", "isAdmin"];

export default function BasicExampleDataGrid() {
  const { data, loadNewData, loading, setRowLength } = useDemoData({
    dataSet: "Employee",
    visibleFields: VISIBLE_FIELDS,
    rowLength: 100,
  });
  const [formData, setFormData] = useState({});

  console.log("data", data);

  return (
    <Box sx={{ height: 400, width: "100%" }} className="UsersDashboard-Page">
      <Box className="UsersDashboard-Container-Page">
        {/* <Gird container>
          <Grid>
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
            />
          </Grid>
        </Gird> */}
        <DataGrid {...data} slots={{ toolbar: GridToolbar }} />
      </Box>
    </Box>
  );
}
