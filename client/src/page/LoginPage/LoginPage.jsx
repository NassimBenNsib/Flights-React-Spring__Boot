import React, { useState, useContext } from "react";
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
} from "@mui/material";
import { validator, request, showToast, generator } from "../../util";
import { APIConfig } from "../../configuration";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router-dom";
import "./style.css";
import { GlobalContext } from "../../configuration/state.config";
import { Navigate } from "react-router-dom";

function RegisterPage() {
  const globalState = useContext(GlobalContext);

  const [formData, setFormData] = useState(generator.loginDataForm());

  const [errors, setErrors] = useState({
    email: undefined,
    password: undefined,
    username: undefined,
  });

  const [formOptions, setFormOptions] = useState({
    showPassword: false,
    isLoading: false,
    isLogged: false,
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
          setFormData({ ...generator.loginDataForm(true) });
          setFormOptions({ ...formOptions, isLoading: false });
          globalState.dispatch({ type: "LOGIN", payload: data });
          setFormOptions({ ...formOptions, isLogged: true });
        },
        error_callback: (error) => {
          setFormOptions({ ...formOptions, isLoading: false });
        },
        method: "get",
        url: APIConfig.baseUrl + "/user",
        titleSuccess: "Logged successfully",
        titleError: "Cannot login",
        withNotification: true,
        data: formData,
      });
    }
  };

  const handleFormInput = (name, value) => {
    let result;
    result = validator[`${name}Validator`]?.(value);
    setErrors({ ...errors, [name]: result });
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

  return formOptions["isLogged"] ? (
    <Navigate to="/home" />
  ) : (
    <Box
      className="Login-Page"
      sx={{
        width: "100%",
        height: "100vh",
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
        className="Login-Container-Page"
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
          variant="h4"
          gutterBottom
          textAlign="center"
          sx={{ fontWeight: "bolder" }}
        >
          WELCOME BACK !!
        </Typography>

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

        <Box sx={{ mt: 3 }}>
          <Typography variant="body2" color="textSecondary" align="center">
            Don't have an account?{" "}
            <Link
              to={{ pathname: "/register", state: { from: "login" } }}
              style={{ cursor: "pointer", textDecoration: "none" }}
            >
              <Typography variant="body2" component="span" color="primary">
                Sign up
              </Typography>
            </Link>
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
            "LOGIN"
          )}
        </Button>
      </Box>
    </Box>
  );
}

export default RegisterPage;
