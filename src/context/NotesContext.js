import { createContext, useContext, useReducer } from "react";
import { AuthContext } from "../context/authContext";

export const NotesContext = createContext();

export const NotesContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  };

  const notesReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(notesReducer, INITIAL_STATE);

  return (
    <NotesContext.Provider value={{ data: state, dispatch }}>
      {children}
    </NotesContext.Provider>
  );
};
