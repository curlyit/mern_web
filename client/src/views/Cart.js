import React, { useEffect } from "react";
import DarkMode from "../components/layouts/ToggleSwitchDarkMode";

const Cart = () => {
  let body = (
    <>
      <div>Cart</div>
    </>
  );

  return (
    <>
      <DarkMode body={body} />
    </>
  );
};

export default Cart;
