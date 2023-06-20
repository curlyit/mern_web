import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import NavbarMenu from "../layouts/NavbarMenu";

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);

  if (authLoading) return <div className="spinner-container"></div>;

  return isAuthenticated ? (
    <>
      <NavbarMenu />
      <Component {...rest} />
    </>
  ) : (
    <Navigate to="/login" replace={true} />
  );
};

export default ProtectedRoute;
