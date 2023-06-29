import { SET_DARK_MODE, SET_ITEM_NAVBAR } from "../contexts/constants";

export const reduxReducer = (state, action) => {
  const {
    type,
    payload: { itemNavbar, darkMode },
  } = action;

  switch (type) {
    case SET_ITEM_NAVBAR:
      return {
        ...state,
        itemNavbar: itemNavbar,
      };

    case SET_DARK_MODE:
      return {
        ...state,
        darkMode: darkMode,
      };

    default:
      return state;
  }
};
