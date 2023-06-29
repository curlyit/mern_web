import { createContext, useEffect, useReducer, useState } from "react";
import { reduxReducer } from "../reducers/reduxReducer";
import { SET_DARK_MODE, SET_ITEM_NAVBAR } from "./constants";

export const ReduxContext = createContext();

const ReduxContextProvider = ({ children }) => {
  const [redux, dispatch] = useReducer(reduxReducer, {
    itemNavbar: "home",
    darkMode: false,
  });

  const [showNotificationModal, setShowNotificationModal] = useState(false);

  const [notification, setNotification] = useState({
    success: false,
    message: "",
  });

  const loadDarkMode = () => {
    let mode = localStorage.getItem("dark-mode");
    if (mode === "true") mode = true;
    else mode = false;

    dispatch({
      type: SET_DARK_MODE,
      payload: { darkMode: mode },
    });
  };

  const setDarkMode = (mode) => {
    localStorage.setItem("dark-mode", mode);
    loadDarkMode();
  };

  const loadItemNavbar = () => {
    let item = localStorage.getItem("item-navbar");

    dispatch({
      type: SET_ITEM_NAVBAR,
      payload: { itemNavbar: item },
    });
  };

  const setItemNavbar = (item) => {
    localStorage.setItem("item-navbar", item);
    loadItemNavbar();
  };

  useEffect(() => {
    loadDarkMode();
    loadItemNavbar();
  }, []);

  const ReduxContextData = {
    redux,
    loadItemNavbar,
    setItemNavbar,
    loadDarkMode,
    setDarkMode,
    showNotificationModal,
    setShowNotificationModal,
    notification,
    setNotification,
  };

  return (
    <ReduxContext.Provider value={ReduxContextData}>
      {children}
    </ReduxContext.Provider>
  );
};

export default ReduxContextProvider;
