import React from "react";
import {Outlet} from "react-router-dom";
import Navbar from "./Navbar";

// allows us to have our navbar on our all our
const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Layout; 