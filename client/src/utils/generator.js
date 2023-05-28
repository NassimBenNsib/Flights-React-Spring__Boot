import { faker } from "@faker-js/faker";
import { USER_ROLE } from "../constants";

const roles = Object.keys(USER_ROLE);

const loginDataForm = (generateData = false) => {
  return {
    email: generateData === true ? faker.internet.email().toLowerCase() : "",
    username: generateData === true ? faker.internet.userName() : "",
    password: generateData === true ? faker.internet.password() : "",
  };
};

const registerDataForm = (generateData = false) => {
  const password =
    generateData === true ? faker.internet.password() + "+9" : "";
  return {
    email: generateData === true ? faker.internet.email().toLowerCase() : "",
    password,
    username: generateData === true ? faker.internet.userName() : "",
    confirmPassword: password,
    firstName: generateData === true ? faker.name.firstName() : "",
    lastName: generateData === true ? faker.name.lastName() : "",
    phoneNumber:
      generateData === true ? "+" + faker.phone.number("216 ## ### ###") : "",
  };
};

const user = (generateData = false) => {
  return {
    ...registerDataForm(generateData),
    role: generateData === true ? roles[1] : "",
  };
};

const airplane = (generateData = false) => {
  return {
    name: generateData === true ? faker.name.firstName() : "",
    capacity: generateData === true ? faker.number.int(100, 300) : "",
  };
};

const flight = (generateData = false) => {
  return {
    departure: generateData === true ? faker.address.country() : "",
    arrival: generateData === true ? faker.address.country() : "",
    departureDate: generateData === true ? faker.date.recent() : "",
    arrivalDate: generateData === true ? faker.date.recent() : "",
    airplane: generateData === true ? airplane(true) : "",
  };
};

const pilot = (generateData = false) => {
  return {
    ...user(generateData),
    ...flight(generateData),
  };
};

const collection = (generator, count = 1, generateData = false) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push(generator(generateData));
  }
  return data;
};

const state = (generateData = false) => {
  return {
    user: user(generateData),
    airplanes:
      generateData === true
        ? collection(airplane, faker.number.int(10, 20), generateData)
        : [],
    flights:
      generateData === true
        ? collection(flight, faker.number.int(10, 20), generateData)
        : [],
    pilots:
      generateData === true
        ? collection(pilot, faker.number.int(10, 20), generateData)
        : [],
    users:
      generateData === true
        ? collection(user, faker.number.int(10, 20), generateData)
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
