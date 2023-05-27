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
import { validators, request, showToast } from "../../util";
import { APIConfig } from "../../configuration";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { registerFormData } from "../../data";
import "./style.css";
import { SideBarComponent } from "../../component";

function RegisterPage() {
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
      // showToast("error", "Verify your inputs");
      setErrors(errors);
    } else {
      setFormOptions({ ...formOptions, isLoading: true });

      request({
        callback: (data) => {
          setFormData({ ...registerFormData });
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
      result = validators[`${name}Validator`](value, formData.password);
      setErrors({
        ...errors,
        [name]: result,
      });
    } else {
      result = validators[`${name}Validator`]?.(value);
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
  //create side bar with tabs (login, register, home, about us, contact us)

  return (
    <Box
      className="Home-Page"
      sx={{
        width: "100%",
        minHeight: "100vh",
        height: "fit-content",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "rgba(127,127,127,0.2)",
        p: 0,
      }}
    >
      <Grid className="Home-Container-Page" container>
        <Grid item xs={3}>
          <SideBarComponent />
        </Grid>
        <Grid item xs={9}></Grid>
      </Grid>
    </Box>
  );
}

export default RegisterPage;
