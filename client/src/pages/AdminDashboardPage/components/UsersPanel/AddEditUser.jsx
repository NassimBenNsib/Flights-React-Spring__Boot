import React, { useEffect, useState } from "react";
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
  Drawer,
  Select,
  MenuItem,
} from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import { validator, request, generator } from "src/utils";
import { APIConfig } from "src/configurations";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { GlobalContext } from "src/configurations/state.config";

function AddUser({ open, onClose, data }) {
  const globalState = React.useContext(GlobalContext);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState(generator.user(false));
  const [formOptions, setFormOptions] = useState({
    showPassword: false,
    isLoading: false,
  });
  useEffect(() => {
    setFormData({ ...generator.user(false), ...data });
  }, [data]);

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

      if (data.id) {
        request({
          callback: (response) => {
            const newData = {
              ...data,
              ...formData,
              id: parseInt(response.data.message),
              roles: [{ name: formData.role }],
              phoneNumber: parseInt(
                formData.phoneNumber.replaceAll(" ", "").slice(4)
              ),
            };
            setFormData({ ...generator.user(false) });
            setFormOptions({ ...formOptions, isLoading: false });
            globalState.dispatch({
              type: "EDIT",
              payload: {
                name: "users",
                data: newData,
              },
            });
            onClose();
          },
          error_callback: (error) => {
            setFormOptions({ ...formOptions, isLoading: false });
          },
          method: "put",
          url: APIConfig.baseUrl + "/auth/" + data.id,
          titleSuccess: "User updated successfully",
          titleError: "Cannot update user",
          withNotification: true,
          data: {
            ...formData,
            role: [formData.role],
            phoneNumber: parseInt(
              formData.phoneNumber.replaceAll(" ", "").slice(4)
            ),
          },
        });
      } else {
        request({
          callback: (response) => {
            const newData = {
              ...formData,
              id: parseInt(response.data.message),
              roles: [{ name: formData.role }],
              phoneNumber: parseInt(
                formData.phoneNumber.replaceAll(" ", "").slice(4)
              ),
            };
            setFormData({ ...generator.user(false) });
            setFormOptions({ ...formOptions, isLoading: false });
            globalState.dispatch({
              type: "ADD",
              payload: {
                name: "users",
                data: newData,
              },
            });
          },
          error_callback: (error) => {
            setFormOptions({ ...formOptions, isLoading: false });
          },
          method: "post",
          url: APIConfig.baseUrl + "/auth/signup",
          titleSuccess: "User created successfully",
          titleError: "Cannot create new user",
          withNotification: true,
          data: {
            ...formData,
            role: [formData.role],
            phoneNumber: parseInt(
              formData.phoneNumber.replaceAll(" ", "").slice(4)
            ),
          },
        });
      }
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
    <Drawer anchor={"right"} open={open} onClose={onClose}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: "100%",
          maxWidth: 550,
          height: "100%",
          p: 4,
          borderRadius: 5,
          bgcolor: "background.paper",
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          textAlign="center"
          sx={{ fontWeight: "bolder" }}
        >
          {data.id ? "UPDATE INFORMATION" : "CREATE NEW USER"}
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

        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel id="select-role-label">Role</InputLabel>
          <Select
            labelId="select-role-label"
            id="select-role-field"
            name="role"
            error={Boolean(errors.role)}
            onChange={handleChange}
            value={formData.role}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="ROLE_ADMIN">Admin</MenuItem>
            <MenuItem value="ROLE_USER">User</MenuItem>
          </Select>
          {errors.role && (
            <Typography variant="caption" color="error" align="left">
              {errors.role}
            </Typography>
          )}
        </FormControl>

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

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{
            my: 3,
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
          ) : data.id ? (
            "update"
          ) : (
            "Create"
          )}
        </Button>
      </Box>
    </Drawer>
  );
}

export default AddUser;
