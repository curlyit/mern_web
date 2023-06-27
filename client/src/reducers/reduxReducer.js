import { SET_ITEM_NAVBAR } from "../contexts/constants";

export const reduxReducer = (state, action) => {
  const {
    type,
    payload: { itemNavbar },
  } = action;

  switch (type) {
    case SET_ITEM_NAVBAR:
      return {
        ...state,
        itemNavbar: itemNavbar,
      };

    default:
      return state;
  }
};
