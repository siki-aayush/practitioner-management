import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { getUserLoginFromLocalStorage } from "../utils/localstorage.util";

const AuthRoute = () => {
  // Gets the login status from the local storage
  const isLoggedIn = getUserLoginFromLocalStorage();

  /* Returns the child elements if the user is logged in
   * else navigate to the login page
   */
  return isLoggedIn ? (
    <div className="wrapper">
      <Navbar />
      <Outlet />
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default AuthRoute;
