import React, { createContext, useReducer } from "react";
import { generator } from "../util";

export const GlobalContext = createContext();

export const stateReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    case "UPDATE_USER":
      return { ...state, user: action.payload };
    case "ADD":
      return { ...state, [name]: [...state[name], action.payload] };
    case "DELETE":
      return {
        ...state,
        [name]: state[name].filter((item) => item.id !== action.payload),
      };
    case "EDIT":
      return {
        ...state,
        [name]: state[name].map((item) => {
          if (item.id === action.payload.id) {
            return action.payload;
          }
          return item;
        }),
      };

    case "DELETE_MULTIPLE":
      return {
        ...state,
        [name]: state[name].filter((item) => !action.payload.includes(item.id)),
      };

    default:
      return state;
  }
};

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(stateReducer, generator.state());

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
