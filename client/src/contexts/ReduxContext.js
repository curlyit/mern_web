import { createContext, useEffect, useReducer, useState } from "react";
import { reduxReducer } from "../reducers/reduxReducer";
import { SET_ITEM_NAVBAR } from "./constants";

export const ReduxContext = createContext();

const ReduxContextProvider = ({ children }) => {
  const [redux, dispatch] = useReducer(reduxReducer, {
    itemNavbar: "home",
  });

  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [notification, setNotification] = useState({
    success: false,
    message: "",
  });

  const loadRedux = () => {
    let item = localStorage.getItem("item-navbar");

    dispatch({
      type: SET_ITEM_NAVBAR,
      payload: { itemNavbar: item },
    });
  };

  const setItemNavbar = (item) => {
    localStorage.setItem("item-navbar", item);
    loadRedux();
  };

  useEffect(() => {
    loadRedux();
  }, []);

  const ReduxContextData = {
    redux,
    loadRedux,
    setItemNavbar,
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
