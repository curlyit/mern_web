import { createContext, useReducer } from "react";
import { cartReducer } from "../reducers/cartReducer";

export const CartContext = createContext();

const CartContextProvider = () => {
  const [cartState, dispatch] = useReducer(cartReducer, {
    cart: null,
  });
};

export default CartContextProvider;
