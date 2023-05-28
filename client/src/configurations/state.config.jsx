import React, { createContext, useReducer } from "react";

export const GlobalContext = createContext();

export const stateReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...action.payload,
          fullName: action.payload.firstName + " " + action.payload.lastName,
          role: action.payload.roles[0],
        })
      );

      return {
        ...state,
        user: {
          ...action.payload,
          fullName: action.payload.firstName + " " + action.payload.lastName,
        },
      };
    case "LOGOUT":
      localStorage.removeItem("user");
      return { ...state, user: null };
    case "UPDATE_USER":
      return { ...state, user: action.payload };
    case "ADD":
      
      return {
        ...state,
        [action.payload.name]: [
          ...state[action.payload.name],
          action.payload.data,
        ],
      };
    case "DELETE":
      return {
        ...state,
        [action.payload.name]: state[action.payload.name].filter(
          (item) => item.id !== action.payload.data
        ),
      };
    case "EDIT":
      return {
        ...state,
        [action.payload.name]: state[action.payload.name].map((item) => {
          if (item.id === action.payload.data) {
            return action.payload.data;
          }
          return item;
        }),
      };

    case "SET":
      localStorage.setItem(
        action.payload.name,
        JSON.stringify(action.payload.data)
      );
      return { ...state, [action.payload.name]: action.payload.data };

    default:
      return state;
  }
};

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(stateReducer, {
    user: JSON.parse(localStorage.getItem("user")),
  });

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default {
  GlobalContext,
  stateReducer,
  StateProvider,
};
