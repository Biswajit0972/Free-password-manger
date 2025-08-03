"use client";

import React, {
  createContext,
  useReducer,
  ReactNode,
  Dispatch,
  useContext,
} from "react";

type StateType = {
  password: string;
  openForm: boolean;
};

type Actions =
  | {
      type: "ADD_PASSWORD";
      payload: string;
    }
  | {
      type: "TOGGLE_FORM";
    };

type ContextType = {
  state: StateType;
  dispatch: Dispatch<Actions>;
};

const initialState: StateType = {
  password: "",
  openForm: false,
};

const PasswordContext = createContext<ContextType>({
  state: initialState,
  dispatch: () => {},
});

function reducer(state: StateType, action: Actions): StateType {
  switch (action.type) {
    case "ADD_PASSWORD":
      return { ...state, password: action.payload, openForm: true };
    case "TOGGLE_FORM":
      return { ...state, openForm: !state.openForm };
    default:
      console.warn("Unknown action type");
      return state;
  }
}

const PasswordProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <PasswordContext.Provider value={{ state, dispatch }}>
      {children}
    </PasswordContext.Provider>
  );
};

const useApplicationcontext = () => {
  const context = useContext(PasswordContext);
  if (context === undefined) {
    throw new Error(
      "useApplicationcontext must be used within a PasswordProvider"
    );
  }
  return context;
};

export { PasswordProvider, PasswordContext, useApplicationcontext };
