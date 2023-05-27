import { faker } from "@faker-js/faker";
import { USER_ROLE } from "../constant";

const roles = Object.keys(USER_ROLE);

const loginDataForm = (withData = true) => {
  return {
    email: withData === true ? faker.internet.email() : "",
    username: withData === true ? faker.internet.userName() : "",
    password: withData === true ? faker.internet.password() : "",
  };
};

const registerDataForm = (withData = true) => {
  const password = withData === true ? faker.internet.password() : "";
  return {
    email: withData === true ? faker.internet.email() : "",
    password,
    username: withData === true ? faker.internet.userName() : "",
    confirmPassword: password,
    firstName: withData === true ? faker.name.firstName() : "",
    lastName: withData === true ? faker.name.lastName() : "",
    phoneNumber:
      withData === true ? "+" + faker.phone.number("216 ## ### ###") : "",
    role: withData === true ? roles[faker.number.int(0, roles.length - 1)] : "",
  };
};

const user = (withData = true) => {
  return {
    email: withData === true ? faker.internet.email() : "",
    username: withData === true ? faker.internet.userName() : "",
    firstName: withData === true ? faker.name.firstName() : "",
    lastName: withData === true ? faker.name.lastName() : "",
    phoneNumber:
      withData === true ? "+" + faker.phone.number("216 ## ### ###") : "",
    role: withData === true ? roles[faker.number.int(0, roles.length - 1)] : "",
  };
};

const airplane = (withData = true) => {
  return {
    name: withData === true ? faker.name.firstName() : "",
    capacity: withData === true ? faker.number.int(100, 300) : "",
  };
};

const flight = (withData = true) => {
  return {
    departure: withData === true ? faker.address.country() : "",
    arrival: withData === true ? faker.address.country() : "",
    departureDate: withData === true ? faker.date.recent() : "",
    arrivalDate: withData === true ? faker.date.recent() : "",
    airplane: withData === true ? airplane(true) : "",
  };
};

const pilot = (withData = true) => {
  return {
    ...user(withData),
    ...flight(withData),
  };
};

const collection = (generator, count = 1, withData = true) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push(generator(withData));
  }
  return data;
};

const state = (withData = true) => {
  return {
    user: user(withData),
    airplanes:
      withData === true
        ? collection(airplane, faker.number.int(10, 20), withData)
        : [],
    flights:
      withData === true
        ? collection(flight, faker.number.int(10, 20), withData)
        : [],
    pilots:
      withData === true
        ? collection(pilot, faker.number.int(10, 20), withData)
        : [],
  };
};

export {
  loginDataForm,
  registerDataForm,
  user,
  airplane,
  flight,
  pilot,
  collection,
  state,
};
