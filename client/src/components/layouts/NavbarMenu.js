import React, { useContext, useEffect } from "react";
import logo from "../../img/dress.png";
import logoutIcon from "../../assets/logout.svg";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { ReduxContext } from "../../contexts/ReduxContext";

const NavbarMenu = () => {
  const {
    authState: {
      user: { username },
    },
    logoutUser,
  } = useContext(AuthContext);

  const {
    redux: { itemNavbar },
    setItemNavbar,
    loadItemNavbar,
  } = useContext(ReduxContext);

  //xử lý bôi đậm thành phần được chọn navbar
  const getItemClassName = (item) => {
    return `${
      itemNavbar === item ? "bg-[#aec2c5] " : ""
    }${"font-weight-bolder text-[#272375] text-2xl p-3 m-3 rounded-md hover:bg-[#aec2c5]"}`;
  };

  useEffect(() => {
    loadItemNavbar();
  }, [itemNavbar]);

  const logout = () => logoutUser();

  return (
    <div className="bg-[#b597f6] flex sticky top-0 z-10">
      <div>
        <img
          src={logo}
          alt="logo"
          width=""
          height=""
          className="py-5 px-10"
        ></img>
      </div>

      <div className="flex ml-[100px] my-auto items-center text-center font-medium text-base rounded-lg h-full">
        <Link
          className={getItemClassName("home")}
          to="/dashboard"
          onClick={() => setItemNavbar("home")}
        >
          <i class="fa-solid fa-house-chimney"></i> Home
        </Link>
        <Link
          className={getItemClassName("designer")}
          to="/designer"
          onClick={() => setItemNavbar("designer")}
        >
          <i class="fa-solid fa-person-dots-from-line"></i> Designer
        </Link>
        <Link
          className={getItemClassName("about")}
          to="/about"
          onClick={() => setItemNavbar("about")}
        >
          <i class="fa-solid fa-circle-info"></i> About
        </Link>
        <Link
          className={getItemClassName("username")}
          to="/manage"
          onClick={() => setItemNavbar("username")}
        >
          <i class="fa-solid fa-gears"></i> {username}
        </Link>
        <Link
          className={getItemClassName("cart")}
          to="/my-cart"
          onClick={() => setItemNavbar("cart")}
        >
          <i class="fa-solid fa-cart-shopping"></i> My cart
        </Link>
      </div>

      <div className="flex ml-auto items-center">
        <button
          className="flex rounded-xl bg-[#cbcf7e] justify-center mx-5 p-3 font-semibold text-2xl"
          onClick={logout}
        >
          <img
            src={logoutIcon}
            alt="logoutIcon"
            width="32"
            height="32"
            className="mr-2"
          />
          Log out
        </button>
      </div>
    </div>
  );
};

export default NavbarMenu;
