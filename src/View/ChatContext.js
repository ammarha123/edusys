import { useState, createContext, useContext, useReducer } from "react";
import { AuthContext } from "../context/authContext";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  };

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: currentUser.uid,
          chatId: action.payload,
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data1: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
