function fullNameValidator(value) {
  if (value.length === 0) {
    return "The name is required";
  } else if (!/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(value)) {
    return "The name is invalid";
  } else if (value.length < 5) {
    return "The name must be at least 5 characters long";
  } else {
    return undefined;
  }
}

function usernameValidator(value) {
  if (value.length === 0) {
    return "The username is required";
  } else if (
    !/^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/.test(value)
  ) {
    return "The username is invalid";
  } else if (value.length < 3) {
    return "The username must be at least 3 characters long";
  } else {
    return undefined;
  }
}

function roleValidator(value) {
  if (value.length === 0) {
    return "The role is required";
  } else {
    return undefined;
  }
}

function lastNameValidator(value) {
  if (value.length === 0) {
    return "The last name is required";
  } else if (!/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(value)) {
    return "The last name is invalid";
  } else if (value.length < 3) {
    return "The last name must be at least 3 characters long";
  } else {
    return undefined;
  }
}

function firstNameValidator(value) {
  if (value.length === 0) {
    return "The first name is required";
  } else if (!/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(value)) {
    return "The first name is invalid";
  } else if (value.length < 3) {
    return "The first name must be at least 3 characters long";
  } else {
    return undefined;
  }
}

function emailValidator(value) {
  if (value.length === 0) {
    return "The email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return "The email is invalid";
  } else {
    return undefined;
  }
}

function passwordValidator(value) {
  if (value.length === 0) {
    return "The password is required";
  } else if (!/[a-z]/.test(value)) {
    return "The password must contain at least one lowercase letter";
  } else if (!/[A-Z]/.test(value)) {
    return "The password must contain at least one uppercase letter";
  } else if (!/[0-9]/.test(value)) {
    return "The password must contain at least one digit";
  } else if (!/[^0-9A-Za-z]/.test(value)) {
    return "The password must contain at least one special character";
  } else if (value.length < 6) {
    return "The password must be at least 6 characters long";
  } else {
    return undefined;
  }
}

function confirmPasswordValidator(value, password) {
  if (value.length === 0) {
    return "The password confirmation is required";
  } else if (value !== password) {
    return "The password confirmation does not match";
  } else {
    return undefined;
  }
}

function phoneNumberValidator(value) {
  if (value.length === 0) {
    return "The phone number is required";
  } else if (/^\d+$/.test(value)) {
    return "The phone number is invalid";
  } else {
    return undefined;
  }
}

export {
  passwordValidator,
  emailValidator,
  confirmPasswordValidator,
  fullNameValidator,
  phoneNumberValidator,
  firstNameValidator,
  lastNameValidator,
  usernameValidator,
  roleValidator,
};
