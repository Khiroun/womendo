import React, { createContext, Dispatch, useReducer } from "react";
import User from "../entities/User";

type StateType = {
  currentCategory: string;
  user: User | null;
};

type ActionType =
  | {
      type: "SET_CURRENT_CATEGORY";
      currentCategory: string;
    }
  | {
      type: "SET_USER";
      user: User | null;
    };

const initialState: StateType = {
  currentCategory: "all",
  user: null,
};

type ReducerType = (state: StateType, action: ActionType) => StateType;

const reducer: ReducerType = (state, action) => {
  switch (action.type) {
    case "SET_CURRENT_CATEGORY":
      return { ...state, currentCategory: action.currentCategory };
    case "SET_USER":
      return { ...state, user: action.user };
  }
};

export type ContextType = {
  state: StateType;
  dispatch: Dispatch<ActionType> | null;
};

export const AppContext = createContext<ContextType>(null);

export const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
