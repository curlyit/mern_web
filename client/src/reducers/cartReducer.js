export const cartReducer = (state, action) => {
  const {
    type,
    payload: { cart },
  } = action;

  switch (type) {
    case "SET_CART":
      return {
        ...state,
        cart,
      };

    default:
      return state;
  }
};
