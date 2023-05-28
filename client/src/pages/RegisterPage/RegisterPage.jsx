import React, { useContext, useState } from "react";
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
import { MuiTelInput } from "mui-tel-input";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { validator, request, generator } from "src/utils";
import { APIConfig } from "src/configurations";
import { USER_ROLE } from "src/constants";
import "./style.css";
import { GlobalContext } from "src/configurations/state.config";

function RegisterPage() {
  const globalState = useContext(GlobalContext);
  const [formData, setFormData] = useState(generator.registerDataForm(false));
  const [errors, setErrors] = useState(generator.registerDataForm(false));
  const [formOptions, setFormOptions] = useState({
    showPassword: false,
    isLoading: false,
  });
  const navigate = useNavigate();

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
          setFormData({ ...generator.registerDataForm(false) });
          setFormOptions({ ...formOptions, isLoading: false });
          navigate("/login");
        },
        error_callback: (error) => {
          setFormOptions({ ...formOptions, isLoading: false });
        },
        method: "post",
        url: APIConfig.baseUrl + "/auth/signup",
        titleSuccess: "Account created successfully",
        titleError: "Cannot create account",
        withNotification: true,
        data: {
          ...formData,
          role: [USER_ROLE.ROLE_USER],
          phoneNumber: parseInt(
            formData.phoneNumber.replaceAll(" ", "").slice(4)
          ),
        },
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

  if (Boolean(globalState.state.user) === true) {
    if (globalState.state.user.role === USER_ROLE.ROLE_ADMIN) {
      return <Navigate to="/admin" />;
    } else {
      return <Navigate to="/user" />;
    }
  }

  return (
    <Box
      className="Register-Page"
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
        className="Register-Container-Page"
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
              to={{ pathname: "/login", state: { from: "register" } }}
              style={{ cursor: "pointer", textDecoration: "none" }}
            >
              <Typography variant="body2" component="span" color="primary">
                Sign in
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
            "REGISTER"
          )}
        </Button>
      </Box>
    </Box>
  );
}

export default RegisterPage;
