import { faker } from "@faker-js/faker";
import { USER_ROLE } from "../constant";

const roles = Object.keys(USER_ROLE);

const loginDataForm = (
  options = {
    generateData: true,
    filledAll: false,
    filledAllWith: undefined,
  }
) => {
  return {
    email:
      filledAll === true
        ? filledAllWith
        : generateData === true
        ? faker.internet.email()
        : "",
    username:
      filledAll === true
        ? filledAllWith
        : generateData === true
        ? faker.internet.userName()
        : "",
    password:
      filledAll === true
        ? filledAllWith
        : generateData === true
        ? faker.internet.password()
        : "",
  };
};

const registerDataForm = (
  options = {
    generateData: true,
    filledAll: false,
    filledAllWith: undefined,
  }
) => {
  const password = filledAll === true ? filledAllWith : generate;
  return {
    email:
      filledAll === true
        ? filledAllWith
        : generateData === true
        ? faker.internet.email()
        : "",
    password,
    username: generateData === true ? faker.internet.userName() : "",
    confirmPassword: password,
    firstName: generateData === true ? faker.name.firstName() : "",
    lastName: generateData === true ? faker.name.lastName() : "",
    phoneNumber:
      generateData === true ? "+" + faker.phone.number("216 ## ### ###") : "",
    role:
      generateData === true ? roles[faker.number.int(0, roles.length - 1)] : "",
  };
};

const user = (generateData = true) => {
  return {
    email: generateData === true ? faker.internet.email() : "",
    username: generateData === true ? faker.internet.userName() : "",
    firstName: generateData === true ? faker.name.firstName() : "",
    lastName: generateData === true ? faker.name.lastName() : "",
    phoneNumber:
      generateData === true ? "+" + faker.phone.number("216 ## ### ###") : "",
    role:
      generateData === true ? roles[faker.number.int(0, roles.length - 1)] : "",
  };
};

const airplane = (generateData = true) => {
  return {
    name: generateData === true ? faker.name.firstName() : "",
    capacity: generateData === true ? faker.number.int(100, 300) : "",
  };
};

const flight = (generateData = true) => {
  return {
    departure: generateData === true ? faker.address.country() : "",
    arrival: generateData === true ? faker.address.country() : "",
    departureDate: generateData === true ? faker.date.recent() : "",
    arrivalDate: generateData === true ? faker.date.recent() : "",
    airplane: generateData === true ? airplane(true) : "",
  };
};

const pilot = (generateData = true) => {
  return {
    ...user(generateData),
    ...flight(generateData),
  };
};

const collection = (generator, count = 1, generateData = true) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push(generator(generateData));
  }
  return data;
};

const state = (generateData = true) => {
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
