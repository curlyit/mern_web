import React, { useContext } from "react";
import logo from "../../img/dress.png";
import logoutIcon from "../../assets/logout.svg";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useState } from "react";

const NavbarMenu = () => {
  const {
    authState: {
      user: { username },
    },
    logoutUser,
  } = useContext(AuthContext);

  const logout = () => logoutUser();

  return (
    <div className="bg-[#d5eaea] flex">
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
          className="font-weight-bolder text-[#272375] text-2xl p-3 m-3 rounded-md hover:bg-[#aec2c5] focus:bg-[#aec2c5]"
          to="/dashboard"
        >
          <i class="fa-solid fa-house-chimney"></i> Home
        </Link>
        <Link
          className="font-weight-bolder text-[#272375] text-2xl p-3 m-3 rounded-md hover:bg-[#aec2c5] focus:bg-[#aec2c5]"
          to="/designer"
        >
          <i class="fa-solid fa-person-dots-from-line"></i> Designer
        </Link>
        <Link
          className="font-weight-bolder text-[#272375] text-2xl p-3 m-3 rounded-md hover:bg-[#aec2c5] focus:bg-[#aec2c5]"
          to="/about"
        >
          <i class="fa-solid fa-circle-info"></i> About
        </Link>
        <Link
          className="font-weight-bolder text-[#272375] text-2xl p-3 m-3 rounded-md hover:bg-[#aec2c5] focus:bg-[#aec2c5]"
          to="/manage"
        >
          <i class="fa-solid fa-gears"></i> {username}
        </Link>
      </div>

      <div className="flex ml-auto items-center">
        <button
          className="flex rounded-xl bg-[#e8ae5d] justify-center mx-5 p-3 font-semibold text-2xl"
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
