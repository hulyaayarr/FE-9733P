import React from "react";
import NavbarComponent from "./Components/layouts/Navbar";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div>
      <NavbarComponent />
      <Outlet />
    </div>
  );
};

export default Root;
